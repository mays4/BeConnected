import mongoose from "mongoose";

const PostSchema  = new mongoose.Schema({
  fristName: {
    type: String,
    required:true,
    min:3,
    max:50,
  },
  lastName:{
     tyString,
    required:true,
    min:3,
    max:50,
  },
  
  
picturePath:{
  type:String,
  default:""
},
userPicturePath:{
  type:String,
  default:""
},
description:string,
location:string,
likes:Object,
comments:Array


}
,{timestamps:true}
);

const Post= mongoose.model("Post",PostSchema);
export default Post;
