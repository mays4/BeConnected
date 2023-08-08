import {
  AttachFileOutlined,
  DeleteOutline,
  EditOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  useMediaQuery,
  IconButton,
  InputBase,
  Typography,
  useTheme,
} from "@mui/material";
import FlexBox from "components/FlexBox";
import CardWrapper from "components/CardWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import UserImage from "components/UserImage";
import Dropzone from "react-dropzone";

const MyPost = ({ picturePath }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const [image, setImage] = useState(null);
  const [isImage, setIsImage] = useState(false);
  const [post, setPost] = useState("");
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id } = useSelector((state) => state.user);
  const { palette } = useTheme();
  const medium = palette.neutral.medium;
  const mediumMain = palette.primary.mediumMain;
  const URL = useSelector((state) => state.URL);

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);

    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }

    const response = await fetch(`${URL}/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const posts = await response.json();

    dispatch(setPosts({ posts }));

    setImage(null);
    setPost("");
 
  };

  return (
    <CardWrapper>
      <FlexBox gap="1.5rem" sx={{ marginBottom: "2rem" }}>
        <UserImage image={picturePath} />
        <InputBase
          placeholder="What's on you mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBox>
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          marginLeft="2rem"
          padding="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBox>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add image</p>
                  ) : (
                    <FlexBox>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBox>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutline />
                  </IconButton>
                )}
              </FlexBox>
            )}
          </Dropzone>
        </Box>
      )}
      <Divider sx={{ margin: "1.25rem 0" }} />
      <FlexBox>
        <FlexBox gap="0.25" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{
              "&:hover": { cursor: "pointer", color: medium },
            }}
          >
            Image
          </Typography>
        </FlexBox>
        {isNonMobileScreens ? (
          <>
            <FlexBox gap="0.25rem">
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Clip</Typography>
            </FlexBox>
            <FlexBox gap="0.25rem">
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Attachment</Typography>
            </FlexBox>
            <FlexBox gap="0.25rem">
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Audio</Typography>
            </FlexBox>
          </>
        ) : (
          <>
            <FlexBox gap="0.25rem">
              <MoreHorizOutlined sx={{ color: mediumMain }} />
            </FlexBox>
          </>
        )}
        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            color: palette.neutral.medium,
            backgroundColor: palette.primary.mid,
            borderRadius: "3rem",
          }}
        >
          Post
        </Button>
      </FlexBox>
    </CardWrapper>
  );
};

export default MyPost;
