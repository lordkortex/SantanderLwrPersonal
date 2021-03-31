import { LightningElement , api, track } from 'lwc';

//Labels
import selectOne from '@salesforce/label/c.selectOne';
import multipleChoice from '@salesforce/label/c.multipleChoice';
import latestInternationalPayments from '@salesforce/label/c.latestInternationalPayments';
import Loading from '@salesforce/label/c.Loading';
import mandatoryAccountAndBIC from '@salesforce/label/c.mandatoryAccountAndBIC';
import LocalSupportCountryError from '@salesforce/label/c.LocalSupportCountryError';
import uert from '@salesforce/label/c.uert';
import uetrError from '@salesforce/label/c.uetrError';
import type from '@salesforce/label/c.type';
import orderingAccount from '@salesforce/label/c.orderingAccount';
import writeAnAccountNumber from '@salesforce/label/c.writeAnAccountNumber';
import beneficiaryAccount from '@salesforce/label/c.beneficiaryAccount';
import orderingBIC from '@salesforce/label/c.orderingBIC';
import beneficiaryBIC from '@salesforce/label/c.beneficiaryBIC';
import status from '@salesforce/label/c.status';
import allStatuses from '@salesforce/label/c.allStatuses';
import valueDate from '@salesforce/label/c.valueDate';
import to from '@salesforce/label/c.to';
import fromlabel from '@salesforce/label/c.from';
import currency from '@salesforce/label/c.currency';
import settledAmount from '@salesforce/label/c.settledAmount';
import originCountry from '@salesforce/label/c.originCountry';
import thatContains from '@salesforce/label/c.thatContains';
import clear from '@salesforce/label/c.clear';
import apply from '@salesforce/label/c.apply';
import trackPaymentByUETR from '@salesforce/label/c.trackPaymentByUETR';
import beneficiaryCountry from '@salesforce/label/c.beneficiaryCountry';
import Emitidos from '@salesforce/label/c.Emitidos';
import Recibidos from '@salesforce/label/c.Recibidos';
import toAmountLowerThanFrom from '@salesforce/label/c.toAmountLowerThanFrom'
import IncorrectDateFormat from '@salesforce/label/c.IncorrectDateFormat';
import fromDateLessThanToday from '@salesforce/label/c.fromDateLessThanToday';
import validationDate from '@salesforce/label/c.validationDate'
import PAY_ErrorFromDate from '@salesforce/label/c.PAY_ErrorFromDate';
import PAY_ErrorToDate from '@salesforce/label/c.PAY_ErrorToDate'


//Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
//Apex Class
import getISO2Values from '@salesforce/apex/CNT_SwiftPaymentSearch.getISO2Values';
import getCurrencies from '@salesforce/apex/CNT_SwiftPaymentSearch.getCurrencies';
import getStatus from '@salesforce/apex/CNT_SwiftPaymentSearch.getStatus';
import getUserData from '@salesforce/apex/CNT_SwiftPaymentSearch.getUserData';


//Navegación
import { NavigationMixin } from 'lightning/navigation';
export default class Lwc_backFrontGPITrackerSearch extends LightningElement {

    label = {
        selectOne,
        multipleChoice,
        latestInternationalPayments,
        Loading,
        mandatoryAccountAndBIC,
        LocalSupportCountryError,
        uert,
        uetrError,
        type,
        orderingAccount,
        writeAnAccountNumber,
        beneficiaryAccount,
        orderingBIC,
        beneficiaryBIC,
        status,
        allStatuses,
        valueDate,
        to,
        fromlabel,
        currency,
        settledAmount,
        originCountry,
        thatContains,
        clear,
        apply,
        trackPaymentByUETR,
        beneficiaryCountry,
        Emitidos,
        Recibidos,
        toAmountLowerThanFrom,
        IncorrectDateFormat,
        fromDateLessThanToday,
        validationDate,
        PAY_ErrorFromDate,
        PAY_ErrorToDate
    }

    @track currencyList = ['EUR','GPB','USD','BRL','MXN'];
    @track statusList = ['On hold', 'In progress', 'Completed', 'Rejected'];
    @track countryList = [];
    @track selectedCurrency = this.label.selectOne;
    @track selectedCountry = this.label.selectOne;
    @track originCountry = this.label.selectOne;
    @track selectedStatus = []; 
    @track selectedStatusLabel = this.label.multipleChoice; 
    @track accountList = [];
    @track beneficiaryAccount = "";
    @track thatContains ="";
    @track settledFrom ="";
    @track settledTo ="";
    @track settledErrorTo ="";
    @track settledErrorFrom;         
    @track selectedOrderingAccount = '';
    @track selectedOrderingBIC ='';
    @track beneficiaryBIC ='';
    @track dateErrorFrom = "dd/mm/yyyy"; 
    @track dateErrorTo = "dd/mm/yyyy"; 
    @track accountFilter  = "dd/mm/yyyy"; 
    @track dateFrom ="";
    @track dateTo= "";
    @track pillsContainer =[];
    @track filters ="";
    @track datesValidity = true;    
    @track selectedType = "IN";
    @track userData;
    @track countryMatch;
    @track typeValue = "option1";
    @track isNotSimple = false;
    @track isSimple = true;
    @track dateError = false;
    @track options =[
        {'label': 'Sales', 'value': 'option1'},
        {'label': 'Force', 'value': 'option2'}
    ];       
    @track validFrom;
    @track validTo;

