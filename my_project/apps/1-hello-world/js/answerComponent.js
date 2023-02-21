import { Component, Button } from "pagejs/components";
import quizQuestions from "../quiz-questions.json"


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
        return this.props.answerIdentifier == this.getAnswer(this.props.questionIdentifier, 5);
    }

    generateAnswerButton(){
        
        let btn =
        <Button 
        class='quiz-btn'>
            {this.generateAnswerText()}
        </Button>;

        btn.element.on('released', () => {
            if (this.isCorrectAnswer()){
                document.getElementById("quiz").wrapper.awardResult(true);

            } else {
                document.getElementById("quiz").wrapper.awardResult(false);
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
