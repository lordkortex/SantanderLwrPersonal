import { LightningElement,api } from 'lwc';


import calloutGetUsersAccounts   from '@salesforce/apex/CNT_OTV_UsersLanding.calloutGetUserAccounts';
import getLstCountriesUser       from '@salesforce/apex/CNT_OTV_UsersLanding.getLstCountriesUser';
import setUserInfo               from '@salesforce/apex/CNT_OTVUserInfo.setUserInfo';
import calloutUpdateUserAccounts from '@salesforce/apex/CNT_OTV_UsersLanding.calloutUpdateUserAccounts';
import calloutUpdateUserStatus   from '@salesforce/apex/CNT_OTV_UsersLanding.calloutUpdateUserStatus';

import { loadStyle }            from 'lightning/platformResourceLoader';
import Santander_Icons          from '@salesforce/resourceUrl/Santander_Icons';
import flags                    from '@salesforce/resourceUrl/Flags';
import images                   from '@salesforce/resourceUrl/Images';

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
    values =['Administrator','Operator'];
    @api lstaccounts ={};
    lstCountriesAux ={};
    @api lstcountries =[];
    @api lstsubsidiaries ={};
    lstsubsidiariesaux =[];
    lstsubsidiaries = {};
    selectedValue;
    helpTextDropdown = "Show More";
    selectedClass;
    @api userselected;
    @api isClicked;
    subsidiarieslistNew = [];
    lstUpdatedAccounts =[];
    cuentaSeleccionada;

    // Expose URL of assets included inside an archive file
    logoOneTrade = images + '/logo-santander-one-trade.svg';
    flagES = flags + '/ES.svg';

 
    renderedCallback() {
        Promise.all([
            loadStyle(this, Santander_Icons + '/style.css'),
        ])

        // this.lstaccounts.forEach(element => {
        //     if(!this.lstsubsidiariesaux.includes(element.companyName) && !this.lstsubsidiariesaux.includes(element.country)){
        //         this.lstsubsidiariesaux.push(element.companyName);
        //         this.lstsubsidiaries.push({country:element.country, companyName:element.companyName});
        //     }
        // }); 

        //console.log('lstsubsidiaries'+ JSON.stringify(this.lstsubsidiaries));
    }

    conditions(event){
        console.log(event.target.className);
        
        if (event.target.className != 'slds-dropdown__item'){
            this.selectedClass = 'slds-dropdown__item slds-is-selected';
        }
    }

    /*saveAccount(event){
        try {
            //Cuenta Seleccionada
            this.cuentaSeleccionada = event.target.getAttribute("data-item");
                if(this.subsidiariesList.includes(event.target.getAttribute("data-item"))){
                    this.subsidiariesList = this.subsidiariesList.filter(value => value !== this.cuentaSeleccionada);
                }else{
                    this.subsidiariesList.push(event.target.getAttribute("data-item"));
                }
            console.log(this.subsidiariesList);
        } catch (error) {
            console.log(error);
        }
    }*/

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
        console.log(this.subsidiarieslistNew);

    }




    saveUserInfo(){
        /*setUserInfo({ updateStr:this.subsidiariesList})
        .then(result => { 
            window.console.log(JSON.stringify(result));
        })*/
        //calloutUpdateUserAccounts({ updateStr:this.subsidiariesList})
            console.log(this.subsidiarieslistNew);
            for(var i=0; i<this.subsidiarieslistNew.length; i++){
                console.log('Valor' + this.subsidiarieslistNew[i]);
                let accountElement = this.lstaccounts.find(account => account.accountId == this.subsidiarieslistNew[i]);
                console.log('Objecto');
                console.log(accountElement);
                console.log(accountElement.status);
               
                this.lstUpdatedAccounts.push(accountElement);
            }
            console.log(this.lstUpdatedAccounts);

        console.log('Entra');
        console.log(this.userselected.globalId);
        console.log(this.userselected.companyId);
        calloutUpdateUserStatus({userId:this.userselected.globalId,
                                serviceId:'one_trade_view_multi',
                                companyId:this.userselected.companyId,
                                statusButton:true})
        .then(result => { 
        window.console.log(JSON.stringify(result));
        })
        if(JSON.stringify(this.lstUpdatedAccounts)!= null){
            console.log('Entra?');
            calloutUpdateUserAccounts({accountList:JSON.stringify(this.lstUpdatedAccounts),
                                        userId:this.userselected.globalId,
                                        serviceId:'one_trade_view_account',
                                        companyId:this.userselected.companyId})
        }else{
            console.log('Sale?');
        }
        window.console.log(JSON.stringify(result));
        
        const saveUserInfo = new CustomEvent('closeuserinfo', {detail: {isClicked : false,
                                                                        showtoast : true}});
        this.dispatchEvent(saveUserInfo);
    }

    selectedItem(){
        return 'slds-dropdown__item slds-is-selected';
        /*{this.item == v.selectedValue ? 'slds-dropdown__item slds-is-selected' : 'slds-dropdown__item'}*/
    }
        
}