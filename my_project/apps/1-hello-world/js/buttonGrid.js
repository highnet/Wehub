import { Component, Button } from "pagejs/components";

export default class ButtonGrid extends Component {
  createButtons() {
    let component = (
      <div
        style={`
            display: grid;
            grid-template-columns: repeat(${this.props.columns}, 1fr);
            gap: 1px;
            `}
      ></div>
    );

    for (var i = 0; i < this.props.buttons; i++) {
      let newBtn = <Button>{`${this.props.identifier}-${i}`}</Button>;
      //  newBtn.element.classes.push();
      newBtn.attributes["internalId"] = this.props.identifier + "-" + i;
      component.children.push(newBtn);
    }

    return component;
  }

  render() {
    return <div>{this.createButtons()}</div>;
  }
  ready() {}
}
