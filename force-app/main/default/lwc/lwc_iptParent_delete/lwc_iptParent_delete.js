/**
 * @description       : 
 * @author            : Everis
 * @group             : 
 * @last modified on  : 12-04-2020
 * @last modified by  : Everis
 * Modifications Log 
 * Ver   Date         Author   Modification
 * 1.0   12-02-2020   Everis   Initial Version
**/
import { LightningElement, track } from 'lwc';

import userId from '@salesforce/user/Id';

import ERROR from '@salesforce/label/c.ERROR';
import ERROR_NO_ACCESS from '@salesforce/label/c.ERROR_NO_ACCESS';
import LOADING from '@salesforce/label/c.Loading';
import ACCOUNT from '@salesforce/label/c.Accounts';
import PAYMENTS_TRACKER from '@salesforce/label/c.PaymentsTracker';

import getCurrencies from '@salesforce/apex/CNT_MRTrackerSearch.getCurrencies';
import decryptData from '@salesforce/apex/CNT_MRTrackerSearch.decryptData';
import getIsCashNexus from '@salesforce/apex/CNT_MRTrackerSearch.getIsCashNexus';
import getCheckboxWelcomePack from '@salesforce/apex/CNT_MRTrackerSearch.getCheckboxWelcomePack';
import getAccounts from '@salesforce/apex/CNT_MRTrackerSearch.getAccounts';

export default class Lwc_iptParent extends LightningElement {
    label = {
        ERROR,
        ERROR_NO_ACCESS,
        LOADING,
        ACCOUNT,
        PAYMENTS_TRACKER
    };
  
    @track isOpen = false;
    @track accountList = [];
    @track currencyList = [];
    @track errorAccount = false;
    @track filters = '';
    @track loading = false;
    @track isIE = false;

    ready = false;
    // Welcome pack
    @track showWelcome = false;
    @track showWelcomePack = false;
    @track showTerms = false;
    @track isCashNexus = false;
    @track agreedTerms = false;

    isBIC =false;
    isGB = false;
    isES = false;
    isPL = false;
    isCL = false;
    isMX = false;
    isOther = false;

    @track country = '';
    @track fromCashNexus = false;
    @track isOneTrade = false;

    // Payments Tracker-->
    _showAccountPayment = false;
    @track accountObj = { country:'', bank:'',accountNumber:'',  bic:'', bankAlias:'', bookBalance:'', availableBalance:'',  accounAlias: '', currency:'', accountName: '', iIdType:'', iSource:'', dateValue:'', hourValue:'', lastUpdate: ''};
    @track showNoAccessError = false;
    connectedCallback() {
        console.log('hola mundo!');
        this.loading = false;
        this.checkBrowser();
        this.setUserId();
        this.getCurrency();
        
        let urlParams = this.getURlVariables();
        if (urlParams[0] === 'params') {
            this.getURLParams(urlParams).then(result => {
                this.sURLVariables(result, urlParams);
            });
        } else {
            this.showAccountPayment = false;
        }
    }

    /*get showCashNexusAndAccPayment() {
        return (this.fromCashNexus && !this.showAccountPayment);
    } */
    get isErrorAccount() {
        return !this.errorAccount;
    }
    get isAccountListData() {
        var ret = false;
        if (this.accountList.length > 0) {
            //ret = !(this.accountList.size() > 0);
            ret = true;
        }
        return ret;
    }

    set showAccountPayment(showAccountPayment) {
        this._showAccountPayment = showAccountPayment;
        this.doInitAuxiliar();
    }
    get showAccountPayment() {
        return this._showAccountPayment;
    }
    get loadingText() {
        return this.label.loading + '...';
    }

    get showWelcomePack() {
        return (this.agreedTerms && !this.isCashNexus)
    }
    setUserId() {
        try{
            let hasTrackerAccess = window.localStorage.getItem(userId + '_hasPaymentsTrackerAccess');
            if(hasTrackerAccess != false && hasTrackerAccess != 'false'){
                window.sessionStorage.setItem(userId + '_firstAccess', false);
            } else {
                this.loading = false;
                this.showNoAccessError = true;
            }
        } catch (e) {
            console.log(e);
        }
    }
   
