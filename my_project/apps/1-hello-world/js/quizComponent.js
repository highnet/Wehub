import { Component } from "pagejs/components";
import QuestionComponent from "./questionComponent";

import { render } from "pagejs";


export default class QuizComponent extends Component {
    
    questionAnchor;

    ready(){
        this.cacheDoms();
    }

    cacheDoms(){
        this.questionAnchor = document.getElementsByClassName('question-component__question-anchor')[0];
    }

    render(){
        return (
        <div class='quiz-component'>
            <div class='question-component__question-anchor'>
                <QuestionComponent props={{
                  identifier: 1,
                }}/>
            </div>
        </div>);
    }

}
