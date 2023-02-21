import { Component } from "pagejs/components";

export default class ProgessBarComponent extends Component {

    _progressPercentage = NaN;

    ready(){
        this.component.id ="progressbar-" + this.props.identifier;

        this.component.addEventListener("PROGRESS_REPORT", (e) => {
            this.setProgressPercentage(e.detail.percentage());
        });
    }

    render(){
        return (
        <div 
        class='progressbar-component'>
        </div>
        );
    }

    setProgressPercentage(percentage){
        this._progressPercentage = percentage;
        this.updateStyling();
    }

    updateStyling(){
        this.component.style.width = this._progressPercentage + "%";
        this.component.style.backgroundColor = this.interpolateColorByPercentage(
                this._progressPercentage,
                [255,0,0],
                [0,255,0]
            );
    }

    interpolateColorByPercentage(percentage, fromRgb, toRgb){
        return "rgb(" +
            this.remap(percentage,0,100,fromRgb[0],toRgb[0]) + "," +
            this.remap(percentage,0,100,fromRgb[1],toRgb[1]) + "," + 
            this.remap(percentage,0,100,fromRgb[2],toRgb[2]) + ")";
    }


    remap(value, from1, to1, from2, to2){
        return (value - from1) / (to1 - from1) * (to2 - from2) + from2; // remap a value linearly from [from1 to1] to [from2 to2]
    }
}
