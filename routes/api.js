import express from 'express';
import nodemailer from 'nodemailer';
import Project from '../models/Project.js';
import Experience from '../models/Experience.js';
import Message from '../models/Message.js';

const router = express.Router();

// Get all projects
router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving projects', error: error.message });
  }
});

// Get all experience items
router.get('/experience', async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ createdAt: 1 });
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving experience', error: error.message });
  }
});

// Helper function to send email notification
async function sendEmailNotification(messageData) {
  const { name, email, subject, message } = messageData;

  const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS, EMAIL_RECEIVER } = process.env;
  
  // If email configuration is missing, log a warning but don't fail the API
  if (!EMAIL_USER || !EMAIL_PASS || !EMAIL_RECEIVER) {
    console.warn('SMTP credentials not configured in backend/.env. Skipping email notification.');
    return false;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(EMAIL_PORT || '587'),
      secure: parseInt(EMAIL_PORT || '587') === 465,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
      }
    });

    const mailOptions = {
      from: `"Portfolio Contact Form" <${EMAIL_USER}>`,
      to: EMAIL_RECEIVER,
      subject: `New Portfolio Message: ${subject || 'No Subject'}`,
      text: `You have received a new message from your portfolio contact form.\n\n` +
            `Sender Name: ${name}\n` +
            `Sender Email: ${email}\n` +
            `Subject: ${subject || 'No Subject'}\n\n` +
            `Message:\n${message}\n`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #ddd; border-radius: 8px; background-color: #ffffff;">
          <h2 style="color: #00ffcc; background: #0c0d12; padding: 15px; margin-top: 0; border-radius: 6px 6px 0 0;">New Contact Inquiry</h2>
          <p><strong>Sender Name:</strong> ${name}</p>
          <p><strong>Sender Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Subject:</strong> ${subject || 'No Subject'}</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Message:</strong></p>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 6px; white-space: pre-wrap; line-height: 1.6; color: #444;">${message}</div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email notification sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email notification:', error.message);
    return false;
  }
}

// Save contact messages & send notification
router.post('/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email, and message are required fields.' });
  }

  try {
    const newMessage = new Message({ name, email, subject, message });
    await newMessage.save();

    // Trigger email send asynchronously so the response is not delayed
    sendEmailNotification({ name, email, subject, message });

    res.status(201).json({ message: 'Message sent successfully! Thank you for reaching out.' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending message. Please try again.', error: error.message });
  }
});

export default router;
