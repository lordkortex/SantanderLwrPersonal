import { LightningElement,api, track,wire } from 'lwc';

import shortFormat from '@salesforce/i18n/dateTime.shortDateFormat';
import locale from '@salesforce/i18n/locale';
import timezone from '@salesforce/i18n/timeZone';
import uId from '@salesforce/user/Id';

export default class Lwc_displayDate extends LightningElement {
    @api date;
    @api displayeddate;
    @api dateclass;
    @api userdateformat;
    @api converttousertimezone = "true";
    
    @track dateString;
    @track format;
    @track dateToFormat;
    @track formattedDate;
    @track userId;
    @track showdisplayeddate;

    @track firstTime = false;
 
    renderedCallback() {
        if(!this.firstTime && this.template.querySelector("c-lwc_service-component") != null){  
            this.formatDate();
            this.firstTime = true;
        }
    }

    @api formatDate(){
        if(this.userdateformat != undefined){
            this.formatUserDate(this.userdateformat);
        } else {
            this.userId = uId;
            this.template.querySelector("c-lwc_service-component").onCallApex({callercomponent:'callService',controllermethod:'getUserDateFormat',actionparameters:{userId:this.userId}});
        } 
    }

    formatUserDate(response){

        // If a date format exists for the User, make use of the given format
        // If not, the Locale's short date format is used
        this.dateString = this.date;
        this.format = (response != '' && response != null) ? response : shortFormat;
        
        if(this.dateString != "N/A" && this.dateString != undefined){
            if(this.converttousertimezone){
                this.dateToFormat = new Date(this.dateString.substring(0,4), parseInt(this.dateString.substring(5,7)) - 1, this.dateString.substring(8,10), this.dateString.substring(11,13), this.dateString.substring(14,16), 0, 0 );
                this.dateToFormat.setMinutes(this.dateToFormat.getMinutes() - this.dateToFormat.getTimezoneOffset());
                this.getDateStringBasedOnTimezone(this.dateToFormat);
                if(this.formattedDate != "Invalid Date"){
                    switch(this.format){
                        case "dd/MM/yyyy" :
                            this.formattedDate = this.dateString.substring(8,10) + "/" + this.dateString.substring(5,7) + "/" + this.dateString.substring(0,4);
                            break;
                        case "MM/dd/yyyy" :
                            this.formattedDate = this.dateString.substring(5,7) + "/" + this.dateString.substring(8,10) + "/" + this.dateString.substring(0,4);
                            break;
                    }
                    this.showdisplayeddate = this.formattedDate;
                }else {
                    this.showdisplayeddate = this.dateString;
                }
                
            } else {
                this.formattedDate = "";
                switch(this.format){
                    case "dd/MM/yyyy" :
                        this.formattedDate = this.dateString.substring(8,10) + "/" + this.dateString.substring(5,7) + "/" + this.dateString.substring(0,4);
                        break;
                    case "MM/dd/yyyy" :
                        this.formattedDate = this.dateString.substring(5,7) + "/" + this.dateString.substring(8,10) + "/" + this.dateString.substring(0,4);
                        break;
                }
                this.showdisplayeddate = this.formattedDate;
            } 
        } else {
            this.showdisplayeddate = "N/A";
        }
       // console.log('showdisplayeddate::::: ', this.showdisplayeddate);
    }

    getDateStringBasedOnTimezone(dateToFormat){
        try{
            this.formattedDate = dateToFormat.toLocaleString({timeZone: timezone});		
        }catch(e){
            console.log(e);
        }
    }

    successcallback(event) {
		console.log('on successcallback');
		if(event.detail.callercomponent === 'callService'){
            console.log(event.detail);
            this.formatUserDate(event.detail.value);
		}
	}

}