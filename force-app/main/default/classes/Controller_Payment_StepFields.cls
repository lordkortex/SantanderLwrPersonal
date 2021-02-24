public class Controller_Payment_StepFields {
    public static final String PRODUCT_ID_001 = System.Label.CNF_payment_productId_001; // book_to_book
   	public static final String PRODUCT_ID_002 = System.Label.CNF_payment_productId_002; // international_instant_payment
    public static final String PRODUCT_ID_003 = System.Label.CNF_payment_productId_003; // Do_and_follow
    
     /*----------------------------------------------------------------------------------
    Author:         Miguel Ángel
    Company:        Deloitte
    Description:   	Query that is used to bring the fields that will appear in the description of step 3 when the product Id is Do and Follow
    History
    <Date>			<Author>			<Description>
    04/02/2021		Miguel Ángel    	Initial version
    ----------------------------------------------------------------------------------*/
	public static ReturnValue getStepFields(String productId, WRAPPER_AccountList.AccountDetails recipientAccountData){
        ReturnValue response = null;
        Map<String, Object> value = new Map<String, Object>();
        try{
            if(String.isNotBlank(productId)){
            	if(productId.equalsIgnoreCase(PRODUCT_ID_003) && recipientAccountData != null){
               		if(String.isNotBlank(recipientAccountData.country)){
                    	value = Service_Payment_StepFields.getStepFields(productId,recipientAccountData.country);
                    }
               	}else{
               		value = Service_Payment_StepFields.getStepFields(productId);
               	}
               	if(value != null){
               		response = new ReturnValue(true, value); 
               	}
            }else{
                response = new ReturnValue(false);
            }
        }catch (Exception e) {
            System.debug('Controller_Payment_StepFields.getStepFields: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
	}
}