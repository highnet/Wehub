import { Component } from "pagejs/components";

export default class ScoreComponent extends Component {

    globalid = "score";

    ready(){
            
    }

    incrementScore(){
        this.props.score++;
        this.component.innerHTML = this.generateScore();
    }
    decrementScore(){
        this.props.score--;
        this.component.innerHTML = this.generateScore();
    }

    generateScore(){
        let score = "Score: " + this.props.score.toString();
        return score;
    }



    render(){
        return (
        <div 
        class='score-component'>
            {this.generateScore()}
        </div>
        );
    }

}
