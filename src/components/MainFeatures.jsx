import { Box, Grid, Typography, Divider, useTheme } from "@mui/material";
import NotesIcon from '@mui/icons-material/Notes';
import banner from "../assets/banner2.png";

const MainFeatures = () => {
  const theme = useTheme();
  
  return (
    <Box sx={{
      maxWidth: 1080,
      width: {xs:'90%', md:'80%'},
      mx: 'auto',
      boxShadow: 3,
      my: {xs:2, md:4},
      borderRadius: 4,
      overflow: 'hidden'
    }}>
      <Grid container>
        {/* Left Column - Text Content - 50% width on md+ screens */}
        <Grid item size={{xs:12, md:6}} sx={{ p: 4 }}>
          <Box sx={{ mb: [2, 5] }}>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                color: 'primary.main', 
                textTransform: 'uppercase',
                fontWeight: 'bold'
              }}
            >
              MAIN FEATURES
            </Typography>
            <Typography variant="h2" sx={{fontSize: {xs:"2rem", sm:"2.5rem", md:"3rem", lg:"3.5rem"}}}>Empower Your Brand</Typography>
            <Typography variant="h2" sx={{fontSize: {xs:"2rem", sm:"2.5rem", md:"3rem", lg:"3.5rem"}}}>Pixello</Typography>
          </Box>

          <Box sx={{ mb: [2, 5] }}>
            <Typography variant="body1">
              <Box component="span" sx={{ fontSize: '2.5rem' }}>01</Box>
              /03
            </Typography>
            <Box sx={{ width: '100%', mt: 2 }}>
              <Typography variant="h5" gutterBottom>Exclusive Professional Network:</Typography>
              <Typography variant="body1" textAlign="justify">
                 Connect with verified professionals from diverse industries, expanding your reach and opening doors to new collaborations. Pixello provides a curated environment where quality interactions are prioritized, ensuring you spend less time sifting through noise and more time engaging with relevant peers, mentors, and potential partners.
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Right Column - Image - 50% width on md+ screens */}
        <Grid item size={{xs:12, md:6}} sx={{
          borderLeft: { md: 1 },
          borderColor: { md: 'divider' },
          p: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Box
            component="img"
            src={banner}
            alt="Feature banner"
            sx={{
              width: '100%',
              height: 'auto',
              maxHeight: 400,
              objectFit: 'cover',
              borderRadius: 2
            }}
          />
        </Grid>

        {/* Bottom Features Row - Full width */}
        <Grid item size={12}>
          <Divider />
          <Grid container sx={{ p: 3 }} justifyContent="space-between">
            {[
              ['Social Media', 'Planning'],
              ['Content Creation', 'Planning'],
              ['Analytic Social', 'Platform'],
              ['Analytic Social', 'Platform']
            ].map(([line1, line2], index) => (
              <Grid item key={index} xs={12} sm={6} md={3} sx={{ 
                mb: { xs: 3, sm: 0 },
                display: 'flex',
                justifyContent: { xs: 'center', md: 'flex-start' }
              }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 3,
                }}>
                  <Box sx={{backgroundColor: 'primary.main', borderRadius: '50%', padding: 1}}><NotesIcon fontSize="large" /></Box>
                  <Box>
                    <Typography variant="h6">{line1}</Typography>
                    <Typography variant="h6">{line2}</Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default MainFeatures;