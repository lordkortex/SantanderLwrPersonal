import back from '@salesforce/label/c.back'
import trackPaymentByUETR from '@salesforce/label/c.trackPaymentByUETR'
import help from '@salesforce/label/c.help'
import TrackByUETR from '@salesforce/label/c.TrackByUETR'
import TrackUETRHelpDetails from '@salesforce/label/c.TrackUETRHelpDetails'
import clear from '@salesforce/label/c.clear'
import uetrError from '@salesforce/label/c.uetrError'
import searchUETR from '@salesforce/label/c.searchUETR'
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';
import { LightningElement,api,track} from 'lwc';
import { loadStyle, loadScript} from 'lightning/platformResourceLoader';
export default class Lwc_iptHeaderSearchUetr extends LightningElement {
   
    @api issearched = false;
    @api searchvalue = "";
    @api noresults;
    @api result;
    @api isingested;
    @api comesfromtracker;
    @api comesfromsso;
    //@api showbackbutton;
    iObject;
    @track classError = 'slds-hide textHelp errorText';
    
 
    timeoutUetrSearch = null;
    //<aura:handler name="change" value="{!v.comesFromSSO}" action="{!c.checkSSO}"/>	
    

    label = {
        back,
        trackPaymentByUETR,
        help,
        TrackByUETR,
        TrackUETRHelpDetails,
        clear,
        uetrError,
        searchUETR
    };

    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
        if (!this.searchvalue){
            this.searchvalue = "";
        }
    }
    
    get searchValueNotEmpty(){
        if(this.searchvalue){
            if(this.searchvalue.length > 0){
                return true;
            }
        }
    }

    get searchValueClass(){
        var searchValueClass='';
        if(this.searchvalue){
            searchValueClass = 'slds-input ' + (this.searchvalue.length > 0 ? 'filledInput' : '')
        }else{
            searchValueClass = 'slds-input';
        }
        return searchValueClass;
    }

    handleClear(){
        this.issearched =  false;
        this.searchvalue = "";
        this.template.querySelector(`[data-id="text-input-id-1"]`).focus();

        var detail = {issearched: false, searchvalue:this.searchvalue};
        this.sendResultsEvent(detail);
        
    }

    checkSSO(){
        var inputValue = this.searchValue;
        var valid;

        if(inputValue == undefined || inputValue == null || inputValue == ''){
            this.classError = 'slds-hide textHelp errorText';
            valid = false;
        }else{
            //CAMBIO UETR DE MAYUSCULAS A MINUSCULAS 30/07/2020 INCIDENCIA
            inputValue = inputValue.toLowerCase();
            let re = "^([a-f0-9]{8})-([a-f0-9]{4})-4([a-f0-9]{3})-([89ab])([a-f0-9]{3})-([a-f0-9]{12})$";
            let found = inputValue.match(re);
            if(inputValue.length==36 && found!=null){
                this.classError = 'slds-hide textHelp errorText';
                valid = true;
            }else{
                this.classError = 'textHelp errorText';
                valid = false;
            }
        }
    
        if(inputValue != this.searchvalue && valid && (inputValue.length>0)){
            try{
                //getData(inputValue);
                var filter = "{\"searchData\": {\"latestPaymentsFlag\": \"NO\", \"inOutIndicator\": \"OUT\", \"_limit\":\"1000\",\"_offset\":\"0\",\"paymentId\":\"" + inputValue + "\"}}";   
                this.template.querySelector("c-lwc_service-component").onCallApex({
                    callerComponent: "lwc_ipt-header-search-uetr", 
                    controllermethod: "getFilteredData", 
                    actionparameters: filter});
            } catch (e) {
                console.log(e);
            }
        }
    }

    goBack(){
        window.history.back();
    }

    setInputOnBlur(event){
        let inputValue = event.target.value;
        var valid;
        if(inputValue == undefined || inputValue == null || inputValue == ''){
            this.classError = 'slds-hide textHelp errorText';
            valid = false;
        }else{
            //CAMBIO UETR DE MAYUSCULAS A MINUSCULAS 30/07/2020 INCIDENCIA
        	inputValue = inputValue.toLowerCase();
            let re = "^([a-f0-9]{8})-([a-f0-9]{4})-4([a-f0-9]{3})-([89ab])([a-f0-9]{3})-([a-f0-9]{12})$";
            let found = inputValue.match(re);
            if(inputValue.length==36 && found!=null){
                this.classError = 'slds-hide textHelp errorText';
                valid = true;
            }else{
                this.classError = 'textHelp errorText';
                valid = false;
            }
        }

        if(inputValue != this.searchvalue && valid && (inputValue.length > 0)){
            this.searchvalue = inputValue;
            try{
                //getData(component, event, helper, inputValue);
                var filter = "{\"searchData\": {\"latestPaymentsFlag\": \"NO\", \"inOutIndicator\": \"OUT\", \"_limit\":\"1000\",\"_offset\":\"0\",\"paymentId\":\"" + inputValue + "\"}}";   
                this.template.querySelector("c-lwc_service-component").onCallApex({callercomponent: "lwc_ipt-header-search-uetr", controllermethod: "getFilteredData", actionparameters: {filters: filter}});
            } catch (e) {
                console.log(e);
            }
        }
    }

    setInputOnKeyDown(event){
        let inputValue = event.target.value;
        let key = event.key;
        let keyCode = event.keyCode;
        
        if(key == 'Enter' && keyCode == 13){
            this.searchvalue = inputValue;
            var valid;
            if(inputValue == undefined || inputValue == null || inputValue == ''){
                this.classError = 'slds-hide textHelp errorText';
                valid = false;
            }else{
                //CAMBIO UETR DE MAYUSCULAS A MINUSCULAS 30/07/2020 INCIDENCIA
        		inputValue = inputValue.toLowerCase();
                let re = "^([a-f0-9]{8})-([a-f0-9]{4})-4([a-f0-9]{3})-([89ab])([a-f0-9]{3})-([a-f0-9]{12})$";
                let found = inputValue.match(re);
                if(inputValue.length==36 && found!=null){
                    this.classError = 'slds-hide textHelp errorText';
                    valid = true;
                }else{
                    this.classError = 'textHelp errorText';
                    valid = false;
                }
            }

            if (valid && (inputValue.length>0)) {
                try{
                    console.log('setInputOnKeyDown');
                   // getData(inputValue);
                    var filter = "{\"searchData\": {\"latestPaymentsFlag\": \"NO\", \"inOutIndicator\": \"OUT\", \"_limit\":\"1000\",\"_offset\":\"0\",\"paymentId\":\"" + inputValue + "\"}}";   
                    this.template.querySelector("c-lwc_service-component").onCallApex({callercomponent: "lwc_ipt-header-search-uetr", controllermethod: "getFilteredData", actionparameters: {filters: filter}});
                } catch (e) {
                    console.log(e);
                }
            }
        }
    }

    successcallback(event){
        console.log('OK successcallback');
        if(event.detail.callercomponent === 'lwc_ipt-header-search-uetr'){
            //console.log('Event details: ' + JSON.stringify(event.detail));
            this.setData(event.detail.value);
        }
    }

    setData(response){
        this.issearched = false;
        console.log('Llega la respuesta:');
        console.log(response);
        if(response != undefined && response != null && Array.isArray(response.paymentList) && response.paymentList.length){
            this.result = response.paymentList[0];
            this.noresults=false;
            this.isingested=true;
            this.issearched=true;

            var detail = {resultnotnull:true, noresults:false, issearched: true, result:this.result, searchvalue:this.searchvalue, isingested:true};
            this.sendResultsEvent(detail);
            
        }else{
            console.log("No encuentra");
            this.isingested= false;
                
            var result = {};
            //AM - 16/11/2020 - Fix UETR Pagos No Ingestados
            result.uetrCode = this.searchvalue;
            this.result= result;
            this.issearched=true;

            //var detail = {noresults:true, issearched: true, result:this.result, isingested:false};
            var detail = {resultnotnull:true, noresults:false, issearched: true, result:this.result, searchvalue:this.searchvalue, isingested:false};
            this.sendResultsEvent(detail);
            
        }
    }
    sendResultsEvent(detail){
        const resultsEvent = new CustomEvent('results', {
            detail: detail
           });
          this.dispatchEvent(resultsEvent);
    }

}