import { LightningElement, wire, track,api } from "lwc";

import getTCByCountry                           from '@salesforce/apex/CNT_OTV_TermsAndConditions.getTCByCountry';
import termsConditionsSignature                 from '@salesforce/apex/CNT_OTV_TermsAndConditions.termsConditionsSignature';
import getSessionId                             from '@salesforce/apex/CNT_OTV_TermsAndConditions.getSessionId';
import getScauId                                from '@salesforce/apex/CNT_OTV_TermsAndConditions.getScauId';
import updateMatrixStatus                       from '@salesforce/apex/CNT_OTV_TermsAndConditions.updateMatrixStatus';
import updateSubsidiaryStatus                   from '@salesforce/apex/CNT_OTV_TermsAndConditions.updateSubsidiaryStatus';

// importing Resources
import { loadStyle }                            from 'lightning/platformResourceLoader';
import Santander_Icons                          from '@salesforce/resourceUrl/Santander_Icons';
import images                                   from '@salesforce/resourceUrl/Images';
//import OTVTermsAndConditionsPDF                 from '@salesforce/resourceUrl/OTVTermsAndConditionsPDF';
import { NavigationMixin }                      from 'lightning/navigation';
import { loadScript }                           from "lightning/platformResourceLoader";
import cometdlwc                                from "@salesforce/resourceUrl/cometd";

// importing Custom Label
import back                                     from '@salesforce/label/c.back';
import Activation                               from '@salesforce/label/c.Activation';
import cancelProcess                            from '@salesforce/label/c.cancelProcess';
import progress                                 from '@salesforce/label/c.Progress';
import downloadPDF                              from '@salesforce/label/c.downloadPDF';
import cmpOTVTermsConditions_Accept             from '@salesforce/label/c.cmpOTVTermsConditions_Accept';
import cmpOTVTermsConditions_Address            from '@salesforce/label/c.cmpOTVTermsConditions_Address';
import cmpOTVTermsConditions_Email              from '@salesforce/label/c.cmpOTVTermsConditions_Email';
import cmpOTVTermsConditions_Owner              from '@salesforce/label/c.cmpOTVTermsConditions_Owner';
import cmpOTVTermsConditions_Public_Registry    from '@salesforce/label/c.cmpOTVTermsConditions_Public_Registry';
import cmpOTVTermsConditions_VAT                from '@salesforce/label/c.cmpOTVTermsConditions_VAT';
import cmpOTVTermsConditions_1                  from '@salesforce/label/c.cmpOTVTermsConditions_1';
import cmpOTVTermsConditions_2                  from '@salesforce/label/c.cmpOTVTermsConditions_2';
import cmpOTVTermsConditions_3                  from '@salesforce/label/c.cmpOTVTermsConditions_3';
import cmpOTVTermsConditions_4                  from '@salesforce/label/c.cmpOTVTermsConditions_4';
import cmpOTVTermsConditions_5                  from '@salesforce/label/c.cmpOTVTermsConditions_5';
import cmpOTVTermsConditions_6                  from '@salesforce/label/c.cmpOTVTermsConditions_6';
import cmpOTVTermsConditions_7                  from '@salesforce/label/c.cmpOTVTermsConditions_7';
import cmpOTVTermsConditions_8                  from '@salesforce/label/c.cmpOTVTermsConditions_8';
import cmpOTVTermsConditions_9                  from '@salesforce/label/c.cmpOTVTermsConditions_9';
import cmpOTVTermsConditions_10                 from '@salesforce/label/c.cmpOTVTermsConditions_10';
import cmpOTVTermsConditions_11                 from '@salesforce/label/c.cmpOTVTermsConditions_11';
import cmpOTVTermsConditions_12                 from '@salesforce/label/c.cmpOTVTermsConditions_12';
import cmpOTVTermsConditions_13                 from '@salesforce/label/c.cmpOTVTermsConditions_13';
import cmpOTVTermsConditions_14                 from '@salesforce/label/c.cmpOTVTermsConditions_14';
import cmpOTVTermsConditions_15                 from '@salesforce/label/c.cmpOTVTermsConditions_15';
import cmpOTVTermsConditions_16                 from '@salesforce/label/c.cmpOTVTermsConditions_16';
import cmpOTVTermsConditions_17                 from '@salesforce/label/c.cmpOTVTermsConditions_17';

