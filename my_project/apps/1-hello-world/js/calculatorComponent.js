import { Component, Button } from "pagejs/components";

export default class CalculatorComponent extends Component {
  x() {
    console.log("x");
  }

  render() {
    return (
      <div>
        <h1 class="calculator-page__output-label">2+2=4</h1>
        <Button id="btn-x" onClick={() => this.x()}>
          X
        </Button>
      </div>
    );
  }
  ready() {
    console.log("TEST");
    let btn = this.getElementById("btn-x");

    btn.on("released", () => {
      this.x();
    });
  }
  getElementById(id) {
    return this.component.querySelector(`[internalId=${id}]`);
  }
}
