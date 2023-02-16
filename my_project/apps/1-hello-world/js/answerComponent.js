import { Component } from "pagejs/components";


export default class AnswerComponent extends Component {
    

    ready(){
    }

    generateAnswerText(){
        console.log(this.props.identifier, this.props.questionIdentifier);
        return this.props.identifier.toString();
    }

    render(){
        return (
        <div class='answer-component'>
            <p>{this.generateAnswerText()}</p>
        </div>);
    }

}
