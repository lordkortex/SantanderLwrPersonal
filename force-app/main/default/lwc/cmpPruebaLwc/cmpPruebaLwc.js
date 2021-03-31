import { LightningElement, api, track } from 'lwc';

export default class CmpPruebaLwc extends LightningElement {

    //@api accountType;
    //@api bankName;

    @track boolean = false;

    @api values1 = [{label:"Valor 4", value:"value_4"},{label:"Valor 5", value:"value_5"},{label:"Valor 6", value:"value_6"}];
    @api values2 = [{label:"Valor Uno", value:"value_1"},{label:"Valor Dos", value:"value_2"},{label:"Valor Tres", value:"value_3"}];

}