import { LightningElement, api, track } from 'lwc';

//Labels
import selectADate from '@salesforce/label/c.selectADate';
import fromlabel from '@salesforce/label/c.from';
import to from '@salesforce/label/c.to';
import ddmmyy from '@salesforce/label/c.ddmmyy';
import enterADate from '@salesforce/label/c.enterADate';
import allowedDateFormat from '@salesforce/label/c.allowedDateFormat';

//Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import shortFormat from '@salesforce/i18n/dateTime.shortDateFormat'

export default class Lwc_cn_calendar extends LightningElement {
    
    label = {
        selectADate,
        fromlabel,
        to,
        ddmmyy,
        enterADate,
        allowedDateFormat

    }

    @api datefrom;
    @api dateto;
    @api dates;                                          //description="List containing the selected dates. The dates format must be yyyy/mm/dd"/>
    @api simple;                                         //description="Flag to indicate whether the calendar is simple or compounded (From-To)"/>
    @api hasseparation;                        //description="flag to check if calendars have separation" />
    @api placeholdersingle = this.label.selectADate;     //description="Date placeholder for single calendar"/>
    @api placeholderfrom =  this.label.fromlabel;        //description="Calendar 'From' placeholder"/>
    @api placeholderto = this.label.to;                  //description="Calendar 'To' placeholder"/>
    @api errormessagefrom = '';                        //description="String that contains the error message of the from calendar" 
    @api errormessageto = '';                          //description="String that contains the error message of the to calendar"
    @api autocomplete = "on";                          //description="String that contains the error message of the to calendar" />
    
    @track helpText = shortFormat;                      //description="Calendar help text"/>
    @track helpTextFrom = this.label.ddmmyy;             //description="Calendar help text"/>
    @track helpTextTo = this.label.ddmmyy;               //description="Calendar help text"/>  
    @track fromCMP;
    @track toCMP;
    @track check2;
    @track check1;

    _datefrom = '';
    _dateto = '';
    _simple = true;
    _dates = [];

    get datefrom(){
        return this._datefrom;
    }
    
    set datefrom(datefrom){
        if(datefrom){
            this._datefrom = datefrom;
            this.validateDate();
        }
    }

    get dateto(){
        return this._dateto;
    }
    
    set dateto(dateto){
        if(dateto){
            this._dateto = dateto;
            this.validateDate();
        }
    }

    get simple(){
        return this._simple;
    }
    
    set simple(simple){
        if(simple != undefined){
            this._simple = simple;
        }
    }

    get dates(){
        return this._dates;
    }

    set dates(dates){
        if(dates){
            this._dates = JSON.parse(JSON.stringify(dates));
        }
        else{
            this._dates = undefined;
        }
    }

    get getCalendarClass(){
        return (this.hasseparation ? 'slds-form slds-form_compound calendar calendar--double flexedCalendars' : 'slds-form slds-form_compound calendar calendar--double');
    }

    get getCalendarClass2(){
        return(this.hasseparation ? 'slds-form-element calendarSeparated' : 'slds-form-element calendar');
    }

    get getDates(){
        if(this._dates){
            return this._dates[0];
        }
    }

    get getDates1(){
        if(this._dates){
            return this._dates[1];
        }
    }

    connectedCallback() {
        loadStyle(this, santanderStyle + '/style.css');
    }

    @api
    validateDate() {
        try{
            var error='ok';
            var dateFrom = this._dates[0];
            var dateTo = this._dates[1];

            if(dateTo!=null && dateTo !=undefined && dateTo != '' && dateFrom!=null && dateFrom !=undefined && dateFrom != ''){
                if(dateTo<dateFrom){
                    this.dateErrorTo = 'dd/mm/yyyy';
                    this._dateto = '';
                    this.errormessagefrom = 'From date cannot be higher than to date';
                    error='error';
                    this.displayErrorFrom();
                }
            }

            if(error=='ok'){
                //No se encuentra en el helper
                // helper.refreshPills(component, event, helper);
                //this.refreshPills();
            }
        } catch (e) {
            console.log(e);
        }
    }

    handleBlurFrom (){
        this.fromCMP = this.template.querySelector('[data-id="dateFrom"]');
        
        this.fromCMP.setCustomValidity('');
        this.check2 = this.fromCMP.validity;

        if(!this.check2.valid){
            this.helpTextFrom = '';
            this.fromCMP.setCustomValidity(this.label.allowedDateFormat + " " +  shortFormat) ;
        }else{
            if(!this._dates){
                this._dates = []; 
                this._dates[0] = this.fromCMP.value;
            }
            else{
                this._dates[0] = this.fromCMP.value;
            }
            this.helpTextFrom = 'dd/mm/yyyy';
            this.fromCMP.setCustomValidity('') ;
        }
        this.fromCMP.reportValidity();
    }

	handleBlurTo (){
        this.toCMP = this.template.querySelector('[data-id="dateTo"]');

        this.toCMP.setCustomValidity('');
        this.check1 = this.toCMP.validity;

        if(!this.check1.valid){
            this.helpTextTo = '';
            this.toCMP.setCustomValidity(this.label.allowedDateFormat + " " +shortFormat) ;

        }else{
            if(!this._dates){
                this._dates = []; 
                this._dates[1] = this.toCMP.value;
            }
            else{
                this._dates[1] = this.toCMP.value;
            }
            this.toCMP.setCustomValidity('') ;
            this.helpTextTo = 'dd/mm/yyyy';
        }
        this.toCMP.reportValidity();
    }

    displayErrorFrom (){
        var fromCMP = this.template.querySelector('[data-id="dateFrom"]');
        fromCMP.setCustomValidity(this.errormessagefrom);
        fromCMP.reportValidity();
        
    }

    displayErrorTo(){
        var toCMP = this.template.querySelector('[data-id="dateTo"]');
        toCMP.setCustomValidity(this.errormessageto);
        toCMP.reportValidity();
    }
}