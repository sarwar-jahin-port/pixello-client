import './App.css'
import homepageBanner from "./assets/homepage-banner.png"
import CardMedia from '@mui/material/CardMedia'
import MainFeatures from './components/MainFeatures'
import PixelloWorks from './components/PixelloWorks'
import PixelloSolution from './components/PixelloSolution'

function App() {

  return (
    <>
      <CardMedia
        component="img"
        image={homepageBanner}
        width="100%"
      />
      <MainFeatures/>
      <PixelloWorks/>
      <PixelloSolution/>
    </>
  )
}

export default App
