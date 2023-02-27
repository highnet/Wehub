class RigidBody2D {

    _mass;
    _useGravity;
    _velocity2D;

    constructor(mass, useGravity) {
        this._mass = mass;
        this._useGravity = useGravity;
        this._velocity2D = createVector(0, 0);
    }

}