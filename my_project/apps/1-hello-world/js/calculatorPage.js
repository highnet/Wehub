import { Page } from "pagejs/components";
import CalculatorComponent from "./calculatorComponent";

export default class CalculatorPage extends Page {
  render() {
    return (
      <div>
        <h1 id="title">WELCOME TO THE COOLÈST CALCULATOR</h1>
        <CalculatorComponent />
      </div>
    );
  }
  ready() {
    console.log(this.dom);
    this.dom["title"].style.color = "red";
  }
}
