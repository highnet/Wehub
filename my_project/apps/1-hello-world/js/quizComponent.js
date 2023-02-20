import { Component } from "pagejs/components";
import QuestionComponent from "./questionComponent";
import ScoreComponent from "./scoreComponent";
import CounterComponent from "./counterComponent";
import quizQuestions from "../quiz-questions.json";
import { render } from "pagejs";


export default class QuizComponent extends Component {
    
    _currentQuestionId = this.randomInteger(0,Object.keys(quizQuestions).length -1);

    ready(){        

       document.addEventListener("CORRECT",() =>{
            this.spawnNextQuestion(true);
       })

        document.addEventListener("INCORRECT", () => {
            this.spawnNextQuestion(false);
        });

        document.addEventListener("GAMEOVER", () => {
            console.log("@@@ game over @@@");
        });

    }

    spawnNextQuestion(increment){
        if (increment){
            document.getElementById("score").wrapper.incrementScore();
        } else {
            document.getElementById("score").wrapper.decrementScore();
        }

        document.getElementById("counter").wrapper.incrementCounter();

        this.deleteCurrentQuestion();
        this.instantiateQuestion(this.randomInteger(0,Object.keys(quizQuestions).length -1));
    }

    randomInteger(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    deleteCurrentQuestion(){
        let currentQuestionComponent = document.getElementsByClassName("question-component")[0];
        currentQuestionComponent.remove();
        this._currentQuestionId = NaN;
    }

    instantiateQuestion(newQuestionId){
        let questionAnchor = document.getElementsByClassName("question-anchor")[0];
        this._currentQuestionId = newQuestionId;
        let newQuestionComponent = render(QuestionComponent, {identifier:this._currentQuestionId});
        questionAnchor.append(newQuestionComponent);
    }

    deleteCurrentQuestionAndInstantiateNextQuestion(){

    }

    render(){
        return (
        <div class='quiz-component'>
            <div class='question-counter'>
               <CounterComponent props={{
                count: 0,
                maxCount: 5,
                preLabel: "Questions:",
                midLabel: "of",
                onMaxCountEvent: "GAMEOVER"
               }}/>
            </div>
            <div class='score-anchor'>
                <ScoreComponent props={{
                  score: 0,
                  preLabel: "•",
                  postLabel: "points",
                  positiveOnly: true
                }}/>
            </div>
            <div 
            id = 'question'
            class='question-anchor'>
                <QuestionComponent props={{
                  identifier: this._currentQuestionId,
                }}/>
            </div>
        </div>
        );
    }

}
