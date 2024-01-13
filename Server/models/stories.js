import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: String,
  filename: String,
  originalFilename: String,
  createdAt: { type: Date, default: Date.now },
});

const Story = mongoose.model('Story', storySchema);

export default Story;