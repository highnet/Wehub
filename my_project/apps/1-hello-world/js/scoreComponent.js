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
        if (this.props.positiveOnly && this.props.score == 0) return;
        this.props.score--;
        this.component.innerHTML = this.generateScore();
    }

    generateScore(){
        let score = `
        <div class='score-prelabel'>
            ${this.props.preLabel.toString()}
        </div>
        <div class='score-value'>
         ${this.props.score.toString()}
        </div>
        <div class='score-postlabel'>
            ${this.props.postLabel.toString()}
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
