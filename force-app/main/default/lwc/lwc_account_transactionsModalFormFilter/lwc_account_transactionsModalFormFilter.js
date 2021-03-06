import {LightningElement,api,track} from 'lwc';

import { loadStyle } from 'lightning/platformResourceLoader';

//Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

//Import Apex methods
import getCurrentUserTimezoneOffSetInMiliseconds from '@salesforce/apex/Global_Utilities.getCurrentUserTimezoneOffSetInMiliseconds';


import amount from '@salesforce/label/c.amount';
import from from '@salesforce/label/c.from';
import to from '@salesforce/label/c.to';
import Country from '@salesforce/label/c.Country';
import Bank from '@salesforce/label/c.Bank';
import Account from '@salesforce/label/c.Account';
import Category from '@salesforce/label/c.Category';
import Currency from '@salesforce/label/c.currency';
import validationDate from '@salesforce/label/c.validationDate';
import bookDate from '@salesforce/label/c.bookDate';
import close from '@salesforce/label/c.close';
import advancedFilters from '@salesforce/label/c.advancedFilters';
import multipleChoice from '@salesforce/label/c.multipleChoice';
import options from '@salesforce/label/c.options';
import enterADate from '@salesforce/label/c.enterADate';
import TypeOfTransacction from '@salesforce/label/c.TypeOfTransacction';
import Debit from '@salesforce/label/c.Debit';
import MovementHistory_Credit from '@salesforce/label/c.MovementHistory_Credit';
import toAmountLowerThanFrom from '@salesforce/label/c.toAmountLowerThanFrom';
import amountLowerThanZero from '@salesforce/label/c.amountLowerThanZero';
import ClientReference from '@salesforce/label/c.ClientReference';
import WriteAClienteReference from '@salesforce/label/c.WriteAClienteReference';
import MovementHistory_Description from '@salesforce/label/c.MovementHistory_Description';
import WriteAWordOfDescription from '@salesforce/label/c.WriteAWordOfDescription';
import clearAll from '@salesforce/label/c.clearAll';
import apply from '@salesforce/label/c.apply';
import TrackUETRHelpDetails from '@salesforce/label/c.TrackUETRHelpDetails';


export default class lwc_account_transactionsModalFormFilter extends LightningElement{
    label = {
        amount,
        from,
        to,
        Country,
        Bank,
        Account,
        Category,
        Currency,
        validationDate,
        bookDate,
        close,
        advancedFilters,
        multipleChoice,
        options,
        Bank,
        enterADate,
        TypeOfTransacction,
        Debit,
        MovementHistory_Credit,
        toAmountLowerThanFrom,
        amountLowerThanZero,
        ClientReference,
        WriteAClienteReference,
        MovementHistory_Description,
        WriteAWordOfDescription,
        clearAll,
        apply,
    };

    @api dates = []; //List containing the selected dates
    @track datesBis = []; //List containing the selected dates
    @api showmodal; //Flag to close the modal
    @track simple; //Default true. Flag to indicate whether the calendar is simple or compounded (From-To)
    placeholderFrom = this.label.from; //Calendar 'From' placeholder
    placeholderTo = this.label.to; //Calendar 'To' placeholder
    @api isdisabled; //Attribute to indicate if the dropdown is disabled
    @api endofday; //Flag to show End of day / Last update
    @api isacctransactions; 
    @track showAmountError; //Flag to check if the amount error is showing
    @track showFormatError; //Flag to check if the format error is showing (number less than 0 or string)
    @api convertdatestousertimezone; //Default true. Flag to indicate whether the selected dates must be converted to ISO string based on the user's timezone
    @api isinstantaccount; //Flag to remove some of the fields in the advanced filters
    helpTextDropdown = 'Show More'; //Dropdown help text
    @api filters = []; //To store country,bank and accountNumbers
    @api transactionresults; //List of rows to show in the table
    @api formFilters = {}; //Map of filters taken from the input fields
    @api numberactivefilters = '0'; //Number of filters currently active
    @api fromdate;
    @api todate;
    @track amountBis = [];
    @track applyDate = true;
 

    get isNotAccTransactions(){
        return !this.isacctransactions;
    }

    get isCountryWithNooneChecked(){
        return this.item.name == this.label.Country && this.item.numberChecked == 0;
    }

    get isCountryWithOneChecked(){
        return this.item.name == this.label.Country && this.item.numberChecked == 1;
    }

    get isCountryWithGTOneChecked(){
        return this.item.name == this.label.Country && this.item.numberChecked > 1;
    }

    get isBankWithNooneChecked(){
        return this.item.name == this.label.Bank && this.item.numberChecked == 0;
    }

    get isBankWithOneChecked(){
        return this.item.name == this.label.Bank && this.item.numberChecked == 1;
    }

    get isBankWithGTOneChecked(){
        return this.item.name == this.label.Bank && this.item.numberChecked > 1;
    }

    get isAccountWithNooneChecked(){
        return this.item.name == this.label.Account && this.item.numberChecked == 0;
    }

    get isAccountWithOneChecked(){
        return this.item.name == this.label.Account && this.item.numberChecked == 1;
    }

    get isAccountWithGTOneChecked(){
        return this.item.name == this.label.Account && this.item.numberChecked > 1;
    }

    get isCurrencyWithNooneChecked(){
        return this.item.name == this.label.Currency && this.item.numberChecked == 0;
    }

    get isCurrencyWithOneChecked(){
        return this.item.name == this.label.Currency && this.item.numberChecked == 1;
    }

