import { Component, Button } from "pagejs/components";
import quizQuestions from "../quiz-questions.json"


export default class AnswerComponent extends Component {
    

    ready(){
    }

    generateAnswerText(){
        
        let correctAnswerId = Object.values(Object.values(quizQuestions)[this.props.questionIdentifier])[5]; 
        
        if (correctAnswerId == this.props.identifier){
            return "CORRECT: " + this.getAnswer(this.props.questionIdentifier, this.props.identifier);
        }

        return "INCORRECT: " + this.getAnswer(this.props.questionIdentifier, this.props.identifier);
        }

    getAnswer(questionId, answerId){
        return Object.values(Object.values(quizQuestions)[questionId])[answerId];
    }

    generateButton(){
        return(
        <Button class='answer-component__answer'>
            {this.generateAnswerText()}
        </Button>
        );
    }

    render(){
        return (
        <div class='answer-component'>
            {this.generateButton()}
        </div>
        );
    }

}
