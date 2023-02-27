class Bird extends GameObject {

    _rigidBody;
    _flapStrength;

    constructor(x, y, mass, useGravity, flapStrength) {
        super(x, y);
        this._rigidBody = new RigidBody2D(mass, useGravity)

        this.velocity2D = createVector(0, 0);

        this.flapCooldown = .5;
        this.flapCooldownTimer = 0.0;

        this._flapStrength = flapStrength;

    }

    flap() {
        if (this.flapCooldownTimer == 0) {
            this.velocity2D.y -= this._flapStrength;
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

        if (this._rigidBody._useGravity) {
            this.velocity2D.y += this._rigidBody._mass * Physics.gravity;
        }

        this.transform.y += this.velocity2D.y;
        if (this.transform.y > height) {
            this.velocity2D.y = 0;
            this.transform.y = height;
        }
    }

    show() {
        fill(255, 255, 0);
        ellipse(this.transform._x, this.transform.y, 16, 16)
    }



}