import { Component } from "pagejs/components";
import { render } from "pagejs";
import quizQuestions from "../quiz-questions-gaming.json";
import QuestionComponent from "./questionComponent";
import ScoreComponent from "./scoreComponent";
import CounterComponent from "./counterComponent";
import QuizGameOverComponent from "./quizGameOverComponent";
import CountDownComponent from "./countDownComponent";
import ProgessBarComponent from "./progessBarComponent";

export default class QuizComponent extends Component {
    
    globalid = "quiz";
    _questionIdSet =  this.generateRandomQuestionIdSet(); // generate a set of random question ids
    _timePerQuestion = 10;

    _mousePositionX;
    _mousePositionY;

    
    ready(){
        this.component.addEventListener("COUNTDOWN_FINISHED", () => {
            this.awardResult(false);
        })       
        console.log(this.props.category); // TODO: ASK BENJAMIN WHY THIS IS UNDEFINED 
        
        this.component.addEventListener('mousemove', (e) => {
            this._mousePositionX = e.pageX;
            this._mousePositionY = e.pageY;
            this._relativeMousePositionX = this._mousePositionX / document.body.clientWidth;
            this._relativeMousePositionY = this._mousePositionY/document.body.clientHeight;
        }); 

    }

    onMouseMove(e) {


    }

    generateRandomQuestionIdSet(){ // generate a set of random question ids
        let set = [];

        for(let i = 0 ; i < Object.keys(quizQuestions).length; i++){
            set.push(i); // populate the set with {0, 1, 2, ..., quizQuestions.length}
        }

        set = this.shuffleSet(set); // shuffle the set using Fiser-Yates shuffle
        
        return set;
    }

    shuffleSet(set) { // shuffle the set using Fisher-Yates shuffle
        var j, x, i;
        for (i = set.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = set[i];
            set[i] = set[j];
            set[j] = x;
        }
        return set;
    }

    render(){
        return (
          
        <div class='quiz-component'>
            <div class ='progressbar-anchor'>
                <ProgessBarComponent/>
            </div>
            <div class='question-counter'>
               <CounterComponent props={{
                count: 0,
                maxCount: 9,
                preLabel: "Question:",
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
            <div class ='countdown-anchor'>
                <CountDownComponent props ={{
                    timer: this._timePerQuestion,
                    postLabel: "s"
                }}/>
            </div>

            <div 
            class='question-anchor'>
                <QuestionComponent props={{
                  identifier: this.nextQuestionId(),
                }}/>
            </div>
            <div class='quiz-gameover-anchor'>
                <QuizGameOverComponent/>
            </div>
        </div>
        );
    }

    nextQuestionId(){ // return the next question id in the question id set, generates a new question id set if the set is empty
        if (this._questionIdSet.length == 0){
            this._questionIdSet = this.generateRandomQuestionIdSet(); // generate a set of random question ids
        }
        return this._questionIdSet.pop();
    }
    
    showGameOver(){ // show the game over scene
        let components = this.getElementsByClassNames( // get multiple elements at once
        [
            "quiz-gameover-component",
            "counter-component",
            "score-component", 
            "question-component",
            "countdown-component",
            "progressbar-component",
            "thinker"
            ]
            );

        this.addClassToMultipleComponents(components,"gameover"); // add a class to multiple components at once
    }

    getElementsByClassNames(componentNames){ // get multiple elements at once
        let result = [];

        for(let componentName of componentNames){
            let component = document.getElementsByClassName(componentName)[0];
            if (component){
                result.push(component);
            }
        }

        return result;
    }

    addClassToMultipleComponents(components, newClass){ // add a class to multiple components at once
        for(let component of components){
            if (component){
                component.classList.add(newClass);
            }
        }
    }

    delete(){ // delete this component
        this.component.remove();
    }

    awardResult(correct){ // award result, based on correctness

        confetti({
            particleCount: 100,
            spread: 90,
            origin: { x: this._relativeMousePositionX, y: this._relativeMousePositionY }
          });

        if (correct){
            document.getElementById("score").wrapper.incrementScore();
        } else {
            document.getElementById("score").wrapper.decrementScore();
        }

        if (document.getElementById("counter").wrapper.isAtMaxCount()){
            document.getElementById("countdown").wrapper.clear();
            this.showGameOver();
            return;
        }

        document.getElementById("counter").wrapper.incrementCounter();

        document.getElementById("countdown").wrapper.setTimer(this._timePerQuestion);

        this.spawnNextQuestion(); // spawn the next question
        
    }

    spawnNextQuestion(){
        this.deleteCurrentQuestion(); // delete current question
        this.instantiateQuestion(this.nextQuestionId()); // instantiate a question given a question id
    }

    deleteCurrentQuestion(){ // delete current question
        let currentQuestion = document.getElementById("question");
        if (currentQuestion){
            currentQuestion.wrapper.delete();
        }
    }

    instantiateQuestion(newQuestionId){ // instantiate a question given a question id
        let questionAnchor = document.getElementsByClassName("question-anchor")[0];
        let newQuestionComponent = render(QuestionComponent, {identifier:newQuestionId});
        questionAnchor.append(newQuestionComponent);
    }

}
