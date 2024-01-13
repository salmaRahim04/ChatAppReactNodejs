import mongoose from 'mongoose';


const userSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    selectedFile:{type:String},
    followers:{type:Array},
    following:{type:Array},
    id:{type:String}
})

export default mongoose.model("User",userSchema)