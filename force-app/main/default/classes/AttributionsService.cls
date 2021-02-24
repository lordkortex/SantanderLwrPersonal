public with sharing class AttributionsService {

    public static final String LIST_INTERNATIONAL_PAYMENS = 'list_international_payments';
    public static final String ADD_INTERNATIONAL_PAYMENT_INTERNAL = 'add_international_payment_internal';
    public static final String ADD_INTERNATIONAL_PAYMENT_EXTERNAL = 'add_international_payment_external';

    public static List<WRAPPER_AccountList.AccountDetails> getAccountsByAttributionsAndServices (List<WRAPPER_AccountList.AccountDetails> accountList, List<WS_Attributions.ServiceDataDetails> serviceDataList, List<String> services) {
        List<WRAPPER_AccountList.AccountDetails> res = new List<WRAPPER_AccountList.AccountDetails>(); 
        try {
            List<String> contractIds = filterAccountsByServices(serviceDataList, services);
            for (WRAPPER_AccountList.AccountDetails account : accountList) {
                if (contractIds.contains(account.displayNumber)) {
                    res.add(account);
                }
            }
        } catch (Exception e) {
            System.debug('AttributionsService.getAccountsByAttributions: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
        return res;
    }
    
     public static List<String> filterAccountsByServices(List<WS_Attributions.ServiceDataDetails> serviceDataList, List<String> services) {
        List<String> res = new List<String>(); 
         try {
             for (WS_Attributions.ServiceDataDetails serviceData : serviceDataList) {
                 if(serviceData.status != null){
                     if(serviceData.status == 'active'){
                         if(serviceData.relationList != null){
                             for(WS_Attributions.RelationList relation : serviceData.relationList){
                                 if(relation.operabilityIndicator != null){
                                     if (services.contains(LIST_INTERNATIONAL_PAYMENS) && relation.operabilityIndicator == 'Consultive') {
                                         res.add(relation.contratId);
                                     } else if ((services.contains(ADD_INTERNATIONAL_PAYMENT_INTERNAL) || services.contains(ADD_INTERNATIONAL_PAYMENT_EXTERNAL)) && relation.operabilityIndicator == 'Operative') {
                                         res.add(relation.contratId);
                                     }
                                 }                                 
                             }
                         }
                     }
                 }
            }
        } catch (Exception e) {
            System.debug('AttributionsService.filterAccountsByServices: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
        return res;
    }
}