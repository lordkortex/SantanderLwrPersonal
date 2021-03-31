import { LightningElement,api,track } from 'lwc';

import calloutUpdateUserAccounts        from '@salesforce/apex/CNT_OTV_UsersLanding.calloutUpdateUserAccounts';
import calloutUpdateUserStatus          from '@salesforce/apex/CNT_OTV_UsersLanding.calloutUpdateUser';

import { loadStyle }                    from 'lightning/platformResourceLoader';
import Santander_Icons                  from '@salesforce/resourceUrl/Santander_Icons';
import flags                            from '@salesforce/resourceUrl/Flags';
import images                           from '@salesforce/resourceUrl/Images';

// importing Custom Label
import cmpOTVUserInfoPermissions_Clear  from '@salesforce/label/c.cmpOTVUserInfoPermissions_Clear';
import cmpOTVUserInfoPermissions_Error  from '@salesforce/label/c.cmpOTVUserInfoPermissions_Error';
import cmpOTVUserInfoPermissions_AB     from '@salesforce/label/c.cmpOTVUserInfoPermissions';
import cmpOTVUserInfoPermissions_1      from '@salesforce/label/c.cmpOTVUserInfoPermissions_1';
import cmpOTVUserInfoPermissions_2      from '@salesforce/label/c.cmpOTVUserInfoPermissions_2';
import cmpOTVUserInfoPermissions_3      from '@salesforce/label/c.cmpOTVUserInfoPermissions_3';
import cmpOTVUserInfoPermissions_4      from '@salesforce/label/c.cmpOTVUserInfoPermissions_4';
import cmpOTVUserInfoPermissions_5      from '@salesforce/label/c.cmpOTVUserInfoPermissions_5';
import cmpOTVUserInfoPermissions_6      from '@salesforce/label/c.cmpOTVUserInfoPermissions_6';
import cmpOTVUserInfoPermissions_7      from '@salesforce/label/c.cmpOTVUserInfoPermissions_7';
import cmpOTVUserInfoPermissions_8      from '@salesforce/label/c.cmpOTVUserInfoPermissions_8';
import cmpOTVUserInfoPermissions_9      from '@salesforce/label/c.cmpOTVUserInfoPermissions_9';
import cmpOTVUserInfoPermissions_10     from '@salesforce/label/c.cmpOTVUserInfoPermissions_10';
import cmpOTVUserInfoPermissions_11     from '@salesforce/label/c.cmpOTVUserInfoPermissions_11';
import cmpOTVUserInfoPermissions_12     from '@salesforce/label/c.cmpOTVUserInfoPermissions_12';
import cmpOTVUserInfoPermissions_13     from '@salesforce/label/c.cmpOTVUserInfoPermissions_13';

export default class CmpOTVUserInfoPermissions extends LightningElement {

    label = {
        cmpOTVUserInfoPermissions_Clear,
        cmpOTVUserInfoPermissions_Error,
        cmpOTVUserInfoPermissions_AB,
        cmpOTVUserInfoPermissions_1,
        cmpOTVUserInfoPermissions_2,
        cmpOTVUserInfoPermissions_3,
        cmpOTVUserInfoPermissions_4,
        cmpOTVUserInfoPermissions_5,
        cmpOTVUserInfoPermissions_6,
        cmpOTVUserInfoPermissions_7,
        cmpOTVUserInfoPermissions_8,
        cmpOTVUserInfoPermissions_9,
        cmpOTVUserInfoPermissions_10,
        cmpOTVUserInfoPermissions_11,
        cmpOTVUserInfoPermissions_12,
        cmpOTVUserInfoPermissions_13
    }

    // DROPDOWN ATTRIBUTES 
    // values =['Administrator','Operator'];
    dropdownRole = [{ label: 'Administrator', value: 'one_trade_view_m_administrator' },
                    { label: 'Operator', value: 'one_trade_view_m_operation' },
                   ];
    @api lstaccounts ={};
    @api lstcountries ={};
    @api lstsubsidiaries ={};
    @api userselected;
    @api isClicked;
    @track showtoast = false;
    @track showtoastError = false;
    @track msgtoast;
    @track typetoast;
    @track tobehiddentoast;
    subsidiarieslistNew = [];
    lstUpdatedAccounts =[];
    lstsubsidiariesaux =[];
    lstsubsidiaries = {};
    selectedValue;
    helpTextDropdown = "Show More";
    selectedClass;
    countriesloaded = false;
    statusButton = false;
    cuentaSeleccionada;
    // Expose URL of assets included inside an archive file
    logoOneTrade = images + '/logo-santander-one-trade.svg';
    flagES = flags + '/ES.svg';
    selectedRole;
    disabled = false;
 
    renderedCallback() {
        Promise.all([
            loadStyle(this, Santander_Icons + '/style.css'),
        ])
        this.disabledAccount();
        this.updateCountryCombos(true);
    }

    conditions(event){
        if (event.target.className != 'slds-dropdown__item'){
            this.selectedClass = 'slds-dropdown__item slds-is-selected';
        }
    }
    changeOption(event){
        this.selectedRole = event.detail.selectedValue;
    }

    closeUserInfo(){
        const closeUserInfo = new CustomEvent('closeuserinfo', {detail: {isClicked : false,
                                                                        showtoast : false}});
        this.dispatchEvent(closeUserInfo);
    }

