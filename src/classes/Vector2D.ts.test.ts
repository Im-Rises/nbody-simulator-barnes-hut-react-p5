import {expect, test} from 'vitest'
import Vector2D from './Vector2D'

/* Methods */
test('Vector2D', () => {
    const v = new Vector2D(1, 2)
    expect(v.x).toBe(1)
    expect(v.y).toBe(2)
})

test('Vector2D.add', () => {
    const v1 = new Vector2D(1, 2)
    const v2 = new Vector2D(3, 4)
    v1.add(v2)
    expect(v1.x).toBe(4)
    expect(v1.y).toBe(6)
})

test('Vector2D.sub', () => {
    const v1 = new Vector2D(1, 2)
    const v2 = new Vector2D(3, 4)
    v1.sub(v2)
    expect(v1.x).toBe(-2)
    expect(v1.y).toBe(-2)
})

test('Vector2D.mult', () => {
    const v = new Vector2D(1, 2)
    v.mult(2)
    expect(v.x).toBe(2)
    expect(v.y).toBe(4)
})

test('Vector2D.div', () => {
    const v = new Vector2D(1, 2)
    v.div(2)
    expect(v.x).toBe(0.5)
    expect(v.y).toBe(1)
})

test('Vector2D.dist', () => {
    const v1 = new Vector2D(0, 0)
    const v2 = new Vector2D(0, 0)
    expect(v1.dist(v2)).toBe(0)

    const v3 = new Vector2D(0, 0)
    const v4 = new Vector2D(10, 0)
    expect(v3.dist(v4)).toBe(10)

    const v5 = new Vector2D(0, 0)
    const v6 = new Vector2D(0, 10)
    expect(v5.dist(v6)).toBe(10)

    const v7 = new Vector2D(3, 4);
    const v8 = new Vector2D(6, 8);
    expect(v7.dist(v8)).toBe(5);
})

test('Vector2D.mag', () => {
    const v = new Vector2D(3, 4)
    expect(v.mag()).toBe(5)
})

test('Vector2D.normalize', () => {
    const v = new Vector2D(3, 4)
    v.normalize()
    expect(v.x).toBe(0.6)
    expect(v.y).toBe(0.8)
})

test('Vector2D.limit', () => {
    const v = new Vector2D(3, 4)
    v.limit(2)
    expect(v.x).toBe(1.2)
    expect(v.y).toBe(1.6)
})

/* Static functions */
test('Vector2D.static.add', () => {
    const v1 = new Vector2D(1, 2)
    const v2 = new Vector2D(3, 4)
    const v3 = Vector2D.add(v1, v2)
    expect(v3.x).toBe(4)
    expect(v3.y).toBe(6)
})

test('Vector2D.static.sub', () => {
    const v1 = new Vector2D(1, 2)
    const v2 = new Vector2D(3, 4)
    const v3 = Vector2D.sub(v1, v2)
    expect(v3.x).toBe(-2)
    expect(v3.y).toBe(-2)
})

test('Vector2D.static.mult', () => {
    const v1 = new Vector2D(1, 2)
    const v2 = Vector2D.mult(v1, 2)
    expect(v2.x).toBe(2)
    expect(v2.y).toBe(4)
})

test('Vector2D.static.div', () => {
    const v1 = new Vector2D(1, 2)
    const v2 = Vector2D.div(v1, 2)
    expect(v2.x).toBe(0.5)
    expect(v2.y).toBe(1)
})

test('Vector2D.static.dist', () => {
    const v1 = new Vector2D(0, 0)
    const v2 = new Vector2D(0, 0)
    expect(Vector2D.dist(v1, v2)).toBe(0)

    const v3 = new Vector2D(0, 0)
    const v4 = new Vector2D(10, 0)
    expect(Vector2D.dist(v3, v4)).toBe(10)

    const v5 = new Vector2D(0, 0)
    const v6 = new Vector2D(0, 10)
    expect(Vector2D.dist(v5, v6)).toBe(10)

    const v7 = new Vector2D(3, 4);
    const v8 = new Vector2D(6, 8);
    expect(Vector2D.dist(v7, v8)).toBe(5);
})

test('Vector2D.static.mag', () => {
    const v = new Vector2D(3, 4)
    expect(Vector2D.mag(v)).toBe(5)
})

test('Vector2D.static.normalize', () => {
    const v = new Vector2D(3, 4)
    const v2 = Vector2D.normalize(v)
    expect(v2.x).toBe(0.6)
    expect(v2.y).toBe(0.8)
})

test('Vector2D.static.limit', () => {
    const v = new Vector2D(3, 4)
    const v2 = Vector2D.limit(v, 2)
    expect(v2.x).toBe(1.2)
    expect(v2.y).toBe(1.6)
})
