({
    doInit : function(component, event, helper) {
        helper.getInformation(component, event);
    },
    
    displayCurrencies: function(component, event, helper) {
      	var changeElement_one = component.find("dropdownCurrency");
     	$A.util.toggleClass(changeElement_one, "slds-is-open");
       	$A.util.toggleClass(changeElement_one, "slds-is-close");       
      	event.stopPropagation();

    },
    selectCurrency:function(component, event, helper){
         
        ///var whichCurrency = event.currentTarget.id;
         //console.log(">>>>> " + whichCurrency);
        var aux = event.getParam("selectedValues"); 
        console.log(">>> " + aux);
     	helper.selectCurrency(component, event, aux[0]);
    },
    //This function could be deleted
    selectedStatus : function(component, event, helper){
        //helper.selectedCurrency(component, event);
        console.log("BLUR controller");
    }
})