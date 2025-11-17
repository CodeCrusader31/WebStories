import Story from '../models/story.js';
import cloudinary from '../configs/cloudinary.js';
import fs from 'fs';



export const createStory = async (req,res) => {
    try{
        const {title,category,slides} = req.body;
        const newStory = new Story({title,category,slides});
        await newStory.save();
        res.status(201).json(newStory);

    }
    catch(err){
        res.status(500).json({message: err.message});
    }
};


export const getAllStories = async (req,res) => {
    try{
        const stories = await Story.find().sort({createdAt: -1});
        res.status(200).json(stories);

    }
    catch(err){
        res.status(500).json({message: err.message});
    }
};


export const getStoryById = async(req,res) => {
    try{
        const story = await Story.findById(req.params.id);
        if(!story){
            return res.status(404).json({message: 'Story not found'});
        }

        res.status(200).json(story);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
};



export const updateStory = async(req ,res)=>{
    try{
        const {title,category,slides} = req.body;
        const story = await Story.findByIdAndUpdate(
            req.params.id,
            {title,category,slides},
            {new:true}
        );

        if(!story){
            return res.status(404).json({message: 'Story not found'});
        }
        res.json(story);
    }
        catch(err){
            res.status(500).json({message: err.message});
        }
    
};


export const deleteStory = async(req,res) => {
    try{
        const story = await Story.findByIdAndDelete(req.params.id);
        if(!story){
            return res.status(404).json({message: 'Story not found'});
        }
        
        
        for(const slide of story.slides){
            if(slide.uri){
                const publicId = getPublicIdFromUrl(slide.uri);
                if(publicId){
                    await cloudinary.uploader.destroy(publicId, {resource_type: slide.type === 'video' ? 'video' : 'image'});
                }
            }
        }

        res.json({message: 'Story deleted successfully'});
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}



export const uploadMedia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "auto",
    });

  
    fs.unlinkSync(req.file.path);

    res.status(200).json({ url: result.secure_url });
  } catch (error) {
    console.error(" Cloudinary Upload Error:", error);
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
};