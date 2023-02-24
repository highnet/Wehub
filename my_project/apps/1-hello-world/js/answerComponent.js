import { Component, Button } from "pagejs/components";
import quizQuestions from "../quiz-questions-gaming.json"

export default class AnswerComponent extends Component {

    
    generateAnswerText(){ // generate the answer text
        this._questionIdentifier = this.props.questionIdentifier;
        this._answerIdentifier = this.props.answerIdentifier;
        return this.getAnswer(this._questionIdentifier, this._answerIdentifier);
    }

    getAnswer(questionId, answerId){ // get the answer text based on question id and answer id
        this._questions = this.props.questions;
        return Object.values(Object.values(this._questions)[questionId])[answerId];
    }

    isCorrectAnswer(){ // check if answer is correct
        this._answerIdentifier = this.props.answerIdentifier;
        this._questionIdentifier = this.props.questionIdentifier;

        return this._answerIdentifier == this.getAnswer(this._questionIdentifier, 5);
    }

    generateAnswerButton(){ // generate an answer button
        this._answerIdentifier = this.props.answerIdentifier;
        let btn =
        <Button 
        class= {"quiz-btn quiz-btn" + this._answerIdentifier}>
            {this.generateAnswerText()}
        </Button>;

        btn.element.on('released', () => {
            if (this.isCorrectAnswer()){
                document.getElementById("quiz").dispatchEvent(new Event("ANSWER_CORRECT"));
            } else {
                document.getElementById("quiz").dispatchEvent(new Event("ANSWER_WRONG"));
            }
      })
      return btn;
    }

    ready(){
        console.log(this.component);
    }

    render(){
        return (
        <div class='answer-component'>
            <div>
                <div class={"shape shape"+this.props.answerIdentifier}></div>
                {this.generateAnswerButton()}
            </div>
        </div>
        );
    }

}
