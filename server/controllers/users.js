
import User from "../models/User.js";


/* read */

export const getUser = async(req,res)=>{
  try{
   const {id} = req.params;

   const user = await User.findById(id);
   res.status(200).json(user);
  }catch(err){
    res.status(404).json({message:err.message})
  }
}

export const getUserFriends = async (req, res) => {
  console.log("wer ae her")
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({_id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
/* update */

// export const addRemoveFriend = async (req,res)=>{
//   try{
//     const {id,friendId} = req.params;
//     const{name, subtitle, userPicturePath }=req.body;
//     console.log("re",req.pody)
//     console.log("df",id,friendId)
//     // console.debug(JSON.stringify(`what getting",id,friendId`,id,friendId))
//     const user = await User.findById(id);
//     const friend = await User.findById(friendId);
// //  if(!user.friends.length<1){
// //   return "no friends";
// //  }
//     if(user.friends.includes(friendId)){
//       user.friends = user.friends.filter((id)=> id !== friendId);
//       friend.friends = friend.friends.filter((id)=> id !== id);
//     }else{
//       user.friends.push(friendId);
//       friend.friends.push(id);
//     }
//     await user.save();
//     await friend.save();

//     const friends = await Promise.all(
//       user.friends.map((id)=> User.findById(id))
//     );
//     const formattedFriends = friends.map(({
//       _id,firstName,lastName,occupation, location ,picturePath
//     })=>{
//       return{ _id,firstName, lastName,occupation , location ,picturePath}
//     });
//     res.status(200).json(formattedFriends);

//   }catch(err){

//     res.status(404).json({err:err.message})
//   }
// }
export const addRemoveFriend = async (req, res) => {
  
  try {
    if(req.user.id!==req.params.id){
      return res.status(403).json("Not authorized")
  } 
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      });

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};