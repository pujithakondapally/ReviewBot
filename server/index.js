const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});


const { HfInference } = require('@huggingface/inference');
const client = new HfInference("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");

const User = mongoose.model('User', userSchema);

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    res.status(400).json({ error: 'Registration failed' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN);
      res.json({ message: 'Login successful', token, username: user.name }); // Send the username here
    } else {
      res.status(400).json({ error: 'Invalid email or password' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
});

app.post("/summarize", async (req, res) => {
  console.log("Received request to summarize:");
  const { reviews } = req.body;

  if (!reviews || !Array.isArray(reviews)) {
      return res.status(400).json({ error: "Invalid input. Expected an array of reviews." });
  }

  try {
      const chatCompletion = await client.chatCompletion({
          model: "mistralai/Mistral-7B-Instruct-v0.3",
          messages: [
          {
              role: "user",
              content: `Please provide a  summary of the following reviews in 75 words:\n\n${reviews}`,
          },
          ],
          max_tokens: 400, 
        });
      const summary = chatCompletion.choices[0].message.content;
      return res.json({ summary });
  } 
  catch (error) {
    console.error("Error processing reviews:", error);
    return res.status(500).json({ error: "Failed to process reviews"});
  }
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
