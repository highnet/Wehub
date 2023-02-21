import { Component } from "pagejs/components";

export default class CounterComponent extends Component {

    globalid = "counter"

    generateCounter(){
        let counter = 
        `
        <div class="counter-value">
            ${this.props.preLabel + " " +  (this.props.count + 1).toString() +  " " + this.props.midLabel + " " + (this.props.maxCount + 1).toString()} 
        </div>
        `;
        return counter;

    }

    isAtMaxCount(){ // check if counter is at max count
        return this.props.count == this.props.maxCount;
    }

    incrementCounter(){ // increment the counter
        this.props.count++;
        this.reRender();   
    }

    reRender(){ // rerender the counter
        this.component.innerHTML = this.generateCounter();
    }

    render(){
        return (
        <div 
        class='counter-component'>
            {this.generateCounter()}
        </div>
        );
    }

}
