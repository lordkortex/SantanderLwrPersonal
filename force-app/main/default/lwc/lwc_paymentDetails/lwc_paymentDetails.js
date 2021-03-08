import { LightningElement, track, api } from 'lwc';

import { loadStyle, loadScript } from 'lightning/platformResourceLoader';

// Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

import trackingDetails from '@salesforce/label/c.trackingDetails';
import shared from '@salesforce/label/c.shared';
import borneByDebitor from '@salesforce/label/c.borneByDebitor';
import borneByCreditor from '@salesforce/label/c.borneByCreditor';
import Full from '@salesforce/label/c.Full';
import Partial from '@salesforce/label/c.Partial';
import ERROR from '@salesforce/label/c.ERROR';
import ERROR_NOT_RETRIEVED from '@salesforce/label/c.ERROR_NOT_RETRIEVED';

import generateObject from '@salesforce/apex/CNT_IPTDetailParent.generateObject';
import getShowFeeValue from '@salesforce/apex/CNT_IPTDetailParent.getShowFeeValue';
import decryptData from '@salesforce/apex/CNT_IPTDetailParent.decryptData';
import getSteps from '@salesforce/apex/CNT_IPTDetailParent.getSteps';
import getReason from '@salesforce/apex/CNT_IPTDetailParent.getReason';
import getBICList from '@salesforce/apex/CNT_IPTDetailParent.getBICList';


export default class Lwc_paymentDetails extends LightningElement {


    Label = {
        trackingDetails,
        shared,        
        borneByDebitor,        
        borneByCreditor,
        Full,
        Partial,
        ERROR,
        ERROR_NOT_RETRIEVED
    }

    @api backfront
    
    @track paymentId
    @track uetr
    @track agent
    @track totalElapsedTime
    @track jsonObject    
    @track iObject
    @track comesFromUETRSearch
    @track urlOK
    @track ready = true;
    @track sendObject = {
        currentBank : '',
        currentEntity : '',
        status : '',
        statusUpdate : '',
        totalAmount : 0,
        totalFee : 0,
        currency_aux : '',
        valueDate :  '',
        totalElapsedDate : '',
        orderingAccount : '',
        orderingBIC : '',
        beneficiaryAccount : '',
        beneficiaryBank : '',
        beneficiaryBIC : '',
        charges : '' }

