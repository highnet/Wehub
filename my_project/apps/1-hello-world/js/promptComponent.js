import { Component } from "pagejs/components";
import quizQuestions from "../quiz-questions-gaming.json"

export default class PromptComponent extends Component {
    
    generatePromptText(){ // generate the question prompt text
        return this.getPrompt(this.props.questionIdentifier);
    }

    getPrompt(questionId){ // get the question promp based on question id
        return Object.values(Object.values(quizQuestions)[questionId])[0];
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
