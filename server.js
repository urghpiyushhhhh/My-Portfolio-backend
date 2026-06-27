import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/api.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio_db';


// Middlewares
app.use(cors({
  origin: process.env.CLIENT_URL
}));
app.use(express.json());

// Routes
app.use('/api', apiRoutes);

// Default Route
app.get('/', (req, res) => {
  res.json({ message: 'Piyush Gehlot Portfolio API is active.' });
});

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB.');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
  });

// Only listen to port if running locally (Vercel serverless environments wrap the app itself)
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;
