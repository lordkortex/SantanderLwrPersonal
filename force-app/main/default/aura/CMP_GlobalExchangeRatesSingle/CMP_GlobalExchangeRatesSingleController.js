({
doInit : function(component, event, helper){
    
    var exchanges = component.get("v.exchangeRates");
    
    if(exchanges != undefined && exchanges != []){
        for( var i in exchanges){
            console.log(exchanges[i].value);
            let str = exchanges[i].value.toString();
            if(str.includes(".")){
                let res = str.split(".");
                if(res.length == 2){
                    if(res[1].length < 8){
                        exchanges[i].value = exchanges[i].value.toFixed(8);
                    }
                }
                
            }
            //AM - 28/10/2020 - FIX INC726
            if(str == "1"){
                var userId = $A.get( "$SObjectType.CurrentUser.Id" );
                window.localStorage.setItem(userId + "_actualCurrencyChange",  exchanges[i].divisa);
            }
        }
        
        //component.find('sigleRate').formatNumber();
    }
    
}
})