import { Page, Button } from "pagejs/components";
import QuizComponent from "./quizComponent";
import {render} from "pagejs";

export default class QuizPage extends Page {

  globalid = "quiz-page";
  

  ready(){
    document.getElementById(this.globalid).addEventListener("GAMEOVER_CLICKED", () => {
      this.showStartQuizButton();
    })
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

  toggleElementVisibility(elementClassName, visible){ // toggle element visibility of a given class name
    let elem = document.getElementsByClassName(elementClassName)[0];
    if (!elem) return;
    if (visible){
      elem.classList.remove("hidden");
    } else {
      elem.classList.add("hidden");
    }
  }

  hideStartQuizButton(){ // hide the start quiz button
    this.toggleElementVisibility("start-quiz-btn",false); // toggle element visibility of a given class name
  }

  showStartQuizButton(){ // show the start quiz button
    this.toggleElementVisibility("start-quiz-btn", true); // toggle element visibility of a given class name
  }

  showThinker(){
    this.toggleElementVisibility("thinker",true); // toggle element visibility of a given class name
    let thnkr = document.getElementsByClassName("thinker")[0];
    if (thnkr){
      thnkr.classList.remove("gameover");
    }
  }

  generateQuiz(){ // generate a new quiz
    let quizAnchor = document.getElementsByClassName("quiz-anchor")[0];
    if (quizAnchor){
      quizAnchor.appendChild(render(QuizComponent,{
        category: "gaming",
        scoreComponentId: "score",
        counterComponentId: "counter",
        countdownComponentId: "countdown",
        questionComponentId: "question"
      }));//  // create a newly instantiated quiz component
    }
  }
}
