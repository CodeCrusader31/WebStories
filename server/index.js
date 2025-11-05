
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import storyRoutes from './routes/storyRoutes.js';
import authRoutes from './routes/authRoutes.js';
dotenv.config();
const app = express();


app.use(cors({
  origin: "*", 
}));
app.use(express.json());
app.use('/stories', storyRoutes);
app.use('/auth', authRoutes);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('Web Stories API is running');
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
