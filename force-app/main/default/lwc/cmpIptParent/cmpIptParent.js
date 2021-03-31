import { LightningElement, api, wire } from 'lwc';

import getAccounts from '@salesforce/apex/CNT_MRTrackerSearch.getAccounts';

// Import custom labels
import error from '@salesforce/label/c.ERROR';
import errorNoAccess from '@salesforce/label/c.ERROR_NO_ACCESS';
import loading from '@salesforce/label/c.Loading';
import accounts from '@salesforce/label/c.Accounts';
import paymentsTracker from '@salesforce/label/c.PaymentsTracker';
import errorNotRetrieved from '@salesforce/label/c.ERROR_NOT_RETRIEVED';


export default class CmpIptParent extends LightningElement {
    @api recordId;
    @api ready;
    @api isIE;
    @api isOpen = false;
    @api accountList = [];
    @api currencyList = [];
    @api errorAccount;
    @api filters;
    @api loading;
    @api showWelcome;
    @api showTerms;
    @api isCashNexus;
    @api agreedTerms;
    @api isBIC;
    @api isGB;
    @api isES;
    @api isPL;
    @api isCL;
    @api isMX;
    @api isOther;
    @api country;
    @api fromCashNexus;
    @api isOneTrade;
    @api showAccountPayment;
    @api accountObj = { country:'', bank:'', accountNumber:'',  bic:'', bankAlias:'', bookBalance:'', availableBalance:'',  accountAlias: '', currency:'', accountName: '', iIdType:'', iSource:'', dateValue:'', hourValue:'', lastUpdate: ''};
    @api showNoAccessError;


    @wire (getAccounts) accounts;
    // Expose the labels to use in the template.

    label = {
        error,
        errorNoAccess,
        loading,
        accounts,
        paymentsTracker,
        errorNotRetrieved,
    };

    
    //Condition aura:if
    condition1(){
        if(this.fromCashNexus == true && this.showAccountPayment == false)
            return true;
        else
            return false;
    }

    condition2(){
        if(this.accountList.length>0)
            return true;
        else
            return false;
    }

    condition3(){
        if(this.agreedTerms && this.isCashNexus == false)
            return true;
        else
            return false;
    }

    //Eventos
    evtSearchFilter(){
        var event = new CustomEvent("search",{
            detail:{
                filters,
                count
            }
        });

        this.dispatchEvent(event);
    }

    evtOpenModal(){
        var event = new CustomEvent ("open",{
            detail:{
                openModel: true
            }
        });

        this.dispatchEvent(event);
    }

    evtTermsConditions(){
        var event = new CustomEvent ("checked",{
            detail:{
                isChecked: false
            }
        });

        this.dispatchEvent(event);
    }


    getFilters () {
        try{
            this.filters = this.evtSearchFilter;
        } catch (e) {
            console.log(e);
        }
    }


    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Init Method
    History
    <Date>			<Author>		<Description>
    17/03/2020		R. Alexander Cervino     Initial version*/

    connectedCallback() {
        this.loading = true;
        try{
            this.checkBrowserhelper();
            let userId = this.get( "$SObjectType.CurrentUser.Id" );
            let hasTrackerAccess = window.localStorage.getItem(userId + "_hasPaymentsTrackerAccess");
            if(hasTrackerAccess != false && hasTrackerAccess != "false"){
                window.sessionStorage.setItem(userId + "_firstAccess", false);
                

                //AM - 05/11/2020 - Portugal SSO Tracker
                this.getUserCountryhelper();

                this.getCurrencyhelper();

                //01/04/2020 - Account Payments Tracker
                this.getURLParamshelper();
            } else {
                this.loading = false;
                // Set access denied error
                this.showNoAccessError = true;
            }
        } catch (e) {
            console.log(e);
        }
    }


    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to open the modal
    History
    <Date>			<Author>		<Description>
    17/03/2020		R. Alexander Cervino     Initial version*/

    

