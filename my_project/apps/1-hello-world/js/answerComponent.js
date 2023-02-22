import { Component, Button } from "pagejs/components";
import quizQuestions from "../quiz-questions-gaming.json"

export default class AnswerComponent extends Component {


    generateAnswerText(){ // generate the answer text
        return this.getAnswer(this.props.questionIdentifier, this.props.answerIdentifier);
    }

    getAnswer(questionId, answerId){ // get the answer text based on question id and answer id
        return Object.values(Object.values(this.props.questions)[questionId])[answerId];
    }

    isCorrectAnswer(){ // check if answer is correct
        return this.props.answerIdentifier == this.getAnswer(this.props.questionIdentifier, 5);
    }

    generateAnswerButton(){ // generate an answer button
        let btn =
        <Button 
        class='quiz-btn'>
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

    render(){
        return (
        <div class='answer-component'>
            {this.generateAnswerButton()}
        </div>
        );
    }

}
