import { Component } from "pagejs/components";
import AnswerComponent from "./answerComponent";
import quizQuestions from "../quiz-questions.json"


export default class QuestionComponent extends Component {
    

    questionText;

    ready(){
    }

    generateQuestionText(){
        console.log(quizQuestions);
        return "(Q) " + this.props.identifier.toString();
    }

    render(){
        return (
        <div class='question-component'>
            <div class='question-component__question-text-anchor'>
                <p>{this.generateQuestionText()}</p>
            </div>
            <div class='question-component__answers-anchor'>
                <AnswerComponent props={{
                    identifier: 0,
                    questionIdentifier: this.props.identifier,
                }}/>
                <AnswerComponent props={{
                    identifier: 1,
                    questionIdentifier: this.props.identifier,
                }}/>
                <AnswerComponent props={{
                    identifier: 2,
                    questionIdentifier: this.props.identifier,
                }}/>
                <AnswerComponent props={{
                    identifier: 3,
                    questionIdentifier: this.props.identifier,
                }}/>

            </div>
        </div>);
    }

}
