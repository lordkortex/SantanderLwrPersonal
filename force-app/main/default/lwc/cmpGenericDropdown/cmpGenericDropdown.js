import { LightningElement,api } from 'lwc';

export default class ComboboxBasic extends LightningElement {
    value = 'inProgress';

    @api label;

    items = [
        {
            id: 1,
            name: 'Amy Taylor'
        },
        {
            id: 2,
            name: 'Michael Jones'
        },
        {
            id: 3,
            name: 'Jennifer Wu'
        },
    ];

    selectedValue(event){
        var value = event.target.id;

        console.log("Value", value);

        this.value = value;
    }
}