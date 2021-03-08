import { LightningElement, track } from 'lwc';

import { loadStyle, loadScript } from 'lightning/platformResourceLoader';

// Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';


import nexusAccountConverter from '@salesforce/label/c.nexusAccountConverter';
import cashNexus from '@salesforce/label/c.cashNexus';
import accountConverterRequiredId from '@salesforce/label/c.accountConverterRequiredId';
import bic from '@salesforce/label/c.bic';
import accountConverterRequiredBic from '@salesforce/label/c.accountConverterRequiredBic';
import Local from '@salesforce/label/c.Local';
import Id from '@salesforce/label/c.Id';
import currency from '@salesforce/label/c.currency';
import clear from '@salesforce/label/c.clear';
import search from '@salesforce/label/c.search';
import Create from '@salesforce/label/c.Create';
import Update from '@salesforce/label/c.Update';
import delete2 from '@salesforce/label/c.delete';
import accountConverterCreateSuccess from '@salesforce/label/c.accountConverterCreateSuccess';
import accountConverterCreateError from '@salesforce/label/c.accountConverterCreateError';
import accountConverterUpdateSuccess from '@salesforce/label/c.accountConverterUpdateSuccess';
import accountConverterUpdateError from '@salesforce/label/c.accountConverterUpdateError';
import accountConverterDeleteSuccess from '@salesforce/label/c.accountConverterDeleteSuccess';
import accountConverterDeleteError from '@salesforce/label/c.accountConverterDeleteError';
import accountConverterSearchSuccess from '@salesforce/label/c.accountConverterSearchSuccess';
import accountConverterSearchError from '@salesforce/label/c.accountConverterSearchError';

import getCurrencies from '@salesforce/apex/CNT_AccountConverter.getCurrencies';



export default class Lwc_backFrontAccountConverter extends LightningElement {

    
    Label = {
        nexusAccountConverter,
        cashNexus,      
        accountConverterRequiredId,
        bic,
        accountConverterRequiredBic,
        Local,
        Id,
        currency,
        clear,
        search,
        Create,
        Update,
        delete2,
        accountConverterCreateSuccess,
        accountConverterCreateError,
        accountConverterUpdateSuccess,
        accountConverterUpdateError,
        accountConverterDeleteSuccess,
        accountConverterDeleteError,
        accountConverterSearchSuccess,
        accountConverterSearchError
    }
    
    
    @track cashNexusIdValue = "";
    @track bicValue = "";
    @track localIdValue = "";
    @track currencyList = "";
    @track currencyValue = "";
    @track validValues
    @track params
    @track message = "";

    @track issimpledropdown = true;

