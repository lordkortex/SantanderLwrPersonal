({
    //Initialize component
    doInit : function(component, event, helper){
        helper.getCmpId(component, event);
       	helper.getCountryName(component, event);
        helper.getInformation(component, event);
        
        //DA - 23/11/2020 - Permisos
        var countryCard = component.get("v.iRegister.value");
        if(component.get("v.isOneTrade") == true) {
            var canSeeBalance = 0;
            for(var i = 0; i < countryCard.length; i++){
                if(countryCard[i].balanceAllowed == true) {
                    canSeeBalance++;
                }
            }

            canSeeBalance == 0 ? component.set("v.showCard", false) : component.set("v.showCard", true);
        } else {
            component.set("v.showCard", true);
        }
    },
    //Display default image when the country flag is unavaible
    defaultImage : function(component, event, helper){
        var profUrl = $A.get('$Resource.Flags') + '/Default.svg';
        event.target.src = profUrl;
    },
    //Show/Hide Country components
    showAction : function(component, event, helper){
        var whichOne = component.get("v.cmpId");
        var whichKey = component.get("v.iKey"); 
        helper.toggleDropdown(component, event, whichOne, whichKey);
    

    },
   updateCurrency: function(component, event, helper) {        
        helper.sumBalanceExperto(component, event);     
    },
    updateSort : function(component, event, helper){
         helper.getCmpId(component, event);
    },
    tabsChange : function(component, event, helper){
        helper.getInformation(component, event);
    },
    displayAmountOne : function(component, event, helper){
        if(component.find("bookBalance") != undefined){
             component.find("bookBalance").formatNumber(component.get('v.userPreferredNumberFormat'));
        }
    },
    displayAmountTwo : function(component, event, helper){
        if(component.find("availableBalance") != undefined){
            component.find("availableBalance").formatNumber(component.get('v.userPreferredNumberFormat'));
        }  
    }
})