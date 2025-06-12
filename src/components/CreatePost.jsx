import React, { useState, useContext, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Box, 
  Avatar, 
  Divider, 
  Typography,
  IconButton,
  useTheme,
  alpha,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { motion } from 'framer-motion';
import { 
  Image as ImageIcon, 
  Video as VideoIcon, 
  Calendar as CalendarIcon, 
  MessageSquare as ArticleIcon, 
  X as CloseIcon
} from 'lucide-react';
import { AuthContext } from '../contexts/AuthContext';

const CreatePost = ({ editPost = null, onSubmit, onCancel }) => {
  const theme = useTheme();
  const { user } = useContext(AuthContext);
  const [postText, setPostText] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [videoDialogOpen, setVideoDialogOpen] = useState(false);

  useEffect(() => {
    if (editPost) {
      setPostText(editPost.content || '');
      setVideoUrl(editPost.videoUrl || '');
      if (editPost.image) {
        setSelectedImage(editPost.image);
      }
      setExpanded(true);
    }
  }, [editPost]);

  const handleFocus = () => {
    setExpanded(true);
  };

  const handleCancel = () => {
    setExpanded(false);
    setPostText('');
    setSelectedImage(null);
    setSelectedFile(null);
    setVideoUrl('');
    if (onCancel) onCancel();
  };

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
      setExpanded(true);
    }
  };

  const handleVideoClick = () => {
    setVideoDialogOpen(true);
    setExpanded(true);
  };

  const handleVideoUrlSubmit = () => {
    setVideoDialogOpen(false);
  };

  const handlePost = () => {
    const postData = {
      id: editPost?.id,
      content: postText,
      image: selectedImage,
      videoUrl: videoUrl,
    };
    
    onSubmit(postData);
    handleCancel();
  };

  return (
    <>
      <Card 
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        elevation={1}
        sx={{ mb: 3 }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <Avatar src={user?.avatar} alt={user?.name} />
            <Box sx={{ flexGrow: 1 }}>
              <TextField
                fullWidth
                placeholder={editPost ? "Edit your post..." : "Share your thoughts..."}
                variant="outlined"
                multiline={expanded}
                rows={expanded ? 3 : 1}
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                onFocus={handleFocus}
                InputProps={{
                  sx: {
                    borderRadius: 4,
                    backgroundColor: alpha(theme.palette.primary.main, 0.04),
                    '&:hover, &.Mui-focused': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.08),
                    },
                  },
                }}
              />

              {selectedImage && (
                <Box 
                  sx={{ 
                    mt: 2, 
                    position: 'relative',
                    borderRadius: 2,
                    overflow: 'hidden',
                    maxHeight: 300,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bgcolor: '#f0f0f0'
                  }}
                >
                  <img 
                    src={selectedImage} 
                    alt="Selected" 
                    style={{ 
                      maxWidth: '100%', 
                      maxHeight: 300,
                      objectFit: 'contain'
                    }} 
                  />
                  <IconButton
                    size="small"
                    sx={{ 
                      position: 'absolute', 
                      top: 8, 
                      right: 8, 
                      bgcolor: 'rgba(0, 0, 0, 0.5)',
                      color: 'white',
                      '&:hover': {
                        bgcolor: 'rgba(0, 0, 0, 0.7)',
                      }
                    }}
                    onClick={() => {
                      setSelectedImage(null);
                      setSelectedFile(null);
                    }}
                  >
                    <CloseIcon size={16} />
                  </IconButton>
                </Box>
              )}

              {videoUrl && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <VideoIcon size={16} />
                    Video URL added
                    <IconButton
                      size="small"
                      onClick={() => setVideoUrl('')}
                    >
                      <CloseIcon size={16} />
                    </IconButton>
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />
          
          <Box sx={{ 
            display: 'flex', 
            flexDirection: expanded ? 'column' : 'row',
            gap: 2
          }}>
            <Box sx={{ 
              display: 'grid',
              gridTemplateColumns: expanded ? 'repeat(auto-fit, minmax(100px, 1fr))' : 'repeat(4, 1fr)',
              gap: 1,
              width: '100%'
            }}>
              <Button 
                startIcon={<ImageIcon size={18} />}
                color="inherit"
                component="label"
                fullWidth
                sx={{ justifyContent: 'flex-start' }}
              >
                Photo
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageSelect}
                />
              </Button>
              <Button 
                startIcon={<VideoIcon size={18} />}
                color="inherit"
                onClick={handleVideoClick}
                fullWidth
                sx={{ justifyContent: 'flex-start' }}
              >
                Video
              </Button>
              <Button 
                startIcon={<CalendarIcon size={18} />}
                color="inherit"
                fullWidth
                sx={{ justifyContent: 'flex-start' }}
              >
                Event
              </Button>
              <Button 
                startIcon={<ArticleIcon size={18} />}
                color="inherit"
                fullWidth
                sx={{ justifyContent: 'flex-start' }}
              >
                Article
              </Button>
            </Box>

            {expanded && (
              <Box sx={{ 
                display: 'flex', 
                gap: 1, 
                justifyContent: 'flex-end',
                borderTop: `1px solid ${theme.palette.divider}`,
                pt: 2
              }}>
                <Button 
                  variant="outlined" 
                  color="inherit"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button 
                  variant="contained" 
                  color="primary"
                  disabled={!postText.trim() && !selectedImage && !videoUrl}
                  onClick={handlePost}
                >
                  {editPost ? 'Save' : 'Post'}
                </Button>
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>

      <Dialog 
        open={videoDialogOpen} 
        onClose={() => setVideoDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{editPost ? 'Edit Video URL' : 'Add Video URL'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Video URL"
            type="url"
            fullWidth
            variant="outlined"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setVideoDialogOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleVideoUrlSubmit} color="primary" variant="contained">
            {editPost ? 'Save' : 'Add'} Video
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreatePost;