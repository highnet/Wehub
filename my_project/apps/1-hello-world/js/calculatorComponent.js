import { Component } from "pagejs/components";
import ButtonGrid from "./buttonGrid";
import ButtonAttributes from "../calculator-button-attributes.json"
import ButtonLabels from "../calculator-button-labels.json";

export default class CalculatorComponent extends Component {

  buttons = new Map();
  buttonAtributes = ButtonAttributes;
  buttonLabels = ButtonLabels;

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
              identifier: Object.keys(this.buttonAtributes)[0],
              buttons: this.buttonAtributes[Object.keys(this.buttonAtributes)[0]].buttons,
              columns: this.buttonAtributes[Object.keys(this.buttonAtributes)[0]].columns,
            }}
          />
          <ButtonGrid
            props={{
              identifier: Object.keys(this.buttonAtributes)[1],
              buttons: this.buttonAtributes[Object.keys(this.buttonAtributes)[1]].buttons,
              columns: this.buttonAtributes[Object.keys(this.buttonAtributes)[1]].columns,
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
            // checked="checked"
            ></input>
            <label for="debug__toggle-button-label__identifier-labels">Identifier Labels</label>
            <input 
            type="radio" 
            name="debug__button-labels" 
            id="debug__toggle-button-label__calculator-labels" 
            value="calculator-labels" 
            // checked="checked"
            ></input>
            <label for="debug__toggle-button-label__calculator-labels">Calculator Labels</label>
            <input 
            type="radio" 
            name="debug__button-labels" 
            id="debug__toggle-button-label__emoji-labels" 
            value="emoji-labels" 
            checked="checked"
            ></input>
            <label for="debug__toggle-button-label__emoji-labels">Emoji Labels</label>
          </fieldset>
        </div>
      </div>
    );
  }

  

  ready() {
    this.cacheButtons();  // cache all input buttons in the inputButtons map
    this.initButtonLabels(); // initialize button labels with default values
    this.addDebugEventListeners();  // Add event listeners for debug components
    
    console.log(this.buttonAtributes[Object.keys(this.buttonAtributes)[0]].buttons);

  }

  addDebugEventListeners(){
    // Add event listeners for debug components

    // button labels -> identifier labels
    this.getElementById("debug__toggle-button-label__identifier-labels").addEventListener("change", (change) => {
      let bgButtons = this.getButtons();
      for(let bgBtn of bgButtons){
        this.toggleButtonLabels(bgBtn.attributes.internalid.nodeValue, change.target.value);
      }
    });

    // button labels -> calculator labels
    this.getElementById("debug__toggle-button-label__calculator-labels").addEventListener("change", (change) => {
      let bgButtons = this.getButtons();
      for(let bgBtn of bgButtons){
        this.toggleButtonLabels(bgBtn.attributes.internalid.nodeValue, change.target.value);
      }
    });

    // button labels -> emoji labels
    this.getElementById("debug__toggle-button-label__emoji-labels").addEventListener("change", (change) => {
      let bgButtons = this.getButtons();
      for(let bgBtn of bgButtons){
        this.toggleButtonLabels(bgBtn.attributes.internalid.nodeValue, change.target.value);
      }
    });
  }

  initButtonLabels(){
    // initialize button labels with default values
    let bgButtons = this.getButtons();
    for(let bgBtn of bgButtons){
      this.toggleButtonLabels(bgBtn.attributes.internalid.nodeValue,document.querySelector('input[name="debug__button-labels"]:checked').value);
    }
  }

  cacheButtons(){
    // cache all dynamically from button grids input buttons in the inputButtons map
    for(let i = 0; i < Object.keys(this.buttonAtributes).length; i++){
      for (let j = 0; j < this.buttonAtributes[Object.keys(this.buttonAtributes)[i]].buttons; j++) {
              this.buttons.set((Object.keys(this.buttonAtributes)[i] + "-" + j), (this.getElementById(Object.keys(this.buttonAtributes)[i] + "-" + j))) ;
      }
    }
  }

  getButtons(){
    // returns buttons in an array
    return this.buttons.values();
  }

  getElementById(id) {
    return this.component.querySelector(`[internalId=${id}]`);
  }

  toggleButtonLabels(buttonIdentifier, buttonLabelType) {
    this.buttons.get(buttonIdentifier).innerHTML = this.buttonLabels[[buttonIdentifier, buttonLabelType]]
  }
}
