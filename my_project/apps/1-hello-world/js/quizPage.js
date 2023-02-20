import { Page, Button } from "pagejs/components";
import QuizComponent from "./quizComponent";
import {render} from "pagejs";

export default class QuizPage extends Page {

  globalid = "quiz-page";

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
  generateQuiz(){
    let quizAnchor = document.getElementsByClassName("quiz-anchor")[0];
    if (quizAnchor){
          quizAnchor.appendChild(render(QuizComponent));
    }
  }
  
  hideStartQuizButton(){
    let btn = document.getElementsByClassName("start-quiz-btn")[0];
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

  generateStartQuizButton(){
    let btn = <Button class="start-quiz-btn">Start Quiz</Button>;

    btn.element.on('released', () => {
      this.hideStartQuizButton();
      this.generateQuiz();
    })
    return btn;
  }
}
