import React, { useState, useEffect } from 'react';

// MUI-style components using standard React and CSS
const Box = ({ children, sx = {}, ...props }) => (
  <div style={sx} {...props}>{children}</div>
);

const Typography = ({ variant = 'body1', component, children, sx = {}, ...props }) => {
  const variants = {
    h1: { fontSize: '2.5rem', fontWeight: 700, lineHeight: 1.2 },
    h2: { fontSize: '2rem', fontWeight: 700, lineHeight: 1.3 },
    h3: { fontSize: '1.5rem', fontWeight: 600, lineHeight: 1.4 },
    h4: { fontSize: '1.25rem', fontWeight: 600, lineHeight: 1.4 },
    h5: { fontSize: '1.125rem', fontWeight: 600, lineHeight: 1.4 },
    h6: { fontSize: '1rem', fontWeight: 600, lineHeight: 1.4 },
    body1: { fontSize: '1rem', lineHeight: 1.5 },
    body2: { fontSize: '0.875rem', lineHeight: 1.5 },
  };

  const Tag = component || (variant.startsWith('h') ? variant : 'p');
  const style = { ...variants[variant], ...sx };

  return <Tag style={style} {...props}>{children}</Tag>;
};

const Button = ({ children, variant = 'contained', onClick, sx = {}, ...props }) => {
  const baseStyle = {
    border: 'none',
    borderRadius: '4px',
    padding: '8px 16px',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.02857em',
    minWidth: '64px',
    boxSizing: 'border-box',
    transition: 'all 0.3s ease',
    fontFamily: 'inherit',
    ...sx
  };

  return (
    <button 
      style={baseStyle} 
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const Card = ({ children, sx = {}, ...props }) => (
  <div 
    style={{
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      ...sx
    }} 
    {...props}
  >
    {children}
  </div>
);

const Avatar = ({ children, sx = {}, ...props }) => (
  <div 
    style={{
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f5f5f5',
      ...sx
    }} 
    {...props}
  >
    {children}
  </div>
);

const Grid = ({ container, item, xs, md, spacing, children, sx = {}, ...props }) => {
  const gridStyle = {
    display: container ? 'flex' : 'block',
    flexWrap: container ? 'wrap' : 'nowrap',
    gap: container && spacing ? `${spacing * 8}px` : '0',
    flex: item ? '1 1 auto' : 'none',
    ...sx
  };

  if (item && xs) {
    gridStyle.width = `${(xs / 12) * 100}%`;
  }

  return <div style={gridStyle} {...props}>{children}</div>;
};

// Icons as simple SVG components
const CheckCircleIcon = ({ style = {} }) => (
  <svg style={{ width: '24px', height: '24px', ...style }} viewBox="0 0 24 24">
    <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
);

const WorkIcon = ({ style = {} }) => (
  <svg style={{ width: '24px', height: '24px', ...style }} viewBox="0 0 24 24">
    <path fill="currentColor" d="M14 6V4h-4v2h4zM4 8v11h16V8H4zm16-2c1.11 0 2 .89 2 2v11c0 1.11-.89 2-2 2H4c-1.11 0-2-.89-2-2l.01-11c0-1.11.88-2 1.99-2h4V4c0-1.11.89-2 2-2h4c1.11 0 2 .89 2 2v2h4z"/>
  </svg>
);

const MessageIcon = ({ style = {} }) => (
  <svg style={{ width: '24px', height: '24px', ...style }} viewBox="0 0 24 24">
    <path fill="currentColor" d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
  </svg>
);

const CircularProgress = ({ size = 40, sx = {} }) => (
  <div 
    style={{
      width: size,
      height: size,
      border: '4px solid rgba(255, 255, 255, 0.3)',
      borderTop: '4px solid white',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      margin: '0 auto',
      ...sx
    }}
  />
);

const ComingSoonPage = () => {
  const [isNotified, setIsNotified] = useState(false);
  const [floatY, setFloatY] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFloatY(Math.sin(Date.now() * 0.001) * 5);
    }, 16);

    return () => clearInterval(interval);
  }, []);

  const handleNotifyClick = () => {
    setIsNotified(true);
    setTimeout(() => {
      setIsNotified(false);
    }, 3000);
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'white',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      color: 'white',
      padding: '16px'
    }}>
      <Card sx={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '24px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        padding: '40px',
        textAlign: 'center',
        color: '#333',
        maxWidth: '600px',
        width: '100%',
        transform: `translateY(${floatY}px)`,
        transition: 'transform 0.1s ease',
        animation: 'fadeInUp 0.8s ease-out'
      }}>
        <Avatar sx={{
          width: '80px',
          height: '80px',
          backgroundColor: 'white',
          margin: '0 auto 30px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
          animation: 'bounce 2s infinite'
        }}>
          <CheckCircleIcon style={{ width: '40px', height: '40px', color: '#1870CC' }} />
        </Avatar>
        
        <Typography 
          variant="h2" 
          component="h1" 
          sx={{ 
            fontWeight: 700, 
            marginBottom: '20px',
            fontSize: window.innerWidth < 768 ? '2rem' : '2.5rem'
          }}
        >
          Coming Soon
        </Typography>
        
        <Typography 
          variant="h6" 
          sx={{ 
            lineHeight: 1.6, 
            marginBottom: '30px', 
            opacity: 0.9,
            fontSize: window.innerWidth < 768 ? '1rem' : '1.2rem'
          }}
        >
          We're working hard to bring you amazing new features that will enhance your social media experience!
        </Typography>
        
        <Grid container spacing={3} sx={{ margin: '40px 0' }}>
          <Grid item xs={12} md={6}>
            <Card sx={{
              background: 'rgb(189 216 244 / 30%)',
              backdropFilter: 'blur(5px)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              borderRadius: '16px',
              padding: '20px',
              transition: 'transform 0.3s ease',
              cursor: 'pointer',
              color: '#333'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              <Avatar sx={{
                width: '50px',
                height: '50px',
                backgroundColor: 'white',
                margin: '0 auto 15px'
              }}>
                <WorkIcon style={{ width: '25px', height: '25px', color: '#1870CC' }} />
              </Avatar>
              <Typography 
                variant="h5" 
                component="h3" 
                sx={{ 
                  color: '#1870CC', 
                  fontWeight: 600, 
                  marginBottom: '10px' 
                }}
              >
                Job Opportunities
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'black', 
                  opacity: 0.9,
                  fontSize: '0.9rem'
                }}
              >
                Connect with career opportunities, showcase your skills, and find your dream job within our community.
              </Typography>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card sx={{
              background: 'rgb(189 216 244 / 30%)',
              backdropFilter: 'blur(5px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '16px',
              padding: '20px',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              <Avatar sx={{
                width: '50px',
                height: '50px',
                backgroundColor: 'white',
                margin: '0 auto 15px'
              }}>
                <MessageIcon style={{ width: '25px', height: '25px', color: '#1870CC' }} />
              </Avatar>
              <Typography 
                variant="h5" 
                component="h3" 
                sx={{ 
                  color: '#1870CC', 
                  fontWeight: 600, 
                  marginBottom: '10px' 
                }}
              >
                Enhanced Messaging
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'black', 
                  opacity: 0.9,
                  fontSize: '0.9rem'
                }}
              >
                Experience seamless communication with improved messaging features, media sharing, and real-time conversations.
              </Typography>
            </Card>
          </Grid>
        </Grid>
        
        <Typography 
          variant="body1" 
          sx={{ 
            marginTop: '30px', 
            marginBottom: '20px',
            fontSize: '1rem'
          }}
        >
          Get notified when these features launch
        </Typography>
        
        <Button 
          variant="contained" 
          onClick={handleNotifyClick}
          sx={{
            backgroundColor: '#1870CC',
            color: 'white',
            padding: '15px 40px',
            borderRadius: '30px',
            fontSize: '1.1rem',
            fontWeight: 600,
            textTransform: 'none',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s ease',
            minWidth: 'auto'
          }}
        >
          {isNotified ? "Thanks! We'll notify you" : "Notify Me"}
        </Button>
      </Card>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </Box>
  );
};

export default ComingSoonPage;