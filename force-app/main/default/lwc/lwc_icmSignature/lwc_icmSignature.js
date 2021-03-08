import { LightningElement, api, track } from 'lwc';

import { loadStyle, loadScript } from 'lightning/platformResourceLoader';

// Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';


import imageFlag from '@salesforce/resourceUrl/Flags';


export default class Lwc_icmSignature extends LightningElement {

    @api originaccount;
    @api destinationaccount;
    @api amount;
    @api date;
    @api concept;
    //@api backStep Aura Action

    @track Commission = 0;
    @track Charge

    imgSource;
    imgSourceOrigin;
    imgSourceDestination;
    

    //controller = "CNT_InstantCashManagementController"

    // <c:CMP_ICMSignature OriginAccount="{!v.originValue}" destinationaccount="{!v.destinationValue}" Amount="{!v.Amount}"
    //                             concept="{!v.Concept}" Date="{!v.Date}" backStep = "{!c.previousStep}" />


    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
        this.imgSourceOrigin = imageFlag + '/' + this.originaccount.value.countryCode +'.svg'; 
        this.imgSourceDestination = imageFlag + '/' + this.destinationaccount.value.countryCode +'.svg'
        this.handleInit();
    }

    defaultImage(event){
        this.imgSource = imageFlag + '/' + '/Default.svg';        
        event.target.src = this.imgSource;
    }

    previousStep() {
        //this.previousSteptepHelper();

        const prevStep = new CustomEvent('backstep');
        this.dispatchEvent(prevStep);

    }

    sendToMuleSoft() {
        this.sendToMuleSofthelper();
    }   
    

    handleInit() {
        var amount = this.amount;
        amount = parseFloat(amount.split(".").join(""));
        //amount = parseFloat(amount);
        const comission = parseFloat(this.Commission);
        var total = comission + amount;
        var chargeAmountDestination = total;
        
        var chargeAmountOrigin; 
        
        if (this.originaccount.value.ObjectCurrency == "EUR" && this.destinationaccount.value.ObjectCurrency == "GBP"){
            total = parseFloat(total*(59/50)).toFixed(2);
            chargeAmountOrigin = total;
       
        } else if (this.originaccount.value.ObjectCurrency == "GBP" && this.destinationaccount.value.ObjectCurrency == "EUR"){
            total = parseFloat(total*(21/25)).toFixed(2) ;
            chargeAmountOrigin = total;
        }
        chargeAmountOrigin = chargeAmountOrigin.toString().replace(",", ".");
        chargeAmountDestination = chargeAmountOrigin.toString().replace(",", ".");        
        total = total.toString().replace(".",",");
        total = total.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
        
         // TODO REPLACE
        console.log('total' + total);
        this.Charge = total;

        
        
        var originAcc = JSON.parse(JSON.stringify(this.originaccount));
        var destinationAcc = JSON.parse(JSON.stringify(this.destinationaccount));
        
        originAcc.value.value = chargeAmountOrigin;
        destinationAcc.value.value = chargeAmountDestination;
        
        this.originaccount = originAcc;
        this.destinationaccount = destinationAcc;
    }

    sendToMuleSofthelper() {
        var dataMapMuleSoft = new Map();
        dataMapMuleSoft["originData"] = this.originaccount.value;
        dataMapMuleSoft["destinationData"] = this.destinationaccount.value;    
        
       /* dataMapMuleSoft.set("originData",this.OriginAccount);
        dataMapMuleSoft.set("destinationData",this.DestinationAccount);*/
   
        
       /*
        var dataMapMuleSoft =[
            {String: "originData", object: this.OriginAccount },
            {String: "destinationData", object: this.DestinationAccount }
        ];
*/
        console.log(dataMapMuleSoft);

        let data = {
            callercomponent : "c-lwc_icm-signature",
            controllermethod : "sendPayment",
            actionparameters : {data : dataMapMuleSoft}           
        }

        this.template.querySelector('c-lwc_service-component').onCallApex(data);

    }
    showToast(response) {
        console.log(response);
        if(response){
            const event = new ShowToastEvent({
                title: 'Success!',
                message: 'The call has been executed successfully.',
            });
            this.dispatchEvent(event);

        } else{
            const event = new ShowToastEvent({
                title: 'ERROR!',
                message: 'The call has been failed.',
            });
            this.dispatchEvent(event);

        }
       
    }

    handelService(event){
        this.showToast(event.detail);
    }
        
}