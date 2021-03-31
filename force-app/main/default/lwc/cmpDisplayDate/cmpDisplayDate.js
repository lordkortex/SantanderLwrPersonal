import { LightningElement, api, wire, track } from 'lwc';
import { getRecord,getFieldValue, getFieldDisplayValue } from 'lightning/uiRecordApi';
import getUserDateFormat from '@salesforce/apex/Global_Utilities.getUserDateFormat';

import SHORTDATEFORMAT from '@salesforce/i18n/dateTime.shortDateFormat';

import TIMEZONE from '@salesforce/i18n/timeZone';

import LOCALE from '@salesforce/i18n/locale';

import uId from '@salesforce/user/Id';
import USERFORMATDATE from '@salesforce/schema/User.User_DateFormat__c';

export default class cmpDisplayDate extends LightningElement {

    @api date;
    @api dateClass;
    @api convertToUserTimezone;
    @api displayedDate;

    @wire (getRecord, { recordId: uId, fields: [USERFORMATDATE] }) 
    usuarioDate;

    
    get userFormDate(){
        return getFieldValue(this.usuarioDate.data, USERFORMATDATE);
    }

    
    @track miFormato;

    @api
    get userFormat(){
        return this.miFormato;

    }
    set userFormat(value){
        this.miFormato = value;
    }
 
    connectedCallback(){
        console.log("entro en connected DATE");
        /*Promise.all(this.devolver()).then(() => {
            console.log("entro en Promise");

            this.formatUserDatahelper();
        })
        .catch((error) => {
            console.log("ERROR");
        });*/
        //this.formatUserDatahelper();
        this.buscaFormato();

    }

    buscaFormato(){
        getUserDateFormat({userId: uId}).then((result)=>{
            console.log("result: " + result);
            this.userFormat=result;
            this.formatUserDatahelper();
        }).catch((error) => {
            console.log(error);
        })
        .finally(() => {
            console.log('Finally');
        })
    }


    renderedCallback() {
        console.log("entro en rendered DATE");
    }

    formatUserDatahelper(){
        console.log("entro en format");
        console.log(this.userFormDate);
        console.log("usuario: ", this.usuarioDate);

        if (this.userFormDate != undefined){
            console.log("ha entrado en el IF userFormDate");

            var userDateFormat = this.userFormDate;

            var dateString = this.date;
            console.log("Date: ", this.date);
            var format = (userDateFormat != '' && userDateFormat != null) ? userDateFormat : SHORTDATEFORMAT;
            
            if(dateString != "N/A" && dateString != undefined){
                if(this.convertToUserTimezone == "true"){
                    console.log("NEW DATE, true");
                    var dateToFormat = new Date(dateString.substring(0,4), parseInt(dateString.substring(5,7)) - 1, dateString.substring(8,10), dateString.substring(11,13), dateString.substring(14,16), 0, 0 );
                    dateToFormat.setMinutes(dateToFormat.getMinutes() - dateToFormat.getTimezoneOffset());
                    console.log("date: ",dateToFormat);
                    console.log("TIMEZONE", TIMEZONE);
                    LOCALE.getDateStringBasedOnTimezone(TIMEZONE, dateToFormat, (formattedDate)=>{
                        if(formattedDate != "Invalid Date"){
                            switch(format){
                                case "dd/MM/yyyy" :
                                    formattedDate = formattedDate.substring(8,10) + "/" + formattedDate.substring(5,7) + "/" + formattedDate.substring(0,4);
                                    break;
                                case "MM/dd/yyyy" :
                                    formattedDate = formattedDate.substring(5,7) + "/" + formattedDate.substring(8,10) + "/" + formattedDate.substring(0,4);
                                    break;
                            }
                            this.displayedDate = formattedDate;

                            console.log("RESULTADO: ", this.displayedDate);
                        } else {
                            this.displayedDate = dateString;
                        }
                    });
                    
                } else {
                    console.log("false")
                    var formattedDate = "";
                    switch(format){
                        case "dd/MM/yyyy" :
                            formattedDate = dateString.substring(8,10) + "/" + dateString.substring(5,7) + "/" + dateString.substring(0,4);
                            break;
                        case "MM/dd/yyyy" :
                            formattedDate = dateString.substring(5,7) + "/" + dateString.substring(8,10) + "/" + dateString.substring(0,4);
                            break;
                    }
                    this.displayedDate = formattedDate;

                    console.log("RESULTADO: ", this.displayedDate);
                } 
            } else {
                this.displayedDate = "N/A";
            }
        }
        
    }

}