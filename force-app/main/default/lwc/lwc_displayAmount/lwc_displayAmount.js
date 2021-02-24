import {LightningElement,api,track} from 'lwc';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import currentUserId from '@salesforce/user/Id'; // Get UserID
import isGuest from '@salesforce/user/isGuest'; // Get UserID

//Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

//Import scripts
import numeralScript from '@salesforce/resourceUrl/NumeralJs';

//Import methods
//import callApex2 from '@salesforce/Apex/c.onCallApex2';
import getUserNumberFormat from '@salesforce/apex/Global_Utilities.getUserNumberFormat';
import getCurrentUserTimezoneOffSetInMiliseconds from '@salesforce/apex/CNT_StatementHistoryController.getCurrentUserTimezoneOffSetInMiliseconds';

export default class lwc_displayAmount extends LightningElement{
    @api arescriptsloaded = 'arescriptsloaded';
    @api fromgpi = 'fromgpi';
    @api numberformat = 'numberformat';
    @api numberofdec = 'numberofdec';
    @api wholedecimal = false;
    @api userformat = 'userformat';
    @api toshow = 'toshow';
    @api currency;
    @api amount = 'amount';
    @api amountd = 'amount';
    @track whole = 'whole';
    @track decimal = 'decimal';
    @api wholeclass = 'wholeclass';
    @api decimalclass = 'decimalclass';
    @api currencyclass = 'currencyclass';
    userId = currentUserId;
    isGuestUser = isGuest;
    
    /*connectedCallback() {
        console.log('********** connectedCallback lwc_displayAmount.....');

        loadStyle(this, santanderStyle + '/style.css');
        loadScript(this, numeralScript + '/numeralJs/numeral.js')
        .then(() => {
            this.formatAmountNumeral();
        })
        .catch(error => {
            console.log('failed.....'+error);
        });
    }*/

    renderedCallback() {
        console.log('renderedCallback');
        loadStyle(this, santanderStyle + '/style.css');
        loadScript(this, numeralScript + '/numeralJs/numeral.js')
        .then(() => {
            this.formatAmountNumeral();
        })
        .catch(error => {
            console.log('failed.....'+error);
        });
    }

    formatAmount() {
        if(this.fromgpi == false){
            this.formatAmountHelper();
        }
    }
    
    formatAmountNumeral(event){
        if(event){
            var params = event.arguments;
        }
        
        if(params != undefined){
            
            this.numberformat = params.numberformat;
        }
        if(this.fromgpi==false){
            if(this.numberformat != undefined && this.numberformat != 'undefined' ){
                this.setData(this.numberformat);
            }else{
                this.formatNumber();
            }
            
        }else{
            this.setData(this.numberformat);
        }
    }

    //Métodos del helper
    formatAmountHelper(){
        //Currently all the code is commented
    }

    /*@api
    setAmount(amountInput){
        console.log('Set Amount');
        this.amountTrack = amountInput;
        this.amount  =  this.amountTrack;
    }*/


    @api
    formatNumber(){
        //REGISTER FIRST LOCALE
        if (Object.keys(numeral.locales).length == 1) {
            numeral.register('locale', 'type1',
                {
                    delimiters: {
                        thousands: '.',
                        decimal: ','
                    },
                    abbreviations:
                    {
                        thousand: 'K',
                        million: 'M',
                        billion: 'B',
                        trillion: 'T'
                    },
                    ordinal: function (number) {
                        return '';
                    },
                    currency:
                    {
                        symbol: '€'
                    }
                });

            //REGISTER SECOND LOCALE
            numeral.register('locale', 'type2',
                {
                    delimiters: {
                        thousands: ',',
                        decimal: '.'
                    },
                    abbreviations:
                    {
                        thousand: 'K',
                        million: 'M',
                        billion: 'B',
                        trillion: 'T'
                    },
                    ordinal: function (number) {
                        return '';
                    },
                    currency:
                    {
                        symbol: '€'
                    }
                });

        }
																																								 
													  
																
        this.template.querySelector("c-lwc_service-component").onCallApex({
            callercomponent:'callServiceDisplayAmount', 
            controllermethod: 'getUserNumberFormat', 
            actionparameters: {
                userId: this.userId
            }
        });
    }

    successcallback(event){
										  
        if(event.detail.callercomponent === 'callServiceDisplayAmount'){
            console.log('Event details: ' + event.detail);
            this.setData(event.detail.value);
        }
    }

    setData(response){
        //var amount;
        if (this.amount != undefined) {
            this.amount = this.amount.toString().replace(',', '.');
        }
        this.userformat = response;

        //REGISTER FIRST LOCALE
        if (Object.keys(numeral.locales).length == 1) {
            numeral.register('locale', 'type1',
                {
                    delimiters: {
                        thousands: '.',
                        decimal: ','
                    },
                    abbreviations:
                    {
                        thousand: 'K',
                        million: 'M',
                        billion: 'B',
                        trillion: 'T'
                    },
                    ordinal: function (number) {
                        return '';
                    },
                    currency:
                    {
                        symbol: '€'
                    }
                });

            //REGISTER SECOND LOCALE
            numeral.register('locale', 'type2',
                {
                    delimiters: {
                        thousands: ',',
                        decimal: '.'
                    },
                    abbreviations:
                    {
                        thousand: 'K',
                        million: 'M',
                        billion: 'B',
                        trillion: 'T'
                    },
                    ordinal: function (number) {
                        return '';
                    },
                    currency:
                    {
                        symbol: '€'
                    }
                });

        }
        //  }

        if (response == '###.###.###,##') {
            numeral.locale('type2');
        } else {
            numeral.locale('type1');
        }

        if (this.amount != undefined) {
            var splitted = this.amount.split(".");

            if (splitted[0] != undefined) {
                this.whole = numeral(splitted[0]).format('0,0');

            }
            var v_wholeDecimal = this.wholedecimal;
            if (!v_wholeDecimal) {
                if (splitted[1] != undefined) {
                    var a = parseFloat('1.' + splitted[1]);
                    this.decimal = numeral(a).format('.00');
                }
                else {
                    this.decimal = numeral(0.00).format('.00');

                }
            } else {
                if (splitted[1] != undefined) {
                    var a = parseFloat('1.' + splitted[1]);
                    var dec = '.00000000';
                    console.log("INT");
                    console.log(parseInt(this.numberofdec));
                    if (this.numberofdec != '8') {
                        dec = '.';
                        for (var i = 0; i < parseInt(this.numberofdec); i++) {
                            dec += '0';
                        }
                    }
                    this.decimal = numeral(a).format(dec);
                }
                else {
                    this.decimal = "";
                }
            }

        }
    }
}