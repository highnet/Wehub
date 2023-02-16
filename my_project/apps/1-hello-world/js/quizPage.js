import { Page } from "pagejs/components";
import QuizComponent from "./quizComponent";

export default class QuizPage extends Page {
  render() {
    return (
      <div>
        <h1 id="title" class="calculator-page__title">
          Wehub Quiz
        </h1>
        <QuizComponent/>
      </div>
    );
  }
  ready() {
    // this.dom["btn-x"].style.color = "red";
  }
}
