({
    /*
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    Select a payment status
    History
    <Date>			<Author>			<Description>
	29/05/2020		Shahad Naji   		Initial version
    02/10/2020		Shahad Naji			Deselect box
    */
    selectPaymentStatus : function(component, event, helper) {        
        var clickedPaymentStatus = event.currentTarget.id;
        var paymentStatusBoxes = component.get('v.paymentStatusBoxes');
        var selectedPaymentStatusBox = component.get('v.selectedPaymentStatusBox');
        if(!$A.util.isEmpty(selectedPaymentStatusBox)){
            if(selectedPaymentStatusBox.statusName == clickedPaymentStatus){
                component.set('v.selectedPaymentStatusBox', {});
                component.set('v.resetSearch', true);
                var reloadAccounts = component.getEvent('reloadAccounts');
                reloadAccounts.setParams({
                    'reload': true
                });
                reloadAccounts.fire();
            }else{
                for(var i=0; i<paymentStatusBoxes.length; i++){
                    if(paymentStatusBoxes[i].statusName == clickedPaymentStatus){
                        component.set('v.selectedPaymentStatusBox', paymentStatusBoxes[i]);                
                    }
                } 
            }
        }else{
            for(var i=0; i<paymentStatusBoxes.length; i++){
                if(paymentStatusBoxes[i].statusName == clickedPaymentStatus){
                    component.set('v.selectedPaymentStatusBox', paymentStatusBoxes[i]);                
                }
            }		 
        }
        
    }
})