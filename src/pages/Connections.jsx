import React, { useState, useContext, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  TextField,
  Avatar,
  Divider,
  IconButton,
  Chip,
  InputAdornment,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Skeleton,
  Alert,
  useTheme,
  useMediaQuery,
  Snackbar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search as SearchIcon,
  UserPlus as UserPlusIcon,
  UserCheck as UserCheckIcon,
  UserX as UserXIcon,
  Users as UsersIcon,
  Clock as ClockIcon,
  Check as CheckIcon,
  X as XIcon,
  Send as SendIcon,
  Filter as FilterIcon,
} from "lucide-react";
import { AuthContext } from "../contexts/AuthContext";
import { connectionService } from "../services/api";

const StyledCard = styled(Card)(({ theme }) => ({
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: theme.shadows[8],
  },
}));

const ConnectionCard = styled(Card)(({ theme }) => ({
  transition: "all 0.2s ease",
  cursor: "pointer",
  "&:hover": {
    transform: "translateY(-1px)",
    boxShadow: theme.shadows[4],
  },
}));

const TabPanel = ({ children, value, index, ...other }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`connections-tabpanel-${index}`}
    aria-labelledby={`connections-tab-${index}`}
    {...other}
  >
    {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
  </div>
);

const UserSkeleton = () => (
  <ConnectionCard sx={{ mb: 2 }}>
    <CardContent sx={{ p: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Skeleton variant="circular" width={60} height={60} sx={{ mr: 2 }} />
        <Box sx={{ flexGrow: 1 }}>
          <Skeleton variant="text" width="60%" height={24} />
          <Skeleton variant="text" width="80%" height={20} sx={{ mt: 0.5 }} />
          <Skeleton variant="text" width="40%" height={16} sx={{ mt: 0.5 }} />
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Skeleton
            variant="rectangular"
            width={80}
            height={32}
            sx={{ borderRadius: 1 }}
          />
          <Skeleton
            variant="rectangular"
            width={80}
            height={32}
            sx={{ borderRadius: 1 }}
          />
        </Box>
      </Box>
    </CardContent>
  </ConnectionCard>
);

const Connections = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { user } = useContext(AuthContext);

  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Mock data - replace with real API calls
  const [connectionRequests, setConnectionRequests] = useState([
    {
      id: 1,
      user: {
        id: 101,
        name: "Sarah Johnson",
        avatar:
          "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
        headline: "Frontend Developer at Microsoft",
        location: "Seattle, WA",
        mutualConnections: 12,
      },
      timestamp: "2 hours ago",
      message:
        "Hi! I'd love to connect with you. We have similar interests in web development.",
    },
    {
      id: 2,
      user: {
        id: 102,
        name: "Michael Chen",
        avatar:
          "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600",
        headline: "Product Manager at Google",
        location: "Mountain View, CA",
        mutualConnections: 8,
      },
      timestamp: "5 hours ago",
      message:
        "I saw your recent post about UX design. Would love to connect and share ideas!",
    },
    {
      id: 3,
      user: {
        id: 103,
        name: "Emily Rodriguez",
        avatar:
          "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600",
        headline: "UX Designer at Adobe",
        location: "San Francisco, CA",
        mutualConnections: 15,
      },
      timestamp: "1 day ago",
      message: "Hello! I'm interested in connecting with fellow designers.",
    },
  ]);
  const [requests, setRequests] = useState([]);
  const [sent, setSent] = useState([]);
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    const fetchConnectionRequests = async () => {
      console.log("fetchconnectionrequests invoked");
      try {
        const response = await connectionService.requests();
        console.log(response);
        const requests = response.filter((c) => c.to_user.id === user.id && c.status === 'P');
        setRequests(requests);
        const sent = response.filter((c) => c.from_user.id === user.id && c.status === 'P');
        setSent(sent);
        const connections = response.filter((c) => c.status === "A");
        setConnections(connections);
      } catch (error) {}
    };
    fetchConnectionRequests();
  }, [user]);

  const [searchResults, setSearchResults] = useState([]);
  const [myConnections, setMyConnections] = useState([
    {
      id: 201,
      name: "John Doe",
      avatar:
        "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600",
      headline: "Software Engineer at Apple",
      location: "Cupertino, CA",
      connectionDate: "Connected 3 months ago",
      status: "connected",
    },
    {
      id: 202,
      name: "Lisa Wang",
      avatar:
        "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=600",
      headline: "Data Scientist at Netflix",
      location: "Los Gatos, CA",
      connectionDate: "Connected 1 month ago",
      status: "connected",
    },
  ]);

  const [sentRequests, setSentRequests] = useState([
    {
      id: 301,
      name: "David Kim",
      avatar:
        "https://images.pexels.com/photos/1121796/pexels-photo-1121796.jpeg?auto=compress&cs=tinysrgb&w=600",
      headline: "Marketing Director at Spotify",
      location: "New York, NY",
      sentDate: "Sent 2 days ago",
      status: "pending",
    },
  ]);

  useEffect(() => {
    // Simulate initial loading
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setSearchLoading(true);

    // Simulate API search
    setTimeout(() => {
      const mockResults = [
        {
          id: 401,
          name: "Alex Thompson",
          avatar:
            "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=600",
          headline: "Full Stack Developer at Airbnb",
          location: "San Francisco, CA",
          mutualConnections: 5,
          status: "not_connected",
        },
        {
          id: 402,
          name: "Maria Garcia",
          avatar:
            "https://images.pexels.com/photos/1853712/pexels-photo-1853712.jpeg?auto=compress&cs=tinysrgb&w=600",
          headline: "UI/UX Designer at Figma",
          location: "Remote",
          mutualConnections: 3,
          status: "not_connected",
        },
        {
          id: 201, // Already connected
          name: "John Doe",
          avatar:
            "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600",
          headline: "Software Engineer at Apple",
          location: "Cupertino, CA",
          mutualConnections: 0,
          status: "connected",
        },
      ].filter(
        (person) =>
          person.name.toLowerCase().includes(query.toLowerCase()) ||
          person.headline.toLowerCase().includes(query.toLowerCase())
      );

      setSearchResults(mockResults);
      setSearchLoading(false);
    }, 800);
  };

  const handleAcceptRequest = async(requestId) => {
    try {
      const response = await connectionService.acceptFreindRequest(requestId);
      console.log(response);
    } catch (error) {
      console.log(error);
    }

    const request = connectionRequests.find((req) => req.id === requestId);
    if (request) {
      // Move to connections
      setMyConnections((prev) => [
        ...prev,
        {
          id: request.user.id,
          name: request.user.name,
          avatar: request.user.avatar,
          headline: request.user.headline,
          location: request.user.location,
          connectionDate: "Connected just now",
          status: "connected",
        },
      ]);

      // Remove from requests
      setConnectionRequests((prev) =>
        prev.filter((req) => req.id !== requestId)
      );

      setSnackbarMessage(
        `Connection request from ${request.user.name} accepted!`
      );
      setSnackbarOpen(true);
    }
  };

  const handleRejectRequest = (requestId) => {
    const request = connectionRequests.find((req) => req.id === requestId);
    setConnectionRequests((prev) => prev.filter((req) => req.id !== requestId));

    if (request) {
      setSnackbarMessage(
        `Connection request from ${request.user.name} declined.`
      );
      setSnackbarOpen(true);
    }
  };

  const handleSendRequest = (userId) => {
    const user = searchResults.find((u) => u.id === userId);
    if (user) {
      // Add to sent requests
      setSentRequests((prev) => [
        ...prev,
        {
          id: Date.now(),
          name: user.name,
          avatar: user.avatar,
          headline: user.headline,
          location: user.location,
          sentDate: "Sent just now",
          status: "pending",
        },
      ]);

      // Update search results
      setSearchResults((prev) =>
        prev.map((u) =>
          u.id === userId ? { ...u, status: "request_sent" } : u
        )
      );

      setSnackbarMessage(`Connection request sent to ${user.name}!`);
      setSnackbarOpen(true);
    }
  };

  const handleRemoveConnection = (connectionId) => {
    const connection = myConnections.find((conn) => conn.id === connectionId);
    setMyConnections((prev) => prev.filter((conn) => conn.id !== connectionId));

    if (connection) {
      setSnackbarMessage(`Removed ${connection.name} from connections.`);
      setSnackbarOpen(true);
    }
  };

  const renderConnectionRequest = (request) => (
    <motion.div
      key={request.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
    >
      <ConnectionCard sx={{ mb: 2 }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: { md: "flex" }, alignItems: "flex-start" }}>
            <Avatar
              src={request?.user?.avatar}
              sx={{ width: 60, height: 60, mr: 2 }}
            />
            <Box sx={{ flexGrow: { md: 1 } }}>
              <Typography variant="h6" fontWeight={600}>
                {request?.from_user?.username}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {request?.from_user?.location || "location"}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "flex", alignItems: "center", mb: 1 }}
              >
                <UsersIcon size={14} style={{ marginRight: 4 }} />
                {request?.user?.mutualConnections} mutual connections
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <ClockIcon size={14} style={{ marginRight: 4 }} />
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                }).format(new Date(request?.created))}
              </Typography>
              {request?.message && (
                <Box sx={{ mt: 2, p: 2, bgcolor: "grey.50", borderRadius: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    "{request?.message}"
                  </Typography>
                </Box>
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                gap: 1,
              }}
            >
              <Button
                variant="contained"
                color="primary"
                size="small"
                startIcon={<CheckIcon size={16} />}
                onClick={() => handleAcceptRequest(request.id)}
              >
                Accept
              </Button>
              <Button
                variant="outlined"
                color="error"
                size="small"
                startIcon={<XIcon size={16} />}
                onClick={() => handleRejectRequest(request.id)}
              >
                Decline
              </Button>
            </Box>
          </Box>
        </CardContent>
      </ConnectionCard>
    </motion.div>
  );

  const renderSearchResult = (person) => (
    <motion.div
      key={person.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <ConnectionCard sx={{ mb: 2 }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar src={person.avatar} sx={{ width: 50, height: 50, mr: 2 }} />
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle1" fontWeight={600}>
                {person.name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 0.5 }}
              >
                {person.headline}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {person.location} • {person.mutualConnections} mutual
                connections
              </Typography>
            </Box>
            <Box>
              {person.status === "connected" ? (
                <Chip
                  icon={<UserCheckIcon size={16} />}
                  label="Connected"
                  color="success"
                  variant="outlined"
                  size="small"
                />
              ) : person.status === "request_sent" ? (
                <Chip
                  icon={<ClockIcon size={16} />}
                  label="Pending"
                  color="warning"
                  variant="outlined"
                  size="small"
                />
              ) : (
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  startIcon={<UserPlusIcon size={16} />}
                  onClick={() => handleSendRequest(person.id)}
                >
                  Connect
                </Button>
              )}
            </Box>
          </Box>
        </CardContent>
      </ConnectionCard>
    </motion.div>
  );

  const renderConnection = (connection) => (
    <motion.div
      key={connection.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <ConnectionCard sx={{ mb: 2 }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              src={connection.avatar}
              sx={{ width: 50, height: 50, mr: 2 }}
            />
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle1" fontWeight={600}>
                {connection.to_user.id === user.id ? connection.from_user.username : connection.to_user.username}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 0.5 }}
              >
                {(connection.to_user.id === user.id ? connection.from_user.location : connection.to_user.location) || "location"}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                }).format(new Date(connection?.created))}
              </Typography>
            </Box>
            <IconButton
              color="error"
              size="small"
              onClick={() => handleRemoveConnection(connection.id)}
            >
              <UserXIcon size={18} />
            </IconButton>
          </Box>
        </CardContent>
      </ConnectionCard>
    </motion.div>
  );
  console.log(requests);
  console.log(sent);
  console.log(connections);
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
            My Network
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your professional connections and discover new opportunities
          </Typography>
        </Box>

        {/* Search Section */}
        <StyledCard sx={{ mb: 4 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
              Find People
            </Typography>
            <TextField
              fullWidth
              placeholder="Search for people by name or profession..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                handleSearch(e.target.value);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon
                      size={20}
                      color={theme.palette.text.secondary}
                    />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: 2,
                },
              }}
            />

            {/* Search Results */}
            {searchQuery && (
              <Box sx={{ mt: 3 }}>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  Search Results
                </Typography>
                {searchLoading ? (
                  <Box>
                    {[1, 2, 3].map((i) => (
                      <UserSkeleton key={i} />
                    ))}
                  </Box>
                ) : searchResults.length > 0 ? (
                  <Box>{searchResults.map(renderSearchResult)}</Box>
                ) : (
                  <Alert severity="info">
                    No users found matching "{searchQuery}"
                  </Alert>
                )}
              </Box>
            )}
          </CardContent>
        </StyledCard>

        {/* Tabs */}
        <StyledCard>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant={isMobile ? "scrollable" : "fullWidth"}
              scrollButtons="auto"
            >
              <Tab
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <ClockIcon size={18} />
                    Requests ({requests.length})
                  </Box>
                }
              />
              <Tab
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <UsersIcon size={18} />
                    Connections ({connections.length})
                  </Box>
                }
              />
              <Tab
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <SendIcon size={18} />
                    Sent ({sent.length})
                  </Box>
                }
              />
            </Tabs>
          </Box>

          {/* Connection Requests Tab */}
          <TabPanel value={activeTab} index={0}>
            {loading ? (
              <Box>
                {[1, 2, 3].map((i) => (
                  <UserSkeleton key={i} />
                ))}
              </Box>
            ) : requests.length > 0 ? (
              <AnimatePresence>
                {requests.map(renderConnectionRequest)}
              </AnimatePresence>
            ) : (
              <Box sx={{ textAlign: "center", py: 6 }}>
                <Box sx={{display: "flex", alignItems: "center", justifyContent: "center"}}><ClockIcon size={48} color={theme.palette.text.secondary} /></Box>
                <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
                  No pending requests
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  When people send you connection requests, they'll appear here.
                </Typography>
              </Box>
            )}
          </TabPanel>

          {/* My Connections Tab */}
          <TabPanel value={activeTab} index={1}>
            {loading ? (
              <Box>
                {[1, 2, 3].map((i) => (
                  <UserSkeleton key={i} />
                ))}
              </Box>
            ) : connections.length > 0 ? (
              <Box>{connections.map(renderConnection)}</Box>
            ) : (
              <Box sx={{ textAlign: "center", py: 6 }}>
                <Box sx={{display: "flex", alignItems: "center", justifyContent: "center"}}><UsersIcon size={48} color={theme.palette.text.secondary} /></Box>
                <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
                  No connections yet
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Start connecting with people to build your professional
                  network.
                </Typography>
              </Box>
            )}
          </TabPanel>

          {/* Sent Requests Tab */}
          <TabPanel value={activeTab} index={2}>
            {loading ? (
              <Box>
                {[1, 2, 3].map((i) => (
                  <UserSkeleton key={i} />
                ))}
              </Box>
            ) : sent.length > 0 ? (
              <Box>
                {sent.map((request) => (
                  <motion.div
                    key={request.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ConnectionCard sx={{ mb: 2 }}>
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar
                            src={request.avatar}
                            sx={{ width: 50, height: 50, mr: 2 }}
                          />
                          <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="subtitle1" fontWeight={600}>
                              {request.to_user.username}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ mb: 0.5 }}
                            >
                              {request.to_user.location || "location"}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {new Intl.DateTimeFormat("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                              }).format(new Date(request?.created))}
                            </Typography>
                          </Box>
                          <Chip
                            icon={<ClockIcon size={16} />}
                            label="Pending"
                            color="warning"
                            variant="outlined"
                            size="small"
                          />
                        </Box>
                      </CardContent>
                    </ConnectionCard>
                  </motion.div>
                ))}
              </Box>
            ) : (
              <Box sx={{ textAlign: "center", py: 6 }}>
                <SendIcon size={48} color={theme.palette.text.secondary} />
                <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
                  No sent requests
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Connection requests you send will appear here.
                </Typography>
              </Box>
            )}
          </TabPanel>
        </StyledCard>
      </motion.div>

      {/* Success/Error Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default Connections;
