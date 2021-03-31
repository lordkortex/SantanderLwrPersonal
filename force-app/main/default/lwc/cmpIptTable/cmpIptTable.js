import { LightningElement, track, api, wire } from 'lwc';

import getFilteredData from '@salesforce/apex/CNT_SwiftPaymentTable.getFilteredData';
import encryptData from '@salesforce/apex/CNT_SwiftPaymentTable.encryptData';
import removeMT103 from '@salesforce/apex/CNT_SwiftPaymentTable.removeMT103';
import downloadMT103Doc from '@salesforce/apex/CNT_SwiftPaymentTable.downloadMT103Doc';
import getDateAndTime from '@salesforce/apex/CNT_SwiftPaymentTable.getDateAndTime';

// Import custom labels
import noPayments15Days from '@salesforce/label/c.noPayments15Days';
import search from '@salesforce/label/c.search';
import paymentStatusOne from '@salesforce/label/c.payment_statusOne';
import loading from '@salesforce/label/c.Loading';
import status from '@salesforce/label/c.status';
import originAccount from '@salesforce/label/c.originAccount';
import beneficiaryAccount from '@salesforce/label/c.beneficiaryAccount';
import adminRolesOrder from '@salesforce/label/c.AdminRoles_Order';
import tReverseOrder from '@salesforce/label/c.T_ReverseOrder';
import valueDate from '@salesforce/label/c.valueDate';
import settledAmount from '@salesforce/label/c.settledAmount';
import actions from '@salesforce/label/c.actions';
import tracking from '@salesforce/label/c.tracking';
import downloadMt103 from '@salesforce/label/c.downloadMT103';
import noResultsFound from '@salesforce/label/c.noResultsFound';
import domain from '@salesforce/label/c.domain';
import domainCashNexus from '@salesforce/label/c.domainCashNexus';
import domainBackfront from '@salesforce/label/c.domainBackfront';
import paymentStatusTwo from '@salesforce/label/c.payment_statusTwo';
import paymentStatusThree from '@salesforce/label/c.payment_statusThree';
import paymentStatusFour from '@salesforce/label/c.payment_statusFour';

export default class cmpIptTable extends LightningElement {
    @api recordId;
    @api paymentsPerPage = 50;
    @api currentPage = 1;
    @api oldPage = 1;
    @api start = 0;
    @api receivedList;
    @api end;
    @api paginationReceivedList;
    @api jsonArray;
    @api paginatedPayments;
    @api agent;
    @api sortsettledAmount = 'desc';
    @api sortvalueDate = 'desc';
    @api sortinstructed = 'desc';
    @api filters;
    @api searchDone = 0;
    @api noResultsLabel = noPayments15Days;
    @api searchLabel = search;
    @api fromCashNexus = false;
    @api isOneTrade = false;
    @api showSpinner;
    @api statusClass = 'icon-circle__red';
    @api statusLabel = paymentStatusOne;
    @api tableData = [];

    noPayments15Days = noPayments15Days;
    search = search;
    paymentStatusOne = paymentStatusOne;
    loading = loading;
    status = status;
    originAccount = originAccount;
    beneficiaryAccount = beneficiaryAccount;
    adminRolesOrder = adminRolesOrder;
    tReverseOrder = tReverseOrder;
    valueDate = valueDate;
    settledAmount = settledAmount;
    actions = actions;
    tracking = tracking;
    downloadMt103 = downloadMt103;
    noResultsFound = noResultsFound;
    domain = domain;
    domainCashNexus = domainCashNexus;
    domainBackfront = domainBackfront;
    paymentStatusTwo = paymentStatusTwo;
    paymentStatusThree = paymentStatusThree;
    paymentStatusFour = paymentStatusFour;

// Expose the labels to use in the template.
    /*label = {
        noPayments15Days,
        search,
        paymentStatusOne,
        loading : loading + '...',
        status,
        originAccount,
        beneficiaryAccount,
        adminRolesOrder,
        tReverseOrder,
        valueDate,
        settledAmount,
        actions,
        tracking,
        downloadMt103,
        noResultsFound,
        domain,
        domainCashNexus,
        domainBackfront,
        paymentStatusTwo,
        paymentStatusThree,
        paymentStatusFour
    };*/

    @wire (getFilteredData) filter;

    @wire (encryptData) encrypt;

    @wire (removeMT103) remove;

    @wire (downloadMT103Doc) download;

    @wire (getDateAndTime) dateTime;

