import Vector2D from "./Vector2D";
import Particle from "./Particle";

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
        return (p.x >= this.x - this.w &&
            p.x <= this.x + this.w &&
            p.y >= this.y - this.h &&
            p.y <= this.y + this.h);
    }
}

class Quadtree {
    private boundary: Rectangle;
    private readonly capacity: number;
    private readonly depth: number;
    private readonly maxDepth: number;
    private divided: boolean;
    private weight: number;
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
        this.divided = false;
        this.weight = 0;
        this.attractionCenter = new Vector2D(0, 0);
        this.particles = [];
    }

    insert(p: Particle) {
        if (!this.boundary.contains(p.position)) {
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
        const w = this.boundary.w / 2;
        const h = this.boundary.h / 2;

        const nw = new Rectangle(x - w, y - h, w, h);
        const ne = new Rectangle(x + w, y - h, w, h);
        const sw = new Rectangle(x - w, y + h, w, h);
        const se = new Rectangle(x + w, y + h, w, h);

        const newDepth = this.depth + 1;

        this.northWest = new Quadtree(nw, this.capacity, newDepth, this.maxDepth);
        this.northEast = new Quadtree(ne, this.capacity, newDepth, this.maxDepth);
        this.southWest = new Quadtree(sw, this.capacity, newDepth, this.maxDepth);
        this.southEast = new Quadtree(se, this.capacity, newDepth, this.maxDepth);

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
            this.weight = this.northWest.weight + this.northEast.weight + this.southWest.weight + this.southEast.weight;
        } else {
            for (const p of this.particles) {
                this.attractionCenter.add(p.pos);
                this.weight += p.mass;
            }
            this.attractionCenter.div(this.particles.length);
        }
    }

    calculateSumForces(p: Particle, theta: number, G: number, softening: number) {
        const s = this.boundary.w;
        const d = this.attractionCenter.dist(p.pos);

        if (s / d < theta) {
            p.attract(this.attractionCenter, this.weight, G, softening);
        } else {
            if (this.divided) {
                this.northWest.calculateSumForces(p, theta, G, softening);
                this.northEast.calculateSumForces(p, theta, G, softening);
                this.southWest.calculateSumForces(p, theta, G, softening);
                this.southEast.calculateSumForces(p, theta, G, softening);
            } else {
                for (const p2 of this.particles) {
                    if (p2 != p) {
                        p.attract(p2, G, softening);
                    }
                }
            }
        }
    }


}
