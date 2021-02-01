({
    close : function(component, event, helper) {
        component.set("v.isOpen",false);
    },
    apply : function(component, event, helper) {
        helper.apply(component,event, helper);
    },
    refreshDropdowns : function(component, event, helper) {
        //01/04/2020 - Account Payments Tracker
        if(component.get("v.isAccountFilter") == false){
            if(component.get("v.isOpen")){
                if(component.get("v.selectedCurrency")==''){
                    component.set("v.selectedCurrency",$A.get("$Label.c.singleChoice"));
                }
                component.find("currencyDropdown").updateSelection([component.get("v.selectedCurrency")]);   
            }
        }
        
    },
    doInit : function(component, event, helper) {
        helper.getStatuses(component, event, helper);
        helper.getCountries(component, event, helper);
        helper.getAccounts(component, event, helper);
    },
    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to clear the filters
    History
    <Date>			<Author>		<Description>
    21/01/2020		R. Alexander Cervino     Initial version*/

    clear : function(component, event, helper) {
        helper.clear(component, event, helper);
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to refresh the pills
    History
    <Date>			<Author>		<Description>
    21/01/2020		R. Alexander Cervino     Initial version*/

    refreshPills : function(component, event, helper) {
        helper.refreshPills(component,event, helper);
    },
    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to  filter data
    History
    <Date>			<Author>		<Description>
    21/01/2020		R. Alexander Cervino     Initial version*/

    updateFilterData : function(component, event, helper){
        try{
            if(event.getParam('arguments')!=undefined){
                var value=event.getParam('arguments').value;
                var filter=event.getParam('arguments').filter;
                var doFilter=event.getParam('arguments').doFilter;

                if(filter!=''){
                    if(filter==$A.get("$Label.c.Account") && JSON.stringify(component.get("v.selectedAccounts"))!=JSON.stringify(value)){
                        component.set("v.selectedAccount",value);
                    }else if(filter==$A.get("$Label.c.currency") && JSON.stringify(component.get("v.selectedCurrency"))!=JSON.stringify(value)){
                        if(value==''){
                            component.set("v.selectedCurrency",$A.get("$Label.c.singleChoice"));

                        }else{
                            component.set("v.selectedCurrency",value);
                        }
                    }else if(filter=='settledFrom' && JSON.stringify(component.get("v.settledFrom"))!=JSON.stringify(value)){
                        component.set("v.settledFrom",value);
                    }else if(filter=='settledTo' && JSON.stringify(component.get("v.settledTo"))!=JSON.stringify(value)){
                        component.set("v.settledTo",value);
                    }

                    if(doFilter){
                        helper.filterData(component,event, helper);
                    }
                }  
            }
            
        } catch (e) {
            console.log(e);
        }    
    },
    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to  handler change of attribute
    History
    <Date>			<Author>		<Description>
    21/01/2020		R. Alexander Cervino     Initial version*/
    changeFrom : function(component, event, helper) {
        helper.validateSettled(component,event, helper);
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to  handler change of attribute
    History
    <Date>			<Author>		<Description>
    21/01/2020		R. Alexander Cervino     Initial version*/
    changeTo : function(component, event, helper) {
        helper.validateSettled(component,event, helper);
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to  handler change of attribute
    History
    <Date>			<Author>		<Description>
    21/01/2020		R. Alexander Cervino     Initial version*/

    changeAccount : function(component, event, helper) {
        helper.refreshPills(component,event, helper);
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to  handler change of attribute
    History
    <Date>			<Author>		<Description>
    21/01/2020		R. Alexander Cervino     Initial version*/
    changeCurrency : function(component, event, helper) {
        helper.refreshPills(component,event, helper);
    }
})