class Bird extends GameObject {

    _rigidBody;
    _flapStrength;

    constructor(x, y, mass, useGravity, flapStrength) {
        super(x, y);
        this._rigidBody = new RigidBody2D(this.transform, mass, useGravity);

        this.flapCooldown = .5;
        this.flapCooldownTimer = 0.0;

        this._flapStrength = flapStrength;

    }

    flap() {
        if (this.flapCooldownTimer == 0) {
            this._rigidBody.velocity2D = createVector(0, this._rigidBody.velocity2D.y - this._flapStrength);
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

        if (keyIsDown(32)) {
            this.flap();
        }

        this._rigidBody.update();

    }

    show() {
        fill(255, 255, 0);
        ellipse(this.transform._x, this.transform.y, 16, 16)
    }

}