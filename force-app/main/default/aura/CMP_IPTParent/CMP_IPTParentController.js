({
    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to get filters
    History
    <Date>			<Author>		<Description>
    17/03/2020		R. Alexander Cervino     Initial version*/

    getFilters : function(component, event, helper) {
        try{
            component.set("v.filters",event.getParam('filters'));
        } catch (e) {
            console.log(e);
        }
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Init Method
    History
    <Date>			<Author>		<Description>
    17/03/2020		R. Alexander Cervino     Initial version*/

    doInit : function(component, event, helper) {
        component.set("v.loading", true);
        try{
            helper.checkBrowser(component, event, helper);
            let userId = $A.get( "$SObjectType.CurrentUser.Id" );
            let hasTrackerAccess = window.localStorage.getItem(userId + "_hasPaymentsTrackerAccess");
            if(hasTrackerAccess != false && hasTrackerAccess != "false"){
                window.sessionStorage.setItem(userId + "_firstAccess", false);
                
                new Promise($A.getCallback(function (resolve, reject) {
                    resolve('ok');
                })).then($A.getCallback(function (value){
                    //AM - 05/11/2020 - Portugal SSO Tracker
                    return helper.getUserUETR(component,event,helper);
                })).then($A.getCallback(function (value){
                    helper.getCurrency(component,event,helper);
                    //01/04/2020 - Account Payments Tracker
                    helper.getURLParams(component,event,helper);
                })).catch(function(error) {
                    console.log("doInit error: ", error)
            	});
                
            } else {
                component.set("v.loading", false);
                // Set access denied error
                component.set("v.showNoAccessError", true);
            }
        } catch (e) {
            console.log(e);
        }
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to open the modal
    History
    <Date>			<Author>		<Description>
    17/03/2020		R. Alexander Cervino     Initial version*/

    openSearch : function(component, event, helper) {
        try{
            component.set("v.isOpen",event.getParam('openModal'));
        } catch (e) {
            console.log(e);
        }
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to get if user has terms and conditions
    History
    <Date>			<Author>		<Description>
    17/03/2020		R. Alexander Cervino     Initial version*/
    checkTerms : function(component, event, helper){
        try{
            var isChecked = event.getParam("isChecked");
            component.set("v.agreedTerms", isChecked);        
        } catch (e) {
            console.log(e);
        }
    },
    doInitAuxiliar : function(component, event, helper){
        try{
            if(component.get("v.showAccountPayment") == false){
                helper.getIsCashNexus(component, event);
                helper.getCheckboxWelcomePack(component, event);
                helper.getAccountsAndPayments(component, event, helper);
            }
        }catch(e){
            console.log(e);
        }
    },

    /*Author:       Guillermo Giral
    Company:        Deloitte
    Description:    Navigate to the accounts page
    History
    <Date>			<Author>		    <Description>
    04/04/2020		Guillermo Giral     Initial version
    */
    navigateToAccounts : function(component, event, helper){
        component.find("service").redirect("accounts", "");
    },
    
    /*Author:       Joaquin Vera
    Company:        Deloitte
    Description:    Navigate to the accounts page
    History
    <Date>			<Author>		    <Description>
    02/08/2020		Joaquin Vera     Initial version
    */
    openPaymentUETRTrack : function(component, event, helper){
        component.find("service").redirect("payment-uetr-track", "c__comesFromTracker=true");
    },
})