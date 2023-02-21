import { Component } from "pagejs/components";

export default class CountDownComponent extends Component {

    generateCountDown(){
        let countDown = 
        `
        <div class="countdown-timer">
            ${this.props.timer.toString()} 
        </div>
        `;
        return countDown;
    }

    render(){
        return (
        <div 
        class='countdown-component'>
            {this.generateCountDown()}
        </div>
        );
    }
}
