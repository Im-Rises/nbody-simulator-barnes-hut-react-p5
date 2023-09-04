import {useState} from 'react'
import './App.css'
import {NbodySimulatorBarnesHut, Color} from "./components/NbodySimulatorBarnesHut";


function App() {
    const [count, setCount] = useState(1000)

    return (
        <>
            <NbodySimulatorBarnesHut particlesCount={count} widthHeight={500} showQuadtree={false} maxDepth={1000}
                                     theta={1} G={1} softening={100} capacity={1} particleMass={1}
                                     backgroundColor={new Color(100, 100, 100)}/>
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
