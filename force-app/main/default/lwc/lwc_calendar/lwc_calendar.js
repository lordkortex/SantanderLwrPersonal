import { LightningElement,api, track} from 'lwc';

import enterADate from '@salesforce/label/c.enterADate';
import selectADate from '@salesforce/label/c.selectADate';
import validationDate from '@salesforce/label/c.validationDate';
import from from '@salesforce/label/c.from';
import to from '@salesforce/label/c.to';
import IncorrectDateFormat from '@salesforce/label/c.IncorrectDateFormat';
import fromDateLessThanToday from '@salesforce/label/c.fromDateLessThanToday';

import shortFormat from '@salesforce/i18n/dateTime.shortDateFormat';

export default class Lwc_calendar extends LightningElement {
    // Expose the labels to use in the template.
	label = {
        enterADate,
        selectADate,
        validationDate,
        from,
        to,
        IncorrectDateFormat,
        fromDateLessThanToday
	};
    // Attributes
    @api dateformat = shortFormat;
    @api dates;
    @api simple = false;
    @api helptext;
    @api placeholdersingle = this.label.selectADate;
    @api placeholderfrom = this.label.from;
    @api placeholderto = this.label.to;
    @api helptextfrom;
    @api helptextto;
    @api validity = "true";
    @api datefrom = "";
    @api dateto = "";

    @api dateszero;
    
    _dateFrom = "";
    _dateTo = "";

    get datefrom(){
        return this._dateFrom;
    }

    set datefrom(dateFrom){
        this._dateFrom = dateFrom;
    }

    get dateto(){
        return this._dateTo;
    }

    set dateto(dateTo){
        this._dateTo = dateTo;
    }

    connectedCallback() {
        if(this.dates){
            this.dateszero = this.dates[0]; 
        }else{
            this.dateszero = "2020-11-26"; //yyyy/mm/dd
        }
         
        //this.datesZero = "2013-08-01";
        console.log(this.dateszero);

        //this.helpText = this.dateFormat;
        //this.helpTextFrom = this.dateFormat;
        //this.helpTextTo = this.dateFormat;
    }


    @track fromCMP;
    @track toCMP;
    @track check2;
    @track check1;
        
    
    handleBlurFrom() {
        this.validity = true;
        this.fromCMP = this.template.querySelector('[data-id="dateFrom"]');
        this.toCMP = this.template.querySelector('[data-id="dateTo"]');
        this.fromCMP.setCustomValidity('');

        this.check2 = this.fromCMP.validity;
        if(!this.check2.valid){
            this.validity = false;
            //this.helptext = "";
            this.fromCMP.setCustomValidity(this.label.IncorrectDateFormat);
            this.fromCMP.reportValidity();
            //this.helptextto = this.dateFormat;
            if(this.toCMP){
                this.toCMP.setCustomValidity('');
                this.toCMP.reportValidity();
            }
        }else{
            this._dateFrom = new Date(this.fromCMP.value);
            //this.helptextfrom = this.dateFormat;
            this.fromCMP.setCustomValidity('') ;
            this.fromCMP.reportValidity();
            //this.helpTextTo = this.dateFormat;
            if(this.toCMP){
                this.toCMP.setCustomValidity('') ;
                this.toCMP.reportValidity();
            }

            var fromCap = this.template.querySelector('[data-id="dateFrom"]').value;
            var toCap = this.template.querySelector('[data-id="dateTo"]').value;
            if(fromCap!= '' && toCap != ''){
                if(fromCap > toCap){
                    this.helptextfrom = this.label.fromDateLessThanToday;
                }
                else{
                    this.helptextfrom = 'dd/MM/yyyy';
                }
            }

            /*
            if(this._dateTo!=null && this._dateTo !=undefined && this._dateTo != "" && this._dateFrom!=null && this._dateFrom !=undefined && this._dateFrom != ""){
                //if(this._dateTo<this._dateFrom){
                    this.validity = false;
                    this.toCMP.setCustomValidity('') ;
                    //this.helptextto = "";
                    this.toCMP.setCustomValidity(this.label.validationDate);
                    this.toCMP.reportValidity();
               // }
            } */ 
            this.dispatchChangeDate(this._dateFrom, "datechangefrom");  
                  
        }
        console.log("validity "+ this.validity);
    }


    handleBlurTo() {
        this.validity = true;
        this.fromCMP = this.template.querySelector('[data-id="dateFrom"]');
        this.toCMP = this.template.querySelector('[data-id="dateTo"]');
        this.toCMP.setCustomValidity('') ;
        this.check1 = this.toCMP.validity;

        if(!this.check1.valid){
            this.validity = false;
            //this.helptextto = "";
            this.toCMP.setCustomValidity(this.label.IncorrectDateFormat);
        }else{
            this._dateTo = new Date(this.toCMP.value);
            //this.helptextto = this.dateFormat;
            this.toCMP.setCustomValidity('') ;

            var fromCap = this.template.querySelector('[data-id="dateFrom"]').value;
            var toCap = this.template.querySelector('[data-id="dateTo"]').value;
            if(fromCap!= '' && toCap != ''){
                if(fromCap > toCap){
                    this.helptextfrom = this.label.fromDateLessThanToday;
                }
                else{
                    this.helptextfrom = 'dd/MM/yyyy';
                }
            }

            if(this._dateTo!=null && this._dateTo !=undefined && this._dateTo != '' && this._dateFrom!=null && this._dateFrom !=undefined && this._dateFrom != ''){
                if(this._dateTo<this._dateFrom){
                    this.validity = false;
                    this.toCMP.setCustomValidity('');
                    this.helptextto = "";
                    this.toCMP.setCustomValidity(this.label.validationDate);
                }
            }
            this.dispatchChangeDate(this._dateTo, "datechangeto"); 
        }
        console.log("validity "+ this.validity);
        this.toCMP.reportValidity();
    }   
    
    dispatchChangeDate(date, nameDate) {
        this.dispatchEvent(new CustomEvent(nameDate, { 'detail': date }))
    }
}