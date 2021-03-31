({

    	    /*
	Author:         R. Cervino
    Company:        Deloitte
    Description:    Init image method
    History
    <Date>			<Author>			<Description>
	27/02/2020		R. Cervino     	Initial version
    */    
    defaultImage : function(component, event, helper) {
        var profUrl = $A.get('$Resource.Flags') + '/Default.svg';
        event.target.src = profUrl;
    },

    	    /*
	Author:         R. Cervino
    Company:        Deloitte
    Description:    Init method
    History
    <Date>			<Author>			<Description>
	27/02/2020		R. Cervino     	Initial version
    */    

    doInit : function(component, event, helper) {
        
        if(component.get("v.iObject.hasForeignExchange")==true){
            component.set("v.FXLabel",'FX');
        }
        var item= component.get("v.item");
        if(item.arrival!=null && item.arrival!='' ){
			helper.getDateTimeCard(component,event,helper,item.arrival,'arrival');
		}
		
		if(item.departure!=null && item.departure!='' ){
			helper.getDateTimeCard(component,event,helper,item.departure,'destination');
        }

        if(item.arrival!=null && item.arrival!='' && item.departure!=null && item.departure!=''){
			helper.getDateDifference(component,event,helper,item.arrival,item.departure);
        }
        
    }
})