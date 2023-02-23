export class TouchInput {

    _latestTouchX;
    _latestTouchY;
    _relativeLatestTouchX;
    _relativeLatestTouchY;
  
    constructor() {
        window.addEventListener("touchstart", (event) => this.handleTouch(event));
    }
  
    getLatestTouchPosition() {
      return { x: this._latestTouchX, y: this._latestTouchY };
    }

    getLatestTouchRelativePosition(){
        return { x: this._relativeLatestTouchX, y:this._relativeLatestTouchY }
    }

    handleTouch(event) {
        var touch = event.touches[0];
        var x = touch.clientX;
        var y = touch.clientY;
        this._latestTouchX = x;
        this._latestTouchY = y;
        this._relativeLatestTouchX = (this._latestTouchX / document.body.clientWidth);
        this._relativeLatestTouchY = (this._latestTouchY / document.body.clientHeight);
        console.log(this._relativeLatestTouchX, this._relativeLatestTouchY);
    }

  }