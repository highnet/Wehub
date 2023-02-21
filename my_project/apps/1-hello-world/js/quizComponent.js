import { Component } from "pagejs/components";
import { render } from "pagejs";
import quizQuestions from "../quiz-questions-gaming.json";
import QuestionComponent from "./questionComponent";
import ScoreComponent from "./scoreComponent";
import CounterComponent from "./counterComponent";
import GameOverComponent from "./gameOverComponent";
import CountDownComponent from "./countDownComponent";
import ProgessBarComponent from "./progessBarComponent";

export default class QuizComponent extends Component {
    
    globalid = "quiz";
    _questionIdSet =  this.generateRandomQuestionIdSet(); // generate a set of random question ids
    _timePerQuestion = 10;

    _mousePositionX;
    _mousePositionY;
    _relativeMousePositionX;
    _relativeMousePositionY;

    _scoreComponentId = "score";
    _counterComponentId = "counter";
    _countdownComponentId = "countdown";
    _questionComponentId = "question";

    ready(){
        this.component.addEventListener("COUNTDOWN_FINISHED", () => {
            this.awardResult(false);
        })

        this.component.addEventListener("ANSWER_CORRECT", () => {
            this.awardResult(true);
        })

        this.component.addEventListener("ANSWER_WRONG", () => {
            this.awardResult(false);
        })

        this.component.addEventListener("GAMEOVER_DELETE", () => {
            this.delete();
        })

        // console.log(this.props.category); // TODO: ASK BENJAMIN WHY THIS IS UNDEFINED 
        
        this.component.addEventListener('mousemove', (e) => {
            this._mousePositionX = e.pageX;
            this._mousePositionY = e.pageY;
            this._relativeMousePositionX = this._mousePositionX / document.body.clientWidth;
            this._relativeMousePositionY = this._mousePositionY/document.body.clientHeight;
        }); 

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
                <ProgessBarComponent props ={{
                    identifier: "main"
                }}/>
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
                    postLabel: "s",
                    onFinishedNotify: this.globalid,
                    onTickReport: "progressbar-main"
                }}/>
            </div>

            <div 
            class='question-anchor'>
                <QuestionComponent props={{
                  identifier: this.nextQuestionId(),
                }}/>
            </div>
            <div class='quiz-gameover-anchor'>
                <GameOverComponent props={{
                    gameOverBtnText: "End Quiz",
                    onClickDelete: "quiz",
                    onClickShow: "quiz-page"
                }}/>
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
            "gameover-component",
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
            document.getElementById(this._scoreComponentId).dispatchEvent(new Event("INCREMENT_SCORE"));
        } else {
            document.getElementById(this._scoreComponentId).dispatchEvent(new Event("DECREMENT_SCORE"));
        }

        if (document.getElementById(this._counterComponentId).wrapper.isAtMaxCount()){
            document.getElementById(this._countdownComponentId).dispatchEvent(new Event("CLEAR_COUNTDOWN"));
            this.showGameOver();
            return;
        }

        document.getElementById(this._counterComponentId).dispatchEvent(new Event("INCREMENT_COUNTER"));

        document.getElementById(this._countdownComponentId).wrapper.setTimer(this._timePerQuestion);

        this.spawnNextQuestion(); // spawn the next question
        
    }

    spawnNextQuestion(){
        this.deleteCurrentQuestion(); // delete current question
        this.instantiateQuestion(this.nextQuestionId()); // instantiate a question given a question id
    }

    deleteCurrentQuestion(){ // delete current question
        let currentQuestion = document.getElementById(this._questionComponentId);
        if (currentQuestion){
            currentQuestion.dispatchEvent(new Event("DELETE_QUESTION"));
        }
    }

    instantiateQuestion(newQuestionId){ // instantiate a question given a question id
        let questionAnchor = document.getElementsByClassName("question-anchor")[0];
        let newQuestionComponent = render(QuestionComponent, {identifier:newQuestionId});
        questionAnchor.append(newQuestionComponent);
    }

}