    openSearch () {
        try{
            this.isOpen = this.evtOpenModal;
        } catch (e) {
            console.log(e);
        }
    }


    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to get if user has terms and conditions
    History
    <Date>			<Author>		<Description>
    17/03/2020		R. Alexander Cervino     Initial version*/
    checkTerms (){
        try{
            var isChecked = this.evtTermsConditions;
            this.agreedTerms = isChecked;        
        } catch (e) {
            console.log(e);
        }
    }

    doInitAuxiliar (){
        try{
            if(this.showAccountPayment == false){
                this.getIsCashNexushelper();
                this.getCheckboxWelcomePackhelper();
                this.getAccountsAndPaymentshelper();
            }
        }catch(e){
            console.log(e);
        }
    }


    /*Author:       Guillermo Giral
    Company:        Deloitte
    Description:    Navigate to the accounts page
    History
    <Date>			<Author>		    <Description>
    04/04/2020		Guillermo Giral     Initial version
    */
    navigateToAccounts (){
        component.find("service").redirect("accounts", "");
    }

    
    /*Author:       Joaquin Vera
    Company:        Deloitte
    Description:    Navigate to the accounts page
    History
    <Date>			<Author>		    <Description>
    02/08/2020		Joaquin Vera     Initial version
    */
    openPaymentUETRTrack (){
        component.find("service").redirect("payment-uetr-track", "c__comesFromTracker=true");
    }



    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to get the accounts
    History
    <Date>			<Author>		<Description>
    17/03/2020		R. Alexander Cervino     Initial version*/

