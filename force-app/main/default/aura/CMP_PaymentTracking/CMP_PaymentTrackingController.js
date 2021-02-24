({
	  /*
	Author:         R. Cervino
    Company:        Deloitte
    Description:    Method to communicate the total elapsed time
    History
    <Date>			<Author>			<Description>
	27/02/2020		R. Cervino     	Initial version
    */    
	runTotalElapsed : function(component, event, helper) {
        console.log("afosbfo "+component.get("v.totalElapsedFinal"));
		var cmpEvent = component.getEvent("paymentDetailEvent"); 
		cmpEvent.setParams({elapsed:component.get("v.totalElapsedFinal")});
		cmpEvent.fire(); 
	},
	 /*
	Author:         R. Cervino
    Company:        Deloitte
    Description:    Method to communicate the total elapsed time
    History
    <Date>			<Author>			<Description>
	27/02/2020		R. Cervino     	Initial version
    */    
   getDateDifference : function(component, event, helper) {
	helper.getDateDifference(component, event, helper);
	},

     defaultImage : function(component, event, helper){
        var profUrl = $A.get('$Resource.Flags') + '/Default.svg';
        event.target.src = profUrl;
    }
})