    condition1(){
        if(sortvalueDate=='desc'){
            return true;
        }else{
            return false;
        }
    }
    condition2(){
        if(sortsettledAmount=='desc'){
            return true;
        }else{
            return false;
        }
    }

    condition3(){
        if((this.jsonArray.length==0 ||this.jsonArray == null))
        return true;
    }

    condition4(){
        if(this.jsonArray.length>0){
            return true;
        }else{
            return false;
        }
    }

    class1(){
        return 'circle '+ item.paymentDetail.statusClass;
    }

    spanclass1(){
        return item.paymentDetail.paymentAmount.paymentAmount_FormattedDecimalPart + ' ' + item.paymentDetail.paymentAmount.currency_X
    }

    texto(){
        return loading + '...';
    }

    openPaymentDetails () {
        // var url = "c__accountNumber="+component.get("v.accountItem.displayNumber")+"&c__bank="+component.get("v.accountItem.bankName")+"&c__mainAmount="+component.get("v.accountItem.amountMainBalance")+"&c__availableAmount="+component.get("v.accountItem.amountAvailableBalance")+"&c__currentCurrency="+component.get("v.accountItem.curencyCodeAvailableBalance");
        let paymentRow = event.currentTarget.id;
        let item = this.jsonArray[paymentRow];
        var url='c__paymentId='+item.paymentDetail.paymentId+'&c__valueDate='+item.paymentDetail.valueDate+'&c__reason='+item.paymentDetail.transactionStatus.reason+'&c__status='+item.paymentDetail.transactionStatus.status
        +'&c__orderingAccount='+item.paymentDetail.originatorData.originatorAccount.accountId+'&c__orderingBIC='+item.paymentDetail.originatorAgent.agentCode+'&c__orderingBank='+item.paymentDetail.originatorAgent.agentName+'&c__orderingName='+item.paymentDetail.originatorData.originatorName
        +'&c__beneficiaryAccount='+item.paymentDetail.beneficiaryData.creditorCreditAccount.accountId+'&c__beneficiaryName='+item.paymentDetail.beneficiaryData.beneficiaryName+'&c__beneficiaryBank='+item.paymentDetail.beneficiaryData.creditorAgent.agentName
        +'&c__beneficiaryBIC='+item.paymentDetail.beneficiaryData.creditorAgent.agentCode+'&c__amount='+item.paymentDetail.paymentAmount.amount
        +'&c__currency='+item.paymentDetail.paymentAmount.currency_X+'&c__beneficiaryCity='+item.paymentDetail.beneficiaryData.creditorAgent.agentLocation
        +'&c__beneficiaryCountry='+item.paymentDetail.beneficiaryData.creditorAgent.agentCountry;
        this.goTohelper("payment-details", url);
    }


    downloadMT103 (){
        this.downloadMT103helper();
    }


    connectedCallback(){
        var status = item.paymentDetail.transactionStatus.status;
        var reason = item.paymentDetail.transactionStatus.reason;
        if(status=='RJCT'){
            this.statusLabel = paymentStatusOne;
            this.statusClass = "icon-circle__red";
        }
        if(status=='ACSC' || status=='ACCC'){
            this.statusLabel = paymentStatusTwo;
            this.statusClass = "icon-circle__green";
        }
        if(status=='ACSP'){
            if(reason=='G000' || reason =='G001' || reason==null || reason=='null'){
                this.statusLabel = paymentStatusThree;
                this.statusClass = "icon-circle__blue";
            }
            if(reason=='G002' || reason =='G003' || reason =='G004'){
                this.statusLabel = paymentStatusFour;
                this.statusClass = "icon-circle__orange";
            }
        }

        this.initTablehelper(true);

        //this.getDateTimehelper();
    }

    getData () {
        try{
            var entered=this.searchDone;
            if(entered>1){
                this.noResultsLabel = NoResultsSearch;
                this.searchLabel = SearchAgain;

            }
            this.searchDone = entered+1;
            //$A.util.removeClass(component.find("spinnerTable"), "slds-hide");   
            this.showSpinner = true;
            var filters=this.filters;
            //this.filters = filters;
            this.filter({filters: filters});

            this.currentPage = 1;
            this.template.querySelector('[id="pagination"').buildData(this.currentPage); 
            
        } catch (e) {
            console.log(e);
        }

    }

    buildData (){
        this.buildDatahelper();
    }

