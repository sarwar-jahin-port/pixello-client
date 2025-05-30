import './App.css'
import homepageBanner from "./assets/homepage-banner.png"
import CardMedia from '@mui/material/CardMedia'
import MainFeatures from './components/MainFeatures'

function App() {

  return (
    <>
      <CardMedia
        component="img"
        image={homepageBanner}
        width="100%"
      />
      <MainFeatures/>
    </>
  )
}

export default App
