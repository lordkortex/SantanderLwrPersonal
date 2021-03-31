import { LightningElement, api, wire, track } from 'lwc';

import getUserDateFormat from '@salesforce/apex/Global_Utilities.getUserDateFormat';

import selectADate from '@salesforce/label/c.selectADate';
import to from '@salesforce/label/c.to';
import enterADate from '@salesforce/label/c.enterADate';
import fom from '@salesforce/label/c.from';
import IncorrectDateFormat from '@salesforce/label/c.IncorrectDateFormat';
import fromDateLessThanToday from '@salesforce/label/c.fromDateLessThanToday';
import validationDate from '@salesforce/label/c.validationDate';

export default class CmpCalendar extends LightningElement {

    @track dateFormat = 'dd/MM/yyyy';

    @api dates;

    @api simple;

    @track condition;

    /*get condition(){
        this.cond = this.simple;
        console.log(this.cond);
        return this.cond;
    }*/

    @api get helpText(){
        return this.dateFormat;
    }
    set helpText(value){
        this.dateFormat = value;
    }
    @api get helpTextFrom(){
        return this.dateFormat;
    }
    set helpTextFrom(value){
        this.dateFormat = value;
    }
    @api get helpTextTo(){
        return this.dateFormat;
    }
    set helpTextTo(value){
        this.dateFormat = value
    }

    @api validity;
    @api validFrom;
    @api validTo;
    @api errorMessageFrom;
    @api errorMessageTo;
    @api dateFrom;
    @api dateTo;
    @api dateFromShow;
    @api dateToShow;

    selectADate = selectADate;
    from = fom;
    to = to;
    enterADate = enterADate;
    IncorrectDateFormat = IncorrectDateFormat;
    fromDateLessThanToday = fromDateLessThanToday;
    validationDate = validationDate;

    /*label = {
        selectADate,
        from,
        to,
        enterADate
    };*/


    connectedCallback() {

        if(this.simple == "true"){
            console.log("true");
            this.condition = true;
        }else{
            console.log("false");
            this.condition = false;
        }

        console.log("Entra dentro de connectedCallBack");

        console.log("SIMPLE", this.simple)

        getUserDateFormat({userId: ''}).then((result)=>{
            console.log("Dentro")
            console.log("result: " + result);
            this.validateDate();
        }).catch((error) => {
            console.log(error);
        })
        .finally(() => {
            console.log('Finally');
        })
    }

    renderedCallback(){
        console.log("Entra dentro de renderedCallback");

        console.log("SIMPLE condition", this.condition)
    }

    validateDate() {
        console.log("Dentro de validateDate");
        try {
            var dateFrom = this.dateFrom;
            var dateTo = this.dateTo;

            if(dateTo != null && dateTo != undefined && dateTo != "" && dateFrom != null && dateFrom != undefined && dateFrom != ""){
                if(dateTo<dateFrom){
                    //component.set("v.dateErrorTo","dd/mm/yyyy");
                    //component.set("v.dateTo","");
                    var toCMP = this.template.querySelector('[data-id="dateTo"]');
                    toCMP.setCustomValidity("");
                    this.helpTextTo = "";
                    toCMP.setCustomValidity(this.validationDate);
                    toCMP.reportValidity();
                }
            }
        } catch (e) {
            console.log(e);
        }
    }

    handleBlurFrom(){
        console.log("Dentro de handleBlurFrom");
        this.validity = true;

        //var fromCMP = this.template.querySelector('[data-id="dateFrom"]');
        //var toCMP = this.template.querySelector('[data-id="dateTo"]');

        var dateFrom = this.dateFrom;
        var dateTo = this.dateTo;

        console.log(dateFrom);
        console.log(dateTo);
        console.log(this.from);
        console.log(this.to);
        
        if(dateFrom == '' || dateFrom == null || dateFrom == undefined){
            dateFrom = this.from;
            //AB - 18/11/2020 - INC793
            //component.set("v.dateFrom", $A.get("$c.from"));
            this.validity = true;
            this.validFrom = true;
        }

        if(dateTo == '' || dateTo == null || dateTo == undefined){
            dateTo = this.to;
            //AB - 18/11/2020 - INC793
            //component.set("v.dateTo", $A.get("$c.to"));
            this.validity = true;
            this.validTo = true;
        }

        

        //Check if the input is date
        if(dateTo != this.to){
            if(dateTo.match("\\d{4}-\\d{2}-\\d{2}") != null){
                this.validTo = true;
            }else{
                console.log("error1");
                this.validTo = false;
                this.validity = false;
                //component.set("v.errorMessageTo",$A.get("$c.allowedDateFormat")+' '+ component.get("v.dateFormat"));
                this.errorMessageTo = this.IncorrectDateFormat;
            }
        }

        

        if(dateFrom != this.from){
            if(dateFrom.match("\\d{4}-\\d{2}-\\d{2}") != null){
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth()+1).padStart(2, '0'); //As January is 0.
                var yyyy = today.getFullYear();
                today = yyyy+'-'+mm+'-'+dd;
                if(dateFrom<= today){
                    this.validFrom = true;
                }else{
                    console.log("error2");
                    this.validFrom = false;
                    this.validity = false;
                    this.errorMessageFrom = this.fromDateLessThanToday;
                }

            }else{
                console.log("error3");
                this.validFrom = false;
                this.validity = false;
                //component.set("v.errorMessageFrom",$A.get("$c.allowedDateFormat")+' '+ component.get("v.dateFormat"));
                this.errorMessageFrom = this.IncorrectDateFormat;
            }
        }

        if(this.validFrom && dateFrom != this.from && this.validTo && dateFrom != this.to){
            if(dateTo<dateFrom){
                console.log("error4");
                this.validTo = false;
                this.validity = false;
                this.errorMessageTo = this.validationDate;
            }
        }

        console.log("ERROR", this.errorMessageFrom);
        console.log("ERROR", this.errorMessageTo);
        /*if(!check2.valid){
            component.set("v.validity",false);
            component.set("v.helpTextFrom","");
            fromCMP.setCustomValidity($A.get("$c.allowedDateFormat")) ;
            fromCMP.reportValidity();

            component.set("v.helpTextTo","dd/mm/yyyy");
            toCMP.setCustomValidity('') ;
            toCMP.reportValidity();
        }else{
            var dateFrom=component.get("v.dateFrom");
            var dateTo=component.get("v.dateTo");

            component.set("v.helpTextFrom","dd/mm/yyyy");
            fromCMP.setCustomValidity('') ;
            fromCMP.reportValidity();
            component.set("v.helpTextTo","dd/mm/yyyy");
            toCMP.setCustomValidity('') ;
            toCMP.reportValidity();

            if(dateTo!=null && dateTo !=undefined && dateTo != "" && dateFrom!=null && dateFrom !=undefined && dateFrom != ""){
                if(dateTo<dateFrom){
                    component.set("v.validity",false);

                    //component.set("v.dateErrorTo","dd/mm/yyyy");
                    //component.set("v.dateTo","");
                    toCMP.setCustomValidity('') ;
                    component.set("v.helpTextTo","");
                    toCMP.setCustomValidity($A.get("$c.validationDate")) ;
                    toCMP.reportValidity();
                }
            }            
        }
        console.log("validity "+ component.get("v.validity"));*/
    }
}