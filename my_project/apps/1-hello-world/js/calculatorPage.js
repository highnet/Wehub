import { Page } from "pagejs/components";
import CalculatorComponent from "./calculatorComponent";

export default class CalculatorPage extends Page {
  render() {
    return (
      <div>
        <h1 id="title" class="calculator-page__title">
          Wehub Calculator
        </h1>
        <CalculatorComponent />
      </div>
    );
  }
  ready() {
    this.dom["title"].style.color = "red";
  }
}