    getAccountshelper(){
        try {
            var action = this.accounts;
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var res =response.getReturnValue();
                    if(res!=null && res!=undefined && res!=""){
                        console.log(res);
                        var resJSON =JSON.parse(res).accountsDataList;

                        var accounts=[];
                        for(var i in resJSON){
                            console.log(resJSON[i].bankId);

                            accounts.push({'account':resJSON[i].accountIdList[0].accountId,'bic':resJSON[i].bankId,'id_type':resJSON[i].accountIdList[0].idType,'alias':resJSON[i].alias});
                        }
                        this.accountList = accounts;
                        this.ready = true;
                        this.errorAccount = false;
                    }else{
                        this.ready = true;
                        this.errorAccount = true;
                    }
                }
                else if (state === "ERROR") {
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
                }
            });

            this.enqueueAction(action);

        } catch (e) {
            console.log(e);
        }
    }


    /*
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Function to get the accounts and payments
    History
    <Date>			<Author>		    <Description>
    07/07/2020		Guillermo Giral     Initial version
    */

    getAccountsAndPaymentshelper(){
        component.find("service").callApex2( "c.getAccountsAndPayments", {}, helper.setAccountsAndPayments);
    }


    /*
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Function to set the accounts and payments
                    based on the webservice response
    History
    <Date>			<Author>		    <Description>
    07/07/2020		Guillermo Giral     Initial version
    */

    setAccountsAndPaymentshelper(response){
        try {           
            if(response!=null && response!=undefined && response!=""){
                // Sets the accounts data
                //var resJSON =JSON.parse(response).accountsDataList;
                var resJSON = response.accountsDataList;
                var accounts=[];
                
                // Set GP and Payments Tracker permission     
                let userId = this.get( "$SObjectType.CurrentUser.Id" );    
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
                    component.find("paymentsTable").initTable(response);  
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


    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to get if user agreed the welcome pack
    History
    <Date>			<Author>		<Description>
    17/03/2020		R. Alexander Cervino     Initial version*/

    getCheckboxWelcomePackhelper(){
        try {

            var action = component.get("c.getCheckboxWelcomePack");
            
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var iReturn = response.getReturnValue();
                    if(iReturn == false) {
                        this.showWelcome = true;
                    } else {
                        this.showWelcome = false;
                    }
                }
                else{
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                                        errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }
            });
            this.enqueueAction(action); 
        } catch (e) {
            console.log(e);
        }
    }


    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to get if user is Cash Nexus user
    History
    <Date>			<Author>		<Description>
    17/03/2020		R. Alexander Cervino     Initial version*/
    
    getIsCashNexushelper(){
        try{
            var action = component.get("c.getIsCashNexus");
        
            action.setCallback(this, function(response) {
                var state = response.getState();
                console.log("isCASHNE");
                console.log(state);
                if (state === "SUCCESS") {
                    var iReturn = response.getReturnValue();
                    console.log(iReturn);
                    for ( var key in iReturn ) {
                        if(key == "agreedTerms"){
                            this.agreedTerms = iReturn[key];
                        }
                        if(key == "isCashNexusUser"){
                            this.isCashNexus = iReturn[key];
                        }
                        if(key == "BIC"){
                            this.isBIC = iReturn[key];
                        }
                        if(key == "ES"){
                            this.isES = iReturn[key];
                        }
                        if(key == "PL"){
                            this.isPL = iReturn[key];
                        }
                        if(key == "CL"){
                            this.isCL = iReturn[key];
                        }
                        if(key == "GB"){
                            this.isGB = iReturn[key];
                        }
                        if(key == "MX"){
                            this.isMX = iReturn[key];
                        }
                        if(key == "Other"){
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
                        this.country = "GB";
                    } else if(es == true) {
                        this.country = "ES";
                        this.agreedTerms = true;
                    } else if(pl == true) {
                        this.country = "PL";
                    } else if(cl == true) {
                        this.country = "CL";
                    } else if(mx == true) {
                        this.country = "MX";
                    } else if(other == true) {
                        this.country = "Other";
                        this.agreedTerms = true;
                    } else if(this.isCashNexus == false && this.isBIC == false) {
                        this.agreedTerms = true;
                    }
                    
                    var nexus = this.isCashNexus;
                    var terms = this.agreedTerms;
                    var bic = this.isBIC;
                    
                    if(nexus == true && terms == false){
                        console.log("ENTROOK1");
                        this.showTerms = true;
                    }
                    
                    if(nexus == false && bic == true && terms == false) {
                        this.showTerms = true;
                    }
                }
                else {
                    var errors = response.getError();
                    console.log(errors);
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                                        errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }
            });
            this.enqueueAction(action);
        } catch (e) {
            console.log(e);
        }
    }


    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to get user browser
    History
    <Date>			<Author>		<Description>
    17/03/2020		R. Alexander Cervino     Initial version*/

    checkBrowserhelper() {
        try{
            console.log("BROWSER")
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
            console.log(browserType);
            if (browserType.startsWith("IE")) {
                this.isIE = true;
            }else{
                this.isIE = false;
            }
            
        } catch (e) {
            console.log(e);
        }
    }


    /*
    Author:         Adrian Munio
    Company:        Deloitte
    Description:    Method to obtain the user country.
    History
    <Date>			<Author>		<Description>
    05/11/2020		Adrian Munio    Adrian Munio
    */
    getUserCountryhelper(){
        let userId = this.get( "$SObjectType.CurrentUser.Id" );
        component.find("service").callApex2( "c.getUserCountry", {"userId" : userId}, helper.checkPTSSO);
    }


    /*
    Author:         Adrian Munio
    Company:        Deloitte
    Description:    Method to redirect the PT users that comes from SSO.
    History
    <Date>			<Author>		<Description>
    05/11/2020		Adrian Munio    Adrian Munio
    */
    checkPTSSOhelper(response){
        //let userId = $A.get( "$SObjectType.CurrentUser.Id" );
        //If the user country is Portugal and comes from SSO with and uetr cached we will redirect him to Search uetr screen.
        if(response != undefined && response != null && response != ""){
            //window.sessionStorage.setItem(userId + "_searchUETR", '0724d372-9102-41ea-957c-051758e95ed34');//Test Line
            //let uetr = window.sessionStorage.getItem("searchUETR");
            //if(uetr != null && uetr != ""){
                //window.sessionStorage.removeItem("searchUETR");
                component.find("service").redirect("payment-uetr-track", "c__comesFromTracker=true&c__uetr=" + response);
            //}
        }
    }

    
    /*
    Author:       Shahad Naji
    Company:        Deloitte
    Description:    The method below parses and returns the parameters.
    History
    <Date>			<Author>		<Description>
    01/04/2020		Shahad Naji     Initial version
    */
    getURLParamshelper() {
        try{
            
            var sPageURLMain = decodeURIComponent(window.location.search.substring(1));
            var sURLVariablesMain = sPageURLMain.split('&')[0].split("="); 
            var sParameterName;
            var sPageURL;
            var iAccount = this.accountObj;
            
            if (sURLVariablesMain[0] == 'params') {
                this.decrypt(sURLVariablesMain[1]).then(function(results){
                    sURLVariablesMain[1] === undefined ? 'Not found' : sPageURL = results;
                    var sURLVariables=sPageURL.split('&');

                    if(sURLVariables[0] != ""){
                        for ( var i = 0; i < sURLVariables.length; i++ ) {
                            sParameterName = sURLVariables[i].split('=');      
                            
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
							}
                            else if (sParameterName[0] === 'c__showFilters') {
                                // Payments Tracker for Nexus - When the user navigates from an account
                                sParameterName[1] == "true" ? this.showAccountPayment = true:this.showAccountPayment = false;
                            }else if (sParameterName[0] === 'c__isOneTrade') {
                                sParameterName[1] == "true" ? this.isOneTrade = true:this.isOneTrade = false;
                            }
                        }
                        this.fromCashNexus = true;                    
    
                        this.accountObj = iAccount;     
                        if(this.accountObj.iSource == 'fromAccount'){
                            var accounts=[];
                            accounts.push({'account':iAccount.accountNumber,'bic': iAccount.bic,'id_type':iAccount.iIdType,'alias': iAccount.accountAlias});  
                            this.accountList = accounts;
                            this.ready = true;
                            this.errorAccount = false;
                            if(this.fromCashNexus){
                                let filters = {
                                            "searchData": 
                                                {
                                                    "latestPaymentsFlag": "NO",
                                                    "_limit": "1000",
                                                    "_offset": "0",
                                                    "inOutIndicator": "OUT",
                                                    "originatorAccountList":[
                                                            {
                                                                "bankId": iAccount.bic,
                                                                "account":{
                                                                    "idType": iAccount.iIdType,
                                                                    "accountId": iAccount.accountNumber
                                                                }
                                                            }
                                                        ]
                                                }
                                            };
                                this.loading = false; 
                                this.filters = JSON.stringify(filters);
                            } 
                        } 
                    } else {
                        this.showAccountPayment = false;
                    }                                  
                });
            }else{
                this.showAccountPayment = false;
            }   
         
        } catch (e) {
            console.log(e);
        }
    }

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to decrypt data
    History
    <Date>			<Author>		<Description>
    19/11/2019		R. Alexander Cervino     Initial version*/

    decrypthelper( data){
        try {
            var result="null";
            var action = component.get("c.decryptData");
    
            action.setParams({ str : data }); 
            
            return new Promise(function (resolve, reject) {
                action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                                console.log("Error message: " + 
                                        errors[0].message);
                                reject(response.getError()[0]);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }else if (state === "SUCCESS") {
                    result = response.getReturnValue();
                }
                    resolve(result);
                });
                this.enqueueAction(action);
            });

        } catch(e) {
            console.error(e);
        }
    }


    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to get the accounts
    History
    <Date>			<Author>		<Description>
    17/03/2020		R. Alexander Cervino     Initial version*/

    getCurrencyhelper(){
        try {
            var action = component.get("c.getCurrencies");
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var res =response.getReturnValue();
                    if(res!=null && res!=undefined && res!=""){
                       
                        this.currencyList = res;
                    }
                }
                else if (state === "ERROR") {
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
                }
            });

            this.enqueueAction(action);

        } catch (e) {
            console.log(e);
        }
    }
}