import React from 'react';
import { Box, Container, Grid, Stack, Typography, Button, Card, CardContent, useTheme } from '@mui/material';
import treeImage from '../assets/tree.jpg';

const PixelloWorks = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Stack spacing={2} alignItems="center" sx={{ mb: 6 }}>
        <Typography variant="subtitle2" color="primary">
          HOW IT WORKS?
        </Typography>
        <Typography variant="h4" component="h2">
          How Pixello Works
        </Typography>
        <Typography
          variant="body1"
          textAlign="center"
          sx={{ width: { xs: '100%', md: '60%' } }}
        >
          Pixello connects verified professionals, enabling seamless communication,
          collaboration, networking, and deal-making through an intuitive, secure,
          and open platform.
        </Typography>
      </Stack>

      {/* Section 1: Smart Communication */}
      <Grid container spacing={4} alignItems="center">
        <Grid item size={{xs:12, md:6}}>
          <Card
            elevation={3}
            sx={{ p: 3, position: 'relative', mt: { md: 6 } }}
          >
            <CardContent>
              <Typography variant="subtitle2" color="primary" gutterBottom>
                SOLUTION 1
              </Typography>
              <Typography variant="h5" component="h3" gutterBottom>
                Smart Communication
              </Typography>
              <Typography variant="body2" paragraph>
                Pixello enables professionals to exchange ideas through private
                chats, group discussions, and project-specific channels—ensuring
                productive and confidential communication.
              </Typography>
              <Button variant="text">Read More...</Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item size={{xs:12, md:6}}>
          <Box component="img" src={treeImage} alt="Tree illustrative" sx={{ width: '100%', borderRadius: 1 }} />
        </Grid>
      </Grid>

      {/* Sections 2 & 3 */}
      <Grid container spacing={4} sx={{ mt: 4 }}>
        {[
          {
            index: '02',
            title: 'Effortless Collaboration',
            text: 'Teams can collaborate in real-time with intuitive tools like shared workspaces, file sharing, and organized channels, boosting productivity.'
          },
          {
            index: '03',
            title: 'Strategic Deal Making',
            text: 'Pixello turns networking into tangible business outcomes by offering tools to pitch, negotiate, and close deals—all within one streamlined platform.'
          }
        ].map((item) => (
          <Grid item size={{xs:12, md:6}} key={item.index}>
            <Card elevation={3} sx={{ p: 3, position: 'relative', overflow: 'visible' }}>
              <Typography
                variant="h3"
                component="span"
                color="primary"
                sx={{
                  position: 'absolute',
                  top: -16,
                  left: -16,
                  fontSize: '2rem',
                  fontWeight: 'bold'
                }}
              >
                {item.index}
              </Typography>
              <Box sx={{ ml: 4 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6" component="h3">
                    {item.title}
                  </Typography>
                  <Typography variant="button">Read More...</Typography>
                </Stack>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {item.text}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PixelloWorks;
