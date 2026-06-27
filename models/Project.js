import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: [String],
    required: true
  },
  tags: {
    type: [String],
    required: true
  },
  role: {
    type: String
  },
  category: {
    type: String
  },
  githubLink: {
    type: String,
    default: ''
  },
  liveLink: {
    type: String,
    default: ''
  }
}, { timestamps: true });

export default mongoose.model('Project', ProjectSchema);
