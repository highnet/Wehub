import { Component } from "pagejs/components";

export default class CounterComponent extends Component {

    globalid = "counter"

    _preLabel;
    _count;
    _midLabel;
    _maxCount;

    ready() {
        this._preLabel = this.props.preLabel || "Counter:";
        this._count = this.props.count || 0;
        this._midLabel = this.props.midLabel || "of";
        this._maxCount = this.props.maxCount || 1;
        this.component.addEventListener("INCREMENT_COUNTER", () => {
            this.incrementCounter();
        })
        this.reRender();
    }

    generateCounter() {
        let counter =
            `
        <div class="counter-value">
            ${this._preLabel + " " + (this._count + 1).toString() + " " + this._midLabel + " " + (this._maxCount + 1).toString()} 
        </div>
        `;
        return counter;

    }

    isAtMaxCount() { // check if counter is at max count
        return this._count == this._maxCount;
    }

    incrementCounter() { // increment the counter
        this._count++;
        this.reRender();
    }

    reRender() { // rerender the counter
        this.component.innerHTML = this.generateCounter();
    }

    render() {
        return (
            <div
                class='counter-component'>
                {this.generateCounter()}
            </div>
        );
    }

}
