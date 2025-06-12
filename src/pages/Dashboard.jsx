import React, { useContext, useEffect, useState } from "react";
import { Container, Grid, Box, useMediaQuery, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import ProfileCard from "../components/ProfileCard";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";
import ConnectionsCard from "../components/ConnectionsCard";
import MessagesWidget from "../components/MessagesWidget";
import { postService } from "../services/api";
import LoadingScreen from "../components/LoadingScreen";
import { AuthContext } from "../contexts/AuthContext";

const Dashboard = () => {
  const { user, logout, loading } = useContext(AuthContext);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [next, setNext] = useState(null);
  const [prev, setPrev] = useState(null);
  const [postsloading, setPostsloading] = useState(true);
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      setPostsloading(true);
      const data = await postService.posts(page);

      if (data) {
        setPosts(data.results); // or append for pagination
        setNext(data.next);
        setPrev(data.previous);
      } else {
        setError("Failed to fetch posts");
      }

      setPostsloading(false);
    };

    fetchPosts();
  }, [page]);

  const handlePostSubmit = async(postData) => {
    console.log(postData);
    if (postData.id) {
      // Update existing post
      const editPost = await postService.editPost(postData.id, postData.content, postData.videoUrl);
      setPosts(
        posts.map((post) =>
          post.id === postData.id
            ? {
                ...post,
                content: postData.content,
                image: postData.image,
                videoUrl: postData.videoUrl,
              }
            : post
        )
      );
      setEditingPost(null);
    } else {
      // Create new post

      const newPost = await postService.createPost(postData.content, postData.videoUrl)

      // const newPost = {
      //   id: Date.now(),
      //   content: postData.content,
      //   image: postData.image,
      //   videoUrl: postData.videoUrl,
      //   timestamp: "Just now",
      //   likes: 0,
      //   comments: 0,
      //   shares: 0,
      //   user: {
      //     id: 1, // Current user ID
      //     name: "Alex Morgan",
      //     username: "alexmorgan",
      //     avatar:
      //       "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
      //     headline: "Senior Product Designer | UX/UI | Visual Design",
      //   },
      // };
      setPosts([newPost, ...posts]);
    }
  };

  const handlePostEdit = (post) => {
    setEditingPost(post);
  };

  const handlePostDelete = async(postId) => {
    try {
      const deletePost = await postService.deletePost(postId);
      console.log(deletePost);
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <LoadingScreen />;
  if (error) return <p>{error}</p>;

  return (
    <Container maxWidth="lg" sx={{ mt: 3, mb: 8, position: "relative" }}>
      <Grid container spacing={3}>
        {/* Left column */}
        {!isMobile && (
          <Grid size={{ xs: 12, md: 3 }}>
            <Box sx={{ position: "sticky", top: 24 }}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ProfileCard />
                {isTablet && <ConnectionsCard />}
              </motion.div>
            </Box>
          </Grid>
        )}

        {/* Main feed */}
        <Grid size={{ xs: 12, md: 6 }}>
          {isMobile && <ProfileCard />}

          <Box
            sx={{
              position: "sticky",
              top: 24,
              zIndex: 1,
              mb: 2,
              backgroundColor: theme.palette.background.default,
            }}
          >
            <CreatePost editPost={editingPost}
            onSubmit={handlePostSubmit}
            onCancel={() => setEditingPost(null)}/>
          </Box>

          <Box>
            {posts?.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <PostCard post={post} onEdit={handlePostEdit}
                  onDelete={handlePostDelete}/>
              </motion.div>
            ))}
          </Box>
        </Grid>

        {/* Right column */}
        {!isMobile && (
          <Grid size={{ xs: 12, md: 3 }}>
            <Box sx={{ position: "sticky", top: 24 }}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ConnectionsCard />
              </motion.div>
            </Box>
          </Grid>
        )}
      </Grid>

      {/* Floating Messages Widget */}
      {!isMobile && <MessagesWidget />}
    </Container>
  );
};

export default Dashboard;
