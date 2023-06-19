import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
  DeleteOutline,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import CardWrapper from "components/CardWrapper";
import FlexBox from "components/FlexBox";
import Friend from "pages/Cards/Friend";
import {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";


const PostCard=({ postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments})=>{
   
    const [isComments, setIsComments] = useState(false);
    const[isDeleted,setIsDeleted]=useState(false)
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
   
    const loggedInUserId = useSelector((state) => state.user._id);
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;

    const URL = (useSelector((state)=>state.URL))
    const handleLike= async()=>{
      const response = await fetch(`${URL}/posts/${postId}/like`,{
        method:"PATCH",
        headers:{
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),

        
      });
      const updatedPost =await response.json();
      dispatch(setPost({post:updatedPost}));

    }

    const handleDelete = async()=>{
      if(loggedInUserId !==postUserId){
        return;
      }

      const response = await fetch(`${URL}/posts/${postId}`,{
        method: 'DELETE',
        headers:{
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
          });
          
          const updatedPost =await response.json();
          setIsDeleted(true)
        }
        if(isDeleted)return null;

    
return(
  <CardWrapper margin="2rem 0">
    <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
        crossOrigin="anonymous"
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`${URL}/assets/${picturePath}`}
        />
      )}
      <FlexBox mt="0.25rem">
        <FlexBox gap="1rem">
          <FlexBox gap="0.3rem">
            <IconButton onClick={handleLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBox>

          <FlexBox gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
            {/* <Typography>{comments}</Typography> */}
          </FlexBox>
        </FlexBox>

        
          <Box display="flex" gap="2rem">
          <IconButton  onClick={handleDelete}>
          <  DeleteOutline/>
          </IconButton>
          <IconButton>
          <ShareOutlined />
          </IconButton>
          </Box>
       
      </FlexBox>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
  </CardWrapper>
)
}
export default PostCard;

