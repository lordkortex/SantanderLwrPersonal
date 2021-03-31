({
    /*
Author:         R. Cervino
Company:        Deloitte
Description:    Method to get date differences
History
<Date>			<Author>			<Description>
27/02/2020		R. Cervino     	Initial version
  
getDateDifference: function(component, event, helper){
    try{
        console.log("AQUIIIII");
        var item = component.get("v.iObject.stepList");
        var totalElapsed=[0,0,0,0];

        for(var i in item){

            if(item[i].arrival!=null&& item[i].departure!=null&&item[i].arrival!=$A.get("$Label.c.notTraceable")){
                var action = component.get("c.diffDates"); 
                action.setParams({arrival:item[i].arrival,departure:item[i].departure});
                action.setCallback(this, function(response) {
                    var state = response.getState();

                    if (state === "SUCCESS") {
                        var res = response.getReturnValue();

                        var hour=0;
                        var minute=0;
                        var day=0;
                        var second=0;
                        day = res[0]+totalElapsed[0];
                        hour=res[1]+totalElapsed[1];
                        minute=res[2]+totalElapsed[2];
                        second=res[3]+totalElapsed[3];

                        day = day + Math.floor(hour/24);
                        hour = hour%24 + Math.floor(minute/60);
                        minute = minute%60 + Math.floor(second/60);
                        second = second%60;

                        totalElapsed=[day,hour,minute,second];

                        if(i==item.length-1){
                            component.set("v.totalElapsedFinal",totalElapsed[0]+" "+$A.get("$Label.c.Days")+' '+totalElapsed[1]+" h "+totalElapsed[2]+" m "+totalElapsed[3]+" s");
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
        }
    }catch(e){
        console.log("CMP_IPTDetailParent / getDummyData : " + e);
    }
}*/
})