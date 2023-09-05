import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    // // Build react packages
    // build: {
    //     lib: {
    //         entry: 'src/components/NbodySimulatorBarnesHut.tsx',
    //         name: 'NbodySimulatorBarnesHut',
    //         fileName: (format) => `NbodySimulatorBarnesHut.${format}.js`,
    //     },
    // }
})
