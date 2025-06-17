import React, { useState, useContext, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  Box,
  IconButton,
  Button,
  Divider,
  Menu,
  MenuItem,
  TextField,
  useTheme,
  alpha,
  Collapse,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion, AnimatePresence } from "framer-motion";
import {
  ThumbsUp,
  MessageSquare,
  Send,
  Bookmark,
  MoreHorizontal,
  Heart,
  Share2,
  Edit as EditIcon,
  Trash as TrashIcon,
} from "lucide-react";
import { AuthContext } from "../contexts/AuthContext";
import { postService } from "../services/api";

const PostImage = styled("img")({
  width: "100%",
  height: "auto",
  objectFit: "cover",
  borderRadius: 4,
});

const InteractionButton = styled(Button)(({ theme, active }) => ({
  color: active ? theme.palette.primary.main : theme.palette.text.secondary,
  textTransform: "none",
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.04),
  },
}));

const CommentItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(1.5),
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.04),
  },
}));

const PostCard = ({ post, onEdit, onDelete }) => {
  const theme = useTheme();
  const { user } = useContext(AuthContext);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.total_likes);
  const [commentCount, setCommentCount] = useState(post.total_comments);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [bookmarked, setBookmarked] = useState(false);
  const [comments, setComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState("");

  const isOwner = post.user.id === user?.id;

  useEffect(() => {
    (async () => {
      const existingLike = await postService.postLikeStatus(
        post.user.id,
        post.id
      );
      if (existingLike) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    })();
  }, [post.user.id, post.id]);

  useEffect(()=>{
    (async () => {
      const existingComments = await postService.postCommentByID(post.id)
      setComments(existingComments); 
    })();
  },[post.user.id, post.id])
  console.log(comments);

  const handleLike = async () => {
    // 1) Check current like status
    const existingLike = await postService.postLikeStatus(
      post.user.id,
      post.id
    );

    if (existingLike) {
      // ===> User has already liked; so we “dislike” (delete the like)
      const deleteResult = await postService.postDislike(post.id, post.user.id);
      if (deleteResult !== null) {
        setLikeCount((prev) => prev - 1);
        setLiked(false);
      }
      // If deleteResult is null, either there was no like to begin with,
      // or a network error occurred; you can show an error message if you want.
    } else {
      // ===> User has not liked yet; so we “like” (create a new like)
      const newLike = await postService.postLike(post.id);
      if (newLike) {
        setLikeCount((prev) => prev + 1);
        setLiked(true);
      }
      // If newLike is null, something went wrong; handle error as needed.
    }
  };

  const handleCommentToggle = () => {
    setShowComments(!showComments);
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleEdit = () => {
    handleMenuClose();
    onEdit(post);
  };

  const handleDelete = () => {
    handleMenuClose();
    onDelete(post.id);
  };

  const handleCommentSubmit = async () => {
    if (!commentText.trim() || !user?.id) return;

    const existingComment = await postService.postCommentStatus(
      post.user.id,
      post.id
    );

    if (existingComment) {
      console.log("You have already commented");
    } else {
      try {
        // Call your POST /posts/:postId/comments/ endpoint
        const createdComment = await postService.postComment(
          post.id,
          commentText.trim()
        );

        if (createdComment) {
          // Add the newly returned comment object into local state
          setComments((prev) => [...prev, createdComment]);
          setCommentText("");
          // Optionally bump your local comment‐count if you track it:
          setCommentCount((prev) => prev + 1);
        }
      } catch (err) {
        console.error("Failed to submit comment:", err);
      }
    }
  };

  const handleEditComment = (comment) => {
    setEditingCommentId(comment.id);
    setEditCommentText(comment.text);
  };

  const handleSaveComment = async (commentId) => {
    if (!editCommentText.trim()) return;

    try {
      // Call your PUT /posts/:postId/comments/:commentId/ endpoint
      const updatedComment = await postService.postCommentUpdate(
        post.id,
        commentId,
        editCommentText.trim()
      );

      if (updatedComment) {
        // Replace the old comment in local state with the updated one
        setComments((prev) =>
          prev.map((c) => (c.id === commentId ? updatedComment : c))
        );
        setEditingCommentId(null);
        setEditCommentText("");
      }
    } catch (err) {
      console.error("Failed to save edited comment:", err);
    }
  };

  const handleDeleteComment = (commentId) => {
    setComments(comments.filter((comment) => comment.id !== commentId));
  };
  const extractYouTubeId = (url) => {
    const regExp =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/i;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };
  console.log(user);
  return (
    <Card
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      elevation={1}
      sx={{ mb: 3 }}
    >
      <CardHeader
        avatar={<Avatar src={post.user.avatar} alt={post.user.name} />}
        action={
          isOwner ? (
            <IconButton aria-label="settings\" onClick={handleMenuOpen}>
              <MoreHorizontal size={20} />
            </IconButton>
          ) : null
        }
        title={
          <Typography variant="subtitle1" fontWeight={600}>
            {post.user.name}
          </Typography>
        }
        subheader={
          <Box>
            <Typography variant="body2" color="text.secondary">
              {post.user.headline}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {post.timestamp}
            </Typography>
          </Box>
        }
      />

      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 2,
          sx: { borderRadius: 2, minWidth: 180 },
        }}
      >
        <MenuItem onClick={handleEdit}>
          <EditIcon size={18} style={{ marginRight: 8 }} />
          Edit post
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>
          <TrashIcon size={18} style={{ marginRight: 8 }} />
          Delete post
        </MenuItem>
      </Menu>

      <CardContent sx={{ pt: 0, pb: 1 }}>
        <Typography variant="body1" paragraph>
          {post.content}
        </Typography>

        {post.image && (
          <Box sx={{ mt: 1, mb: 1 }}>
            <PostImage
              src={post.image}
              alt="Post content"
              loading="lazy"
              component={motion.img}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            />
          </Box>
        )}

        {post.video_url && (
          <Box sx={{ mt: 2 }}>
            <Typography
              variant="body2"
              color="primary"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              Video Preview:
            </Typography>
            {/* Aspect‐ratio wrapper: 16:9 => padding-top: 56.25% */}
            <Box
              sx={{
                position: "relative",
                paddingTop: "56.25%",
                mt: 1,
              }}
            >
              <Box
                component="iframe"
                src={`https://www.youtube.com/embed/${extractYouTubeId(
                  post.video_url
                )}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
              />
            </Box>
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 1,
            mb: 1,
            px: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <motion.div
              animate={liked ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <Heart
                size={16}
                fill={liked ? theme.palette.primary.main : "none"}
                color={
                  liked
                    ? theme.palette.primary.main
                    : theme.palette.text.secondary
                }
              />
            </motion.div>
            <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
              {likeCount}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              {post.total_comments} comments • {post.shares} shares
            </Typography>
          </Box>
        </Box>
      </CardContent>

      <Divider />

      <CardActions sx={{ justifyContent: "space-between", px: 2 }}>
        <InteractionButton
          startIcon={<ThumbsUp size={18} />}
          onClick={handleLike}
          active={liked ? 1 : 0}
        >
          Like
        </InteractionButton>

        <InteractionButton
          startIcon={<MessageSquare size={18} />}
          onClick={handleCommentToggle}
        >
          Comment
        </InteractionButton>

        <InteractionButton startIcon={<Share2 size={18} />}>
          Share
        </InteractionButton>

        <InteractionButton
          startIcon={<Bookmark size={18} />}
          onClick={handleBookmark}
          active={bookmarked ? 1 : 0}
        >
          Save
        </InteractionButton>
      </CardActions>

      <Collapse in={showComments}>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: "flex", mb: 2 }}>
            <Avatar
              src={user?.avatar}
              alt={user?.name}
              sx={{ mr: 1.5, width: 36, height: 36 }}
            />
            <Box sx={{ display: "flex", flexGrow: 1 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Add a comment..."
                variant="outlined"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                InputProps={{
                  sx: {
                    borderRadius: 4,
                  },
                  endAdornment: (
                    <IconButton
                      color="primary"
                      disabled={!commentText.trim()}
                      onClick={handleCommentSubmit}
                    >
                      <Send size={18} />
                    </IconButton>
                  ),
                }}
              />
            </Box>
          </Box>

          <List sx={{ maxHeight: 300, overflow: "auto" }}>
            {comments && comments.map((comment) => (
              <CommentItem key={comment.id}>
                <ListItemAvatar>
                  <Avatar src={comment.user.avatar} alt={comment.user.name} />
                </ListItemAvatar>
                {editingCommentId === comment.id ? (
                  <Box sx={{ flexGrow: 1, display: "flex", gap: 1 }}>
                    <TextField
                      fullWidth
                      size="small"
                      value={editCommentText}
                      onChange={(e) => setEditCommentText(e.target.value)}
                      autoFocus
                    />
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleSaveComment(comment.id)}
                    >
                      Save
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => setEditingCommentId(null)}
                    >
                      Cancel
                    </Button>
                  </Box>
                ) : (
                  <>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle2\" component="span">
                          {comment.user.name}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography
                            variant="body2"
                            color="text.primary"
                            sx={{ mt: 0.5 }}
                          >
                            {comment.text}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {comment.timestamp}
                          </Typography>
                        </>
                      }
                    />
                    {comment.user.id === user?.id && (
                      <ListItemSecondaryAction>
                        <IconButton
                          size="small"
                          onClick={() => handleEditComment(comment)}
                        >
                          <EditIcon size={16} />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteComment(comment.id)}
                          sx={{ color: "error.main" }}
                        >
                          <TrashIcon size={16} />
                        </IconButton>
                      </ListItemSecondaryAction>
                    )}
                  </>
                )}
              </CommentItem>
            ))}
          </List>
        </Box>
      </Collapse>
    </Card>
  );
};

export default PostCard;
