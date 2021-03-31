({
	 /*
	Author:         R. Cervino
    Company:        Deloitte
    Description:    Method to communicate the total elapsed time
    History
    <Date>			<Author>			<Description>
	27/02/2020		R. Cervino     	Initial version*/
      
   	doInit : function(component, event, helper) {
		if(component.get("v.iObject.hasForeignExchange")==true){
            component.set("v.FXLabel",'FX');
        }
	},

	    /*
	Author:         R. Cervino
    Company:        Deloitte
    Description:    Method to communicate the total elapsed time
    History
    <Date>			<Author>			<Description>
	27/02/2020		R. Cervino     	Initial version
    
	runTotalElapsed : function(component, event, helper) {
		var cmpEvent = component.getEvent("paymentDetailEvent"); 
		cmpEvent.setParams({elapsed:component.get("v.totalElapsedFinal")});
		cmpEvent.fire(); 
	}*/
})