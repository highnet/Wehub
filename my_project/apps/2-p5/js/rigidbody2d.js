class RigidBody2D {

    _transform;
    _mass;
    _useGravity;
    _velocity2D;

    constructor(transform, mass, useGravity) {
        this._transform = transform;
        this._mass = mass;
        this._useGravity = useGravity;
        this._velocity2D = createVector(0, 0);
    }

    get velocity2D() {
        return this._velocity2D;
    }

    set velocity2D(value) {
        this._velocity2D = value;
    }

    get mass() {
        return this._mass;
    }

    set mass(value) {
        this._mass = value;
    }

    addForce(force2D) {
        this._velocity2D = createVector(
            this._velocity2D.x + force2D.x,
            this.velocity2D.y + force2D.y
        );

    }

    update() {
        if (this._useGravity) {
            this._velocity2D.y += this._mass * Physics.gravity;
        }

        this._transform.x += this._velocity2D.x;
        this._transform.y += this._velocity2D.y;

        // TODO: reuseable collision system
        if (this._transform.y > height) {
            this._velocity2D.y = 0;
            this._transform.y = height;
        }

    }

}