import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModal from '../models/user.js';
const secret = "test";
export const signin = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const oldUser = await UserModal.findOne({ email });
      const users= await UserModal.find({})
     
  
      if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });
  
      const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
  
      if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
  
      const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });
  
      res.status(200).json({ result: oldUser, token });
    } catch (err) {
      res.status(500).json({ message: "Something went wrong" });
    }
  };

export const signup = async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    try {
      const oldUser = await UserModal.findOne({ email });
  
      if (oldUser) return res.status(400).json({ message: "User already exists" });
  
      const hashedPassword = await bcrypt.hash(password, 12);
  
      const result = await UserModal.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });
  
      const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );
  
      res.status(201).json({ result, token });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
      
      console.log(error);
    }
  };
  export const getUser = async (req, res) => { 
    const { id } = req.params;

    try {
        const user = await UserModal.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export const getUsers = async (req, res) => { 

  try {
    const users = await UserModal.find({});
    console.log(users)
    res.status(200).json(users);
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
}
export const EditUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, selectedFile } = req.body;
console.log(name, email, password, selectedFile);
  try {
    const updatedUser = { name, email, selectedFile, _id: id };
    
  const user =  await UserModal.findByIdAndUpdate(id, updatedUser, { new: true });

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await UserModal.findByIdAndUpdate(id, { password: hashedPassword });
    }
console.log(user);
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
