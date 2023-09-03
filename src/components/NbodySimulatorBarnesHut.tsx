import {Quadtree, Rectangle} from "../classes/Quadtree";
import p5Types from "p5";
import Sketch from "react-p5";
import Particle from "../classes/Particle";

type Props = {
    particlesCount: number;
}

const defaultProps: Props = {
    particlesCount: 10,
}

const NbodySimulatorBarnesHut = (props: Props) => {
    const mergedProps = {...defaultProps, ...props};

    const widthHeight = 500;
    const quadtree = new Quadtree(new Rectangle(0, 0, widthHeight, widthHeight), 4, 0, 10);

    const particles = [];
    for (let i = 0; i < mergedProps.particlesCount; i++) {
        particles.push(new Particle(Math.random() * widthHeight, Math.random() * widthHeight, 1));
        console.log(quadtree.insert(particles[i]));
    }

    console.log(quadtree);

    const setup = (p5: p5Types, canvasParentRef: Element) => {
        p5.createCanvas(widthHeight, widthHeight).parent(canvasParentRef);
    };


    const draw = (p5: p5Types) => {
        p5.background(100);
        quadtree.show(p5);
    };

    return <Sketch setup={setup} draw={draw}/>;
};

export default NbodySimulatorBarnesHut;
