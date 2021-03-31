({
    handleSave : function(component,event,helper) {
        var oldPassword = component.find("oldPassword").get("v.value");
        var newPassword = component.find("newPassword").get("v.value");
        var newPasswordConfirmed = component.find("newPassword2").get("v.value");


        if(oldPassword != undefined && newPassword != undefined && newPasswordConfirmed != undefined)
        {
            if(newPassword == newPasswordConfirmed)
            {
                component.find("Service").callApex2(component, helper,"c.changePassword", {oldPasswordParam : oldPassword, newPasswordParam : newPassword}, this.cancelChangePassword);

            }
        }
    },

    cancelChangePassword : function(component,helper,response)
    {
        console.log(response);
        var toastEvent = $A.get("e.force:showToast");

        if(response == '' || response == null ||response == undefined)
        {
            component.set("v.toastType", 'error');
            toastEvent.setParams({
                        "title": "There has been a problem.",
                        "message": "Your password could not be changed."
            });
        }
        else
        {
            component.set("v.toastType", 'success');
            toastEvent.setParams({
                        "title": "Success!",
                        "message": "Your password has been updated successfully."
            });
        }
        toastEvent.fire();
            
        component.set("v.isChangingPassword", false);
    }
})