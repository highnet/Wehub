import { Component } from "pagejs/components";
import ButtonGrid from "./buttonGrid";
import ButtonAttributes from "../calculator-button-attributes.json"
import ButtonLabels from "../calculator-button-labels.json";

export default class CalculatorComponent extends Component {

  buttons = new Map();
  buttonAtributes = ButtonAttributes;
  buttonLabels = ButtonLabels;

  previousOperation;
  previousOperand;
  currentOperator;
  currentOperand;

  debugPreviousOperation;
  debugPreviousOperand;
  debugCurrentOperator;
  debugCurrentOperand;
  
  render() {
    return (
      <div class="calculator-component">
        <div class="calculator-component__output">
          <textarea
          readonly = ""
          id = "calculator-component__output-previous-operation"
          ></textarea>
          <textarea 
          readonly="" 
          id="calculator-component__output__previous-operand" 
          ></textarea>
          <textarea
          readonly = "" 
          id="calculator-component__output__current-operator" 
          ></textarea>
          <textarea 
          // readonly = ""
          id="calculator-component__output__current-operand" 
          ></textarea>
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
          <ButtonGrid
            props={{
              identifier: Object.keys(this.buttonAtributes)[2],
              buttons: this.buttonAtributes[Object.keys(this.buttonAtributes)[2]].buttons,
              columns: this.buttonAtributes[Object.keys(this.buttonAtributes)[2]].columns,
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
             checked="checked"
            ></input>
            <label for="debug__toggle-button-label__calculator-labels">Calculator Labels</label>
            <input 
            type="radio" 
            name="debug__button-labels" 
            id="debug__toggle-button-label__emoji-labels" 
            value="emoji-labels" 
            // checked="checked"
            ></input>
            <label for="debug__toggle-button-label__emoji-labels">Emoji Labels</label>
          </fieldset>
          <fieldset>
            <h3>Calculator State</h3>
            <label for="debug__calculator-state__previous-operation">previous-operation:</label>
            <div id="debug__calculator-state__previous-operation">∅</div>
            <label for="debug__calculator-state__previous-operand">previous-operand:</label>
            <div id="debug__calculator-state__previous-operand">∅</div>
            <label for="debug__calculator-state__current-operator">current-operator:</label>
            <div id="debug__calculator-state__current-operator">∅</div>
            <label for="debug__calculator-state__current-operand">current-operand:</label>
            <div id="debug__calculator-state__current-operand">∅</div>
          </fieldset>

        </div>
      </div>
    );
  }

  ready() {
    this.cacheButtons();  // cache all input buttons in the inputButtons map
    this.initButtonLabels(); // initialize button labels with default values
    this.addButtonEventListeners();

    this.previousOperation = this.getElementById("calculator-component__output-previous-operation");
    this.previousOperand = this.getElementById("calculator-component__output__previous-operand");
    this.currentOperator = this.getElementById("calculator-component__output__current-operator");
    this.currentOperand = this.getElementById("calculator-component__output__current-operand");
    
    this.debugPreviousOperation= this.getElementById("debug__calculator-state__previous-operation");
    this.debugPreviousOperand= this.getElementById("debug__calculator-state__previous-operand");
    this.debugCurrentOperator= this.getElementById("debug__calculator-state__current-operator");
    this.debugCurrentOperand = this.getElementById("debug__calculator-state__current-operand");
    
    this.addDebugEventListeners();  // Add event listeners for debug components

  }

  addButtonEventListeners(){
    let btns = this.getButtons();
    for(let btn of btns){
     btn.on('released', () => {
      console.log(btn.textContent);
      this.handleInput(btn.textContent);
     })
    }
  }

  allClear(){
      console.log("ALL CLEAR");
      this.previousOperation.textContent = "";
      this.previousOperand.textContent = "";
      this.currentOperator.textContent = "";
      this.currentOperand.textContent = "";
  }

  handleInput(input){

    const backspaceRegex = new RegExp("^←$");
    if (backspaceRegex.test(input) && this.currentOperand.textContent != ""){
      this.currentOperand.textContent = this.currentOperand.textContent.substring(0,this.currentOperand.textContent.length-1);
      return;
    }

    const allClearRegex = new RegExp("^AC$");
    if (allClearRegex.test(input) && this.currentOperator.textContent != "" && this.currentOperand.textContent != ""){
      this.currentOperand.textContent = "";
      return;
    }

    if (allClearRegex.test(input)){
      this.allClear();
      return;
    }

    const clearRegex = new RegExp("^C$");
    if (clearRegex.test(input) && this.currentOperator.textContent != ""){
      this.allClear();
      return;
    }

    if (clearRegex.test(input)){
      this.currentOperand.textContent = "";
      return;
    }


    const digitRegex = new RegExp("^[0-9]$");
    
    if (digitRegex.test(input) && this.currentOperand.textContent != "" && this.previousOperation.textContent != "" && this.currentOperator.textContent == "" && this.previousOperand.textContent == ""){
      this.allClear();
      this.handleInput(input);
      return;
    }
    
  
    if (digitRegex.test(input)){
      this.currentOperand.textContent += input;
      return;
    }
    
    const operatorRegex = new RegExp("^[÷|x|\\-|\\+]$");

    if (operatorRegex.test(input) && this.currentOperand.textContent != "" && this.previousOperand.textContent == ""){
      this.currentOperator.textContent = input;
      this.previousOperand.textContent = this.currentOperand.textContent;
      this.currentOperand.textContent = "";
      return;
    }

    const equalsRegex = new RegExp("^=$");
    const divisionRegex = new RegExp("^÷$");
    const multiplicationRegex = new RegExp("^x$");
    const subtractionRegex = new RegExp("^\\-$");
    const additionRegex = new RegExp("^\\+$");    
    
    if (equalsRegex.test(input) && this.previousOperand.textContent != "" && this.currentOperator.textContent != "" && this.currentOperand.textContent != ""){
      const leftHandSide = parseInt(this.previousOperand.textContent);
      const rightHandSide = parseInt(this.currentOperand.textContent);
      let result = NaN;
      if (divisionRegex.test(this.currentOperator.textContent)){
        console.log(leftHandSide / rightHandSide);
        result = leftHandSide / rightHandSide;
      } else if (multiplicationRegex.test(this.currentOperator.textContent)){
        console.log(leftHandSide * rightHandSide);
        result = leftHandSide * rightHandSide;
      } else if (subtractionRegex.test(this.currentOperator.textContent)){
        console.log(leftHandSide - rightHandSide);
        result = leftHandSide - rightHandSide;
      } else if (additionRegex.test(this.currentOperator.textContent)){
        console.log(leftHandSide + rightHandSide);
        result = leftHandSide + rightHandSide;
      }

      this.previousOperation.textContent = leftHandSide.toString().concat(this.currentOperator.textContent).concat(rightHandSide.toString());
      this.previousOperand.textContent = "";
      this.currentOperator.textContent = "";
      this.currentOperand.textContent = result;
      return;
    }
  }

  addDebugEventListeners(){
    // Add event listeners for debug components

    // button labels -> identifier labels
    this.getElementById("debug__toggle-button-label__identifier-labels").addEventListener("change", (change) => {
      let btns = this.getButtons();
      for(let btn of btns){
        this.toggleButtonLabels(btn.attributes.internalid.nodeValue, change.target.value);
      }
    });

    // button labels -> calculator labels
    this.getElementById("debug__toggle-button-label__calculator-labels").addEventListener("change", (change) => {
      let btns = this.getButtons();
      for(let btn of btns){
        this.toggleButtonLabels(btn.attributes.internalid.nodeValue, change.target.value);
      }
    });

    // button labels -> emoji labels
    this.getElementById("debug__toggle-button-label__emoji-labels").addEventListener("change", (change) => {
      let btns = this.getButtons();
      for(let btn of btns){
        this.toggleButtonLabels(btn.attributes.internalid.nodeValue, change.target.value);
      }
    });

    const mutationOptions = {attributes: true, childList: true, subtree: true};
    // calculator state -> previous-operation
    const previousOperationObserver = new MutationObserver(this.updateDebugCalculatorStates);
    previousOperationObserver.observe(this.previousOperation, mutationOptions);

    // calculator state -> previous-operand
    const currentOperandObserver = new MutationObserver(this.updateDebugCalculatorStates);
    currentOperandObserver.observe(this.currentOperand, mutationOptions);

    // calculator state -> current-operator
    const currentOperatorObserver = new MutationObserver(this.updateDebugCalculatorStates);
    currentOperatorObserver.observe(this.currentOperator, mutationOptions);

    // calculator state -> current-operand
    const previousOperandObserver = new MutationObserver(this.updateDebugCalculatorStates);
    previousOperandObserver.observe(this.previousOperand, mutationOptions);
  }

   updateDebugCalculatorStates = () => {
    this.debugPreviousOperation.textContent = this.previousOperation.textContent;
    if (this.debugPreviousOperation.textContent == ""){
      this.debugPreviousOperation.textContent = "∅";
    }

    this.debugCurrentOperand.textContent = this.currentOperand.textContent;
      if (this.debugCurrentOperand.textContent == ""){
        this.debugCurrentOperand.textContent = "∅";
    }

    this.debugCurrentOperator.textContent = this.currentOperator.textContent;
      if (this.debugCurrentOperator.textContent == ""){
        this.debugCurrentOperator.textContent = "∅";
    }
    this.debugPreviousOperand.textContent = this.previousOperand.textContent;
      if (this.debugPreviousOperand.textContent == ""){
        this.debugPreviousOperand.textContent = "∅";
    }

  }

  getElementById(id) {
    return this.component.querySelector(`[internalId=${id}]`);
  }

  initButtonLabels(){
    // initialize button labels with default values
    let btns = this.getButtons();
    for(let btn of btns){
      this.toggleButtonLabels(btn.attributes.internalid.nodeValue,document.querySelector('input[name="debug__button-labels"]:checked').value);
    }
  }

  cacheButtons(){
    // cache all dynamically generated buttons from buttongrids into the buttons map
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

  toggleButtonLabels(buttonIdentifier, buttonLabelType) {
    this.buttons.get(buttonIdentifier).innerHTML = this.buttonLabels[[buttonIdentifier, buttonLabelType]]
  }
}
