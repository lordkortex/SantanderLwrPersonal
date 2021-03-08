import { LightningElement, track } from 'lwc';

import { loadStyle, loadScript } from 'lightning/platformResourceLoader';

// Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

import UserSuccessfullyCreated from '@salesforce/label/c.UserSuccessfullyCreated';
import ToastReviewMandatoryFields from '@salesforce/label/c.ToastReviewMandatoryFields';
import UserNewUserIdValidation from '@salesforce/label/c.UserNewUserIdValidation';
import UserNewLeastOneCorporate from '@salesforce/label/c.UserNewLeastOneCorporate';
import Corporates from '@salesforce/label/c.Corporates';
import Users_AddUsers from '@salesforce/label/c.Users_AddUsers';
import Users from '@salesforce/label/c.Users';
import userDetails from '@salesforce/label/c.userDetails';
import Users_ConfirmModify from '@salesforce/label/c.Users_ConfirmModify';
import Users_WarningDuplicate from '@salesforce/label/c.Users_WarningDuplicate';

export default class Lwc_userNewParent extends LightningElement {


    Label = {
        UserSuccessfullyCreated,
        ToastReviewMandatoryFields,
        UserNewUserIdValidation,
        UserNewLeastOneCorporate,
        Users_AddUsers,
        userDetails,
        Corporates,
        Users_ConfirmModify,
        Users_WarningDuplicate,
        Users
    }


    @track userIdInput;
    @track userInfo;
    @track showCorporates = true;
    @track showModal;
    @track modalToShow = "";
    @track showToast;
    @track messageToast = this.Label.UserSuccessfullyCreated;
    @track typeToast = "success";
    @track selectedCorporates = [];
    @track typesList;
    @track corporatesListBack;
    @track corporatesListFront;

    @track breadcrumb = [this.Label.Users, this.Label.Users_AddUsers];
    @track currentStageNumber = 0;
    @track firstText;

    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');

