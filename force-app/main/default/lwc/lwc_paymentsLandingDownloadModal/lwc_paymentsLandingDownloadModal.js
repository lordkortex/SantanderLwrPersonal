import { LightningElement, api, track } from 'lwc';

import {loadStyle, loadScript } from 'lightning/platformResourceLoader';
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

// DESCOMENTAR LAS LABELS UNA VEZ ESTÉN EN EL ENTORNO
import close from '@salesforce/label/c.close';
import DownloadPayments from '@salesforce/label/c.DownloadPayments';
import PAY_DownloadBasicMsgOne from '@salesforce/label/c.PAY_DownloadBasicMsgOne';
import PAY_DownloadDescriptionOne from '@salesforce/label/c.PAY_DownloadDescriptionOne';
import PAY_DownloadDescriptionTwo from '@salesforce/label/c.PAY_DownloadDescriptionTwo';
import PAY_DownloadBasicMsgTwo from '@salesforce/label/c.PAY_DownloadBasicMsgTwo';
import PAY_DownloadDescriptionThree from '@salesforce/label/c.PAY_DownloadDescriptionThree';
import fileFormat from '@salesforce/label/c.fileFormat';
import PAY_selectFileFormat from '@salesforce/label/c.PAY_selectFileFormat';
import apply from '@salesforce/label/c.apply';
import clearAll from '@salesforce/label/c.clearAll';
// OTFX LABELS
import OTFX_DownloadTrades from '@salesforce/label/c.OTFX_DownloadTrades';
import OTFX_DownloadBasicMsgOne from '@salesforce/label/c.OTFX_DownloadBasicMsgOne';
import OTFX_DownloadBasicMsgTwo from '@salesforce/label/c.OTFX_DownloadBasicMsgTwo';
import OTFX_DownloadDescriptionOne from '@salesforce/label/c.OTFX_DownloadDescriptionOne';
import OTFX_DownloadDescriptionTwo from '@salesforce/label/c.OTFX_DownloadDescriptionTwo';
import OTFX_DownloadDescriptionThree from '@salesforce/label/c.OTFX_DownloadDescriptionThree';

function valueobject(key, value, clase) {
    this.key = key;
    this.val = value;
    this.clase = clase;
}

export default class Lwc_paymentsLandingDownloadModal extends LightningElement {

    @api helptextdropdown = "Show More";
    @api showdownloadmodal = false;
    @api values = ['CSV', 'XLS'];
    @api selectedvalue;
    @api iserror = false;

    @api selectedrows = [];
    @api filtercounter = 0;
    @api listlength = 0;
    @api maxnum = 1000;
    @api isallselected= false;
    @api isotfxcommunity= false;
    

    @track listValues = [];

