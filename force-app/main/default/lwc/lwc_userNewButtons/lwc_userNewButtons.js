import { LightningElement, track, api } from 'lwc';

import { loadStyle, loadScript } from 'lightning/platformResourceLoader';

// Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

import GroupNew_Return from '@salesforce/label/c.GroupNew_Return';
import GroupNew_SeeAllProfile from '@salesforce/label/c.GroupNew_SeeAllProfile';
import GroupNew_Cancel from '@salesforce/label/c.GroupNew_Cancel';
import GroupNew_Continue from '@salesforce/label/c.GroupNew_Continue';
import AdminRoles_Save from '@salesforce/label/c.AdminRoles_Save';

export default class Lwc_userNewButtons extends LightningElement {

    Label = {
        GroupNew_Return,
        GroupNew_SeeAllProfile,
        GroupNew_Cancel,
        GroupNew_Continue,
        AdminRoles_Save
    }

    @api currentstagenumber

    @track stage1Finished
    @track stage2Finished
    @track userId
    @track userName
    @track userRol
    @track userGroup
    @track selectedValueRol
    @track selectedValueGroup
    @track hasData
    @track isCancelling
    @track isNewUser



    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
    }

    get currentStageNumberEQ0(){
        return this.currentstagenumber == 0;
    }
    get currentStageNumberEQ1(){
        return this.currentstagenumber == 1;
    }
    get currentStageNumberEQ2(){
        return this.currentstagenumber == 2;
    }
    get currentStageNumberEQ3(){
        return this.currentstagenumber == 3;
    }



    nextStep() {
        this.currentstagenumber = 2;
        this.stage1Finished = true;
    }

    nextStep2() {
        this.currentstagenumber = 3;
        this.stage2Finished = true;
    }

    backStep() {
        this.currentstagenumber = 1;
    }

    backStep2() {
        this.currentstagenumber = 2;
    }

    navigateToDetailsComponent() {

       //this.isCancelling = true);
       this.template.querySelector('c-lwc_service-component').redirect("users", "");

    }

    goToSummaryPage(){
        
     //AÑADIR PARAMETROS EN CASO DE QUE FUERA NECESARIO
     console.log("tiene Datos::::: " + this.hasData);
        var url =
        "c__userId="+this.userId+
        "&c__userName="+this.userName+
        "&c__userRol="+this.selectedValueRol+
        "&c__userGroup="+this.selectedValueGroup +
        "&c__hasData="+this.hasData +
        "&c__comesFrom=" + "Profile-User";
        
        this.template.querySelector('c-lwc_service-component').redirect("user-group-profile-summary", url);
    }

    finishStepsButtons() {
        var url = "c__userId="+this.userId+
        "&c__isNewUser="+this.isNewUser+
        "&c__comesFrom="+"Profiling";
        console.log('sacamos url');
        console.log(url);
        this.template.querySelector('c-lwc_service-component').redirect("users", url);
    }
    
   cancelCreation() {
        this.template.querySelector('c-lwc_service-component').redirect("users", "");
    }

   showSaveModal() {

    const cmpEvent = new CustomEvent("userbuttonclicked",{
        detail : {
            buttonClicked: "SaveButton"
        }
    });
    
    this.dispatchEvent(cmpEvent)

    }
}