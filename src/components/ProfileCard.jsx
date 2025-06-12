import React from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Avatar, 
  Button, 
  Divider, 
  useTheme,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { Camera, Edit, Plus } from 'lucide-react';
import { currentUser } from '../data/mockData';

const ProfileCover = styled(Box)(({ theme }) => ({
  height: 72,
  background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  borderTopLeftRadius: theme.shape.borderRadius,
  borderTopRightRadius: theme.shape.borderRadius,
  position: 'relative',
}));

const AvatarWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  border: `4px solid ${theme.palette.background.paper}`,
  borderRadius: '50%',
}));

const StatItem = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    borderRadius: theme.shape.borderRadius,
  },
}));

const PremiumBadge = styled(Box)(({ theme }) => ({
  background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  color: theme.palette.common.white,
  padding: theme.spacing(0.5, 1.5),
  borderRadius: 16,
  fontSize: 12,
  fontWeight: 600,
  display: 'inline-flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
}));

const ProfileCard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMedium = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  return (
    <Card 
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      elevation={1}
      sx={{ mb: 2, overflow: 'visible' }}
    >
      <ProfileCover>
        <Button 
          startIcon={<Camera size={16} />}
          variant="contained"
          color="primary"
          size="small"
          sx={{ 
            position: 'absolute', 
            right: 8, 
            top: 8,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
            }
          }}
        >
          {!isMobile && 'Edit Cover'}
        </Button>
      </ProfileCover>
      
      <CardContent sx={{ pb: 2 }}>
        <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <AvatarWrapper>
                <Avatar 
                    src={currentUser.avatar} 
                    sx={{ width: 72, height: 72 }}
                />
            </AvatarWrapper>
            {!isMobile && (
            <Button
              variant="outlined"
              color="primary"
              startIcon={<Edit size={16} />}
              size="small"
            >
              Edit
            </Button>
          )}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              {currentUser.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {currentUser.headline}
            </Typography>
            <PremiumBadge>
              <Plus size={14} style={{ marginRight: 4 }} />
              Premium Member
            </PremiumBadge>
          </Box>
        </Box>
        
        <Divider sx={{ my: 1.5 }} />
        
        <Box sx={{ 
          display: 'flex', 
          justifyContent: isMobile ? 'space-around' : 'space-evenly'
        }}>
          <StatItem>
            <Typography variant="body2" color="text.secondary">
              Connections
            </Typography>
            <Typography variant="subtitle2" fontWeight={600}>
              {currentUser.connections}
            </Typography>
          </StatItem>
          
          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
          
          <StatItem>
            <Typography variant="body2" color="text.secondary">
              Profile views
            </Typography>
            <Typography variant="subtitle2" fontWeight={600}>
              {currentUser.views}
            </Typography>
          </StatItem>
          
          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
          
          <StatItem>
            <Typography variant="body2" color="text.secondary">
              Posts
            </Typography>
            <Typography variant="subtitle2" fontWeight={600}>
              {currentUser.posts}
            </Typography>
          </StatItem>
          
          {isMobile && (
            <>
              <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
              <StatItem>
                <Edit size={16} color={theme.palette.text.secondary} />
                <Typography variant="subtitle2" fontWeight={600} sx={{ mt: 0.5 }}>
                  Edit
                </Typography>
              </StatItem>
            </>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;