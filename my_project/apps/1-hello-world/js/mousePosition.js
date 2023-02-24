// Define a class called MousePosition
export class MousePosition {
  // Declare public fields to store mouse x and y positions
  _mouseX = 0;
  _mouseY = 0;
  _relativeMouseX = 0;
  _relativeMouseY = 0;

  // Define a constructor that attaches a mousemove event handler to the window
  constructor() {
    window.addEventListener("mousemove", this.handleMouseMove);
  }

  // Define a method that updates the mouse positions from the event object
  handleMouseMove = (event) => {
    this._mouseX = event.pageX;
    this._mouseY = event.pageY;
    this._relativeMouseX = (this._mouseX / document.body.clientWidth);
    this._relativeMouseY = (this._mouseY / document.body.clientHeight);
  };

  // Define a public method that returns an object with mouse x and y positions
  getMousePosition() {
    return { x: this._mouseX, y: this._mouseY };
  }

  getRelativeMousePosition() {
    return { x: this._relativeMouseX, y: this._relativeMouseY };
  }
}