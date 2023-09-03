import Vector2D from "./Vector2D";
import Particle from "./Particle";
import p5Types from "p5";

class Rectangle {
    x: number;
    y: number;
    w: number;
    h: number;

    constructor(x: number, y: number, w: number, h: number) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    contains(p: Vector2D) {
        return (p.x >= this.x &&
            p.x <= this.x + this.w &&
            p.y >= this.y &&
            p.y <= this.y + this.h);
    }
}

class Quadtree {
    private boundary: Rectangle;
    private readonly capacity: number;
    private readonly depth: number;
    private readonly maxDepth: number;
    private divided: boolean;
    private mass: number;
    private attractionCenter: Vector2D;
    private particles: Particle[];
    private northWest: Quadtree;
    private northEast: Quadtree;
    private southWest: Quadtree;
    private southEast: Quadtree;

    constructor(boundary: Rectangle, capacity: number, depth: number, maxDepth: number) {
        this.boundary = boundary;
        this.capacity = capacity;
        this.depth = depth;
        this.maxDepth = maxDepth;
        this.clear();
    }

    clear() {
        this.divided = false;
        this.mass = 0;
        this.attractionCenter = new Vector2D(0, 0);
        this.particles = [];
    }

    insert(p: Particle) {
        if (!this.boundary.contains(p.pos)) {
            return false;
        }
        if (!this.divided) {
            if (this.particles.length < this.capacity || this.depth >= this.maxDepth) {
                this.particles.push(p);
                return true;
            }
            this.subdivide();
        }
        return (
            this.northWest.insert(p) ||
            this.northEast.insert(p) ||
            this.southWest.insert(p) ||
            this.southEast.insert(p)
        )
    }

    subdivide() {
        const x = this.boundary.x;
        const y = this.boundary.y;
        const w = this.boundary.w;
        const h = this.boundary.h;

        const newDepth = this.depth + 1;

        this.northWest = new Quadtree(new Rectangle(x, y, w / 2, h / 2), this.capacity, newDepth, this.maxDepth);
        this.northEast = new Quadtree(new Rectangle(x + w / 2, y, w / 2, h / 2), this.capacity, newDepth, this.maxDepth);
        this.southWest = new Quadtree(new Rectangle(x, y + h / 2, w / 2, h / 2), this.capacity, newDepth, this.maxDepth);
        this.southEast = new Quadtree(new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2), this.capacity, newDepth, this.maxDepth);

        for (const p of this.particles) {
            this.northWest.insert(p);
            this.northEast.insert(p);
            this.southWest.insert(p);
            this.southEast.insert(p);
        }
        this.particles = [];

        this.divided = true;
    }

    calculateAttractionCenter() {
        if (this.divided) {
            this.northWest.calculateAttractionCenter();
            this.northEast.calculateAttractionCenter();
            this.southWest.calculateAttractionCenter();
            this.southEast.calculateAttractionCenter();
            this.attractionCenter = new Vector2D((this.northWest.attractionCenter.x + this.northEast.attractionCenter.x
                + this.southWest.attractionCenter.x + this.southEast.attractionCenter.x) / 4,
                (this.northWest.attractionCenter.y + this.northEast.attractionCenter.y
                    + this.southWest.attractionCenter.y + this.southEast.attractionCenter.y) / 4);
            this.mass = this.northWest.mass + this.northEast.mass + this.southWest.mass + this.southEast.mass;
        } else {
            for (const p of this.particles) {
                this.attractionCenter.add(p.pos);
                this.mass += p.mass;
            }
            this.attractionCenter.div(this.particles.length);
        }
    }

    calculateSumForces(p: Particle, theta: number, G: number, softening: number) {
        const s = this.boundary.w;
        const d = this.attractionCenter.dist(p.pos);

        if (s / d < theta) {
            p.appendForceFrom(this.attractionCenter, this.mass, G, softening);
        } else {
            if (this.divided) {
                this.northWest.calculateSumForces(p, theta, G, softening);
                this.northEast.calculateSumForces(p, theta, G, softening);
                this.southWest.calculateSumForces(p, theta, G, softening);
                this.southEast.calculateSumForces(p, theta, G, softening);
            } else {
                for (const p2 of this.particles) {
                    if (p2 != p) {
                        p.appendForceFrom(p2, G, softening);
                    }
                }
            }
        }
    }

    show(p5: p5Types) {
        p5.stroke(255);
        p5.noFill();
        p5.rect(this.boundary.x, this.boundary.y, this.boundary.w, this.boundary.h);
        if (this.divided) {
            this.northWest.show(p5);
            this.northEast.show(p5);
            this.southWest.show(p5);
            this.southEast.show(p5);
        }
        p5.stroke(0, 255, 255);
        for (const particle of this.particles) {
            p5.strokeWeight(4);
            p5.point(particle.pos.x, particle.pos.y);
        }
    }

}

export {Quadtree, Rectangle};
