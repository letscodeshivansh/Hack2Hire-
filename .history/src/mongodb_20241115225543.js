const mongoose = require("mongoose");


const mongoURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/MakeMyWork";

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });


  const taskSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    deadline: {
      type: Date,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    images: [{
      type: String, 
    }],
    taskOwner: {
      type: String,
      required: true
    }
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true 
  },
  password: {
    type: String,
    required: true
  }
});

const postSchema = new mongoose.Schema({
  caption: String,
  imageUrl: String,
  author: String,   // Store the username or user ID
  createdAt: { type: Date, default: Date.now },
});

const messageSchema = new mongoose.Schema({
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
  sender: String,
  receiver: String,  
  message: String,
  dateTime: { type: Date, default: Date.now },
});


const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  bio: String,
  contact: String,
  totalConnections: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 5
  },
  backgroundImage: String,
  mainImage: String,
  experience: [String], // Array of strings for each experience item
  education: [String], // Array of strings for each education item
  projects: [String], // Array of strings for each project done
  skills: [String] // Array of strings for each skill
});


const Profile = mongoose.model('Profile', profileSchema);

// Create and export the Task model
const Task = mongoose.model('Task', taskSchema);

// Create and export the User model
const User = mongoose.model('User', userSchema);

const Message = mongoose.model('Message', messageSchema);

const Post = mongoose.model('Post', postSchema);

module.exports = { User, Task, Message, Post };