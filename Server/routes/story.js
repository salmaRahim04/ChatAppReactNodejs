import express from 'express';
import { uploadStory } from '../controllers/story.js';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import  path  from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', 'uploads/')); // Move up one directory
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });
router.post('/:userId/upload',upload.single('file'),uploadStory);
export default router