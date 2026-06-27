import mongoose from 'mongoose';

const ExperienceSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  location: {
    type: String,
    default: ''
  },
  points: {
    type: [String],
    required: true
  }
}, { timestamps: true });

export default mongoose.model('Experience', ExperienceSchema);
