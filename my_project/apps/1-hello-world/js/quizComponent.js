import { Component } from "pagejs/components";
import QuestionComponent from "./questionComponent";
import ScoreComponent from "./scoreComponent";
import CounterComponent from "./counterComponent";
import quizQuestions from "../quiz-questions.json";
import QuizGameOverComponent from "./quizGameOverComponent";
import { render } from "pagejs";

export default class QuizComponent extends Component {
    
    globalid = "quiz";

    _questionIdSet =  this.generateRandomQuestionIdSet(); // generate a set of random question ids

    generateRandomQuestionIdSet(){ // generate a set of random question ids
        let set = [];

        for(let i = 0 ; i < Object.keys(quizQuestions).length -1; i++){
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
            "thinker"
            ]
            );

        this.addClassToMultipleComponents(components,"gameover"); // add a class to multiple components at once
    }

    getElementsByClassNames(componentNames){ // get multiple elements at once
        let result = [];

        for(let componentName of componentNames){
            let component = document.getElementsByClassName(componentName)[0];
            result.push(component);
        }

        return result;
    }

    addClassToMultipleComponents(components, newClass){ // add a class to multiple components at once
        for(let component of components){
            component.classList.add(newClass);
        }
    }

    delete(){ // delete this component
        this.component.remove();
    }

    awardResult(correct){ // award result, based on correctness
        if (document.getElementById("counter").wrapper.isAtMaxCount()){
            this.showGameOver();
            return;
        }

        document.getElementById("counter").wrapper.incrementCounter();

        if (correct){
            document.getElementById("score").wrapper.incrementScore();
        } else {
            document.getElementById("score").wrapper.decrementScore();
        }

        this.spawnNextQuestion(); // spawn the next question
    }

    spawnNextQuestion(){
        this.deleteCurrentQuestion(); // delete current question
        this.instantiateQuestion(this.nextQuestionId()); // instantiate a question given a question id
    }

    deleteCurrentQuestion(){ // delete current question
        let currentQuestionComponent = document.getElementsByClassName("question-component")[0];
        if (currentQuestionComponent){
            currentQuestionComponent.remove();
        }
    }

    instantiateQuestion(newQuestionId){
        let questionAnchor = document.getElementsByClassName("question-anchor")[0];

        let newQuestionComponent = render(QuestionComponent, {identifier:newQuestionId});
        questionAnchor.append(newQuestionComponent);
    }



}
