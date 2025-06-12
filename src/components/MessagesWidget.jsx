import React, { useState } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemText,
  Avatar,
  Badge,
  IconButton,
  Collapse,
  TextField,
  InputAdornment,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronUp, 
  ChevronDown, 
  Edit as EditIcon, 
  Search as SearchIcon,
  Send as SendIcon
} from 'lucide-react';
import { messages } from '../data/mockData';

const MessagesContainer = styled(Paper)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  right: 24,
  width: 320,
  maxHeight: 480,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  zIndex: 10,
  borderTopLeftRadius: theme.shape.borderRadius,
  borderTopRightRadius: theme.shape.borderRadius,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  boxShadow: theme.shadows[6],
  [theme.breakpoints.down('sm')]: {
    right: 0,
    width: '100%',
  },
}));

const MessagesHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(1.5, 2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  cursor: 'pointer',
}));

const MessageItem = styled(ListItem)(({ theme }) => ({
  transition: 'background-color 0.2s ease',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  cursor: 'pointer',
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.success.contrastText,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      content: '""',
    },
  },
}));

const UnreadIndicator = styled(Box)(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
  marginRight: theme.spacing(1),
}));

const MessagesWidget = () => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const unreadCount = messages.filter(msg => msg.unread).length;

  return (
    <AnimatePresence>
      <MessagesContainer 
        component={motion.div}
        initial={{ y: expanded ? 0 : 420 }}
        animate={{ y: expanded ? 0 : 'calc(100% - 48px)' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <MessagesHeader onClick={toggleExpanded}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="subtitle1" fontWeight={600}>
              Messaging
            </Typography>
            {unreadCount > 0 && (
              <Badge 
                badgeContent={unreadCount} 
                color="error"
                sx={{ ml: 1 }}
              />
            )}
          </Box>
          <Box>
            <IconButton 
              size="small" 
              sx={{ color: 'inherit', mr: 1 }}
            >
              <EditIcon size={18} />
            </IconButton>
            <IconButton 
              size="small" 
              sx={{ color: 'inherit' }}
            >
              {expanded ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
            </IconButton>
          </Box>
        </MessagesHeader>

        <Collapse in={expanded} sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ p: 1.5 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search messages"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon size={18} color={theme.palette.text.secondary} />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: 4,
                  backgroundColor: theme.palette.action.hover,
                }
              }}
            />
          </Box>

          <List sx={{ overflow: 'auto', flexGrow: 1, maxHeight: 380 }}>
            {messages.map((message) => (
              <MessageItem key={message.id} alignItems="flex-start">
                <ListItemAvatar>
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                  >
                    <Avatar src={message.user.avatar} alt={message.user.name} />
                  </StyledBadge>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {message.unread && <UnreadIndicator />}
                      <Typography 
                        variant="subtitle2" 
                        component="span"
                        fontWeight={message.unread ? 600 : 400}
                      >
                        {message.user.name}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      noWrap 
                      sx={{ 
                        fontWeight: message.unread ? 500 : 400,
                        color: message.unread ? 'text.primary' : 'text.secondary'
                      }}
                    >
                      {message.lastMessage}
                    </Typography>
                  }
                />
                <Typography 
                  variant="caption" 
                  color="text.secondary"
                  sx={{ ml: 1 }}
                >
                  {message.timestamp}
                </Typography>
              </MessageItem>
            ))}
          </List>
        </Collapse>
      </MessagesContainer>
    </AnimatePresence>
  );
};

export default MessagesWidget;