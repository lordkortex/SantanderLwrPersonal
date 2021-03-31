({

    handleChange : function(component,event,helper) {
const actualCheckboxValue = event.currentTarget.value;
const actualCheckboxData = component.get("v.options").filter(dataValue => dataValue.value == actualCheckboxValue)[0];

    component.set("v.selectedObject", actualCheckboxData); 
console.log(component.get("v.selectedObject"));

},
doInit : function (component,event,helper) {
    console.log("uuuu" + component.get("v.selectedObject"));
},

previousStep: function(component, event, helper) {
    var back = component.get("v.backStep");
    $A.enqueueAction(back);
},

nextStep: function(component, event, helper) { 
  var vx = component.get("v.nextStep");
  $A.enqueueAction(vx);
},

/*changeToCurrency2: function(component, event, helper) { 
    var amount =  document.getElementById("getAmount").value; 
    console.log('patata');
    console.log(document.getElementById("getAmount").value);

    //var amount = 123456;
    var formatterOption =  
    {
        style: 'currency',
        currency: component.get("v.destinationValue.value.currency"),
        currencyDisplay: 'code',
        minimumFractionDigits: 2
      }
    
      var numberformat2 = new Intl.NumberFormat('de-DE', formatterOption);

    component.set("v.Amount",numberformat2.format(amount));

  },*/

  changeToCurrency: function(component, event, helper) { 
    // Get the reference to lighting:input component and its value
    var inputCmp = component.find("transferAmount");
    var amountInput = inputCmp.get("v.value");

    // Check if the input is correct, i.e. if there are no characters other than numbers in the string
    if(amountInput.replace(/\D/g, "") != "" || amountInput == ""){
      if(amountInput != ""){      
        // Specify the format which is going to be applied to the amount string
        var formatterOption =  
        {
            style: 'currency',
            currency: component.get("v.destinationValue.value.ObjectCurrency"),
            currencyDisplay: 'code',
            minimumFractionDigits: 2
        };
        
        // Set the format previously defined
        var numberFormat = new Intl.NumberFormat('de-DE', formatterOption);
        
        // If the amount is already formatted
        if(amountInput.split(',').length > 1){
          var amountArray = amountInput.split(',');
          component.set("v.Amount",numberFormat.format(amountArray[0]));
        } else {
          component.set("v.Amount",numberFormat.format(amountInput));
        }
      } else {
        component.set("v.Amount", "");
      }
      // Clear the error message
      inputCmp.setCustomValidity("");
    } else {
      component.set("v.Amount", "");
      // Show custom error message if the input is not an amount
      inputCmp.setCustomValidity("Please enter a valid amount");
    }
    // Show error message, if any
    inputCmp.reportValidity();
  }
})