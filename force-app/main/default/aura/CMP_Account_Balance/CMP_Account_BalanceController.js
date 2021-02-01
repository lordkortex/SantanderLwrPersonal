({	
    doInit : function(component, event, helper) {
        //helper.getCmpId(component, event);
        console.log("ERROR --> componente obsoleto" );
    },
    
    showHideOptionsAction : function(component, event, helper) {
        var accountBalanceId = component.get('v.cmpId');
        var accountBalanceOptionsId = 'options_'+ accountBalanceId;
        var showElement = document.querySelectorAll("#"+accountBalanceOptionsId);
        showElement.forEach(function(element) {             
            element.classList.toggle("slds-is-close");
            element.classList.toggle("slds-is-open");
        });
        
    },
    
    goToSwiftTracking : function(component, event, helper) {
        helper.goToSwiftTracking(component,event, helper);      
    },
    close : function(component, event, helper){
        var accountBalanceId = component.get('v.cmpId');
        var accountBalanceOptionsId = 'options_'+ accountBalanceId;
        var showElement = document.querySelectorAll("#"+accountBalanceOptionsId);
        showElement.forEach(function(element) {             
            element.classList.toggle("slds-is-close");
            element.classList.toggle("slds-is-open");
        });
        
    }
    
})