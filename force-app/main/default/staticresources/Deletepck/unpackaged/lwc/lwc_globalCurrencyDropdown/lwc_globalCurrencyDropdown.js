import {LightningElement,api,track} from 'lwc';

//Import labels
import selectOne from '@salesforce/label/c.selectOne';
import consolidationCurrency from '@salesforce/label/c.ConsolidationCurrency';

export default class Lwc_globalCurrencyDropdown extends LightningElement{
    //Labels
    label = {
        selectOne,
        consolidationCurrency,
    }

    @api currencylist = [];
    @api selectedcurrency;
    disableDropdown = false;

    connectedCallback(){
        console.log('currencylist: ' + this.currencylist);
        console.log('selectedcurrency: ' + this.selectedcurrency);
    }

    get isNotEmptyCurrencyList(){
        var isNotEmptyCurrencyList = false;
        this.disableDropdown = true;
        if(this.currencylist.length > 0){
            isNotEmptyCurrencyList = true;
            this.disableDropdown = false;
        }
        return isNotEmptyCurrencyList;
    }
    handledropdownvalueselectedcurrency(evt){
        var s = evt.detail;
        const e = new CustomEvent("dropdownvalueselected",{
            detail: s
        });
        this.dispatchEvent(e);
    }
}