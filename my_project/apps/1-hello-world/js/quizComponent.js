import { Component } from "pagejs/components";
import QuestionComponent from "./questionComponent";

import { render } from "pagejs";
import ScoreComponent from "./scoreComponent";

import quizQuestions from "../quiz-questions.json";

export default class QuizComponent extends Component {
    
    _currentQuestionId = this.randomInteger(0,Object.keys(quizQuestions).length -1);

    ready(){        

       document.addEventListener("CORRECT",() =>{
            document.getElementById("score").wrapper.incrementScore();
            this.deleteCurrentQuestionAndInstantiateNextQuestion();
       })

        document.addEventListener("INCORRECT", () => {
            document.getElementById("score").wrapper.decrementScore();
            this.deleteCurrentQuestionAndInstantiateNextQuestion();

        });

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
        this.deleteCurrentQuestion();
        this.instantiateQuestion(this.randomInteger(0,Object.keys(quizQuestions).length -1));

    }

    render(){

        return (
        <div class='quiz-component'>
            <div class='score-anchor'>
                <ScoreComponent props={{
                  score: 0,
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
