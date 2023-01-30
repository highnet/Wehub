import { Component } from "pagejs/components";

export default class CalculatorComponent extends Component {
  tagName = "h1";
  render() {
    return <h1>2+2=4</h1>;
  }
  ready() {}
}
