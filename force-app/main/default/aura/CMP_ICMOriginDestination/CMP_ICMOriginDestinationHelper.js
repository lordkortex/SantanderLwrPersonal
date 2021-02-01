({
    getDummyData : function(component, event, helper) {
        var action = component.get("c.getOriginData");
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
                
                var res = response.getReturnValue();
                if(res != null && res != undefined)
                {

                    
                    //Unparse the return
                    var returnList = JSON.parse(res);
                    //Map of data
                    var dataComp = [];
                    //Countries variables
                    var listAllCountries = [];
                    
                    
                    

                    var temp;
                    for(var i = 0; i < returnList.length ; i++)
                    {
                        temp = returnList[i];
                        //Add the checked column
                        temp.checked = false;
                        temp.countryCode = temp.accountNumber.substring(0,2);
                        
                        dataComp.push({
                            key : temp.id,
                            value : temp
                        });
                        listAllCountries.push(temp.accountNumber.substring(0,2));
                    }

                    var countryList = new Set(listAllCountries);
                    var countryListName = Array.from(countryList);
                    component.set("v.countryListAux", countryListName );
                    console.log('unga unga');
                    component.find("Service").callApex2(component, helper, "c.getCountryValuesMap", {}, this.createCountryMap);
                    console.log("aaa " + component.get("v.countryFilter"));
                                       
                    
                    component.set("v.originData", dataComp);
                    
                    component.set("v.destinationData", dataComp);

                    var originValue = component.get("v.originValue");
                    
                    if(component.get("v.currentStageNumber") == 2){
                        component.set("v.destinationData", dataComp.filter(dato => dato.key != originValue.key));
                 
                    }
                    console.log('la patata mola');
                    console.log(component.get("v.originValue"));
                    
                }    
            }
        });
        $A.enqueueAction(action);    
        var originValue = component.get("v.originValue");
       
    },
    filterByCountry : function(component, event, helper) {
        var currentIdFlag = event.currentTarget.id;

        if(component.get("v.countryFilter") != null && component.get("v.countryFilter") != undefined && component.get("v.countryFilter") == currentIdFlag){
            component.set("v.countryFilter", null);

        }else{

            var setVar =  component.set("v.countryFilter",  component.get("v.countryList").filter(dato => dato.key == currentIdFlag)[0].key);

        }

    },
  
    
    CheckChanged: function(component, event, helper) {
        console.log("guillermo mola");
        const eventData = event.getParam("data");


        if(component.get("v.currentStageNumber")== 1){
            var originData = component.get("v.originData");
            
            component.set("v.originValue", eventData);
            component.set("v.destinationData", originData.filter(dato => dato.key != eventData.key));
            if(component.get("v.destinationValue") !=  null){
                if(component.get("v.originValue").key == component.get("v.destinationValue").key){
                    component.set("v.destinationValue",null);
                }
            }
            
        }else{
            var originData = component.get("v.originData");
            component.set("v.destinationValue", eventData);
        }
        


    },

    previousSteptepHelper: function(component, event, helper) {  
        var back = component.get("v.backStep");
       
        $A.enqueueAction(back);
    },
    
    nextStepHelper: function(component, event, helper) {      
        var vx = component.get("v.nextStep");

        $A.enqueueAction(vx);
    },

    
    changeStepByBar: function(component, event, helper){
     console.log('entra en changeStepByBar');
        var auxlistfor = component.get("v.countryList");

        if(component.get("v.currentStageNumber") == 1){
            if(component.get("v.countryList") != null){          
                    component.set("v.countryFilter",auxlistfor[0].key );          
            }
        }else{
            component.set("v.countryFilter",auxlistfor[1].key);
            var originValue = component.get("v.originValue");
            if(originValue != null){
               var dataComp =  component.get("v.originData");
                component.set("v.destinationData", dataComp.filter(dato => dato.key != originValue.key));
            }
        }
    }, 
    

    createCountryMap: function(component,helper,response){
        var newListcountry = [];
        var auxlistfor = component.get("v.countryListAux");
        component.set("v.countryFlagMap", response);
        var dataMap = component.get("v.countryFlagMap");
        for(var i = 0; i < auxlistfor.length ; i++){
            newListcountry.push({
                key   :  auxlistfor[i],
                label :  component.get("v.countryFlagMap")[auxlistfor[i]]
            });
          
        }

        component.set("v.countryList" , newListcountry);
   
        if(component.get("v.currentStageNumber") == 1){
            if(component.get("v.countryList") != null){
                console.log('set the first filter flag');
                console.log('End createCountryMap method');
                
                    component.set("v.countryFilter",newListcountry[0].key );    
                
            }
        }else{
            component.set("v.countryFilter",newListcountry[1].key )
        }

       
    }

})