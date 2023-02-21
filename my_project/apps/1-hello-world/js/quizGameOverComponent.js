import { Component, Button } from "pagejs/components";


export default class QuizGameOverComponent extends Component {
    
    globalid = "gameover";

    generateQuizGameOver(){ // generate the quiz game over
        let btn = <Button class="end-quiz-btn">End Quiz</Button>
        
        btn.element.on('released', () => {
            let quiz = document.getElementById("quiz");
            if (quiz){
                quiz.wrapper.delete();
            }
            let quizPage = document.getElementById("quiz-page");
            if (quizPage){
                quizPage.wrapper.showStartQuizButton();
            } 
            
        })
        return btn;
    }

    render(){
        return (
        <div class='quiz-gameover-component'>
            <p>Thx for playing!</p>
            {this.generateQuizGameOver()}
        </div>
        );
    }

}
