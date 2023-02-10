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
  DoHardResetStateFlag;
  
  render() {
    return (
      <div class="calculator-component">
        <div class="calculator-component__outputs">
          <textarea
            class="calculator-component__output calculator-component__output__previous-operation"
            readonly = ""
            id = "calculator-component__output__previous-operation"
          ></textarea>
          <div class="flex">
            <textarea
              class="calculator-component__output calculator-component__output__previous-operand"
              readonly="" 
              id="calculator-component__output__previous-operand" 
            ></textarea>
            <textarea
              class="calculator-component__output calculator-component__output__current-operator"
              readonly = "" 
              id="calculator-component__output__current-operator" 
            ></textarea>
          </div>
          
          <textarea 
            class="calculator-component__output calculator-component__output__current-operand"
            readonly = ""
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
    this.addButtonEventListeners(); // add button event listeners
    this.cacheOutputElements(); // cache output elements
    this.cacheDebugElements(); // cache debug elements
    this.addDebugEventListeners();  // Add event listeners for debug components
    this.DoHardResetStateFlag = false; // set reset state to false
    
    
    this.handleInput(0);
    this.handleInput(1);
    this.handleInput(2);
    this.handleInput('+');
    this.handleInput(1);
    this.handleInput(2);
    this.handleInput('=');

  }
  
  // cache debug elements
  cacheDebugElements(){
    this.debugPreviousOperation= this.getElementById("debug__calculator-state__previous-operation");
    this.debugPreviousOperand= this.getElementById("debug__calculator-state__previous-operand");
    this.debugCurrentOperator= this.getElementById("debug__calculator-state__current-operator");
    this.debugCurrentOperand = this.getElementById("debug__calculator-state__current-operand");
  }

  // cache output elements
  cacheOutputElements(){
    this.previousOperation = this.getElementById("calculator-component__output__previous-operation");
    this.previousOperand = this.getElementById("calculator-component__output__previous-operand");
    this.currentOperator = this.getElementById("calculator-component__output__current-operator");
    this.currentOperand = this.getElementById("calculator-component__output__current-operand");
  }

 // add button event listeners
  addButtonEventListeners(){
    let btns = this.getButtons();
    for(let btn of btns){
      btn.on('released', () => {
        console.log(btn.textContent);
        this.handleInput(btn.textContent);
      })
    }
  }

  // clear the calculator
  allClear(){
    this.previousOperation.textContent = "";
    this.previousOperand.textContent = "";
    this.currentOperator.textContent = "";
    this.currentOperand.textContent = "";
  }

  reset(){
    this.allClear();
    this.DoHardResetStateFlag = false;
  }
  
  isDoHardResetStateFlagRaised(){
    return this.DoHardResetStateFlag;
  }

  isPreviousOperandEmpty(){
    return this.isOutputFieldEmpty(this.previousOperand);
  }

  isCurrentOperandEmpty(){
    return this.isOutputFieldEmpty(this.currentOperand);
  }

  isPreviousOperationEmpty(){
    return this.isOutputFieldEmpty(this.previousOperation);
  }

  isCurrentOperandZero(){
    return this.doesOutputFieldMatch(this.currentOperand, "0");
  }

  isCurrentOperandNegative(){
    return this.isOutputFieldNegative(this.currentOperand);
  }

  isOutputFieldEmpty(outputField){
    return this.doesOutputFieldMatch(outputField, "");
  }

  doesCurrentOperandHaveFloatingPoint(){
    return this.doesOutputFieldHaveFloatingPoint(this.currentOperand);
  }

  doesOutputFieldMatch(outputField, match){
    return outputField.textContent == match;
  }

  isOutputFieldNegative(outputField){
    return outputField.textContent.includes("-");
  }

  doesOutputFieldHaveFloatingPoint(outputField){
    return outputField.textContent.includes(".");
  }

  doesCurrentOperandHaveNonTrailingFloatingPoint(){
    return  this.doesOutputFieldHaveNonTrailingFloatingPoint(this.currentOperand);

  }

  doesOutputFieldHaveNonTrailingFloatingPoint(outputField){
    return outputField.textContent.charAt(outputField.textContent.length-1) == ".";
  }


  // TODO: MIGRATE THIS TO AN EVENT SYSTEM

  // handle input
  handleInput(input){
    // define regex patterns
    const zeroRegex = new RegExp("^0$");
    const backspaceRegex = new RegExp("^←$");
    const allClearRegex = new RegExp("^AC$");
    const clearRegex = new RegExp("^C$");
    const digitRegex = new RegExp("^[0-9]$");
    const operatorRegex = new RegExp("^[÷|x|\\-|\\+]$");
    const equalsRegex = new RegExp("^=$");
    const divisionRegex = new RegExp("^÷$");
    const multiplicationRegex = new RegExp("^x$");
    const subtractionRegex = new RegExp("^\\-$");
    const additionRegex = new RegExp("^\\+$");
    const pointRegex = new RegExp("^\\.$");
    const negationRegex = new RegExp("^\\(-\\)$");

    const doHardResetStateFlagIsRaised = this.isDoHardResetStateFlagRaised();
    const currentOperandIsZero = this.isCurrentOperandZero();
    const currentOperandIsEmpty = this.isCurrentOperandEmpty();
    const previousOperandIsEmpty = this.isPreviousOperandEmpty();
    const previousOperationIsEmpty = this.isPreviousOperationEmpty();
    const currentOperandIsNegative = this.isCurrentOperandNegative();
    const currentOperandDoesHaveNonTrailingFloatingPoint = this.doesCurrentOperandHaveNonTrailingFloatingPoint();

    if (doHardResetStateFlagIsRaised){
      this.reset();
      this.handleInput(input);
    } else if (zeroRegex.test(input) && currentOperandIsZero){
      return
    } else if (negationRegex.test(input) && currentOperandIsEmpty){
      this.handleInput(0);
      this.handleInput("(-)");
    } else if (negationRegex.test(input) && previousOperandIsEmpty && !previousOperationIsEmpty){
       this.allClear();
    } else if (negationRegex.test(input) && currentOperandIsNegative){
      this.currentOperand.textContent =  this.currentOperand.textContent.replace("-", '');
    } else if (negationRegex.test(input) && !currentOperandIsEmpty && !currentOperandIsNegative){
      this.currentOperand.textContent = "-" + this.currentOperand.textContent;
    } else if (pointRegex.test(input) && !previousOperationIsEmpty){
      this.allClear();
      this.handleInput(input);
    } else if (pointRegex.test(input) && currentOperandDoesHaveNonTrailingFloatingPoint){
      this.currentOperand.textContent = this.currentOperand.textContent.replace(".", '');
    } else if (pointRegex.test(input) && currentOperandIsEmpty){
      this.handleInput(0);
      this.handleInput(input);
    } else if (pointRegex.test(input) && !currentOperandDoesHaveNonTrailingFloatingPoint){
      this.currentOperand.textContent += ".";
    } else if (pointRegex.test(input) && !previousOperationIsEmpty){
      this.allClear();
      this.handleInput(input);
    } else if (backspaceRegex.test(input) && !previousOperationIsEmpty){
      this.allClear();
    } else if (backspaceRegex.test(input) && !currentOperandIsEmpty){
      this.currentOperand.textContent = this.currentOperand.textContent.substring(0,this.currentOperand.textContent.length-1);
    } else if (allClearRegex.test(input) && !previousOperandIsEmpty && !currentOperandIsEmpty){
      this.currentOperand.textContent = "";
    } else if (allClearRegex.test(input)){
      this.allClear();
    } else if (clearRegex.test(input) && previousOperationIsEmpty){
      this.currentOperand.textContent = "";
    } else if (clearRegex.test(input) && !previousOperationIsEmpty){
      this.allClear();
    } else if (digitRegex.test(input) && !currentOperandIsEmpty && !previousOperationIsEmpty && previousOperandIsEmpty){
      this.allClear();
      this.handleInput(input);
    } else if (digitRegex.test(input)){
      if (this.currentOperand.textContent == "0"){
        this.currentOperand.textContent = input;
      } else {
      this.currentOperand.textContent += input;
      }
    } else if (operatorRegex.test(input) && !currentOperandIsEmpty && !previousOperandIsEmpty){
      this.handleInput("=");
      this.handleInput(input);
    } else if (operatorRegex.test(input) && !currentOperandIsEmpty && previousOperandIsEmpty){
      if (
        this.currentOperand.textContent == "0." ||
        this.currentOperand.textContent == "-0." || 
        this.currentOperand.textContent == "-0"
        )
        {
          this.currentOperand.textContent = "0";
        }
      this.currentOperator.textContent = input;
      this.previousOperand.textContent = this.currentOperand.textContent;
      this.currentOperand.textContent = "";
    } else if (equalsRegex.test(input)){
      if (this.previousOperand.textContent == "" && this.currentOperand.textContent == "") return;
      
      if (
        this.currentOperand.textContent == "0." ||
        this.currentOperand.textContent == "-0." || 
        this.currentOperand.textContent == "-0")
        {
          this.currentOperand.textContent = "0";
        }

      let leftHandSide = undefined;
      let rightHandSide = undefined;
      if (this.previousOperand.textContent != ""){
       leftHandSide = parseFloat(this.previousOperand.textContent);
      }
      if (!this.isCurrentOperandEmpty()){
       rightHandSide = parseFloat(this.currentOperand.textContent);
      }
      
      console.log(leftHandSide, this.currentOperator.textContent, rightHandSide);

      
      if (rightHandSide != undefined && Math.sign(rightHandSide) == -1 && this.currentOperator.textContent == "-"){
        this.currentOperator.textContent = "+";
        rightHandSide *= -1;
      }

      if (leftHandSide == undefined && this.previousOperation.textContent != ""){

        if (this.previousOperation.textContent.includes("x")){
          leftHandSide = parseFloat(this.currentOperand.textContent);
          rightHandSide = parseFloat(this.previousOperation.textContent.split("x")[1]);
          this.currentOperator.textContent = "x";
        }

        else if (this.previousOperation.textContent.includes("+")){
          leftHandSide = parseFloat(this.currentOperand.textContent);
          rightHandSide = parseFloat(this.previousOperation.textContent.split("+")[1]);
          this.currentOperator.textContent = "+";
        }

        else if (this.previousOperation.textContent.includes("÷")){
          leftHandSide = parseFloat(this.currentOperand.textContent);
          rightHandSide = parseFloat(this.previousOperation.textContent.split("÷")[1]);
          this.currentOperator.textContent = "÷";
        }

        else if (this.previousOperation.textContent.includes("-")){
          leftHandSide = parseFloat(this.currentOperand.textContent);
          const splitted = this.previousOperation.textContent.split("-");
          if (splitted.length == 2){
            rightHandSide = parseFloat(splitted[1]);
          } else if (splitted.length == 3){
            rightHandSide = parseFloat(splitted[2]);
          }
          this.currentOperator.textContent = "-";
        }

      }
        console.log(leftHandSide, this.currentOperator.textContent, rightHandSide);

      if (leftHandSide == undefined  || leftHandSide == NaN || rightHandSide == undefined || rightHandSide == NaN) return;
      if (this.currentOperator.textContent == "") return;
      if (this.currentOperator.textContent == "÷" && rightHandSide == 0) {
        this.currentOperand.textContent = "Error: Cannot Divide by Zero."
        this.DoHardResetStateFlag = true;
        return;
      }
      let result = NaN;
      if (divisionRegex.test(this.currentOperator.textContent)){
        result = leftHandSide / rightHandSide;
      } else if (multiplicationRegex.test(this.currentOperator.textContent)){
        result = leftHandSide * rightHandSide;
      } else if (subtractionRegex.test(this.currentOperator.textContent)){
        result = leftHandSide - rightHandSide;
      } else if (additionRegex.test(this.currentOperator.textContent)){
        result = leftHandSide + rightHandSide;
      }

      console.log(result);
      if (result.toString().includes("e")){
        if (result > 0){
          this.currentOperand.textContent = "Error: Overflow"
        } 
        this.DoHardResetStateFlag = true;
        return;
      }

      if (result != NaN){
        this.previousOperation.textContent = leftHandSide.toString().concat(this.currentOperator.textContent).concat(rightHandSide.toString());
        this.previousOperand.textContent = "";
        this.currentOperator.textContent = "";
        this.currentOperand.textContent = result;
      }
    }

  }

  // add debug event listeners
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

  // update debug calculator states
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

  // get an element by id
  getElementById(id) {
    return this.component.querySelector(`[internalId=${id}]`);
  }

  // initialize button labels
  initButtonLabels(){
    // initialize button labels with default values
    let btns = this.getButtons();
    for(let btn of btns){
      this.toggleButtonLabels(btn.attributes.internalid.nodeValue,document.querySelector('input[name="debug__button-labels"]:checked').value);
    }
  }

  // cache buttons
  cacheButtons(){
    // cache all dynamically generated buttons from buttongrids into the buttons map
    for(let i = 0; i < Object.keys(this.buttonAtributes).length; i++){
      for (let j = 0; j < this.buttonAtributes[Object.keys(this.buttonAtributes)[i]].buttons; j++) {
        this.buttons.set((Object.keys(this.buttonAtributes)[i] + "-" + j), (this.getElementById(Object.keys(this.buttonAtributes)[i] + "-" + j))) ;
      }
    }
  }

  // get buttons
  getButtons(){
    // returns buttons in an array
    return this.buttons.values();
  }

  //toggle button labels
  toggleButtonLabels(buttonIdentifier, buttonLabelType) {
    this.buttons.get(buttonIdentifier).innerHTML = this.buttonLabels[[buttonIdentifier, buttonLabelType]]
  }

}