import { useState } from 'react'
import MainScreen from './components/mainScreen'
import BottomBar from './components/bottomBar'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div>
       <MainScreen />
       {/* <BottomBar /> */}
    </div>
    
    </>
  )
}

export default App
