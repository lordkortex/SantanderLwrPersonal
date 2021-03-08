import { LightningElement, api, track } from 'lwc';
//Labels
import trackingDetails from '@salesforce/label/c.trackingDetails';
import beneficiaryAccount from '@salesforce/label/c.beneficiaryAccount';
import beneficiaryEntityName from '@salesforce/label/c.beneficiaryEntityName';
import beneficiaryCountry from '@salesforce/label/c.beneficiaryCountry';
import reasonForRejection from '@salesforce/label/c.reasonForRejection';
import document from '@salesforce/label/c.document';
import downloadMT103 from '@salesforce/label/c.downloadMT103';
import payment_statusOne from '@salesforce/label/c.payment_statusOne';
import payment_statusTwo from '@salesforce/label/c.payment_statusTwo';
import payment_statusThree from '@salesforce/label/c.payment_statusThree';
import payment_statusFour from '@salesforce/label/c.payment_statusFour';
import domain from '@salesforce/label/c.domain';
import domainBackfront from '@salesforce/label/c.domainBackfront';


//Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
//Controlador
import removeMT103 from '@salesforce/apex/CNT_SwiftPaymentTableRow.removeMT103';
import downloadMT103Doc from '@salesforce/apex/CNT_SwiftPaymentTableRow.downloadMT103Doc';
import getDateAndTime from '@salesforce/apex/CNT_SwiftPaymentTableRow.getDateAndTime';
import encryptData from '@salesforce/apex/CNT_SwiftPaymentTableRow.encryptData';

//Navegación
import { NavigationMixin } from 'lightning/navigation';

export default class Lwc_swiftPaymentTableRow extends NavigationMixin(LightningElement) {

    label = {
        trackingDetails,
        beneficiaryAccount,
        beneficiaryEntityName,
        beneficiaryCountry,
        reasonForRejection,
        document,
        downloadMT103,
        payment_statusOne,
        payment_statusTwo,
        payment_statusThree,
        payment_statusFour,
        domain,
        domainBackfront
    }

    @track paymentId;                                                              //description="Identification code of a payment" />
    @track status;
    @track statusUpdate;
    @track instructed;
    @track valueDate;
    @track beneficiaryName;
    @track beneficiaryEntity;
    @track settledAmount;
    @track currentCurrency;
    @track agent;
    @track statusClass = "icon-circle__red";
    @track statusLabel = this.label.payment_statusOne;

    @track beneficiaryEntityName;
    @track beneficiaryAccount;
    @track beneficiaryCountry;
    @track reasonRejection;
    @api backfront = false;

    @api itemposition;
    @api item;

    get getCircleClass(){
        return 'circle '+this.statusClass;
    }

    get getStatusDate(){
        return this.item.paymentDetail.statusDate;
        }

    get getAccountId(){
        return this.item.paymentDetail.originatorData.originatorAccount.accountId;
        }

    get getIssueDate(){
        return this.item.paymentDetail.issueDate;
    }

    get getValueDate(){
        return this.item.paymentDetail.valueDate;
    }
    
    get getBeneficiaryName(){
        return this.item.paymentDetail.beneficiaryData.beneficiaryName;
    }
        
    get getAgentCode(){
        return this.item.paymentDetail.beneficiaryData.creditorAgent.agentCode;
    }

    get getNumberFormat(){
        return this.item.paymentDetail.paymentAmount.numberFormat;
    }
   
    get getAmount(){
        return this.item.paymentDetail.paymentAmount.amount;
    }
    
    get gettcurrency(){
        return this.item.paymentDetail.paymentAmount.tcurrency;     
    }

    get getAccounIdBeneficiary(){
        return this.item.paymentDetail.beneficiaryData.creditorCreditAccount.accountId;
    }

    get getAgentNameBeneficiary(){
        return this.item.paymentDetail.beneficiaryData.creditorAgent.agentName;
    }

    get getAgentCountryBeneficiary(){
        return this.item.paymentDetail.beneficiaryData.creditorAgent.agentCountry;
    }

    get getReason(){
        return this.item.paymentDetail.transactionStatus.reason;
    }

