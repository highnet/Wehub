import { Component, Button } from "pagejs/components";


export default class GameOverComponent extends Component {
    
    globalid = "gameover";

    generateGameOver(){ // generate the quiz game over
        let btn = <Button class="end-quiz-btn">{this.props.gameOverBtnText}</Button>
        
        btn.element.on('released', () => {
            document.getElementById(this.props.onClickDelete).dispatchEvent(new Event("GAMEOVER_DELETE"));
            document.getElementById(this.props.onClickShow).dispatchEvent(new Event("GAMEOVER_CLICKED"));
            
        })
        return btn;
    }

    render(){
        return (
        <div class='gameover-component'>
            <p>Thx for playing!</p>
            {this.generateGameOver()}
        </div>
        );
    }

}