export default class CmpOTVTermsConditions extends NavigationMixin(LightningElement) {
    label = {
        back,
        Activation,
        cancelProcess,
        progress,
        downloadPDF,
        cmpOTVTermsConditions_Accept,
        cmpOTVTermsConditions_Address, 
        cmpOTVTermsConditions_Email,
        cmpOTVTermsConditions_Owner, 
        cmpOTVTermsConditions_Public_Registry,
        cmpOTVTermsConditions_VAT,
        cmpOTVTermsConditions_1,
        cmpOTVTermsConditions_2,
        cmpOTVTermsConditions_3,
        cmpOTVTermsConditions_4,
        cmpOTVTermsConditions_5,
        cmpOTVTermsConditions_6,
        cmpOTVTermsConditions_7,
        cmpOTVTermsConditions_8,
        cmpOTVTermsConditions_9,
        cmpOTVTermsConditions_10,
        cmpOTVTermsConditions_11,
        cmpOTVTermsConditions_12,
        cmpOTVTermsConditions_13,
        cmpOTVTermsConditions_14,
        cmpOTVTermsConditions_15,
        cmpOTVTermsConditions_16,
        cmpOTVTermsConditions_17
    };

    // Expose URL of assets included inside an archive file
    logoSymbolRed = images + '/logo_symbol_red.svg';
    id  = images + '/i-d.jpg';
    alert = images + '/alert.svg';

    @api subsidiaryProcess = false;
    @api country;
    @api goSupport = false;
    @api step;
    @api channelName = '/event/OTPValidationOTV__e';
    @track sessionId;
    @track error;
    showCancelModal = false;
    showActivationCompleted = false;
    showParent = false;
    isGB = false;
    isPL = false;
    isES = false;
    isPT = false;
    isBR = false;
    isCL = false;
    isMX = false;
    appSignedCard;
    showDownload = false;
    cometd;
    sessionId;
    scaUid;
    error;
    payloadStatus = false;
    libInitialized = false;
    subscription = {};
    pdfName;
    serviceName;
    status;
    statusSF;
    //self = this;
    connectedCallback() {
        Promise.all([
            loadStyle(this, Santander_Icons + '/style.css'),
        ])
        console.log('country:' + this.country);
        if(this.country == 'UK'){
            this.isGP = true;
        }else if(this.country == 'PL'){
            this.isPL = true;
        }else if(this.country == 'ES'){
            this.isES = true;
            // this.santanderID = true;
        }else if(this.country == 'PT'){
            this.isPT = true;
        }else if(this.country == 'BR'){
            this.isBR = true;
            this.santanderID = true;
        }else if(this.country == 'CL'){
            this.isCL = true;
            this.santanderID = true;
        }else if(this.country == 'MX'){
            this.isMX = true;
        }
        getTCByCountry({ userCountry : this.country}).then(result => {
            console.log(result);
            this.pdfName = result;
        })
    }

    downloadPDF(){
        let downloadElement = document.createElement('a');
        downloadElement.href = this.pdfName;
        downloadElement.setAttribute("download","TermsAndConditions.pdf");
        downloadElement.download = 'TermsAndConditions_' + this.country + '.pdf';
        downloadElement.click(); 
    }

    goCompletedTerms(){
        console.log('Subsidiary Process --> ' + this.subsidiaryProcess);
        termsConditionsSignature({ pdfName : this.pdfName}).then()
            .catch(error => {
                this.error = error;
            });
        this.changeStep(this);
    }
    goBack(){
        const changeStepEvent = new CustomEvent('changestep', {detail: {step : 0}});
        this.dispatchEvent(changeStepEvent);
    }
    cancelTerms(){
        this.showCancelModal = true;
    }  
    cancelProcess(event){
        this.showCancelModal = false;
        if(event.detail.cancelTerms){
            this.goBack();
        }
       
    }
    goSupportCenter(){
        const changeStepEvent = new CustomEvent('changestep', {detail: {step : 6,fromStep : this.step}});
        this.dispatchEvent(changeStepEvent);
    }
    handleResponse(response){
        console.log(response.data.payload.status__c);
    }
    