    @api isuetrsearch = false;
    @api showtable = false;
    @api selecteduert; 

    _selecteduert = '';


    get selecteduert(){
        return this._selecteduert;
    }
    set selecteduert(selecteduert){
        if (selecteduert){
            return this._selecteduert = selecteduert;
        }
    }
    get loading(){
        return (this.label.Loading+ '...');
    }

    get typeValueOUT(){
        return (this.typeValue == 'OUT');
    }

    get typeValueIN(){
        return (this.typeValue == 'IN');
    }

    get getPillsContainer(){
        return (this.pillsContainer.length>0);
    }
    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
        console.log('Cargado Search');
        this.doInit();
    }

    doInit () {
        this.getCountries();
        this.getCurrency();
        this.getStatuses();
        this.getUserData();

        var options = [{"label": this.label.Emitidos, "value": 'OUT'}, {"label": this.label.Recibidos, "value": 'IN'}];
        this.typeValue = 'OUT';
        this.options = options;
        this.refreshPills();
    }

    // selectedStatus () {
    //     this.selectedStatus(component, event, helper);
    // }

    // selectedCurrency () {
    //     this.selectedCurrency(component, event, helper);
    // }

    // selectedCountry () {
    //     this.selectedCountry(component, event, helper);
    // }

    clear () {
        try {
            this.selectedOrderingAccount = '';
            this.thatContains = '';
    
            this.beneficiaryAccount = '';
            this.settledFrom = '';
            this.settledTo = '';
            this.dateFrom = '';
            this.dateTo = '';
            this._selecteduert = '';
            this.selectedOrderingBIC = '';
            this.beneficiaryBIC = '';
    
    
            this.validateSettled();
            this.validateDate();
    
            this.clearStatus("all");
            this.clearCurrency();
            this.clearCountry();
    
               
        } catch (e) {
            console.log(e);
        }
    }

    clearStatus (clear){
        try{
            var selectedStatus = this.selectedStatus;

            if(selectedStatus!=undefined && selectedStatus!=null){

                if(clear.includes("all")){

                    this.selectedStatus = [];
                    this.selectedStatusLabel = this.label.multipleChoice;

                    // component.find("statusDropdown").updateSelection(selectedStatus);
                    this.template.querySelector('[data-id="statusDropdown"]').updateSelection(selectedStatus);
                }else{
                    selectedStatus.splice(selectedStatus.indexOf(clear),1);

                    this.selectedStatus = selectedStatus;

                    if(selectedStatus.length==0){
                        this.selectedStatusLabel = this.label.multipleChoice;
                    }

                    //component.find("statusDropdown").updateSelection([clear]);
                    this.template.querySelector('[data-id="statusDropdown"]').updateSelection([clear]);
                }
            }
        } catch (e) {
            console.log(e);
        }
    }

    clearCurrency (){
        try{
            if(this.selectedCurrency != this.label.selectOne){
                this.selectedCurrency = this.label.selectOne;
            }
        } catch (e) {
            console.log(e);
        }
    }

    clearCountry (){
        try{
            if(this.selectedCountry != this.label.selectOne){
                this.selectedCountry = this.label.selectOne;
            } 
        } catch (e) {
            console.log(e);
        }
    }

    removePill (event){
        try{
            //var currentPill=event.getParam('currentPill');
            var currentPill = event.detail.currentPill;

            if(currentPill != null & currentPill !="" && currentPill != undefined){
                switch(currentPill.substring(0,currentPill.length-1)){
                    case "beneficiaryAccount":
                        this.beneficiaryAccount = '';
                        break;
                    case "orderingAccount":
                        this.selectedOrderingAccount = '';
                        break;
                    case "orderingAccount":
                        this.beneficiaryAccount = '';
                        break;
                    case "uert":
                        this._selecteduert = '';
                        break;
                    case "orderingBIC":
                        this.selectedOrderingBIC = '';
                        break;
                    case "beneficiaryBIC":
                        this.beneficiary = '';
                        break;
                    case "settledFrom":
                        this.settledFrom = '';
                        break;
                    case "settledTo":
                        this.settledTo = '';
                        break;
                    case "settled":
                        this.settledFrom = '';
                        this.settledTo = '';
                        this.validateSettled();
                        break;
                    case "dateFrom":
                        this.dateFrom = null;
                        break;
                    case "dateTo":
                        this.dateTo = null;
                        break;
                    case "date":
                        this.dateFrom = null;
                        this.dateTo = null;
                        this.validateDate();
                        break;
                    case "thatContains":
                        this.thatContains = '';
                        break;
                    case "currency":
                        this.clearCurrency();
                        break;
                    case "country":
                        this.clearCountry();
                        break;
                    case "statusall":
                        this.clearStatus("all");
                        break;
                    default:
                        this.clearStatus(currentPill.substring(7));
                        break;
                }
                
                //Refresh the pill information and filter the data
                this.refreshPills();

                // if($A.util.hasClass(component.find("GPISearch"),'slds-hide')==true){
                //     helper.filterData(component, event, helper);
                // }
                if(this.template.querySelector('[data-id="GPISearch"]').classList.hasClass('slds-hide')==true){
                    this.filterDataHelper();
                }
            }
        } catch (e) {
            console.log(e);
        }
    }

    apply () {
        //this.apply(component,event, helper);
        this.validateAccountFields();
        console.log("validid");
        console.log(this.datesValidity);
        //if(this.datesValidity")==true && this.settledErrorTo")=='' && $A.util.hasClass(component.find("mandatoryFields"),'slds-hide') && $A.util.hasClass(component.find("mandatoryBic"),'slds-hide')){
        if(this.datesValidity==true && this.settledErrorTo=='' && this.template.querySelector('[data-id="mandatoryFields"]').classList.contains('slds-hide') && this.template.querySelector('[data-id="mandatoryBic"]').classList.contains('slds-hide')){
            if(this.showtable==false){
                this.openSearch();
            }
            console.log(this.filters);

            //RESET ATTRIBUTE IN CASE WE DO SEVERAL SEARCHES WITHOUT CLEAN.
            this.isuetrsearch = false;
            
            this.filterData();
        }  
    }

    // refreshPills () {
    //     this.refreshPills(component,event, helper);
    // }

    // openSearch () {
    //     this.openSearch(component, event, helper);
    // }

    validateDate () {    
        try{
            var error="ok";
            var dateFrom = this.dateFrom;
            var dateTo = this.dateTo;

            if(dateTo!=null && dateTo !=undefined && dateTo != "" && dateFrom!=null && dateFrom !=undefined && dateFrom != ""){
                if(dateTo<dateFrom){
                    this.dateErrorTo = "dd/mm/yyyy";
                    this.dateTo = '';
                    error="error";
                }
            }

            if(error=="ok"){
                this.refreshPills();
            }
        } catch (e) {
            console.log(e);
        }
    }

    filterData (){
        //Pdte de realizar el evento
        console.log("*********FILTER DATA");
        try{
            //var cmpEvent = component.getEvent("getFilter");
            //var checkFilters = this.filters"); 
            //cmpEvent.setParams({filters:this.filters")});
            // cmpEvent.fire(); 
            const getFilterEvent = new CustomEvent("getfilter", {
                detail: {filters: this.filters,
                         isuetrsearch: this.isuetrsearch,
                         uetr: this._selecteduert}
            });
            this.dispatchEvent(getFilterEvent);
        } catch (e) {
            console.log(e);
        }    
    }

    // removePill () {
    //     this.removePill(component, event, helper);
    // }

    validateSettled () {
        // this.validateSettled(component, event, helper);
        try{
            var error="ok";
            var settledFrom=this.settledFrom;
            var settledTo=this.settledTo;
            if(settledFrom!=null && settledFrom !=undefined && settledFrom != ""){
                if(parseInt(settledFrom)<0){
                    this.settledFrom = '';
                }
            }

            if(settledTo!=null && settledTo !=undefined && settledTo != ""){
                if(parseInt(settledTo)<0){
                    this.settledTo = '';
                }
            }

            if(settledTo!=null && settledTo !=undefined && settledTo != "" && settledFrom!=null && settledFrom !=undefined && settledFrom != ""){
                if(parseInt(settledTo)<parseInt(settledFrom)){
                    // $A.util.removeClass(component.find("settledErrorTo"),"slds-hide");
                    // $A.util.addClass(component.find("settledTo"),"inputShadowError");
                    // $A.util.removeClass(component.find("settledErrorFrom"),"slds-hide");
                    // $A.util.addClass(component.find("settledFrom"),"inputShadowError");
                    // this.settledErrorTo",this.Label.toAmountLowerThanFrom"));
                    this.template.querySelector('[data-id="settledErrorTo"]').classList.remove("slds-hide");
                    this.template.querySelector('[data-id="settledTo"]').classList.add("inputShadowError");
                    this.template.querySelector('[data-id="settledErrorFrom"]').classList.remove("slds-hide");
                    this.template.querySelector('[data-id="settledFrom"]').classList.add("inputShadowError");
                    this.settledErrorTo = this.label.toAmountLowerThanFrom;
                    error="error";
                }else{
                    // $A.util.addClass(component.find("settledErrorTo"),"slds-hide");
                    // $A.util.removeClass(component.find("settledTo"),"inputShadowError");
                    // $A.util.addClass(component.find("settledErrorFrom"),"slds-hide");
                    // $A.util.removeClass(component.find("settledFrom"),"inputShadowError");
                    // this.settledErrorTo","");
                    this.template.querySelector('[data-id="settledErrorTo"]').classList.add("slds-hide");
                    this.template.querySelector('[data-id="settledTo"]').classList.remove("inputShadowError");
                    this.template.querySelector('[data-id="settledErrorFrom"]').classList.add("slds-hide");
                    this.template.querySelector('[data-id="settledFrom"]').classList.remove("inputShadowError");
                    this.settledErrorTo = '';
                }
            
            }else{
                // $A.util.addClass(component.find("settledErrorTo"),"slds-hide");
                // $A.util.removeClass(component.find("settledTo"),"inputShadowError");
                // $A.util.addClass(component.find("settledErrorFrom"),"slds-hide");
                // $A.util.removeClass(component.find("settledFrom"),"inputShadowError");
                // this.settledErrorTo","");
                this.template.querySelector('[data-id="settledErrorTo"]').classList.add("slds-hide");
                this.template.querySelector('[data-id="settledTo"]').classList.remove("inputShadowError");
                this.template.querySelector('[data-id="settledErrorFrom"]').classList.add("slds-hide");
                this.template.querySelector('[data-id="settledFrom"]').classList.remove("inputShadowError");
                this.settledErrorTo = '';

            }

            if(error=="ok"){
                this.refreshPills();
            }
        } catch (e) {
            console.log(e);
        }
    }
    
    searchUETR () {
        let inputValue = this._selecteduert;
        var valid;
        if(inputValue == undefined || inputValue == null || inputValue == ''){
            
            //$A.util.addClass(component.find("uetrError"),'slds-hide');
            this.template.querySelector('[data-id="uetrError"]').classList.add('slds-hide');
            valid = false;
        }else{
            inputValue = inputValue.toLowerCase();
            console.log("inputValue: "+inputValue);
            let re = "^([a-f0-9]{8})-([a-f0-9]{4})-4([a-f0-9]{3})-([89ab])([a-f0-9]{3})-([a-f0-9]{12})$";
            let found = inputValue.match(re);
            if(inputValue.length!=36 || found==null){
                valid = false;
                //$A.util.removeClass(component.find("uetrError"),'slds-hide');
                this.template.querySelector('[data-id="uetrError"]').classList.remove('slds-hide');
            }else{
                valid = true;
                //$A.util.addClass(component.find("uetrError"),'slds-hide');
                this.template.querySelector('[data-id="uetrError"]').classList.add('slds-hide');
            }
        }

        //if (valid && !$A.util.isEmpty(inputValue)) {
        if (valid && inputValue != undefined && inputValue != null && inputValue != '') {
            try{
                this.searchUETRHelper(inputValue);
            } catch (e) {
                console.log(e);
            }
        }
    }

    searchUETRHelper(uetrCode){
        try {
			var filter = "{\"searchData\": {\"latestPaymentsFlag\": \"NO\",\"_limit\":\"1000\",\"_offset\":\"0\",\"paymentId\":\"" + uetrCode + "\",\"inOutIndicator\":\"OUT\"}}";
            this.filters = filter;
            this.isuetrsearch = true;
            this.filterData();
         } catch (e) {
             console.log(e);
         }
    }
        
    onTypeSelected (event) {
        //var selectedType = event.getSource().get("v.label");
        // var selectedType = event.getParam("value");
        var selectedType = event.detail.value;
        this.typeValue = selectedType;
        console.log(this.typeValue);
        
        this.clear();
        this.removePill();
        this.refreshPills();
	}

    getCountries (){
        try {
            //var action = component.get("c.getISO2Values");
            getISO2Values()
            .then(result => {
                //this.countryList",response.getReturnValue().sort());
                var sort;
                var data = JSON.parse(JSON.stringify(result));
                sort = data.sort((a, b) => a.toUpperCase() < b.toUpperCase() ? 1 : b.toUpperCase() < a.toUpperCase() ? -1 : 0)
                //this.countryList = result;
                this.countryList = sort;

                    
                setTimeout(() => {
                //$A.util.addClass(component.find("spinner"), "slds-hide");   
                this.template.querySelector('[data-id="spinner"]').classList.add("slds-hide");  
                //$A.util.removeClass(component.find("headerSection"), "slds-hide");
                this.template.querySelector('[data-id="headerSection"]').classList.remove("slds-hide");  
                }, 2000); 
            })
            .catch(error => {
            console.log('KO Countries '+ JSON.stringify(error));
                var errors = error;
                if (errors) {
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

    getCurrency (){
        try {
            //var action = component.get("c.getCurrencies");
            getCurrencies()
            .then(result => {
                var res = result;
                if(res!=null && res!=undefined && res!=""){
                    this.currencyList = res;
                }
            })
            .catch(error => {
                var errors = error;
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

    getStatuses (){
        try {
            //var action = component.get("c.getStatus");
            getStatus()
            .then(result => {
                this.statusList = result;
            })
            .catch(error => {
                var errors = error;
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            });

            // action.setCallback(this, function(response) {
            //     var state = response.getState();
            //     if (state === "SUCCESS") {
            //         this.statusList",response.getReturnValue());
            //     }
            //     else if (state === "ERROR") {
            //         var errors = response.getError();
            //         if (errors) {
            //             if (errors[0] && errors[0].message) {
            //                 console.log("Error message: " + 
            //                         errors[0].message);
            //             }
            //         } else {
            //             console.log("Unknown error");
            //         }
            //     }
            // });

            // $A.enqueueAction(action);

        } catch (e) {
            console.log(e);
        }
    }

    getUserData () {
		try {
            //var action = component.get("c.getUserData");
            getUserData()
            .then(result => {
                this.userData = result;
            })
            .catch(error => {
                var errors = error;
                if (errors) {
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

    refreshPills () {
        try {
            //Get all the pills to show
            var thatContains = this.thatContains;
            var beneficiaryAccount = this.beneficiaryAccount;
            var currency = this.selectedCurrency;
            var settledFrom = this.settledFrom;
            var settledTo = this.settledTo;
            var dateFrom = this.dateFrom;
            var dateTo = this.dateTo;
            var selectedStatus = this.selectedStatus;
            var country = this.selectedCountry;
            var originCountry = this.originCountry;
            var account = this.selectedOrderingAccount;
            var accountBIC = this.selectedOrderingBIC;
            var beneficiaryBIC = this.beneficiaryBIC;
            var uetr= this._selecteduert.toLowerCase();
            var selectedType = this.typeValue;
            console.log("uetr: "+uetr);
            var filter='{"searchData": {"latestPaymentsFlag": "NO","_limit":"1000","_offset":"0",';

           //Set the pills array and the filters String
           if(settledFrom!=null && settledFrom!="" && (settledTo==null || settledTo=="")){
            filter+='"amountFrom":"'+settledFrom+'",';
            filter+='"amountTo":"999999999999999999",';
            }
            if(settledTo!=null && settledTo!="" && (settledFrom==null || settledFrom=="")){
                filter+='"amountTo":"'+settledTo+'",';
                filter+='"amountFrom":"0",';
            }
            if(settledTo!=null && settledTo!="" && settledFrom!=null && settledFrom!=""){
                filter+='"amountTo":"'+settledTo+'",';
                filter+='"amountFrom":"'+settledFrom+'",';
            }

            if(dateFrom!=null && dateFrom!="" && (dateTo==null || dateTo=="")){

                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth()+1).padStart(2, '0'); //As January is 0.
                var yyyy = today.getFullYear();
                today = yyyy+'-'+mm+'-'+dd;

                filter+='"valuedateFrom":"'+dateFrom+'",';
                filter+='"valueDateTo":"'+today+'",';
            }
            if(dateTo!=null && dateTo!="" && (dateFrom==null || dateFrom=="") && dateTo!=this.label.fromlabel && dateFrom!=this.label.fromlabel){
                filter+='"valueDateTo":"'+dateTo+'",';
                var e = new Date(dateTo);
                e.setMonth(e.getMonth()-25);
                var dd = String(e.getDate()).padStart(2, '0');
                var mm = String(e.getMonth()+1).padStart(2, '0'); //As January is 0.
                var yyyy = e.getFullYear();
                var date = yyyy+'-'+mm+'-'+dd;

                filter+='"valuedateFrom":"'+date+'",';
            }

            if(dateTo!=null && dateTo!="" && dateFrom!=null && dateFrom!="" && dateTo!=this.label.fromlabel && dateFrom!=this.label.fromlabel){
                filter+='"valueDateTo":"'+dateTo+'",';
                filter+='"valuedateFrom":"'+dateFrom+'",';
            }

            if(thatContains!=null && thatContains!=""){
                filter+='"searchText":"'+thatContains+'",';
            }
            if(uetr!=null && uetr!=""){
                filter+='"paymentId":"'+uetr+'",';
            }
            
            if(currency!=null && currency!=""  && currency!=this.label.selectOne){
                filter+='"currency":"'+currency+'",';
            }
            if(account!=null && account!=""  && accountBIC!=null && accountBIC!="") {
                filter+='"originatorAccountList":[';
                    filter+='{"bankId":"'+accountBIC+'","account":{"idType":"","accountId":"'+account+'"}},';
                filter=filter.slice(0,-1)+"],";
            }

            if(beneficiaryAccount!=null && beneficiaryAccount!=""/*  && beneficiaryBIC!=null && beneficiaryBIC!=""*/) {
                filter+='"beneficiaryAccountList":[';
                    filter+='{"bankId":"'+beneficiaryBIC+'","account":{"idType":"","accountId":"'+beneficiaryAccount+'"}},';
                filter=filter.slice(0,-1)+"],";
            }
			
            // AB - 27/11/2020 - OriginatorCountry
            if(country!=null && country!=""  && country!=this.label.selectOne){
                filter+='"beneficiaryCountry":"'+country.substring(0,2)+'",';
            }
			
            if(originCountry!=null && originCountry!=""  && originCountry!=this.label.selectOne){
                filter+='"originatorCountry":"'+originCountry.substring(0,2)+'",';
            }

            if(selectedType!=null && selectedType!=""){
                filter+='"inOutIndicator":"'+selectedType+'",';
            }

            if(selectedStatus!=null && selectedStatus!=undefined && selectedStatus.length!=0){   
                filter+='"paymentStatusList":[';
                for (var i in selectedStatus){
                    if(selectedStatus[i]!=this.label.allStatuses){
                        var data=helper.findStatus(component, event, helper, selectedStatus[i]);
                        if(selectedStatus[i]==this.label.payment_statusThree || selectedStatus[i]==this.label.payment_statusFour || selectedStatus[i]==this.label.payment_statusTwo){
                            for(var j in data){
                                filter+='{"status":"'+data[j].status+'","reason":"'+data[j].reason+'"},';
                            }
    
                        }else{
                            filter+='{"paymentStatus":{"status":"'+data.status+'","reason":"'+data.reason+'"}},';
                        }
                    }                }
                filter=filter.slice(0,-1)+"],";

            }
            console.log(filter);
            filter=filter.slice(0,-1)+"}}";
            if(filter!=""){
                this.filters = filter;
            }else{

                // if($A.util.hasClass(component.find("GPISearch"),'slds-hide')==true){
                //     helper.openSearch(component, event, helper);
                // }
                var element = this.template.querySelector('[data-id="GPISearch"]');
                if(element.classList.hasClass('slds-hide')==true){
                    this.openSearch();
                }
                this.filters = filter;
            }

        } catch (e) {
            // Handle error
            console.error(e);
        } 
    }

    openSearch () {
        try{
            //var searchArea = component.find("GPISearch");
            var searchArea = this.template.querySelector('[data-id="GPISearch"]');

            if(searchArea !=undefined && searchArea!=null){
                // $A.util.toggleClass(searchArea,"slds-hide");
                // $A.util.toggleClass(component.find("searchIcon"),"button-search-open");
                searchArea.classList.toggle("slds-hide");
                this.template.querySelector('[data-id="searchIcon"]').classList.toggle("button-search-open");
            }
        } catch (e) {
            console.log(e);
        }
    }

    validateAccountFields (){
        if(this.userData != null && this.userData != undefined && Object.keys(this.userData).length != 0){
            var userData = this.userData;
            var userProfile = userData[0];
            var userCountry = userData[1].substring(0, 2);
            var bic = this.selectedOrderingBIC.substring(4, 6);

            if(this._selecteduert==''){
                //$A.util.addClass(component.find("uetrError"),'slds-hide');
                this.template.querySelector('[data-id="uetrError"]').classList.add('slds-hide');

                //if((this.selectedOrderingAccount")=='' || this.selectedOrderingBIC")=='') && (this.beneficiaryccount")=='' || this.beneficiaryBIC")=='')){
                if((this.selectedOrderingAccount=='' || this.selectedOrderingBIC=='') && (this.beneficiaryccount =='' || this.beneficiaryBIC =='')){
                    // $A.util.removeClass(component.find("mandatoryFields"),'slds-hide');
                    // $A.util.addClass(component.find("mandatoryBic"),'slds-hide');                
                    this.template.querySelector('[data-id="mandatoryFields"]').classList.remove('slds-hide');
                    this.template.querySelector('[data-id="mandatoryBic"]').classList.add('slds-hide');                
                }else{
                    if(userProfile == "Local Support") {
                        if(userCountry != bic) {
                            if((userCountry == "BR" || userCountry == "KY" || userCountry == "LU") && (bic == "BR" || bic == "KY" || bic == "LU")) {
                                // $A.util.addClass(component.find("mandatoryBic"),'slds-hide');
                                // $A.util.addClass(component.find("mandatoryFields"),'slds-hide');
                                this.template.querySelector('[data-id="mandatoryBic"]').classList.add('slds-hide');
                                this.template.querySelector('[data-id="mandatoryFields"]').classList.add('slds-hide');
                            } else {
                                // $A.util.removeClass(component.find("mandatoryBic"),'slds-hide');
                                // $A.util.addClass(component.find("mandatoryFields"),'slds-hide');
                                this.template.querySelector('[data-id="mandatoryBic"]').classList.remove('slds-hide');
                                this.template.querySelector('[data-id="mandatoryFields"]').classList.add('slds-hide');
                            }
                        } else{
                            // $A.util.addClass(component.find("mandatoryFields"),'slds-hide');
                            // $A.util.addClass(component.find("mandatoryBic"),'slds-hide');
                            this.template.querySelector('[data-id="mandatoryFields"]').classList.add('slds-hide');
                            this.template.querySelector('[data-id="mandatoryBic"]').classList.add('slds-hide');
                            this.refreshPills();
                        }
                    } else{
                        // $A.util.addClass(component.find("mandatoryFields"),'slds-hide');
                        // $A.util.addClass(component.find("mandatoryBic"),'slds-hide');
                        this.template.querySelector('[data-id="mandatoryFields"]').classList.add('slds-hide');
                        this.template.querySelector('[data-id="mandatoryBic"]').classList.add('slds-hide');
                        this.refreshPills();
                    }
                }
            }else{
                let re = "^([a-f0-9]{8})-([a-f0-9]{4})-4([a-f0-9]{3})-([89ab])([a-f0-9]{3})-([a-f0-9]{12})$";
                let inputUETR = this._selecteduert.toLowerCase();
                console.log("inputUETR: "+inputUETR);
                let found = inputUETR.match(re);
                //let found = this.selectedUERT").match(re);
                if(this._selecteduert.length!=36 || found==null){
                    //$A.util.removeClass(component.find("uetrError"),'slds-hide');
                    this.template.querySelector('[data-id="uetrError"]').classList.remove('slds-hide');
                }else{
                    // $A.util.addClass(component.find("uetrError"),'slds-hide');
                    // $A.util.addClass(component.find("mandatoryFields"),'slds-hide');
                    this.template.querySelector('[data-id="uetrError"]').classList.add('slds-hide');
                    this.template.querySelector('[data-id="mandatoryFields"]').classList.add('slds-hide');
                    this.refreshPills();
                }
            }   
        }
    }

    handleUETR (event){
        this._selecteduert = event.target.value;
    }

    handleAccount (event){
        this.selectedOrderingAccount = event.target.value;
    }
    
    handlebeneficiaryAccount (event){
        this.beneficiaryAccount = event.target.value;            
    }

    handleBIC (event){
        if (this.template.querySelector('[data-id="orderingBIC"]')){
            this.selectedOrderingBIC = event.target.value;
        }
        
        if (this.template.querySelector('[data-id="beneficiaryBIC"]')){
            this.beneficiaryBIC = event.target.value;            
        }
    }

    handlerthaContains(event){
        this.thatContains = event.target.value;
    }

    handlesettledFrom(event){
        this.settledFrom = event.target.value;
        this.validateSettled();
    }

    handlesettledTo(event){
        this.settledTo = event.target.value;
        this.validateSettled();
    }

    handleCalendarFrom (event){
        this.dateFrom = new Date(event.detail.value).toISOString().split('T')[0];
    }
    handleCalendarTo (event){
        this.dateTo = new Date(event.detail.value).toISOString().split('T')[0];
    }

    handleCurrency (event){
        this.selectedCurrency = event.detail.selectedvalues[0];
    }

    handleCountry (event){
        this.selectedCountry = event.detail.selectedvalues[0];
    }
    
    handleStatus (event){
        this.selectedStatus = event.detail.selectedvalues;
    }

    handleBlurValueDate() {         
        this.validateRanges();
    }

    validateRanges() {
        var fromValue = this.template.querySelector('[data-id="valueDateFrom"]').value;
        var toValue = this.template.querySelector('[data-id="valueDateTo"]').value;
        var fromError = this.label.validationDate;


        // fromValue = new Date(fromValue);
        // toValue = new Date(toValue);

        if(fromValue == '' || fromValue == null || fromValue == undefined){
            // this.dateFrom = this.label.fromlabel;
            // this.dateFrom = this.label.fromlabel;
            this.validFrom = true;
        }

        if(toValue == '' || toValue == null || toValue == undefined){
            // dateTo= this.label.to;
            // this.dateTo = this.label.to;
            this.validTo = true;
        }        
           

        if(toValue !=this.label.to){
            if(toValue != null){
                if(toValue.match("\\d{4}-\\d{2}-\\d{2}") != null){
                    this.dateErrorTo = "dd/mm/yyyy";
                    this.dateErrorFrom = "dd/mm/yyyy";
                    // this.template.querySelector('[data-id="valueDateTo"]').setCustomValidity('');
                    // this.template.querySelector('[data-id="valueDateTo"]').reportValidity();
                }
                // else{
                //     this.dateErrorTo = this.label.IncorrectDateFormat;
                //     this.template.querySelector('[data-id="valueDateTo"]').setCustomValidity('');
                //     this.template.querySelector('[data-id="valueDateTo"]').reportValidity();
                // }
            }
            else {
                this.dateErrorTo = this.label.IncorrectDateFormat;
                this.template.querySelector('[data-id="valueDateTo"]').setCustomValidity('');
                this.template.querySelector('[data-id="valueDateTo"]').reportValidity();
            }
            
        }

        if(fromValue != this.label.fromlabel){
            if(fromValue != null){
                if(fromValue.match("\\d{4}-\\d{2}-\\d{2}") != null){
                    var today = new Date();
                    var dd = String(today.getDate()).padStart(2, '0');
                    var mm = String(today.getMonth()+1).padStart(2, '0'); //As January is 0.
                    var yyyy = today.getFullYear();
                    today = yyyy+'-'+mm+'-'+dd;
    
                    if(fromValue <= today){
                        this.dateErrorFrom = "dd/mm/yyyy";
                        this.dateErrorTo = "dd/mm/yyyy";
                    }else{
                        this.dateErrorFrom = this.label.fromDateLessThanToday;
                        this.template.querySelector('[data-id="valueDateFrom"]').setCustomValidity('');
                        this.template.querySelector('[data-id="valueDateFrom"]').reportValidity();                        
                    }
    
                }else{
                    this.dateErrorFrom = this.label.IncorrectDateFormat;
                    this.template.querySelector('[data-id="valueDateFrom"]').setCustomValidity('');
                    this.template.querySelector('[data-id="valueDateFrom"]').reportValidity(); 
                } 
            }
            else {
                this.dateErrorFrom = this.label.IncorrectDateFormat;
                this.template.querySelector('[data-id="valueDateFrom"]').setCustomValidity('');
                this.template.querySelector('[data-id="valueDateFrom"]').reportValidity(); 
            }
        } 

        if (fromValue !=this.label.fromlabel && fromValue !=this.label.to) {
            if(toValue < fromValue && toValue != ''){
                this.dateErrorTo = fromError;
                this.template.querySelector('[data-id="valueDateTo"]').setCustomValidity('');
                this.template.querySelector('[data-id="valueDateTo"]').reportValidity(); 
            }
            // else {
            //     this.dateErrorFrom = "dd/mm/yyyy";
            //     this.dateErrorTo = "dd/mm/yyyy";
            // }  
        }
        // if ( this.validFrom && fromValue !=this.label.fromlabel && this.validTo && fromValue !=this.label.to) {
        //     if(toValue < fromValue){
        //         this.dateErrorTo = fromError
        //     }else {
        //         this.dateErrorFrom = "dd/mm/yyyy";
        //         this.dateErrorTo = "dd/mm/yyyy";
        //     }  
        // }
        // } else {            
        //     this.dateErrorTo = "dd/mm/yyyy";
        //     this.dateErrorFrom = "dd/mm/yyyy";
        // }
    }

    validateExpression(fromValue, toValue) {
        fromValue = new Date(fromValue);
        toValue = new Date(toValue);

        if (toValue < fromValue) {
            return true;
        } else {
            return false;
        }
    }

    // handleBlurFrom(){

    //     //this.validity",true);

        
    //     var dateFrom= this.dateFrom;
    //     var dateTo= this.dateTo;
        
    //     if(dateFrom == '' || dateFrom == null || dateFrom == undefined){
    //         dateFrom= this.label.fromlabel;
    //         this.dateFrom = this.label.fromlabel;
    //         this.validity = true;
    //         this.validFrom = true;
    //     }

    //     if(dateTo == '' || dateTo == null || dateTo == undefined){
    //         dateTo= this.label.to;
    //         this.dateTo = this.label.to;
    //         this.validity = true;
    //         this.validTo = true;
    //     }

    //     //Check if the input is date
    //     if(dateTo !=this.label.to){
    //         if(dateTo.match("\\d{4}-\\d{2}-\\d{2}") != null){
    //             this.validTo =true;
    //         }else{
    //             this.validTo =false;
    //             this.validity =false;
    //             //this.errorMessageTo =this.Label.allowedDateFormat")+' '+ this.dateFormat"));
    //             this.errorMessageTo =this.label.IncorrectDateFormat;
    //         }
    //     }

    //     if(dateFrom !=this.label.from){
    //         if(dateFrom.match("\\d{4}-\\d{2}-\\d{2}") != null){
    //             var today = new Date();
    //             var dd = String(today.getDate()).padStart(2, '0');
    //             var mm = String(today.getMonth()+1).padStart(2, '0'); //As January is 0.
    //             var yyyy = today.getFullYear();
    //             today = yyyy+'-'+mm+'-'+dd;
    //             if(dateFrom<= today){
    //                 this.validFrom = true;
    //             }else{
    //                 this.validFrom = false;
    //                 this.validity = false;
    //                 this.errorMessageFrom = this.label.fromDateLessThanToday;
    //             }

    //         }else{
    //             this.validFrom = false;
    //             this.validity = false;
    //             //this.errorMessageFrom = this.Label.allowedDateFormat")+' '+ this.dateFormat"));
    //             this.errorMessageFrom = this.label.IncorrectDateFormat;
    //         }
    //     }

    //     if( this.validFrom && dateFrom !=this.label.from && this.validTo && dateFrom !=this.label.to){
    //         if(dateTo<dateFrom){
    //             this.validTo = false;
    //             this.validity = false;
    //             this.errorMessageTo = this.label.validationDate;
    //         }
    //     }
        
        
    // }
    

    // handleSelectedStatus (event){
    //     this.selectedStatus = event.detail.selectedvalues;
    // }

    // handleSelectedCurrency(event){
    //     this.selectedCurrency = event.detail.selectedvalues;
    // }

    // handleSelectedCountry(event){
    //     this.selectedCountry = event.detail.selectedvalues;
    // }
}