import { Component } from "pagejs/components";
import AnswerComponent from "./answerComponent";
import PromptComponent from "./promptComponent";


export default class QuestionComponent extends Component {
    globalid = "question";

    _identifier;
    _questions;

    ready(){
        this._identifier = this.props.identifier;
        this._questions = this.props.questions;
        this.component.addEventListener("DELETE_QUESTION", () => {
            this.delete();
        })
    }

    delete(){
        this.component.remove();
    }

    render(){
        return (
        <div class='question-component'>
            <div class='prompt-anchor'>
                <PromptComponent props={{
                    questionIdentifier: this.props.identifier,
                    questions: this.props.questions
                }}
                />
            </div>
            <div class='answers-anchor'>
                <AnswerComponent props={{
                    answerIdentifier: 1,
                    questionIdentifier: this.props.identifier,
                    questions: this.props.questions
                }}/>
                <AnswerComponent props={{
                    answerIdentifier: 2,
                    questionIdentifier: this.props.identifier,
                    questions: this.props.questions
                }}/>
                <AnswerComponent props={{
                    answerIdentifier: 3,
                    questionIdentifier: this.props.identifier,
                    questions: this.props.questions
                }}/>
                <AnswerComponent props={{
                    answerIdentifier: 4,
                    questionIdentifier: this.props.identifier,
                    questions: this.props.questions
                }}/>

            </div>
        </div>);
    }
}
