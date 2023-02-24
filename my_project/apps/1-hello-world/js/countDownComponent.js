import { Component } from "pagejs/components";

export default class CountDownComponent extends Component {

    _interval;

    _startingTime;
    _timer;

    _postLabel;
    _onFinishedNotify;
    _onTickReport;

    globalid = "countdown";

    ready() {
        // TODO: finish adding default prop values
        this._timer = this.props.timer || 20;
        this._startingTime = this._timer;
        this._postLabel = this.props.postLabel || "seconds";
        this._onFinishedNotify = this.props.onFinishedNotify;
        this._onTickReport = this.props.onTickReport;

        this.start();

        this.component.addEventListener("CLEAR", () => {
            this.clear();
        })

        this.component.addEventListener("SET_TIMER", (e) => {
            this.setTimer(e.detail.time())
        });

        this.reRender();

    }

    clear() {
        clearInterval(this._interval);
        this._interval = undefined;
    }

    start() {
        if (this._interval == undefined) {
            this._interval = setInterval(() => {
                if (this._timer >= 0) {
                    this._timer--;
                    this.reRender();
                }
                if (this._timer < 0) {
                    this.clear();
                    let elementToNotify = document.getElementById(this._onFinishedNotify);
                    if (elementToNotify) {
                        elementToNotify.dispatchEvent(new Event("COUNTDOWN_FINISHED"));
                    }
                }
                let elementToReport = document.getElementById(this._onTickReport);
                if (elementToReport) {
                    elementToReport.dispatchEvent(
                        new CustomEvent("PROGRESS_REPORT", {
                            detail: { percentage: () => (this._timer / this._startingTime) * 100 },
                        }));
                }


            }, 1000); // update every second
        }

    }

    setTimer(seconds) {
        this._startingTime = seconds;
        this._timer = seconds;

        let elementToReport = document.getElementById(this._onTickReport);
        if (elementToReport) {
            elementToReport.dispatchEvent(
                new CustomEvent("PROGRESS_REPORT", {
                    detail: { percentage: () => (this._timer / this._startingTime) * 100 },
                }));
        }
        this.start();
        this.reRender();
    }

    generateCountDown() {
        let countDown =
            `
        <div class="countdown-timer">
            ${this._timer + this._postLabel} 
        </div>
        `;
        return countDown;

    }

    reRender() {
        this.component.innerHTML = this.generateCountDown();
    }

    render() {
        return (
            <div
                class='countdown-component'>
                {this.generateCountDown()}
            </div>
        );
    }
}
