import { Component } from "pagejs/components";
import ButtonGrid from "./buttonGrid";

export default class CalculatorComponent extends Component {
  render() {
    return (
      <div class="calculator-component">
        <div class="calculator-component__output">
          <div class="calculator-component__output__previous-operand">previous-operand</div>
          <div class="calculator-component__output__current-operand">current-operand</div>
        </div>
        <div class="calculator-component__buttons">
          <ButtonGrid
            props={{
              buttons: 32,
              columns: 4,
            }}
          />
        </div>
      </div>
    );
  }
  ready() {
    /*
    let btn = this.getElementById("btn-x");

    btn.addEventListener("click", function () {
      console.log("x");
    });
    */
    // this.dom["btn-x"].style.color = "red";
  }
  getElementById(id) {
    return this.component.querySelector(`[internalId=${id}]`);
  }
}
