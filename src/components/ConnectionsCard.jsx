import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Box,
  Avatar,
  Button,
  Divider,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";
// import { connections } from "../data/mockData";
import { connectionService } from "../services/api"
import LoadingScreen from "./LoadingScreen";

const ConnectionItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: theme.spacing(2),
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  transition: "background-color 0.2s ease",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const ConnectionsCard = () => {
  const theme = useTheme();
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(false)

  const fetchRandomUsers = async () =>{
    setLoading(true);
    console.log("fetch random users")
    try {
      const response = await connectionService.randomUsers()
      console.log(response);
      setConnections(response);
    } catch (error) {
      console.error(error);
    } finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    fetchRandomUsers();
  }, [])

  const handleConnect = async (id) =>{
    try { 
      const response = await connectionService.sendFriendRequest(id)
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
  
  if (loading) return <div className="h-screen translate-y-1/2"><LoadingScreen/></div>

  return (
    <Card
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      elevation={1}
    >
      <CardHeader
        title={
          <Typography variant="h6\" fontWeight={600}>
            Add to your network
          </Typography>
        }
        titleTypographyProps={{ variant: "h6" }}
      />
      <Divider />

      <CardContent sx={{ pt: 2, pb: 1 }}>
        {connections.length > 0 && connections.map((connection, index) => (
          <React.Fragment key={connection?.id}>
            <ConnectionItem>
              <Box sx={{display: "flex"}}>
                <Avatar
                  src={connection?.avatar}
                  alt={connection?.username}
                  sx={{ width: 48, height: 48, mr: 2 }}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {connection?.username}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    {connection?.location}
                  </Typography>
                  {/* <Typography variant="caption" color="text.secondary">
                    {connection.mutualConnections} mutual connections
                  </Typography> */}
                </Box>
              </Box>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                startIcon={<UserPlus size={16} />}
                sx={{ minWidth: 100, mt: 1 }}
                onClick={() => handleConnect(connection?.id)}
              >
                Connect
              </Button>
            </ConnectionItem>

            {index < connections.length - 1 && <Divider sx={{ my: 1.5 }} />}
          </React.Fragment>
        ))}
      </CardContent>

      <Box sx={{ p: 2, textAlign: "center" }}>
        <Button variant="text" color="primary" fullWidth>
          View all recommendations
        </Button>
      </Box>
    </Card>
  );
};

export default ConnectionsCard;
