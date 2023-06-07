import mongoose from "mongoose";

const PostSchema  = new mongoose.Schema({
  userId: {
    type: String,
    required:true,
  },
  fristName: {
    type: String,
    required:true,
    
  },
  lastName:{
     type:String,
    required:true,
   
  },
picturePath:String,
userPicturePath:String,
description:String,
location:String,
likes:{
  type:Map,
of:Boolean},

comments:{
  type:Array,
  default:[]
}


}
,{timestamps:true}
);

const Post= mongoose.model("Post",PostSchema);
export default Post;
