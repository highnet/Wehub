import { Component, Button } from "pagejs/components";


export default class QuizGameOverComponent extends Component {
    
    globalid = "gameover";

    generateQuizGameOver(){
        let btn = <Button class="restart-quiz-btn">Restart</Button>
        
        btn.element.on('released', () => {
            console.log("yo");
        let quizComponent = document.getElementsByClassName("quiz-component")[0];
        quizComponent.remove();
        let btn = document.getElementsByClassName("start-quiz-btn")[0];
        btn.style.display="block";
        }
        )
        return btn;
    }



    render(){
        return (
        <div class='quiz-gameover-component'>
            {this.generateQuizGameOver()}
        </div>
        );
    }

}
