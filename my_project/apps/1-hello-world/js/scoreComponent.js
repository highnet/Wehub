import { Component } from "pagejs/components";

export default class ScoreComponent extends Component {

    globalid = "score";

    ready(){
        this.component.addEventListener("INCREMENT_SCORE", () => {
            this.incrementScore();
        })
        this.component.addEventListener("DECREMENT_SCORE", () => {
            this.decrementScore();
        })
    }

    incrementScore(){ // increment the score
        this.props.score++;
        this.reRender();
    }
    decrementScore(){
        if (this.props.positiveOnly && this.props.score == 0) return;
        this.props.score--;
        this.reRender();
    }

    reRender(){ // rerenders the component
        this.component.innerHTML = this.generateScore();
    }

    generateScore(){ // generates the score
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
