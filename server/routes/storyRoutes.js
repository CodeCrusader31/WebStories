import express from 'express';
import multer from 'multer';
import { verifyAdmin } from "../middlewares/authMiddleware.js";
import{
    createStory,getAllStories,getStoryById,updateStory,deleteStory,uploadMedia
} from '../controllers/storyController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', verifyAdmin,upload.single('file'), uploadMedia);
router.post('/', verifyAdmin, createStory);
router.get('/', getAllStories);
router.get('/:id', getStoryById);
router.put('/:id', verifyAdmin, updateStory);
router.delete('/:id',  verifyAdmin,deleteStory);



export default router;