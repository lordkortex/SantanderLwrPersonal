({
    doInit: function (component, event ,helper) {
        helper.checkTypeAvailable(component, helper);
    },

    goToBooktoBook: function (component, event, helper) {
        component.set('v.spinner', true);
        const transferTypeParams = component.get('v.transferTypeParams');
        const instant_transfer = $A.get("$Label.c.PTT_instant_transfer");
        if(!$A.util.isEmpty(transferTypeParams.instant_transfer)){
            helper.getAccountsToB2BOrigin(component, helper, component.get('v.userData'), instant_transfer)
            .then($A.getCallback(function (value) {
                return helper.handleAccountsToB2BOrigin(component, helper, value);
            })).then($A.getCallback(function (value) { 
                return helper.goToURL(component, helper, transferTypeParams.instant_transfer, true);
            })).catch($A.getCallback(function (error) {
                component.set('v.spinner', false);
                console.log(error);
                helper.showToast(component, event, helper, $A.get('$Label.c.B2B_no_Origin_Accounts'), null, true, 'error');
               /* if (error.title != undefined) {
                    helper.showToast(component, event, helper, error.title, error.body, error.noReload, 'error');
                } else {
                    helper.showToast(component, event, helper, $A.get('$Label.c.B2B_no_Origin_Accounts'), true, 'error');
                }*/
            }));
        }else{
            component.set('v.spinner', false);
            component.set('v.showToast', true);
        }   
       
    },

    
   /* goToBooktoBook: function (component, event, helper) {
        const transferTypeParams = component.get('v.transferTypeParams');
        if (!$A.util.isEmpty(transferTypeParams.instant_transfer)) {
            helper.goToURL(component, helper, transferTypeParams.instant_transfer, true);
    
        } else {
            component.set('v.showToast', true);
        }
    },*/
    
    

    goToSingleDomestic: function (component, event, helper) {
        const transferTypeParams = component.get('v.transferTypeParams');
        if (!$A.util.isEmpty(transferTypeParams.domestic_transfer_single)) {
            helper.goToURL(component, helper, transferTypeParams.domestic_transfer_single, true);
        } else {
            component.set('v.showToast', true);
        }
    },
    

    goToMultipleDomestic: function(component, event, helper) {
        const transferTypeParams = component.get('v.transferTypeParams');
        if (!$A.util.isEmpty(transferTypeParams.domestic_transfer_multiple)) {
            helper.goToURL(component, helper, transferTypeParams.domestic_transfer_multiple, false);
        } else {
            component.set('v.showToast', true);
        }
    },

    goToSingleInternational: function (component, event, helper) {
        component.set('v.spinner', true);
        const transferTypeParams = component.get('v.transferTypeParams');
        const international_transfer_single = $A.get("$Label.c.PTT_international_transfer_single");
        if(!$A.util.isEmpty(transferTypeParams.international_transfer_single)){
            helper.getAccountsToB2BOrigin(component, helper, component.get('v.userData'), international_transfer_single).then($A.getCallback(function (value) {
                return helper.handleAccountsToB2BOrigin(component, helper, value);
            })).then($A.getCallback(function (value) { 
                return helper.goToURL(component, helper, transferTypeParams.international_transfer_single, true);
            })).catch($A.getCallback(function (error) {
                component.set('v.spinner', false);
                console.log(error);
                helper.showToast(component, event, helper, $A.get('$Label.c.B2B_no_Origin_Accounts'), null, true, 'error');
              /*  if (error.title != undefined) {
                    helper.showToast(component, event, helper, error.title, error.body, error.noReload, 'error');
                } else {
                    helper.showToast(component, event, helper, $A.get('$Label.c.B2B_no_Origin_Accounts'), true, 'error');
                }*/
            }));
        }else{
            component.set('v.spinner', false);
            component.set('v.showToast', true);
        }  
        
      
      /*
        const transferTypeParams = component.get('v.transferTypeParams');
        if (!$A.util.isEmpty(transferTypeParams.international_transfer_single)) {
            helper.goToURL(component, helper, transferTypeParams.international_transfer_single, true);
        } else {
            component.set('v.showToast', true);
        }*/
    },

    goToMultipleInternational: function(component, event, helper) {
        component.set('v.spinner', true);
        const transferTypeParams = component.get('v.transferTypeParams');
        const international_transfer_multiple = $A.get("$Label.c.PTT_international_transfer_multiple");
        if (!$A.util.isEmpty(transferTypeParams.international_transfer_multiple)) {
            helper.goToURL(component, helper, transferTypeParams.international_transfer_multiple, false);
        } else {
            component.set('v.spinner', false);
            component.set('v.showToast', true);
        }
       
    }
})