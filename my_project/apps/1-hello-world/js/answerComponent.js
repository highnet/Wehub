import { Component, Button } from "pagejs/components";
import quizQuestions from "../quiz-questions.json"
import {render} from "pagejs";


export default class AnswerComponent extends Component {
    

    ready(){
    }

    generateAnswerText(){
        
        return this.getAnswer(this.props.questionIdentifier, this.props.identifier);
    }

    getAnswer(questionId, answerId){
        return Object.values(Object.values(quizQuestions)[questionId])[answerId];
    }
    
    handleClick(){
        console.log("CLICK");
    }

    isCorrectAnswer(){
        let correctAnswerId = Object.values(Object.values(quizQuestions)[this.props.questionIdentifier])[5]; 
        return this.props.identifier == correctAnswerId;
    }

    generateButton(){
        
        let btn =
        <Button 
        class='answer-component__answer'>
            {this.generateAnswerText()}
        </Button>;

        btn.element.on('released', () => {
            if (this.isCorrectAnswer()){
                console.log("CORRECT");
            } else {
                console.log("INCORRECT");
            }
      })

      return btn;
    }

    render(){
        return (
        <div class='answer-component'>
            {this.generateButton()}
        </div>
        );
    }

}
