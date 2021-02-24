({
    
        previousStep : function (component,event,helper) {
            var back = component.get("v.backStep");
        $A.enqueueAction(back);
        },

        handleInit : function (component,event,helper) {
            var amount = component.get("v.Amount");
            amount = parseFloat(amount.split(".").join(""));
            //amount = parseFloat(amount);
            console.log('aaa ' + amount);
            
            const comission = parseFloat(component.get("v.Commission"));
            console.log('commisssion' + comission);

            var total = comission + amount;
            var chargeAmountDestination = total;
            console.log('atun con pan ' + chargeAmountDestination);
            var chargeAmountOrigin; 
            
            if (component.get("v.OriginAccount.value.ObjectCurrency") == "EUR" && component.get("v.DestinationAccount.value.ObjectCurrency") == "GBP"){
                total = parseFloat(total*(59/50)).toFixed(2);
                chargeAmountOrigin = total;
           
            } else if (component.get("v.OriginAccount.value.ObjectCurrency") == "GBP" && component.get("v.DestinationAccount.value.ObjectCurrency") == "EUR"){
                total = parseFloat(total*(21/25)).toFixed(2) ;
                chargeAmountOrigin = total;
            }
            chargeAmountOrigin = chargeAmountOrigin.toString().replace(",", ".");
            console.log('papa asada ' + chargeAmountOrigin);
            chargeAmountDestination = chargeAmountOrigin.toString().replace(",", ".");
            console.log('papa arruga ' + chargeAmountDestination);
            total = total.toString().replace(".",",");
            total = total.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
			
 			// TODO REPLACE
            console.log('total' + total);
            component.set("v.Charge", total);
            
            var originAcc = component.get("v.OriginAccount");
            var destinationAcc = component.get("v.DestinationAccount");
            
            originAcc.value.value = chargeAmountOrigin;
            destinationAcc.value.value = chargeAmountDestination;
            
            component.set("v.OriginAccount" , originAcc);
            component.set("v.DestinationAccount" , destinationAcc);
        },

        sendToMuleSofthelper : function (component,event,helper) {
            var dataMapMuleSoft = new Map();
            dataMapMuleSoft["originData"] = component.get("v.OriginAccount").value;
            dataMapMuleSoft["destinationData"] = component.get("v.DestinationAccount").value;    
            
           /* dataMapMuleSoft.set("originData",component.get("v.OriginAccount"));
            dataMapMuleSoft.set("destinationData",component.get("v.DestinationAccount"));*/
       
            
           /*
            var dataMapMuleSoft =[
                {String: "originData", object: component.get("v.OriginAccount") },
                {String: "destinationData", object: component.get("v.DestinationAccount") }
            ];
*/
            console.log(dataMapMuleSoft);

            component.find("Service").callApex(component, "c.sendPayment", {'data':dataMapMuleSoft}, this.showToast);

        },


        showToast : function(component, response) {
            console.log(response);
            if(response){
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Success!",
                    "message": "The call has been executed successfully."
                });
                toastEvent.fire();
            } else{
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "ERROR!",
                    "message": "The call has been failed."
                });
                toastEvent.fire();
            }
           
        }
            
    
})