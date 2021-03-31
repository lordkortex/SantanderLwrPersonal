import { LightningElement, api, track } from 'lwc';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';

// Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

// Import labels
import singleChoice from '@salesforce/label/c.singleChoice';
import multipleChoice from '@salesforce/label/c.multipleChoice';
import advancedFilters from '@salesforce/label/c.advancedFilters';
import close from '@salesforce/label/c.close';
import originAccount from '@salesforce/label/c.originAccount';
import beneficiaryAccountLabel from '@salesforce/label/c.beneficiaryAccount';
import currency from '@salesforce/label/c.currency';
import from from '@salesforce/label/c.from';
import amount from '@salesforce/label/c.amount';
import to from '@salesforce/label/c.to';
import status from '@salesforce/label/c.status';
import writeAnAccountNumber from '@salesforce/label/c.writeAnAccountNumber';
import beneficiaryCountry from '@salesforce/label/c.beneficiaryCountry';
import valueDate from '@salesforce/label/c.valueDate';
import writeAWord from '@salesforce/label/c.writeAWord';
import thatContains from '@salesforce/label/c.thatContains';
import clearAll from '@salesforce/label/c.clearAll';
import apply from '@salesforce/label/c.apply';
import payment_statusOne from '@salesforce/label/c.payment_statusOne';
import payment_statusTwo from '@salesforce/label/c.payment_statusTwo';
import payment_statusThree from '@salesforce/label/c.payment_statusThree';
import payment_statusFour from '@salesforce/label/c.payment_statusFour';
import toAmountLowerThanFrom from '@salesforce/label/c.toAmountLowerThanFrom';
import Account from '@salesforce/label/c.Account';
import loadingLabel from '@salesforce/label/c.Loading';





// Import apex methods
import getStatus from '@salesforce/apex/CNT_MRTrackerSearch.getStatus';
import getISO2Values from '@salesforce/apex/CNT_MRTrackerSearch.getISO2Values';
import getCurrencies from '@salesforce/apex/CNT_MRTrackerSearch.getCurrencies';


export default class Lwc_iptAdvancedFilters extends LightningElement {

    label = {
        singleChoice,
        multipleChoice,
        advancedFilters,
        close,
        originAccount,
        beneficiaryAccountLabel,
        currency,
        from,
        amount,
        to,
        status,
        writeAnAccountNumber,
        beneficiaryCountry,
        valueDate,
        writeAWord,
        thatContains,
        clearAll,
        apply,
        payment_statusOne,
        payment_statusTwo,
        payment_statusThree,
        payment_statusFour,
        toAmountLowerThanFrom,
        Account,
        loadingLabel
    };

    //@track currencylist = [];
    @api statuslist = ['On hold', 'In progress', 'Completed', 'Rejected'];
    @api countrylist = [];
    @api selectedcurrency = singleChoice;
    @api selectedcountry = singleChoice;
    @api selectedstatus = [];
    @track selectedstatuslabel = this.label.multipleChoice;
    @api accountlist = [];
    @track selectedaccountlabel = this.label.multipleChoice;
    @api selectedaccount;
    @track thatcontains = '';
    @api settledfrom = '';
    @api settledto = '';
    @api settlederrorto = '';
    @api settlederrorfrom;
    @api dateerrorfrom = "dd/mm/yyyy";
    @api dateerrorto = "dd/mm/yyyy";
    @api datesvalidity;
    @api count = '0';
    @api inoutindicator;
    @api datefrom = '';
    @api dateto = '';
    @api accountlisttodisplay;
    @api accountfilter;
    @api isaccountfilter = false;
    @api isopen = false;
    @api filters = '';
    @track accountListToDisplay = []
    _dateFrom = '';
    _dateTo = '';
    timeoutSearchAccount = null;
    @api beneficiaryaccount = '';
    
    @track classSettleFrom = 'slds-input inputShadow lwc_input';
    @track classSettleTo = 'slds-input inputShadow lwc_input';
    @track mensajeError = 'textHelp';
    noAccountSelected = true;

    @track loading;


    @api currencylist = [];
    @api fromDetail
    @api selectedAccounts
    @api valueDateFrom