    Label = {
        close,
        DownloadPayments,
        PAY_DownloadBasicMsgOne,
        PAY_DownloadDescriptionOne,
        PAY_DownloadDescriptionTwo,
        PAY_DownloadBasicMsgTwo,
        PAY_DownloadDescriptionThree,
        fileFormat,
        PAY_selectFileFormat,
        apply,
        clearAll,
        OTFX_DownloadTrades,
        OTFX_DownloadBasicMsgOne,
        OTFX_DownloadBasicMsgTwo,
        OTFX_DownloadDescriptionOne,
        OTFX_DownloadDescriptionTwo,
        OTFX_DownloadDescriptionThree
    }
    _selectedvalue;
    //_values = [];
    valuesObj = [];

    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
        var i = 0;  
        for (const val in this.values){

            i++;
            
            var cls = this.values[val] == this._selectedvalue ? 'slds-dropdown__item slds-is-selected' : 'slds-dropdown__item';
            var valor = new valueobject(i,this.values[val],cls);

            i++;
            this.valuesObj.push(valor);
        }
        
    }

    get selectedValues() {
        return this._selectedvalue;
    }
    set selectedValues(selectedvalue) {
        this._selectedvalue = selectedvalue;
    }
    
	closeDownloadModal() {
        /*if(this.isotfxcommunity){
            const closeModal = new CustomEvent('buttoncancel',{close: false});
            this.dispatchEvent(closeModal);
        } else {
            this.showdownloadmodal = false;
        }
        */
        this.showdownloadmodal = false;
        const closeModal = new CustomEvent('buttoncancel',{close: false});
        this.dispatchEvent(closeModal);
    }
    
    get contat(){
        if(this.isotfxcommunity == false){
            return this.Label.PAY_DownloadBasicMsgOne + ' ' + this.Label.PAY_DownloadDescriptionOne;
        } else {
            return this.Label.OTFX_DownloadBasicMsgOne + ' ' + this.Label.OTFX_DownloadDescriptionOne;
        }
        
    }
    
    get format1(){
        if(this.isotfxcommunity == false){
            return this.formatLabel(this.Label.PAY_DownloadDescriptionTwo, this.listlength);
        } else {
            return this.formatLabel(this.Label.OTFX_DownloadDescriptionTwo, this.listlength);
        }
    }

    get format2(){
        if(this.isotfxcommunity == false){
            var formatval = this.formatLabel(this.Label.PAY_DownloadBasicMsgTwo, this.maxnum);
            return formatval + ' ' + this.Label.PAY_DownloadDescriptionThree;
        } else {
            var formatval = this.formatLabel(this.Label.OTFX_DownloadBasicMsgTwo, this.maxnum);
            return formatval + ' ' + this.Label.OTFX_DownloadDescriptionThree;
        }
    }

    get format3(){
        if(this.isotfxcommunity == false){
            return this.formatLabel(this.Label.PAY_DownloadBasicMsgTwo, this.selectedrows.length);
        } else {
            return this.formatLabel(this.Label.OTFX_DownloadBasicMsgTwo, this.selectedrows.length);
        }
    }

    get format4(){
        if(this.isotfxcommunity == false){
            var formatval = this.formatLabel(this.Label.PAY_DownloadBasicMsgTwo, this.maxnum);
            return formatval + ' ' + this.Label.PAY_DownloadDescriptionThree;
        } else {
            var formatval = this.formatLabel(this.Label.OTFX_DownloadBasicMsgTwo, this.maxnum);
            return formatval + ' ' + this.Label.OTFX_DownloadDescriptionThree; 
        }
    }

    get condition1(){
        return this.selectedrows.length == 0 ? true : false;
    }

    get condition2(){
        return this.maxnum >= this.listlength ? true : false;
    }
    
    get condition3(){
        return this.filtercounter == 0 ? true : false;
    }

    get condition4(){
        return this.maxnum >= this.selectedrows ? true : false;
    }

    get getclass(){
        return this.iserror == true ? 'slds-form-element error' : 'slds-form-element';
    }

    get conditionempty(){
        return this.selectedvalue ? true : false;
    }

    get gethelpTextDropdown(){
        return this.helptextdropdown;
    }

    selectOption (evt){
        this.selectedvalue = evt.currentTarget.dataset.value;
        this.iserror = false;
    }

    @api
    handleSelection (items){  
        let selectedValues = [];
        let listValAux = this.listValues;

        this.selectedvalue = items[0];
        let valPreviuSelected = listValAux.find(value => value.selected);
        let newValSelected = listValAux.find(value => value.key == items[0]);
        selectedValues.push(items[0]);
        if (valPreviuSelected) {
            valPreviuSelected.selected = false;
            valPreviuSelected.class = 'slds-dropdown__item';
        }
        if (newValSelected) {
            newValSelected.selected = true;
            newValSelected.class = 'slds-dropdown__item slds-is-selected';
        } 
        this.listValues = [... listValAux];
        
        const selectedEvent = new CustomEvent('dropdownvalueselected', {detail: selectedValues});
        this.dispatchEvent(selectedEvent);
      
    }

    get getclass2(){
        return this.item == v.selectedvalue ? 'slds-dropdown__item slds-is-selected' : 'slds-dropdown__item';
    }

    formatLabel(str) {
        const args = Array.prototype.slice.call(arguments, 1);
        let replacements = args;
  
        if (Array.isArray(args[0])) {
          [replacements] = args;
        }
  
        return str.replace(/{(\d+)}/g, (match, i) => {
          return replacements[i];
        });
    }
    

    handleApply() {
        var selectedFormat = this.selectedvalue;
        if (selectedFormat){
            //this.showdownloadmodal= false;
            this.closeDownloadModal();
            this.iserror = false;
            const selectedEvent = new CustomEvent('applydownload', {detail: selectedFormat});
            this.dispatchEvent(selectedEvent);
        } else {
            this.iserror = true;
        }
	}
    
    handleClearAll() {
		this.selectedvalue = '';	
	}
    

}