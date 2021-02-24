({
    getData : function(component, event, helper, filters) {
        try {
            var action = component.get("c.getFilteredData");
        
            action.setParams({pain:true,filters: filters});
            action.setCallback(this, function(response) {
            var state = response.getState();
                if (state == "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                                console.log("Error message: " + 
                                        errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }else if (state == "SUCCESS") {

                    component.set("v.jsonArray",[]);
                    console.log("entro1");
                    var res = response.getReturnValue();
                    console.log(res.length);

                    if(res != null && res != undefined && res!='""' && res.length>0){
                        console.log("pdiaodb");
                        var end;
                        var parseJSON=JSON.parse(res).accountPain002List;
                        component.set("v.jsonArray",parseJSON);

                        if(parseJSON.length<component.get("v.paymentsPerPage")){
                            end=parseJSON.length;
                        }else{
                            end=component.get("v.paymentsPerPage");
                        }

                        component.set("v.end",end);

                        var paginatedValues=[];

                        for(var i= component.get("v.start");i<=component.get("v.end");i++){
                            paginatedValues.push(parseJSON[i]);
                        }

                        component.set("v.paginatedPayments",paginatedValues);

                        var toDisplay=[];
                        var finish=parseJSON.length;

                        if(parseJSON.length>1000){
                            //Max payments to retrieve
                            finish=1000;
                        }

                        for(var i= 0;i<finish;i++){
                            toDisplay.push(parseJSON[i]);
                        }
                        component.find("pagination").initPagination(toDisplay);
                    }
                }
                console.log("xxx");
                $A.util.addClass(component.find("spinner"), "slds-hide");   
            });
            $A.enqueueAction(action);    
        } catch (e) {
            console.log(e);
        }
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to display the sorted/filtered/paginated data values
    History
    <Date>			<Author>		<Description>
    19/11/2019		R. Alexander Cervino     Initial version*/

    buildData : function(component, event, helper){

        try {
            var json = component.get("v.jsonArray");
            var currentPage=event.getParam("currentPage");
            var oldPage=component.get("v.oldPage");
            var perPage=component.get("v.paymentsPerPage");
            var end = component.get("v.end");
            var start = component.get("v.start");

            if (currentPage != null && currentPage != undefined && currentPage != '' && oldPage!=currentPage){
                //Update the index of dataset to display
                if(currentPage >oldPage && currentPage!=1){
                    component.set("v.start",perPage*currentPage-perPage);
                    if(Math.ceil(json.length/currentPage) >= perPage){
                        component.set("v.end",perPage*currentPage);
                    }else{
                        component.set("v.end",json.length);
                    }
                }else{
                    component.set("v.end",start);
                    if(currentPage==1){ 
                        component.set("v.start",0);
                        component.set("v.end",perPage);

                    }else{
                        component.set("v.start",start-perPage);
                    }
                }
                component.set("v.oldPage",currentPage);

                //Update a set of the paginated data
                var paginatedValues=[];
                for(var i= component.get("v.start");i<=component.get("v.end");i++){
                    paginatedValues.push(json[i]);
                }

                component.set("v.paginatedPayments",paginatedValues);
            }
        } catch(e) {
            console.error(e);
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
    Description:    Get data (filtered or not)
    History
    <Date>			<Author>		<Description>
    11/12/2019		R. Alexander Cervino     Initial version*/

    update : function(component, event, helper) {
        try{
            $A.util.removeClass(component.find("spinner"), "slds-hide");   
            var filters=component.get("v.filters");
            //component.set("v.filters", filters);
            helper.getData(component, event, helper,filters);

            component.set("v.currentPage",1);
            component.find("pagination").buildData(component.get("v.currentPage")); 
        } catch (e) {
            console.log(e);
        }

    }
})