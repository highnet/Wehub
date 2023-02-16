import { Component } from "pagejs/components";
import quizQuestions from "../quiz-questions.json"


export default class AnswerComponent extends Component {
    

    ready(){
    }

    generateAnswerText(){
        return this.getAnswer(this.props.questionIdentifier, this.props.identifier)
    }

    getAnswer(questionId, answerId){
        return Object.values(Object.values(quizQuestions)[questionId])[answerId];
    }

    render(){
        return (
        <div class='answer-component'>
            <p class='answer-component__answer'>{this.generateAnswerText()}</p>
        </div>);
    }

}
