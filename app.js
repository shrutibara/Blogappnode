const express = require('express');
const { connectDB } = require('./database');
const User = require('./models/usermodel');
const Post = require('./models/postmodel');
const Comment = require('./models/commentmodel');
// const bcrypt = require('bcrypt');

const mongoose = require('mongoose');
const bodyparser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 4000;
const cors = require('cors');
app.use(cors());
app.use(bodyparser.json())

connectDB()
app.post('/users/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(username, email, password);
    // const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password, role: "USER" });
    console.log(user);
    await user.save();
    res.json(user)

  } catch {
    res.status(500).json({ error: 'Could not fetch user' });
  }
});
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  const user = await User.findOne({ username, password });
  console.log(user);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(401).json({ error: 'Invalid username or password' });
  }
});
app.post('/api/posts', async (req, res) => {
  try {
    const { title, description, author } = req.body;
    const newPost = new Post({ title, description, author });
    await newPost.save();
    const user = await User.findById(author);
    if (user) {
      user.posts.push(newPost._id);
      await user.save();
    }
    res.status(201).json({ message: 'Post saved successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to save post' });
  }
});
app.get("/api/posts", async (req, res) => {
  try {
    const userId = req.query.userId;
    const posts = await Post.find({ author: userId }); // Retrieve all posts from the collection
    res.json(posts);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});
app.post('/api/posts/:postId/like', async (req, res) => {
  const postId = req.params.postId;
  try {
    const post = await Post.findById(postId);


    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    post.likes += 1;
    await post.save();

    res.status(200).json({ message: 'Like updated successfully', likes: post.likes });
  } catch (error) {
    console.error('Error updating like:', error);
    res.status(500).json({ message: 'Server error' });
  }
});




app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
// app.listen(PORT,() => console.log(`Server running on port ${PORT}`))