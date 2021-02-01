public class CNT_B2B_ComercialCode {

    
    @AuraEnabled(cacheable=true)
    public static ReturnValue getCommercialCodes(){
        ReturnValue response = null;
        try {
            Map<String, Object> value = new Map<String, Object>();          
            List<WRAPPER_PaymentList.WRAPPER_CommercialCode> commercialCodeList = new List<WRAPPER_PaymentList.WRAPPER_CommercialCode>();
            List<Comercial_Code__mdt> commercialCode_mdt = new List<Comercial_Code__mdt>([SELECT PAY_PCK_CommercialCode__c, toLabel(PAY_PCK_CommercialCodeText__c) FROM Comercial_Code__mdt]); 
            for(Comercial_Code__mdt cc : commercialCode_mdt){
                WRAPPER_PaymentList.WRAPPER_CommercialCode item = new WRAPPER_PaymentList.WRAPPER_CommercialCode();
                item.commercialCode = cc.PAY_PCK_CommercialCode__c;
                item.parsedCommercialCode = cc.PAY_PCK_CommercialCodeText__c;
                commercialCodeList.add(item);
            }
            value.put('commercialCodeList', commercialCodeList);      
            response = new ReturnValue(true, value);
        } catch (Exception e) {
            System.debug('CNT_B2B_ComercialCode.getCommercialCodes: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }




    /* public static List<WRAPPER_PaymentList.WRAPPER_Status> getStatusList(){
        List<WRAPPER_PaymentList.WRAPPER_Status> statusList = new List<WRAPPER_PaymentList.WRAPPER_Status>();  
        try{
            List<Payment_Status__mdt> statusList_mtd = new List<Payment_Status__mdt>([SELECT PAY_TXT_StatusCode__c, toLabel(PAY_PCK_Status__c) FROM Payment_Status__mdt]); 
            for(Payment_Status__mdt s : statusList_mtd){
                WRAPPER_PaymentList.WRAPPER_Status item = new WRAPPER_PaymentList.WRAPPER_Status();
                item.statusName = s.PAY_TXT_StatusCode__c;
                item.parsedStatusName = s.PAY_PCK_Status__c;
                statusList.add(item);
            }
        }catch(Exception e){
            System.debug('CNT_Payments.getStatusList: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            return statusList;
        }
        return statusList;
    }
    */
}