    @track searchService = false;
	@track valueplaceholder = "";
    
    
    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
        this.doInit();
    }
    
    
    
    doInit() {
        this.getCurrency();
    }

    clearButton() {
        this.clear();
    }

	searchButton() {
        
        //MESSAGE CLEAN
        this.showHideMessage('errorText', null);
        this.showHideMessage('successText', null);

        //SAVE FIELD VALUES
        this.saveValues();
        
        //VALIDATIONS
        this.validateValues(false);

        //CALL FUNCTION
        if(this.validValues){
            this.search();
        }
    }

    createButton() {
        
        //MESSAGE CLEAN
        this.showHideMessage('errorText', null);
        this.showHideMessage('successText', null);

        //SAVE FIELD VALUES
        this.saveValues();
        
        //VALIDATIONS
        this.validateValues(true);

        //CALL FUNCTION
        if(this.validValues){
            this.create();
        }
    }

    updateButton() {
        
        //MESSAGE CLEAN
        this.showHideMessage('errorText', null);
        this.showHideMessage('successText', null);

        //SAVE FIELD VALUES
        this.saveValues();
        
        //VALIDATIONS
        this.validateValues(false);

        //CALL FUNCTION
        if(this.validValues){
            this.update();
        }
	}

    deleteButton() {
       
        //MESSAGE CLEAN
       this.showHideMessage('errorText', null);
       this.showHideMessage('successText', null);

       //SAVE FIELD VALUES
       this.saveValues();
       
       //VALIDATIONS
       this.validateValues(false);

       //CALL FUNCTION
        if(this.validValues){
            this.delete();
        }
	}

    getCurrency(){
        try {
            getCurrencies().then( response => {
                var res =response;
                if(res!=null && res!=undefined && res!=""){
                    this.currencyList = res;
                }
            }).catch(error => {
                var errors = error;
                    if(errors){
                        if(errors[0] && errors[0].message){
                            console.log("Error message: " + errors[0].message);
                        }
                    }else{
                    	console.log("Unknown error");
                    }
            })     
		} catch (e) {
            console.log(e);
        }
	}

    clear() {
		
		//Clean fields values.
		this.saveValues();
		this.cashNexusIdValue = "";
		this.bicValue = "";
		this.localIdValue = "";
		this.currencyValue = "";

		//Unblocking fields in case they were blocked.
		this.unblockFields();

		//Clean messages.
		this.showHideMessage('errorText', null);
		this.showHideMessage('successText', null);

		//Back to first button combo.
		this.showHideButtons('1');
	}

    saveValues() {
		this.cashNexusIdValue = this.template.querySelector('[data-id="cashNexusIdField"]').value;
		this.bicValue =	this.template.querySelector('[data-id="bicField"]').value;
		this.localIdValue =	this.template.querySelector('[data-id="localIdField"]').value;
		//this.currencyValue", 	document.getElementById("currencyField").selectedValue);
	}

	showHideButtons(comboToShow) {
		if(comboToShow != undefined && comboToShow != null){
			
			//First Screen Button combo.
			if(comboToShow == '1'){
                this.template.querySelector('[data-id="searchB"]').style="display: block";
				this.template.querySelector('[data-id="createB"]').style="display: none";
				this.template.querySelector('[data-id="updateB"]').style="display: none";
				this.template.querySelector('[data-id="deleteB"]').style="display: none";
			
			//Screen Button combo after a search without results.
			}else if(comboToShow == '2'){
				this.template.querySelector('[data-id="searchB"]').style="display: none";
				this.template.querySelector('[data-id="createB"]').style="display: block";
				this.template.querySelector('[data-id="updateB"]').style="display: none";
				this.template.querySelector('[data-id="deleteB"]').style="display: none";

			//Screen Button combo after a search with results or a creation.
			}else if(comboToShow == '3'){
				this.template.querySelector('[data-id="searchB"]').style="display: none";
				this.template.querySelector('[data-id="createB"]').style="display: none";
				this.template.querySelector('[data-id="updateB"]').style="display: block";
				this.template.querySelector('[data-id="deleteB"]').style="display: block";
			}
		}
	}

	showHideMessage(type, message){
		if(message != null){
			this.message =  message;
			this.template.querySelector('[data-id="' + type + '"]').classList.remove('slds-hide');
		}else{
			this.template.querySelector('[data-id="' + type + '"]').classList.add('slds-hide');
		}
	}

	blockFields() {
		this.template.querySelector('[data-id="cashNexusIdField"]').setAttribute("disabled","disabled");
		this.template.querySelector('[data-id="bicField"]').setAttribute("disabled","disabled");
		//document.getElementById("currencyField").setAttribute("disabled","disabled");
	}

	unblockFields() {
		this.template.querySelector('[data-id="cashNexusIdField"]').removeAttribute("disabled");
		this.template.querySelector('[data-id="bicField"]').removeAttribute("disabled");
		//document.getElementById("currencyField").removeAttribute("disabled");
	}

	validateValues(isCreation) {
		var valid = true;

		//CASHNEXUSID FIELD NOT FILLED.
		if(this.cashNexusIdValue == undefined || this.cashNexusIdValue == null || this.cashNexusIdValue == ""){
            this.template.querySelector('[data-id="requiredText1"]').classList.remove('slds-hide');
			valid = false;
		}else{
            this.template.querySelector('[data-id="requiredText1"]').classList.add('slds-hide');
		}

		//BIC FIELD NOT FILLED.
		if(this.bicValue == undefined || this.bicValue == null || this.bicValue == ""){		
            this.template.querySelector('[data-id="requiredText2"]').classList.remove('slds-hide');
	    	valid = false;
		}else{
            this.template.querySelector('[data-id="requiredText2"]').classList.add('slds-hide');
		}
		
		// if(isCreation){
		// 	//BANKID FIELD NOT FILLED.
		// 	if(this.localIdValue == undefined || this.localIdValue == null || this.localIdValue == ""){
        //         this.template.querySelector('[data-id="requiredText3"]').classList.remove('slds-hide');
		// 		valid = false;	
		// 	}else{
        //         this.template.querySelector('[data-id="requiredText3"]').classList.add('slds-hide');
		// 	}
		// }

		this.validValues =  valid;
	}

    

	generateParams(operation) {
		let params = {
			operation			: operation,
			cashNexusId 		: this.cashNexusIdVal,
			bic 				: this.bicValue,
			localId 			: this.localIdValue,
			accountCurrency 	: JSON.stringify(this.currencyValue)
		}
		this.params =  params;
	}

    search() {
		try{
			//CALL SERVICE
			this.generateParams('search');
            //component.find("Service").callApex2(component, helper,"c.callAccountServices", this.params"), this.mapResult);

            let data = {
                callercomponent : "c-lwc_back-front-account-converter",
                controllermethod : "callAccountServices",
                actionparameters : this.params,
               
            }

            this.template.querySelector('c-lwc_service-component').onCallApex(data);

            this.searchService = true;

		}catch(e){
			console.log(e);
			this.showHideMessage('errorText', this.Label.accountConverterSearchError);
		}
	}

    create() {
		try{
			//CALL SERVICE
			this.generateParams('create');
			//component.find("Service").callApex2(component, helper,"c.callAccountServices", this.params"), this.checkResponse);

            let data = {
                callercomponent : "c-lwc_back-front-account-converter",
                controllermethod : "callAccountServices",
                actionparameters : this.params,
               
            }

            this.template.querySelector('c-lwc_service-component').onCallApex(data);

		}catch(e){
			console.log(e);
			this.showHideMessage('errorText', this.Label.accountConverterCreateError);
		}
	}

    update() {
		try{
			//CALL SERVICE
			this.generateParams('update');
			//component.find("Service").callApex2(component, helper,"c.callAccountServices", this.params"), this.checkResponse);

            let data = {
                callercomponent : "c-lwc_back-front-account-converter",
                controllermethod : "callAccountServices",
                actionparameters : this.params,
               
            }

            this.template.querySelector('c-lwc_service-component').onCallApex(data);


		}catch(e){
			console.log(e);
			this.showHideMessage('errorText', this.Label.accountConverterUpdateError);
		}
    }

    delete() {
		try{
			//CALL SERVICE
			this.generateParams('delete');
			//component.find("Service").callApex2(component, helper,"c.callAccountServices", this.params"), this.checkResponse);

            let data = {
                callercomponent : "c-lwc_back-front-account-converter",
                controllermethod : "callAccountServices",
                actionparameters : this.params,
               
            }

            this.template.querySelector('c-lwc_service-component').onCallApex(data);


		}catch(e){
			console.log(e);
			this.showHideMessage('errorText', this.Label.accountConverterDeleteError);
		}
	}
    
	checkResponse(response) {
		if(response != undefined && response != null){
			if(response == 'CREATEOK'){
				this.showHideButtons('3');
				this.blockFields();
				this.showHideMessage('successText', this.Label.accountConverterCreateSuccess);

			} else if(response == 'CREATEKO'){
				this.showHideMessage('errorText', this.Label.accountConverterCreateError);

			} else if(response == 'UPDATEOK'){
				this.showHideMessage('successText', this.Label.accountConverterUpdateSuccess);

			} else if(response == 'UPDATEKO'){
				this.showHideMessage('errorText', this.Label.accountConverterUpdateError);

			} else if(response == 'DELETEOK'){
				this.clear(null, helper);
				this.showHideMessage('successText', this.Label.accountConverterDeleteSuccess);
			
			} else if(response == 'DELETEKO'){
				this.showHideMessage('errorText', this.Label.accountConverterDeleteError);
			}
		}
	}

	mapResult(response) {
		//RESULTS
		if(response != undefined && response != null && response.accounts != undefined){
			//MAP THE FIELDS
			this.cashNexusIdValue =  response.accounts[0].accountId;
			this.bicValue =  response.accounts[0].bankId;
			this.currencyValue =  response.accounts[0].accountCurrency;
			for(var i in response.accounts[0].listIds){
				if(response.accounts[0].listIds[i].idType == "BBA"){
					this.localIdValue =  response.accounts[0].listIds[i].accountId;
					break;
				}
				this.localIdValue =  response.accounts[0].listIds[i].accountId;
			}
		
			this.showHideButtons('3');
			this.blockFields();
			this.showHideMessage('successText', this.Label.accountConverterSearchSuccess);
			
		//NO RESULTS
		}else{
			this.showHideButtons('2');
			this.showHideMessage('errorText', this.Label.accountConverterSearchError);
		}
	}

    handleService(event){

        if(this.searchService){

            this.mapResult(event.detail.value)

            this.searchService = false;

        }else{

            this.checkResponse(event.detail.value);

        }

    }

    handleValueSelected(event){
        this.saveValues();
        this.currencyValue = event.detail;
    }
}