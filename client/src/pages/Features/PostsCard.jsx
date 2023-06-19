
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostCard from "./PostCard";

const PostsCard=({ userId, isProfile = false })=>{
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const URL = (useSelector((state)=>state.URL))

  const getPosts= async ()=>{
    const response = await fetch(`${URL}/posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
   
    dispatch(setPosts({ posts: data }));
  };
  const getUserPosts=async ()=>{
    const response = await fetch(`${URL}/posts/${userId}/posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
  
    dispatch(setPosts({ posts: data }));
  };
  useEffect(()=>{
    if(isProfile){
      getUserPosts();
   
    }else{
      getPosts();
    
    }

  },[]); // eslint-disable-line react-hooks/exhaustive-deps

  return(
    <>
    
     {posts?.map((post)=>
    
        ( 
        <PostCard
        key={post._id}
        postId={post._id}
        postUserId={post.userId}
        name={`${post.firstName} ${post.lastName}`}
        description={post.description}
        location={post.location}
        picturePath={post.picturePath}
         userPicturePath={post.userPicturePath}
        likes={post.likes}
        comments={post.comments}
      
        />
            
        )
      
        )}
    

    </>
  );

};

export default PostsCard;