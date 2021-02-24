({
	/*
    Author:         Adrian Muñio
    Company:        Deloitte
    Description:    Method to obtain the data filtering by the UETR code.
    History
    <Date>			<Author>		<Description>
    18/06/2019		Adrian Muñio    Initial version
    */
	getData : function(component, event, helper, codeValue) {
        try {
			var filter = codeValue;
            component.find("Service").callApex2(component, helper, "c.getUETR", {uetr: filter}, this.setData);   
         } catch (e) {
             console.log(e);
         }
    },

    /*
    Author:         Adrian Muñio
    Company:        Deloitte
    Description:    Method to set the data filtering by the UETR code.
    History
    <Date>			<Author>		<Description>
    19/06/2019		Adrian Muñio    Initial version
    */
    setData : function(component,helper, response) {
        //To refresh the component in case we already searched once.
        component.set('v.isSearched', false);
        console.log('Llega la respuesta:');
        console.log(response);
        
        if(response.includes("errors")){
            console.log("No encuentra");
            component.set("v.isIngested", false);
            
            var result = {};
            //result.uetrCode = component.get("v.searchValue");
            component.set("v.result", result);
            component.set("v.isSearched", true);
        }else{
            var testResponse = JSON.parse(response);
            testResponse.paymentId = component.get('v.searchValue');
            component.set("v.result", testResponse);
            component.set("v.noResults", false);
            component.set("v.isIngested", true);
            component.set("v.isSearched", true);
        }
        
        /*if(response != undefined && response != null){
            var testResponse = JSON.parse(response);
            testResponse.paymentId = component.get('v.searchValue');
            component.set("v.result", testResponse);
            component.set("v.noResults", false);
            component.set("v.isIngested", true);
            component.set("v.isSearched", true);
        }else{
            console.log("No encuentra");
            component.set("v.isIngested", false);
            
            var result = {};
            result.uetrCode = component.get("v.searchValue");
            component.set("v.result", result);
            component.set("v.isSearched", true);
        }*/
    }
})