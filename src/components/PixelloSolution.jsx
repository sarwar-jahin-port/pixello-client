import React from "react";
import { Box, Grid, Typography, Stack, useTheme } from "@mui/material";
import { Handshake, Waypoints, KeySquare } from "lucide-react";
import solutionImage from "../assets/solution.png";

const features = [
  {
    icon: <Handshake size={48} color="#1976D2" />,
    title: "Smart Communication",
    description:
      "Private & Group Chats, Project Channels and Contextual Notifications",
  },
  {
    icon: <Waypoints size={48} color="#1976D2" />,
    title: "Effortless Collaboration",
    description:
      "Shared Workspaces, Integrated File Sharing, Task & Milestone Tracking",
  },
  {
    icon: <KeySquare size={48} color="#1976D2" />,
    title: "Strategic Deal Making",
    description: "Opportunity Hub, Pitch Rooms, Secure Contracting",
  },
];

const PixelloSolution = () => {
  const theme = useTheme();

  return (
    <Box sx={{ width: "100%", py: 10, bgcolor: "grey.50" }}>
      <Grid container spacing={5} sx={{ maxWidth: 1150, mx: "auto" }}>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={solutionImage}
            alt="Pixello Solution"
            sx={{ width: "100%", borderRadius: 4 }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ py: 5, pr: { md: 5 } }}>
            <Typography variant="h4">PIXELLO Complete</Typography>
            <Typography variant="h4" sx={{ mt: 1 }}>
              Professional Media Solution
            </Typography>
            <Typography sx={{ mt: 3 }}>
              One stop solution for all your social media needs set us apart
              from the rest
            </Typography>

            <Stack spacing={4} sx={{ mt: 5, maxWidth: 400 }}>
              {features.map((item, index) => (
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="flex-start"
                  key={index}
                >
                  <Box>{item.icon}</Box>
                  <Box>
                    <Typography variant="h6">{item.title}</Typography>
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                      {item.description}
                    </Typography>
                  </Box>
                </Stack>
              ))}
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PixelloSolution;
