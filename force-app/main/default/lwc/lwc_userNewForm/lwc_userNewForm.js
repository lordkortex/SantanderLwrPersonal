import { LightningElement, track, api } from 'lwc';

import { loadStyle, loadScript } from 'lightning/platformResourceLoader';

// Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

import Users_UserId from '@salesforce/label/c.Users_UserId';
import LogAdmin_Name from '@salesforce/label/c.LogAdmin_Name';
import Users_Surname from '@salesforce/label/c.Users_Surname';
import Users_Type from '@salesforce/label/c.Users_Type';
import Users_State from '@salesforce/label/c.Users_State';
import Users_Language from '@salesforce/label/c.Users_Language';
import Users_TimeZone from '@salesforce/label/c.Users_TimeZone';
import Users_NumberFormat from '@salesforce/label/c.Users_NumberFormat';
import Users_DateFormat from '@salesforce/label/c.Users_DateFormat';
import Users_Email from '@salesforce/label/c.Users_Email';
import Users_Phone from '@salesforce/label/c.Users_Phone';
import Users_Address from '@salesforce/label/c.Users_Address';
import Users_MobileAppAccess from '@salesforce/label/c.Users_MobileAppAccess';
import Users_IsCryptocalculator from '@salesforce/label/c.Users_IsCryptocalculator';
import Yes from '@salesforce/label/c.Yes';
import No from '@salesforce/label/c.No';
import Users_TypeAndNumber from '@salesforce/label/c.Users_TypeAndNumber';
import LogAdmin_SelectOne from '@salesforce/label/c.LogAdmin_SelectOne';
import Users_CryptoNumber from '@salesforce/label/c.Users_CryptoNumber';
import Users_ObtainCrypto from '@salesforce/label/c.Users_ObtainCrypto';


export default class Lwc_userNewForm extends LightningElement {

    Label = {
        Users_UserId,
        LogAdmin_Name,
        Users_Surname,
        Users_Type,
        Users_State,
        Users_Language,        
        Users_TimeZone,
        Users_NumberFormat,
        Users_DateFormat,
        Users_Email,
        Users_Phone,
        Users_Address,
        Users_MobileAppAccess,
        Users_IsCryptocalculator,
        Yes,
        No,
        Users_TypeAndNumber,
        LogAdmin_SelectOne,
        Users_CryptoNumber,
        Users_ObtainCrypto
    }
    
    
    @api userinfo;
    @api typeslist;
    @api rendercorporates;

    @track helpTextDropdown = "Show More";
    @track statesList;
    @track languagesList;
    @track TimeZoneList;
    @track NumberFormatList;
    @track dateFormatList;
    @track typeAndNumberList;
    @track renderCrypto = true;
    @track renderMobile = true;

    @track issimpledropdown = true;
    

    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');

        this.rendercorporates = true;
        
        this.doInit();
    }

    doInit() {
        this.typeslist = ['Functional', 'Advisory', 'Administrator'];
        this.statesList =[ "Enabled", "Disabled", "Pending"];
        this.languagesList = ['English', 'Español', 'Français', 'Italiano', 'Porguguês'];
        this.TimeZoneList = ['GMT-1', 'GMT-2','GMT-3','GMT-4','GMT-5','GMT-6','GMT-7','GMT-8','GMT-9','GMT-10','GMT-11','GMT-12',
                                        'GMT+1','GMT+2','GMT+3','GMT+4','GMT+5','GMT+6','GMT+7','GMT+8','GMT+9','GMT+10','GMT+11','GMT+12'];

        this.NumberFormatList = ['###.###.###.##', '###,###,###,##', '#########.##', '#########,##'];
        this.dateFormatList = ['dd/MM/yyyy', 'MM/dd/yyyy'];
        this.typeAndNumberList = ['Physical', 'Virtual'];

        if(this.userinfo){
            if(this.userinfo.tieneVasco == null || this.userinfo.tieneVasco == undefined ) {
                this.userinfo.tieneVasco = "N";
                this.userinfo.tipoVasco = "Physical";
            } if(this.userinfo.mobileApp == null || this.userinfo.mobileApp == undefined ) {
                this.userinfo.mobileApp = "N";
            }
            if(this.userinfo.State == null || this.userinfo.mobileApp == undefined ) {
                this.userinfo.State = "Enabled";
            }
            if(this.userinfo.type_Z == null || this.userinfo.mobileApp == undefined ) {
                this.userinfo.type_Z = "Functional";
            }
        }
    }


    get mobileAppEqY(){
        return this.userinfo.mobileApp == 'Y';
    }
    get mobileAppEqN(){
        return this.userinfo.mobileApp == 'N';
    }
    get tieneVascoEqY(){
        return this.userinfo.tieneVasco == 'Y';
    }
    get tieneVascoEqN(){
        return this.userinfo.tieneVasco == 'N';
    }
    get inputDisabled(){
        return this.userinfo.tipoVasco == 'Virtual' || this.userinfo.tieneVasco == 'N';
    }
    get tipoVascoEqVirtual(){
        return this.userinfo.tipoVasco == 'Virtual';
    }


    updateData(event) {
        var id = event.detail.currentTarget.id;
        var value = event.detail.currentTarget.value;
        switch(id) {
            case "inputId":
                this.userinfo.userId = value;
                break;

            case "inputName":
                this.userinfo.userName = value;
                break;

            case "inputSurname":
                this.userinfo.userSurname = value;
                break;
                
            case "inputEmail":
                this.userinfo.Email = value;
                break;

            case "inputPhone":
                this.userinfo.Phone = value;
                break;

            case "inputAddress":
                this.userinfo.Address = value;
                break;
        }

    }
    updateRadios (event) {
        var id = event.detail.currentTarget.id;

        switch(id) {
            case "mobileYes":
                this.userinfo.mobileApp = "Y";
                break;

            case "mobileFalse":
                this.userinfo.mobileApp = "N";
                break;

            case "cryptoYes":
                this.userinfo.tieneVasco = "Y";
                break;
                
            case "cryptoNo":
                this.userinfo.tieneVasco = "N";
                break;
        }
    }

    dataChange () {
        let userInfo = this.userinfo;
        
        if (userInfo.type_Z == 'Functional' &&  userInfo.State == 'Enabled') 
        {
            this.renderCrypto = true;
            this.renderMobile = true;
            this.rendercorporates = true;
        }
        
        else if (userInfo.type_Z == 'Functional' &&  (userInfo.State == 'Disabled' || userInfo.State == 'Pending' ) ) 
        {
            this.renderCrypto = false;
            this.renderMobile = true;
            this.rendercorporates = true;
        }

        else if (userInfo.type_Z == 'Advisory' &&  (userInfo.State == 'Enabled' || userInfo.State == 'Disabled' || userInfo.State == 'Pending' )) 
        {
            this.renderCrypto = false;
            this.renderMobile = true;
            this.rendercorporates = true;
        }

         else if (userInfo.type_Z == 'Administrator' &&  (userInfo.State == 'Enabled' || userInfo.State == 'Disabled' || userInfo.State == 'Pending' )) 
        {
            this.renderCrypto = false;
            this.renderMobile = false;
            this.rendercorporates = false;
        }

        if(userInfo.tipoVasco == 'Virtual')
        {
            this.userinfo.VascoNumber = "";
        } 
    }

    obtainCrypto() {
        //Sets a default value.
        this.userinfo.VascoNumber = "FDT9097674";
    }

    
}