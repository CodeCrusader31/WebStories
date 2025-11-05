
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import storyRoutes from './routes/storyRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/stories', storyRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('Web Stories API is running');
});

app.listen(5000, () => console.log('Server running on port 5000'));
