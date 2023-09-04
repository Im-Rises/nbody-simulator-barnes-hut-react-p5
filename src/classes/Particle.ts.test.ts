import {expect, test} from 'vitest'
import Particle from "./Particle";
import Vector2D from "./Vector2D";

test('Particle.constructor', () => {
    const p = new Particle(1, 2, 3);
    expect(p).toMatchObject({
        pos: {x: 1, y: 2},
        vel: {x: 0, y: 0},
        sumForces: {x: 0, y: 0},
        mass: 3,
    });
});

test('Particle.appendForceFrom', () => {
    // F = G * m1 * m2 / (r * r + softening)
    // F = 1 * 1 * 1 / (1 * 1 + 1) = 0.5
    const p = new Particle(0, 0, 1);
    p.appendForceFrom(new Vector2D(1, 0), 1, 1, 1);
    expect(p.sumForces.x).toBe(0.5);
    expect(p.sumForces.y).toBe(0);
});

test('Particle.updatePhysics', () => {
    const p = new Particle(0, 0, 1);
    p.appendForceFrom(new Vector2D(1, 0), 1, 1, 1);
    p.updatePhysics(1);
    expect(p).toMatchObject({
        pos: {x: 0.5, y: 0},
        vel: {x: 0.5, y: 0},
        sumForces: {x: 0, y: 0},
    });
});

