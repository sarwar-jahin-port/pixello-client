import profileImage from "../assets/profile.jpg"
// Mock data for the Pixello app

export const currentUser = {
  id: 1,
  name: "Sarwar Jahin",
  username: "sarwar_jahin",
  avatar: profileImage,
  headline: "CEO at pixello | Reactjs | Django",
  connections: 582,
  views: 124,
  posts: 18,
}
export const posts = [
  {
    id: 1,
    user: {
      id: 2,
      name: "Creative Studios",
      username: "creativestudios",
      avatar: "https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=600",
      headline: "Design Agency",
    },
    content: "We're excited to announce our new design system that will help streamline our workflow. Check out the details below!",
    image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600",
    timestamp: "2h ago",
    likes: 243,
    comments: 42,
    shares: 18,
  },
  {
    id: 2,
    user: {
      id: 3,
      name: "Sarah Johnson",
      username: "sarahjohnson",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
      headline: "Frontend Developer | React.js | UI Design",
    },
    content: "Just finished building a new component library using React and Material-UI. It's amazing how much faster development is when you have reusable components!",
    image: null,
    timestamp: "4h ago",
    likes: 156,
    comments: 28,
    shares: 7,
  },
  {
    id: 3,
    user: {
      id: 4,
      name: "Tech Innovations",
      username: "techinnovations",
      avatar: "https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=600",
      headline: "Technology Company",
    },
    content: "Our annual conference is coming up next month! Register now to secure your spot and join us for three days of inspiring talks and workshops.",
    image: "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=600",
    timestamp: "1d ago",
    likes: 389,
    comments: 64,
    shares: 92,
  },
];

export const connections = [
  {
    id: 5,
    name: "John Doe",
    username: "johndoe",
    avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600",
    headline: "Software Engineer at Google",
    mutualConnections: 12,
  },
  {
    id: 6,
    name: "Emily Wilson",
    username: "emilywilson",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600",
    headline: "UX Designer at Apple",
    mutualConnections: 8,
  },
  {
    id: 7,
    name: "Michael Brown",
    username: "michaelbrown",
    avatar: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600",
    headline: "Product Manager at Amazon",
    mutualConnections: 5,
  },
];

export const notifications = [
  {
    id: 1,
    type: "connection",
    user: {
      id: 8,
      name: "Lisa Anderson",
      username: "lisaanderson",
      avatar: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    content: "accepted your connection request",
    timestamp: "2h ago",
    read: false,
  },
  {
    id: 2,
    type: "like",
    user: {
      id: 9,
      name: "David Williams",
      username: "davidwilliams",
      avatar: "https://images.pexels.com/photos/1121796/pexels-photo-1121796.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    content: "liked your post",
    timestamp: "5h ago",
    read: true,
  },
  {
    id: 3,
    type: "comment",
    user: {
      id: 10,
      name: "Jessica Miller",
      username: "jessicamiller",
      avatar: "https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    content: "commented on your post",
    timestamp: "1d ago",
    read: true,
  },
];

export const messages = [
  {
    id: 1,
    user: {
      id: 11,
      name: "Thomas Clark",
      username: "thomasclark",
      avatar: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    lastMessage: "Hey, are you available for a quick call tomorrow?",
    timestamp: "1h ago",
    unread: true,
  },
  {
    id: 2,
    user: {
      id: 12,
      name: "Olivia Taylor",
      username: "oliviataylor",
      avatar: "https://images.pexels.com/photos/1853712/pexels-photo-1853712.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    lastMessage: "Thanks for the information, I'll look into it.",
    timestamp: "3h ago",
    unread: false,
  },
  {
    id: 3,
    user: {
      id: 13,
      name: "Daniel Moore",
      username: "danielmoore",
      avatar: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    lastMessage: "Let's catch up next week. I have some exciting news to share!",
    timestamp: "1d ago",
    unread: false,
  },
];