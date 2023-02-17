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
        let score = `
        <div>
            Score:
        </div>
        <div>
         ${this.props.score.toString()}
        </div>
        `
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
