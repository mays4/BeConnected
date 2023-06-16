import React,{useState} from 'react';
import { Box,IconButton,Typography,Select,MenuItem,InputBase,FormControl,useTheme,useMediaQuery } from '@mui/material';

import {
 Search, Message,DarkMode,LightMode,Help,Menu,Notifications,Close} from "@mui/icons-material";
 
 import {setMode,setLogout} from "state";
 import { useDispatch,useSelector } from 'react-redux';
 import { useNavigate } from 'react-router-dom';
 import FlexBox from 'components/FlexBox';



const Navbar = ()=> {
  const [isMobileMenuToggled ,SetIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.default;
  const alt= theme.palette.background.alt;

const initialName=!user ? "defaul User":`${user.firstName.slice(0,1).toUpperCase()} ${user.lastName.slice(0,1).toUpperCase()}`
const fullName=`${user.firstName} ${user.lastName}`

  return (
    <FlexBox padding="1rem 6%" backgroundColor={alt}>
      <FlexBox  >
        <Typography fontWeight="bold"  textDecoration="underline"   fontSize="clamp(1rem,2rem,2.25rem" color ="primary"onClick={()=>navigate("/home")}
        sx={{
          "&:hover":{
            color:primaryLight,
            cursor:'pointer'
          }
        }}
        >
          BeConnected 
        </Typography>
        {isNonMobileScreens && (
            <FlexBox backgroundColor={neutralLight} borderRadius="9px" gap="rem" padding="0.1rem 1.5rem" marginLeft="8rem"
            >
              <InputBase placeholder='Search to BeConnected...'/>
              <IconButton>
                <Search/>
              </IconButton>
              </FlexBox>
          )
        }
      </FlexBox>
      {
        isNonMobileScreens ?(
        <FlexBox gap="2rem">
          <IconButton onClick={()=>dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{fontSize:"25px"}}/>
            ):(
              <LightMode sx={{color:dark,fontSize:"25px"}}/>
            )}
    
          </IconButton>
          <Message sx={{fontSize:"25px"}}/>
          <Notifications sx={{fontSize:"25px"}}/>
          <Help sx={{fontSize:"25px"}}/>
          <FormControl variant="standard" value={initialName}>
     <Select value={initialName}
     inputProps={{ IconComponent: () => null }}
          sx={{
            backgroundColor:neutralLight,
            width:"50px",
            height:"50px",
            borderRadius:"50%",
          
            
            // padding:"0.25rem 1rem",
            // // "& .MuiSvgIcon-root" :{
            // //   // pr:"0.25rem",
            // //   // width:"3rem"
            // },
            "& .MuiSelect-select:focus":{
              backgroundColor:"transparent"
            }
          }}
          input= {<InputBase/>}
          >
          <MenuItem value={initialName}>
            <Typography style={{paddingLeft:"0.75rem"}}>
              {initialName}
            </Typography>
          </MenuItem>
          <MenuItem onClick={()=> dispatch(setLogout())}>Log out
          </MenuItem>
                 </Select>
          </FormControl>
        
        </FlexBox >
        ):(<IconButton onClick={()=>SetIsMobileMenuToggled(!isMobileMenuToggled)}>
     <Menu/>
        </IconButton>)
      }

{
  !isNonMobileScreens && isMobileMenuToggled &&(
    <Box position="fixed"
    right="0"
    bottom="0"
    height="100%"
    zIndex="10"
    maxWidth="500px"
    minWidth="300px"
    backgroundColor={background}
    >
      <Box display="flex" justifyContent="flex-end" padding="1rem">
      <IconButton onClick={()=>SetIsMobileMenuToggled(!isMobileMenuToggled)}>
        <Close/>
        </IconButton>
      </Box>
      <FlexBox display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="3rem">
          <IconButton onClick={()=>dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{fontSize:"25px"}}/>
            ):(
              <LightMode sx={{color:dark,fontSize:"25px"}}/>
            )}
    
          </IconButton>
          <Message sx={{fontSize:"25px"}}/>
          <Notifications sx={{fontSize:"25px"}}/>
          <Help sx={{fontSize:"25px"}}/>
          <FormControl variant="standard" value={fullName} >
     <Select value={fullName}
   
          sx={{
            backgroundColor:theme.palette.background.alt,
            width:"150px",
            borderRadius:"0.75rem",
            padding:"0.25rem 1rem",
            
            "& .MuiSvgIcon-root" :{
              pr:"0.25rem",
              width:"3rem",
       
             
              
              
            },
            "& .MuiSelect-select:focus":{
              backgroundColor:"transparent"
            }
          }}
          input= {<InputBase />}
          >
          <MenuItem value={fullName} >
            <Typography >
              {fullName}
            </Typography>
          </MenuItem>
          <MenuItem onClick={()=> dispatch(setLogout())}>Log out
          </MenuItem>
                 </Select>
          </FormControl>
        
        </FlexBox >
      
    </Box>
  )
}
    </FlexBox>
  
  )
}
export default Navbar;