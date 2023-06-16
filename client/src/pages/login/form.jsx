import { useState } from "react";
import { Box,Button,Typography,useTheme,useMediaQuery, TextField } from '@mui/material';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBox";
const registerSchema = yup.object().shape({
  firstName:yup.string().required("required"),
  lastName:yup.string().required("required"),
  email:yup.string().email("Invalid Email").required("required"),
  password:yup.string().required("required"),
  location:yup.string().required("required"),
  occupation:yup.string().required("required"),
  picture:yup.string().required("required")
})
const loginSechma = yup.object().shape({
  email:yup.string().email("Invalid Email").required("required"),
  password:yup.string().required("required"),
})
const intialValuesRegister={
  firstName:"",
  lastName:"",
  email:"",
  password:"",
  location:"",
  occupation:"",
  picture:""
}
const initailValuesLogin={
  email:"",
  password:"",
}

const Form=()=>{
  const [pageType,setPageType]=useState('login');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width:600px)");
  const {palette} = useTheme();
  const isLogin= pageType ==="login";
  const isRegister=pageType==="register";


   
   

  
 
  const handleRegister= async(values,onSubmitProps)=>{
    // fom data to send information with image
    const formData = new  FormData();
    for(let value in values){
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);
    // save data returned from backend
    const savedUserResponse = await fetch(
      "http://localhost:3001/auth/register",
      {
        method:"POST",
        body: formData,
      }
    );
    const savedUser= await savedUserResponse.json();
   
    onSubmitProps.resetForm();
    if(savedUser){
      setPageType('login');
    }
  };
  const handleLogin = async(values,onSubmitProps)=>{
    const loggedInResponse = await fetch(
      "http://localhost:3001/auth/login",
      {
        method:"POST",
        headers:{ "Content-Type": "application/json" },
        body:JSON.stringify(values)
      }
    );
    const loggedIn= await loggedInResponse.json();
    onSubmitProps.resetForm();
    if(loggedIn){
      dispatch(
        setLogin({
          user:loggedIn.user,
          token:loggedIn.token
        })
      );
      navigate("/home");
  
    }


  };
  const handleFormSubmit = async(values,onSubmitProps)=>{
    if(isLogin) return await handleLogin(values,onSubmitProps);
    if(isRegister) return await handleRegister(values,onSubmitProps)
  };
return(
<Formik onSubmit={handleFormSubmit} 
 initialValues={isLogin ? initailValuesLogin : intialValuesRegister}
 validationSchema={isLogin ? loginSechma :registerSchema}

>
{({
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    resetForm
  })=>(
    <form onSubmit={handleSubmit} >
      <Box display="grid" gap="30px" gridTemplateColumns="repeat(4,minmax(0,1fr)"         
      
       sx={{

        "&>div":{
          gridColumn:isNonMobileScreens ? undefined :"span 4"
        }
       }}
       >
        {
          isRegister &&(
            <>
            <TextField label="First Name" onBlur={handleBlur} onChange={handleChange} value={values.firstName} name="firstName" error={Boolean(touched.firstName) && Boolean(errors.firstName)}
            helperText={touched.firstName && errors.firstName}
            sx={{
              
              gridColumn:"span 2"
            }}
            />
            <TextField label="Last Name" onBlur={handleBlur} onChange={handleChange} value={values.lastName} name="lastName" error={Boolean(touched.lastName) && Boolean(errors.lastName)}
            helperText={touched.lastName && errors.lastName}
            sx={{
              gridColumn:"span 2"
            }}
            />
            <TextField label="Location" onBlur={handleBlur} onChange={handleChange} value={values.location} name="location" error={Boolean(touched.location) && Boolean(errors.location)}
            helperText={touched.location && errors.location}
            sx={{
              gridColumn:"span 2"
            }}
            />
            <TextField label="Occupation" onBlur={handleBlur} onChange={handleChange} value={values.occupation} name="occupation" error={Boolean(touched.occupation) && Boolean(errors.occupation)}
            helperText={touched.occupation && errors.occupation}
            sx={{
              gridColumn:"span 2"
            }}
            />
       
         <Box gridColumn="span 4" border={`1px solid ${palette.neutral.medium}`}
          borderRadius="5px"
          padding="1rem"
         >
           <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>

         </Box>
            </>
          )}
           <TextField label="Email" onBlur={handleBlur} onChange={handleChange} value={values.email} name="email" error={Boolean(touched.email) && Boolean(errors.email)}
            helperText={touched.email && errors.email}
            sx={{
              gridColumn:"span 2"
            }}
            />
            <TextField label="Password" onBlur={handleBlur} type="password" onChange={handleChange} 
          value={values.password} name="password" error={Boolean(touched.password) && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            sx={{
              gridColumn:"span 2"
            }}
            />
      
      <Box sx={{gridColumn:"span 4", display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"  }}>
        <Button
        // fullWidth
         
         type="submit"
         sx={{
           width:"80%",
           alignItems:"center",
           borderRadius:"50px",
           border:"2px solid ",
            borderColor:palette.primary.dark,
           margin: "2rem 6rem",
           padding: "1rem",
           backgroundColor: palette.primary.main,
           color: palette.background.alt,
           "&:hover": { color: palette.primary.main},
         }}
        >
           {isLogin ? "LOGIN" : "REGISTER"}
          </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
            
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>

        

      </Box>
      </Box>
    </form>
  )}
</Formik>
)
}


export default Form;