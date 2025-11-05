import express from 'express';
import multer from 'multer';

import{
    createStory,getAllStories,getStoryById,updateStory,deleteStory,uploadMedia
} from '../controllers/storyController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), uploadMedia);
router.post('/', createStory);
router.get('/', getAllStories);
router.get('/:id', getStoryById);
router.put('/:id', updateStory);
router.delete('/:id', deleteStory);



export default router;