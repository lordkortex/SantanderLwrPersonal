import { LightningElement, api } from 'lwc';

import fom from '@salesforce/label/c.from';
import to from '@salesforce/label/c.to';
import clearAll from '@salesforce/label/c.clearAll';
import appli from '@salesforce/label/c.apply';
import amount from '@salesforce/label/c.amount';
import toAmountLowerThanFrom from '@salesforce/label/c.toAmountLowerThanFrom';

import numberFormat from '@salesforce/i18n/number.numberFormat';
import lang from '@salesforce/i18n/lang';

export default class CmpInputDropdown extends LightningElement {

    @api valuePlaceholder = 'Select one';
    @api settledFrom;
    @api settledTo;
    @api settledErrorFrom;
    @api settledErrorTo;

    numberFormat = numberFormat;
    lang = lang;

    from = fom;
    to = to;
    clearAll = clearAll;
    appli = appli;
    toAmountLowerThanFrom = toAmountLowerThanFrom;
    amount = amount;

    connectedCallback(){
        console.log("numberFormat", numberFormat);
    }

    valor1(event){
        this.settledFrom = event.target.value;
    }

    valor2(event){
        this.settledTo = event.target.value;
    }

    clear(){
        console.log("LIMPIAR")
        console.log("settledFrom", this.settledFrom)
        console.log("settledTo", this.settledTo)

        this.settledFrom = "";
        this.settledTo = "";
        

        //this.refreshInputhelper();
    }

    /*show(){
        //$A.util.toggleClass(component.find("button"),"slds-hide");
        this.template.querySelector('[data-id="button"]').classList.toggle("slds-hide");
    }*/

    apply(){
        //this.validateSettledhelper();
        try{
            console.log("Dentro de Apply")
            var error = false;
            var settledFrom = this.settledFrom;
            var settledTo = this.settledTo;

            if(settledFrom != null && settledFrom != undefined && settledFrom != ""){
                if(parseInt(settledFrom)<0){
                    this.settledFrom = "";
                }
            }

            if(settledTo != null && settledTo != undefined && settledTo != "" && settledFrom != null && settledFrom != undefined && settledFrom != ""){
                if(parseInt(settledTo)<parseInt(settledFrom)){
                    error=true;            
                    this.settledErrorTo = this.toAmountLowerThanFrom;
                }else{                    
                    this.settledErrorTo = "";
                }
            }else{                    
                this.settledErrorTo = "";
            }

            if(error == false){
                this.updatePlaceHolderhelper();
                this.refreshInputhelper();
            }else{
                this.valuePlaceholder = this.amount;
            }

        }catch (e) {
            console.log(e);
        }
    }

    refreshInputhelper(){
        /*var cmpEvent = component.getEvent("updateFilterDropdown"); 

        cmpEvent.setParams({filter:'settledFrom',value:component.get("v.settledFrom")});
        cmpEvent.fire(); */
        const filter1 = this.settledFrom;

        const filterChangeEvent1 = new CustomEvent('filterchange', {
            detail: { filter: filter1, value: this.settledFrom}
        });
        // Fire the custom event
        this.dispatchEvent(filterChangeEvent1);

        /*cmpEvent = component.getEvent("updateFilterDropdown"); 

        cmpEvent.setParams({filter:'settledTo',value:component.get("v.settledTo")});
        cmpEvent.fire();*/ 

        const filter2 = this.settledTo;

        const filterChangeEvent2 = new CustomEvent('filterchange', {
            detail: { filter: filter2, value: this.settledTo}
        });
        // Fire the custom event
        this.dispatchEvent(filterChangeEvent2);
    }

    /*validateSettledhelper(){
        try{
            var error = false;
            var settledFrom = this.settledFrom;
            var settledTo = this.settledTo;

            if(settledFrom != null && settledFrom != undefined && settledFrom != ""){
                if(parseInt(settledFrom)<0){
                    this.settledFrom = "";
                }
            }

            if(settledTo != null && settledTo != undefined && settledTo != "" && settledFrom != null && settledFrom != undefined && settledFrom != ""){
                if(parseInt(settledTo)<parseInt(settledFrom)){
                    error=true;            
                    this.settledErrorTo = this.toAmountLowerThanFrom;
                }else{                    
                    settledErrorTo = "";
                }
            }else{                    
                settledErrorTo = "";
            }

            if(error == false){
                this.updatePlaceHolderhelper();
                this.refreshInputhelper();
            }else{
                this.valuePlaceholder = this.amount;
            }

        }catch (e) {
            console.log(e);
        }
    }*/

    updatePlaceHolderhelper(){
        var settledFrom = this.settledFrom;
        var settledTo = this.settledTo;

        this.valuePlaceholder = this.amount;

        if(settledFrom != null && settledFrom != undefined && settledFrom != "" && (settledTo == '' || settledTo == null || settledTo == undefined)){
            console.log("1")
            //settledFrom = settledFrom.toLocateString(this.lang);
            this.valuePlaceholder = this.amount+' ('+this.settledFrom+" - Max)";
        }

        if(settledTo != null && settledTo != undefined && settledTo != "" && (settledFrom == '' || settledFrom == null || settledFrom == undefined)){
            console.log("2")
            //settledTo = settledTo.toLocateString(this.lang);
            this.valuePlaceholder = this.amount+" (Min - "+this.settledTo+')';
        }

        if(settledTo!=null && settledTo !=undefined && settledTo != "" && settledFrom!=null && settledFrom !=undefined && settledFrom != ""){
            console.log("3")
            //settledFrom = settledFrom.toLocateString(this.lang);
            //settledTo = settledTo.toLocateString(this.lang);

            this.valuePlaceholder = this.amount+' ('+this.settledFrom+' - '+this.settledTo+')';
        }
    }
}