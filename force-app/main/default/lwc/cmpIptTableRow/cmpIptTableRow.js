import { LightningElement, track, api, wire } from 'lwc';

import encryptData from '@salesforce/apex/CNT_SwiftPaymentTableRow.encryptData';
import removeMT103 from '@salesforce/apex/CNT_SwiftPaymentTableRow.removeMT103';
import downloadMT103Doc from '@salesforce/apex/CNT_SwiftPaymentTableRow.downloadMT103Doc';
import getDateAndTime from '@salesforce/apex/CNT_SwiftPaymentTableRow.getDateAndTime';

// Import custom labels
import paymentStatusOne from '@salesforce/label/c.payment_statusOne';
import paymentStatusTwo from '@salesforce/label/c.payment_statusTwo';
import paymentStatusThree from '@salesforce/label/c.payment_statusThree';
import paymentStatusFour from '@salesforce/label/c.payment_statusFour';
import tracking from '@salesforce/label/c.tracking';
import downloadMt103 from '@salesforce/label/c.downloadMT103';
import domain from '@salesforce/label/c.domain';
import domainCashNexus from '@salesforce/label/c.domainCashNexus';
import domainBackfront from '@salesforce/label/c.domainBackfront';

export default class cmpIptTableRowLwc extends LightningElement {

    @api recordId;
    @api item;
    @api statusClass = 'icon-circle__red';
    @api statusLabel = paymentStatusOne;
    @api fromCashNexus = false;

    paymentStatusOne = paymentStatusOne;
    paymentStatusTwo = paymentStatusTwo;
    paymentStatusThree = paymentStatusThree;
    paymentStatusFour = paymentStatusFour;
    tracking = tracking;
    downloadMt103 = downloadMt103;
    domain = domain;
    domainCashNexus = domainCashNexus;
    domainBackfront = domainBackfront;

    // Expose the labels to use in the template.
    /*label = {
        paymentStatusOne,
        paymentStatusTwo,
        paymentStatusThree,
        paymentStatusFour,
        tracking,
        downloadMt103,
        domain,
        domainCashNexus,
        domainBackfront
    };*/

    @wire (encryptData) encrypt;

    @wire (removeMT103) remove;

    @wire (downloadMT103Doc) download;

    @wire (getDateAndTime) dateTime;

    clase1(){
        return 'circle '+this.statusClass;
    }

    openPaymentDetails () {
       // var url = "c__accountNumber="+this.accountItem.displayNumber")+"&c__bank="+this.accountItem.bankName")+"&c__mainAmount="+this.accountItem.amountMainBalance")+"&c__availableAmount="+this.accountItem.amountAvailableBalance")+"&c__currentCurrency="+this.accountItem.curencyCodeAvailableBalance");
        var url='c__paymentId='+this.item.paymentDetail.paymentId+'&c__valueDate='+this.item.paymentDetail.valueDate+'&c__reason='+this.item.paymentDetail.transactionStatus.reason+'&c__status='+this.item.paymentDetail.transactionStatus.status
        +'&c__orderingAccount='+this.item.paymentDetail.originatorData.originatorAccount.accountId+'&c__orderingBIC='+this.item.paymentDetail.originatorAgent.agentCode+'&c__orderingBank='+this.item.paymentDetail.originatorAgent.agentName+'&c__orderingName='+this.item.paymentDetail.originatorData.originatorName
        +'&c__beneficiaryAccount='+this.item.paymentDetail.beneficiaryData.creditorCreditAccount.accountId+'&c__beneficiaryName='+this.item.paymentDetail.beneficiaryData.beneficiaryName+'&c__beneficiaryBank='+this.item.paymentDetail.beneficiaryData.creditorAgent.agentName
        +'&c__beneficiaryBIC='+this.item.paymentDetail.beneficiaryData.creditorAgent.agentCode+'&c__amount='+this.item.paymentDetail.paymentAmount.amount
        +'&c__currency='+this.item.paymentDetail.paymentAmount.tcurrency+'&c__beneficiaryCity='+this.item.paymentDetail.beneficiaryData.creditorAgent.agentLocation
        +'&c__beneficiaryCountry='+this.item.paymentDetail.beneficiaryData.creditorAgent.agentCountry;
        this.goTohelper("payment-details", url);
    }



    downloadMT103 (){
        this.downloadMT103helper();
    }

    connectedCallback(){
        console.log("ITEM: ", this.item.paymentDetail);

        var status =this.item.paymentDetail.transactionStatus.status;
        var reason=this.item.paymentDetail.transactionStatus.reason;
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

        //this.getDateTimehelper();
    }

    
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
            this.download({str: this.item.paymentDetail.paymentId}).then(function(results){
                if(results!=null && results!='' && results!=undefined){
                    //console.log($A.get('$Setup.MyCustomSet__c.URL__c'));
                    var domain=domain;
                    if(this.fromCashNexus==true){
                        domain=domainCashNexus;
                    }
                    if(this.backfront==true){
                        domain=domainBackfront;
                    }

                    window.location.href = domain+'/sfc/servlet.shepherd/document/download/'+results+'?operationContext=S1';

                    setTimeout(function(){
                        this.remove({id: results});
                    },80000);
                }
            });

        } catch (e) {
            console.log(e);
        }
    }

}