    get isCurrencyWithGTOneChecked(){
        return this.item.name == this.label.Currency && this.item.numberChecked > 1;
    }

    get isCategoryWithNooneChecked(){
        return this.item.name == this.label.Category && this.item.numberChecked == 0;
    }

    get isCategoryWithOneChecked(){
        return this.item.name == this.label.Category && this.item.numberChecked == 1;
    }

    get isCategoryWithGTOneChecked(){
        return this.item.name == this.label.Category && this.item.numberChecked > 1;
    }

    get itemNameIsCountry(){
        return this.item.name == this.label.Country;
    }

    get itemNameIsBank(){
        return this.item.name == this.label.Bank;
    }

    get itemNameIsAccount(){
        return this.item.name == this.label.Account;
    }

    get itemNameIsCurrency(){
        return this.item.name == this.label.Currency;
    }

    get itemNameIsCategory(){
        return this.item.name == this.label.Category;
    }

    get itemNameIsAmount(){
        return this.item.name == this.label.amount;
    }

    get isNotEndOfDayNorInstantAccount(){
       return !this.endofday && !this.isinstantaccount;
    }

    get isAmountErrorAndNotFormatError(){
        return this.showAmountError && !this.showFormatError;
    }

    get getDate0(){
        if(this.fromdate != null){
            return this.fromdate;
        } else if(this.dates){
            return this.dates[0];
        } else return null;
        
    }

    get getDate1(){
        if(this.todate != null){
            return this.todate;
        }else if(this.dates){
            return this.dates[1];
        }else return null; 
       
    }

    get amountZero(){
        var ret = null;
        if(this.amountBis){
         ret = this.amountBis[0];
        }

        return ret;
    }

    get amountOne(){
        var ret = null;
        if(this.amountBis){
         ret = this.amountBis[1];
        }
        return ret;
    }

    connectedCallback() {
        loadStyle(this, santanderStyle + '/style.css');
        this.doInit();
    }

    doInit () {
        this.simple = true;
        //this.convertdatestousertimezone = true;
        var dates = this.dates;

        // Only To date is filled, then fill From with -25 months
        if(dates != undefined && dates.length>0){
            if(dates[1] != undefined ){
                if(dates[1].length>10){
                    dates[1]=dates[1].split('T')[0];
                } 
            }

            if(dates[0] != undefined ){

                if(dates[0].length>10){
                    dates[0]=dates[1].split('T')[0];
                } 
            }
            this.dates = dates;
        }
        this.datesBis = this.dates;
    }


    updateDatesBis(event) {
        this.datesBis = this.dates;
    }

    closeModal() {
        this.showmodal = false;
        var filterName;
        var aux;
        const evt = new CustomEvent('clearallfilters', {
            "filterName" : filterName,
            "selectedOptions" : aux,
            "source" : "clearAll"
          });
        this.dispatchEvent(evt);
        

    }

    showDropdown(event){
        var buttonClicked = event.currentTarget.id; 
        console.log('###lwc_account_transactionsModalFormFilter ### showDropdown(event) ::: Id del Evento: '+ event.currentTarget.id);      
        if(buttonClicked ==  this.label.Country){	
            this.showDropdowns = this.label.Country;	
        }else if(buttonClicked ==  this.label.Bank){
            this.showDropdowns = this.label.Bank;
        }else if(buttonClicked ==  this.label.Account){
            this.showDropdowns = this.label.Account;
        }else if(buttonClicked ==  this.label.Category){
            this.showDropdowns = this.label.Category;
        }else if(buttonClicked ==  this.label.Currency){
            this.showDropdowns = this.label.Currency;
            
        }
    }

    checkAccounts(event) {
        var id = event.currentTarget.id
        var checked = event.currentTarget.checked;
        var accounts = this.mapFilter[2].data;
        var matchingAccount = accounts.filter(data=> data.name == id);
        matchingAccount.isChecked = checked;
        this.mapFilter[2].data = accounts;
    }

    chekOptions(event) {
        var optionId = event.currentTarget.id;
        var optionName = event.currentTarget.name;
        var checked = event.currentTarget.checked;
        var filters = this.filters;
        var selectedOptions = [];
        
        // Loop through the filters to find the checked / unchecked option and fire the selected options
        for(var key in filters){
            if(filters[key].name == optionName && filters[key].type == "checkbox"){
                filters[key].data[optionId].checked = checked;
                filters[key].numberChecked = filters[key].data.filter(option => option.checked).length;
                var selectedFilter = filters[key].name;
                if(checked){
                    selectedOptions.push(filters[key].data[optionId].value);
                }
            }
        }
        // Fire the option selection event so that the other dropdowns can be updated
        this.filters = filters;
        try{
            const onoptionselection = new CustomEvent('onoptionselection', {
                filterName : selectedFilter,
                selectedOptions : selectedOptions
            })
            this.dispatchEvent(onoptionselection);
        } catch (e) {
            console.log(e);
        }
    }

