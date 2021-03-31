({
		    /*
	Author:         R. Cervino
    Company:        Deloitte
    Description:    Method to get card dates
    History
    <Date>			<Author>			<Description>
	27/02/2020		R. Cervino     	Initial version
    */    
    getDateTimeCard: function(component, event, helper, date,destination){
        try{
            if(date!=$A.get("$Label.c.notTraceable")){
                var action = component.get("c.getDateAndTime");
                action.setParams({dateT:date});

                action.setCallback(this, function(response) {
                    var state = response.getState();
                    if (state === "SUCCESS") {
                        var res = response.getReturnValue(); 
                        if(destination=='arrival'){
                            component.set("v.item.arrivalDate",res.substring(8,10)+"/"+res.substring(5,7)+"/"+res.substring(0,4));
                            component.set("v.item.arrivalTime",res.substring(11));
                        }else{
                            component.set("v.item.departureDate",res.substring(8,10)+"/"+res.substring(5,7)+"/"+res.substring(0,4));
                            component.set("v.item.departureTime",res.substring(11));
                        }
                    }
                    else{
                        var errors = response.getError();
                        if (errors) {
                            if (errors[0] && errors[0].message) {
                                console.log("Error message: " + 
                                            errors[0].message);
                            }
                        } else {
                            console.log("Unknown error");
                        }
                    }
                });
                $A.enqueueAction(action);
            }
        }catch(e){
            console.log("CMP_IPTDetailParent / getDummyData : " + e);
        }
      
    },

    	    /*
	Author:         R. Cervino
    Company:        Deloitte
    Description:    Method to get elapsed time
    History
    <Date>			<Author>			<Description>
	27/02/2020		R. Cervino     	Initial version
    */    
    getDateDifference: function(component, event, helper, arrival,departure){
        try{
            if(arrival!=null&& departure!=null&&arrival!=$A.get("$Label.c.notTraceable")){

                var action = component.get("c.diffDates");
                action.setParams({arrival:arrival,departure:departure});
                action.setCallback(this, function(response) {
                    var state = response.getState();
                    if (state === "SUCCESS") {
                        var res = response.getReturnValue();

                        var firstLine='';
                        firstLine+=res[2]+" m ";
                        firstLine+=res[3]+" s";                        
        
                        component.set("v.item.durationTimeSEGANDMIN",firstLine);
                        var secondLine='';

                        secondLine+=+res[0]+" "+$A.get("$Label.c.Days")+' ';
                        secondLine+=res[1]+" h";
                       
                        component.set("v.item.durationTime",secondLine);
                    }
                    else{
                        var errors = response.getError();
                        if (errors) {
                            if (errors[0] && errors[0].message) {
                                console.log("Error message: " + 
                                            errors[0].message);
                            }
                        } else {
                            console.log("Unknown error");
                        }
                    }
                });
                $A.enqueueAction(action);
            }
        }catch(e){
            console.log("CMP_IPTDetailParent / getDummyData : " + e);
        }
    }
})