        if(this.template.querySelector('[data-id="variableWidth"]')){
            this.template.querySelector('[data-id="variableWidth"]').style='width:' + v.maxWidth + 'px;';
        }
        this.userInfo = {"tieneVasco":"N","tipoVasco":"Physical","mobileApp":"N","State":"Enabled","type_Z":"Functional"};
        this.doInit();
    }


    doInit() 
    {
        var data = ['Coca Cola','Inditex','Apple','Amazon','HP'];
        this.corporatesListFront = data;
        this.corporatesListBack = data;
        this.handleDoInit();
    }

    get deleteCondition(){
        if(this.showModal && this.modalToShow == 'ConfirmCreation'){
            this.firstText = this.userInfo.userName + ' ' + this.userInfo.userSurname;  
        }
        return this.showModal && this.modalToShow == 'ConfirmCreation';
    }

    buttonClicked(event) 
    {
        var bt = event.detail.buttonClicked;
        if(bt == "SaveButton") 
        {
            this.checkFields(event);

        }
    }

    deletionConfirmed(event) 
    {

        if(event.getSource().getLocalId() == "ConfirmCreationModal")
        {
            var bt = event.detail.isDeleting;

            this.showModal = false;
            var url =  "c__showToast=true";
            //console.log(this.userIdInput"));
            if(bt) 
            {
                if(this.userIdInput == undefined ){
                    url = 'c__userId=' + this.userInfo.userId + 
                    '&c__userName=' + this.userInfo.userName + 
                    '&c__comesFrom=' + 'Creation';
                    this.template.querySelector('c-lwc_service-component').redirect("profile-user", url);
                }else{
                    this.template.querySelector('c-lwc_service-component').redirect("users", url);
                }
               
            } 
        }
        
    }
    handleDoInit() {
       
        var sPageURLMain = decodeURIComponent(window.location.search.substring(1));
        if(sPageURLMain){
            this.template.querySelector('c-lwc_service-component').dataDecryption(sPageURLMain, this.handleParams);
        }
        
    }

    handleParams (response) 
    {
        console.log(response);
        var userInfo = this.userInfo;
        var temp;
        for(var i = 0; i < response.length ; i++) {
            
        temp = response[i].split("=");


        switch(temp[0]) {
           case("c__userId"):
               this.userIdInput = temp[1];
               userInfo.userId = temp[1];
               break;
           case("c__userName"):
               userInfo.userName = temp[1];
               break;
           case("c__userSurname"):
               userInfo.userSurname = temp[1];
               break;
           case("c__userType"):
               userInfo.type_Z = temp[1];
               if(userInfo.type_Z == 'Advisory' || userInfo.type_Z == 'Functional') {
                    var data = ['Inditex','Apple','Amazon','HP'];
                    this.corporatesListFront = data;
                    this.selectedCorporates = ['Coca Cola'];
                    this.typesList = ['Functional', 'Advisory'];

               }
               if(userInfo.type_Z == 'Administrator') {
                   this.typesList = ['Administrator'];
               }
               break;
           case("c__userState"):
               userInfo.State = temp[1];
               break;
       }
    }

    if(userInfo.userId != null && userInfo.userId != undefined) 
    {
        userInfo.Language = 'English';
        userInfo.TimeZone = 'GMT+1';
        userInfo.NumberFormat = '###.###.###.##';
        userInfo.dateFormat = 'dd/MM/yyyy';
        userInfo.Email = userInfo.userName.split(' ').join('_') + userInfo.userSurname.split(' ').join('_') + '@gmail.com';

    }

   this.userInfo = userInfo;


   // if(response[0] != "") 
   // {
   //     let responseValue = response[0].split("=");
   //     if(responseValue[0] == "c__userId") 
   //     {
   //         userInfo.userId = responseValue[1];
   //         this.userIdInput", responseValue[1]);
   //        // component.find("Service").callApex2("c.getUserInfo", {'userId' : responseValue[1]}, this.retrieveUserInfo);
   //     }
   // }
    }

    retrieveUserInfo (response) {
        console.log("entra 2");
        console.log(JSON.stringify(response));
        this.userInfo = response;
    }

    checkFields () {
        var isCorrect = true;
        var isFormFillCorrect = true;
        var userIdLengthValidation = true;
        console.log('longitud corporates list');
        console.log(this.selectedCorporates.length);
        // if(this.userInfo.userId").length < 5)
        // {
        //     isCorrect = false
        // }
        if(
            this.userInfo.userId == null || this.userInfo.userId == '' || this.userInfo.userId == undefined ||
            this.userInfo.userName == null || this.userInfo.userName == '' || this.userInfo.userName == undefined ||
            this.userInfo.userSurname == null || this.userInfo.userSurname == '' || this.userInfo.userSurname == undefined  ||
            this.userInfo.type_Z == null || this.userInfo.type_Z == '' || this.userInfo.type_Z == undefined ||
            this.userInfo.State == null || this.userInfo.State == '' || this.userInfo.State == undefined ||
            this.userInfo.Language == null || this.userInfo.Language == '' ||  this.userInfo.Language ==  undefined ||
            this.userInfo.NumberFormat == null || this.userInfo.NumberFormat == '' || this.userInfo.NumberFormat == undefined ||
            this.userInfo.TimeZone == null || this.userInfo.TimeZone == ''  || this.userInfo.TimeZone == undefined ||
            this.userInfo.dateFormat == null || this.userInfo.dateFormat == '' || this.userInfo.dateFormat == undefined ||
            this.userInfo.Email == null || this.userInfo.Email == ''  || this.userInfo.Email == undefined){
                this.showToast = true;
                this.typeToast = 'warning'; 
                this.messageToast = this.Label.ToastReviewMandatoryFields;
                isCorrect = false;
                isFormFillCorrect = false;
                userIdLengthValidation = false;
                console.log('Faltan campos por rellenar');
                
            }

        
        if(
            (this.userInfo.userId != null && this.userInfo.userId != '' 
            && this.userInfo.userId != undefined) &&
            (this.userInfo.type_Z != null && this.userInfo.type_Z != '' 
            && this.userInfo.type_Z != undefined) && userIdLengthValidation && 
            (this.userInfo.userId.length < 5 || this.userInfo.userId.length >15)){
                        this.showToast = true;
                        this.typeToast = 'warning';
                        this.messageToast = this.Label.UserNewUserIdValidation;
                        isCorrect = false;
                        isFormFillCorrect = false;
            }

        // SOLO APLICA PARA TIPO FUNCIONAL Y ADVISORY
        if( this.selectedCorporates.length == 0 &&
            isFormFillCorrect && userIdLengthValidation && 
            (this.userInfo.type_Z == 'Functional' || this.userInfo.type_Z == 'Advisory')){
                this.showToast = true;
                this.typeToast = 'warning';
                this.messageToast = this.Label.UserNewLeastOneCorporate;
                isCorrect = false;
        }

        if(isCorrect) 
        {
            var url =  'c__showToast='+this.userInfo.type_Z;
            // this.showModal = true);
            // this.modalToShow = "ConfirmCreation" );
            if(this.userIdInput == undefined )
            {
                url = 'c__userId=' + this.userInfo.userId + 
                '&c__userName=' + this.userInfo.userName + 
                '&c__comesFrom=' + 'Creation';
                this.template.querySelector('c-lwc_service-component').redirect("profile-user", url);
                
            }else
            {
                this.template.querySelector('c-lwc_service-component').redirect("users", url);
            }
        }
    }
}