    saveData(event) {

        var amountFrom = this.template.querySelector('[data-id="AmountFrom"]');
        var amountTo = this.template.querySelector('[data-id="AmountTo"]');
        console.log(amountFrom.value + '*****' + amountTo.value);

		//var idButton = event.currentTarget.id;
		if(amountFrom != null || amountTo != null){
			var filters = JSON.parse(JSON.stringify(this.filters));
			for(var key in filters){
				if(filters[key].name == this.label.amount && amountFrom.value != undefined){
					this.showAmountError = false;
					this.showFormatError = false;

                    this.amountBis[0] = amountFrom.value;
                    
                    if(this.amountBis[1] != undefined && parseInt(this.amountBis[0]) > parseInt(this.amountBis[1])){
                        this.showAmountError = true;
                    }
                    
                } 
                if(filters[key].name == this.label.amount && amountTo.value != undefined){
                    this.showAmountError = false;
					this.showFormatError = false;

                    this.amountBis[1] = amountTo.value;
                    
                    if(this.amountBis[0] != undefined && parseInt(this.amountBis[0]) > parseInt(this.amountBis[1])){
                        this.showAmountError = true;
                    }
                }
                
			}
			
		}
        /*
        var idButton = event.currentTarget.id;
        if(idButton){
            var filters = this.filters;
            for(var key in filters){
                if(filters[key].name == this.label.amount && idButton == "AmountFrom"){
                    //Remove error
                    this.showAmountError = false;
                    this.showFormatError = false;
                    if(filters[key].selectedFilters == undefined){
                        filters[key].selectedFilters = {};
                        filters[key].selectedFilters.from = event.currentTarget.value;
                    } else if((parseInt(event.currentTarget.value) > parseInt(filters[key].selectedFilters.to)) 
                              && filters[key].selectedFilters.to != undefined && filters[key].selectedFilters.to != ""){
                        filters[key].selectedFilters.from = event.currentTarget.value;
                        // event.currentTarget.value = undefined;
                        //Show error
                        this.showAmountError = true;
                    }
                    else if(parseInt(event.currentTarget.value) < 0 || isNaN(event.currentTarget.value)){
						this.showFormatError = true;
						filters[key].selectedFilters.from = event.currentTarget.value;
					} else {
                        filters[key].selectedFilters.from = event.currentTarget.value;
                    }					
                } else if(filters[key].name == this.label.amount && idButton == "AmountTo"){
                    
                    //Remove error
                    this.showAmountError = false;
                    this.showFormatError = false;
                    
                    if(filters[key].selectedFilters == undefined){
                        filters[key].selectedFilters = {};
                        filters[key].selectedFilters.to = event.currentTarget.value;
                    } else if((parseInt(event.currentTarget.value) < parseInt(filters[key].selectedFilters.from)) 
                              && filters[key].selectedFilters.from != undefined && filters[key].selectedFilters.from != ""){
                        filters[key].selectedFilters.to = event.currentTarget.value;
                        // event.currentTarget.value = undefined;
                        //Show error
                        this.showAmountError = true;
                    } 
                    else if(parseInt(event.currentTarget.value) < 0 || isNaN(event.currentTarget.value)){
						this.showFormatError = true;
						filters[key].selectedFilters.to = event.currentTarget.value;
					}
                    else {
                        filters[key].selectedFilters.to = event.currentTarget.value;
                    }
                }
            }
            this.filters = filters;
        }*/
    }

    getFormFilters(event) {
        var inputId = event.target.id;
        var value = event.target.value;
        var check = event.target.checked;
        console.log('### lwc_account_transactionsModalFormFilter ### getFormFilters ::: Event Id: ' + event.target.id 
                                                                                      + ', value: ' + event.target.value 
                                                                                      + ', checked: ' + event.target.checked);
        if(inputId){
            if(inputId.includes("debitInput")){
                if(this.formFilters.debit==undefined || this.formFilters.debit==false){
                    this.formFilters.debit = check;
                    this.formFilters.credit = !check;
                }else{
                    this.formFilters.debit = false;
                }
            }
            if(inputId.includes("creditInput")){
                if(this.formFilters.credit==undefined || this.formFilters.credit==false){
                    this.formFilters.credit = check;
                    this.formFilters.debit = !check;
                }else{
                    this.formFilters.credit = false;
                }
            }
            if(inputId.includes("clientRefInput")){
                this.formFilters.clientRef = value;
            }
            if(inputId.includes("descriptionInput")){
                this.formFilters.description = value;
            }
            /*GAA
            switch (inputId) {
                case "debitInput" :
                    if(this.formFilters.debit==undefined || this.formFilters.debit==false){
                        this.formFilters.debit = check;
                        this.formFilters.credit = !check;
                    }else{
                        this.formFilters.debit = false;
                    }
                break;
                    case "creditInput" :
                        if(this.formFilters.credit==undefined || this.formFilters.credit==false){
                            this.formFilters.credit = check;
                            this.formFilters.debit = !check;
                        }else{
                            this.formFilters.credit = false;
                        }
                break;
                case "clientRefInput" :
                    this.formFilters.clientRef = value;
                    break;
                case "descriptionInput" :
                    this.formFilters.description = value;
                    break;
            }
        }
        */
        }
    }

