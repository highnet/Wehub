import { Component } from "pagejs/components";
import QuestionComponent from "./questionComponent";

import { render } from "pagejs";
import ScoreComponent from "./scoreComponent";


export default class QuizComponent extends Component {
    
    _currentQuestion;

    ready(){        
        this.init();

        let score = document.getElementById("score");

        function randomInteger(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function instantiateRandomQuestion(){
            
            let questionAnchor = document.getElementsByClassName("question-anchor")[0];
            let oldQuestionComponent = document.getElementsByClassName("question-component")[0];

            oldQuestionComponent.remove();

            let newQuestionComponent = render(QuestionComponent, {identifier:randomInteger(0,1)});
            questionAnchor.append(newQuestionComponent);
        }
        
        document.addEventListener("CORRECT", function() {
            score.wrapper.incrementScore();

            instantiateRandomQuestion();
        });

        document.addEventListener("INCORRECT", function() {
            score.wrapper.decrementScore();
            instantiateRandomQuestion();

        });

    }


    init(){
        this._currentQuestion = 0;
    }


    render(){
        return (
        <div class='quiz-component'>
            <div class='score-anchor'>
                <ScoreComponent props={{
                  score: 0,
                }}/>
            </div>
            <div 
            id = 'question'
            class='question-anchor'>
                <QuestionComponent props={{
                  identifier: 0,
                }}/>
            </div>
        </div>);
    }

}
