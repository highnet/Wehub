import { Component } from "pagejs/components";
import ButtonGrid from "./buttonGrid";

export default class CalculatorComponent extends Component {
  calculatorAttributes = {
    MAIN_OPERANDS_BUTTON_GRID_BUTTONS: 12,
    MAIN_OPERANDS_BUTTON_GRIS_COLUMNS: 3,
  };

  calculatorButtons = new Map();

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
              identifier: "main-operands",
              buttons: this.calculatorAttributes.MAIN_OPERANDS_BUTTON_GRID_BUTTONS,
              columns: this.calculatorAttributes.MAIN_OPERANDS_BUTTON_GRIS_COLUMNS,
            }}
          />
          <ButtonGrid
            props={{
              identifier: "main-operators",
              buttons: 5,
              columns: 1,
            }}
          />
        </div>
        <div class="debug">
          <h2>DEBUG</h2>
          <fieldset>
            <h3>Button Labels</h3>
            <input
              type="radio"
              name="debug__button-labels"
              id="debug__toggle-button-label__identifier-labels"
              value="identifier-labels"
              checked="checked"
            ></input>
            <label for="button-identifiers-on">Identifier Labels</label>
            <input type="radio" name="debug__button-labels" id="debug__toggle-button-label__calculator-labels" value="calculator-labels"></input>
            <label for="button-identifiers-off">Calculator Labels</label>
          </fieldset>
        </div>
      </div>
    );
  }

  ready() {
    for (let i = 0; i < this.calculatorAttributes.MAIN_OPERANDS_BUTTON_GRID_BUTTONS; i++) {
      // console.log(this.getElementById("main-operands-" + i));
    }
    this.calculatorButtons.set("main-operands-0", this.getElementById("main-operands-0"));
    let debugToggleButtonLabelIdentifiers = this.getElementById("debug__toggle-button-label__identifier-labels");
    let debugToggleButtonLabelCalculatorLabels = this.getElementById("debug__toggle-button-label__calculator-labels");

    debugToggleButtonLabelIdentifiers.addEventListener("change", (change) => {
      this.toggleButtonLabels(change.target.value);
    });

    debugToggleButtonLabelCalculatorLabels.addEventListener("change", (change) => {
      this.toggleButtonLabels(change.target.value);
    });
  }
  getElementById(id) {
    return this.component.querySelector(`[internalId=${id}]`);
  }
  toggleButtonLabels(buttonLabelType) {
    console.log(buttonLabelType);
    switch (buttonLabelType) {
      case "identifier-labels":
        this.calculatorButtons.get("main-operands-0").innerHTML = "main-operands-0";
        break;
      case "calculator-labels":
        this.calculatorButtons.get("main-operands-0").innerHTML = "7";
        break;
    }
  }
}
