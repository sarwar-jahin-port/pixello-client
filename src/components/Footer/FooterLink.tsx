import React from 'react';
import { Box, Link, Typography } from '@mui/material';

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children }) => {
  return (
    <Box sx={{ mb: 1 }}>
      <Link
        href={href}
        underline="none"
        sx={{
          color: 'rgba(255, 255, 255, 0.7)',
          display: 'block',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            color: '#10B981',
            transform: 'translateX(4px)',
          },
        }}
      >
        <Typography variant="body2">{children}</Typography>
      </Link>
    </Box>
  );
};

export default FooterLink;