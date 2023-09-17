import {Quadtree, Rectangle} from "../classes/Quadtree";
import p5Types from "p5";
import Sketch from "react-p5";
import Particle from "../classes/Particle";

class Color {
    r: number;
    g: number;
    b: number;

    constructor(r: number, g: number, b: number) {
        this.r = r;
        this.g = g;
        this.b = b
    }
}

type Props = {
    particlesCount: number;
    widthHeight: number;
    maxDepth: number;
    capacity: number;
    particleMass: number;
    theta: number;
    G: number;
    softening: number;
    showQuadtree: boolean;
    backgroundColor: Color;
    divStyle?: string;
    canvasStyle?: string;
}

const defaultProps: Props = {
    particlesCount: 10,
    widthHeight: 500,
    maxDepth: 1000,
    capacity: 1,
    particleMass: 1,
    theta: 1,
    G: 1,
    softening: 10,
    showQuadtree: false,
    backgroundColor: new Color(100, 100, 100),
    divStyle: "",
    canvasStyle: ""
}

const NbodySimulatorBarnesHut = (props: Props) => {
    const mergedProps = {...defaultProps, ...props};

    // const blackHole = new Vector2D(mergedProps.widthHeight / 2, mergedProps.widthHeight / 2);
    // const blackHoleMass = 100;

    const quadtree = new Quadtree(new Rectangle(0, 0, mergedProps.widthHeight, mergedProps.widthHeight),
        mergedProps.capacity, 0, mergedProps.maxDepth);

    const particles: Particle[] = [];
    for (let i = 0; i < mergedProps.particlesCount; i++) {
        particles.push(new Particle(Math.random() * mergedProps.widthHeight, Math.random() * mergedProps.widthHeight, mergedProps.particleMass));
    }

    const setup = (p5: p5Types, canvasParentRef: Element) => {
        const canvas = p5.createCanvas(mergedProps.widthHeight, mergedProps.widthHeight).parent(canvasParentRef);
        p5.frameRate(60);
        canvas.attribute("style", mergedProps.canvasStyle);
        canvasParentRef.setAttribute("style", mergedProps.divStyle);
    };

    const draw = (p5: p5Types) => {
        // Fill the quadtree with particles
        for (const particle of particles) {
            quadtree.insert(particle);
        }

        // Fill the quadtree with center of attraction and mass
        quadtree.calculateAttractionCenter();

        // Update sum of forces for each particle
        for (const particle of particles) {
            quadtree.calculateSumForces(particle, mergedProps.theta, mergedProps.G, mergedProps.softening);
            // particle.appendForceFrom(blackHole, blackHoleMass, mergedProps.G, mergedProps.softening);
        }

        // Update position of each particle
        for (const particle of particles) {
            particle.updatePhysics(1);
        }

        // Draw particles
        p5.background(mergedProps.backgroundColor.r, mergedProps.backgroundColor.g, mergedProps.backgroundColor.b);
        quadtree.show(p5, mergedProps.showQuadtree);

        // Clear quadtree
        quadtree.clear();
    };

    return <Sketch setup={setup} draw={draw}/>;
};

export {NbodySimulatorBarnesHut, Color};
