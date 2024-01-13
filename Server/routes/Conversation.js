import express from "express";
import Conversation from "../models/Conversation.js";
import mongoose from "mongoose";

const router = express.Router();

//new conv

router.post("/", async (req, res) => {
  console.log(req.body)
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  }); 
   console.log(newConversation)
  try {
   const findOrCreateConversation = async () => {
    try {
      // Check if a conversation already exists between the users
      const existingConversation = await Conversation.findOne({
        members: { $all: [req.body.senderId,  req.body.receiverId] },
      });
  
      if (existingConversation) {
        console.log('Conversation already exists:', existingConversation);
         const deletedConversation = await Conversation.deleteOne({
        _id: existingConversation._id,
      });

      if (deletedConversation.deletedCount === 1) {
        console.log('Deleted the duplicate conversation');
      } else {
        console.error('Error deleting the conversation');
      }
        // Handle the case where the conversation already exists
      } else {
        // Create a new conversation if it doesn't exist
        const newConversation = new Conversation({
          members: [req.body.senderId,  req.body.receiverId],
          // Add other conversation properties as needed
        });
        const savedConversation = await newConversation.save();
        console.log('New conversation created:', savedConversation);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      mongoose.connection.close();
    }
  };
  
  findOrCreateConversation();
  } catch (err) {
    res.status(500).json(err);
  }
});

//get conv of a user

router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get conv includes two userId

router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation)
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router