import { LightningElement, track } from 'lwc';

import { loadStyle, loadScript } from 'lightning/platformResourceLoader';

// Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

import consumerKeyLoginAsApp from '@salesforce/label/c.consumerKeyLoginAsApp';
import PortalUserProfile from '@salesforce/label/c.PortalUserProfile';
import domain from '@salesforce/label/c.domain';
import domainCashNexus from '@salesforce/label/c.domainCashNexus';

import Id from '@salesforce/user/Id';



export default class Lwc_backOfficeLoginAs extends LightningElement {

    Label =  {
        consumerKeyLoginAsApp,
        PortalUserProfile,      
        domain,    
        domainCashNexus
    }
    
    @track selectedUserId;
    @track fieldnames = ['FirstName', 'LastName', 'USER_TXT_GlobalId__c', 'Username'];

    @track loginState = 0;


    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
    }

    get buttonDisabled(){
        return this.selectedUserId == undefined || this.selectedUserId == '';
    }


    login() {
        let targetUserId = this.selectedUserId;

        

        if(targetUserId != "" && targetUserId != undefined){

            let data = {
                callercomponent : "c-lwc_back-office-login-as",
                controllermethod : "getDummyUsername",
                actionparameters : {userId : targetUserId},
               
            } 

            //component.find("c-lwc_service-component").onCallApex("c.getDummyUsername", {userId : targetUserId}, helper.getUserAccessToken);
            this.template.querySelector('c-lwc_service-component').onCallApex(data);
        }
    }

    getUserAccessToken() {
        let data = {
            callercomponent : "c-lwc_back-office-login-as",
            controllermethod : "getUserAccessToken",
            actionparameters : {username : response,
                                consumerKey : this.Label.consumerKeyLoginAsApp,
                                targetUserId : this.selectedUserId},
           
        }
        this.template.querySelector("c-lwc_service-component").onCallApex(data);
    }
    
    setResponseData() { 
        console.log(response);
        // let loginUrl = "https://dev-onetrade.cs102.force.com/cashnexus/secur/frontdoor.jsp?sid="+ response;
        let redirectUrl;
        if(response.userProfile == this.Label.PortalUserProfile)
        {
            let loginUrl = this.Label.domain + "/secur/frontdoor.jsp?sid="+ response.accessToken;
            redirectUrl = loginUrl +"&retURL=" + this.Label.domain + "/s/";
            
        }
        else
        {
            let loginUrl = this.Label.domainCashNexus + "/secur/frontdoor.jsp?sid="+ response.accessToken;
            redirectUrl = loginUrl +"&retURL=" + this.Label.domainCashNexus + "/s/";
            
            
        }
        window.open(redirectUrl);
        
        // Create the audit record once the user has been redirected to the page

        let data = {
            callercomponent : "c-lwc_back-office-login-as",
            controllermethod : "createAuditRecord",
            actionparameters : {loggedAsUserId : this.selectedUserId,
                                loggedInUserId : Id},
           
        }
        
        this.template.querySelector("c-lwc_service-component").onCallApex(data);
    }

    handleService(){

        switch (this.loginState){
            case 0:
                this.getUserAccessToken();
                this.loginState += 1;
                break;
            case 1:
                this.setResponseData();
                this.loginState = 0;
                break;           
        }
    }

    handleValue(event){
        this.selectedUserId = event.detail.value;
    }

}