class Box {
    _body;
    constructor(parent, xPos, yPos, width, height, fillStyle, strokeStyle, lineWidth, isStatic) {
        this._body = Bodies.rectangle(xPos, yPos, width, height, {
            isStatic: isStatic,
            render: {
                fillStyle: fillStyle,
                strokeStyle: strokeStyle,
                lineWidth: lineWidth,
            }
        });
        Composite.add(parent, [this._body]);
    }
}