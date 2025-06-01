import React from 'react';
import { IconButton } from '@mui/material';

const SocialButton = ({ icon }) => {
  return (
    <IconButton
      sx={{
        bgcolor: 'rgba(255, 255, 255, 0.1)',
        color: 'white',
        width: 36,
        height: 36,
        transition: 'all 0.3s ease',
        '&:hover': {
          bgcolor: '#10B981',
          transform: 'translateY(-3px)',
        },
      }}
    >
      {icon}
    </IconButton>
  );
};

export default SocialButton;