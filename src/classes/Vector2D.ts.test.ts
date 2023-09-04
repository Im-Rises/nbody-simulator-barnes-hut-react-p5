import {expect, test} from 'vitest'
import Vector2D from './Vector2D'

test('Vector2D', () => {
    const v = new Vector2D(1, 2)
    expect(v.x).toBe(1)
    expect(v.y).toBe(2)
})

test('Vector2D.add', () => {
    // const v1 = new Vector2D(1, 2)
    // const v2 = new Vector2D(3, 4)
    // const v3 = v1.add(v2)
    // expect(v3.x).toBe(4)
    // expect(v3.y).toBe(6)
})

test('Vector2D.sub', () => {
    // const v1 = new Vector2D(1, 2)
    // const v2 = new Vector2D(3, 4)
    // const v3 = v1.sub(v2)
    // expect(v3.x).toBe(-2)
    // expect(v3.y).toBe(-2)
})
