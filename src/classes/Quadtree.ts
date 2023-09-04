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

    insert(p: Particle): boolean {
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
            this.mass = this.northWest.mass + this.northEast.mass + this.southWest.mass + this.southEast.mass;
            const x = (this.northWest.attractionCenter.x * this.northWest.mass + this.northEast.attractionCenter.x * this.northEast.mass +
                this.southWest.attractionCenter.x * this.southWest.mass + this.southEast.attractionCenter.x * this.southEast.mass) / this.mass;
            const y = (this.northWest.attractionCenter.y * this.northWest.mass + this.northEast.attractionCenter.y * this.northEast.mass +
                this.southWest.attractionCenter.y * this.southWest.mass + this.southEast.attractionCenter.y * this.southEast.mass) / this.mass;
            this.attractionCenter = new Vector2D(x, y);
        } else if (this.particles.length > 0) {
            for (const p of this.particles) {
                this.attractionCenter.add(p.pos);
                this.mass += p.mass;
            }
            this.attractionCenter.div(this.particles.length);
        } else {
            this.attractionCenter = new Vector2D(0, 0);
            this.mass = 0;
        }
    }

    calculateSumForces(p: Particle, theta: number, G: number, softening: number) {
        const s = this.boundary.w;
        const d = this.attractionCenter.dist(p.pos);

        if (d == 0) {
            return;
        }

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
                        p.appendForceFrom(p2.pos, p2.mass, G, softening);
                    }
                }
            }
        }
    }

    show(p5: p5Types, showQuadtree: boolean) {
        if (this.divided) {
            this.northWest.show(p5, showQuadtree);
            this.northEast.show(p5, showQuadtree);
            this.southWest.show(p5, showQuadtree);
            this.southEast.show(p5, showQuadtree);
        } else {
            if (showQuadtree) {
                p5.stroke(255);
                p5.noFill();
                p5.rect(this.boundary.x, this.boundary.y, this.boundary.w, this.boundary.h);
            }
            p5.stroke(0, 255, 255);
            for (const particle of this.particles) {
                p5.strokeWeight(4);
                p5.point(particle.pos.x, particle.pos.y);
            }
        }
    }

}

export {Quadtree, Rectangle};
