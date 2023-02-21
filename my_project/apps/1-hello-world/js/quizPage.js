import { Page, Button } from "pagejs/components";
import QuizComponent from "./quizComponent";
import {render} from "pagejs";

export default class QuizPage extends Page {

  globalid = "quiz-page";

  ready(){

  }

  render() {
    return (
      <div>
        <h1 id="title" class="quiz-page__title">
          Wehub Quiz
        </h1>
        <div class="start-quiz-anchor">
          {this.generateStartQuizButton()}
        </div>
        <div class="flex">
          <div class="quiz-anchor">

          </div>
          <div class="thinker-container">
            <img class="thinker hidden" src="./assets/img/thinker.png"/>
          </div>
        </div>
      </div>
    );
  }

  generateStartQuizButton(){  // generate a new start quiz button
    let btn = <Button class="start-quiz-btn">Start Quiz</Button>; // instantiate the button
    btn.element.on('released', () => {
      this.hideStartQuizButton(); // hide the start quiz button
      this.showThinker();
      this.generateQuiz(); // generate a new quiz
    })
    return btn;
  }

  hideStartQuizButton(){ // hide the start quiz button
    let btn = document.getElementsByClassName("start-quiz-btn")[0]; // fetch the start quiz button
    if (btn){
      btn.classList.add("hidden"); // add the "hidden" tag to the start quiz button
    }
  }

  showStartQuizButton(){ // show the start quiz button
    let btn = document.getElementsByClassName("start-quiz-btn")[0]; // fetch the start quiz button
    if (btn){
      btn.classList.remove("hidden"); // remove the "hidden" tag from the start quiz button 
    }
  }

  showThinker(){
    let thnkr = document.getElementsByClassName("thinker")[0];
    if (thnkr){
      thnkr.classList.remove("hidden");
      thnkr.classList.remove("gameover");
    }
  }

  generateQuiz(){ // generate a new quiz
    let quizAnchor = document.getElementsByClassName("quiz-anchor")[0];
    if (quizAnchor){
      quizAnchor.appendChild(render(QuizComponent)); // create a newly instantiated quiz component
    }
  }
}
