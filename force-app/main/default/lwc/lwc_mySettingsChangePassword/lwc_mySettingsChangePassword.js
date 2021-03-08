import { LightningElement,api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
//Import styles
import {loadStyle} from 'lightning/platformResourceLoader';
//import santanderSheetJS from '@salesforce/resourceUrl/SheetJS';
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

//Import labels
import Close from '@salesforce/label/c.close';
import Change_Password from '@salesforce/label/c.Change_Password';
import CurrentPassword from '@salesforce/label/c.CurrentPassword';
import NewPassword from '@salesforce/label/c.NewPassword';
import ConfirmNewPassword from '@salesforce/label/c.ConfirmNewPassword';
import AdminRoles_Cancel from '@salesforce/label/c.AdminRoles_Cancel';
import AdminRoles_Save from '@salesforce/label/c.AdminRoles_Save';

//Calls Apex
import changePasswordApex from '@salesforce/apex/CNT_UserSettingsController.changePassword';

export default class Lwc_mySettingsChangePassword extends LightningElement {

    //Labels
	Label ={
        Close,
        Change_Password,
        CurrentPassword,
        NewPassword,
        ConfirmNewPassword,
        AdminRoles_Cancel,
        AdminRoles_Save
    }
    
    @api ischangingpassword;    //description="flag to check if is changing the password"/>
    @api toasttype;             //description="Checks which is the toast" />
  
    //<c:CMP_ServiceComponent aura:id="Service"/>
    //<aura:registerEvent name="showToast" type="c:EVT_Toast"/>
    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
    }

    savechangepassword() {
        this.handleSave();
    }
    cancelchangepassword() {
        //this.ischangingpassword=false;
        const buttoncancelchangepassword = new CustomEvent('buttoncancelchangepassword');
        this.dispatchEvent(buttoncancelchangepassword);
    }
    handleSave() {
        var oldPassword = this.template.querySelector('[data-id="oldPassword"]').value;//        find("oldPassword").get("v.value");
        var newPassword = this.template.querySelector('[data-id="newPassword"]').value;//var newPassword = this.template.find("newPassword").get("v.value");
        var newPasswordConfirmed = this.template.querySelector('[data-id="newPassword2"]').value;//var newPasswordConfirmed = this.template.find("newPassword2").get("v.value");
        console.log("pass1: "+oldPassword);
        console.log("pass2: "+newPassword);
        console.log("pass2bis: "+newPasswordConfirmed);
        if(oldPassword != undefined && newPassword != undefined && newPasswordConfirmed != undefined)
        {
            if(newPassword == newPasswordConfirmed)
            {
                //component.find("Service").callApex2(component, helper,"c.changePassword", {oldPasswordParam : oldPassword, newPasswordParam : newPassword}, this.cancelChangePassword);

                changePasswordApex({oldPasswordParam : oldPassword, newPasswordParam : newPassword}).then(response => {
                    if (response) {
                        this.handlecancelchangepassword(response);
                    }
                });
            }else{
                console.log("no es igual");
                this.toastType="error";
                const evt = new ShowToastEvent({
                    title: "There has been a problem.",
                    message: "Your new password does not match."
                });
                this.dispatchEvent(evt);
            }
        }
    }

    handlecancelchangepassword(response)
    {
        console.log(response);
        
        if(response == '' || response == null ||response == undefined)
        {
            this.toastType="error";
            const evt = new ShowToastEvent({
                title: "There has been a problem.",
                message: "Your password could not be changed."
            });
            this.dispatchEvent(evt);
        }
        else
        {
            this.toastType="success";
            const evt = new ShowToastEvent({
                title: "Success!",
                message: "Your password has been updated successfully."
            });
            this.dispatchEvent(evt);
        }
        this.cancelchangepassword();
    }
}