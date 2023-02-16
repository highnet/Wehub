import { Component } from "pagejs/components";
import quizQuestions from "../quiz-questions.json"


export default class AnswerComponent extends Component {
    

    ready(){
    }

    generateAnswerText(){
        return Object.values(Object.values(quizQuestions)[this.props.questionIdentifier])[this.props.identifier];
    }

    render(){
        return (
        <div class='answer-component'>
            <p class='answer-component__answer'>{this.generateAnswerText()}</p>
        </div>);
    }

}