    clearAll(event) {
        // Clear all filter values
        var filters = JSON.parse(JSON.stringify(this.filters));
        for(var key in filters){
            if(filters[key].type == "checkbox"){
                for(var option in filters[key].data){
                    filters[key].data[option].checked = false;
                    filters[key].numberChecked = 0;
                }
            } else if(filters[key].type == "text"){
                filters[key].selectedFilters = {"from" : '', "to" : ''};
                this.showAmountError = false;
                this.showFormatError = false;
            } else if(filters[key].type == "dates"){
                
                //Remove error
                var dateFromIn = this.template.querySelector('[data-id="dateFromInput"]');
                dateFromIn.setCustomValidity('');
                dateFromIn.reportValidity();
                
                var dateToIn = this.template.querySelector('[data-id="dateToInput"]');
                dateToIn.setCustomValidity('');
                dateToIn.reportValidity();
                this.dates = [];

                this.datesBis = [];
                this.fromdate = undefined;
                this.todate = undefined;
                filters[key].data = [];

            }
        }
        this.filters = filters;
        
        // Clear advanced filters values
        var formFilters = this.formFilters;
        var options = Object.keys(formFilters);
        for(var key in options){
            if(options[key] == "debit" || options[key] == "credit"){
                formFilters[options[key]] = false;
            } else if(options[key] == "clientRef" || options[key] == "description"){
                formFilters[options[key]] = '';
            }
        }
        this.formFilters = formFilters;
		this.numberactivefilters = 0;
		
		// Fire the event so the filters return to their initial status
        try{
            const clearallfilters = new CustomEvent('clearallfilters');
            this.dispatchEvent(clearallfilters);
        }
        catch(e){
            console.log('### lwc_account_transactionsModalFormFilter ### clearAll() ::: Error: ' + e);
        }
        this.applySearch(event);
    }
  
    validateDate(event){
        
        var bis = [];        
        
        var from = '';
        var to = '';

        if(this.template.querySelector('[data-id="dateFromInput"]') != null){
            from = this.template.querySelector('[data-id="dateFromInput"]').value;
        }
        if(this.template.querySelector('[data-id="dateToInput"]') != null){
            to = this.template.querySelector('[data-id="dateToInput"]').value;
        }
        bis.push(from);
        bis.push(to);
        this.datesBis = bis;

        
        if(to != ''){
            if(to < from)
            {
                console.log('TO menor que el FROM: ' + to +'****'+from);
                this.template.querySelector('[data-id="dateFromInput"]').setCustomValidity(this.label.validationDate);
                this.template.querySelector('[data-id="dateFromInput"]').reportValidity();
                this.applyDate = false;
            }
            else{
                this.template.querySelector('[data-id="dateFromInput"]').setCustomValidity('');
                this.template.querySelector('[data-id="dateFromInput"]').reportValidity();
                this.applyDate = true;
            }
        }
        
        this.checkDates();      
       
	}
    /*
    validateDate(event) {
        console.log('### lwc_account_transactionsModalFormFilter ### validateDate(event) ::: Fecha seleccionada: ' + event.target.value);
        console.log('### lwc_account_transactionsModalFormFilter ### validateDate(event) ::: this.dates: ' + (this.dates ? 'Vacío :(': this.dates));
        var dates = this.dates;
		this.checkDates();
        
        //Remove error
        var dateFromIn = this.template.querySelector('[data-id="dateFromInput"]');
        dateFromIn.setCustomValidity('');
        
        var dateToIn = this.template.querySelector('[data-id="dateToInput"]');
        dateToIn.setCustomValidity('');
        
        if(dates[1] < dates[0]){
            if(event.currentTarget.Id == "dateFromInput"){
                //Show error
                dateFromIn.setCustomValidity(this.label.validationDate);
                dateFromIn.reportValidity();
            } else if(event.currentTarget.Id == "dateToInput"){
                //Show error
                dateToIn.setCustomValidity(this.label.validationDate);
                dateToIn.reportValidity();
            }		
            this.dates = dates;
        }
    }*/
    
    calculateActiveFilters(event) {
        this.calculateNumberActiveFilters();
    }

	calculateNumberActiveFilters() {
		var filters = this.filters;
		var formFilters = this.formFilters;
		var filterCount = 0;
		
		// Loop through all the form filters and start counting
		for(var key in Object.keys(formFilters)){
			var filterName = Object.keys(formFilters)[key];
			if(((filterName == "debit" || filterName == "credit") && formFilters[filterName]) || ((filterName == "clientRef" || filterName == "description") && formFilters[filterName])){
				filterCount++;
			}
		}

		// Loop through all the filters and keep counting
		for(var key in filters){
			if(filters[key].type == "checkbox"){
				filterCount = filters[key].data.filter(option => option.checked).length > 0 ? filterCount+1 : filterCount;
			} else if(filters[key].type == "text"){
				filterCount = filters[key].selectedFilters != undefined && 
							((filters[key].selectedFilters.from != undefined && filters[key].selectedFilters.from != "") || (filters[key].selectedFilters.to != undefined && filters[key].selectedFilters.to != "")) ? filterCount+1 : filterCount; 
			} else if(filters[key].type == "dates"){
				if(filters[key].data.length > 0 && 
					((filters[key].data[0] != null && filters[key].data[0] != undefined) || (filters[key].data[1] != null && filters[key].data[1] != undefined))){
						filterCount++;
				} else {
					var datesBis = this.datesBis;
					filterCount = datesBis.length > 0 && 
								((datesBis[0] != null && datesBis[0] != undefined) || (datesBis[1] != null && datesBis[1] != undefined)) ? filterCount+1 : filterCount;
				}
			}
		}

		return filterCount;
	}

