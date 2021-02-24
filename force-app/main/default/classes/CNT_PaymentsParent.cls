/*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Apex class for CMP_PaymentsParent component
Test Class:     CNT_PaymentsParent_Test
History
<Date>          <Author>        <Description>
15/07/2020      Shahad Naji     Initial version
----------------------------------------------------------------------------------*/
public class CNT_PaymentsParent {
    
        /*----------------------------------------------------------------------------------
Author:         Shahad Naji 
Company:        Deloitte
Description:    Method to return current user information
History
<Date>          <Author>             <Description>
15/07/2020      Shahad Naji        Initial version
----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static ReturnValue getCurrentUserInfo(){
        ReturnValue response = ServiceUserData.getControllerUserData ();
        user u = [select id, profile.name, USER_country__c from user where id =: Userinfo.getUserId() limit 1 ];        
        return response;
    }
    
    @AuraEnabled
    public static Map<String, String> getAccountTypes(){
        return CNT_Payments.getAccountTypes();
    }
    
    
    
    @AuraEnabled
    public static List<WRAPPER_PaymentList.WRAPPER_Currency> getCurrencyList(){
        return CNT_Payments.getCurrencyList();
    }
    
    @AuraEnabled
    public static List<WRAPPER_PaymentList.WRAPPER_Status> getStatusList(){
        return CNT_Payments.getStatusList(false, true);
    }
    
    
    
    @AuraEnabled
    public static List<WRAPPER_PaymentList.WRAPPER_PaymentMethod> getPaymentMethodList(){
        return CNT_Payments.getPaymentMethodList();
    }
    
    
    
    @AuraEnabled
    public static List<WRAPPER_PaymentList.WRAPPER_Country> getCountryList(){
        return CNT_Payments.getCountryList();
    }
    
    @AuraEnabled
    public static List<Payment_Status_List__mdt> getPaymentStatusReasonList(){
        return CNT_Payments.getPaymentStatusReasonList();
    }
    
    
    
    /*----------------------------------------------------------------------------------
Author:         Shahad Naji 
Company:        Deloitte
Description:    Method to return payments based on search criteria
History
<Date>          <Author>             <Description>
27/07/2020      Shahad Naji        Initial version
27/08/2020      Bea Hill            Include additional search parameters
----------------------------------------------------------------------------------*/ 
    @AuraEnabled
    public static ReturnValue searchPaymentsInformation(String globalUserId,Boolean pendingAuthorization, 
                                                        List<WS_OperationsList.SourceAccountList> sourceAccountList, String destinationCountry, 
                                                        Decimal amountFrom, Decimal amountTo, List<WS_OperationsList.CurrencyList> currencyList, String paymentMethod, String clientReference, String valueDateFrom, String valueDateTo, 
                                                        Boolean latestOperationsFlag, List<WS_OperationsList.StatusList> statusList,
                                                        WS_OperationsList.SourceData sourceData, String operationGlobalId, WS_OperationsList.DestinationData destinationData){
                                                            return searchPaymentsInformation(globalUserId, pendingAuthorization, sourceAccountList, destinationCountry, amountFrom, amountTo, currencyList, paymentMethod, clientReference, valueDateFrom, valueDateTo, latestOperationsFlag, statusList, sourceData,operationGlobalId, destinationData, null);
                                                        }
    @AuraEnabled
    public static ReturnValue searchPaymentsInformation(String globalUserId,Boolean pendingAuthorization, 
                                                        List<WS_OperationsList.SourceAccountList> sourceAccountList, String destinationCountry, 
                                                        Decimal amountFrom, Decimal amountTo, List<WS_OperationsList.CurrencyList> currencyList,
                                                        String paymentMethod, String clientReference, String valueDateFrom, String valueDateTo, 
                                                        Boolean latestOperationsFlag, List<WS_OperationsList.StatusList> statusList,
                                                        WS_OperationsList.SourceData sourceData, String operationGlobalId, WS_OperationsList.DestinationData destinationData, String productId){
                                                            ReturnValue  rv = null;
                                                            String getMockData = System.Label.GET_MOCK_DATA;
                                                            try {
                                                                
                                                                Map<String, Object> value = new Map<String, Object>();
                                                                WRAPPER_PaymentList response = new WRAPPER_PaymentList();
                                                                
                                                                if(getMockData == 'True'){
                                                                    
                                                                    response = CNT_Payments.getTestPaymentsInformation(true);
                                                                    value.put('output', response);
                                                                }
                                                                else{
                                                                    if(sourceAccountList == null){
                                                                        sourceAccountList = null;
                                                                    }else if (sourceAccountList.size() == 0){
                                                                        sourceAccountList = null;
                                                                    }else{
                                                                        system.debug('>>> SNJ an account has been already selected by end user to filter by'); 
                                                                    }
                                                                    
                                                                    if(currencyList.size() == 0){
                                                                        currencyList = null;
                                                                    }
                                                                    if(statusList.size() == 0){
                                                                        statusList = null;
                                                                    }
                                                                    if(sourceData == null){
                                                                        sourceData = null;
                                                                    }
                                                                    if(destinationData == null){
                                                                        destinationData = null;
                                                                    }


                                                                    System.debug('sourceData: ' + sourceData);
                                                                    WS_OperationsList ws_operationsList = new WS_OperationsList();   
                                                                    
                                                                    // WRAPPER_OperationsList output = ws_operationsList.execute(globalUserId, pendingAuthorization, latestOperationsFlag, sourceAccountList,destinationCountry, statusList, amountFrom, amountTo, currencyList, paymentMethod, clientReference, valueDateFrom, valueDateTo, null, null, null);
                                                                    //BH 28082020 con los parametros adicionales pendiente de cambio de API
                                                                    WRAPPER_OperationsList output = ws_operationsList.execute(globalUserId,
                                                                     pendingAuthorization, latestOperationsFlag, sourceAccountList,destinationCountry,
                                                                      statusList, amountFrom, amountTo, currencyList, paymentMethod, clientReference,
                                                                       valueDateFrom, valueDateTo, 
                                                                       sourceData, operationGlobalId, destinationData, productId);

                                                                    if(output != null){
                                                                        if(output.operationsList != null){
                                                                            if(output.operationsList.size() > 0){
                                                                                
                                                                                List<WRAPPER_OperationsList.OperationsList> auxiliarList = output.operationsList;
                                                                                List<WRAPPER_PaymentList.WRAPPER_Payment> paymentsList = new List<WRAPPER_PaymentList.WRAPPER_Payment>();
                                                                               	Map <String, String> statusMap = CNT_Payments.getPaymentStatusMap();
                                                                                
                                                                                for(WRAPPER_OperationsList.OperationsList item : auxiliarList){  
                                                                                    WRAPPER_PaymentList.WRAPPER_Payment payment = new WRAPPER_PaymentList.WRAPPER_Payment();
                                                                                    
                                                                                    if(item.operationDetail != null){
                                                                                        payment.paymentId = item.operationDetail.operationGlobalId != null ? item.operationDetail.operationGlobalId : null;
                                                                                        payment.clientReference = item.operationDetail.clientReference != null ? item.operationDetail.clientReference : '';
                                                                                        payment.userGlobalId = item.operationDetail.globalUserId != null ? item.operationDetail.globalUserId : '';
                                                                                        
                                                                                        if(item.operationDetail.operationStatus != null){
                                                                                            if(item.operationDetail.operationStatus.status != null){
                                                                                                 payment.paymentStatus = item.operationDetail.operationStatus.status;
                                                                                                if(statusMap.containsKey(item.operationDetail.operationStatus.status)){
                                                                                                    payment.parsedPaymentStatus = statusMap.get(item.operationDetail.operationStatus.status);
                                                                                                }else{
                                                                                                     payment.parsedPaymentStatus = '';
                                                                                                }
                                                                                                
                                                                                            }else{
                                                                                                payment.paymentStatus = '';
                                                                                                payment.parsedPaymentStatus = '';
                                                                                            }
                                                                                                                              
                                                                                            payment.paymentReason = item.operationDetail.operationStatus.reason != null ? item.operationDetail.operationStatus.reason : '' ;                                      
                                                                                            
                                                                                        }
                                                                                        
                                                                                        
                                                                                        if(item.operationDetail.operationAmount != null){
                                                                                            payment.amount = item.operationDetail.operationAmount.amount != null ? item.operationDetail.operationAmount.amount.setScale(2) : 0;
                                                                                            payment.paymentCurrency = item.operationDetail.operationAmount.tcurrency != null ? item.operationDetail.operationAmount.tcurrency : '';                                    
                                                                                        }
                                                                                        
                                                                                        if(item.operationDetail.sourceData != null){
                                                                                            payment.sourceAlias = item.operationDetail.sourceData.name != null ? item.operationDetail.sourceData.name : '';
                                                                                            if(item.operationDetail.sourceData.sourceAccount != null){
                                                                                                payment.sourceAccount =  item.operationDetail.sourceData.sourceAccount.accountId != null ? item.operationDetail.sourceData.sourceAccount.accountId : '';
                                                                                            }
                                                                                            if(item.operationDetail.sourceData.sourceAgent != null){
                                                                                                payment.sourceBank =  item.operationDetail.sourceData.sourceAgent.name != null ? item.operationDetail.sourceData.sourceAgent.name : '';
                                                                                            }
                                                                                        }
                                                                                        
                                                                                        if(item.operationDetail.destinationData != null){
                                                                                            payment.beneficiaryAlias = item.operationDetail.destinationData.destinationName != null ? item.operationDetail.destinationData.destinationName : '';
                                                                                            if(item.operationDetail.destinationData.destinationAccount != null){
                                                                                                payment.beneficiaryAccount =  item.operationDetail.destinationData.destinationAccount.accountId != null ? item.operationDetail.destinationData.destinationAccount.accountId : '';
                                                                                            }
                                                                                            if(item.operationDetail.destinationData.destinationAgent != null){
                                                                                                payment.beneficiaryBank =  item.operationDetail.destinationData.destinationAgent.name != null ? item.operationDetail.destinationData.destinationAgent.name : '';
                                                                                            }
                                                                                        }
                                                                                        
                                                                                        if(item.operationDetail.valueDate != null){
                                                                                            payment.valueDate = Date.valueOf(item.operationDetail.valueDate);
                                                                                            payment.parsedValueDate =  Date.valueOf(item.operationDetail.valueDate);
                                                                                        }else{
                                                                                            payment.valueDate = null;
                                                                                            payment.parsedValueDate =  null;
                                                                                        }
                                                                                        
                                                                                        paymentsList.add(payment); 
                                                                                    }
                                                                                    
                                                                                    
                                                                                    
                                                                                }
                                                                                response.paymentsList = paymentsList;
                                                                                
                                                                            }else{
                                                                                response.paymentsList = null;
                                                                            }
                                                                        }
                                                                        
                                                                    }                
                                                                    value.put('output', response);
                                                                }         
                                                                
                                                                
                                                                rv = new ReturnValue(true, value);
                                                            } catch (Exception e) {
                                                                System.debug('CNT_PaymentsParent.searchPaymentsInformation: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
                                                                rv = new ReturnValue(false, null, e.getMessage());
                                                            }
                                                            return rv; 
                                                            
                                                        }
    
    /*----------------------------------------------------------------------------------
Author:         Guillermo Giral
Company:        Deloitte
Description:    Gets the detail of a payment
History
<Date>			<Author>		       	<Description>
23/07/2020      Guillermo Giral        	Initial version
07/08/2020 		Shahad Naji 			Adapted from  CNT_PaymentsPaymentDetail -getPaymentDetail(...)
----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static ReturnValue getPaymentDetail(String paymentId){
        ReturnValue response = CNT_PAY_PaymentOptions.getPaymentDetail(paymentId);      
        return response;
    }
    
    
    
    
    
}