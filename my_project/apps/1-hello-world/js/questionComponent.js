import { Component } from "pagejs/components";
import AnswerComponent from "./answerComponent";
import PromptComponent from "./promptComponent";
import quizQuestions from "../quiz-questions.json"


export default class QuestionComponent extends Component {
    globalid = "question";

    generateQuestionText(){ // generate question text
        return this.getQuestion(this.props.identifier); // get question text based on question identifier
    }

    getQuestion(questionId){ // get question text based on question identifier
        return Object.values(Object.values(quizQuestions)[questionId])[0];
    }

    delete(){
        this.component.remove();
    }

    render(){
        return (
        <div class='question-component'>
            <div class='prompt-anchor'>
                <PromptComponent props={{
                    questionIdentifier: this.props.identifier
                }}
                />
            </div>
            <div class='answers-anchor'>
                <AnswerComponent props={{
                    answerIdentifier: 1,
                    questionIdentifier: this.props.identifier,
                }}/>
                <AnswerComponent props={{
                    answerIdentifier: 2,
                    questionIdentifier: this.props.identifier,
                }}/>
                <AnswerComponent props={{
                    answerIdentifier: 3,
                    questionIdentifier: this.props.identifier,
                }}/>
                <AnswerComponent props={{
                    answerIdentifier: 4,
                    questionIdentifier: this.props.identifier,
                }}/>

            </div>
        </div>);
    }
}
