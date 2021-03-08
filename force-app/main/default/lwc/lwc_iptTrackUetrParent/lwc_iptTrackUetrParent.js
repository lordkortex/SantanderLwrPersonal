import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';
import {LightningElement,api,track} from 'lwc';
import {loadStyle, loadScript} from 'lightning/platformResourceLoader';
import Displaying from '@salesforce/label/c.Displaying';
import item from '@salesforce/label/c.item';
import searchedBy from '@salesforce/label/c.searchedBy';
export default class Lwc_iptTrackUetrParent extends LightningElement {

    @track comesfromtracker = false;
    @track issearched = false;
    searchValue;
    @track noresults = false;
    @track isingested;
    _result;
    comesFromSSO;
    showBackButton;
    
    label = {
        Displaying,
        item,
        searchedBy
    };

    get resultNotNull(){
        console.log(this._result + 'resultt');
        if (this._result != undefined || this._result != null){
            return 1;
        }
        else {return 0;}
    }
    get result() {
        return this._result;
    }
    set result(result) {
        this._result = result;
    }
    renderedCallback(){
        console.log('entra a connectedCallback');
        loadStyle(this, santanderStyle + '/style.css');
        var sPageURLMain = decodeURIComponent(window.location.search.substring(1));
        
        if(sPageURLMain != "" && sPageURLMain.includes("params")){
           // component.find("Service").dataDecryption(component,helper, sPageURLMain, this.handleParams);
            this.template.querySelector("c-lwc_service-component").onCallApex({callerComponent: "lwc_ipt-track-uetr-parent", controllermethod: "sPageURLMain", actionparameters: this.handleParams});
            this.comesfromtracker=true;	
            //this.showBackButton=false;
        } else {
            this.changeCommunityLanguage();
        }
    }

    changeCommunityLanguage(){
        console.log('entra al changeCommunityLanguage');
        var navigatorLanguage = navigator.language;
        const searchHeader = "?language=";
        
        //Getting first 2 characters of browser language
        if(navigatorLanguage.length >=2){
            navigatorLanguage = navigatorLanguage.substring(0, 2);
        }
        
        if(navigatorLanguage === "es") {   
            (window.location.search != searchHeader + "es" ? window.location.search = searchHeader + "es" : "");  

        } else if (navigatorLanguage === "pt") {            
            (window.location.search != searchHeader + "pt_BR" ? window.location.search = searchHeader + "pt_BR" : "");

        } else if (navigatorLanguage === "pl") {
            (window.location.search != searchHeader + "pl" ? window.location.search = searchHeader + "pl" : "");

        } else {
            (window.location.search != searchHeader + "en_US" ? window.location.search = searchHeader + "en_US" : ""); 
        }
    }

    handleParams(response){
        if(response != "") {
            var sParameterName;
            var accountDetails = [];
            for(var i = 0; i < response.length ; i++) {
                sParameterName = response[i].split("="); 
                
                switch(sParameterName[0]) {
                    case("c__comesFromTracker"):
                        sParameterName[1] === undefined ? 'Not found' : this.showBackButton =  true;
                        this.comesfromtracker =  true;
                        break;
                    case("c__uetr"):	
                        sParameterName[1] === undefined ? 'Not found' : this.searchValue = sParameterName[1];	
                        this.comesFromSSO = true;	
                        break;
                }
            }
        }
        else {
           this.changeCommunityLanguage(); 
        }
    }
    handleResultsEvent(event){
        this.issearched = false;
        console.log("iptTrackUetrParent");
        setTimeout(() => {
            this.noresults = event.detail.noresults;
            this.issearched = event.detail.issearched;
            this.isingested = event.detail.isingested;
            if(event.detail.result.uetrCode){
                this.searchvalue = event.detail.result.uetrCode;
                this._result = event.detail.result;
            }else{
                this._result = event.detail.result;
                this.searchvalue = event.detail.searchvalue;
            }    
        }, 0);
        
    }
    handleResetSearchEvent(event){
        this.searchvalue = event.detail.searchvalue;
        this.issearched = event.detail.issearched;
    }
    handleError(event) {
        console.log('handle error');
        this.noresults = true;
        this._result = null;
    }
}