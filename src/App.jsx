import "./App.css";
import homepageBanner from "./assets/banner.png";
import CardMedia from "@mui/material/CardMedia";
import MainFeatures from "./components/MainFeatures";
import PixelloWorks from "./components/PixelloWorks";
import PixelloSolution from "./components/PixelloSolution";
import { Box, Card, Typography } from "@mui/material";
import { motion } from "framer-motion";

function App() {
  return (
    <>
      <Card sx={{ position: "relative", overflow: "hidden" }}>
        <CardMedia component="img" image={homepageBanner} sx={{opacity: .8}}/>
        {/* Overlay layer */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            // background:
            //   "linear-gradient(to bottom right, rgba(71,110,203,0.6), rgba(71,110,203,0.3))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 2,
          }}
        >
          {/* Animated text block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Typography
              variant="h3"
              component="h1"
              sx={{
                color: "#202157",
                textAlign: "center",
                fontWeight: 700,
                textShadow: "0 2px 8px rgba(0,0,0,0.3)",
              }}
            >
              “Share Your World, One <span className="text-white">Pixel</span> at a Time.”
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ color: "#202157", mt: 1, textAlign: "center" }}
            >
              Fast. Fun. Connected.
            </Typography>
          </motion.div>
        </Box>
      </Card>
      <MainFeatures />
      <PixelloWorks />
      <PixelloSolution />
    </>
  );
}

export default App;
