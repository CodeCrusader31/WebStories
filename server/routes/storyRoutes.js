// import express from 'express';
// import multer from 'multer';
// import { verifyAdmin } from "../middlewares/authMiddleware.js";
// import{
//     createStory,getAllStories,getStoryById,updateStory,deleteStory,uploadMedia
// } from '../controllers/storyController.js';

// const router = express.Router();
// const upload = multer({ dest: 'uploads/' });

// router.post('/upload', verifyAdmin,upload.single('file'), uploadMedia);
// router.post('/', verifyAdmin, createStory);
// router.get('/', getAllStories);
// router.get('/:id', getStoryById);
// router.put('/:id', verifyAdmin, updateStory);
// router.delete('/:id',  verifyAdmin,deleteStory);



// export default router;

// routes/stories.js
import express from 'express';
import multer from 'multer';
import { verifyAdmin } from "../middlewares/authMiddleware.js";
import {
    createStory, getAllStories, getStoryById, updateStory, deleteStory, uploadMedia
} from '../controllers/storyController.js';

const router = express.Router();

// Enhanced multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Create unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  // Allow images and videos
  if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
    cb(null, true);
  } else {
    cb(new Error('Only images and videos are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB limit
  }
});

// Make sure the uploads directory exists
import fs from 'fs';
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

router.post('/upload', verifyAdmin, upload.single('file'), uploadMedia);
router.post('/', verifyAdmin, createStory);
router.get('/', getAllStories);
router.get('/:id', getStoryById);
router.put('/:id', verifyAdmin, updateStory);
router.delete('/:id', verifyAdmin, deleteStory);

export default router;