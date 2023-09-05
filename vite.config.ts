import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        dts({
                include: ["src/components/NbodySimulatorBarnesHut.tsx"],
                insertTypesEntry: true,
            }
        ),
    ],
    build: {
        target: 'esnext', // Ensure compatibility with modern browsers
        lib: {
            entry: 'src/components/NbodySimulatorBarnesHut.tsx', // Entry point to your React component
            name: 'NbodySimulatorBarnesHut', // The name of your component
            formats: ['es'], // Output format (ES module)
        },
        rollupOptions: {
            // Externalize dependencies if needed
            external: ['react', 'react-dom', 'react-p5'],
            output: {
                dir: 'dist',
                entryFileNames: 'NbodySimulatorBarnesHut.js',
                // chunkFileNames: 'NbodySimulatorBarnesHut.js',
                sourcemap: true,
                // compact: false,
            },
        },
    },
})
