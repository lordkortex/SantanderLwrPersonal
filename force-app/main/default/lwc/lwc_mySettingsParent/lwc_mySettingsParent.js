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

//Calls Apex
import getPicklistValuesApex from '@salesforce/apex/CNT_UserSettingsController.getPicklistValues';
import getUserSettingsApex from '@salesforce/apex/CNT_UserSettingsController.getUserSettings';



export default class Lwc_mySettingsParent extends LightningElement {
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

	

    @api userinfo; //= {'DateFormat': '','NumberFormat':'', 'isCashNexus':'true'}; //description="Contains the running user info" />
    @api userinfoedit;                                  //description="Contains the running user info" />
    @api userpicklistvalues;                            //description="Contains the edit Picklist data" />
    @api isediting;                                     //description="flag to check if is editing the user" />
    @api ischangingpassword;                            //description="flag to check if is changing the password" />

    _userinfo;
    get _userinfo(){return this._userinfo;}
    set userinfo(userinfo){this._userinfo=userinfo;}
    _userinfoedit;
    get _userinfoedit(){return this._userinfoedit;}
    set userinfoedit(userinfoedit){this._userinfoedit=userinfoedit;}
    
    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
        this.userinfo = {'DateFormat': '','NumberFormat':'', 'isCashNexus': "false"};
        this.handleDoInit();
    }


    get conditionCashNexus(){
        return userinfo.isCashNexus=="true";
    }
    editButtonClicked(){
        this.isediting=true;
    }

    changePasswordButtonClicked(){
        this.ischangingpassword=true;
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
    
    
    retrieveUserInfo (response) {
        console.log("userInfo"+JSON.stringify(response));
        this.userinfo=response;
        this.userinfoedit=response;
    }

    setPicklistValues (response) {

        if(response != null) 
        {
            
            let responseParsed = JSON.parse(response);

            var timeZonesList = [];
            var languageList = [];
            var CurrenciesList = [];
            var CurrenciesPairList = [];
            var numberFormatList = [];
            var dateFormatList = [];

            let data=this.userpicklistvalues;

            data = responseParsed;

            responseParsed.TimeZoneList.forEach(element => timeZonesList.push(element.label));
            responseParsed.LanguageList.forEach(element => languageList.push(element.label));
            responseParsed.CurrencyList.forEach(element => CurrenciesList.push(element.label));
            responseParsed.CurrencyPairsList.forEach(element => CurrenciesPairList.push(element.label));             
            responseParsed.NumberFormatList.forEach(element => numberFormatList.push(element.label));
            responseParsed.DateFormatList.forEach(element => dateFormatList.push(element.label));

            data.TimeZoneListLabel = timeZonesList;
            data.languagesListLabel = languageList;
            data.datesListLabel = dateFormatList;
            data.numbersListLabel = numberFormatList;
            data.CurrenciesListLabel = CurrenciesList;
            data.CurrenciesPairListLabel = CurrenciesPairList;
            
            this.userpicklistvalues=data;
        }
        
    }
    cancel(){
        this.isediting=false;
    }
    cancelchangepassword(){
        this.ischangingpassword=false;
    }
}