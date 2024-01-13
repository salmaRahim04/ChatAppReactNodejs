import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose'
import cors from 'cors'
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import storyRoutes from './routes/story.js';
import conversationRoute from "./routes/Conversation.js";
import messageRoute from "./routes/message.js";
import followersRoute from "./routes/followers.js";
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors())
app.use('/posts',postRoutes);
app.use('/user',userRoutes);
app.use('/stories', storyRoutes);
app.use('/uploads', express.static('uploads'));
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/followers", followersRoute);


const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser:true,useUnifiedTopology:true})
 .then(() =>  {
    app.listen(PORT,()=> console.log( `Server is listening to ${PORT}`)) 
 }).catch((err) => {
     console.log(err.message);
 });