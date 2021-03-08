import { LightningElement, api, track} from 'lwc';
import {loadStyle, loadScript } from 'lightning/platformResourceLoader';

import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

// Import labels
import search from '@salesforce/label/c.search';

// Import apex class
import fetchLookUpValues from '@salesforce/apex/CNT_CustomLookup.fetchLookUpValues';

export default class Lwc_customLookup extends LightningElement {

    Label = {
        search
    }

    @api selectedrecord;
    @api objectapiname;
    @api iconname;
    @api label;

    @track listOfSearchRecords = [];
    @track searchKeyWord;
    @track message;

    _selectedrecord;

    get selectedrecord(){
        return this._selectedrecord;
    }

    set selectedrecord(selectedrecord){
        this._selectedrecord = selectedrecord;
        this.clearPill();
}

    get getListOfSearchRecords(){
        var listAux = this.listOfSearchRecords;
        if(listAux){
            Object.keys(listAux).forEach( key => {
                listAux[key].index = key;
            });
        }
        
        return listAux;
    }

    get inputClass(){
        return "slds-lookup__search-input slds-input leftPaddingClass lwc_input";
    }

    connectedCallback(){
        loadStyle(this, santanderStyle +'/style.css');
    }

    doOnfocus(){
        this.template.querySelector('[data-id="mySpinner"]').classList.add("slds-show");
        var forOpen = this.template.querySelector('[data-id="searchRes"]');
        forOpen.classList.add("slds-is-open");
        forOpen.classList.remove("slds-is-close");

        // Get Default 5 Records order by createdDate DESC  
        var getInputkeyWord = '';
        this.searchHelper(getInputkeyWord);
    }

    doOnblur(){       
        this.listOfSearchRecords = null;
        var forclose = this.template.querySelector('[data-id="searchRes"]');
        forclose.classList.add("slds-is-close");
        forclose.classList.remove("slds-is-open");
    }

    keyPressController() {
        // get the search Input keyword   
        var getInputkeyWord = this.searchKeyWord;
        // check if getInputKeyWord size id more then 0 then open the lookup result List and 
        // call the helper 
        // else close the lookup result List part.   
        if(getInputkeyWord.length > 0 ){
            var forOpen = this.template.querySelector('[data-id="searchRes"]');
            forOpen.classList.add("slds-is-open");
            forOpen.classList.remove("slds-is-close");
            this.searchHelper(getInputkeyWord);
        }
        else{  
            this.listOfSearchRecords = null; 
            var forclose = this.template.querySelector('[data-id="searchRes"]');
            forclose.classList.add("slds-is-close");
            forclose.classList.remove("slds-is-open");
        }
     }
     
    // function for clear the Record Selaction 
    clear(){
        var pillTarget = this.template.querySelector('[data-id="lookup-pill"]');
        var lookUpTarget = this.template.querySelector('[data-id="lookupField"]');
        
        pillTarget.classList.add("slds-hide");
        pillTarget.classList.remove("slds-show");
        
        lookUpTarget.classList.add("slds-show");
        lookUpTarget.classList.remove("slds-hide");

        this.searchKeyWord = null;
        this.listOfSearchRecords = null;
        this._selectedrecord = {};   
    }

    clearPill(){
        if(this._selectedrecord == {} || this._selectedrecord == undefined){

            var pillTarget = this.template.querySelector('[data-id="lookup-pill"]');
            var lookUpTarget = this.template.querySelector('[data-id="lookupField"]');
            
            if(pillTarget){
                pillTarget.classList.add("slds-hide");
                pillTarget.classList.remove("slds-show");
            }

            if(lookUpTarget){
                lookUpTarget.classList.add("slds-show");
                lookUpTarget.classList.remove("slds-hide");
            }

            this.searchKeyWord = null;
            this.listOfSearchRecords = null;
            this._selectedrecord = {};   
        }
    }
     
    // This function call when the end User Select any record from the result list.   
    handleComponentEvent(event) {
    // get the selected Account record from the COMPONETN event 	 
        var selectedAccountGetFromEvent = event.detail.recordByEvent;
        this._selectedrecord = selectedAccountGetFromEvent; 

        var forclose = this.template.querySelector('[data-id="lookup-pill"]');
        forclose.classList.add("slds-show");
        forclose.classList.remove("slds-hide");

        var forclose = this.template.querySelector('[data-id="searchRes"]');
        forclose.classList.add("slds-is-close");
        forclose.classList.remove("slds-is-open");

        var lookUpTarget = this.template.querySelector('[data-id="lookupField"]');
        lookUpTarget.classList.add("slds-hide");
        lookUpTarget.classList.remove("slds-show");

        const valueSelectedEvent = new CustomEvent("valueselected", {
            detail: {selectedValue: selectedAccountGetFromEvent}
        });
        this.dispatchEvent(valueSelectedEvent);
    }

    searchHelper(getInputkeyWord) {
        // set param to method  
        fetchLookUpValues({
            'searchKeyWord': getInputkeyWord,
            'ObjectName' : this.objectapiname
        })
        .then( result => {
            this.template.querySelector('[data-id="mySpinner"]').classList.remove("slds-show");
            var storeResponse = result;
            // if storeResponse size is equal 0 ,display No Result Found... message on screen.                }
            if (storeResponse.length == 0) {
                this.Message = 'No Result Found...';
            } else {
                this.Message = '';
            }
            // set searchResult list with return value from server.
            this.listOfSearchRecords = storeResponse;
        })
        .catch( error => {
            this.template.querySelector('[data-id="mySpinner"]').classList.remove("slds-show");
            console.log(error);
        });
    }
}