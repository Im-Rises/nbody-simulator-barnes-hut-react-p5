import Vector2D from "./Vector2D";

class Particle {
    pos: Vector2D;
    vel: Vector2D;
    sumForces: Vector2D;
    mass: number;

    constructor(x: number, y: number, mass: number) {
        this.pos = new Vector2D(x, y);
        this.vel = new Vector2D(0, 0);
        this.sumForces = new Vector2D(0, 0);
        this.mass = mass;
    }

    // attract(p: Particle, G: number, softening: number) {
    //     this.attract(p.pos, p.mass, G, softening);
    // }
    //
    // attract(pos: Vector2D, mass: number, G: number, softening: number) {
    //     const force = Vector2D.sub(this.pos, pos);
    //     const distance = force.mag();
    //     const strength = (G * this.mass * mass) / ((distance * distance) + softening);
    //     force.normalize();
    //     force.mult(strength);
    //     this.sumForces.add(force);
    // }

    appendForceFrom(p: Particle, G: number, softening: number) {
        this.appendForceFrom(p.pos, p.mass, G, softening);
    }

    appendForceFrom(pos: Vector2D, mass: number, G: number, softening: number) {
        const force = Vector2D.sub(this.pos, pos);
        const distance = force.mag();
        const strength = (G * this.mass * mass) / ((distance * distance) + softening);
        force.normalize();
        force.mult(strength);
        this.sumForces.add(force);
    }

    updatePhysics(deltaTime: number) {
        const acceleration = Vector2D.div(this.sumForces, this.mass);
        this.vel.add(Vector2D.mult(acceleration, deltaTime));
        this.pos.add(Vector2D.mult(this.vel, deltaTime));
        this.sumForces.mult(0);
    }
}

export default Particle;
