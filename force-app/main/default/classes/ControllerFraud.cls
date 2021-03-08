/*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:   	

Test Class:     TBD
History
<Date>			<Author>		<Description>
14/12/2020		Shahad Naji     Initial version
----------------------------------------------------------------------------------*/
public class ControllerFraud {
    
    public static final String PRODUCT_ID_001 = System.Label.CNF_payment_productId_001; //book_to_book
    public static final String PRODUCT_ID_002 = System.Label.CNF_payment_productId_002;//international_instant_payment
    public static final String PRODUCT_ID_003 = System.Label.CNF_payment_productId_003; //do_and_follow
    
    public static final String MULTI_ONE_TRADE = System.Label.PAY_ServiceAPILine_001; //'MULTI_ONE_TRADE';
    public static final String NEXUS = System.Label.PAY_ServiceAPILine_002;//'NEXUS';
    public static final String LOCAL_BANKING = System.Label.PAY_ServiceAPILine_003;//'LOCAL_BANKING';
    
	
    public static ReturnValue postFraud(WrapperUserData userData, Map<String, String> stepData, Map<String, String> navigatorInfo, String paymentId, String productId, String serviceId, WRAPPER_AccountList.AccountDetails sourceAccount, WRAPPER_AccountList.AccountDetails destinationAccount, WRAPPER_B2B_Data.PaymentAmount amountData, String amountEnteredFrom){
        ReturnValue returnValue;
        Map<String, Object> value = new Map<String, Object>();
        try {
            if(userData == null){
                userData = ServiceUserData.getUserData();
            }
            if(userData != null){
                String serviceAPILine = ServiceAPILine.getAPILine(userData);
                if(productId.equalsIgnoreCase(PRODUCT_ID_001) && (serviceAPILine.equalsIgnoreCase(MULTI_ONE_TRADE) || serviceAPILine.equalsIgnoreCase(NEXUS))){
                    returnValue = new ReturnValue(true);
                }else if(productId.equalsIgnoreCase(PRODUCT_ID_002) && (serviceAPILine.equalsIgnoreCase(LOCAL_BANKING))){
                    WS_Fraud.OUTPUT output = ServiceFraud.executeFraud(stepData, navigatorInfo, paymentId, sourceAccount, destinationAccount, amountData,  amountEnteredFrom);                    
                    if(output != null){
                        value.put('output', output);
                        returnValue = new ReturnValue(true, value);
                    }else{
                        returnValue = new ReturnValue(false); 
                    }
                }else{
                  	returnValue = new ReturnValue(true);
                }
                
            }else{
                throw new CustomException('userData is not informed.');
            }
        } catch (Exception e) {
            System.debug('ControllerFraud.postFraud: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            returnValue = null;
        } 
        return returnValue;
    }

    /*
    Author:         Shahad Naji
    Company:        Deloitte
    Description:
    History:
    <Date>          <Author>            <Description>
    14/12/2020      Shahad Naji         Initial version
    01/02/2021      Candido             Refactor with WRAPPER_PAY_PaymentDraft
    */
    public static ReturnValue postFraud (WrapperuserData userData, Map<String, String> navigatorInfo, WRAPPER_PAY_PaymentDraft paymentDraft) {
        ReturnValue returnValue;
        Map<String, Object> value = new Map<String, Object>();
        try {
            if (userData == null) {
                userData = ServiceUserData.getUserData();
            }
            if (userData != null) {
                String serviceAPILine = ServiceAPILine.getAPILine(userData);
                if (paymentDraft.productId.equalsIgnoreCase(PRODUCT_ID_001) && (serviceAPILine.equalsIgnoreCase(MULTI_ONE_TRADE) || serviceAPILine.equalsIgnoreCase(NEXUS))) {
                    returnValue = new ReturnValue(true);
                } else if((paymentDraft.productId.equalsIgnoreCase(PRODUCT_ID_002) || paymentDraft.productId.equalsIgnoreCase(PRODUCT_ID_003))&& (serviceAPILine.equalsIgnoreCase(LOCAL_BANKING))) {
                    WS_Fraud.OUTPUT output = ServiceFraud.executeFraud(navigatorInfo, paymentDraft);
                    if (output != null) {
                        value.put('output', output);
                        returnValue = new ReturnValue(true, value);
                    } else {
                        returnValue = new ReturnValue(false);
                    }
                } else {
                  	returnValue = new ReturnValue(true);
                }
            } else {
                throw new CustomException('userData is not informed.');
            }
        } catch (Exception e) {
            System.debug('ControllerFraud.postFraud: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            returnValue = null;
        }
        return returnValue;
    }


   
}