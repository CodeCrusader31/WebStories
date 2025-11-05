import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const loginAdmin = (req, res) => {
  const { username, password } = req.body;

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.status(200).json({ token });
  }

  return res.status(401).json({ message: "Invalid credentials" });
};