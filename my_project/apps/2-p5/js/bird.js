class Bird extends GameObject {

    _rigidBody;
    _flapStrength;
    _color;

    constructor(x, y, mass, useGravity, flapStrength, color) {
        super(x, y);
        this._rigidBody = new RigidBody2D(this.transform, mass, useGravity);

        // TODO: reuseable cooldown system
        this.flapCooldown = .5;
        this.flapCooldownTimer = 0.0;

        this._flapStrength = flapStrength;
        this._color = color;

    }

    flap() {
        if (this.flapCooldownTimer == 0) {
            this._rigidBody.changeVelocity(createVector(0, this._flapStrength * -1));
            this.flapCooldownTimer = this.flapCooldown;
        }
    }

    render() {
        this.update();
        this.show();
    }

    update() {
        if (this.flapCooldownTimer > 0) {
            this.flapCooldownTimer -= deltaTime / 1000;
            if (this.flapCooldownTimer < 0) {
                this.flapCooldownTimer = 0;
            }
        }

        if (keyIsDown(32) || mouseIsPressed) {
            this.flap();
        }

        this._rigidBody.update();

    }

    show() {
        fill(this._color);
        ellipse(this.transform._x, this.transform.y, 16, 16)
    }

}