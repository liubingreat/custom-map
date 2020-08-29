class Point{
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(dx, dy) {
        return new Point(
            this.x + dx,
            this.y + dy
        );
    }

    sub(dx, dy) {
        return new Point(
            this.x - dx,
            this.y - dy
        );
    }

    multiply(mx, my) {
        return new Point(
            this.x * mx,
            this.y * my
        );
    }

    divide(dx, dy) {
        if (0 == dx || 0 == dy) {
            throw "除数不能为0";
        }
        return new Point(
            this.x / dx,
            this.y / dy
        );
    }

    remainder(rx, ry) {
        return new Point(
            this.x % rx,
            this.y % ry
        );
    }

    round(num) {
       this.x = Math.round(this.x, num);
       this.y = Math.round(this.y, num);
       return this;
    }

    ceil() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this;
    }

    floor() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this;
    }

    toString() {
        return `x:${this.x},y:${this.y}`;
    }
}