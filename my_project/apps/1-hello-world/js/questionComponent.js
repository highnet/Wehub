import { Component } from "pagejs/components";
import AnswerComponent from "./answerComponent";
import quizQuestions from "../quiz-questions.json"


export default class QuestionComponent extends Component {
    

    questionText;

    ready(){
    }

    generateQuestionText(){     
        return this.getQuestion(this.props.identifier);
    }

    getQuestion(questionId){
        return Object.values(Object.values(quizQuestions)[questionId])[0];
    }

    render(){
        return (
        <div class='question-component'>
            <div class='question-component__prompt-anchor'>
                <p>{this.generateQuestionText()}</p>
            </div>
            <div class='question-component__answers-anchor'>
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
                <AnswerComponent props={{
                    identifier: 4,
                    questionIdentifier: this.props.identifier,
                }}/>

            </div>
        </div>);
    }

    

}
