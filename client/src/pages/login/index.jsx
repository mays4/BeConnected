import React from 'react';
import { Box,Typography,useTheme,useMediaQuery } from '@mui/material';
import Form from "./form";


const Login= ()=> {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const theme = useTheme();

  return (
    <Box>
      <Box withd="100%" background={theme.palette.background.default} padding="1rem 6%" textAlign="center" >
       <Typography fontWeight="bold" fontSize="32px" color ="primary"
      
        >
          BeConnected 
        </Typography>
        <Box width={isNonMobileScreens ? "50%" :"93%"} padding="2rem" margin="2rem auto"
        borderRadius="1.5rem" backgroundColor={theme.palette.background.alt} border="1px solid  " borderColor={theme.palette.primary.dark}>
          <Typography fontWeight="500" variant='h5' sx={{mb:"1.5rem"}}>
            Welecome to BeConnected, the social Media platform to connect with the world!
          </Typography>
          <Form >

          </Form>
        </Box>
        </Box>
    </Box>
  )
}
export default Login;