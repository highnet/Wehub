import { Component } from "pagejs/components";
import quizQuestions from "../quiz-questions.json"

export default class PromptComponent extends Component {
    
    ready(){
    }

    getPrompt(questionId){
        return Object.values(Object.values(quizQuestions)[questionId])[0];

    }

    generatePromptText(){
        return this.getPrompt(this.props.questionIdentifier);
    }

    generatePromptHeading(){
        let header = 
        <h2 class ='prompt-heading'>
            {this.generatePromptText()}
        </h2>;
        return header;
    }

    render(){
        return (
         <div class='prompt-component'>
            {this.generatePromptHeading()}
        </div>
        );
    }

}
