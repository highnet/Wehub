import { Component } from "pagejs/components";

export default class CalculatorComponent extends Component {
  x = () => {
    console.log(x);
  };

  render() {
    return (
      <div>
        <h1 class="calculator-page__output-label">2+2=4</h1>
        <button globalid="btn-x" onClick={() => this.x()}>
          X
        </button>
      </div>
    );
  }
  ready() {
    this.dom["btn-x"].style.color = "red";
  }
}
