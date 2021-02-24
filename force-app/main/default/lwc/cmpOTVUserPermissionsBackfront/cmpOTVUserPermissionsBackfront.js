import { LightningElement,api } from 'lwc';


    import calloutGetUsersAccounts  from '@salesforce/apex/CNT_OTV_UsersLanding.calloutGetUserAccounts';
    import getLstCountriesUser      from '@salesforce/apex/CNT_OTV_UsersLanding.getLstCountriesUser';
    import setUserInfo              from '@salesforce/apex/CNT_OTVUserInfo.setUserInfo';
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
    
    export default class cmpOTVUserPermissionsBackfront extends LightningElement {
    
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
        }

        changeaccount(event){
        
            if(this.subsidiarieslistNew.includes(event.detail.account)){
                this.subsidiarieslistNew = this.subsidiarieslistNew.filter(value => value !== event.detail.account);
            }else{
                this.subsidiarieslistNew.push(event.detail.account);
            }
            console.log(this.subsidiarieslistNew);
    
        }

        conditions(event){
            console.log(event.target.className);
            
            if (event.target.className != 'slds-dropdown__item'){
                this.selectedClass = 'slds-dropdown__item slds-is-selected';
            }
        }
    
        closeUserInfo(){
            const closeUserInfo = new CustomEvent('closeuserinfo', {detail: {isClicked : false,
                                                                             showtoast : false}});
            this.dispatchEvent(closeUserInfo);
        }
        saveUserInfo(){
            console.log(this.subsidiarieslistNew);
            for(var i=0; i<this.subsidiarieslistNew.length; i++){
                let accountElement = this.lstaccounts.find(account => account.accountId == this.subsidiarieslistNew[i]);               
                this.lstUpdatedAccounts.push(accountElement);
            }
            console.log(this.lstUpdatedAccounts);
        calloutUpdateUserStatus({userId:this.userselected.globalId,
                                serviceId:'one_trade_view_multi',
                                companyId:this.userselected.companyId,
                                statusButton:true})
        .then(result => { 
        window.console.log(JSON.stringify(result));
        })
        console.log(JSON.stringify(this.lstUpdatedAccounts));
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