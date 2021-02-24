({
    // DA - 05/11/2020 - Permisos 
    doInit : function(component, event, helper){
        
        var cardInfo = component.get("v.cardInfo");
        var isOneTrade = component.get("v.isOneTrade");
        console.log("THIS IS ACCONTS:" + JSON.stringify(cardInfo, null, 4));
        
        if(isOneTrade == true) {
            var canSeeBalance = 0;
            for(var i = 0; i < cardInfo.listaCuentas.length; i++) {
                if(cardInfo.listaCuentas[i].balanceAllowed == true) {
                    canSeeBalance++;
                }
            }
            
            component.set("v.accountCount", canSeeBalance);

        } else {
            component.set("v.accountCount", component.get("v.cardInfo.accountCount"));
        }

        
    },
    
    navigateToAccounts : function(component, event, helper) {
        console.log("out");
        var aux = "GlobalPosition";
        var url="c__tabs="+component.get("v.lastUpdateSelected");
        var selection = '';

        if(component.get("v.SelectedGrouping") == $A.get("$Label.c.Country")){
            selection = '{"value":"'+component.get("v.cardInfo.countryCode")+'","name":"'+$A.get("$Label.c.Country")+'", "type":"checkbox"}';
        }else{
            selection = '{"value":"'+component.get("v.cardInfo.corporateName")+'","name":"'+$A.get("$Label.c.Corporate")+'", "type":"checkbox"}';

        }
        url+="&c__filters="+selection+"&c__consolidationCurrency="+component.get("v.selectedCurrency");
        url+="&c__accountGrouping="+component.get("v.SelectedGrouping");
        url+="&c__source="+aux;
        component.find("Service").redirect("accounts", url);
    },

    updateCurrencies : function(component,event,helper) {
       
            component.find("currency1").formatNumber(component.get('v.userPreferredNumberFormat'));
            component.find("currency2").formatNumber(component.get('v.userPreferredNumberFormat'));
        
    },

    //Display default image when the country flag is unavailable
    defaultImage : function(component, event, helper)
    {
        var profUrl = $A.get('$Resource.Flags') + '/Default.svg';
        event.target.src = profUrl;
    }
})