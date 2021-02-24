({
    getData : function(component, event, helper) {
        try {
            var action = component.get("c.getFilteredData");
            action.setParams({filters: component.get("v.filters")});
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

                    //DO NOT REMOVE
                    var res = response.getReturnValue();
                    console.log(res);
                    if(res != null && res != undefined){
                        var end;
                        var parseJSON=JSON.parse(res);

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

                        $A.util.addClass(component.find("spinner"), "slds-hide");   
                    }
                }
            });
            $A.enqueueAction(action);    
        } catch (e) {
            console.log(e);
        }
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to sort the data table
    History
    <Date>			<Author>		<Description>
    19/11/2019		R. Alexander Cervino     Initial version*/

    sortBy : function(component,sortItem, helper, sortBy){
        try {
            var order=component.get(sortItem);
            if(order !='' && order != null && order !=undefined){
    
                var data = component.get("v.jsonArray");

                console.log("json");
                console.log(data);
    
    
                if(data != null && data != undefined){
                    let sort;
                    if(order=='desc'){
                        if(sortBy == 'settledAmount'){
                            sort = data.sort((a, b) => parseFloat(b.paymentDetail.paymentAmount.amount) - parseFloat(a.paymentDetail.paymentAmount.amount));
                        }else if(sortBy == 'valueDate'){
                            sort = data.sort((a, b) => new Date(helper.formatDate(b.valueDate)).getTime() - new Date(helper.formatDate(a.valueDate)).getTime());
                        }
                    }else{
                        if(sortBy == 'settledAmount'){
                            sort = data.sort((a, b) => parseFloat(a.paymentDetail.paymentAmount.amount) - parseFloat(b.paymentDetail.paymentAmount.amount));
                        }else if(sortBy == 'valueDate'){
                            sort = data.sort((a, b) => new Date(helper.formatDate(a.valueDate)).getTime() - new Date(helper.formatDate(b.valueDate)).getTime());
                        }
                    }
                    return sort;
                }
            }
        } catch(e) {
            console.error(e);
        }
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to sort the data table
    History
    <Date>			<Author>		<Description>
    19/11/2019		R. Alexander Cervino     Initial version*/

    formatDate : function(date){
        if(date!='' && date.length==10){
            var res= date.slice(6,10)+"/"+date.slice(3,5)+"/"+date.slice(0,2);
            return res;
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
    }
})