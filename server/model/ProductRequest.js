const mongoose = require('mongoose');

// User schema
const UserSchema = new mongoose.Schema({
  image: String,
  name: String,
  username: String
});

// Comment schema
const CommentSchema = new mongoose.Schema({
  id: Number,
  content: String,
  user: UserSchema,
  replies: [{
    content: String,
    replyingTo: String,
    user: UserSchema
  }]
});

// Product request schema
const ProductRequestSchema = new mongoose.Schema({
  id: Number,
  title: String,
  category: String,
  upvotes: Number,
  status: String,
  description: String,
  newComments: [String],
  newReplies : [String],
  comments: [CommentSchema]
});

const ProductRequest = mongoose.model('ProductRequest', ProductRequestSchema);

module.exports = ProductRequest;
