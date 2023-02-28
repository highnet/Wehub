class Transform2D {

    _x;
    _y;

    constructor(x, y) {
        this._x = x;
        this._y = y;
    }

    get y() {
        return this._y;
    }

    set y(value) {
        this._y = value;
    }

    get x() {
        return this._x;
    }

    set x(value) {
        this._x = value;
    }

    getPosition2D() {
        return createVector(this._x, this._y);
    }
}