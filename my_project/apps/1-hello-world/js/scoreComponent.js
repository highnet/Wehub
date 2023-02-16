import { Component } from "pagejs/components";

export default class ScoreComponent extends Component {

    ready(){
    }

    incrementScore(){
        this.props.score++;
    }
    decrementScore(){
        this.props.score--;
    }

    generateScore(){
        let score =
         <div>
            {this.props.score.toString()}
        </div>;
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
