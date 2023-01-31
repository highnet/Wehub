import { Component } from "pagejs/components";
import ButtonGrid from "./buttonGrid";

export default class CalculatorComponent extends Component {
  calculatorAttributes = {
    MAIN_OPERANDS_BUTTON_GRID_BUTTONS: 12,
    MAIN_OPERANDS_BUTTON_GRIS_COLUMNS: 3,
  };

  calculatorButtons = new Map();
  calculatorButtonLabels = [];

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
            //  checked="checked"
            ></input>
            <label for="debug__toggle-button-label__identifier-labels">Identifier Labels</label>
            <input 
            type="radio" 
            name="debug__button-labels" 
            id="debug__toggle-button-label__calculator-labels" 
            value="calculator-labels" 
            checked="checked"
            ></input>
            <label for="debug__toggle-button-label__calculator-labels">Calculator Labels</label>
          </fieldset>
        </div>
      </div>
    );
  }

  ready() {

    for (let i = 0; i < this.calculatorAttributes.MAIN_OPERANDS_BUTTON_GRID_BUTTONS; i++) {
      this.calculatorButtons.set(("main-operands-" + i), (this.getElementById("main-operands-" + i))) ;
    }

    // define calculator button labels for all supported calculated button label types
    this.calculatorButtonLabels = {
      [["main-operands-0","identifier-labels"]]: "main-operands-0",
      [["main-operands-0","calculator-labels"]]: 7,
      [["main-operands-1","identifier-labels"]]: "main-operands-1",
      [["main-operands-1","calculator-labels"]]: 8,
      [["main-operands-2","identifier-labels"]]: "main-operands-2",
      [["main-operands-2","calculator-labels"]]: 9,
      [["main-operands-3","identifier-labels"]]: "main-operands-3",
      [["main-operands-3","calculator-labels"]]: 4,
      [["main-operands-4","identifier-labels"]]: "main-operands-4",
      [["main-operands-4","calculator-labels"]]: 5,
      [["main-operands-5","identifier-labels"]]: "main-operands-5",
      [["main-operands-5","calculator-labels"]]: 6,
      [["main-operands-6","identifier-labels"]]: "main-operands-6",
      [["main-operands-6","calculator-labels"]]: 1,
      [["main-operands-7","identifier-labels"]]: "main-operands-7",
      [["main-operands-7","calculator-labels"]]: 2,
      [["main-operands-8","identifier-labels"]]: "main-operands-8",
      [["main-operands-8","calculator-labels"]]: 3,
      [["main-operands-9","identifier-labels"]]: "main-operands-9",
      [["main-operands-9","calculator-labels"]]: 0,
      [["main-operands-10","identifier-labels"]]: "main-operands-10",
      [["main-operands-10","calculator-labels"]]: ".",
      [["main-operands-11","identifier-labels"]]: "main-operands-11",
      [["main-operands-11","calculator-labels"]]: "-",
    }

    // cache debug dom components
    let debugToggleButtonLabelIdentifiers = this.getElementById("debug__toggle-button-label__identifier-labels");
    let debugToggleButtonLabelCalculatorLabels = this.getElementById("debug__toggle-button-label__calculator-labels");

    // Add event listeners for debug dom components
    debugToggleButtonLabelIdentifiers.addEventListener("change", (change) => {
      for (let i = 0; i < this.calculatorAttributes.MAIN_OPERANDS_BUTTON_GRID_BUTTONS; i++) {
        this.toggleButtonLabels(("main-operands-" + i), change.target.value);
      }
    });

    debugToggleButtonLabelCalculatorLabels.addEventListener("change", (change) => {
      for (let i = 0; i < this.calculatorAttributes.MAIN_OPERANDS_BUTTON_GRID_BUTTONS; i++) {
        this.toggleButtonLabels(("main-operands-" + i), change.target.value);
      }
    });

    // Synchronize button labels to default debug configuration
      for (let i = 0; i < this.calculatorAttributes.MAIN_OPERANDS_BUTTON_GRID_BUTTONS; i++) {
        this.toggleButtonLabels(("main-operands-" + i), document.querySelector('input[name="debug__button-labels"]:checked').value);
      }
      
  }
  getElementById(id) {
    return this.component.querySelector(`[internalId=${id}]`);
  }
  toggleButtonLabels(buttonIdentifier, buttonLabelType) {
    this.calculatorButtons.get(buttonIdentifier).innerHTML = this.calculatorButtonLabels[[buttonIdentifier, buttonLabelType]]
  }
}
