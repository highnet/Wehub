import { Page, Button } from "pagejs/components";
import QuizComponent from "./quizComponent";
import {render} from "pagejs";
import gamingQuestions from "../quiz-questions-gaming.json";
import geographyQuestions from "../quiz-questions-geography.json";

export default class QuizPage extends Page {

  globalid = "quiz-page";
  _category = "geography";

  ready(){
    this.animateBoxes();

    document.getElementById(this.globalid).addEventListener("GAMEOVER_CLICKED", () => {
      this.showStartQuizButton();
    })
  }

  animateBoxes(){
    let tl = gsap.timeline({repeat: -1, repeatDelay: 0, yoyo: true})
    tl.to(".red", { rotation: 90 });
    tl.to(".green", { rotation: 90 });
    tl.to(".blue", { rotation: 90 });
    tl.to(".yellow", { rotation: 90 });

    tl.to(".yellow", { rotation: 180 });
    tl.to(".blue", { rotation: 180 });
    tl.to(".green", { rotation: 180 });
    tl.to(".red", { rotation: 180 });

    tl.to(".red", { rotation: 270 });
    tl.to(".green", { rotation: 270 });
    tl.to(".blue", { rotation: 270 });
    tl.to(".yellow", { rotation: 270 });

    tl.to(".yellow", { rotation: 360 });
    tl.to(".blue", { rotation: 360 });
    tl.to(".green", { rotation: 360 });
    tl.to(".red", { rotation: 360 });

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
          <div class="quiz-anchor">

          </div>
        <div class="boxes">
          <div class="box red">
              <div class ="boxshape1"></div>
          </div>
          <div class="box green">
                <div class ="boxshape2"></div>
          </div>
          <div class="box blue">           
                <div class ="boxshape3"></div>
          </div>
          <div class="box yellow">
                <div class ="boxshape4"></div>
          </div>

      </div>
      </div>
    );
  }

  generateStartQuizButton(){  // generate a new start quiz button
    let btn = <Button class="start-quiz-btn">Start Quiz</Button>; // instantiate the button
    btn.element.on('released', () => {
      this.hideStartQuizButton(); // hide the start quiz button
      this.generateQuiz(this._category); // generate a new quiz
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


  generateQuiz(category){ // generate a new quiz
    let quizAnchor = document.getElementsByClassName("quiz-anchor")[0];
    let quizQuestions = "";

    if (category == "geography"){
        quizQuestions = geographyQuestions;
    } else if (category == "gaming"){
      quizQuestions = gamingQuestions;
    } else {
      quizQuestions = gamingQuestions;
    }

    if (quizAnchor){
      quizAnchor.appendChild(render(QuizComponent,{
        scoreComponentId: "score",
        counterComponentId: "counter",
        countdownComponentId: "countdown",
        questionComponentId: "question",
        questions: quizQuestions,
        timePerQuestion: 100,
        numberOfQuestions: 10,
      }));  // create a newly instantiated quiz component
    }


  }

}
