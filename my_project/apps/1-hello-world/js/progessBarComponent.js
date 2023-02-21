import { Component } from "pagejs/components";

export default class ProgessBarComponent extends Component {

    globalid = "progressbar"
    _progressPercentage = NaN;

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
        this.component.style.backgroundColor = "rgb(" + this.remap(this._progressPercentage,0,100,255,0) + "," + this.remap(this._progressPercentage,0,100,0,255) + "," + 0 +")";
    }

        remap(value, from1, to1, from2, to2)
    {
        return (value - from1) / (to1 - from1) * (to2 - from2) + from2; // remap a value linearly from [from1 to1] to [from2 to2]
    }
}
