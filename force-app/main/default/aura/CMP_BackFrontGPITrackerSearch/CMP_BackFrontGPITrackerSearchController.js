({
    doInit : function(component, event, helper) {
        helper.getCountries(component, event, helper);
        //helper.getAccounts(component, event, helper);
        helper.getCurrency(component,event,helper);
        helper.getStatuses(component,event, helper);
        helper.getUserData(component, event, helper);

        var options = [{"label": $A.get("$Label.c.Emitidos"), "value": 'OUT'}, {"label": $A.get("$Label.c.Recibidos"), "value": 'IN'}];
        component.set("v.typeValue", 'OUT');
        component.set("v.options", options);
        helper.refreshPills(component, event, helper);
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to get the selected status
    History
    <Date>			<Author>		<Description>
    11/12/2019		R. Alexander Cervino     Initial version*/

    selectedStatus : function(component, event, helper) {
        helper.selectedStatus(component, event, helper);
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to get the selected currency
    History
    <Date>			<Author>		<Description>
    11/12/2019		R. Alexander Cervino     Initial version*/

    selectedCurrency : function(component, event, helper) {
        helper.selectedCurrency(component, event, helper);
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to get the selected Country
    History
    <Date>			<Author>		<Description>
    11/12/2019		R. Alexander Cervino     Initial version*/

    selectedCountry : function(component, event, helper) {
        helper.selectedCountry(component, event, helper);
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to clear the filters
    History
    <Date>			<Author>		<Description>
    11/12/2019		R. Alexander Cervino     Initial version*/

    clear : function(component, event, helper) {
        helper.clear(component, event, helper);
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to apply the filters
    History
    <Date>			<Author>		<Description>
    11/12/2019		R. Alexander Cervino     Initial version*/

    apply : function(component, event, helper) {
        helper.apply(component,event, helper);
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to refresh the pills
    History
    <Date>			<Author>		<Description>
    11/12/2019		R. Alexander Cervino     Initial version*/

    refreshPills : function(component, event, helper) {
        helper.refreshPills(component,event, helper);
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to open the search filters
    History
    <Date>			<Author>		<Description>
    11/12/2019		R. Alexander Cervino     Initial version*/

    openSearch : function(component, event, helper) {
        helper.openSearch(component, event, helper);
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to validate the dates
    History
    <Date>			<Author>		<Description>
    11/12/2019		R. Alexander Cervino     Initial version*/

    validateDate : function(component, event, helper) {    
        helper.validateDate(component, event, helper);
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Methos to remove a single pill
    History
    <Date>			<Author>		<Description>
    11/12/2019		R. Alexander Cervino     Initial version*/

    removePill : function(component, event, helper) {
        helper.removePill(component, event, helper);
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to validate the settled amounts
    History
    <Date>			<Author>		<Description>
    11/12/2019		R. Alexander Cervino     Initial version*/

    validateSettled : function(component, event, helper) {
        helper.validateSettled(component, event, helper);
    },
    
    
    /*Author:       A. Duarte Rausell
    Company:        Deloitte
    Description:    Method to search the payment based on the UETR
    History
    <Date>			<Author>				<Description>
    10/07/2020		A. Duarte Rausell     	Initial version*/
    
    searchUETR : function(component, event, helper) {
        let inputValue = component.get("v.selectedUERT");
        var valid;
        if(inputValue == undefined || inputValue == null || inputValue == ''){
            $A.util.addClass(component.find("uetrError"),'slds-hide');
            valid = false;
        }else{
            inputValue = inputValue.toLowerCase();
            console.log("inputValue: "+inputValue);
            let re = "^([a-f0-9]{8})-([a-f0-9]{4})-4([a-f0-9]{3})-([89ab])([a-f0-9]{3})-([a-f0-9]{12})$";
            let found = inputValue.match(re);
            if(inputValue.length!=36 || found==null){
                valid = false;
                $A.util.removeClass(component.find("uetrError"),'slds-hide');
            }else{
                valid = true;
                $A.util.addClass(component.find("uetrError"),'slds-hide');
            }
        }

        if (valid && !$A.util.isEmpty(inputValue)) {
            try{
                helper.searchUETR(component, event, helper, inputValue);
            } catch (e) {
                console.log(e);
            }
        }
    },
    
    
    /*Author:       A. Duarte Rausell
    Company:        Deloitte
    Description:    Method to set the type filter value based on the radio button selected
    History
    <Date>			<Author>				<Description>
    06/08/2020		A. Duarte Rausell     	Initial version*/
    
    onTypeSelected : function(component, event, helper) {
        //var selectedType = event.getSource().get("v.label");
        var selectedType = event.getParam("value");
        component.set("v.typeValue", selectedType);
        console.log(component.get("v.typeValue"));
        
        helper.clear(component, event, helper);
        helper.removePill(component, event, helper);
        helper.refreshPills(component, event, helper);
	}
})