import { Component } from "pagejs/components";

export default class ScoreComponent extends Component {

    globalid = "counter"

    generateCounter(){
        let counter = 
        `
        <div class="counter-value">
            ${this.props.preLabel + " " +  this.props.count.toString() +  " " + this.props.midLabel + " " + this.props.maxCount.toString()} 
        </div>
        `;
        return counter;

    }


    isAtMaxCount(){
        return this.props.count > this.props.maxCount;
    }

    incrementCounter(){
        this.props.count++;
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
