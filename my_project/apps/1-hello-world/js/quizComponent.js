import { Component } from "pagejs/components";
import QuestionComponent from "./questionComponent";

import { render } from "pagejs";
import ScoreComponent from "./scoreComponent";


export default class QuizComponent extends Component {
    
    _currentQuestion = 0;

    ready(){        

       document.addEventListener("CORRECT",() =>{
            document.getElementById("score").wrapper.incrementScore();
            this.instantiateNextQuestion();
       })

        document.addEventListener("INCORRECT", () => {
            document.getElementById("score").wrapper.decrementScore();
            this.instantiateNextQuestion();

        });

    }

    randomInteger(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    instantiateNextQuestion(){
            
        let questionAnchor = document.getElementsByClassName("question-anchor")[0];
        let oldQuestionComponent = document.getElementsByClassName("question-component")[0];

        oldQuestionComponent.remove();

        this._currentQuestion++;
        if (this._currentQuestion == 2){
            this._currentQuestion = 0;
        }
        let newQuestionComponent = render(QuestionComponent, {identifier:this._currentQuestion});
        questionAnchor.append(newQuestionComponent);
    }

    generateQuiz(){

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
                  identifier: this._currentQuestion,
                }}/>
            </div>
        </div>);
    }

}
