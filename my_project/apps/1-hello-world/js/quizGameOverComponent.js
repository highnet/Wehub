import { Component, Button } from "pagejs/components";


export default class QuizGameOverComponent extends Component {
    
    globalid = "gameover";

    generateQuizGameOver(){
        let btn = <Button class="end-quiz-btn">End Quiz</Button>
        
        btn.element.on('released', () => {
            document.getElementById("quiz").wrapper.delete();
            document.getElementById("quiz-page").wrapper.showStartQuizButton();
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
