import { LightningElement, api, track } from 'lwc';
    
//** Temporal - eliminar cuando recibamos la pantalla de carga definitiva
import GPSkeleton_didYouKnow from '@salesforce/label/c.GPSkeleton_didYouKnow';
import GPSkeleton_internationalPayments from '@salesforce/label/c.GPSkeleton_internationalPayments';
import GPSkeleton_internationalPayments2 from '@salesforce/label/c.GPSkeleton_internationalPayments2';
import GPSkeleton_balancesAccounts from '@salesforce/label/c.GPSkeleton_balancesAccounts';
import GPSkeleton_trackPayments from '@salesforce/label/c.GPSkeleton_trackPayments';
import GPSkeleton_trackPayments2 from '@salesforce/label/c.GPSkeleton_trackPayments2';
import GPSkeleton_balancesAccounts2 from '@salesforce/label/c.GPSkeleton_balancesAccounts2';
import santanderStyle from '@salesforce/resourceUrl/Santander_Icons';
import Images from '@salesforce/resourceUrl/Images';
//**

//Import methods
import startOBDProcess  from '@salesforce/apex/CNT_OBD_Controller.isActiveOnboarding';
import sendOBDCompanies from '@salesforce/apex/CNT_OBD_Controller.activateAccounts';

 
export default class Lwc_digitalOnboarding extends LightningElement {
    

    //** Temporal - eliminar cuando recibamos la pantalla de carga definitiva
    logoSource = Images + '/logo_symbol_red.svg';
    Label = {
		GPSkeleton_didYouKnow,
        GPSkeleton_internationalPayments,
        GPSkeleton_internationalPayments2,
        GPSkeleton_balancesAccounts,
        GPSkeleton_trackPayments,
        GPSkeleton_trackPayments2,
        GPSkeleton_balancesAccounts2
    }
    //**

    //Atributes
    @api isLoading = false;

    //doInit
    connectedCallback() {
        this.isLoading = true;
        //this.initiateOnboardingProcess(); de momento comentado
    }

    initiateOnboardingProcess(){
        console.log("Lwc_digitalOnboarding.initiateOnboardingProcess");
        try{
            startOBDProcess().then(res => {
                var res = response.getReturnValue();
                if(res.OBDCompleted){
                    this.redirectOnSuccess();
                }else{
                    //rellenar lista para selección de compañias
                    this.isLoading = false;
                }
            }).catch(error => {
                this.redirectOnError(error);
            });
        } catch(e){
            this.redirectOnError("failedOBD");
        }
    }

    sendSelectedCompanies(){
        console.log("Lwc_digitalOnboarding.sendSelectedCompanies");
        try{
            sendOBDCompanies().then(res => {
                var res = response.getReturnValue();
                this.redirectOnSuccess();
            }).catch(error => {
                this.redirectOnError(error);
            });
        } catch(e){
            this.redirectOnError("failedOBD");
        }
    }

    redirectOnError(errorCode){
        window.location.replace("/login/error?ErrorCode="+errorCode);
    }

    redirectOnSuccess(){
        window.location.reload();
    }
}