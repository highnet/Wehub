import { Component } from "pagejs/components";
import QuestionComponent from "./questionComponent";
import ScoreComponent from "./scoreComponent";
import CounterComponent from "./counterComponent";
import quizQuestions from "../quiz-questions.json";
import { render } from "pagejs";


export default class QuizComponent extends Component {
    
    globalid = "quiz";

    _questionIdSet =  this.generateQuestionIdSet();

    generateQuestionIdSet(){
        let set = []
        for(let i = 0 ; i < Object.keys(quizQuestions).length -1; i++){
            set.push(i);
        }

        set = this.shuffleSet(set);
        
        return set;
    }

    nextQuestionId(){

        if (this._questionIdSet.length == 0){
            this._questionIdSet = this.generateQuestionIdSet();
        }
        return this._questionIdSet.pop();
    }

    shuffleSet(set) {
    var j, x, i;
    for (i = set.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = set[i];
        set[i] = set[j];
        set[j] = x;
    }
    return set;
}


    gameOver(){
        let thisComponent = document.getElementsByClassName("quiz-component")[0];
        thisComponent.remove();
    }

    spawnNextQuestion(increment){

        document.getElementById("counter").wrapper.incrementCounter();

        if (document.getElementById("counter").wrapper.isAtMaxCount()){
            this.gameOver();
            document.dispatchEvent(new Event("GAMEOVER"));
            return;
        }

        if (increment){
            document.getElementById("score").wrapper.incrementScore();
        } else {
            document.getElementById("score").wrapper.decrementScore();
        }

        this.nextQuestion();
    }

    randomInteger(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    nextQuestion(){
        this.deleteCurrentQuestion();
        this.instantiateQuestion(this.nextQuestionId());
    }

    deleteCurrentQuestion(){
        let currentQuestionComponent = document.getElementsByClassName("question-component")[0];
        currentQuestionComponent.remove();
    }

    instantiateQuestion(newQuestionId){
        let questionAnchor = document.getElementsByClassName("question-anchor")[0];

        let newQuestionComponent = render(QuestionComponent, {identifier:newQuestionId});
        questionAnchor.append(newQuestionComponent);
    }

    render(){
        return (
        <div class='quiz-component'>
            <div class='question-counter'>
               <CounterComponent props={{
                count: 0,
                maxCount: 10,
                preLabel: "Questions:",
                midLabel: "of",
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
            class='question-anchor'>
                <QuestionComponent props={{
                  identifier: this.nextQuestionId(),
                }}/>
            </div>
        </div>
        );
    }

}
