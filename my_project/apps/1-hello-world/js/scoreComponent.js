import { Component } from "pagejs/components";

export default class ScoreComponent extends Component {

    globalid = "score";

    _score;
    _preLabel;
    _postLabel;
    _positiveOnly;

    ready() {

        this._score = this.props.score || 0;
        this._preLabel = this.props.preLabel || "";
        this._postLabel = this.props.postLabel || "";
        this._positiveOnly = this.props.positiveOnly || false;

        this.component.addEventListener("INCREMENT_SCORE", () => {
            this.incrementScore();
        })
        this.component.addEventListener("DECREMENT_SCORE", () => {
            this.decrementScore();
        })

        this.reRender();
    }

    getScore() {
        return this._score;
    }

    incrementScore() { // increment the score
        this._score++;
        this.reRender();
    }
    decrementScore() {
        if (this._positiveOnly && this._score == 0) return;
        this._score--;
        this.reRender();
    }

    reRender() { // rerenders the component
        this.component.innerHTML = this.generateScore();
    }

    generateScore() { // generates the score
        let score = `
        <div class='score-prelabel'>
            ${this._preLabel}
        </div>
        <div class='score-value'>
            ${this._score}
        </div>
        <div class='score-postlabel'>
            ${this._postLabel}
        </div>
        `
        return score;
    }

    render() {
        return (
            <div
                class='score-component'>
                {this.generateScore()}
            </div>
        );
    }

}