    goSignedApp(){
        const self=this;
        if(this.santanderID){
            console.log('goSignedApp --> ');
            this.appSignedCard = this.template.querySelector('[data-id=appGlobalID]');
            if(this.isBR){
                this.appSignedCard.className='cardAuthorization slds-card local';
            }else{
                this.appSignedCard.className='cardAuthorization slds-card';
            }
    
            getSessionId().then((result)=>{
                   const processType = this.subsidiaryProcess;
                if(result){
                    this.sessionId = result;
                    this.error = undefined;
                    loadScript(this, cometdlwc)
                    .then(() => {
                        this.initializecometd(processType,this.pdfName,this);
                    });
                }else if(error){
                    this.error = error;
                    this.sessionId = undefined;
                }
            })
        }else{
            this.changeStep(this);
        }
    }
    showDownloadTrue(){
        this.showDownload = true;
    }
    showDownloadFalse(){
        this.showDownload = false;
    }
    changeStep(data){
        var changeStepEvent;
        if(data.subsidiaryProcess){
            updateSubsidiaryStatus().catch(error => {
                console.log(error);
            });
            if(data.country == 'BR'){
                changeStepEvent = new CustomEvent('changestep', {detail: {step : 8}});
            }else{
                changeStepEvent = new CustomEvent('changestep', {detail: {step : 5}});
            }
            data.dispatchEvent(changeStepEvent);
        }else{
            updateMatrixStatus().catch(error => {
                console.log(error);
            });
            changeStepEvent = new CustomEvent('changestep', {detail: {step : 2}});
            data.dispatchEvent(changeStepEvent);
        }
    }
    initializecometd(processType,pdfName,currentThis) {
        if(this.libInitialized){
            return;
        }
        this.libInitialized = true;
        var cometdlib = new window.org.cometd.CometD();
        cometdlib.configure({
                            url: window.location.protocol + '//' + window.location.hostname + '/cometd/47.0/',
                            requestHeaders: { Authorization: 'OAuth ' + this.sessionId},
                            appendMessageTypeToURL : false,
                            logLevel: 'debug'
        });
        cometdlib.websocketEnabled = false;
        cometdlib.handshake(function(status) {
        if(status.successful) {
            console.log('Successfully connected to server');
            console.log(cometdlib);
            getScauId().then((result)=>{
                this.scaUid = result.scaUid;
            }).finally(() => {
                try{
                    var newSubscription = cometdlib.subscribe('/event/OTPValidationOTV__e', (platformEvent) => {
                    console.log('scaUidPlataforma' + platformEvent.data.payload.scaUid__c);
                    console.log('scaUid' + this.scaUid);
                    if(platformEvent.data.payload.scaUid__c == this.scaUid){
                        if(platformEvent.data.payload.status__c == 'KO' || platformEvent.data.payload.status__c == 'ko') {
                            console.log('KO');
                            self.payloadStatus = false;
                            if(platformEvent.data.payload.statusDetail__c == 'REJECTED_BY_USER'){
                                currentThis.appSignedCard = currentThis.template.querySelector('[data-id=appGlobalID]');
                                currentThis.appSignedCard.className='cardAuthorization slds-card error rejected';
                            }else{
                                currentThis.appSignedCard = currentThis.template.querySelector('[data-id=appGlobalID]');
                                currentThis.appSignedCard.className='cardAuthorization slds-card error rejected';
                            }
                        }else{
                            console.log('OK');
                            self.payloadStatus = true;
                            cometdlib.unsubscribe(newSubscription);
                        }
                    }else{
                        console.log('sale en else');
                    }
                    console.log(self.payloadStatus);
                    if(self.payloadStatus){
                        console.log(processType);
                        console.log('entra');
                        console.log('Subsidiary Process --> ' + processType);
                        console.log(pdfName);
                        termsConditionsSignature({ pdfName : pdfName}).then()
                            .catch(error => {
                                self.error = error;
                            });
                            currentThis.changeStep(currentThis);
                        if(processType){
                            updateSubsidiaryStatus().catch(error => {
                                console.log(error);
                            });
                            cometdlib.disconnect();
                            if(data.country == 'BR'){
                                changeStepEvent = new CustomEvent('changestep', {detail: {step : 8}});
                            }else{
                                changeStepEvent = new CustomEvent('changestep', {detail: {step : 5}});
                            }
                            currentThis.dispatchEvent(changeStepEvent);
                        }else{
                            updateMatrixStatus().catch(error => {
                                console.log(error);
                            });
                            const changeStepEvent = new CustomEvent('changestep', {detail: {step : 2}});
                            currentThis.dispatchEvent(changeStepEvent);
                        }
                    }
                });
            }catch(error){
                console.log(error);
            }
        })
        }else{
            /// Cannot handshake with the server, alert user.
            console.error('Error in handshaking: ' + JSON.stringify(status));
        }
    });
    }
}