    checkDates(selectedFilters){
        console.log("ENTRO CDATES");
        var dates = this.datesBis;
        console.log(dates);
        // Only To date is filled, then fill From with -25 months
        if((dates[0] == undefined || dates[0] == '') && dates[1] != undefined && dates[1] != this.label.to){
            var toDate = new Date(Date.parse(dates[1]));
            var fromDate = new Date(toDate.setMonth(toDate.getMonth() - 25));
            var finalDate = "";
            var aux = toDate.getMonth() + 1;
            finalDate = fromDate.getFullYear() + "-" + aux + "-" + fromDate.getDate();
            dates[0] = finalDate;
            this.datesBis = dates;
            //helper.toggleTimeframeValue(component, true);
            // Only From date is filled, then fill until today
        } else if((dates[1] == undefined || dates[1] == '') && dates[0] != undefined && dates[0]!=this.label.from || new Date(Date.parse(dates[0])) > new Date(Date.parse(dates[1]))){
            var toDate = new Date(Date.now());
            var fromDate = new Date(Date.parse(dates[0]));
            var finalDate = "";
            if(fromDate >= toDate){
                toDate = JSON.parse(JSON.stringify(fromDate));
            }
            var aux = toDate.getMonth() + 1;
            finalDate = toDate.getFullYear() + "-" + aux + "-" + toDate.getDate();
            dates[1] = finalDate;
            this.datesBis = dates;
        }
        this.dates = dates;

        if(dates[0]!= null && dates[0]!=undefined){
            if(dates[0].dates>10){
                dates[0]=dates[0].split("T")[0];
            } 
        }else{
            this.fromDate = undefined;
        }
        if(dates[1]!= null && dates[1]!=undefined){
            if(dates[1].dates>10){
                dates[1]=dates[1].split("T")[0];
            } 
        }else{
            this.toDate = undefined;
        }
        
        if(this.convertdatestousertimezone){
            this.getISOStringFromDateString(dates, selectedFilters);
        } else {
            this.fireSelectedDates(dates, selectedFilters);
        }
    }
    /*
	checkDates(selectedFilters) {
		var dates = this.datesBis;
        // Only To date is filled, then fill From with -25 months
        console.log('### lwc_account_transactionsModalFormFilter ### checkDates() ::: dates[0]: ' + dates[0] + ', dates[1]: ' + dates[1]);
		if(dates[0] == undefined && dates[1] != undefined){

			var toDate = new Date(Date.parse(dates[1]));
			var fromDate = new Date(toDate.setMonth(toDate.getMonth() - 25));
			var finalDate = "";
			var aux = toDate.getMonth() + 1;
			finalDate = fromDate.getFullYear() + "-" + aux + "-" + fromDate.getDate();
			dates[0] = finalDate;
			this.datesBis = dates;
		// Only From date is filled, then fill until today
		} else if(dates[1] == undefined && dates[0] != undefined || new Date(Date.parse(dates[0])) > new Date(Date.parse(dates[1]))){
			var toDate = new Date(Date.now());
			var fromDate = new Date(Date.parse(dates[0]));
			var finalDate = "";
			if(fromDate >= toDate){
				toDate.setMonth(fromDate.getMonth() + 25);
			}
			var aux = toDate.getMonth() + 1;
			finalDate = toDate.getFullYear() + "-" + aux + "-" + toDate.getDate();
			dates[1] = finalDate;
			this.datesBis = dates;
		}
        this.dates = dates;

		if(dates[0]!= null && dates[0]!=undefined){

            if(dates[0].dates>10){
				dates[0]=dates[0].split("T")[0];
			} 
        }else{
            this.fromdate = undefined;
        }
        if(dates[1]!= null && dates[1]!=undefined){
            if(dates[1].dates>10){
				dates[1]=dates[1].split("T")[0];
			} 
       	}else{
        	this.todate = undefined;
		}

		// Only convert the dates to the user timezone if it's needed
		if(this.convertdatestousertimezone){
			this.getISOStringFromDateString(dates,selectedFilters);
		} else {
            this.fireSelectedDates(dates, selectedFilters);
        }
	}*/
    
    validateDates(event) {
        var dates = this.dates;

        //Remove error
        var dateFromIn = this.template.querySelector('[data-id="dateFromInput"]');
        dateFromIn.setCustomValidity('');
        
        var dateToIn = this.template.querySelector('[data-id="dateToInput"]');
        dateToIn.setCustomValidity('');

		if(dates[1] < dates[0]){
            //Show error
            dateToIn.setCustomValidity(this.label.validationDate);
            dateToIn.reportValidity();
            return false;
        }	
        return true;
    }
 
    validateAmount(event, from, to) {
        if(from != "" || to != ""){
            let x = parseInt(from);
            let y = parseInt(to);
            if(x > y) {
                this.showAmountError = true;
                return false;
            } else if((isNaN(from) && from != undefined) || (isNaN(to) && to != undefined) || x < 0 || y < 0){
				this.showFormatError = true;
                return false;
			}
        }
        return true;
	}
    
