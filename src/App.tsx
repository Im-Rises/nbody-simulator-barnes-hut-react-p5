import { useState } from 'react'
import './App.css'
import NbodySimulatorBarnesHut from "./components/NbodySimulatorBarnesHut";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <NbodySimulatorBarnesHut particlesCount={count}/>
        <input type={'number'} value={count} onChange={(e) => setCount(parseInt(e.target.value))}/>
    </>
  )
}

export default App
