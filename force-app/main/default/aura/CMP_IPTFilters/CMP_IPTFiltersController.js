({
    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Init method
    History
    <Date>			<Author>		<Description>
    17/03/2020		R. Alexander Cervino     Initial version*/
    doInit : function(component, event, helper) {
        helper.getAccounts(component, event, helper);
    },
    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to download all payments shown
    History
    <Date>			<Author>		<Description>
    17/03/2020		R. Alexander Cervino     Initial version*/
    download : function(component, event, helper) {
        helper.download(component, event, helper);
    },
    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method open the modal
    History
    <Date>			<Author>		<Description>
    17/03/2020		R. Alexander Cervino     Initial version*/
    showAdvancedFilters : function(component, event, helper) {
        component.set("v.isOpen",true);
    },
    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to  filter data
    History
    <Date>			<Author>		<Description>
    21/01/2020		R. Alexander Cervino     Initial version*/
    
    filterData : function(component, event, helper){
        try{
            console.log("COUNT");
            console.log(event.getParams());
            console.log(event.getParam('filters'));
            console.log(event.getParam('count'));
            component.set("v.filters",event.getParam('filters'));
            component.set("v.count",event.getParam('count'));
            
            if(component.get("v.filters")!=null && component.get("v.filters")!=undefined){
                var cmpEvent = component.getEvent("getFilterParent");
                var filters=component.get("v.filters");
                cmpEvent.setParams({filters: filters});
                cmpEvent.fire(); 
            }     
        } catch (e) {
            console.log(e);
        }    
    }
    
    ,
    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to  filter data
    History
    <Date>			<Author>		<Description>
    21/01/2020		R. Alexander Cervino     Initial version*/
    
    updateFilterData : function(component, event, helper){
        try{
            var filter=event.getParam('filter');
            var value=event.getParam('value');
            if(filter!=''){
                if(filter=='settledFrom'){
                    if(component.get("v.settledFrom")!=value){
                        component.set("v.settledFrom",value);
                    }
                }else if(filter=='settledTo'){
                    if(component.get("v.settledTo")!=value){
                        component.set("v.settledTo",value);
                    }
                }else if(filter=='currency'){
                    if(JSON.stringify(component.get("v.currency"))!=JSON.stringify(value)){
                        component.set("v.currency",value);
                    }
                }else if(filter=='account'){
                    if(JSON.stringify(component.get("v.selectedAccounts"))!=JSON.stringify(value)){
                        component.set("v.selectedAccounts",value);
                    }
                }
            }  
        } catch (e) {
            console.log(e);
        }    
    },
    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to  filter data
    History
    <Date>			<Author>		<Description>
    21/01/2020		R. Alexander Cervino     Initial version*/
    
    updateFiltering : function(component, event, helper){
        var filter=event.getParam('filter');
        var value=event.getParam('value');
        
        component.find("advancedFilter").updateFilterDropdown(filter,value,true);
        
    },
    
    /*Author:       Joaquin Vera
    Company:        Deloitte
    Description:    Method to  filter data
    History
    <Date>			<Author>		<Description>
    07/10/2020		Joaquin Vera     Initial version*/
    updatePaymentsType : function ( component,event,helper)
    {
        var originalFilter = JSON.parse(component.get("v.filters"));
        
        var newFilters = {searchData : {}};
        if((event.currentTarget.id == "inPayments" && component.get("v.selectedPaymentType") != "IN") || event.currentTarget.id == "outPayments" && component.get("v.selectedPaymentType") != "OUT")
        {
            var auxOriginator = originalFilter.searchData.originatorAccountList;
            var auxBeneficiary = originalFilter.searchData.beneficiaryAccountList;
            originalFilter.searchData.originatorAccountList = auxBeneficiary;
            originalFilter.searchData.beneficiaryAccountList = auxOriginator;
            
            if(event.currentTarget.id == "inPayments")
            {
                component.set("v.selectedPaymentType", "IN");
                originalFilter.searchData.inOutIndicator = "IN";
                
            }
            else if (event.currentTarget.id == "outPayments")
            {
                component.set("v.selectedPaymentType", "OUT");
                originalFilter.searchData.inOutIndicator = "OUT";
            }
            
            component.set("v.filters", JSON.stringify(originalFilter));
        }
        //IF IS IN PAYMENTS
        console.log('[IPTFiltersController.updatePaymentsType]');
        console.log(JSON.stringify(originalFilter));
    }
})