import { LightningElement, track} from 'lwc';


export default class CmpPruebaDrop extends LightningElement {



    @track selectedOption;
    changeHandler(event) {
    const field = event.target.name;
    if (field === 'optionSelect') {
        this.selectedOption = event.target.value;
            alert("you have selected : " && this.selectedOption);
        } 
    }


}