    changeaccount(event){
        if(this.subsidiarieslistNew.includes(event.detail.account)){
            this.subsidiarieslistNew = this.subsidiarieslistNew.filter(value => value !== event.detail.account);
        }else{
            this.subsidiarieslistNew.push(event.detail.account);
        }
        var listaAuxiliar = JSON.parse(JSON.stringify(this.lstaccounts));
        var accountElement = listaAuxiliar.find(account => account.accountId == event.detail.account);
        var updateCountry = false;
        if(accountElement != null){
            if(accountElement.status == 'INACTIVE'){
                accountElement.status = 'ACTIVE';
                updateCountry = true;
            }else{
                accountElement.status = 'INACTIVE';
            }
        }
        this.lstaccounts = listaAuxiliar;
        if(updateCountry){
            this.updateCountryCombos(false);
        }
    }

    saveUserInfo(){
        for(var i=0; i<this.subsidiarieslistNew.length; i++){
            let accountElement = this.lstaccounts.find(account => account.accountId == this.subsidiarieslistNew[i]);
            this.lstUpdatedAccounts.push(accountElement);
        }
        calloutUpdateUserStatus({userId:this.userselected.globalId,
                                 serviceId:this.selectedRole,
                                 companyId:this.userselected.companyId,
                                 statusButton:this.statusButton})          
        .catch(error => {
            console.log(error);
            var msg = error;
            this.showtoastError = true;
            this.msgtoast = msg;
            this.typetoast = error;
            this.tobehiddentoast = false;
        });

        if(this.lstUpdatedAccounts != undefined && this.lstUpdatedAccounts.length >0 ){
            calloutUpdateUserAccounts({accountList:JSON.stringify(this.lstUpdatedAccounts),
                                       userId:this.userselected.globalId,
                                       serviceId:'one_trade_view_account',
                                       companyId:this.userselected.companyId})    
            .catch(error => {
                console.log(error);
                var msg = error;
                this.showtoastError = true;
                this.msgtoast = msg;
                this.typetoast = error;
                this.tobehiddentoast = false;
            });
        }
        if(this.showtoastError){
            this.showtoast = false;
        }else{
            this.showtoast = true;
        }
        const saveUserInfo = new CustomEvent('closeuserinfo', {detail: {isClicked : false,
                                                                        showtoast : this.showtoast,
                                                                        showtoastError : this.showtoastError,
                                                                        msgtoast  : this.msgtoast,
                                                                        typetoast : this.typetoast,
                                                                        tobehiddentoast : this.tobehiddentoast}});
        this.dispatchEvent(saveUserInfo);
    }

    selectedItem(){
        return 'slds-dropdown__item slds-is-selected';
    }
 
    changeStatus(event){
        this.statusButton = !this.statusButton;
        this.disabledAccount();
    }

    updateCountryCombos(isRenderedCallback){
        if((isRenderedCallback && !this.countriesloaded) || !isRenderedCallback){
            var lstcountriesaux = JSON.parse(JSON.stringify(this.lstcountries));
            for(var n=0; n<lstcountriesaux.length; n++){
                lstcountriesaux[n].isActive = false;
            }
    
            for(var i=0; i<this.lstaccounts.length; i++){
                if(this.lstaccounts[i].status == 'ACTIVE'){
                    var country = lstcountriesaux.find(cntry => cntry.value == this.lstaccounts[i].country);
                    country.isActive = true;
                }
            }
            this.lstcountries = lstcountriesaux;
            this.countriesloaded = true;
        }        
    }

    handleCountryChange(event){
        console.log(event.target);
        var countrylist = JSON.parse(JSON.stringify(this.lstcountries));
        var country = countrylist.find(cntry => cntry.value == event.target.dataset.item);

        if(!event.target.checked){
            var listaAuxiliar = JSON.parse(JSON.stringify(this.lstaccounts));
            for(var i=0; i<listaAuxiliar.length; i++){
                if(listaAuxiliar[i].country == country.value && listaAuxiliar[i].status == 'ACTIVE'){
                    listaAuxiliar[i].status = 'INACTIVE';
                    if(!this.subsidiarieslistNew.includes(listaAuxiliar[i].accountId)){
                        console.log('entra nuevo elemento lista');
                        console.log(this.subsidiarieslistNew);
                        this.subsidiarieslistNew.push(listaAuxiliar[i].accountId);
                    }else{
                        console.log('entra quitar elemento lista');
                        this.subsidiarieslistNew = this.subsidiarieslistNew.filter(value => value !== listaAuxiliar[i].accountId);
                    }
                }
            }
            console.log('acaba for');
            this.lstaccounts = listaAuxiliar;
            console.log('actualiza lista accounts final');
            country.isActive = false;
            console.log('actualiza country false');
        }else{
            country.isActive = true;
            console.log('actualiza country true');
        }
        this.lstcountries = countrylist;
    }
    
    disabledAccount(){
        this.template.querySelectorAll('[data-id =dropCard]').forEach(element => {
            if(!this.userselected.active && !this.statusButton){
                element.className ="slds-grid__dropCard disabled";
                this.disabled = true;
            }else if(this.userselected.active && !this.statusButton){
                element.className ="slds-grid__dropCard";
                this.disabled = false;
            }else if(this.userselected.active && this.statusButton){
                element.className ="slds-grid__dropCard disabled";
                this.disabled = true;
            }else if(!this.userselected.active && this.statusButton){
                element.className ="slds-grid__dropCard";
                this.disabled = false;
            } 
        })
    }
}