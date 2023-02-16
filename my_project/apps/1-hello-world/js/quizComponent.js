import { Component } from "pagejs/components";
import QuestionComponent from "./questionComponent";

import { render } from "pagejs";
import ScoreComponent from "./scoreComponent";


export default class QuizComponent extends Component {
    
    ready(){        
        this.init();
        document.addEventListener("CORRECT", function() {
            console.log("+");
        });

        document.addEventListener("INCORRECT", function() {
            console.log("-");
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
