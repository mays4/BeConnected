import React from 'react'
import { Box,Typography,useMediaQuery,useTheme} from '@mui/material';
import { useEffect,useState } from 'react';
import {useParams} from "react-router-dom";
import { useSelector } from 'react-redux';
import Navbar from 'pages/navbar';
import UserCard from 'pages/Features/UserCard';
import FriendListCard from 'pages/Features/FriendListCard';
import PostsCard from 'pages/Features/PostsCard';
import MyPost from 'pages/Features/MyPost';
import FlexBox from "components/FlexBox";
const Profile= ()=> {
  const [user,setUser]=useState(null);
  const {userId}=useParams();
  const token = useSelector((state)=> state.token);
  const {_id}= useSelector((state)=> state.user);
  const {palette}=useTheme();
  const isUser= userId === _id;
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const URL = (useSelector((state)=>state.URL));

  const getUser = async ()=>{
    const response = await fetch(`${URL}/users/${userId}`,
    {
      methond:"GET",
      headers:{Authorization:`Bearer ${token}`}
    });
    const data =await response.json();
    setUser(data);
  }
  useEffect(()=>{
   getUser();
  },[])
  if (!user) return null;
  

  const profileStyles = {
    backgroundColor: isUser ? palette.primary.main : palette.secondary.main,
    minHeight: '100vh',
    width: '100%',
  };
  return (
<Box style={profileStyles}>
      <Navbar/>
     
      <Box width="100%" padding="2rem 6%" display={isNonMobileScreens?"flex":"block"} gap="2rem"justifyContent="center">
      <Box flexBasis={isNonMobileScreens?"25%":undefined}  sx={{marginTop:"1.80rem"}} >
        
<UserCard userId={userId} picturePath={user.picturePath} backgroundColor="red"/>

<Box margin="1rem 0" />
{isUser && (
  <FriendListCard userId={userId}  />
)}

</Box>

     {isUser?(
  
      <Box  flexBasis={isNonMobileScreens?"70%":undefined} mt={isNonMobileScreens? undefined:"2rem"} sx={{marginTop:"1.80rem"}}
      >
        
         <FlexBox sx={{width:"100%",
            backgroundColor:palette.primary.light,
            alignItems:"center",
            borderRadius:"0.5rem",
            padding:"0.25rem 1rem",
            marginBottom:"0.50rem"}}>  <Typography>This is Your profile personal space</Typography></FlexBox>
            <MyPost picturePath={user.picturePath} /> 
               
   <Box m="1rem"/>
  
   <PostsCard  userId={userId} isProfile/>
     </Box>
      
     ):(<Box flexBasis={isNonMobileScreens?"70%":undefined} mt={isNonMobileScreens? undefined:"2rem"} 
     >
      
        
  <Box m="1rem"/>
  <PostsCard  userId={userId} isProfile/>
     </Box>) }

      </Box>
      </Box>
  )
}
export default Profile;