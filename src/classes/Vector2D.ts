class Vector2D {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    add(vector: Vector2D) {
        this.x += vector.x;
        this.y += vector.y;
    }

    sub(vector: Vector2D) {
        this.x -= vector.x;
        this.y -= vector.y;
    }

    mult(scalar: number) {
        this.x *= scalar;
        this.y *= scalar;
    }

    div(scalar: number) {
        this.x /= scalar;
        this.y /= scalar;
    }

    dist(vector: Vector2D) {
        return Math.sqrt((this.x - vector.x) * (this.x - vector.x) + (this.y - vector.y) * (this.y - vector.y));
    }

    mag() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalize() {
        const m = this.mag();
        if (m !== 0) {
            this.div(m);
        } else {
            this.x = 0;
            this.y = 0;
        }
    }

    limit(max: number) {
        if (this.mag() > max) {
            this.normalize();
            this.mult(max);
        }
    }

    static add(v1: Vector2D, v2: Vector2D): Vector2D {
        return new Vector2D(v1.x + v2.x, v1.y + v2.y);
    }

    static sub(v1: Vector2D, v2: Vector2D): Vector2D {
        return new Vector2D(v1.x - v2.x, v1.y - v2.y);
    }

    static mult(v: Vector2D, scalar: number): Vector2D {
        return new Vector2D(v.x * scalar, v.y * scalar);
    }

    static div(v: Vector2D, scalar: number): Vector2D {
        return new Vector2D(v.x / scalar, v.y / scalar);
    }

    static dist(v1: Vector2D, v2: Vector2D): number {
        return Math.sqrt((v1.x - v2.x) * (v1.x - v2.x) +
            (v1.y - v2.y) * (v1.y - v2.y));
    }

    static mag(v: Vector2D): number {
        return Math.sqrt(v.x * v.x + v.y * v.y);
    }

    static normalize(v: Vector2D): Vector2D {
        const m = Vector2D.mag(v);
        if (m != 0) {
            return Vector2D.div(v, m);
        }
        throw new Error("Cannot normalize a zero vector");
    }

    static limit(v: Vector2D, max: number): Vector2D {
        if (Vector2D.mag(v) > max) {
            return Vector2D.mult(Vector2D.normalize(v), max);
        }
        return v;
    }
}

export default Vector2D;
