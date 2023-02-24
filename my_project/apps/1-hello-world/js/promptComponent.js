import { Component } from "pagejs/components";

export default class PromptComponent extends Component {


    _questionIdentifier;
    _questions;


    generatePromptText() { // generate the question prompt text
        this._questionIdentifier = this.props.questionIdentifier;
        return this.getPrompt(this._questionIdentifier);
    }

    getPrompt(questionId) { // get the question promp based on question id
        this._questions = this.props.questions;
        return Object.values(Object.values(this._questions)[questionId])[0];
    }

    generatePromptHeading() {
        let header =
            <h2 class='prompt-heading'>
                {this.generatePromptText()}
            </h2>;
        return header;
    }

    render() {
        return (
            <div class='prompt-component'>
                {this.generatePromptHeading()}
            </div>
        );
    }

}
