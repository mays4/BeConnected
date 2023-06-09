import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";
import FlexBox from "../../components/FlexBox";
import UserImage from "../../components/UserImage";

const Friend = ({ friendId, name, subtitle, userPicturePath, userId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const URL = (useSelector((state)=>state.URL))
  const isFriend = Array.isArray(friends)?friends?.find((friend) => friend._id === friendId): [];
  const isSelf = friendId === _id;

  const handleFriend= async () => {
    const response = await fetch(`${URL}/users/${_id}/${friendId}`,
     {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
  
      
    })
    try{
      const data = await response.json();
      dispatch(setFriends({friends: data}));;

    }
    catch(e){
      console.log(e)
    }
  
  };

  return (
    <FlexBox>
      <FlexBox gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBox>
      {!isSelf && (
        <IconButton
          onClick={handleFriend}
          sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        > 
          {isFriend? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton> 

      )}
       
    </FlexBox>
  );
};

export default Friend;