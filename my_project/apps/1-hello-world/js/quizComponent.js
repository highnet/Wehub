import { Component } from "pagejs/components";
import QuestionComponent from "./questionComponent";

import { render } from "pagejs";
import ScoreComponent from "./scoreComponent";


export default class QuizComponent extends Component {
    
    _scoreAnchor;

    ready(){        
        this.init();

        document.addEventListener("CORRECT", function() {
        });     
        document.addEventListener("INCORRECT", function() {
        });  
    }

    init(){

    }


    render(){
        return (
        <div class='quiz-component'>
            <div class='score-anchor'>
                <ScoreComponent props={{
                  score: 0,
                }}/>
            </div>
            <div class='question-anchor'>
                <QuestionComponent props={{
                  identifier: 0,
                }}/>
            </div>
        </div>);
    }

}
