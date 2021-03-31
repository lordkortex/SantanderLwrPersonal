({

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to refresh the pills information
    History
    <Date>			<Author>		<Description>
    21/01/2020		R. Alexander Cervino     Initial version*/

    refreshPills : function(component, event, helper) {
        try {

            //Get all the pills to show
            var entityID= component.get("v.entityID");
            var entity=component.get("v.selectedLookUpRecord");
            console.log(entity.Name);
            console.log(entity.ACC_TXT_CompanyId__c);

            var filter="";

            //Set the pills array and the filters String

            if(entityID!=null && entityID!=""){
                filter+=entityID;
            }

           /* if(entity.Name!=null && entity.Name!="" && entity.Name!=undefined && entity!={}){
                pills.push(["entity=",entity.Name]);
                filter+="&"+"entity="+entity.Name;
            }*/
            if(filter!=""){
                component.set("v.filters",filter);
            }else{
                if($A.util.hasClass(component.find("searchArea"),'hidden')==true){
                    helper.openSearch(component, event, helper);
                }
                component.set("v.filters",filter);
            }

        } catch (e) {
            // Handle error
            console.error(e);
        } 
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to open the search filters
    History
    <Date>			<Author>		<Description>
    21/01/2020		R. Alexander Cervino     Initial version*/

    openSearch : function(component, event, helper) {
        try{
            var searchArea = component.find("searchArea");
            var searchAreaTitle = component.find("searchAreaTitle");
            if(searchArea !=undefined && searchArea!=null){
                $A.util.toggleClass(searchArea,"hidden");
                $A.util.toggleClass(searchAreaTitle,"hidden");
                $A.util.toggleClass(component.find("searchIcon"),"button-search-open");
            }
        } catch (e) {
            console.log(e);
        }
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to clear all filters
    History
    <Date>			<Author>		<Description>
    21/01/2020		R. Alexander Cervino     Initial version*/

    clear : function(component, event, helper) {
        try {
            component.set("v.selectedLookUpRecord",undefined);
            component.set("v.entityID","");

            helper.filterData(component, event, helper);

        } catch (e) {
            console.log(e);
        }
    },


    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to remove a single pill
    History
    <Date>			<Author>		<Description>
    21/01/2020		R. Alexander Cervino     Initial version*/

    removePill : function(component, event, helper){
        try{
            var currentPill=event.getParam('currentPill');

            if(currentPill!= null & currentPill!="" && currentPill!=undefined){
                switch(currentPill.substring(0,currentPill.length-1)){
                    case "entityID":
                        component.set("v.entityID","");
                        break;
                    case "entity":
                        component.set("v.selectedLookUpRecord",undefined);
                        break;
                }
                
                //Refresh the pill information and filter the data
                helper.refreshPills(component, event, helper);
                helper.filterData(component, event, helper);
            }
        } catch (e) {
            console.log(e);
        }
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to apply search filters
    History
    <Date>			<Author>		<Description>
    21/01/2020		R. Alexander Cervino     Initial version*/

    apply : function(component, event, helper){
        if(component.get("v.filters")!=''){
            if(component.get("v.showTable")==false){
                helper.openSearch(component, event, helper);
            }
            helper.filterData(component, event, helper);
        }
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to  filter data
    History
    <Date>			<Author>		<Description>
    21/01/2020		R. Alexander Cervino     Initial version*/

    filterData : function(component, event, helper){
        try{
            if(component.get("v.filters")!=null && component.get("v.filters")!=undefined){
                var cmpEvent = component.getEvent("getFilter"); 
                cmpEvent.setParams({filters:component.get("v.filters")});
                cmpEvent.fire(); 
            }     
        } catch (e) {
            console.log(e);
        }    
    },
    
    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Methos to remove a single pill
    History
    <Date>			<Author>		<Description>
    24/01/2020		R. Alexander Cervino     Initial version*/

    openAddModal : function(component, event, helper) {
        component.set("v.isOpen",true); 
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    getAccoutnData
    History
    <Date>			<Author>		<Description>
    10/03/2020		R. Alexander Cervino     Initial version*/

    getAccountData : function(component, event, helper) {
        try{
        var action = component.get("c.getCompanyID");
            action.setParams({name: component.get("v.selectedLookUpRecord.Name")});
            action.setCallback(this, function(response) {
            var state = response.getState();
                if (state == "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                                console.log("Error message: " + 
                                        errors[0].message);
                                reject(response.getError()[0]);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }else if (state == "SUCCESS") {
                    component.set("v.entityID",response.getReturnValue());
                }
            
            });

            $A.enqueueAction(action);
        } catch (e) {
            console.log(e);
        }
    }
})