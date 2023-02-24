import { Component, Button } from "pagejs/components";


export default class GameOverComponent extends Component {
    
    globalid = "gameover";

    _gameOverBtnText;
    _onClickDelete;
    _onClickShow;

    ready(){
        this._gameOverBtnText = this.props.gameOverBtnText || "GAME OVER";
        this._onClickDelete = this.props.onClickDelete;
        this._onClickShow = this.props.onClickShow;
    }

    generateGameOver(){ // generate the quiz game over
        let btn = <Button class="end-quiz-btn">{this._gameOverBtnText}</Button>
        
        btn.element.on('released', () => {
            let elementToDelete = document.getElementById(this._onClickDelete);
            if (elementToDelete){
                elementToDelete.dispatchEvent(new Event("GAMEOVER_DELETE"));
            }
            
            let elementToShow = document.getElementById(this._onClickShow);
            if (elementToShow){
                elementToShow.dispatchEvent(new Event("GAMEOVER_CLICKED"));
            }
            
            
        })
        return btn;
    }



    render(){
            this.ready();
        return (
        <div class='gameover-component'>
            {this.generateGameOver()}
        </div>
        );
    }

}
