import { LightningElement, api, track } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader'; 

import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

// Import labels
import Account from '@salesforce/label/c.Account';
import clearAll from '@salesforce/label/c.clearAll';
import apply from '@salesforce/label/c.apply';
import bookDate from '@salesforce/label/c.bookDate';

export default class Lwc_historyOfStatementsSearch extends LightningElement {

    label = {
        Account,
        clearAll,
        apply,
        bookDate
    }

    @api hassearched;
    @api values = ['ARS 0112893029012348887650','ARS 0112893029012348887650',
                   'ARS 0112893029012348887650','ARS 0112893029012348887650',
                   'ARS 0112893029012348887650'];
    @api selectedaccount;
    @api dates;

    @track message = "Please, select an account";
    @track type = "warning";
    @track show;
    @track errorMessageFrom;
    @track errorMessageTo;
    @track errorMessageAccount;

    // @track _dates;

    // get dates(){
    //     return this._dates;
    // }

    // set dates(dates){
    //     if(dates){
    //         this._dates = dates;
    //     }
    // }

    get simpleCalendar(){
        return false;
    }
    
    get simpleDropdown(){
        return true;
    }

    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
    }
    
    clearButtonClicked() {

        if(this.template.querySelector('c-lwc_cn_calendar')){
            this.template.querySelector('c-lwc_cn_calendar').clearData();
        }
        if(this.dates){
            this.dates = undefined;
        }
        if(this.selectedaccount){
            this.selectedaccount = undefined;
        }
    }
    
    searchButtonClicked() {
        if(this.selectedaccount != '' && this.selectedaccount != undefined){
            this.dates = this.template.querySelector('c-lwc_cn_calendar').dates;
            var datesOK = this.checkDates();
        
            if(datesOK){
                const buttonClickedEvent = new CustomEvent("buttonclickedevent", {
                    detail: {dates: this.dates}
                });
                this.dispatchEvent(buttonClickedEvent);
            } 
            else if(!datesOK){
                this.template.querySelector('c-lwc_cn_calendar').validateDate();
            } 
        }
        else{
            this.show = true;
        }
    }

    checkDates(){
		var dates = this.dates;
		var datesOK = true;
		this.errorMessageFrom = '';
		this.errorMessageTo = '';

        if(dates){
            if(dates[0] != undefined && dates[1] != undefined){
                var dateFromCheck = new Date(dates[0] + 'T00:00:00.000Z');
                var dateToCheck = new Date(dates[1] + 'T00:00:00.000Z');

                var toDate = new Date(Date.now());
                toDate.setDate(toDate.getDate() -2 );

                var fromDate = new Date(toDate.setMonth(toDate.getMonth() - 25));

                var toDate2 = new Date(Date.now());
                toDate2.setDate(toDate2.getDate() -1);

                if(dateFromCheck.getTime() > dateToCheck.getTime()){
                    console.log("comprobacion2");
                    this.errorMessageTo = 'From date cannot be higher than to date';
                    datesOK = false;
                } 
            }
            // If two dates are empty, TO date becomes yesterday and from date is 2 years ago
            else if(dates[0] == undefined && dates[1] == undefined){
                var toDate = new Date(Date.now());
                toDate.setDate(toDate.getDate() -1);

                var fromDate = new Date(toDate.setMonth(toDate.getMonth() - 25));

                var toDate2 = new Date(Date.now());
                toDate2.setDate(toDate2.getDate() -1);

                var toDateFinal = toDate2.getFullYear() + "-" + (toDate2.getMonth() +1) + "-" + toDate2.getDate();
                var fromDateFinal = fromDate.getFullYear() + "-" + (fromDate.getMonth() + 1) + "-" + fromDate.getDate();

                dates[0] = fromDateFinal;
                dates[1] = toDateFinal;
                this.dates = dates;
            }
            else if(dates[0] == undefined && dates[1] != undefined){
                var toDate = new Date(Date.parse(dates[1]));
                var fromDate = new Date(toDate.setMonth(toDate.getMonth() - 25));
                var finalDate = "";
                var aux = toDate.getMonth() + 1;
                finalDate = fromDate.getFullYear() + "-" + aux + "-" + fromDate.getDate();
                dates[0] = finalDate;
                this.dates = dates;

            // Only From date is filled, then fill until today
            } else if(dates[1] == undefined && dates[0] != undefined){
                var toDate = new Date(Date.now());
                //toDate.setDate(toDate.getDate() -2);

                var fromDate = new Date(Date.parse(dates[0]));
                var finalDate = "";
                /*if(fromDate >= toDate){
                    toDate.setMonth(fromDate.getMonth() + 25);
                }*/
                var aux = toDate.getMonth() + 1;
                finalDate = toDate.getFullYear() + "-" + aux + "-" + toDate.getDate();
                dates[1] = finalDate;
                this.dates = dates;
            }
        }
        else{
            var toDate = new Date(Date.now());
            toDate.setDate(toDate.getDate() -1);

            var fromDate = new Date(toDate.setMonth(toDate.getMonth() - 25));

            var toDate2 = new Date(Date.now());
            toDate2.setDate(toDate2.getDate() -1);

            var toDateFinal = toDate2.getFullYear() + "-" + (toDate2.getMonth() +1) + "-" + toDate2.getDate();
            var fromDateFinal = fromDate.getFullYear() + "-" + (fromDate.getMonth() + 1) + "-" + fromDate.getDate();

            dates = [];
            dates[0] = fromDateFinal;
            dates[1] = toDateFinal;
            this.dates = dates;
        }
		return datesOK;
	}

    handleDropdownValueSelected(event){
        this.selectedaccount = event.detail[0];

        const selectedEvent = new CustomEvent('dropdownvalueselected', {detail: this.selectedaccount});
        this.dispatchEvent(selectedEvent);
    }
}