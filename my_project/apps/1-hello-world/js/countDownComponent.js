import { Component } from "pagejs/components";

export default class CountDownComponent extends Component {

    _interval;
    _startingTime;

    globalid = "countdown";

    ready(){
        this.start();
        this._startingTime = this.props.timer;

        this.component.addEventListener("CLEAR_COUNTDOWN", () => {
            this.clear();
        })
    }

    clear(){
        clearInterval(this._interval);
        this._interval = undefined;
    }

    start(){
        if (this._interval == undefined){
        this._interval = setInterval(() =>  {
            if (this.props.timer >= 0){
                this.props.timer--;
                this.reRender();
            }
            if (this.props.timer < 0){
                this.clear();
                document.getElementById(this.props.onFinishedNotify).dispatchEvent(new Event("COUNTDOWN_FINISHED"));
            }

            document.getElementById(this.props.onTickReport).dispatchEvent(
                new CustomEvent("PROGRESS_REPORT", {
                  detail: { percentage: () => (this.props.timer / this._startingTime) * 100 },
                }));

            }, 1000); // update every second
        }

    }

    setTimer(seconds){
        this._startingTime = seconds;
        this.props.timer = seconds;
        document.getElementById(this.props.onTickReport).dispatchEvent(
            new CustomEvent("PROGRESS_REPORT", {
              detail: { percentage: () => (this.props.timer / this._startingTime) * 100 },
            }));        this.start();
        this.reRender();
    }

    generateCountDown(){
        let countDown = 
        `
        <div class="countdown-timer hidden">
            ${this.props.timer.toString() + this.props.postLabel} 
        </div>
        `;
        return countDown;

    }

    reRender(){
        this.component.innerHTML = this.generateCountDown();
    }
    
    render(){
        return (
        <div 
        class='countdown-component'>
            {this.generateCountDown()}
        </div>
        );
    }
}