    checkBrowser () {
        try{
            var browserType = navigator.sayswho= (function(){
                var ua= navigator.userAgent, tem,
                    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
                if(/trident/i.test(M[1])){
                    tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
                    return 'IE '+(tem[1] || '');
                }
                if(M[1]=== 'Chrome'){
                    tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
                    if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
                }
                M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
                if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
                return M.join(' ');
            })();
           this.isIE = browserType.startsWith('IE');
        } catch (e) {
            console.log(e);
        }
    }
    getCurrency (){
        try {
            getCurrencies().then((result) => {
                if (result) {
                   this.currencyList = result;
                } else {
                  console.log('Get currency - Empty response')
                }
            }).catch((error) => {
                console.log(error);
            })
        } catch (e) {
            console.log(e);
           
        }
    }
    getURlVariables() {
        var sPageURLMain = decodeURIComponent(window.location.search.substring(1));
        var sURLVariablesMain = sPageURLMain.split('&')[0].split('=');
        return sURLVariablesMain;
    }
    getURLParams (sURLVariablesMain) {
        try{
            return this.decrypt(sURLVariablesMain[1]).then(function(results){
                return results;
            });
        } catch (e) {
            console.log(e);
        }
    }
    sURLVariables(data, sURLVariablesMain) {
        var sPageURL = '';
        sURLVariablesMain[1] === undefined ? 'Not found' : sPageURL = data;
        var sURLVariables=sPageURL.split('&');
        var iAccount = this.accountObj;
        if(sURLVariables[0] != ''){
            for ( var i = 0; i < sURLVariables.length; i++ ) {
                var sParameterName = sURLVariables[i].split('=');      
                if (sParameterName[0] === 'c__subsidiaryName') { 
                    sParameterName[1] === undefined ? 'Not found' : iAccount.accountName = sParameterName[1];
                }else if (sParameterName[0] === 'c__alias') { 
                    sParameterName[1] === undefined ? 'Not found' : iAccount.accountAlias = sParameterName[1];
                }else if (sParameterName[0] === 'c__bic') { 
                    sParameterName[1] === undefined ? 'Not found' : iAccount.bic = sParameterName[1];
                }else if (sParameterName[0] === 'c__currentCurrency') { 
                    sParameterName[1] === undefined ? 'Not found' : iAccount.currency = sParameterName[1];
                }else if (sParameterName[0] === 'c__accountNumber') {
                    sParameterName[1] === undefined ? 'Not found' : iAccount.accountNumber = sParameterName[1];
                }else if (sParameterName[0] === 'c__idType') {
                    sParameterName[1] === undefined ? 'Not found' : iAccount.iIdType = sParameterName[1];
                }else if (sParameterName[0] === 'c__source') {
                    sParameterName[1] === undefined ? 'Not found' : iAccount.iSource = sParameterName[1];
                }else if (sParameterName[0] === 'c__updateHour') {
                    sParameterName[1] === undefined ? 'Not found' : iAccount.hourValue = sParameterName[1];
                }else if (sParameterName[0] === 'c__date') {
                    sParameterName[1] === undefined ? 'Not found' : iAccount.dateValue = sParameterName[1];
                }else if (sParameterName[0] === 'c__bank') {
                    sParameterName[1] === undefined ? 'Not found' : iAccount.bank = sParameterName[1];
                }else if (sParameterName[0] === 'c__mainAmount') {
                    sParameterName[1] === undefined ? 'Not found' : iAccount.bookBalance = sParameterName[1];
                }else if (sParameterName[0] === 'c__availableAmount') {
                    sParameterName[1] === undefined ? 'Not found' : iAccount.availableBalance = sParameterName[1];
                }else if (sParameterName[0] === 'c__lastUpdate') {
                    sParameterName[1] === undefined ? 'Not found' : iAccount.lastUpdate = sParameterName[1];
                }else if (sParameterName[0] === 'c__country') {
                    sParameterName[1] === undefined ? 'Not found' : iAccount.country = sParameterName[1];
                }else if (sParameterName[0] === 'c__aliasBank') {
                    sParameterName[1] === undefined ? 'Not found' : iAccount.bankAlias = sParameterName[1];
                } else if (sParameterName[0] === 'c__showFilters') {
                    // Payments Tracker for Nexus - When the user navigates from an account
                    this.showAccountPayment = (sParameterName[1] == 'true')
                    //sParameterName[1] == 'true' ? this.showAccountPayment =  true : component.set('v.showAccountPayment' , false);
                }else if (sParameterName[0] === 'c__isOneTrade') {
                    this.isOneTrade = (sParameterName[1] == 'true');
                    // sParameterName[1] == 'true' ? component.set('v.isOneTrade' , true) : component.set('v.isOneTrade' , false);
                }
            }
            this.fromCashNexus = true;                    
            if(this.accountObj.iSource === 'fromAccount'){
                var accounts=[];
                accounts.push({'account':iAccount.accountNumber,'bic': iAccount.bic,'id_type':iAccount.iIdType,'alias': iAccount.accountAlias});  
                this.accountList = accounts;
                this.ready = true;
                this.errorAccount = false;
                let filters = {
                    searchData: {
                        latestPaymentsFlag: 'NO',
                        _limit: '1000',
                        _offset: '0',
                        inOutIndicator: 'OUT',
                        originatorAccountList:[{
                            bankId: iAccount.bic,
                            account:{
                                idType: iAccount.iIdType,
                                accountId: iAccount.accountNumber
                                }
                            }]
                        }
                };
                this.loading = false; 
                this.filters = JSON.stringify(filters);
            } 
        } else {
            this.showAccountPayment = false;
        }
    }
    decrypt (data){
        try {
            var result='null';
            return new Promise(function (resolve, reject) {
                decryptData({ str : data }).then(response => {
                    if (response) result = response;
                    resolve(result);
                }).catch(errors => {
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                                console.log('Error message: ' + 
                                        errors[0].message);
                                reject(response.getError()[0]);
                        }
                    } else {
                        console.log('Unknown error');
                    }
                    resolve(result);
                });
            });
        } catch(e) {
            console.error(e);
        }
    }

    getIsCashNexusM(){
        console.log('en getIsCashNexusM');
        try{
            getIsCashNexus().then(result => {
                if (result) {
                    var iReturn = result;
                    console.log(iReturn);
                    for ( var key in iReturn ) {
                        if(key == 'agreedTerms'){
                            this.agreedTerms = iReturn[key];
                        }
                        if(key == 'isCashNexusUser'){
                            this.isCashNexus = iReturn[key];
                        }
                        if(key == 'BIC'){
                            this.isBIC = iReturn[key];
                        }
                        if(key == 'ES'){
                            this.isES = iReturn[key];
                        }
                        if(key == 'PL'){
                            this.isPL = iReturn[key];
                        }
                        if(key == 'CL'){
                            this.isCL = iReturn[key];
                        }
                        if(key == 'GB'){
                            this.isGB = iReturn[key];
                        }
                        if(key == 'MX'){
                            this.isMX = iReturn[key];
                        }
                        if(key == 'Other'){
                            this.isOther = iReturn[key];
                        }
                    }
                    
                    var gb = this.isGB;
                    var es = this.isES;
                    var pl = this.isPL;
                    var cl = this.isCL;
                    var mx = this.isMX;
                    var other = this.isOther;
                    
                    if(gb == true) {
                        this.country = 'GB';
                    } else if(es == true) {
                        this.country = 'ES';
                        this.agreedTerms = true;
                    } else if(pl == true) {
                        this.country = 'PL';
                    } else if(cl == true) {
                        this.country = 'CL';
                    } else if(mx == true) {
                        this.country = 'MX';
                    } else if(other == true) {
                        this.country = 'Other';
                        this.agreedTerms = true;
                    } else if(this.isCashNexus == false && this.isBIC == false) {
                        this.agreedTerms = true;
                    }
                    
                    var nexus = this.isCashNexus;
                    var terms = this.agreedTerms;
                    var bic = this.isBIC;
                    
                    if(nexus == true && terms == false){
                        this.showTerms = true;
                    }
                    
                    if(nexus == false && bic == true && terms == false) {
                        this.showTerms = true;
                    }
                } else {
                   console.log('empty response in getIsCashNexus')
                }
            }).catch(errors => {
                console.log(errors);
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log('Error message: ' + 
                                    errors[0].message);
                    }
                } else {
                    console.log('Unknown error');
                }
            });
        } catch (e) {
            console.log(e);
        }
    }
    navigateToAccounts(){
        this.template.querySelector('c-lwc_service-component').redirect('accounts', '');
    }
    getFilters(evt) {
        let evtData = evt.detail;
        try{
            this.filters = evtData.filters;
        } catch (e) {
            console.log(e);
        }
    }
    openSearch (evt) {
        let evtData = evt.deatil;
        try{
            this.isOpen = evtData.openModal;
        } catch (e) {
            console.log(e);
        }
    }
    checkTerms (evt){
        let evtData = evt.deatil;
        try{
            this.isOpen = evtData.openModal;
            this.agreedTerms= evtData.isChecked;
        } catch (e) {
            console.log(e);
        }
    }
    doInitAuxiliar (){
        try{
            console.log('doInitAuxiliar');
            if(this.showAccountPayment == false){
                this.getIsCashNexusM();
                this.getCheckboxWelcomePack();
                this.getAccountsAndPayments();
            }
        }catch(e){
            console.log(e);
        }
    }
    getCheckboxWelcomePack(){
        try {
            getCheckboxWelcomePack().then(result => {
                if (result !== '' && result !== undefined) {
                    if(result == false) {
                        this.showWelcome = true;
                    } else {
                        this.showWelcome = false;
                    }
                } else {
                    console.log('empty response in getCheckboxWelcomePack');
                }
            }).catch(errors => {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log('Error message: ' + 
                                    errors[0].message);
                    }
                } else {
                    console.log('Unknown error');
                }
            });
        } catch (e) {
            console.log('Unknown error');
        }
    }
    
    getAccountsAndPayments(){
        this.template.querySelector('c-lwc_service-component').callApex2(getAccountsAndPayments, {}, this.setAccountsAndPayments);
        // component.find("service").callApex2(component, helper, "c.getAccountsAndPayments", {}, helper.setAccountsAndPayments);
    }
    openPaymentUETRTrack(){
        this.template.querySelector('c-lwc_service-component').redirect("payment-uetr-track", "c__comesFromTracker=true");
    }

    getAccounts(){
        try {
            var action = component.get("c.getAccounts");
            getAccounts.then(result => {
                if (result) {
                    var resJSON =JSON.parse(result).accountsDataList;
                    var accounts=[];
                    for(var i in resJSON){
                        accounts.push({'account':resJSON[i].accountIdList[0].accountId,'bic':resJSON[i].bankId,'id_type':resJSON[i].accountIdList[0].idType,'alias':resJSON[i].alias});
                    }
                    this.accountList = accounts;
                    this.ready = true;
                    this.errorAccount = false;
                    
                }else{
                    this.ready = true;
                    this.errorAccount = true;
                }
            }).catch(error => {
                var errors = response.getError();
                if (errors) {
                    this.errorAccount = true;

                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            });
        } catch (e) {
            console.log(e);
        }
    }
    setAccountsAndPayments(response){
        try {           
            if(response){
                // Sets the accounts data
                //var resJSON =JSON.parse(response).accountsDataList;
                var resJSON = response.accountsDataList;
                var accounts=[];
                
                // Set GP and Payments Tracker permission     
                let userId = userId;
                window.localStorage.setItem(userId + "_hasGlobalPositionAccess", resJSON[0].canUserSeeGP);
                window.localStorage.setItem(userId + "_hasPaymentsTrackerAccess", resJSON[0].canUserSeePaymentsTracker);
                
                // If the user has access to see Payments Tracker
                if(resJSON[0].canUserSeePaymentsTracker){
                    for(var i in resJSON){
                        accounts.push({'account':resJSON[i].accountIdList[0].accountId,'bic':resJSON[i].bankId,'id_type':resJSON[i].accountIdList[0].idType,'alias':resJSON[i].alias});
                    }
                    this.accountList = accounts;
                    this.ready = true;
                    this.errorAccount = false;
    
                    // Sets the payments data
                    //component.find("paymentsTable").initTable(JSON.parse(response));
                    this.loading = false;
                    this.template.querySelector('c-lwc_ipt-table').initTable(response);  
                } else {
                    this.loading = false;
                	// Set access denied error
                	this.showNoAccessError = true;
                    this.showWelcome = false;
                }    
            }else{
                this.ready = true;
                this.errorAccount = true;
                this.loading = false;
            }
        } catch (e) {
            console.log(e);
        }
    }
}