import Story from "../models/stories.js";

  
export const uploadStory = async (req, res) => {
    try {
        const { originalname, filename } = req.file;
       const {userId} = req.params
        const story = new Story({
          title: req.body.title,
          user:userId,
          filename: filename,
          originalFilename: originalname,
        });
    
        await story.save();
        const photoDetails = {
            _id: story._id, // Assuming you have an _id field in your Story schema
            title: story.title,
            filename: story.filename,
            originalFilename: story.originalFilename,
            createdAt: story.createdAt,
            user:userId
          };
      
          res.status(201).json({ message: 'Story uploaded successfully', photo: photoDetails });
    } catch (error) {
      res.status(500).json({ message: 'Failed to upload story', error });
    }
  };