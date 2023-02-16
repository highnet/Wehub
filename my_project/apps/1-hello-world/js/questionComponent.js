import { Component } from "pagejs/components";
import { render } from "pagejs";
import AnswerComponent from "./answerComponent";


export default class QuestionComponent extends Component {
    

    questionText;

    ready(){
    }

    generateQuestionText(){
        if (this.props.identifier == 0){
            this.questionText = "Who Painted The Mona Lisa?";
        } else if (this.props.identifier == 1){
            this.questionText = "What is the moon made of";
        }
        return this.questionText;
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
