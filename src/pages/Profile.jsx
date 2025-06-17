import { useState, useContext, useEffect } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  IconButton,
  useTheme,
  useMediaQuery,
  Snackbar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import {
  Edit as EditIcon,
  Save as SaveIcon,
  //   Cancel as CancelIcon,
  Trash2 as DeleteIcon,
  Camera as CameraIcon,
  User as UserIcon,
  Mail as MailIcon,
  Phone as PhoneIcon,
  MapPin as LocationIcon,
  Calendar as CalendarIcon,
  Shield as ShieldIcon,
} from "lucide-react";
import { AuthContext } from "../contexts/AuthContext";
import { authService } from "../services/api";

const ProfileHeader = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(4),
  color: theme.palette.common.white,
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
  },
}));

const AvatarContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "inline-block",
  "& .avatar-overlay": {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0,
    transition: "opacity 0.3s ease",
    cursor: "pointer",
  },
  "&:hover .avatar-overlay": {
    opacity: 1,
  },
}));

const InfoCard = styled(Card)(({ theme }) => ({
  height: "100%",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.shadows[8],
  },
}));

const Profile = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { user, setUser, logout } = useContext(AuthContext);
  console.log(user);

  const [editing, setEditing] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    location: "",
    // bio: user?.bio || "",
    // website: user?.website || "",
    // company: user?.company || "",
    // position: user?.position || "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name ?? "",
        last_name: user.last_name ?? "",
        email: user.email ?? "",
        phone: user.phone ?? "",
        location: user.location ?? "",
      });
    }
  }, [user]);

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const profileUpdate = await authService.updateUser(formData);

      // Update user context
      setUser({
        ...user,
        ...formData,
      });

      setEditing(false);
      setSnackbarMessage("Profile updated successfully!");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("Failed to update profile. Please try again.");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      location: user?.location || "",
      // bio: user?.bio || "",
      // website: user?.website || "",
      // company: user?.company || "",
      // position: user?.position || "",
    });
    setEditing(false);
  };

  const handleDeleteAccount = async () => {
    setLoading(true);
    try {
      console.log(confirmPassword);
      const deleteUser = await authService.deleteUser(confirmPassword);
      console.log(deleteUser);

      // Clear user data and logout
      logout();
      setSnackbarMessage("Account deleted successfully");
      setSnackbarOpen(true);

      // Redirect to home page
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (error) {
      setSnackbarMessage("Failed to delete account. Please try again.");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
      setDeleteDialogOpen(false);
    }
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUser({
          ...user,
          avatar: e.target.result,
        });
        setSnackbarMessage("Profile picture updated!");
        setSnackbarOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Alert severity="warning">Please log in to view your profile.</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Profile Header */}
        <ProfileHeader sx={{ mb: 4 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm="auto">
              <AvatarContainer>
                <Avatar src={user.avatar} sx={{ width: 120, height: 120 }} />
                <Box className="avatar-overlay">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    style={{ display: "none" }}
                    id="avatar-upload"
                  />
                  <label htmlFor="avatar-upload">
                    <CameraIcon
                      size={24}
                      color="white"
                      style={{ cursor: "pointer" }}
                    />
                  </label>
                </Box>
              </AvatarContainer>
            </Grid>
            <Grid item xs={12} sm>
              <Typography
                variant="h4"
                fontWeight={700}
                sx={{ mb: 1, position: "relative", zIndex: 1 }}
              >
                {[user?.firstName + user?.lastName].filter(Boolean).join(" ")}
              </Typography>
              <Typography
                variant="h6"
                sx={{ opacity: 0.9, mb: 2, position: "relative", zIndex: 1 }}
              >
                Professional
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  flexWrap: "wrap",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={
                    editing ? <SaveIcon size={18} /> : <EditIcon size={18} />
                  }
                  onClick={editing ? handleSave : () => setEditing(true)}
                  disabled={loading}
                  sx={{
                    bgcolor: "rgba(255, 255, 255, 0.2)",
                    "&:hover": { bgcolor: "rgba(255, 255, 255, 0.3)" },
                  }}
                >
                  {editing
                    ? loading
                      ? "Saving..."
                      : "Save Changes"
                    : "Edit Profile"}
                </Button>
                {editing && (
                  <Button
                    variant="outlined"
                    // startIcon={<CancelIcon size={18} />}
                    onClick={handleCancel}
                    sx={{
                      borderColor: "rgba(255, 255, 255, 0.5)",
                      color: "white",
                      "&:hover": {
                        borderColor: "white",
                        bgcolor: "rgba(255, 255, 255, 0.1)",
                      },
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        </ProfileHeader>

        <Grid container spacing={4}>
          {/* Personal Information */}
          <Grid size={{ xs: 12, md: 6 }}>
            <InfoCard>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <UserIcon size={24} color={theme.palette.primary.main} />
                  <Typography variant="h6" fontWeight={600} sx={{ ml: 1 }}>
                    Personal Information
                  </Typography>
                </Box>

                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="First Name"
                      value={formData.first_name}
                      onChange={handleInputChange("first_name")}
                      disabled={!editing}
                      variant={editing ? "outlined" : "standard"}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      value={formData.last_name}
                      onChange={handleInputChange("last_name")}
                      disabled={!editing}
                      variant={editing ? "outlined" : "standard"}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange("email")}
                      disabled={!editing}
                      variant={editing ? "outlined" : "standard"}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Phone"
                      value={formData.phone}
                      onChange={handleInputChange("phone")}
                      disabled={!editing}
                      variant={editing ? "outlined" : "standard"}
                    />
                  </Grid>
                  <Grid size={12}>
                    <TextField
                      fullWidth
                      label="Location"
                      value={formData.location}
                      onChange={handleInputChange("location")}
                      disabled={!editing}
                      variant={editing ? "outlined" : "standard"}
                    />
                  </Grid>
                  {/* <Grid item size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Bio"
                      multiline
                      rows={3}
                      value={formData.bio}
                      onChange={handleInputChange("bio")}
                      disabled={!editing}
                      variant={editing ? "outlined" : "standard"}
                    />
                  </Grid> */}
                </Grid>
              </CardContent>
            </InfoCard>
          </Grid>

          {/* Professional Information */}
          <Grid size={{ xs: 12, md: 6 }}>
            <InfoCard sx={{ mb: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <ShieldIcon size={24} color={theme.palette.primary.main} />
                  <Typography variant="h6" fontWeight={600} sx={{ ml: 1 }}>
                    Professional
                  </Typography>
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Company"
                      value={formData.company}
                      onChange={handleInputChange("company")}
                      disabled={!editing}
                      variant={editing ? "outlined" : "standard"}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Position"
                      value={formData.position}
                      onChange={handleInputChange("position")}
                      disabled={!editing}
                      variant={editing ? "outlined" : "standard"}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Website"
                      value={formData.website}
                      onChange={handleInputChange("website")}
                      disabled={!editing}
                      variant={editing ? "outlined" : "standard"}
                      size="small"
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </InfoCard>

            {/* Account Statistics */}
            <InfoCard>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
                  Account Statistics
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Posts
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {user.posts || 0}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Connections
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {user.connections || 0}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Profile Views
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {user.views || 0}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2" color="text.secondary">
                    Member Since
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    Jan 2024
                  </Typography>
                </Box>
              </CardContent>
            </InfoCard>
          </Grid>

          {/* Danger Zone */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ border: `1px solid ${theme.palette.error.main}` }}>
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h6"
                  fontWeight={600}
                  color="error"
                  sx={{ mb: 2 }}
                >
                  Danger Zone
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  Once you delete your account, there is no going back. Please
                  be certain.
                </Typography>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon size={18} />}
                  onClick={() => setDeleteDialogOpen(true)}
                >
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </motion.div>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6" fontWeight={600} color="error">
            Delete Account
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Alert severity="error" sx={{ mb: 2 }}>
            This action cannot be undone!
          </Alert>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Are you sure you want to delete your account? This will permanently
            remove:
          </Typography>
          <Box component="ul" sx={{ pl: 2, mb: 2 }}>
            <li>Your profile and personal information</li>
            <li>All your posts and comments</li>
            <li>Your connections and messages</li>
            <li>Your subscription and billing history</li>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Type your password to confirm this action:
          </Typography>
          <TextField
            fullWidth
            placeholder="Type password to confirm"
            sx={{ mt: 1 }}
            id="delete-confirmation"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            type="password"
          />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setDeleteDialogOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteAccount}
            color="error"
            variant="contained"
            disabled={loading}
            startIcon={<DeleteIcon size={18} />}
          >
            {loading ? "Deleting..." : "Delete Account"}
          </Button>
        </DialogActions>
      </Dialog>

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

export default Profile;
