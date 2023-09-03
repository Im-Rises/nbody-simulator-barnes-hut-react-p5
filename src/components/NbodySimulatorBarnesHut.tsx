import {Quadtree, Rectangle} from "../classes/Quadtree";
import p5Types from "p5";
import Sketch from "react-p5";
import Particle from "../classes/Particle";

type Props = {
    particlesCount: number;
    widthHeight: number;
}

const defaultProps: Props = {
    particlesCount: 10,
    widthHeight: 500,
}

const NbodySimulatorBarnesHut = (props: Props) => {
    const mergedProps = {...defaultProps, ...props};

    const particles = [];
    for (let i = 0; i < mergedProps.particlesCount; i++) {
        particles.push(new Particle(Math.random() * mergedProps.widthHeight, Math.random() * mergedProps.widthHeight, 1));
    }

    const setup = (p5: p5Types, canvasParentRef: Element) => {
        p5.createCanvas(mergedProps.widthHeight, mergedProps.widthHeight).parent(canvasParentRef);
    };


    const draw = (p5: p5Types) => {
        // Create quadtree
        const quadtree = new Quadtree(new Rectangle(0, 0, mergedProps.widthHeight, mergedProps.widthHeight),
            4, 0, 10);

        // Fill the quadtree with particles
        for (const particle of particles) {
            quadtree.insert(particle);
        }

        // Fill the quadtree with center of attraction and mass
        quadtree.calculateAttractionCenter();
        console.log(quadtree);
        // // Update sum of forces for each particle
        // for (const particle of particles) {
        //     quadtree.calculateSumForces(particle, 1, 1, 100);
        // }
        //
        // // Update position of each particle
        // for (const particle of particles) {
        //     particle.updatePhysics(1);
        // }

        // Draw particles
        p5.background(100);
        quadtree.show(p5);
    };

    return <Sketch setup={setup} draw={draw}/>;
};

export default NbodySimulatorBarnesHut;
