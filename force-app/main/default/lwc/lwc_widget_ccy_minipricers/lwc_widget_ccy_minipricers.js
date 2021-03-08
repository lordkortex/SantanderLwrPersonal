import { LightningElement , api, track } from 'lwc';

//Import styles
import {loadStyle} from 'lightning/platformResourceLoader';
//import santanderSheetJS from '@salesforce/resourceUrl/SheetJS';
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

//Import labels
import T_MyProfile from '@salesforce/label/c.T_MyProfile';
import edit from '@salesforce/label/c.edit';
import Change_Password from '@salesforce/label/c.Change_Password';
import language from '@salesforce/label/c.language';
import timeZone from '@salesforce/label/c.timeZone';
import currency from '@salesforce/label/c.currency';
import dateFormat from '@salesforce/label/c.dateFormat';
import numberFormat from '@salesforce/label/c.numberFormat';
import imageFlag from '@salesforce/resourceUrl/Flags';

//Calls Apex
import getPicklistValuesApex from '@salesforce/apex/CNT_UserSettingsAux.getPicklistValues';
import getUserSettingsApex from '@salesforce/apex/CNT_UserSettingsAux.getUserSettings';


export default class Lwc_widget_ccy_minipricers extends LightningElement {
    //Labels
	Label ={
        T_MyProfile,
        edit,
        Change_Password,
        language,
        timeZone,
        currency,
        dateFormat,
        numberFormat
	}
    _userinfoedit;
    get _userinfoedit(){return this._userinfoedit;}
    set userinfoedit(userinfoedit){this._userinfoedit=userinfoedit;}

    @track userinfo; //= {'DateFormat': '','NumberFormat':'', 'isCashNexus':'true'}; //description="Contains the running user info" />
    @api userinfoedit;

    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
        this.userinfo = [{'value': '1','order':'1'},{'value': '','order':''}];

        this.handleDoInit();

        /*this.userinfo.forEach ( function (ccpair) {
            
            ccpair.isediting=false;
            
        })*/
    }

    handleDoInit(){

        getPicklistValuesApex({}).then(response => {
            console.log("responsePicklist: "+JSON.stringify(response));
            if (response) {
                this.setPicklistValues(response);
            }
        }).catch(error => {
            console.log('KO '+error);
        });
        getUserSettingsApex({}).then(response => {
            console.log("responseUserSettings: "+JSON.stringify(response));
            if (response) {
                this.retrieveUserInfo(response);
            }
        }).catch(error => {
            console.log('KO '+error);
        });
        
    }
    
    
    retrieveUserInfo (response){
        if(response != null) 
        {
            console.log("userInfo"+JSON.stringify(response));
            /*var CurrenciesPairList = [];
            response.forEach(element => CurrenciesPairList.push(element.value));*/
            response.forEach ( function (ccpair) {
                ccpair.isediting=false;

                ccpair.currency1= ccpair.value.substring(0,3);
                ccpair.currency2= ccpair.value.substring(4,7);

                ccpair.flag1= imageFlag + '/' + ccpair.value.substring(0,3) + '.svg';
                ccpair.flag2= imageFlag + '/' + ccpair.value.substring(4,7) + '.svg';
            })
            console.log("userInfo actualizado"+JSON.stringify(response));
            this.userinfo=response;
            this.userinfoedit=response;
        }
    }
    setPicklistValues (response){
        if(response != null) 
        {
            let responseParsed = JSON.parse(response);
            var CurrenciesPairList = [];

            let data=this.userpicklistvalues;
            data = responseParsed;
            responseParsed.CurrencyPairsList.forEach(element => CurrenciesPairList.push(element.label));
            data.CurrenciesPairListLabel = CurrenciesPairList;
            
            this.userpicklistvalues=data;
        }
        
    }
    editButtonClicked(event){
        var eventID=event.target.id.charAt(0);
        this.userinfo.forEach ( function (ccpair) {
            if(ccpair.order==eventID){
                ccpair.isediting=true;
            }else{
                ccpair.isediting=false;
            }
        })
    }
    cancel(event){
        var eventID=event.detail[0];
        this.userinfo.forEach ( function (ccpair) {
            if(ccpair.order==eventID){
                ccpair.isediting=false;
            }
        })
    }
    
}