    applySearch(event) {
        var cmpParams;
        if(event && event.currentTarget && event.currentTarget.name == "clearBtn"){
            cmpParams = {button: "clear"};
        }else{
            cmpParams = {button: "filter"};
        }
        // Validate the date
        var isValidDate = true;
        var isValidAmount = true;
        
        if(this.template.querySelector('[data-id="dateFromInput"]') != undefined && this.template.querySelector('[data-id="dateToInput"]') != undefined){
            isValidDate =  this.validateDates(event);
            //comentada pedro
            /*if(this.template.querySelector('[data-id="dateFromInput"]').get(this.validity).valid==false || this.template.querySelector('[data-id="dateToInput"]').get(this.validity).valid==false){
                isValidDate=false;
            }*/      
        }

        if(isValidDate && !this.showAmountError && !this.showFormatError){
            var selectedFilters = [];
            var filters = JSON.parse(JSON.stringify(this.filters));
           // var filters = this.filters;
            var flagEvent = false;
            
            // Get the selected values from the filters
            for(var key in filters){
                if(filters[key].type == "checkbox"){
                    var selectedOptions = filters[key].data.filter(option => option.checked);
                    if(selectedOptions.length > 0){
                        var selection = {};
                        selection.value = selectedOptions;
                        selection.name = filters[key].name;
                        selection.type = "checkbox";
                        selectedFilters.push(selection);
                    }
                } else if(filters[key].type == "dates"){
                    //component.set("v.dates", component.get("v.datesBis"));
                    cmpParams.buttonClicked = "apply";
                    var selection = {};
                    selection.value = {};
                    selection.value.from = this.fromdate;//this.dates[0];//this.fromDate;
                    selection.value.to = this.todate;//this.dates[1];//this.toDate;
                    selection.name = filters[key].name;
                    selection.type = "dates";
                    if(selection.value != undefined && (selection.value.from != undefined || selection.value.to != undefined)){	
                        selectedFilters.push(selection);	
                    }
                    
                    if(selection.value.from != undefined || selection.value.from != null || selection.value.to != undefined || selection.value.to != null){
                        flagEvent=true;
                    }
                    if(this.datesBis[0] != undefined && this.datesBis[1] != undefined){
                        flagEvent=true;
                    }

                
                    // Create the selected dates string
                    //component.set("v.displayedDates", "(" + selection.value.from + " - " + selection.value.to + ")");
                } else if(filters[key].type == "text"){
                    //if(filters[key].selectedFilters != undefined){
                        var selection = {};
                        selection.value = {};
                        selection.value.from = this.amountBis[0];//filters[key].selectedFilters.from;
                        selection.value.to = this.amountBis[1];//filters[key].selectedFilters.to;
                        selection.name = filters[key].name;
                        selection.type = "text";
                        if(selection.value != undefined && (selection.value.from != "" || selection.value.to != "")){	
                            selectedFilters.push(selection);	
                        }
                        
                        var displayedAmount = "";
                        isValidAmount = this.validateAmount(selection.value.from, selection.value.to);
                        if(selection.value.from != undefined && selection.value.to == undefined){
                            var maxLabel = this.label.Max;
                            displayedAmount = "(" + selection.value.from + " - " + maxLabel + ")";
                        } else if(selection.value.to != undefined && selection.value.from == undefined){
                            var minLabel = this.label.Min;
                            displayedAmount = "(" + minLabel + " - " + selection.value.to + ")";
                        } else if(selection.value.to != undefined && selection.value.from != undefined){
                            displayedAmount = "(" + selection.value.from + " - " + selection.value.to + ")";
                        }
                    //}
                }
                // Set the display options flag to false, so the options section collapses
                if(filters[key].type != "text" || (filters[key].type == "text" && isValidAmount)){
                   // filters[key].displayOptions = false;
                   filters[key].displayFilter = false;
                }
            }
            
            // Clear the "Select one" value if there is a selected value in the drodpdown
            if(this.dropdownSelectedValue == this.label.selectOne){
                //this.toggleTimeframeValue(false);
            }
            this.filters = filters;
            //this.filtersAux = filters;
            // Fire the event, if no filter is selected then all the data must be retrieved
            if(isValidAmount){
                //cmpEvent.fire();
                console.log(flagEvent);
                if(flagEvent==false){
                    cmpParams.selectedFilters = selectedFilters;
                    if(event && event.currentTarget!=undefined){	
                        cmpParams.filterName = event.currentTarget.id.split('-')[0];	
                    }else{
                        cmpParams.filterName = cmpParams.selectedFilters[0].name;
                    }
                    const compEvent = new CustomEvent('fireadvancedfilter', {detail : {cmpParams}});
                    this.dispatchEvent(compEvent);
                    if(event) {
                        //this.toggleFilterVisibility(event);
                    }
                }else{
                    
                    if(this.applyDate){
                        if(this.fromdate != null){
                            var bis = [];
                            var f = this.fromdate.substring(0, 10);
                            var t = this.todate.substring(0, 10);
                            var labelfrom = this.template.querySelector('[data-id="dateFromInput"]').value.substring(0, 10);
                            var labelto = this.template.querySelector('[data-id="dateToInput"]').value.substring(0, 10);

                            if(f != labelfrom) bis.push(labelfrom);
                            else bis.push(f);
                            if(t != labelto) bis.push(labelto);
                            else bis.push(t);

                            this.datesBis = bis;
                        }
                        
                        this.checkDates(selectedFilters);
                        if(event) {
                            //this.toggleFilterVisibility(event);
                        }
                    }

                }
            }
        }
        //this.firstTime = false;
        //this.setFilterAux(this.filtersAux);
        
    }

