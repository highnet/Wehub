import { Component } from "pagejs/components";
import ButtonGrid from "./buttonGrid";

export default class CalculatorComponent extends Component {
  
  calculatorAttributes = {
    "main-operands": {
      buttons: 12,
      columns: 3,
    },
    "main-operators":{
      buttons: 5,
      columns: 1,
    },
      
  }

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
              identifier: Object.keys(this.calculatorAttributes)[0],
              buttons: this.calculatorAttributes[Object.keys(this.calculatorAttributes)[0]].buttons,
              columns: this.calculatorAttributes[Object.keys(this.calculatorAttributes)[0]].columns,
            }}
          />
          <ButtonGrid
            props={{
              identifier: Object.keys(this.calculatorAttributes)[1],
              buttons: this.calculatorAttributes[Object.keys(this.calculatorAttributes)[1]].buttons,
              columns: this.calculatorAttributes[Object.keys(this.calculatorAttributes)[1]].columns,
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
    
    for(let i = 0; i < Object.keys(this.calculatorAttributes).length; i++){
      for (let j = 0; j < this.calculatorAttributes[Object.keys(this.calculatorAttributes)[i]].buttons; j++) {
              this.calculatorButtons.set((Object.keys(this.calculatorAttributes)[i] + "-" + j), (this.getElementById(Object.keys(this.calculatorAttributes)[i] + "-" + j))) ;
    }
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
      [["main-operands-11","calculator-labels"]]: "neg",
      //
      [["main-operators-0","identifier-labels"]]: "main-operators-0",
      [["main-operators-0","calculator-labels"]]: "÷",
      [["main-operators-1","identifier-labels"]]: "main-operators-1",
      [["main-operators-1","calculator-labels"]]: "x",
      [["main-operators-2","identifier-labels"]]: "main-operators-2",
      [["main-operators-2","calculator-labels"]]: "-",
      [["main-operators-3","identifier-labels"]]: "main-operators-3",
      [["main-operators-3","calculator-labels"]]: "+",
      [["main-operators-4","identifier-labels"]]: "main-operators-4",
      [["main-operators-4","calculator-labels"]]: "enter",
    }

    // cache debug dom components
    let debugToggleButtonLabelIdentifiers = this.getElementById("debug__toggle-button-label__identifier-labels");
    let debugToggleButtonLabelCalculatorLabels = this.getElementById("debug__toggle-button-label__calculator-labels");

    // Add event listeners for debug dom components TODO: CLEAN THIS UP
    debugToggleButtonLabelIdentifiers.addEventListener("change", (change) => {
      for (let i = 0; i < this.calculatorAttributes[Object.keys(this.calculatorAttributes)[0]].buttons; i++) {
        this.toggleButtonLabels((Object.keys(this.calculatorAttributes)[0] + "-" + i), change.target.value);
      }
      for (let i = 0; i < this.calculatorAttributes[Object.keys(this.calculatorAttributes)[1]].buttons; i++) {
        this.toggleButtonLabels((Object.keys(this.calculatorAttributes)[1] + "-" + i), change.target.value);
      }
    });

    debugToggleButtonLabelCalculatorLabels.addEventListener("change", (change) => {
      for (let i = 0; i < this.calculatorAttributes[Object.keys(this.calculatorAttributes)[0]].buttons; i++) {
        this.toggleButtonLabels((Object.keys(this.calculatorAttributes)[0] + "-" + i), change.target.value);
      }
      for (let i = 0; i < this.calculatorAttributes[Object.keys(this.calculatorAttributes)[1]].buttons; i++) {
        this.toggleButtonLabels((Object.keys(this.calculatorAttributes)[1] + "-" + i), change.target.value);
      }
    });

    // Synchronize button labels to default debug configuration
      for (let i = 0; i < this.calculatorAttributes[Object.keys(this.calculatorAttributes)[0]].buttons; i++) {
        this.toggleButtonLabels((Object.keys(this.calculatorAttributes)[0] + "-" + i), document.querySelector('input[name="debug__button-labels"]:checked').value);
      }

      for (let i = 0; i < this.calculatorAttributes[Object.keys(this.calculatorAttributes)[1]].buttons; i++) {
        this.toggleButtonLabels((Object.keys(this.calculatorAttributes)[1] + "-" + i), document.querySelector('input[name="debug__button-labels"]:checked').value);
      }
      
  }
  getElementById(id) {
    return this.component.querySelector(`[internalId=${id}]`);
  }
  toggleButtonLabels(buttonIdentifier, buttonLabelType) {
    this.calculatorButtons.get(buttonIdentifier).innerHTML = this.calculatorButtonLabels[[buttonIdentifier, buttonLabelType]]
  }
}