    isDetail;


    getCurrency (){
        try {
            getCurrencies().then((result) => {
                if (result) {
                    var res = new Array(result.length);
                    for(var i=0; i<result.length; i++){
                      var item = new Object();
                      item.label=result[i];
                      item.value=result[i];
                      res[i] = item;
                    }
                    this.currencylist = res;
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
    statusdropdownvalueselectedhandler(event) {
        try {
            this.selectedstatus = event.detail.selectedvalues;
            console.log('statusdropdownvalueselectedhandler executed: '+event.detail.selectedvalues);
        } catch(e) {
            console.error(e);
        }
    }

    countriesdropdownvalueselectedhandler(event) {
		this.selectedcountry = event.detail.selectedvalues;
		console.log('countriesdropdownvalueselectedhandler executed: '+event.detail.selectedvalues);
    }

    accountdropdownvalueselectedhandler(event) {
		this.selectedaccount = event.detail.selectedvalues;
		console.log('accountdropdownvalueselectedhandler executed: '+event.detail.selectedvalues);
    }

    currencydropdownvalueselectedhandler(event) {
		this.selectedcurrency = event.detail.selectedvalues;
		console.log('currencydropdownvalueselectedhandler executed: '+event.detail.selectedvalues);
    }

    changedatefromhandler(event) {
        try {
            this._dateFrom = new Date(event.detail).toISOString().split('T')[0];
            console.log('changedatefromhandler executed: '+event.detail);
        } catch(e) {
            this._dateFrom = '';
        }
    }

    changedatetohandler(event) {
        try {
            this._dateTo = new Date(event.detail).toISOString().split('T')[0];
            console.log('changedatefromhandler executed: '+event.detail);
        } catch(e) {
            this._dateTo = '';
        }
    }
    changeThatContains(evt) {
        this.thatcontains = evt.currentTarget.value;
    }

    @api
    get dateFrom(){
        return this._dateFrom;
    }

    set dateFrom(datefrom){
        this._dateFrom = datefrom;
    }
        
    @api
    get dateTo(){
        return this._dateTo;
    }

    set dateTo(dateto){
        this._dateTo = dateto;
    }

    get accountLabel1() {
        return this.inoutindicator == 'OUT' ? this.label.originAccount : this.label.beneficiaryAccountLabel;
    }

    get accountLabel2() {
        return this.inoutindicator == 'IN' ? this.label.originAccount : this.label.beneficiaryAccountLabel;
    }

    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
        this.getStatuses();
        this.getCountries();
        this.getCurrency();
        
        this.loading = false;

        var accountsToDisplayT = [];
        for(var i in this.accountlist){
            accountsToDisplayT.push({"label":this.accountlist[i].account, "value":this.accountlist[i].account});
        }
        this.accountListToDisplay = accountsToDisplayT;
    }

    @api
    updateFilterData(data) {
        if(data){
            var value = data.valueInput;
            var filter= data.filter;
            var doFilter= data.doFilter;

            if(filter != ''){
                if(filter === this.label.Account && JSON.stringify(this.selectedaccount) != JSON.stringify(value)){
                    this.selectedaccount = value;
                }else if(filter === this.label.currency && JSON.stringify(this.selectedcurrency) != JSON.stringify(value)){
                    if(value === ''){
                        this.selectedcurrency = this.label.singleChoice;
                    }else{
                        this.selectedcurrency = value;
                    }
                }else if(filter === 'settledFrom' && JSON.stringify(this.settledfrom) != JSON.stringify(value)){
                    this.settledfrom = value;
                }else if(filter === 'settledTo' && JSON.stringify(this.settledto) != JSON.stringify(value)){
                    this.settledto = value;
                }

                if(doFilter){
                    this.filterData();
                }
            }
        }
    }

    filterData() {
        try{
            if(this.filters != null && this.filters != undefined){
                const getfilterevent = new CustomEvent('getfilter', {
                    detail : {filters : this.filters, count: this.count, noAccountSelected: this.noAccountSelected}
                });
                this.dispatchEvent(getfilterevent);
            }     
        } catch (e) {
            console.log(e);
        }    
    }

    searchAccountBeneficiary(evt) {
        this.beneficiaryaccount = evt.currentTarget.value;
        if (this.timeoutSearchAccount != undefined && this.timeoutSearchAccount != null) {
            clearTimeout(this.timeoutSearchAccount);
        }
        this.timeoutSearchAccount = setTimeout(() => {
            this.refreshPills();
        }, 250);
    }

    refreshPills() {
        try {
            //Get all the pills to show
            var thatcontains = this.thatcontains;
            var beneficiaryaccount = this.beneficiaryaccount;
            var currency = this.selectedcurrency;
            var settledfrom = this.settledfrom;
            var settledto = this.settledto;
            var datefrom = this._dateFrom;
            var dateto = this._dateTo;
            var selectedstatus = this.selectedstatus;
            var country = this.selectedcountry;
            if (Array.isArray(this.selectedcountry) && this.selectedcountry.length > 0){
                country = this.selectedcountry[0];
            }
            var account = this.selectedaccount;           
            var filter = '{"searchData": {"latestPaymentsFlag": "NO","_limit": "1000","_offset": "0", "inOutIndicator" : "' +  this.inoutindicator + '",';
            var count = 0;
            //Set the pills array and the filters String
            if(settledfrom != null && settledfrom != "" && (settledto == null || settledto == "")){
                // 11/03/2021
                this.settledto = "";
                // END 11/03/2021
                filter+= '"amountFrom":"' + settledfrom + '",';
                filter+= '"amountTo":"999999999999999999",';
                count+= 1;
            }
            if(settledto != null && settledto != "" && (settledfrom == null || settledfrom == "")){
                //11/03/2021
                this.settledfrom = "";
                // END 11/03/2021
                filter+= '"amountTo":"' + settledto + '",';
                filter+= '"amountFrom":"0",';
                count+= 1;
            }
            if(settledto != null && settledto != "" && settledfrom != null && settledfrom != ""){
                filter+= '"amountTo":"' + settledto + '",';
                filter+= '"amountFrom":"' + settledfrom + '",';
                count+= 1;

            }
            if(datefrom != null && datefrom != "" && datefrom != this.label.from && (dateto == null || dateto == "" || dateto == this.label.to)){

                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth()+1).padStart(2, '0'); //As January is 0.
                var yyyy = today.getFullYear();
                today = yyyy + '-' + mm + '-' + dd;

                filter+= '"valueDateFrom":"' + datefrom + '",';
                filter+= '"valueDateTo":"' + today + '",';
                count+= 1;

            }
            if(dateto != null && dateto != "" && dateto != this.label.to && (datefrom == null || datefrom == "" || datefrom == this.label.from)){
                filter+= '"valueDateTo":"' + dateto + '",';
                var e = new Date(dateto);
                e.setMonth(e.getMonth()-25);
                var dd = String(e.getDate()).padStart(2, '0');
                var mm = String(e.getMonth()+1).padStart(2, '0'); //As January is 0.
                var yyyy = e.getFullYear();
                var date = yyyy+'-'+mm+'-'+dd;

                filter += '"valueDateFrom":"' + date + '",';
                count+=1 ;

            }

            if(dateto != null && dateto != "" && dateto != this.label.to && datefrom != null && datefrom != "" && datefrom != this.label.from){
                filter+= '"valueDateTo":"' + dateto + '",';
                filter+= '"valueDateFrom":"' + datefrom + '",';
                count+= 1;

            }

            if(thatcontains != null && thatcontains != ""){
                filter+=  '"searchText":"' + thatcontains + '",';
                count+=1 ;

            }

            if(beneficiaryaccount != undefined  && beneficiaryaccount != null && beneficiaryaccount != ""){
                if(this.inoutindicator == "OUT")
                {
                    filter += '"beneficiaryAccountList": [{';
                }
                else
                {
                    filter += '"originatorAccountList": [{';
                }
                
                filter += '"bankId":"",  "account":{"idType":"", "accountId" :"' + beneficiaryaccount + '"}}],';
                
                count+= 1;

            }

            if(currency != undefined && currency != null && currency != ""  && currency != this.label.singleChoice){
                filter+= '"currency":"' + currency + '",';
                count+=1;

            }
           //11/03/2021
        /*    if(account != null && account != ""  && account != this.label.singleChoice){
               if(this.inoutindicator == "OUT") {
                    filter+= '"originatorAccountList":[';
                }
                else {
                    filter+= '"beneficiaryAccountList":[';
                }
                for (var i in account){
                    var accountName = account[i].split('-')[0];
                    var data = this.findAccountAgent(accountName);
                    filter+= '{"bankId":"' + data.bic + '","account":{"idType":"' + data.idType + '","accountId":"' + accountName + '"}},';
                }
                filter = filter.slice(0,-1) + "],";
                count+= 1;
                this.noAccountSelected  = false;
            }else{
                filter+= this.accountfilter + ",";
                this.noAccountSelected  = true;
            }
        */
       //END 11/03/2021

            if(country != undefined && country != null && country != ""  && country != this.label.singleChoice){
                filter+= '"country":"' + country.substring(0,2) + '",';
                count+= 1;

            }


            if(selectedstatus != null && selectedstatus != undefined && selectedstatus.length!=0){

                if(this.fromDetail == this.isDetail ) {
                    filter+='"paymentStatusList":[';
                    for (var i in selectedstatus){
                        var data = this.findStatus(selectedstatus[i]);
                        if(selectedstatus[i] == this.label.payment_statusThree || selectedstatus[i] == this.label.payment_statusFour || selectedstatus[i] == this.label.payment_statusTwo){
                            for(var j in data){
                                filter+='{"status":"'+data[j].status+'","reason":"'+data[j].reason+'"},';
                            }
    
                        }else{
                            filter+='{"status":"'+data.status+'","reason":"'+data.reason+'"},';
                        }
                    }
                } else {
                    filter+='"paymentStatusList":'
                    filter+=JSON.stringify(selectedstatus);
                    var stringList = JSON.stringify(selectedstatus);
                    this.isDetail = true;
                    this.selectedstatus = this.buildStatus(stringList);;
                }
                
                filter=filter.slice(0,-1)+"],";
                count+=1;

            }

            //11/03/2021
            if(account != undefined &&  account != null && account != ""  && account!=this.label.singleChoice && account.length > 0){
                if(this.inoutindicator == "OUT") {
                    filter+='"originatorAccountList":[';

                } else {
                    filter+='"beneficiaryAccountList":[';
                }
                for (var i in account){
                    var accountName=account[i].split('-')[0];
                    var data=this.findAccountAgent(accountName);
                    filter+='{"bankId":"'+data.bic+'","account":{"idType":"'+data.idType+'","accountId":"'+accountName+'"}},';
                }
                filter=filter.slice(0,-1)+"],";
                count+=1;
            } else {
                if(this.inoutindicator == "OUT") {
                    filter+='"originatorAccountList":[';
                } else {
                    filter+='"beneficiaryAccountList":[';
                }

                var allAccounts = this.accountlist;
                for (var i in allAccounts) {
                    filter+='{"bankId":"'+allAccounts[i].bic+'","account":{"idType":"'+allAccounts[i].id_type+'","accountId":"'+allAccounts[i].account+'"}}';
                }
                filter = filter.replaceAll('}{', '},{');
                filter+='],';

                if (this.inoutindicator == "OUT" && (!filter.includes("amountFrom") && !filter.includes("amountTo") && !filter.includes("valueDateFrom") && !filter.includes("valueDateTo") && !filter.includes("searchText") && !filter.includes("currency") && !filter.includes("beneficiaryCountry") && !filter.includes("paymentStatusList") && !filter.includes("beneficiaryAccountList"))) {
                    filter = filter.replace("NO", "YES");
                }
                if (this.inoutindicator == "IN" && (!filter.includes("amountFrom") && !filter.includes("amountTo") && !filter.includes("valueDateFrom") && !filter.includes("valueDateTo") && !filter.includes("searchText") && !filter.includes("currency") && !filter.includes("originatorCountry") && !filter.includes("paymentStatusList") && !filter.includes("originatorAccountList"))) {
                    filter = filter.replace("NO", "YES");
                }

            } 



            //END 11/03/2021
            

            this.count = count;
            filter= filter.slice(0,-1) + "}}";
            if(filter != ""){
               this.filters = filter;
            }

        } catch (e) {
            // Handle error
            console.error(e);
        } 
    }

    getStatuses(){
        try {
            getStatus()
                .then(result => {
                    var res = new Array(result.length)
                    for(var i=0; i<result.length; i++){
                        var item = new Object();
                        item.label = result[i];
                        item.value = result[i];
                        res[i]=item;
                    }
                    this.statuslist = res;
                })
                .catch(error => {
                    console.log('KO '+error);
                });
        } catch (e) {
            console.log(e);
        }
    }

    getCountries() {
        try {
            getISO2Values()
                .then(result => {
                    var res = new Array(result.length)
                    for(var i=0; i<result.length; i++){
                        var item = new Object();
                        item.label = result[i];
                        item.value = result[i];
                        res[i]=item;
                    }
                    res.sort((a,b) => (a.value > b.value) ? 1 : ((b.value > a.value) ? -1 : 0)); 
                    this.countrylist = res;
                })
                .catch(error => {
                    console.log('KO '+error);
                });
        } catch (e) {
            console.log(e);
        }
    }

    getAccounts(){
        try {
            var accountlist = this.accountlist;
            if(accountlist.length > 0){
                var accountsToDisplay = [];
                for(var i in accountlist){
                    accountsToDisplay.push(accountlist[i].account);
                }
                this.accountlisttodisplay = accountsToDisplay;

                this.ready = true;
            }

        } catch (e) {
            console.log(e);
        }
    }

    findAccountAgent(account) {
        try{
            var accounts = this.accountlist;

            for(var i in accounts ){
                if(accounts[i].account == account){
                    return {'bic':accounts[i].bic, 'idType':accounts[i].id_type};
                }
            }   
        } catch (e) {
            console.log(e);
        }    
    }

    findStatus(status) {
        try{
            //Completed
            if(status == this.label.payment_statusTwo){
                return [{'status':'ACSC','reason':''}, {'status':'ACCC','reason':''}];
                //Rejected
            }else if(status == this.label.payment_statusOne){
                return {'status':'RJCT','reason':''};
                //On hold
            }else if(status == this.label.payment_statusFour){
                return [{'status':'ACSP','reason':'G002'}, {'status':'ACSP','reason':'G003'}, {'status':'ACSP','reason':'G004'}];
                //In progress
            }else if(status == this.label.payment_statusThree){
                return [{'status':'ACSP','reason':'G000'}, {'status':'ACSP','reason':'G001'}];
            }
            
                 
        } catch (e) {
            console.log(e);
        }    
    }

    close() {
        this.isopen = false;
    }

    clear() {
        try {
            this.thatcontains = null;
            this.beneficiaryaccount='';
            this.settledfrom = '';
            this.settledto = '';
            this._dateFrom = '';
            this._dateTo = '';
            this.settledErrorTo = '';
            this.validateDate();

            this.clearStatus();
            this.clearCurrency();
            this.clearAccount();
            this.clearCountry();
        } catch (e) {
            console.log(e);
        }
    }

    validateDate() {
        try{
            var error = "ok";
            var datefrom = this._dateFrom;
            var dateto = this._dateTo;

            if(dateto != null && dateto != undefined && dateto != "" && datefrom != null && datefrom != undefined && datefrom != ""){
                if(dateto < datefrom){
                    this.dateerrorto = "dd/mm/yyyy";
                    this.dateto = "";
                    error = "error";
                }
            }

            if(error == "ok"){
                this.refreshPills();
            }
        } catch (e) {
            console.log(e);
        }
    }

    clearStatus(){
        try{
            var selectedstatus = this.selectedstatus;

            if(selectedstatus != undefined && selectedstatus != null){
                this.selectedstatus = [];
                
                this.selectedstatuslabel = this.label.multipleChoice;
                this.template.querySelector("[data-name='statusDropdown']").onSelectionUpdate([this.selectedstatuslabel]);
            }

        } catch (e) {
            console.log(e);
        }
    }

    clearCurrency() {
        try{
            if(this.selectedcurrency != this.label.singleChoice){
                this.selectedcurrency = this.label.singleChoice;
                this.template.querySelector("[data-name='currencyDropdown']").onSelectionUpdate([this.selectedcurrency]);
            }
        } catch (e) {
            console.log(e);
        }
    }

    clearAccount() {
        try{
            var selectedstatus = this.selectedaccount;

            if(selectedstatus != undefined && selectedstatus != null){
                this.selectedaccount = [];
                this.selectedaccountlabel = this.label.multipleChoice;
                this.template.querySelector("[data-name='accountDropdown']").onSelectionUpdate([this.selectedaccountlabel]);
            }
        } catch (e) {
            console.log(e);
        }
    }

    clearCountry() {
        try{
            if(this.selectedcountry != this.label.singleChoice){
                this.selectedcountry = this.label.singleChoice;
                //this.template.querySelector("[data-name='countryDropdown']").onSelectionUpdate([this.selectedcountry]);
            }
        } catch (e) {
            console.log(e);
        }
    }

    apply() {
        this.loading = true;
        this.applyAsync()
            .then((value) => {
                this.loading = false;
                this.isopen = false;
            })
            .catch((error) => {
                this.loading = false;
                this.isopen = false;
            })
            .finally(() => {
                this.loading = false;
                this.isopen = false;
            });
    }


    async applyAsync  () {
        return new Promise( (resolve, reject)  => {
            this.isDetail = false;
            this.fromDetail = false;
            
            if(this.settledfrom != undefined && this.settledto != undefined ){
                this.validateSettled();
            }
    
            this.changeTo();
            this.changeFrom();
            this.changeAccount();
            this.changeCurrency();
            try {
                this.refreshPills();
                if(this.settlederrorto === ''){
                        this.filterData();
                } 
            } catch(e) {
                console.error(e);
            }
            resolve('ok');
        }, this);
    }

    changeFrom() {
        if(this.settledfrom != undefined){
            const updatefilterevent = new CustomEvent('updatefilter', {
                detail: {filter : "settledFrom", value: this.settledfrom},
            });
            this.dispatchEvent(updatefilterevent);
            this.refreshPills();
        }
    }

    changeTo() {
        if(this.settledto != undefined){
            const updatefilterevent = new CustomEvent('updatefilter', {
                detail: {filter : "settledTo", value: this.settledto},
            });
            this.dispatchEvent(updatefilterevent);
            this.refreshPills();
        }
    }

    changeAccount() {
        if(this.selectedaccount != undefined){
            const updatefilterevent = new CustomEvent('updatefilter', {
                detail: {filter : this.label.Account, value: this.selectedaccount},
            });
            this.dispatchEvent(updatefilterevent);
            this.refreshPills();
        }
    }

    changeCurrency() {
        if(this.selectedcurrency != undefined){
            const updatefilterevent = new CustomEvent('updatefilter', {
                detail: {filter : "currency", value: this.selectedcurrency},
            });
            this.dispatchEvent(updatefilterevent);
            this.refreshPills();
        }
    }
    @api
    openModal(){
       this.isopen = true;
    }

    @api
    setCurrencyFromComponent(params) {
        this.selectedcurrency = params;
        this.refreshPills();
        this.filterData();
    }

    @api
    setSettledFromComponent(f,t){
        this.settledfrom = f;
        this.settledto= t;
        this.refreshPills();
        this.filterData();
    }

    @api
    setSettledFromOnlyComponent(f){
        this.settledfrom = f;
        this.refreshPills();
        this.filterData();
    }

    @api
    setSettledToOnlyComponent(t){
        this.settledto = t;
        this.refreshPills();
        this.filterData();
    }

    @api
    setStatusFromComponent(params){
        this.selectedstatus = params;
        this.refreshPills();
        this.filterData();
    }

    @api
    setAccountFromComponent(params){
        this.selectedaccount = params;
        this.refreshPills();
        this.filterData();
    }
    handleAmountChangeSettledto(e){
        this.settledto = e.detail.value;  
        /*if(this.settledto != undefined){
            this.validateSettled(); 
        }*/
    }

    handleAmountChangeSettledfrom(e){
        this.settledfrom = e.detail.value;
        /*if(this.settledfrom != undefined){
            this.validateSettled();
        }*/
    }


    validateSettled(){
        
        try{
            var error='ok';
            var settledFrom=this.settledfrom;
            var settledTo=this.settledto;
            console.log('settledFrom: ' + settledFrom);
            console.log('settledTo: ' + settledTo);

            if(settledFrom != null && settledFrom != undefined && settledFrom != ''){
                if(parseInt(settledFrom)<0){
                    this.settledfrom = '';
                }
            }

            if(settledTo != null && settledTo != undefined && settledTo != ''){
                if(parseInt(settledTo)<0){
                    this.settledto = '';
                }
            }

            if(settledTo != null && settledTo != undefined && settledTo != '' && settledFrom != null && settledFrom != undefined && settledFrom != ''){
                if(parseInt(settledTo)<parseInt(settledFrom)){
                    
                    this.classSettleFrom = 'slds-input inputShadow lwc_input ' + 'inputShadowError';
                    this.classSettleTo = 'slds-input inputShadow lwc_input ' + 'inputShadowError';
                    this.mensajeError = 'textHelp';

                    /*
                    $A.util.removeClass(component.find("settledErrorTo"),"hidden");
                    $A.util.addClass(component.find("settledTo"),"inputShadowError");
                    //$A.util.removeClass(component.find("settledErrorFrom"),"hidden");
                    $A.util.addClass(component.find("settledFrom"),"inputShadowError");
                    */

                    this.settledErrorTo= this.label.toAmountLowerThanFrom;
                    error='error';
                }else{
                    
                    this.classSettleFrom = 'slds-input inputShadow lwc_input'
                    this.classSettleTo = 'slds-input inputShadow lwc_input'
                    this.mensajeError = 'textHelp hidden';
                    
                    /*
                    $A.util.addClass(component.find("settledErrorTo"),"hidden");
                    $A.util.removeClass(component.find("settledTo"),"inputShadowError");
                    $A.util.addClass(component.find("settledErrorFrom"),"hidden");
                    $A.util.removeClass(component.find("settledFrom"),"inputShadowError");
                    */                   

                    this.settledErrorTo = '';
                }
            
            }else{

                this.classSettleFrom = 'slds-input inputShadow lwc_input'
                this.classSettleTo = 'slds-input inputShadow lwc_input'
                this.mensajeError = 'textHelp hidden';
                /*
                $A.util.addClass(component.find("settledErrorTo"),"hidden");
                $A.util.removeClass(component.find("settledTo"),"inputShadowError");
                $A.util.addClass(component.find("settledErrorFrom"),"hidden");
                $A.util.removeClass(component.find("settledFrom"),"inputShadowError");
                */
               
                this.settledErrorTo='';

            }

            if(error=='ok'){
                this.refreshPills();
            }
        } catch (e) {
            console.log(e);
        }
    } 


    @api
    get apiselectedstatus(){
        return this.selectedstatus;
    }
 
    set apiselectedstatus(value){
        var stringList = JSON.stringify(value);
        this.selectedstatus = this.buildStatus(stringList);
    }

    buildStatus(stringList){

        var newList = [];
            
        if(stringList != undefined){
            if(stringList.includes('{"status":"ACSC","reason":""},{"status":"ACCC","reason":""}') === true){
                newList.push(this.label.payment_statusTwo); 
            }
            //Rejected
            if(stringList.includes('{"status":"RJCT","reason":""}') === true){
                newList.push(this.label.payment_statusOne);
            }
            //On hold
            if(stringList.includes('{"status":"ACSP","reason":"G002"},{"status":"ACSP","reason":"G003"},{"status":"ACSP","reason":"G004"}') == true){
                newList.push(this.label.payment_statusFour);
            }
            //In progress
            if(stringList.includes('{"status":"ACSP","reason":"G000"},{"status":"ACSP","reason":"G001"}') == true){
                newList.push(this.label.payment_statusThree);
            }
        }

        return newList;
    }
    
    

}