    @track trackingList
    @track showError
    @track BICList
    @track showFee = "1"


/* <lightning:workspaceAPI aura:id="workspace"/> */



    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
        this.doInit();
    }

    

    doInit() {
        //this.getURLParams();
        this.getBicListFull();
        this.getDataObject();
    }      

    get iObjectFilled(){
        return !this.showError && this.iObject;
    }
      
    getDataEvent(){
        //this.totalElapsedTime",event.getParam('elapsed'));
    }

    getDataObject() {
        try{
            var params= this.sendObject;

            generateObject({url:params})
            .then(response => {
                var iReturn = response;
                
                if(iReturn != null && iReturn != undefined && Object.keys(iReturn).length != 0){
                    this.iObject = iReturn;                      
                  
                    var lgt = iReturn.stepList.length;
                    var i = 0;
                    var ok = false;
                    if(iReturn.status != 'ACCC'){
                        while(i < lgt && !ok){
                            if(iReturn.stepList[i].departureDate == ""){
                                ok = true;
                                this.iObject.currentBank = iReturn.stepList[i].bank;
                            }
                            i++;
                        }                        
                    }
                    else{
                        this.currentBank = iReturn.stepList[lgt-1].bank;
                    }
                }
                else {
                    this.iObject = {};                    
                }
                   

            }).catch(error => {
                var errors = error;
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                    errors[0].message);
                    }
                    this.showError = true;
                } else {
                    this.showError = true;
                    console.log("Unknown error");
                }
            })

        }catch(e){
            this.showError = true;
            console.log("CMP_IPTDetailParent / getDummyData : " + e);
        }
    }
       
    getURLParams(){
        var sPageURLMain = decodeURIComponent(window.location.search.substring(1));
        //var sPageURLMain = decodeURIComponent("params=wIQxF%2FvLvIZ5ngEc7FMB58C%2BYf9NrgA1Na5rtEmN%2BT8GDOdG9T%2BT9BdQr6UI2Vkk");
        var sURLVariablesMain = sPageURLMain.split('&')[0].split("="); 
        var sParameterName = "";
        var sPageURL = "";
        var results="";
        // var workspaceAPI = component.find("workspace");
        var caseTabId = this.caseTabId;

        if (sURLVariablesMain[0] == 'params' || sURLVariablesMain[0] == 'c__params') {
            this.urlOK = true;
            this.decrypt(sURLVariablesMain[1]).then( results => {
                sURLVariablesMain[1] === undefined ? 'Not found' : sPageURL = results;
                var sURLVariables=sPageURL.split('&');   
                for ( var i = 0; i < sURLVariables.length; i++ ) {
                    sParameterName = sURLVariables[i].split('=');
                    
                    if (sParameterName[0] === 'c__comesFromUETRSearch') {
                        sParameterName[1] === undefined ? 'Not found' : this.comesFromUETRSearch = true;              
                    }
                    if (sParameterName[0] === 'c__paymentId') { 
                        sParameterName[1] === undefined ? 'Not found' : this.iObject.uetr =sParameterName[1];              
                    }
                    if (sParameterName[0] === 'c__reason') { 
                        sParameterName[1] === undefined ? 'Not found' : this.iObject.reason =sParameterName[1];              
                    }
                    if (sParameterName[0] === 'c__status') { 
                        sParameterName[1] === undefined ? 'Not found' : this.iObject.status =sParameterName[1];              
                    }
                    if (sParameterName[0] === 'c__orderingAccount') { 
                        sParameterName[1] === undefined ? 'Not found' : this.iObject.originAccountNumber =sParameterName[1];              
                    }
                    if (sParameterName[0] === 'c__orderingName') { 
                        sParameterName[1] === undefined ? 'Not found' : this.iObject.originAccountName =sParameterName[1];              
                    }
                    if (sParameterName[0] === 'c__orderingBank') { 
                        sParameterName[1] === undefined ? 'Not found' : this.iObject.originAccountBank =sParameterName[1];              
                    }
                    if (sParameterName[0] === 'c__orderingBIC') { 
                        sParameterName[1] === undefined ? 'Not found' : this.iObject.originAccountBic =sParameterName[1];              
                    }
                    if (sParameterName[0] === 'c__beneficiaryAccount') { 
                        sParameterName[1] === undefined ? 'Not found' : this.iObject.beneficiaryAccountNumber =sParameterName[1];              
                    }
                    if (sParameterName[0] === 'c__beneficiaryName') { 
                        sParameterName[1] === undefined ? 'Not found' : this.iObject.beneficiaryAccountName =sParameterName[1];              
                    }
                    if (sParameterName[0] === 'c__beneficiaryBank') { 
                        sParameterName[1] === undefined ? 'Not found' : this.iObject.beneficiaryAccountBank =sParameterName[1];              
                    }
                    if (sParameterName[0] === 'c__beneficiaryBIC') { 
                        sParameterName[1] === undefined ? 'Not found' : this.iObject.beneficiaryAccountBic =sParameterName[1];              
                    }
                    if (sParameterName[0] === 'c__totalAmount') { 
                        sParameterName[1] === undefined ? 'Not found' : this.iObject.totalAmount =sParameterName[1];              
                    }
                    if (sParameterName[0] === 'c__currency') { 
                        sParameterName[1] === undefined ? 'Not found' : this.iObject.currencyAux =sParameterName[1];              
                    }
                    if (sParameterName[0] === 'c__valueDate') { 
                        sParameterName[1] === undefined ? 'Not found' : this.iObject.valueDate =sParameterName[1];              
                    }
                    if (sParameterName[0] === 'c__amount') { 
                        sParameterName[1] === undefined ? 'Not found' : this.iObject.amount =sParameterName[1];              
                    }
                    if (sParameterName[0] === 'c__beneficiaryCity') { 
                        sParameterName[1] === undefined ? 'Not found' : this.iObject.beneficiaryCity =sParameterName[1];              
                    }
                    if (sParameterName[0] === 'c__beneficiaryCountry') { 
                        sParameterName[1] === undefined ? 'Not found' : this.iObject.beneficiaryCountry =sParameterName[1];              
                    }
                    /*if (sParameterName[0] === 'c__beneficiaryCountryName') { 
                        sParameterName[1] === undefined ? 'Not found' : this.iObject.beneficiaryCountryName =sParameterName[1];              
                    }*/
                    
                }

                if(this.iObject.originAccountBic != null && this.iObject.originAccountBic != undefined && this.iObject.originAccountBic !=''){
                    for(var i in this.BICList){
                        if(this.BICList[i][0] == this.iObject.originAccountBic){
                            this.getShowFee(i);
                            break;
                        }
                    }
                }
                this.getDataSteps();
            });

            // if(this.backfront){
            //     workspaceAPI.setTabLabel({
            //         tabId: caseTabId,
            //         label: this.Label.trackingDetails
            //     });

            //     workspaceAPI.setTabIcon({
            //         tabId: caseTabId,
            //         icon: "utility:moneybag"
            //     });

            //     setTimeout(function(){
            //         workspaceAPI.closeTab({
            //             tabId: caseTabId,
            //         });                
            //     }, 90000);
            // }
        }  
            
        // } else{
        //     //caseTabId is the source Tab Id
        //     workspaceAPI.refreshTab({
        //         tabId:caseTabId 
        //     }).catch(function(error) {
        //         console.log(error);
        //     });
        // }      
    }

    getShowFee(i) {
        try{
            var params=this.iObject.originAccountBic;

            getShowFeeValue({bic:params})
            .then(response => {                    
                var showFee = response;
                if(showFee != undefined && showFee != null){
                    if(showFee == this.Label.Full){
                        showFee = '2';
                    }else if (showFee == this.Label.Partial){
                        showFee = '1';
                    }else{
                        showFee = '0';
                    }
                    this.showFee = showFee;
                }else{
                    this.showFee =this.BICList[i][1];
                }

            }).catch(error => {
                var errors = error;
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                            errors[0].message);
                        }
                        this.showError = true;
                    } else {
                        this.showError = true;
                        console.log("Unknown error");
                    }
            })

        }catch(e){
            this.showError = true;
            console.log("CMP_PaymentDetailsHelper / getSegment : " + e);
        }
    }

    decrypt(data){
        try {
            var result="null";

            return new Promise((resolve, reject) => {
                decryptData({ "str" : data })
                .then(response => {
                    result = response.getReturnValue();
                }).catch(error => {
                    var errors = error;
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                                        errors[0].message);
                            reject(response.getError()[0]);
                        }
                    } else {
                        console.log("Unknown error");
                    } 
                })
                resolve(result);
            });
            
        } catch(e) {
            console.error(e);
        }
    }

    getDataSteps(){
        try {
            getSteps({ "str" : this.iObject.uetr})
            .then(response => {
                console.log("ACA");
                var res = response;
                console.log(res);
                console.log(res.lastUpdateTime);

                if(res!='' && res!=undefined && res!=null){
                    //var res = JSON.parse(result);

                    var iobj= this.iObject;
                    this.iObject.lastUpdate = res.lastUpdateTime;
                    this.iObject.hasForeignExchange = res.hasForeignExchange;
                    this.iObject.instructedAmount = res.instructedAmount;
                    this.iObject.confirmedAmount = res.confirmedAmount;

                    this.iObject.lastUpdateTime = res.lastUpdateTime;
                    this.iObject.reason = res.transactionStatus.reason;
                    this.iObject.status = res.transactionStatus.status;
                    this.totalElapsedTime = res.totalElapsedTime;
                    
                    if(this.comesFromUETRSearch && res.creditorAgent != null){
                        iobj.beneficiaryAccountBic = res.creditorAgent.agentCode;
                        iobj.beneficiaryCountry = res.creditorAgent.agentCountry;
                        iobj.beneficiaryCountryName = res.creditorAgent.agentCountryName;
                        iobj.beneficiaryAccountBank = res.creditorAgent.agentName;
                        iobj.beneficiaryCity = res.creditorAgent.agentLocation;
                    }
                    
                    var stepList=[];
                    var steps=res.paymentEventsArray;

                    if(steps.length>0){
                        var fees = [];

                        var currencies = [];
                        for(var i in steps){
                            
                            var step = [];
                            step.bank=steps[i].toAgent.agentName;
                            step.bic=steps[i].toAgent.agentCode;
                            step.country=steps[i].toAgent.agentCountry;
                            step.countryName=steps[i].toAgent.agentCountryName;
                            step.city=steps[i].toAgent.agentLocation;
                            step.arrival=steps[i].receivedDate;
                            step.departure=steps[i].senderAcknowledgementReceipt;
                            step.foreignExchangeDetails=steps[i].foreignExchangeDetails;

                            //if(steps[i].receivedDate==''){
                                this.iObject.currentBank = step.bank;
                            //}
                            if(steps[i].chargeAmountSingle!=undefined){
                                if(steps[i].chargeAmountSingle.amount!=null && steps[i].chargeAmountSingle.amount!=0.0){
                                    step.feeApplied=true;
                                    step.stepFee=steps[i].chargeAmountSingle.amount;
                                    step.stepFeeCurrency=steps[i].chargeAmountSingle.tcurrency;
                                    if(!currencies.includes(steps[i].chargeAmountSingle.tcurrency)){
                                        currencies.push(steps[i].chargeAmountSingle.tcurrency);
                                    }
                                    fees.push([steps[i].chargeAmountSingle.tcurrency,(steps[i].chargeAmountSingle.amount)]);
                                    step.feeApplied=true;
                                }else{
                                    step.feeApplied=false;
                                }
                            }
                            if(steps[i].chargeBearer=='SHAR'){
                                step.charges=this.Label.shared;
                                iobj.charges=this.Label.shared;
                            }
                            if(steps[i].chargeBearer=='DEBT'){
                                step.charges=this.Label.borneByDebitor;
                                iobj.charges=this.Label.borneByDebitor;
                            }
                            if(steps[i].chargeBearer=='CRED'){
                                step.charges=this.Label.borneByCreditor;
                                iobj.charges=this.Label.borneByCreditor;
                            }
                            
                            stepList.push(step);

                            
                        }   

                        if((iobj.status=='ACSP' || iobj.status=='RJCT') && iobj.beneficiaryAccountBic!=stepList[stepList.length-1].bic){
                            var step = [];
                            step.bank=iobj.beneficiaryAccountBank;
                            step.bic=iobj.beneficiaryAccountBic;
                            step.country=iobj.beneficiaryCountry;
                            step.countryName=iobj.beneficiaryCountryName;
                            step.city=iobj.beneficiaryCity;
                            step.arrival='';
                            step.departure='';
                            if(iobj.status=='RJCT'){
                                stepList[stepList.length-1].lastStep=true;
                                step.lastStep2=true;
                            }
                            stepList.push(step);

                        }else  if(iobj.status=='ACSP' && iobj.beneficiaryAccountBic==stepList[stepList.length-1].bic  && stepList[stepList.length-1].arrival!=null){
                            if (stepList.length>1){
                                stepList[stepList.length-2].lastStep=true;
                                stepList[stepList.length-1].lastStep2=true;
                            }
                        }

                        if(fees.length>0){
                            var auxFees = [];
                            for(var c in currencies){
                                var amount =0;
                                for(var f in fees){
                                    console.log(f);
                                    if(fees[f][0]== currencies[c]){
                                        amount+=fees[f][1];
                                    }
                                }
                                auxFees.push([currencies[c],amount]);
                            }
                            fees=auxFees;
                        }

                        iobj.stepList=stepList;
                        iobj.fees=fees;
                        console.log(iobj.fees);

                        //resolve(iobj);
                    }
                }
            }).catch(error => {
                var errors = error;
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                                        errors[0].message);
                            reject(response.getError()[0]);
                            this.ready =true;
                            this.template.querySelector('spinnerCreate').classList.add("slds-hide");
                            this.showError = true;

                        }
                    } else {
                        console.log("Unknown error");
                        this.showError = true;
                    }
            }).finally(() => {
                console.log("lista final");
                console.log(iobj.stepList);
                this.ready =true;
                this.template.querySelector('spinnerCreate').classList.add("slds-hide");
            })

            this.getReason()
        } catch(e) {
            this.showError = true;
            console.error(e);
        }
    }
   /*
    getDateTime: function(){
        try{
            this.getDataSteps(component,event, helper).then(function(results){
                var action = component.get("c.getDateAndTime");
                if(this.iObject.status")=='ACSC' || this.iObject.lastUpdate")=='ACCC'){
                    action.setParams({arrival:this.iObject.initiationTime"),departure:this.iObject.completionTime")});
                }else{
                    action.setParams({arrival:this.iObject.initiationTime"),departure:this.iObject.lastUpdateTime")});

                }
                
                action.setCallback(this, function(response) {
                    var state = response.getState();
                    if (state === "SUCCESS") {
                        var res = response.getReturnValue(); 
                        //results.lastUpdate=res.substring(8,10) +"/"+res.substring(5,7)+"/"+res.substring(0,4) +" | "+res.substring(11)  ;
                                

                        this.iObject =results);
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
                    this.ready =true);
                    $A.util.addClass(component.find("spinnerCreate"), "slds-hide");   


                });
                $A.enqueueAction(action);
            });
        }catch(e){
            console.log("CMP_IPTDetailParent / getDummyData : " + e);
        }
    },*/
     
    getReason(){
        try{
            if(this.iObject.status=='RJCT'){
                getReason({reason:this.iObject.reason})
                .then(response => {
                    var res = response.getReturnValue(); 
                        this.iObject.reason =res;
                }).catch(error => {
                    var errors = error;
                        if (errors) {
                            if (errors[0] && errors[0].message) {
                                console.log("Error message: " + 
                                            errors[0].message);
                            }
                        } else {
                            console.log("Unknown error");
                        }
                })
            }
        }catch(e){
            console.log("CMP_IPTDetailParent / getDummyData : " + e);
        }
    }

        
    getBicListFull(){

        this.getBICS().then(() => {
        this.getURLParams();
        });            
    }
     
    getBICS(){
        try {
            var result="null";
                    
            return new Promise(function (resolve, reject) {

                getBICList().then( response => {
                    result = response;

                    if(result!=null && result!=undefined){
                        var bics =[];
                        for(var i in result){
                            var format = '1';
                            if(result[i].Fee_format__c==this.Label.Full){
                                format='2';
                            }else if (result[i].Fee_format__c==this.Label.Partial){
                                format='1';
                            }else{
                                format='0';
                            }

                            bics.push([result[i].Label,format]);                            
                        }
                        this.BICList =bics;
                    }
                }).catch( error => {
                    var errors = error;
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                                        errors[0].message);
                            reject(response.getError()[0]);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }).finally(() => {
                    resolve();
                })
            });            
        } catch(e) {
            console.error(e);
        }
    }
}