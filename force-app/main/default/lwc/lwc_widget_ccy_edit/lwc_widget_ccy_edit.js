import { LightningElement , api } from 'lwc';

//Import styles
import {loadStyle} from 'lightning/platformResourceLoader';
//import santanderSheetJS from '@salesforce/resourceUrl/SheetJS';
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

//Import labels
import close from '@salesforce/label/c.close';
import MySettings_EditUserInfo from '@salesforce/label/c.MySettings_EditUserInfo';
import LogAdmin_SelectOne from '@salesforce/label/c.LogAdmin_SelectOne';
import language from '@salesforce/label/c.language';
import timeZone from '@salesforce/label/c.timeZone';
import currency from '@salesforce/label/c.currency';
import dateFormat from '@salesforce/label/c.dateFormat';
import numberFormat from '@salesforce/label/c.numberFormat';
import AdminRoles_Cancel from '@salesforce/label/c.AdminRoles_Cancel';
import AdminRoles_Save from '@salesforce/label/c.AdminRoles_Save';

//Calls Apex
import UserInfoEditApex from '@salesforce/apex/CNT_UserSettingsAux.saveData';



export default class Lwc_widget_ccy_edit extends LightningElement {
    //Labels
    Label ={
        close,
        MySettings_EditUserInfo,
        LogAdmin_SelectOne,
        language,
        timeZone,
        currency,
        dateFormat,
        numberFormat,
        AdminRoles_Cancel,
        AdminRoles_Save       
    }

    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
        console.log("listas: "+this.userinfoedit);
        console.log("listas: "+this.userpicklistvalues.CurrenciesPairListLabel);
    }

    @api userinfoedit={};                                   //description="Contains the running user info" />
    @api userpicklistvalues;                                //description="Contains the edit Picklist data" />
    
    _userinfoedit={};
    get userinfoedit(){return this._userinfoedit;}
    set userinfoedit(userinfoedit){this._userinfoedit=userinfoedit;}

    saveEditClicked(){ 
        console.log("update userinfo"+JSON.stringify(this._userinfoedit));
        //component.find('Service').callApex2(component, helper, "c.saveData", {'userInfoCmp' : this.UserInfoEdit }, helper.getCachedInfo);
        UserInfoEditApex({'userInfoCmp' : this._userinfoedit }).then(response => {
            if (response) {
                this.cancelEditClicked(response);
            }
        });
    }
    
    cancelEditClicked(response) 
    { 
        const buttonCancel = new CustomEvent('buttoncancel', {detail: this.userinfoedit.order});
        this.dispatchEvent(buttonCancel);

        if(response != null);
        if(response == true) {
            location.reload();
        }
    }

    selectCcyPairsDropdown(event){
        if(event.detail!=''){
            console.log("event recived: "+event.detail);
            var aux = JSON.parse(JSON.stringify(this._userinfoedit));
            aux.value = event.detail[0];
            aux.order = this.userinfoedit.order;
            this._userinfoedit = aux;
        }
    }
}