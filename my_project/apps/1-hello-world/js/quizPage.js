import { Page, Button } from "pagejs/components";
import QuizComponent from "./quizComponent";
import {render} from "pagejs";

export default class QuizPage extends Page {

  globalid = "quiz-page";

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
      </div>
    );
  }

  generateStartQuizButton(){  // generates a new start quiz button
    let btn = <Button class="start-quiz-btn">Start Quiz</Button>; // instantiate the button

    btn.element.on('released', () => { // when clicked
      this.hideStartQuizButton(); // hide the button
      this.generateQuiz(); // generates a new quiz
    })
    return btn;
  }

  hideStartQuizButton(){ // hides the start quiz button
    let btn = document.getElementsByClassName("start-quiz-btn")[0]; // fetch the button
    if (btn){
      btn.style.display = "none";
    }
  }

  showStartQuizButton(){
    let btn = document.getElementsByClassName("start-quiz-btn")[0];
    if (btn){
     btn.style.display = "block";
    }
  }

  generateQuiz(){
    let quizAnchor = document.getElementsByClassName("quiz-anchor")[0];
    if (quizAnchor){
          quizAnchor.appendChild(render(QuizComponent));
    }
  }
}
