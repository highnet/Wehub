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

    incrementCounter(){
        this.props.count++;

        if (this.props.count == this.props.maxCount){
            document.dispatchEvent(new Event(this.props.onMaxCountEvent))
        }
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
