import {useState} from 'react'
import './App.css'
import NbodySimulatorBarnesHut from "./components/NbodySimulatorBarnesHut";

function App() {
    const [count, setCount] = useState(2)

    return (
        <>
            <NbodySimulatorBarnesHut particlesCount={count}/>
            <input type={'number'} value={count} min={1} onChange={(e) => {
                if (e.target.value === '' || parseInt(e.target.value) < 1) {
                    setCount(parseInt("1"));
                    return;
                }
                setCount(parseInt(e.target.value))
            }
            }/>
        </>
    )
}

export default App
