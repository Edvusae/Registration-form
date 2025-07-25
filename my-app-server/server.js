const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet'); // optional but good
const authRoutes = require('./routes/auth');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(helmet()); // Add for security
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Health check route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