    /*
    applySearch(event){ 

        var buttonParameter;
        if(event.currentTarget.id == "clearBtn"){
            buttonParameter = 'clear';    
        } else {
            buttonParameter = 'filter'; 
        }
         
        // Validate the date
        var isValidDate = this.validateDates(event);
        
        //Validate the amount
        var isValidAmount = true;
        if(isValidDate && !this.showAmountError && !this.showFormatError){
			var flagEvent = false;
            var selectedFilters = [];
            var filters = this.filters;
            
            // Get the selected values from the filters
            for(var key in filters){
                if(filters[key].type == "checkbox"){
                    var selectedOptions = filters[key].data.filter(option => option.checked);
                    if(selectedOptions.length > 0){
                        var selection = {};
                        selection.value = selectedOptions;
                        selection.name = filters[key].name;
                        selection.type = "checkbox";
                        selectedFilters.push(selection);
                    }
                } else if(filters[key].type == "dates"){
					//flagEvent=true;
                    var selection = {};
					//this.dates = this.datesBis;
                    selection.value = {};
                    selection.value.from = this.fromdate;
					selection.value.to = this.todate;
                    selection.name = filters[key].name;
					selection.type = "dates";
					if(selection.value != undefined && (selection.value.from  != undefined || selection.value.to != undefined)){
						selectedFilters.push(selection);
					}

                    // Fire the dates change event, so that the Time period dropdown can be updated
                    var dates = this.dates;
                    if(dates[0] != undefined || dates[0] != null || dates[1] != undefined || dates[1] != null){
                        flagEvent=true;
                        
                       event.preventDefault();
                       const firedateschange = new CustomEvent('firedateschange');
                       if(firedateschange) {
                        this.dispatchEvent(firedateschange);
                       }
                    }
                    if(this.datesBis[0] != undefined && this.datesBis[1] != undefined){
                        flagEvent=true;
                    }
                    
                } else if(filters[key].type == "text" && filters[key].selectedFilters != undefined){
                    if(filters[key].name == this.label.amount){
                        var from = filters[key].selectedFilters.from;
                        var to = filters[key].selectedFilters.to;
                        isValidAmount = this.validateAmount(event,from, to);
                        if(isValidAmount){
                            var selection = {};
                            selection.value = {};
                            selection.value.from = filters[key].selectedFilters.from;
                            selection.value.to = filters[key].selectedFilters.to;
                            selection.name = filters[key].name;
							selection.type = "text";
							if(selection.value != undefined && (selection.value.from != "" || selection.value.to != "")){
								selectedFilters.push(selection);
							}
                        }
                    }else{
                        var selection = {};
                        selection.value = {};
                        selection.value.from = filters[key].selectedFilters.from;
                        selection.value.to = filters[key].selectedFilters.to;
                        selection.name = filters[key].name;
						selection.type = "text";
						if(selection.value != undefined && (selection.value.from != "" || selection.value.to != "")){
							selectedFilters.push(selection);
						}
                    }
                    
                }
            }
            if(isValidAmount){
                // Get the advanced filters data as well
				var formFilters = this.formFilters;

                var options = Object.keys(formFilters);
                for(var key in options){
                    var selection = {};
                    selection.name = options[key];
                    selection.value = formFilters[options[key]];
                    selectedFilters.push(selection);
                }
                
                // Fire the event only if at least one option has been selected
				if(flagEvent==false){
                    var fireadvancedfilter = new CustomEvent('fireadvancedfilter', {
                        selectedFilters : selectedFilters,
                        button : buttonParameter
                    });
					this.dispatchEvent(fireadvancedfilter); //GAA
					var numberActiveFilters = this.calculateNumberActiveFilters();
					this.numberactivefilters = numberActiveFilters;
					this.showmodal = false;   
				}else{
					this.checkDates(selectedFilters);
				}

				
            }   
        }
    }*/

    getISOStringFromDateString(dateString, selectedFilters) {
        getCurrentUserTimezoneOffSetInMiliseconds({
            dateInput : [dateString[0],dateString[1]]
        })
        .then((results) => {
            if(results!=null && results!=undefined && results!=""){
                // Fire the event with the selected to and from filters
                this.fireSelectedDates(dateString, selectedFilters, results);
            }else{
                return null;
            }
        })
        .catch((error) => {
            console.log('### lwc_account_transactionsModalFormFilter ### getISOStringFromDateString ::: Catch error: ' + error);
        })
	}

