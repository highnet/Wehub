class Box {

    _color;
    _body;
    _width;
    _height;
    _angle;

    constructor(color, x, y, w, h, isStatic, restitution, friction, angle) {
        this._color = color;
        this._body = Bodies.rectangle(
            x,
            y,
            w,
            h,
            {
                isStatic: isStatic,
                restitution: restitution,
                friction: friction,
                angle: angle
            });
        this._width = w;
        this._height = h;
        World.add(_world, this._body);
    }

    show() {
        var pos = this._body.position;
        var angle = this._body.angle;

        push();
        translate(pos.x, pos.y);
        rotate(angle);
        rectMode(CENTER);
        strokeWeight(1);
        stroke(255);
        fill(this._color);
        rect(0, 0, this._width, this._height);
        pop();

    }
}