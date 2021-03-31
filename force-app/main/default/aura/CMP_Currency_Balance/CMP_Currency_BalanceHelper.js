({
    getCmpId : function(component,event) {
        var country = component.get("v.country");
        var currency = component.get("v.currency");
        country = country.replace(/\s/g,""); 
        currency = currency.replace(/\s/g,""); 
        var res = "";
        res = country.concat("_");
        res = res.concat(currency);
        component.set("v.cmpId", res);
    },

    getBookBalance : function(component,event) {
        var lst = component.get("v.receivedList");
        var sum = 0.0;
        lst.forEach(function(element) {
            sum += element.amountMainBalance;
        });
        component.set("v.bookBalance", sum);
    },
    showHideAction : function(component,event,secId) { 
        var acc = document.querySelectorAll("#"+secId); 
        acc.forEach(function(element) {             
            element.classList.toggle("slds-show");
            element.classList.toggle("slds-hide");
        });
    }
})