    fireSelectedDates (dateString, selectedFilters, res){
        var from = "";
        var to = "";
        if(this.convertdatestousertimezone){
            from = this.formatDateGMT(dateString[0],res[dateString[0]], true);
            to = this.formatDateGMT(dateString[1],res[dateString[1]], false);
        } else {
            // Get the date and format it in a proper way
            for(let i in dateString){
                var dateChunks = dateString[i].split('-');
                var monthChunk = dateChunks[1];
                var dayChunk = dateChunks[2];
                if(dateChunks[1].length < 2){
                    monthChunk = "0" + dateChunks[1];
                }
                if(dateChunks[2].length < 2){
                    dayChunk = "0" + dateChunks[2]; 
                }
                dateString[i] = dateChunks[0] + '-' + monthChunk + '-' + dayChunk;
            }
            var now = new Date();	
			now.setSeconds(0,0);	
			var newTime = now.toISOString();	
            if(dateString[1] == newTime.slice(0,10)) {	
            	from = dateString[0] + "T00:00:00.000Z";	
                to = dateString[1] + newTime.slice(10,24);	
            } else {	
                from = dateString[0] + "T00:00:00.000Z";	
                to = dateString[1] + "T23:59:59.999Z";	
            }
        }
        if(selectedFilters!=undefined && dateString != undefined){
            if(selectedFilters.length>0){
                var dateFilterCreated;

                for(var f in selectedFilters){
                    var currentFilter = selectedFilters[f];
                    if(currentFilter.name == this.label.bookDate){
                        currentFilter.value.from=from;
                        currentFilter.value.to=to;
                        dateFilterCreated = true;
                    }
                    
                }
                if(!dateFilterCreated && from != '' && to != ''){
                    var selection = {};
					selection.value = {};
					selection.value.from = from;
					selection.value.to = to;
					selection.name = this.label.bookDate;
					selection.type = "dates";
					selectedFilters.push(selection);    
                }
            }else{
                var selection = {};
                selection.value = {};
                selection.value.from = from; 
                selection.value.to = to;
                selection.name = this.label.bookDate;
                selection.type = "dates";
                selectedFilters.push(selection);
            }    

            //const compEvent = new CustomEvent('firefilter', {"selectedFilters" : selectedFilters});
            var cmpParams = {};
            cmpParams.selectedFilters = selectedFilters;
            //const compEvent = new CustomEvent('firefilter', {detail : selectedFilters});
            const compEvent = new CustomEvent('fireadvancedfilter', {detail : {cmpParams}});
            this.dispatchEvent(compEvent);
            //visibilidad

        }
    }
    /*
    fireSelectedDates(dateString, selectedFilters, res) {
        var from = "";
        var to = "";
        if(this.convertdatestousertimezone){
            from = this.formatDateGMT(dateString[0],res[dateString[0]], true);
            to = this.formatDateGMT(dateString[1],res[dateString[1]], false);
        } else {
            // Get the date and format it in a proper way
            for(let i in dateString){
                var dateChunks = dateString[i].split('-');
                var monthChunk = dateChunks[1];
                var dayChunk = dateChunks[2];
                if(dateChunks[1].length < 2){
                    monthChunk = "0" + dateChunks[1];
                }
                if(dateChunks[2].length < 2){
                    dayChunk = "0" + dateChunks[2];
                }
                dateString[i] = dateChunks[0] + '-' + monthChunk + '-' + dayChunk;
            }
            from = dateString[0] + "T00:00:00.000Z";
            to = dateString[1] + "T23:59:59.999Z";
        }
        if(selectedFilters!=undefined && dateString != undefined){
            if(selectedFilters.length>0){
                var dateFilterCreated;

                for(var f in selectedFilters){
                    var currentFilter = selectedFilters[f];
                    if(currentFilter.name == this.label.bookDate){
                        currentFilter.value.from=from;
                        currentFilter.value.to=to;
                        dateFilterCreated = true;
                    }
                    
                }
                if(!dateFilterCreated && from != '' && to != ''){
                    var selection = {};
					selection.value = {};
					selection.value.from = from;
					selection.value.to = to;
					selection.name = this.label.bookDate;
					selection.type = "dates";
					selectedFilters.push(selection);    
                }
            }else{
                var selection = {};
                selection.value = {};
                selection.value.from = from;
                selection.value.to = to;
                selection.name = this.label.bookDate;
                selection.type = "dates";
                selectedFilters.push(selection);
            } 

            const fireadvancedfilter = new CustomEvent('fireadvancedfilter');
            this.dispatchEvent(fireadvancedfilter);

			var numberActiveFilters = this.calculateNumberActiveFilters();
			this.numberactivefilters = numberActiveFilters;
			this.showmodal = false;           
        }  
    }*/

    formatDateGMT(dateString, res, beginningOfDay) {					
		var timeZoneOffsetInMs = res;
		var MS_PER_HOUR = 3600000;
		var MS_PER_MIN = 60000;
		// Get the date and format it in a proper way
		var dateChunks = dateString.split('-');
		var monthChunk = dateChunks[1];
		var dayChunk = dateChunks[2];
		if(dateChunks[1].length < 2){
			monthChunk = "0" + dateChunks[1];
		}
		if(dateChunks[2].length < 2){
			dayChunk = "0" + dateChunks[2];
		}
		dateString = dateChunks[0] + '-' + monthChunk + '-' + dayChunk;
		// We have the user's locale timezone from Salesforce and a date created with the browser's timezone
		// So first we need to adapt both values
		var timezoneOffsetDate = new Date();

		var localTimezoneOffSet = timezoneOffsetDate.getTimezoneOffset()*MS_PER_MIN;
		//GET DATESTRING NO GMT

		var x = new Date(Date.parse(dateString));

		const getUTC = x.getTime();
		const offset = x.getTimezoneOffset() * 60000;
		var xx = new Date(getUTC+offset).toString();
		var newDate; 
		newDate = new Date(Date.parse(xx) - timeZoneOffsetInMs );

		if(!beginningOfDay){
			newDate.setTime(newDate.getTime() +  (MS_PER_HOUR*24));
            newDate.setTime(newDate.getTime() - 1);
		}
		var month = parseInt(newDate.getMonth())+1;
		if(month < 10){
			month = '0' + month;
		}
		var day = newDate.getDate();
		var hour=newDate.getHours();

		var mins = newDate.getMinutes();
		var secs = newDate.getSeconds();
		var msecs = newDate.getMilliseconds();
		if(hour < 10){
			hour = '0' + hour;
		}
		if(day < 10){
			day = '0' + day;
		}
		if(mins < 10){
			mins = '0' + mins;
		}
		if(secs < 10){
			secs = '0' + secs;
		}
		if(msecs > 9 && msecs < 100){
			msecs = '0' + msecs;
		} else if(msecs < 10){
			msecs = '00' + msecs;
		}
		var finalDate = newDate.getFullYear() + '-' + month + '-' + day +'T' + hour + ':' + mins + ':' + secs + '.' + msecs + 'Z';
		if(beginningOfDay){
			this.fromdate = finalDate;
		}else{
			this.todate = finalDate;
		}
		return finalDate;
    }
}