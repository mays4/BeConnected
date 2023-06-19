import React from 'react'
import { Box,useMediaQuery} from '@mui/material';
import { useSelector } from 'react-redux';
import Navbar from 'pages/navbar';
import UserCard from 'pages/Cards/UserCard';
import FriendListCard from 'pages/Cards/FriendListCard';
import MyPost from "pages/Cards/MyPost";
import PostsCard from "pages/Cards/PostsCard";



const Home = ()=> {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <Box >
      <Navbar/>
      <Box width="100%" padding="2rem 6%" display={isNonMobileScreens?"flex":"block"} gap="0.5rem"justifyContent="space-between">

    
      <Box flexBasis={isNonMobileScreens?"33%":undefined} >
       <UserCard userId={_id} picturePath={picturePath}/>
   
      {isNonMobileScreens &&(
          <Box flexBasis="30%">
        <Box margin="2rem 0 ">
          {/* <FriendListCard userId={_id}/> */}
        </Box>
       </Box>
      )}
         </Box>

      <Box flexBasis={isNonMobileScreens?"60%":undefined} mt={isNonMobileScreens? undefined:"2rem"}
      >
       <MyPost picturePath={picturePath} />
          <PostsCard userId={_id} />
      </Box>
     </Box>
      </Box>
  )
}
export default Home;