    buildDatahelper(){
        
        try {
            var json = this.jsonArray;
            var currentPage=event.getParam("currentPage");
            var oldPage=this.oldPage;
            var perPage=this.paymentsPerPage;
            var end = this.end;
            var start = this.start;
            
            if (currentPage != null && currentPage != undefined && currentPage != '' && oldPage!=currentPage){
                //Update the index of dataset to display
                if(currentPage >oldPage && currentPage!=1){
                    this.start = perPage*currentPage-perPage;
                    if(Math.ceil(json.length/currentPage) >= perPage){
                        this.end = perPage*currentPage;
                    }else{
                        this.end = json.length;
                    }
                }else{
                    this.end = start;
                    if(currentPage==1){ 
                        this.start = 0;
                        this.end = perPage;
                        
                    }else{
                        this.start = start-perPage;
                    }
                }
                this.oldPage = currentPage;
                
                //Update a set of the paginated data
                var paginatedValues=[];
                for(var i= this.start;i<=this.end;i++){
                    paginatedValues.push(json[i]);
                }
                
                this.paginatedPayments = paginatedValues;
            }
        } catch(e) {
            console.error(e);
        }  
    }

    initTablehelper(hideSpinner){
        if(this.tableData != null && this.tableData != undefined && Object.keys(this.tableData).length>0){
            var end;
            var parseJSON = this.tableData.paymentsList;
            if(parseJSON == undefined){
                parseJSON = this.tableData.paymentList;
            }

            // Set the status and icon for the payments
            parseJSON = JSON.parse(JSON.stringify(this.setPaymentStatushelper(parseJSON)));
            this.jsonArray = parseJSON;
            
            if(parseJSON.length<this.paymentsPerPage){
                end=parseJSON.length;
            }else{
                end=this.paymentsPerPage;
            }
            this.end = end;
            
            var paginatedValues=[];
            
            for(var i= this.start;i<=this.end;i++){
                paginatedValues.push(parseJSON[i]);
            }
            
            this.paginatedPayments = paginatedValues;
            
            var toDisplay=[];
            var finish=parseJSON.length;
            
            if(parseJSON.length>1000){
                //Max payments to retrieve
                finish=1000;
            }
            
            for(var i= 0;i<finish;i++){
                toDisplay.push(parseJSON[i]);
            }
            
            this.template.querySelector('[id="pagination"]').initPagination(toDisplay);
        } else {
            this.jsonArray = [];
        } 
        
        // Hide spinner if necessary 
        if(hideSpinner)
            //$A.util.addClass(component.find("spinnerTable"), "slds-hide");  
            this.showSpinner = false; 
    }

    sortBy () {

        try {
            //Retrieve the field to sort by
            if(event.target.id != null && event.target.id != "" && event.target.id != undefined){
                var sortItem = "sort"+event.target.id;
                var sorted =this.sortByhelper(sortItem, event.target.id);
        
                if (sorted != undefined && sorted !=null){
        
                    this.jsonArray = sorted;
        
                    //Update the sort order
                    if(this.sortItem == 'asc'){
                        this.sortItem = 'desc';
                    }else{
                        this.sortItem = 'asc';
                    }
                    this.currentPage = 1;
                    component.find("pagination").buildData('1');
                }
            }

        } catch (e) {
            console.error(e);
        }
    }

    sortByhelper(sortItem, sortBy){
        try {
            var order=sortItem;
            if(order !='' && order != null && order !=undefined){
                
                var data = this.jsonArray;
                if(data != null && data != undefined){
                    let sort;
                    if(order=='desc'){
                        if(sortBy == 'settledAmount'){
                            //
                            sort = data.sort((a, b) => parseFloat(b.paymentDetail.paymentAmount.amount) - parseFloat(a.paymentDetail.paymentAmount.amount));
                        }else if(sortBy == 'valueDate'){
                            sort = data.sort((a, b) => new Date(this.formatDate(b.paymentDetail.valueDate)).getTime() - new Date(this.formatDate(a.paymentDetail.valueDate)).getTimehelper());
                        }
                    }else{
                        if(sortBy == 'settledAmount'){
                            sort = data.sort((a, b) => parseFloat(a.paymentDetail.paymentAmount.amount) - parseFloat(b.paymentDetail.paymentAmount.amount));
                        }else if(sortBy == 'valueDate'){
                            sort = data.sort((a, b) => new Date(this.formatDate(a.paymentDetail.valueDate)).getTime() - new Date(this.formatDate(b.paymentDetail.valueDate)).getTimehelper());
                        }
                    }
                    return sort;
                }
            }
        } catch(e) {
            console.error(e);
        }
    }


