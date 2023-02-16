import { Component } from "pagejs/components";


export default class AnswerComponent extends Component {
    

    ready(){
    }

    generateAnswerText(){
        return "(A) " + this.props.identifier.toString();
    }

    render(){
        return (
        <div class='answer-component'>
            <p>{this.generateAnswerText()}</p>
        </div>);
    }

}
