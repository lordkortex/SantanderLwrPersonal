import { LightningElement, api, wire, track } from 'lwc';

import getUserNumberFormat from '@salesforce/apex/Global_Utilities.getUserNumberFormat';
import getUserDateFormat from '@salesforce/apex/Global_Utilities.getUserDateFormat';

import NUMERAL_OBJ from '@salesforce/resourceUrl/NumeralJs';
import { loadScript } from 'lightning/platformResourceLoader';
import { refreshApex } from '@salesforce/apex';

import { getRecord,getFieldValue } from 'lightning/uiRecordApi';

import uId from '@salesforce/user/Id';
import USERFORMAT from '@salesforce/schema/User.USER_NumberFormat__c';
import USERFORMATDATE from '@salesforce/schema/User.User_DateFormat__c';

const FIELDS =['User.USER_NumberFormat__c'];
const FIELDSDATE =['User.User_DateFormat__c'];


export default class cmpDisplayAmount extends LightningElement {
    @api areScriptsLoaded = false;
    @api fromgpi = 'false';
    @api numberFormat = '';
    @api numerOfDec = '8';
    @api wholeDecimal = false;
    
    // New atributtes

    @api userFormat = '2';
    @api toShow = '';
    @api currency = '';
    @api amount = '';
    @api whole = '';
    @api decimal = '';
    @api wholeClass = '';
    @api decimalClass = '';
    @api currencyClass = '';
    @api outputString = '';
    @api userId=uId;
    @api userF='';
   @wire (getUserNumberFormat, { userId: uId })
   userData;
   //@wire (getUserDateFormat, { userId: uId })
   //userDate;
    @track users;
    @track error;
    @api recordId;
    //@wire (getRecord, { recordId: '0051j000002W5gKAAS', fields: [USERFORMAT], optionalFields: [] }) 
    @wire (getRecord, { recordId: uId, fields: [USERFORMAT] }) 
    usuario;
    @wire (getRecord, { recordId: uId, fields: [USERFORMATDATE] }) 
    usuarioDate;
        /*if(data){
            this.users = data;
            this.error = undefined;
        }
        else if (error) {
            this.error = error;
            this.users = undefined;
        }*/        
    
 
    get userForm(){
        return getFieldValue(this.usuario.data, USERFORMAT);
    }   
    get userFormDate(){
        return getFieldValue(this.usuarioDate.data, USERFORMATDATE);
    }   
    //@wire (getUserNumberFormat, { userId: '$userId' })
    //wiredUser({data, error}){
    


    connectedCallback(){
        console.log(this.usuario);
        //codig a ejecutar antes de renderizar
        Promise.all([loadScript(this, NUMERAL_OBJ + '/numeralJs/numeral.js')]).then(() => {
            
            refreshApex(this.userData);
                    this.setDatahelper();
                
            
        })
        .catch((error) => {
            console.log("ERROR");
        });
        console.log(NUMERAL_OBJ);
        
    }

    renderedCallback() {
        //codigo a ejecutar después de renderizar
        console.log("entro en rendered");
        console.log(this.userData);

    }
    formatAmount () {
        if(this.fromGPI==false){
            this.formatAmounthelper();
        }
    }

    formatAmounthelper() {

        // try{
        //     var amount=this.amount;

        //     if(amount!=undefined && amount!=null){
        //         var a=new Array();
        //         a=amount.toString().split('.');;

        //         if(a[1]==undefined || a[1]==null){
        //             this.decimal = "00";
        //         }else{
        //             this.decimal = a[1];
        //         }
        //         this.whole = a[0];
        //     }    
        // } catch (e) {
        //     // Handle error
        //     console.error(e);
        // }   
    }

    @api formatAmountNumeral(){
/*
        var params = event.getParam('arguments');

        if(params != undefined){
            this.numberFormat = params.numberFormat;
        }
        if(this.fromGPI == false){
            if(this.numberFormat != undefined && this.numberFormat != 'undefined'){
                //helper setData
                this.setDatahelper(this.numberFormat);

            }else{
                //helper formatNumber
                this.formatNumberhelper();
            }
        }else{
            //helper setData
            this.setDatahelper(this.numberFormat);
        }
        */
    }

    setDatahelper(){
        console.log("entra en setDatahelper");
        debugger;
        refreshApex(this.userData);
        //refreshApex(this.userDate);

        var amount;
        if(this.amount != undefined){
            amount = this.amount.toString().replace(',', '.');
        }
        if (this.numberFormat != undefined && this.numberFormat !='undefined'){
            this.userFormat = this.numberFormat;
        }else{
            this.userFormat = this.usuario.data.fields.USER_NumberFormat__c.value;
        }


        console.log("antes del object");
        
        //REGISTER FIRST LOCALE
        if(Object.keys(numeral.locales).length == 1){
            console.log("dentro edl object");

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
                ordinal: (number) =>{
                    return '';
                },
                currency:
                {
                    symbol: '€'
                }
            });

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
                ordinal: (number) => {
                    return '';
                },
                currency:
                {
                    symbol: '€'
                }
            });

            if (this.userFormat == '###.###.###,##') {
                numeral.locale('type1');
            } else {
                numeral.locale('type2');
            }
    
            if (amount != undefined) {
                var splitted = amount.split(".");
    
                if (splitted[0] != undefined) {
                    this.whole = numeral(splitted[0]).format('0,0');
    
                }
                var wholeDecimal = this.wholeDecimal;
                if (!wholeDecimal) {
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
                        console.log(parseInt(this.numberOfDec));
                        if (parseInt(this.numberOfDec) != '8') {
                            dec = '.';
                            for (var i = 0; i < parseInt(this.numberOfDec); i++) {
                                dec += '0';
                            }
                        }
                        this.decimal = numeral(a).format(dec);
                    }
                    else {
                        //component.set("v.decimal", "." + numeral(0.00).format(dec));
                        this.decimal = "";
                    }
                }
                
                //component.set("v.outputString", component.get("v.whole")+component.get("v.decimal")+component.get("v.currency"));

                this.outputString = this.whole+this.decimal+this.currency;
                console.log("out");
                
                console.log(this.outputString);
    
            }
        }
    }

    formatNumberhelper(){
        
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
                    ordinal: (number) =>{
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

        //Busca la id Service del component "ServiceComponent" y usa el método callApex2
      //  this.template.querySelector('[data-id="Service"]').callApex2(this.userNumberFormat, this.setData);
    }
}