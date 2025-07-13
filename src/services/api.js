import axios from "axios";

// Create an axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor for authentication tokens
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `JWT ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Authentication API services
export const authService = {
  // Login with username and password
  login: async (username, password) => {
    try {
      const response = await api.post("/auth/jwt/create/", {
        username,
        password,
      });
      // Store auth token in localStorage if needed
      const { access, refresh } = response.data;

      if (access) {
        localStorage.setItem("authToken", access);
        localStorage.setItem("refreshToken", refresh);
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Register a new user
  signup: async (username, password) => {
    try {
      const response = await api.post("/auth/users/", { username, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Request password reset (sends OTP)
  requestPasswordReset: async (usernameOrEmail) => {
    try {
      const response = await api.post("/auth/reset_password/", {
        usernameOrEmail,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Verify OTP for password reset
  verifyOTP: async (usernameOrEmail, otp) => {
    try {
      const response = await api.post("/auth/verify-otp/", {
        usernameOrEmail,
        otp,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Reset password with OTP
  resetPassword: async (usernameOrEmail, otp, newPassword) => {
    try {
      const response = await api.post("/auth/reset-password/", {
        usernameOrEmail,
        otp,
        newPassword,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Logout - clear storage
  logout: () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
  },

  getCurrentUser: async () => {
    try {
      const response = await api.get("/auth/users/me/");
      return response.data;
    } catch (error) {
      console.error("Error fetching current user:", error);
      return null;
    }
  },

  updateUser: async (updated_user_data) => {
    try {
      const response = await api.put(`/auth/users/me/`, updated_user_data);
      return response.data;
    } catch (error) {
      console.error("Error updating user data: ", error);
    }
  },
  deleteUser: async (confirm_password) => {
    try {
      const response = await api.delete("/auth/users/me/", {
        data: { current_password: confirm_password },
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting user account:", error);
      throw error; // <-- re‑throw so component.catch runs
    }
  },
};

export const postService = {
  posts: async (page = 1) => {
    try {
      const response = await api.get(`/posts/?page=${page}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // axios puts the parsed JSON in response.data
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      return null;
    }
  },
  createPost: async (content, video_url) => {
    try {
      const payload = { content, video_url };

      const response = await api.post(`/posts/`, payload);

      return response.data; // Should return the created Post object
    } catch (error) {
      console.error("Error creating post:", error);
      return null;
    }
  },
  editPost: async (id, content, video_url) => {
    try {
      const payload = { content, video_url };
      const response = await api.put(`/posts/${id}/`, payload);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  deletePost: async (id) => {
    try {
      const response = await api.delete(`/posts/${id}/`);

      return response.data;
    } catch (error) {
      console.error("Error deleting post:", error);
      return null;
    }
  },
  postLikeStatus: async (userId, postId) => {
    try {
      const response = await api.get(`/posts/${postId}/likes/`);
      const existingLike = response.data.find((l) => l.user === userId);
      return existingLike || null;
    } catch (error) {
      console.error("Error getting post like status: ", error);
      return null;
    }
  },
  postLike: async (postId) => {
    try {
      const response = await api.post(`/posts/${postId}/likes/`);
      return response.data;
    } catch (error) {
      console.error("Error liking the post:", error);
      return null;
    }
  },
  postDislike: async (postId, userId) => {
    try {
      const response = await api.get(`/posts/${postId}/likes/`);

      const likeObj = response.data.find((like) => like.user === userId);

      if (!likeObj) {
        // No existing “like” for this user—nothing to delete
        console.warn(`No like found for user ${userId} on post ${postId}`);
        return null;
      }

      const likeId = likeObj.id;
      const deleteResponse = await api.delete(
        `/posts/${postId}/likes/${likeId}/`
      );
      return deleteResponse.data;
    } catch (error) {
      console.error("Error disliking the post:", error);
      return null;
    }
  },
  postCommentByID: async (postId) => {
    try {
      const response = await api.get(`/posts/${postId}/comments`);
      return response.data;
    } catch (error) {
      console.error("Error getting comments by postId: ", error);
    }
  },
  postCommentStatus: async (userId, postId) => {
    try {
      const response = await api.get(`/posts/${postId}/comments/`);
      const existingComment = response.data.find((c) => c.user.id === userId);
      return existingComment || null;
    } catch (error) {
      console.log("Error getting post comment status: ", error);
    }
  },
  // Create a new comment:
  postComment: async (postId, text) => {
    try {
      const response = await api.post(`/posts/${postId}/comments/`, { text });
      return response.data; // { id, user: { … }, content, timestamp, … }
    } catch (error) {
      console.error("Error creating comment:", error);
      return null;
    }
  },

  // Update an existing comment:
  postCommentUpdate: async (postId, commentId, text) => {
    try {
      const response = await api.put(
        `/posts/${postId}/comments/${commentId}/`,
        { text }
      );
      return response.data; // the updated comment object
    } catch (error) {
      console.error("Error updating comment:", error);
      return null;
    }
  },

  // Delete an existing comment:
  postCommentDelete: async (postId, commentId) => {
    try {
      const response = await api.delete(
        `/posts/${postId}/comments/${commentId}/`
      );
      return response.data; // usually {} or confirmation
    } catch (error) {
      console.error("Error deleting comment:", error);
      return null;
    }
  },
};

export const paymentService = {
  payment: async (customer_info) => {
    try {
      const response = await api.post(`/payment/initiate/`, customer_info);
      return response.data;
    } catch (error) {
      console.error("Error completing payment: ", error);
    }
  },
};

export const connectionService = {
  randomUsers: async() =>{
    try {
      const response = await api.get('/users/show_random_users');
      return response.data;
    } catch (error) {
      return error;
    }
  },
  sendFriendRequest: async (userId) => {
    try {
      const response = await api.post('/friend-requests/', {
        to_user: userId
      });
      return response.data;
    } catch (error) {
      return error;
    }
  },
  requests: async () => {
    try {
      const response = await api.get('/friend-requests/');
      return response.data;
    } catch (error) {
      return error;
    }
  },
  acceptFreindRequest: async (requestId) => {
    try {
      const response = await api.post(`/friend-requests/${requestId}/accept/`);
      return response.data;
    } catch (error) {
      return error;
    }
  },
  rejectFriendRequest: async (requestId) => {
    try {
      const response = await api.post(`/friend-requests/${requestId}/reject/`);
      return response.data;
    } catch (error) {
      return error;
    }
  },
  deleteFriendRequest: async (requestId) => {
    try {
      const response = await api.delete(`/friend-requests/${requestId}/`)
      return response.data;
    } catch (error) {
      return error
    }
  }
}

export default api;
