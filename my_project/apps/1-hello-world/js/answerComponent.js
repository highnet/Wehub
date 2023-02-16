import { Component, Button } from "pagejs/components";
import quizQuestions from "../quiz-questions.json"
import {render} from "pagejs";


export default class AnswerComponent extends Component {
    
    ready(){
    }

    getAnswer(questionId, answerId){
        return Object.values(Object.values(quizQuestions)[questionId])[answerId];
    }

    generateAnswerText(){
        return this.getAnswer(this.props.questionIdentifier, this.props.answerIdentifier);
    }

    isCorrectAnswer(){
        let correctAnswerId = Object.values(Object.values(quizQuestions)[this.props.questionIdentifier])[5]; 
        return this.props.answerIdentifier == correctAnswerId;
    }

    generateAnswerButton(){
        
        let btn =
        <Button 
        class='quiz-btn'>
            {this.generateAnswerText()}
        </Button>;

        btn.element.on('released', () => {
            if (this.isCorrectAnswer()){
                document.dispatchEvent(new Event("CORRECT"));
            } else {
                document.dispatchEvent(new Event("INCORRECT"));
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
