import { LightningElement}         from 'lwc';
import { NavigationMixin }         from 'lightning/navigation';
import isSubsidiaryProcess         from '@salesforce/apex/CNT_OTVActivationSteps.isSubsidiaryProcess';
import getEnrollmentValue          from '@salesforce/apex/CNT_OTVActivationSteps.getEnrollmentValue';


export default class CmpOTVActivationSteps extends NavigationMixin(LightningElement) {
    step                = 1;
    fromStep            = 1;
    showStep1           = true;
    showStep2           = false;
    showStep3           = false;
    showStep4           = false;
    showStep5           = false;
    showStep6           = false;
    
    //@wire (isSubsidiaryProcess) 
    subsidiaryProcess = false;

    connectedCallback() {
        isSubsidiaryProcess().then((results)=>{
            this.subsidiaryProcess = results;
        })
        getEnrollmentValue().then((results)=>{
            console.log('getEnrollmentValue');
            console.log(results);
            if(results == 'Subsidiary Selection Pending'){
                this.showStep1 = false;
                this.enrollment = true;
                this.showStep3 = true;
                this.step = 3;
            }else{
                this.enrollment = false;
            }
        })
    }
    renderedCallback(){
        getEnrollmentValue().then((results)=>{
            console.log('getEnrollmentValue');
            console.log(results);
            if(results == 'Subsidiary Selection Pending'){
                this.showStep1 = false;
                this.enrollment = true;
                this.showStep3 = true;
                this.step = 3;
            }else{
                this.enrollment = false;
            }
        })
    }
    changeStep(event) {
        this.step = event.detail.step;
        this.fromStep = event.detail.fromStep;
        //CANCEL PROCESS BUTTON OR BACK BUTTON AT STEP 1.
        if(this.step == 0){
            this.cancelProcess();
        
        //TERMS & CONDITIONS
        }else if (this.step == 1){
            this.showStep1 = true;
            this.showStep2 = false;
            this.showStep3 = false;
            this.showStep4 = false;
            this.showStep5 = false;
            this.showStep6 = false;
        
        //TERMS & CONDITIONS COMPLETED
        }else if (this.step == 2){
            this.showStep1 = false;
            this.showStep2 = true;
            this.showStep3 = false;
            this.showStep4 = false;
            this.showStep5 = false;
            this.showStep6 = false;
            
        //SUBSIDIARIES SELECTION
        }else if (this.step == 3){
            this.showStep1 = false;
            this.showStep2 = false;
            this.showStep3 = true;
            this.showStep4 = false;
            this.showStep5 = false;
            this.showStep6 = false;
        
        //SUBSIDIARIES SELECTION COMPLETED 
        }else if (this.step == 4){
            this.showStep1 = false;
            this.showStep2 = false;
            this.showStep3 = false;
            this.showStep4 = true;
            this.showStep5 = false;
            this.showStep6 = false;

        //SUBSIDIARIES SELECTION COMPLETED 
        }else if (this.step == 5){
            this.showStep1 = false;
            this.showStep2 = false;
            this.showStep3 = false;
            this.showStep4 = false;
            this.showStep5 = true;
            this.showStep6 = false;
        
        //SUPPORT CENTER 
        }else if (this.step == 6){
            this.showStep1 = false;
            this.showStep2 = false;
            this.showStep3 = false;
            this.showStep4 = false;
            this.showStep5 = false;
            this.showStep6 = true;
        }

        
    }

    cancelProcess(){
        try {
            this[NavigationMixin.Navigate]({
                type: 'comm__namedPage',
                attributes: {
                    name: "Home"
                }
            })
        } catch (error) {
            console.log(error);
        }
    }


}