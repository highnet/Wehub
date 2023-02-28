class GameObject {
    _transform;

    constructor(x, y) {
        this._transform = new Transform2D(x, y);
    }

    get transform() {
        return this._transform;
    }
}