    get statusOne(){
        return (this.item.status==this.label.payment_statusOne);
    }

    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
        this.doInit();
    }

    doInit (){
        console.log(this.item.paymentDetail.transactionStatus.status);
        console.log(this.item.paymentDetail.transactionStatus.reason);

        var status =this.item.paymentDetail.transactionStatus.status;
        var reason =this.item.paymentDetail.transactionStatus.reason;
        if(status=='RJCT'){
            this.statusLabel = this.label.payment_statusOne;
            this.statusClass = "icon-circle__red";
        }
        if(status=='ACSC' || status=='ACCC'){
            this.statusLabel = this.label.payment_statusTwo;
            this.statusClass = "icon-circle__green";
        }
        if(status=='ACSP'){
            if(reason=='G000' || reason =='G001' || reason==null || reason=='null'){
                this.statusLabel = this.label.payment_statusThree;
                this.statusClass = "icon-circle__blue";
            }
            if(reason=='G002' || reason =='G003' || reason =='G004'){
                this.statusLabel = this.label.payment_statusFour;
                this.statusClass = "icon-circle__orange";
            }
        }
        this.getDateTime();
    }

    
    openPaymentDetails () {
        console.log('>>> Open Payment Details');
        // var url = "c__accountNumber="+component.get("v.accountItem.displayNumber")+"&c__bank="+component.get("v.accountItem.bankName")+"&c__mainAmount="+component.get("v.accountItem.amountMainBalance")+"&c__availableAmount="+component.get("v.accountItem.amountAvailableBalance")+"&c__currentCurrency="+component.get("v.accountItem.curencyCodeAvailableBalance");
        var url='c__paymentId='+this.item.paymentDetail.paymentId+'&c__valueDate='+this.item.paymentDetail.valueDate+'&c__reason='+this.item.paymentDetail.transactionStatus.reason+'&c__status='+this.item.paymentDetail.transactionStatus.status
        +'&c__orderingAccount='+this.item.paymentDetail.originatorData.originatorAccount.accountId+'&c__orderingBIC='+this.item.paymentDetail.originatorAgent.agentCode+'&c__orderingBank='+this.item.paymentDetail.originatorAgent.agentName
        +'&c__beneficiaryAccount='+this.item.paymentDetail.beneficiaryData.creditorCreditAccount.accountId+'&c__beneficiaryName='+this.item.paymentDetail.beneficiaryData.beneficiaryName+'&c__beneficiaryBank='+this.item.paymentDetail.beneficiaryData.creditorAgent.agentName
        +'&c__beneficiaryBIC='+this.item.paymentDetail.beneficiaryData.creditorAgent.agentCode+'&c__amount='+this.item.paymentDetail.paymentAmount.amount
        +'&c__currency='+this.item.paymentDetail.paymentAmount.tcurrency+'&c__beneficiaryCity='+this.item.paymentDetail.beneficiaryData.creditorAgent.agentLocation
        +'&c__beneficiaryCountry='+this.item.paymentDetail.beneficiaryData.creditorAgent.agentCountry;
        console.log(url);
        if(this.backfront==false){
            this.goTo("payment-details", url);
        }else{
            this.goTo("c__CMP_BackFrontGPITrackerPaymentDetail", url);
        }
    }
            
    showHideDetails () {
        this.showHideDetails();
    }
    
    downloadMT103 (){
        this.downloadMT103();
    }

    goTo (page, url){
        try{
            this.encrypt(url)
            .then((results) =>{
                //let navService = component.find("navService");
                let pageReference={};
                if(this.backfront==true){
                    // pageReference= {
                    //     type: "standard__component",
                    //     attributes: {
                    //         "componentName":page,
                    //         "actionName":"view"
                    //     },
                    //     state: {c__params:results}
                    // };  
                    this[NavigationMixin.Navigate]({
                        type: "comm__namedPage", 
                        attributes: {
                            pageName: page
                        },
                        state: {
                            params : result
                        }
                    });
                }else{                    
                    // pageReference = {
                    //     type: "comm__namedPage", 
                    //     attributes: {
                    //         pageName: page
                    //     },
                    //     state: {
                    //         params : results
                    //     }
                    // }
                    this[NavigationMixin.Navigate]({
                        type: "comm__namedPage", 
                        attributes: {
                            pageName: page
                        },
                        state: {
                            params : ''
                        }
                    });
                }
            });

        } catch (e) {
            console.log(e);
        }
    }
    
    encrypt (data){
        try{
            var result="null";
            //var action = component.get("c.encryptData");
            //action.setParams({ str : data });
            return new Promise((resolve, reject) => {
                encryptData({ str : data })
                .then(value => {
				    console.log('Ok');
                    result = value;
                    resolve(result);
                })
                .catch(error => {
				    errors = error;
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                                    errors[0].message);
                            reject(response.getError()[0]);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                });
            });
        } catch (e) { 
            console.log(e);
        }   
    }

    showHideDetails () {
        try{
            //var cmp = component.find("details");
            var cmp = this.template.querySelector('[data-id]="details"]');
            //var cmpParent = component.find("parentDetails");
            var cmpParent = this.template.querySelector('[data-id]="parentDetails"]');
            //var cmptable = component.find("datailsTable");
            var cmptable = this.template.querySelector('[data-id]="datailsTable"]');
            // var icon = component.find("icon");
            var icon = this.template.querySelector('[data-id]="icon"]');
            var pos = this.itemPosition;
    
            if(cmp!=undefined){
                cmp.classList.toggle("hidden");
            }
    
            if(pos != undefined && pos!=null){
                if(this.itemPosition%2!=0){
                    cmptable.classList.add("evenBackground");
                }
            }
    
            if(icon!=undefined){
                icon.classList.toggle("icon-arrowDown_small")
                icon.classList.toggle("icon-arrowUp_small")
            }
    
            if(cmpParent!=undefined){
                cmpParent.classList.toggle("noInferiorBorder")
            }
            
        } catch (e) {
            console.log(e);
        }
    }
    
    downloadMT103 (){
        //First retrieve the doc and the remove it
        try{            
            this.retrieveMT103().then((results)=>{
                if(results!=''&& results!=undefined && results!=null){
                    var domain=this.label.domain;
                    if(this.backfront){
                        domain=this.label.domainBackfront;
                    }

                    window.location.href = domain+'/sfc/servlet.shepherd/document/download/'+results+'?operationContext=S1';

                    setTimeout(function(){
                        this.removeMT103(results);
                    }, 80000);
                }
            });

        } catch (e) {
            console.log(e);
        }
    }

    removeMT103 (ID){

        try{
            var action = component.get("c.removeMT103");
            //Send the payment ID
            //action.setParams({id:ID});
            removeMT103({id:ID})
            .then(result => {
				console.log('Ok');
            })
            .catch(error => {
				errors = error;
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

    retrieveMT103 (){
        try{
            var action = component.get("c.downloadMT103Doc");
            //Send the payment ID
            //action.setParams({str:component.get("v.item.paymentDetail.paymentId")});
            return new Promise((resolve, reject) => {
                downloadMT103Doc({str:this.item.paymentDetail.paymentId})
            .then(result => {
				console.log('Ok');
                resolve(result);
            })
            .catch(error => {  
                var errors = error;
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                        errors[0].message);
                        reject(errors);
                    }
                } else {
                    console.log("Unknown error");
                }  
            });
            });
        } catch (e) {
            console.log(e);
        }
    }

    getDateTime (){
        try{
            if(this.item.paymentDetail.statusDate!=undefined){
                getDateAndTime({dateT:this.item.paymentDetail.statusDate})
                .then(result => {
                    console.log('Ok');
                    var res = result; 
                    if(res!=null){
                    var results=res.substring(8,10) +"/"+res.substring(5,7)+"/"+res.substring(0,4) +" | "+res.substring(11);
                    this.item.paymentDetail.statusDate = results;
                    }
                })
                .catch(error => {
                    errors = error;
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                                        errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                });
            }
        }catch(e){
            console.log("CMP_IPTDetailParent / getDummyData : " + e);
        }
    }
}