    openSearch() {
        try{
            var event = new CustomEvent("open",{
                detail:{
                    openModal: true
                }
            });
    
            this.dispatchEvent(event);

            var cmpEvent = event.detail;
            cmpEvent.fire();
            
        } catch (e) {
            console.log(e);
        }
    }

    /*formatDatehelper(date){
        if(date!='' && date.length==10){
            var res= date.slice(6,10)+"/"+date.slice(3,5)+"/"+date.slice(0,2);
            return res;
        }
    }*/
    
    goTohelper(page, url){
        try{
            this.encrypt({str: url}).then(function(results){
                let navService = this.template.querySelector('[data-id="navService"');
                let pageReference={};

                pageReference = {
                    type: "comm__namedPage",
                    
                    attributes: {
                        pageName: page
                    },

                    state: {
                        params : results
                    }
                }
                navService.navigate(pageReference); 
                
            });

        } catch (e) {
            console.log(e);
        }
    }


    downloadMT103helper(){
        //First retrieve the doc and the remove it
        try{            
            this.download({id: event.currentTarget.id}).then(function(results){
                if(results!=null && results!='' && results!=undefined){
                    //console.log($A.get('$Setup.MyCustomSet__c.URL__c'));
                    var domain=domain;
                    if(this.isOneTrade==false){
                        if(this.fromCashNexus==true){
                            domain=domainCashNexus;
                        }
                        if(component.get("v.backfront")==true){
                            domain=domainBackfront;
                        }
                    }

                    window.location.href = domain+'/sfc/servlet.shepherd/document/download/'+results+'?operationContext=S1';

                    setTimeout(function(){
                        this.remove({id: results});
                   
                    } ,80000);

                }
            });

        } catch (e) {
            console.log(e);
        }
    }

    /*
    getDateTimehelper(){
        try{
            if(component.get("v.item.paymentDetail.statusDate")!=undefined){
                
                var action = component.get("c.getDateAndTime");
                action.setParams({dateT:component.get("v.item.paymentDetail.statusDate")});
                
                action.setCallback(this, function(response) {
                    var state = response.getState();
                    if (state === "SUCCESS") {
                        var res = response.getReturnValue(); 
                        var results=res.substring(8,10) +"/"+res.substring(5,7)+"/"+res.substring(0,4) +" | "+res.substring(11);
                        component.set("v.item.paymentDetail.statusDate",results);
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
                $A.enqueueAction(action);
            }
        }catch(e){
            console.log("CMP_IPTDetailParent / getDummyData : " + e);
        }
    }*/


    /*setPaymentStatushelper(payments){
        for(var key in payments){
            // var status =component.get("v.item.paymentDetail.transactionStatus.status");
            // var reason=component.get("v.item.paymentDetail.transactionStatus.reason");
            // if(status=='RJCT'){
            //     this.statusLabel = paymentStatusOne;
            //     this.statusClass = "icon-circle__red";
            // }
            // if(status=='ACSC' || status=='ACCC'){
            //     this.statusLabel = paymentStatusTwo;
            //     this.statusClass = "icon-circle__green";
            // }
            // if(status=='ACSP'){
            //     if(reason=='G000' || reason =='G001' || reason==null || reason=='null'){
            //         this.statusLabel = paymentStatusThree;
            //         this.statusClass = "icon-circle__blue";
            //     }
            //     if(reason=='G002' || reason =='G003' || reason =='G004'){
            //         this.statusLabel = paymentStatusFour;
            //         this.statusClass = "icon-circle__orange";
            //     }
            // }
            var status = payments[key].paymentDetail.transactionStatus.status;
            var reason = payments[key].paymentDetail.transactionStatus.reason;
            if(status=='RJCT'){
                payments[key].paymentDetail.statusLabel = paymentStatusOne;
                payments[key].paymentDetail.statusClass = "icon-circle__red";
            }
            if(status=='ACSC' || status=='ACCC'){
                payments[key].paymentDetail.statusLabel = paymentStatusTwo;
                payments[key].paymentDetail.statusClass = "icon-circle__green";
            }
            if(status=='ACSP'){
                if(reason=='G000' || reason =='G001' || reason==null || reason=='null'){
                    payments[key].paymentDetail.statusLabel = paymentStatusThree;
                    payments[key].paymentDetail.statusClass = "icon-circle__blue";
                }
                if(reason=='G002' || reason =='G003' || reason =='G004'){
                    payments[key].paymentDetail.statusLabel = paymentStatusFour;
                    payments[key].paymentDetail.statusClass = "icon-circle__orange";
                }
            }
        }
        return payments;
    }*/

}