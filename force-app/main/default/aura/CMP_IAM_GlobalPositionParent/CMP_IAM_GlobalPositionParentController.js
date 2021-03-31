({
        doInit : function(component, event, helper) {
                
                //AB - 16/12/2020 - pantalla LWC
                helper.checkAdminAndEnrollment(component, event, helper);
                
                component.set("v.loading", true);
                let userId =  $A.get("$SObjectType.CurrentUser.Id");
                component.find("Service").callApex2(component, helper, "c.isOneTrade", {"userId" : userId}, helper.isOneTrade);
                /*helper.getIsCashNexus(component, event);
                helper.handleDoInit(component, event, helper);*/
        },

        updateCurrencies : function(component, event, helper) {
                var newValue = event.getParam('value');
                var oldValue = event.getParam('oldValue');

                if((newValue != oldValue && oldValue != undefined && oldValue != "") || oldValue == undefined){
                        helper.updateUserCurrency(component, helper);
                }
        }
})