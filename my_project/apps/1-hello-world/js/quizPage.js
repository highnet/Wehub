import { Page, Button } from "pagejs/components";
import QuizComponent from "./quizComponent";
import {render} from "pagejs";

export default class QuizPage extends Page {

  generateQuiz(){
    let quizAnchor = document.getElementsByClassName("quiz-anchor")[0];
    quizAnchor.appendChild(render(QuizComponent));
    this.hideStartQuizButton();
  }
  
  hideStartQuizButton(){
    let btn = document.getElementsByClassName("start-quiz-btn")[0];
    btn.style.display = "none";
  }

  generateStartQuizButton(){
    let btn = <Button class="start-quiz-btn">Start Quiz</Button>;

    btn.element.on('released', () => {
      this.generateQuiz();
    })
    return btn;
  }

  render() {
    return (
      <div>
        <h1 id="title" class="calculator-page__title">
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
  ready() {
      document.addEventListener("GAMEOVER", () => {
            let btn = document.getElementsByClassName("start-quiz-btn")[0];
            btn.style.display="block";
      });
  }
}
