/*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Apex class to retrieve information related to payments either for Front or for Back
Test Class:     CNT_Payments_Test
History
<Date>          <Author>        <Description>
06/08/2020      Shahad Naji     Initial version
----------------------------------------------------------------------------------*/
public class CNT_Payments {
    
    
    @AuraEnabled
    public static Map<String, String> getAccountTypes(){
        Map<String, String> accountTypesMap = new Map<String, String>();
        try{
            accountTypesMap = Global_Utilities.getPicklistValuesWithTranslations('Account_Type__mdt', 'ACC_PCK_AccountType__c');
        }catch(Exception e){
            System.debug('CNT_Payments.getAccountTypes: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            return accountTypesMap;
        }
        return accountTypesMap;
    }
    
    
    @AuraEnabled
    public static List<WRAPPER_PaymentList.WRAPPER_Currency>  getCurrencyList(){
        List<WRAPPER_PaymentList.WRAPPER_Currency> currencyList = new List<WRAPPER_PaymentList.WRAPPER_Currency>(); 
        try{
            Map<String, String> paymentCurrencyMap = Global_Utilities.getPicklistValuesWithTranslations('Payment_Currency__mdt', 'PAY_PCK_Currency__c');
            for(String key : paymentCurrencyMap.keySet()){
                WRAPPER_PaymentList.WRAPPER_Currency item = new WRAPPER_PaymentList.WRAPPER_Currency();
                item.currencyName = key;
                item.parsedCurrencyName = paymentCurrencyMap.get(key);
                currencyList.add(item);
            } 
        }catch(Exception e){
            System.debug('CNT_Payments.getCurrencyList: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            return currencyList;
        }
        return currencyList;
    }
    
    
    
    
    @AuraEnabled
    public static List<WRAPPER_PaymentList.WRAPPER_Status> getStatusList(){
        List<WRAPPER_PaymentList.WRAPPER_Status> statusList = new List<WRAPPER_PaymentList.WRAPPER_Status>();  
        try{
            List<Payment_Status_List__mdt> statusList_mtd = new List<Payment_Status_List__mdt>([SELECT PAY_PCK_Status_code__c, toLabel(PAY_PCK_Status_Name__c) FROM Payment_Status_List__mdt WHERE PAY_CHK_Show_in_front__c =: true]); 
            for(Payment_Status_List__mdt s : statusList_mtd){
                WRAPPER_PaymentList.WRAPPER_Status item = new WRAPPER_PaymentList.WRAPPER_Status();
                item.statusName = s.PAY_PCK_Status_code__c;
                item.parsedStatusName = s.PAY_PCK_Status_Name__c;
                statusList.add(item);
            }
          
        }catch(Exception e){
            System.debug('CNT_Payments.getStatusList: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            return statusList;
        }
        return statusList;
    }
    
    
    /*----------------------------------------------------------------------------------
Author:         Shahad Naji 
Company:        Deloitte
Description:    Method to return the different payments methods of Payment_Method__mdt custom metadata type
History
<Date>          <Author>             <Description>
27/07/2020      Shahad Naji        Initial version
----------------------------------------------------------------------------------*/     
    @AuraEnabled
    public static List<WRAPPER_PaymentList.WRAPPER_PaymentMethod> getPaymentMethodList(){
        List<WRAPPER_PaymentList.WRAPPER_PaymentMethod> paymentMethodList = new List<WRAPPER_PaymentList.WRAPPER_PaymentMethod>();
        try{          
            List<Payment_Method__mdt> methodList = new List<Payment_Method__mdt>([SELECT PAY_TXT_Method_code__c, toLabel(PAY_PCK_Method__c) FROM Payment_Method__mdt]);
            for(Payment_Method__mdt pm : methodList){
                WRAPPER_PaymentList.WRAPPER_PaymentMethod item = new WRAPPER_PaymentList.WRAPPER_PaymentMethod();
                item.paymentMethodName = pm.PAY_TXT_Method_code__c;
                item.parsedPaymentMethodName = pm.PAY_PCK_Method__c;
                paymentMethodList.add(item);
                
            }
        }catch(Exception e){
            System.debug('CNT_Payments.getPaymentMethodList: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            return paymentMethodList;
        }
        return paymentMethodList;        
    }
    
    
    
    /*----------------------------------------------------------------------------------
Author:         Shahad Naji 
Company:        Deloitte
Description:    Method to return the different payments methods of Payment_type__mdt custom metadata type
History
<Date>          <Author>             <Description>
25/09/2020      Bea Hill            Adapted for Payment Type from Payment Method
----------------------------------------------------------------------------------*/     
    @AuraEnabled
    public static List<WRAPPER_PaymentList.WRAPPER_PaymentType> getPaymentTypeList(){
        List<WRAPPER_PaymentList.WRAPPER_PaymentType> paymentTypeList = new List<WRAPPER_PaymentList.WRAPPER_PaymentType>();
        try{          
            List<Payment_type__mdt> typeList = new List<Payment_type__mdt>([SELECT MasterLabel, PAY_PCK_Payments_types__c, toLabel(PAY_PCK_Payment_type_front__c) FROM Payment_type__mdt]);
            for(Payment_type__mdt pt : typeList){
                WRAPPER_PaymentList.WRAPPER_PaymentType item = new WRAPPER_PaymentList.WRAPPER_PaymentType();
                item.paymentTypeName = pt.PAY_PCK_Payments_types__c;//pt.MasterLabel;
                item.parsedPaymentTypeName = pt.PAY_PCK_Payment_type_front__c;
                paymentTypeList.add(item);
                
            }
        }catch(Exception e){
            System.debug('CNT_Payments.getPaymentTypeList: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            return paymentTypeList;
        }
        return paymentTypeList;        
    }
    
    
    
    
    @AuraEnabled
    public static List<WRAPPER_PaymentList.WRAPPER_Country> getCountryList(){
        List<WRAPPER_PaymentList.WRAPPER_Country> countryList = new List<WRAPPER_PaymentList.WRAPPER_Country>();  
        try{            
            Map<String, String> countryMap = Global_Utilities.getCountriesMap();
            for(String key: countryMap.keySet()){
                WRAPPER_PaymentList.WRAPPER_Country item = new WRAPPER_PaymentList.WRAPPER_Country();
                item.countryName = key;
                item.parsedCountryName = countryMap.get(key);
                countryList.add(item);
            }
        }catch(Exception e){
            System.debug('CNT_Payments.getCountryList: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            return countryList;
        }
        return countryList;
    }

    @AuraEnabled
    public static List<WRAPPER_PaymentList.WRAPPER_Country> getIipBeneficicaryCountries(String sourceAccountCountry){
        String countryToExclude = '';
        if (String.isNotBlank(sourceAccountCountry)) {
            countryToExclude = sourceAccountCountry; 
        }
        List<WRAPPER_PaymentList.WRAPPER_Country> countryList = new List<WRAPPER_PaymentList.WRAPPER_Country>();  
        try{
            Boolean isIipBeneficiary = true;
            Map<String, String> res = new Map<String, String>();            
            List<Country__mdt> countries = [SELECT toLabel(COU_PCK_ISO_Code2__c), toLabel(COU_PCK_Name__c) FROM Country__mdt WHERE PAY_CHK_IIP_Beneficiary__c =: isIipBeneficiary];
            if(!countries.isEmpty()){
                for(Country__mdt i : countries){
                    res.put(i.COU_PCK_ISO_Code2__c, i.COU_PCK_Name__c);
                }
            }
            for(String key: res.keySet()){
                if (key != countryToExclude){
                    WRAPPER_PaymentList.WRAPPER_Country item = new WRAPPER_PaymentList.WRAPPER_Country();
                    item.countryName = key;
                    item.parsedCountryName = res.get(key);
                    countryList.add(item);
                }
            }
        }catch(Exception e){
            System.debug('CNT_Payments.getIipBeneficicaryCountries: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            return countryList;
        }
        return countryList;
    }
    
    
    
    
    
    
    /*----------------------------------------------------------------------------------
Author:         Shahad Naji 
Company:        Deloitte
Description:    Returns a payment status label
History
<Date>          <Author>             <Description>
29/07/2020      Shahad Naji        Initial version
----------------------------------------------------------------------------------*/     
    public static String getPaymentStatus (String statusCode){
        String aux = '';
        try{
            if(statusCode != null && statusCode != ''){
                Payment_Status__mdt ps = new Payment_Status__mdt();
                ps =  [SELECT toLabel(PAY_PCK_Status__c) FROM Payment_Status__mdt WHERE PAY_TXT_StatusCode__c =: statusCode LIMIT 1]; 
                aux = ps.PAY_PCK_Status__c;
            }
        }catch(Exception e){
            System.debug('CNT_Payments.getPaymentStatus: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            return aux;
        }
        return aux;
    }  
    
    
    /*----------------------------------------------------------------------------------
Author:         Shahad Naji 
Company:        Deloitte
Description:    Returns a payment method label
History
<Date>          <Author>             <Description>
09/08/2020      Shahad Naji        Initial version
----------------------------------------------------------------------------------*/   
    public static String getPaymentMethod(String methodCode){
        String aux = '';
        try{
            if(methodCode != null &&  methodCode != ''){
                Payment_Method__mdt pm =  [SELECT DeveloperName, PAY_PCK_Method__c FROM Payment_Method__mdt WHERE DeveloperName =: methodCode LIMIT 1];
                aux = pm.PAY_PCK_Method__c;
            }
        }catch(Exception e){
            System.debug('CNT_Payments.getPaymentMethod: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            return aux;
        }
        return aux;
    }
    
    /*----------------------------------------------------------------------------------
Author:         Shahad Naji 
Company:        Deloitte
Description:    Returns a payment purpose label
History
<Date>          <Author>             <Description>
09/08/2020      Shahad Naji        Initial version
----------------------------------------------------------------------------------*/   
    public static String getPaymentPurpose(String purposeCode){
        String aux = '';
        try{
            if(purposeCode != null &&  purposeCode != ''){
                Map<String, String> paymentPurposesMap = Global_Utilities.getPicklistValuesWithTranslations('Purpose_of_Payment__mdt', 'PUR_PCK_Purpose__c');                
                aux = paymentPurposesMap.get(purposeCode);
            }
        }catch(Exception e){
            System.debug('CNT_Payments.getPaymentPurpose: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            return aux;
        }
        return aux;
    }
    
    
    
    
    /*----------------------------------------------------------------------------------
Author:         Shahad Naji 
Company:        Deloitte
Description:    Returns a map of payment status list available in Payment_Status__mdt
History
<Date>          <Author>             <Description>
16/10/2020      Shahad Naji        Initial version
----------------------------------------------------------------------------------*/   
    public static Map<String,String> getPaymentStatusMap(){
        Map <String, String> statusMap = new Map <String, String>();
        try{
            List<Payment_Status__mdt> ls = [select PAY_TXT_StatusCode__c, toLabel(PAY_PCK_Status__c) from Payment_Status__mdt];
            for(Payment_Status__mdt item : ls){
                if(!statusMap.containsKey(item.PAY_TXT_StatusCode__c)){
                    statusMap.put(item.PAY_TXT_StatusCode__c, item.PAY_PCK_Status__c);
                }    
            }
        }catch(Exception e){
            System.debug('CNT_Payments.getPaymentStatusMap: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            return statusMap;
        }
        return statusMap;
    }
    
    
    /*----------------------------------------------------------------------------------
Author:         Shahad Naji 
Company:        Deloitte
Description:    Returns a list of payment statuses available in Payment_Status_List__mdt
History
<Date>          <Author>             <Description>
05/11/2020      Shahad Naji        	 Initial version
----------------------------------------------------------------------------------*/       
    @AuraEnabled
    public static List<WRAPPER_PaymentList.WRAPPER_Status> getStatusList(Boolean showInFront, Boolean showInBBOO){
        List<WRAPPER_PaymentList.WRAPPER_Status> statusList = new List<WRAPPER_PaymentList.WRAPPER_Status>();  
        try{
            List<Payment_Status_List__mdt> ls = new List<Payment_Status_List__mdt>();
            if(showInFront){
                ls = [SELECT DeveloperName, TOLABEL(PAY_PCK_Status_Name__c) FROM Payment_Status_List__mdt WHERE PAY_CHK_Show_in_front__c =: true];
            }
            else if(showInBBOO){
                ls = [SELECT DeveloperName,TOLABEL(PAY_PCK_Status_Name__c), PAY_PCK_Status_code__c, PAY_PCK_Reason_code__c  FROM Payment_Status_List__mdt WHERE PAY_CHK_Show_in_back_office__c =: true];
            }
            else{
                ls = [SELECT DeveloperName, TOLABEL(PAY_PCK_Status_Name__c) FROM Payment_Status_List__mdt]; 
            }
            for(Payment_Status_List__mdt s : ls){
                WRAPPER_PaymentList.WRAPPER_Status item = new WRAPPER_PaymentList.WRAPPER_Status();
                item.statusName = s.DeveloperName;
                /*if(showInBBOO){
                    item.parsedStatusName = '['+s.PAY_PCK_Status_code__c+']' + ' ' + '['+s.PAY_PCK_Reason_code__c+'] '+s.PAY_PCK_Status_Name__c;
                }else{*/
                   item.parsedStatusName = s.PAY_PCK_Status_Name__c;
                //}
                
                statusList.add(item);
            }
        }catch(Exception e){
            System.debug('CNT_Payments.getStatusList: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            return statusList;
        }
        return statusList;
    }
    
    
    
    @AuraEnabled
    public static List<WS_OperationsList.StatusList> wsGetStatusList(Boolean showInFront, Boolean showInBBOO){
        List<WS_OperationsList.StatusList> statusList = new List<WS_OperationsList.StatusList>();
        List<Payment_Status_List__mdt> ls = new List<Payment_Status_List__mdt>();
        if(showInFront){
               ls = [SELECT PAY_PCK_Status_code__c, PAY_PCK_Reason_code__c FROM Payment_Status_List__mdt WHERE PAY_CHK_Show_in_front__c =: true];
        }
        for(Payment_Status_List__mdt s : ls){
                WS_OperationsList.StatusList item = new WS_OperationsList.StatusList();
                item.status = s.PAY_PCK_Status_code__c;
               	item.reason = s.PAY_PCK_Reason_code__c;
                statusList.add(item);
        }
        return statusList;
    }
    
    
    /*----------------------------------------------------------------------------------
Author:         Shahad Naji 
Company:        Deloitte
Description:    Returns a list of payment statuses available in Payment_Status_List__mdt
History
<Date>          <Author>             <Description>
06/11/2020      Shahad Naji        	 Initial version
----------------------------------------------------------------------------------*/
    public static List<Payment_Status_List__mdt> getPaymentStatusReasonList(){
        List<Payment_Status_List__mdt> paymentStatusList = new List<Payment_Status_List__mdt>();
        try{
            paymentStatusList = [SELECT DeveloperName,Id,Label,Language,MasterLabel,NamespacePrefix,PAY_CHK_Show_in_back_office__c,PAY_CHK_Show_in_front__c,PAY_PCK_Reason_code__c,PAY_PCK_Status_code__c,PAY_PCK_Status_Name__c,QualifiedApiName FROM Payment_Status_List__mdt];
        }catch(Exception e){
            System.debug('CNT_Payments.getPaymentStatusList: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            return paymentStatusList;
        }
        return paymentStatusList;
    }
        /*----------------------------------------------------------------------------------
Author:         Beatrice 
Company:        Deloitte
Description:    Returns a a record from Comercial_Code__mdt
History
<Date>          <Author>             <Description>
11/11/2020      Shahad Naji        	 Initial version
----------------------------------------------------------------------------------*/
       public static String getComercialCodeRecord(string commercialCode){
        String result = '';
        try{
            Comercial_Code__mdt commercialCodeResult = [SELECT toLabel(PAY_PCK_CommercialCodeText__c) FROM Comercial_Code__mdt WHERE PAY_PCK_CommercialCode__c =: commercialCode LIMIT 1];
            result = commercialCodeResult.PAY_PCK_CommercialCodeText__c;
        }catch(Exception e){
            System.debug('CNT_Payments.getComercialCodeRecord: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            return result;
        }
        return result;
    }
    
    /*----------------------------------------------------------------------------------
Author:         Shahad Naji 
Company:        Deloitte
Description:    Returns dummy payments information
of them
History
<Date>          <Author>             <Description>
29/05/2020      Shahad Naji        Initial version
----------------------------------------------------------------------------------*/ 
    @AuraEnabled
    public static WRAPPER_PaymentList getTestPaymentsInformation(Boolean isSingleTabSelected){
        WRAPPER_PaymentList paymentList = new WRAPPER_PaymentList();
        
        
        List<WRAPPER_PaymentList.WRAPPER_Payment> paymentsList = new List<WRAPPER_PaymentList.WRAPPER_Payment>();
        Payment_Status__mdt ps = new Payment_Status__mdt();
        
        
        WRAPPER_PaymentList.WRAPPER_Payment payment1 = new WRAPPER_PaymentList.WRAPPER_Payment();
        payment1.paymentId = '0001';
        payment1.clientReference = 'DDR123456784824D';
        payment1.paymentStatus = '997';
        ps =  [SELECT toLabel(PAY_PCK_Status__c) FROM Payment_Status__mdt WHERE PAY_TXT_StatusCode__c =: payment1.paymentStatus LIMIT 1];       
        payment1.parsedPaymentStatus = ps.PAY_PCK_Status__c;
        payment1.sourceAccount = 'ES26****88881589';
        payment1.sourceAlias = 'Bamboo Transations';
        payment1.beneficiaryAccount = 'IT60****12345612';
        payment1.beneficiaryAlias = 'Italy Bamboo';
        payment1.amount = Decimal.valueOf(0).setScale(2);
        payment1.paymentCurrency = 'EUR';
        payment1.valueDate = Date.today()-1;
        payment1.parsedValueDate = Date.today()-1;
        payment1.paymentMethod = '';
        payment1.parsedPaymentMethod = '';
        payment1.destinationCountry = 'IT';
        paymentsList.add(payment1);
        
        
        WRAPPER_PaymentList.WRAPPER_Payment payment2 = new WRAPPER_PaymentList.WRAPPER_Payment();
        payment2.paymentId = '0002';
        payment2.clientReference = 'IRPF 01/2020';
        payment2.paymentStatus = '003';
        ps =  [SELECT toLabel(PAY_PCK_Status__c) FROM Payment_Status__mdt WHERE PAY_TXT_StatusCode__c =: payment2.paymentStatus LIMIT 1];       
        payment2.parsedPaymentStatus = ps.PAY_PCK_Status__c;
        payment2.sourceAccount = 'ES26****88881589';
        payment2.sourceAlias = 'Bamboo Transactions Italy';
        payment2.beneficiaryAccount = 'FR76****78901891';
        payment2.beneficiaryAlias = 'France Studio Material';
        payment2.amount = Decimal.valueOf(200145).setScale(2);
        payment2.paymentCurrency = 'MXN';
        payment2.valueDate = Date.today();
        payment2.parsedValueDate = Date.today();
        payment2.paymentMethod = '';
        payment2.parsedPaymentMethod = '';
        payment2.destinationCountry = 'FR';
        paymentsList.add(payment2);
        
        
        WRAPPER_PaymentList.WRAPPER_Payment payment3 = new WRAPPER_PaymentList.WRAPPER_Payment();
        payment3.paymentId = '0003';
        payment3.clientReference = 'Nóminas Feb';
        payment3.paymentStatus = '003';
        ps =  [SELECT toLabel(PAY_PCK_Status__c) FROM Payment_Status__mdt WHERE PAY_TXT_StatusCode__c =: payment3.paymentStatus LIMIT 1]; 
        payment3.parsedPaymentStatus = ps.PAY_PCK_Status__c;
        payment3.sourceAccount = 'ES26****88881589';
        payment3.sourceAlias = 'Bamboo Transactions Italy';
        payment3.beneficiaryAccount = 'FR76****78901891';
        payment3.beneficiaryAlias = 'France Provider SD';
        payment3.amount = 200145.0;
        payment3.paymentCurrency = 'EUR';
        payment3.valueDate = Date.today();
        payment3.parsedValueDate = Date.today();
        payment3.paymentMethod = '';
        payment3.parsedPaymentMethod= '';
        payment3.destinationCountry = 'FR';
        paymentsList.add(payment3);
        
        
        WRAPPER_PaymentList.WRAPPER_Payment payment4 = new WRAPPER_PaymentList.WRAPPER_Payment();
        payment4.paymentId = '0004';
        payment4.clientReference = '11988493';
        payment4.paymentStatus = '201';
        ps =  [SELECT toLabel(PAY_PCK_Status__c) FROM Payment_Status__mdt WHERE PAY_TXT_StatusCode__c =: payment4.paymentStatus LIMIT 1]; 
        payment4.parsedPaymentStatus =  ps.PAY_PCK_Status__c;
        payment4.sourceAccount = 'ES26****88881589';
        payment4.sourceAlias = 'Bamboo Transactions';
        payment4.beneficiaryAccount = 'IT60****12345612';
        payment4.beneficiaryAlias = 'Portugal Bamboo';
        payment4.amount = 200145.0;
        payment4.paymentCurrency = 'EUR';
        payment4.valueDate = Date.today();
        payment4.parsedValueDate = Date.today();
        payment4.paymentMethod = '';
        payment4.parsedPaymentMethod ='';
        payment4.destinationCountry = 'PT';
        paymentsList.add(payment4);
        
        
        WRAPPER_PaymentList.WRAPPER_Payment payment5 = new WRAPPER_PaymentList.WRAPPER_Payment();
        payment5.paymentId = '0005';
        payment5.clientReference = '123A12K3939';
        payment5.paymentStatus = '997';
        ps =  [SELECT toLabel(PAY_PCK_Status__c) FROM Payment_Status__mdt WHERE PAY_TXT_StatusCode__c =: payment5.paymentStatus LIMIT 1]; 
        payment5.parsedPaymentStatus = ps.PAY_PCK_Status__c;
        payment5.sourceAccount = 'ES26****88881589';
        payment5.sourceAlias = 'Bamboo Transactions Italy';
        payment5.beneficiaryAccount = 'IT60****12345612';
        payment5.beneficiaryAlias = 'Portugal Bamboo';
        payment5.amount = 200145.0;
        payment5.paymentCurrency = 'EUR';
        payment5.valueDate = Date.today();
        payment5.parsedValueDate = Date.today();
        payment5.paymentMethod = '';
        payment5.parsedPaymentMethod= '';
        payment5.destinationCountry = 'PT';
        paymentsList.add(payment5);
        
        
        WRAPPER_PaymentList.WRAPPER_Payment payment6 = new WRAPPER_PaymentList.WRAPPER_Payment();
        payment6.paymentId = '0006';
        payment6.clientReference = '1234567890';
        payment6.paymentStatus = '002';
        ps =  [SELECT toLabel(PAY_PCK_Status__c) FROM Payment_Status__mdt WHERE PAY_TXT_StatusCode__c =: payment6.paymentStatus LIMIT 1]; 
        payment6.parsedPaymentStatus = ps.PAY_PCK_Status__c;
        payment6.sourceAccount = 'ES26****88881589';
        payment6.sourceAlias = 'Bamboo';
        payment6.beneficiaryAccount = 'IT60****12345612';
        payment6.beneficiaryAlias = 'UK Design Studio';
        payment6.amount = 200145.0;
        payment6.paymentCurrency = 'GBP';
        payment6.valueDate = Date.today();
        payment6.parsedValueDate = Date.today();
        payment6.paymentMethod = '';
        payment6.parsedPaymentMethod= '';
        payment6.destinationCountry = 'GB';
        paymentsList.add(payment6);
        
        
        WRAPPER_PaymentList.WRAPPER_Payment payment7 = new WRAPPER_PaymentList.WRAPPER_Payment();
        payment7.paymentId = '0007';
        payment7.clientReference = 'AS1234567890';
        payment7.paymentStatus = '103';
        ps =  [SELECT toLabel(PAY_PCK_Status__c) FROM Payment_Status__mdt WHERE PAY_TXT_StatusCode__c =: payment7.paymentStatus LIMIT 1]; 
        payment7.parsedPaymentStatus = ps.PAY_PCK_Status__c;
        payment7.sourceAccount = 'ES26****88881589';
        payment7.sourceAlias = 'Bamboo Transactions Italy';
        payment7.beneficiaryAccount = 'IT60****12345612';
        payment7.beneficiaryAlias = 'Italy Bamboo';
        payment7.amount = 200145.0;
        payment7.paymentCurrency = 'EUR';
        payment7.valueDate = Date.today();
        payment7.parsedValueDate = Date.today();
        payment7.paymentMethod = '';
        payment7.parsedPaymentMethod= '';
        payment7.destinationCountry = 'IT';        
        paymentsList.add(payment7);
        
        
        WRAPPER_PaymentList.WRAPPER_Payment payment8 = new WRAPPER_PaymentList.WRAPPER_Payment();
        payment8.paymentId = '0008';
        payment8.clientReference = 'Provider 401';
        payment8.paymentStatus = '103';
        ps =  [SELECT toLabel(PAY_PCK_Status__c) FROM Payment_Status__mdt WHERE PAY_TXT_StatusCode__c =: payment8.paymentStatus LIMIT 1]; 
        payment8.parsedPaymentStatus = ps.PAY_PCK_Status__c;
        payment8.sourceAccount = 'ES26****88881589';
        payment8.sourceAlias = 'Bamboo';
        payment8.beneficiaryAccount = 'IT60****12345612';
        payment8.beneficiaryAlias = 'Italy Bamboo';
        payment8.amount = 200145.0;
        payment8.paymentCurrency = 'EUR';
        payment8.valueDate = Date.today();
        payment8.parsedValueDate = Date.today();
        payment8.paymentMethod = '';
        payment8.parsedPaymentMethod= '';
        payment8.destinationCountry = 'IT';
        paymentsList.add(payment8);
        
        
        WRAPPER_PaymentList.WRAPPER_Payment payment9 = new WRAPPER_PaymentList.WRAPPER_Payment();
        payment9.paymentId = '0009';
        payment9.clientReference = 'ASW123456789';
        payment9.paymentStatus = '103';
        ps =  [SELECT toLabel(PAY_PCK_Status__c) FROM Payment_Status__mdt WHERE PAY_TXT_StatusCode__c =: payment9.paymentStatus LIMIT 1]; 
        payment9.parsedPaymentStatus = ps.PAY_PCK_Status__c;
        payment9.sourceAccount = 'ES26****88881589';
        payment9.sourceAlias = 'Bamboo Transations';
        payment9.beneficiaryAccount = 'BR50****10000121';
        payment9.beneficiaryAlias = 'Brasil Bamboo';
        payment9.amount = 200145.0;
        payment9.paymentCurrency = 'BRL';
        payment9.valueDate = Date.today();
        payment9.parsedValueDate = Date.today();
        payment9.paymentMethod = '';
        payment9.parsedPaymentMethod='';
        payment9.destinationCountry = 'BR';
        paymentsList.add(payment9);
        
        
        WRAPPER_PaymentList.WRAPPER_Payment payment10 = new WRAPPER_PaymentList.WRAPPER_Payment();
        payment10.paymentId = '0010';
        payment10.clientReference = '123456789';
        payment10.paymentStatus = '999';
        ps =  [SELECT toLabel(PAY_PCK_Status__c) FROM Payment_Status__mdt WHERE PAY_TXT_StatusCode__c =: payment10.paymentStatus LIMIT 1]; 
        payment10.parsedPaymentStatus = ps.PAY_PCK_Status__c;
        payment10.sourceAccount = 'ES26****88881589';
        payment10.sourceAlias = 'Bamboo Transactions Italy';
        payment10.beneficiaryAccount = 'BR50****10000121';
        payment10.beneficiaryAlias = 'Brasil Bamboo';
        payment10.amount = 200145.0;
        payment10.paymentCurrency = 'USD';
        payment10.valueDate = Date.today();
        payment10.parsedValueDate = Date.today();
        payment10.paymentMethod = '';
        payment10.parsedPaymentMethod='';
        payment10.destinationCountry = 'BR';
        paymentsList.add(payment10);
        
        WRAPPER_PaymentList.WRAPPER_Payment payment11 = new WRAPPER_PaymentList.WRAPPER_Payment();
        payment11.paymentId = '0011';
        payment11.clientReference = 'AS1234567890';
        payment11.paymentStatus = '103';
        ps =  [SELECT toLabel(PAY_PCK_Status__c) FROM Payment_Status__mdt WHERE PAY_TXT_StatusCode__c =: payment11.paymentStatus LIMIT 1]; 
        payment11.parsedPaymentStatus = ps.PAY_PCK_Status__c;
        payment11.sourceAccount = 'ES26****88881589';
        payment11.sourceAlias = 'Bamboo Transactions Italy';
        payment11.beneficiaryAccount = 'IT60****12345612';
        payment11.beneficiaryAlias = 'Italy Bamboo';
        payment11.amount = 200145.0;
        payment11.paymentCurrency = 'EUR';
        payment11.valueDate = Date.today();
        payment11.parsedValueDate = Date.today();
        payment11.paymentMethod = '';
        payment11.parsedPaymentMethod='';
        payment11.destinationCountry = 'IT';        
        paymentsList.add(payment11);
        
        
        WRAPPER_PaymentList.WRAPPER_Payment payment12 = new WRAPPER_PaymentList.WRAPPER_Payment();
        payment12.paymentId = '0012';
        payment12.clientReference = 'Provider 401';
        payment12.paymentStatus = '103';
        ps =  [SELECT toLabel(PAY_PCK_Status__c) FROM Payment_Status__mdt WHERE PAY_TXT_StatusCode__c =: payment12.paymentStatus LIMIT 1]; 
        payment12.parsedPaymentStatus = ps.PAY_PCK_Status__c;
        payment12.sourceAccount = 'ES26****88881589';
        payment12.sourceAlias = 'Bamboo';
        payment12.beneficiaryAccount = 'IT60****12345612';
        payment12.beneficiaryAlias = 'Italy Bamboo';
        payment12.amount = 200145.0;
        payment12.paymentCurrency = 'ARG';
        payment12.valueDate = Date.today();
        payment12.parsedValueDate = Date.today();
        payment12.paymentMethod = '';
        payment12.parsedPaymentMethod='';
        payment12.destinationCountry = 'IT';
        paymentsList.add(payment12);
        
        
        WRAPPER_PaymentList.WRAPPER_Payment payment13 = new WRAPPER_PaymentList.WRAPPER_Payment();
        payment13.paymentId = '0013';
        payment13.clientReference = 'ASW123456789';
        payment13.paymentStatus = '103';
        ps =  [SELECT toLabel(PAY_PCK_Status__c) FROM Payment_Status__mdt WHERE PAY_TXT_StatusCode__c =: payment13.paymentStatus LIMIT 1]; 
        payment13.parsedPaymentStatus = ps.PAY_PCK_Status__c;
        payment13.sourceAccount = 'ES26****88881589';
        payment13.sourceAlias = 'Bamboo Transations';
        payment13.beneficiaryAccount = 'BR50****10000121';
        payment13.beneficiaryAlias = 'Brasil Bamboo';
        payment13.amount = 200145.0;
        payment13.paymentCurrency = 'BRL';
        payment13.valueDate = Date.today();
        payment13.parsedValueDate = Date.today();
        payment13.paymentMethod = '';
        payment13.parsedPaymentMethod='';
        payment13.destinationCountry = 'BR';
        paymentsList.add(payment13);
        
        
        
        List<WRAPPER_PaymentList.WRAPPER_Status> statusList = new List<WRAPPER_PaymentList.WRAPPER_Status>();        
        List<Payment_Status__mdt> statusList_mtd = new List<Payment_Status__mdt>([SELECT PAY_TXT_StatusCode__c, toLabel(PAY_PCK_Status__c) FROM Payment_Status__mdt]); 
        for(Payment_Status__mdt s : statusList_mtd){
            WRAPPER_PaymentList.WRAPPER_Status item = new WRAPPER_PaymentList.WRAPPER_Status();
            item.statusName = s.PAY_TXT_StatusCode__c;
            item.parsedStatusName = s.PAY_PCK_Status__c;
            statusList.add(item);
        }        
        List<WRAPPER_PaymentList.WRAPPER_Currency> currencyList = new List<WRAPPER_PaymentList.WRAPPER_Currency>(); 
        Map<String, String> paymentCurrencyMap = Global_Utilities.getPicklistValuesWithTranslations('Payment_Currency__mdt', 'PAY_PCK_Currency__c');
        for(String key : paymentCurrencyMap.keySet()){
            WRAPPER_PaymentList.WRAPPER_Currency item = new WRAPPER_PaymentList.WRAPPER_Currency();
            item.currencyName = key;
            item.parsedCurrencyName = paymentCurrencyMap.get(key);
            currencyList.add(item);
        }   
        
        
        List<WRAPPER_PaymentList.WRAPPER_PaymentMethod> paymentMethodList = new List<WRAPPER_PaymentList.WRAPPER_PaymentMethod>();
        Map<String, String> paymentMethodMap = Global_Utilities.getPicklistValuesWithTranslations('Payment_Method__mdt', 'PAY_PCK_Method__c');
        for(String key : paymentMethodMap.keySet()){
            WRAPPER_PaymentList.WRAPPER_PaymentMethod item = new WRAPPER_PaymentList.WRAPPER_PaymentMethod();
            item.paymentMethodName = key;
            item.parsedPaymentMethodName = paymentMethodMap.get(key);
            paymentMethodList.add(item);
        }  
        
        List<WRAPPER_PaymentList.WRAPPER_PaymentType> paymentTypeList = new List<WRAPPER_PaymentList.WRAPPER_PaymentType>();
        Map<String, String> paymentTypeMap = Global_Utilities.getPicklistValuesWithTranslations('Payment_type__mdt', 'PAY_PCK_Payment_type_front__c');
        for(String key : paymentTypeMap.keySet()){
            WRAPPER_PaymentList.WRAPPER_PaymentType item = new WRAPPER_PaymentList.WRAPPER_PaymentType();
            item.paymentTypeName = key;
            item.parsedPaymentTypeName = paymentTypeMap.get(key);
            paymentTypeList.add(item);
        }  
        
        
        List<WRAPPER_PaymentList.WRAPPER_Country> countryList = new List<WRAPPER_PaymentList.WRAPPER_Country>();    
        Map<String, String> countryMap = Global_Utilities.getCountriesMap();
        for(String key: countryMap.keySet()){
            WRAPPER_PaymentList.WRAPPER_Country item = new WRAPPER_PaymentList.WRAPPER_Country();
            item.countryName = key;
            item.parsedCountryName = countryMap.get(key);
            countryList.add(item);
        }
        
        paymentList.statusList = statusList;
        paymentList.currencyList = currencyList;
        paymentList.paymentMethodList = paymentMethodList;
        paymentList.countryList = countryList;
        paymentList.paymentsList = paymentsList;
        
        
        
        return paymentList;
    }
    
    
    /*----------------------------------------------------------------------------------
Author:         Maria Iñigo
Company:        Deloitte
Description:    Get current user information
History
<Date>          <Author>             <Description>
05/06/2020      Maria Iñigo        Initial version
----------------------------------------------------------------------------------*/ 
    public static List<WRAPPER_AccountList.AccountDetails> loadAccountList () {
        List<WRAPPER_AccountList.AccountDetails> response = new List<WRAPPER_AccountList.AccountDetails>();
        WRAPPER_AccountList.AccountDetails account1 = new WRAPPER_AccountList.AccountDetails();
        account1.valueDate = null;
        account1.type = null;
        account1.transactionList = null;
        account1.subsidiaryName = 'CORPORATE GTS 1 ES';
        account1.status = null;
        account1.paisbic = 'ES';
        account1.locatorbic = 'MM';
        account1.lastUpdateOverdraftLimit = null;
        account1.lastupdateMainBalance = null;
        account1.lastUpdateAvailableBalance = '';
        account1.lastudpateWithholdingBalance = null;
        account1.lastTransaction = null;
        account1.internationalPaymentsAllowed = null;
        account1.idType = 'BBA';
        account1.hasSwiftPayment = null;
        account1.displayNumber = 'ES6000491500051234567891';
        account1.description = null;
        account1.currencyCodeWithholdingBalance = null;
        account1.currencycodeOverdraftLimit = null;
        account1.currencyCodeMainBalance = null;
        account1.currencyCodeAvailableBalance = 'EUR';
        account1.countryName = 'Spain';
        account1.country = 'ES';
        account1.codigoEmisora = '7';
        account1.codigoCuenta = '6804';
        account1.codigoCorporate = '2938';
        account1.codigoBic = 'BSCHESMMXXX';
        account1.branch = 'XXX';
        account1.bic = 'BSCH';
        account1.bankName = 'BANCO SANTANDER ESPANA';
        account1.amountWithholdingBalance = null;
        account1.amountOverdraftLimit = null;
        account1.amountMainBalance = 0.0;
        account1.amountAvailableBalance = 15325.70;
        account1.aliasEntidad = '';
        account1.aliasCuentaPerfilado = null;
        account1.alias = 'test2020 v2    ';
        account1.accountId = null;
        response.add(account1);
        WRAPPER_AccountList.AccountDetails account2 = new WRAPPER_AccountList.AccountDetails();
        account2.valueDate = '2020-03-03T00:00:00.000+0000';
        account2.type = null;
        account2.transactionList = null;
        account2.subsidiaryName = 'CORPORATE GTS 3 AR';
        account2.status = null;
        account2.paisbic = 'AR';
        account2.locatorbic = 'BA';
        account2.lastUpdateOverdraftLimit = null;
        account2.lastupdateMainBalance = null;
        account2.lastUpdateAvailableBalance = '2020-03-03T00:00:00.000+0000';
        account2.lastudpateWithholdingBalance = null;
        account2.lastTransaction = null;
        account2.internationalPaymentsAllowed = null;
        account2.idType = 'BBA';
        account2.hasSwiftPayment = null;
        account2.displayNumber = '0000000000288006GTS';
        account2.description = null;
        account2.currencyCodeWithholdingBalance = null;
        account2.currencycodeOverdraftLimit = null;
        account2.currencyCodeMainBalance = null;
        account2.currencyCodeAvailableBalance = 'USD';
        account2.countryName = 'Argentina';
        account2.country = 'AR';
        account2.codigoEmisora = '104482';
        account2.codigoCuenta = '6864';
        account2.codigoCorporate = '2961';
        account2.codigoBic = 'BSCHARBACAI';
        account2.branch = 'CAI';
        account2.bic = 'BSCH';
        account2.bankName = 'BANCO SANTANDER RIO S.A.';
        account2.amountWithholdingBalance = null;
        account2.amountOverdraftLimit = null;
        account2.amountMainBalance = 123103.0;
        account2.amountAvailableBalance = 10001.0;
        account2.aliasEntidad = '';
        account2.aliasCuentaPerfilado = null;
        account2.alias = '';
        account2.accountId = null;
        response.add(account2);
        WRAPPER_AccountList.AccountDetails account3 = new WRAPPER_AccountList.AccountDetails();
        account3.valueDate = '2020-03-03T00:00:00.000+0000';
        account3.type = null;
        account3.transactionList = null;
        account3.subsidiaryName = 'CORPORATE GTS 3 AR';
        account3.status = null;
        account3.paisbic = 'AR';
        account3.locatorbic = 'BA';
        account3.lastUpdateOverdraftLimit = null;
        account3.lastupdateMainBalance = null;
        account3.lastUpdateAvailableBalance = '2020-03-03T00:00:00.000+0000';
        account3.lastudpateWithholdingBalance = null;
        account3.lastTransaction = null;
        account3.internationalPaymentsAllowed = null;
        account3.idType = 'BBA';
        account3.hasSwiftPayment = null;
        account3.displayNumber = 'EX00720194005000096557GTS';
        account3.description = null;
        account3.currencyCodeWithholdingBalance = null;
        account3.currencycodeOverdraftLimit = null;
        account3.currencyCodeMainBalance = null;
        account3.currencyCodeAvailableBalance = 'EUR';
        account3.countryName = 'Argentina';
        account3.country = 'AR';
        account3.codigoEmisora = '104992';
        account3.codigoCuenta = '6863';
        account3.codigoCorporate = '2961';
        account3.codigoBic = 'BSCHARBAXXX';
        account3.branch = 'XXX';
        account3.bic = 'BSCH';
        account3.bankName = 'BANCO SANTANDER RIO IC';
        account3.amountWithholdingBalance = null;
        account3.amountOverdraftLimit = null;
        account3.amountMainBalance = 30.0;
        account3.amountAvailableBalance = 10001.0;
        account3.aliasEntidad = '';
        account3.aliasCuentaPerfilado = null;
        account3.alias = 'Test 3.2       ';
        account3.accountId = null;
        response.add(account3);
        WRAPPER_AccountList.AccountDetails account4 = new WRAPPER_AccountList.AccountDetails();
        account4.valueDate = '2020-03-03T00:00:00.000+0000';
        account4.type = null;
        account4.transactionList = null;
        account4.subsidiaryName = 'CORPORATE GTS 2 CL';
        account4.status = null;
        account4.paisbic = 'CL';
        account4.locatorbic = 'RM';
        account4.lastUpdateOverdraftLimit = null;
        account4.lastupdateMainBalance = null;
        account4.lastUpdateAvailableBalance = '2020-03-03T00:00:00.000+0000';
        account4.lastudpateWithholdingBalance = null;
        account4.lastTransaction = null;
        account4.internationalPaymentsAllowed = null;
        account4.idType = 'BBA';
        account4.hasSwiftPayment = null;
        account4.displayNumber = '00350401005100018138GTS';
        account4.description = null;
        account4.currencyCodeWithholdingBalance = null;
        account4.currencycodeOverdraftLimit = null;
        account4.currencyCodeMainBalance = null;
        account4.currencyCodeAvailableBalance = 'CLP';
        account4.countryName = 'Chile';
        account4.country = 'CL';
        account4.codigoEmisora = '6';
        account4.codigoCuenta = '6861';
        account4.codigoCorporate = '2960';
        account4.codigoBic = 'BSCHCLRMABC';
        account4.branch = 'ABC';
        account4.bic = 'BSCH';
        account4.bankName = 'BANCO DE CHILE SAN';
        account4.amountWithholdingBalance = null;
        account4.amountOverdraftLimit = null;
        account4.amountMainBalance = 2.0;
        account4.amountAvailableBalance = 10001.0;
        account4.aliasEntidad = '';
        account4.aliasCuentaPerfilado = null;
        account4.alias = 'CtaCLP018138GTT';
        account4.accountId = null;
        response.add(account4);
        WRAPPER_AccountList.AccountDetails account5 = new WRAPPER_AccountList.AccountDetails();
        account5.valueDate = '2020-03-03T00:00:00.000+0000';
        account5.type = null;
        account5.transactionList = null;
        account5.subsidiaryName = 'CORPORATE GTS 1 ES';
        account5.status = null;
        account5.paisbic = 'ES';
        account5.locatorbic = 'M0';
        account5.lastUpdateOverdraftLimit = null;
        account5.lastupdateMainBalance = null;
        account5.lastUpdateAvailableBalance = '2020-03-03T00:00:00.000+0000';
        account5.lastudpateWithholdingBalance = null;
        account5.lastTransaction = null;
        account5.internationalPaymentsAllowed = null;
        account5.idType = 'BBA';
        account5.hasSwiftPayment = null;
        account5.displayNumber = 'ES4800490000000000000000';
        account5.description = null;
        account5.currencyCodeWithholdingBalance = null;
        account5.currencycodeOverdraftLimit = null;
        account5.currencyCodeMainBalance = null;
        account5.currencyCodeAvailableBalance = 'EUR';
        account5.countryName = 'Spain';
        account5.country = 'ES';
        account5.codigoEmisora = '105048';
        account5.codigoCuenta = '6902';
        account5.codigoCorporate = '2938';
        account5.codigoBic = 'BSCHESM0XXX';
        account5.branch = 'XXX';
        account5.bic = 'BSCH';
        account5.bankName = 'GTS SANTANDER ES PRUEBAS';
        account5.amountWithholdingBalance = null;
        account5.amountOverdraftLimit = null;
        account5.amountMainBalance = 1000000.0;
        account5.amountAvailableBalance = 1000001.0;
        account5.aliasEntidad = '';
        account5.aliasCuentaPerfilado = null;
        account5.alias = 'prueba4        ';
        account5.accountId = null;
        response.add(account5);
        WRAPPER_AccountList.AccountDetails account6 = new WRAPPER_AccountList.AccountDetails();
        account6.valueDate = '2020-03-03T00:00:00.000+0000';
        account6.type = null;
        account6.transactionList = null;
        account6.subsidiaryName = 'CORPORATE GTS 1 ES';
        account6.status = null;
        account6.paisbic = 'ES';
        account6.locatorbic = 'M0';
        account6.lastUpdateOverdraftLimit = null;
        account6.lastupdateMainBalance = null;
        account6.lastUpdateAvailableBalance = '2020-03-03T00:00:00.000+0000';
        account6.lastudpateWithholdingBalance = null;
        account6.lastTransaction = null;
        account6.internationalPaymentsAllowed = null;
        account6.idType = 'BBA';
        account6.hasSwiftPayment = null;
        account6.displayNumber = 'ES9000490000000000000011';
        account6.description = null;
        account6.currencyCodeWithholdingBalance = null;
        account6.currencycodeOverdraftLimit = null;
        account6.currencyCodeMainBalance = null;
        account6.currencyCodeAvailableBalance = 'EUR';
        account6.countryName = 'Spain';
        account6.country = 'ES';
        account6.codigoEmisora = '105048';
        account6.codigoCuenta = '6901';
        account6.codigoCorporate = '2938';
        account6.codigoBic = 'BSCHESM0XXX';
        account6.branch = 'XXX';
        account6.bic = 'BSCH';
        account6.bankName = 'GTS SANTANDER ES PRUEBAS';
        account6.amountWithholdingBalance = null;
        account6.amountOverdraftLimit = null;
        account6.amountMainBalance = 1000000.0;
        account6.amountAvailableBalance = 1000001.0;
        account6.aliasEntidad = '';
        account6.aliasCuentaPerfilado = null;
        account6.alias = '';
        account6.accountId = null;
        response.add(account6);
        WRAPPER_AccountList.AccountDetails account7 = new WRAPPER_AccountList.AccountDetails();
        account7.valueDate = null;
        account7.type = null;
        account7.transactionList = null;
        account7.subsidiaryName = 'CORPORATE GTS 1 ES';
        account7.status = null;
        account7.paisbic = 'ES';
        account7.locatorbic = 'MM';
        account7.lastUpdateOverdraftLimit = null;
        account7.lastupdateMainBalance = null;
        account7.lastUpdateAvailableBalance = '';
        account7.lastudpateWithholdingBalance = null;
        account7.lastTransaction = null;
        account7.internationalPaymentsAllowed = null;
        account7.idType = 'BBA';
        account7.hasSwiftPayment = null;
        account7.displayNumber = 'ES6000491500051234567891';
        account7.description = null;
        account7.currencyCodeWithholdingBalance = null;
        account7.currencycodeOverdraftLimit = null;
        account7.currencyCodeMainBalance = null;
        account7.currencyCodeAvailableBalance = null;
        account7.countryName = 'Spain';
        account7.country = 'ES';
        account7.codigoEmisora = '7';
        account7.codigoCuenta = '6804';
        account7.codigoCorporate = '2938';
        account7.codigoBic = 'BSCHESMMXXX';
        account7.branch = 'XXX';
        account7.bic = 'BSCH';
        account7.bankName = 'BANCO SANTANDER ESPANA';
        account7.amountWithholdingBalance = null;
        account7.amountOverdraftLimit = null;
        account7.amountMainBalance = 0.0;
        account7.amountAvailableBalance = null;
        account7.aliasEntidad = '';
        account7.aliasCuentaPerfilado = null;
        account7.alias = 'test2020 v2    ';
        account7.accountId = null;
        response.add(account7);
        WRAPPER_AccountList.AccountDetails account8 = new WRAPPER_AccountList.AccountDetails();
        account8.valueDate = '2020-03-03T00:00:00.000+0000';
        account8.type = null;
        account8.transactionList = null;
        account8.subsidiaryName = 'CORPORATE GTS 3 AR';
        account8.status = null;
        account8.paisbic = 'AR';
        account8.locatorbic = 'BA';
        account8.lastUpdateOverdraftLimit = null;
        account8.lastupdateMainBalance = null;
        account8.lastUpdateAvailableBalance = '2020-03-03T00:00:00.000+0000';
        account8.lastudpateWithholdingBalance = null;
        account8.lastTransaction = null;
        account8.internationalPaymentsAllowed = null;
        account8.idType = 'BBA';
        account8.hasSwiftPayment = null;
        account8.displayNumber = '0000000000288006GTS';
        account8.description = null;
        account8.currencyCodeWithholdingBalance = null;
        account8.currencycodeOverdraftLimit = null;
        account8.currencyCodeMainBalance = null;
        account8.currencyCodeAvailableBalance = 'USD';
        account8.countryName = 'Argentina';
        account8.country = 'AR';
        account8.codigoEmisora = '104482';
        account8.codigoCuenta = '6864';
        account8.codigoCorporate = '2961';
        account8.codigoBic = 'BSCHARBACAI';
        account8.branch = 'CAI';
        account8.bic = 'BSCH';
        account8.bankName = 'BANCO SANTANDER RIO S.A.';
        account8.amountWithholdingBalance = null;
        account8.amountOverdraftLimit = null;
        account8.amountMainBalance = 123103.0;
        account8.amountAvailableBalance = 10001.0;
        account8.aliasEntidad = '';
        account8.aliasCuentaPerfilado = null;
        account8.alias = '';
        account8.accountId = null;
        response.add(account8);
        WRAPPER_AccountList.AccountDetails account9 = new WRAPPER_AccountList.AccountDetails();
        account9.valueDate = '2020-03-03T00:00:00.000+0000';
        account9.type = null;
        account9.transactionList = null;
        account9.subsidiaryName = 'CORPORATE GTS 3 AR';
        account9.status = null;
        account9.paisbic = 'AR';
        account9.locatorbic = 'BA';
        account9.lastUpdateOverdraftLimit = null;
        account9.lastupdateMainBalance = null;
        account9.lastUpdateAvailableBalance = '2020-03-03T00:00:00.000+0000';
        account9.lastudpateWithholdingBalance = null;
        account9.lastTransaction = null;
        account9.internationalPaymentsAllowed = null;
        account9.idType = 'BBA';
        account9.hasSwiftPayment = null;
        account9.displayNumber = 'EX00720194005000096557GTS';
        account9.description = null;
        account9.currencyCodeWithholdingBalance = null;
        account9.currencycodeOverdraftLimit = null;
        account9.currencyCodeMainBalance = null;
        account9.currencyCodeAvailableBalance = 'EUR';
        account9.countryName = 'Argentina';
        account9.country = 'AR';
        account9.codigoEmisora = '104992';
        account9.codigoCuenta = '6863';
        account9.codigoCorporate = '2961';
        account9.codigoBic = 'BSCHARBAXXX';
        account9.branch = 'XXX';
        account9.bic = 'BSCH';
        account9.bankName = 'BANCO SANTANDER RIO IC';
        account9.amountWithholdingBalance = null;
        account9.amountOverdraftLimit = null;
        account9.amountMainBalance = 30.0;
        account9.amountAvailableBalance = 10001.0;
        account9.aliasEntidad = '';
        account9.aliasCuentaPerfilado = null;
        account9.alias = 'Test 3.2       ';
        account9.accountId = null;
        response.add(account9);
        WRAPPER_AccountList.AccountDetails account10 = new WRAPPER_AccountList.AccountDetails();
        account10.valueDate = '2020-03-03T00:00:00.000+0000';
        account10.type = null;
        account10.transactionList = null;
        account10.subsidiaryName = 'CORPORATE GTS 2 CL';
        account10.status = null;
        account10.paisbic = 'CL';
        account10.locatorbic = 'RM';
        account10.lastUpdateOverdraftLimit = null;
        account10.lastupdateMainBalance = null;
        account10.lastUpdateAvailableBalance = '2020-03-03T00:00:00.000+0000';
        account10.lastudpateWithholdingBalance = null;
        account10.lastTransaction = null;
        account10.internationalPaymentsAllowed = null;
        account10.idType = 'BBA';
        account10.hasSwiftPayment = null;
        account10.displayNumber = '00350401005100018138GTS';
        account10.description = null;
        account10.currencyCodeWithholdingBalance = null;
        account10.currencycodeOverdraftLimit = null;
        account10.currencyCodeMainBalance = null;
        account10.currencyCodeAvailableBalance = 'CLP';
        account10.countryName = 'Chile';
        account10.country = 'CL';
        account10.codigoEmisora = '6';
        account10.codigoCuenta = '6861';
        account10.codigoCorporate = '2960';
        account10.codigoBic = 'BSCHCLRMABC';
        account10.branch = 'ABC';
        account10.bic = 'BSCH';
        account10.bankName = 'BANCO DE CHILE SAN';
        account10.amountWithholdingBalance = null;
        account10.amountOverdraftLimit = null;
        account10.amountMainBalance = 2.0;
        account10.amountAvailableBalance = 10001.0;
        account10.aliasEntidad = '';
        account10.aliasCuentaPerfilado = null;
        account10.alias = 'CtaCLP018138GTT';
        account10.accountId = null;
        response.add(account10);
        WRAPPER_AccountList.AccountDetails account11 = new WRAPPER_AccountList.AccountDetails();
        account11.valueDate = '2020-03-03T00:00:00.000+0000';
        account11.type = null;
        account11.transactionList = null;
        account11.subsidiaryName = 'CORPORATE GTS 1 ES';
        account11.status = null;
        account11.paisbic = 'ES';
        account11.locatorbic = 'M0';
        account11.lastUpdateOverdraftLimit = null;
        account11.lastupdateMainBalance = null;
        account11.lastUpdateAvailableBalance = '2020-03-03T00:00:00.000+0000';
        account11.lastudpateWithholdingBalance = null;
        account11.lastTransaction = null;
        account11.internationalPaymentsAllowed = null;
        account11.idType = 'BBA';
        account11.hasSwiftPayment = null;
        account11.displayNumber = 'ES4800490000000000000000';
        account11.description = null;
        account11.currencyCodeWithholdingBalance = null;
        account11.currencycodeOverdraftLimit = null;
        account11.currencyCodeMainBalance = null;
        account11.currencyCodeAvailableBalance = 'EUR';
        account11.countryName = 'Spain';
        account11.country = 'ES';
        account11.codigoEmisora = '105048';
        account11.codigoCuenta = '6902';
        account11.codigoCorporate = '2938';
        account11.codigoBic = 'BSCHESM0XXX';
        account11.branch = 'XXX';
        account11.bic = 'BSCH';
        account11.bankName = 'GTS SANTANDER ES PRUEBAS';
        account11.amountWithholdingBalance = null;
        account11.amountOverdraftLimit = null;
        account11.amountMainBalance = 1000000.0;
        account11.amountAvailableBalance = 1000001.0;
        account11.aliasEntidad = '';
        account11.aliasCuentaPerfilado = null;
        account11.alias = 'prueba4        ';
        account11.accountId = null;
        response.add(account11);
        WRAPPER_AccountList.AccountDetails account12 = new WRAPPER_AccountList.AccountDetails();
        account12.valueDate = '2020-03-03T00:00:00.000+0000';
        account12.type = null;
        account12.transactionList = null;
        account12.subsidiaryName = 'CORPORATE GTS 1 ES';
        account12.status = null;
        account12.paisbic = 'ES';
        account12.locatorbic = 'M0';
        account12.lastUpdateOverdraftLimit = null;
        account12.lastupdateMainBalance = null;
        account12.lastUpdateAvailableBalance = '2020-03-03T00:00:00.000+0000';
        account12.lastudpateWithholdingBalance = null;
        account12.lastTransaction = null;
        account12.internationalPaymentsAllowed = null;
        account12.idType = 'BBA';
        account12.hasSwiftPayment = null;
        account12.displayNumber = 'ES9000490000000000000011';
        account12.description = null;
        account12.currencyCodeWithholdingBalance = null;
        account12.currencycodeOverdraftLimit = null;
        account12.currencyCodeMainBalance = null;
        account12.currencyCodeAvailableBalance = 'EUR';
        account12.countryName = 'Spain';
        account12.country = 'ES';
        account12.codigoEmisora = '105048';
        account12.codigoCuenta = '6901';
        account12.codigoCorporate = '2938';
        account12.codigoBic = 'BSCHESM0XXX';
        account12.branch = 'XXX';
        account12.bic = 'BSCH';
        account12.bankName = 'GTS SANTANDER ES PRUEBAS';
        account12.amountWithholdingBalance = null;
        account12.amountOverdraftLimit = null;
        account12.amountMainBalance = 1000000.0;
        account12.amountAvailableBalance = 1000001.0;
        account12.aliasEntidad = '';
        account12.aliasCuentaPerfilado = null;
        account12.alias = '';
        account12.accountId = null;
        response.add(account12);
        return response;
    }
    
    
    /*------------------------------------------------------------
Author:         Bea Hill
Company:        Deloitte
Description:   	Get names of users for list of globalUserIds
History 
<Date>          <Author>            <Change Description>
29/10/2019		Bea Hill       		Intial Version
04/11/2020      Bea Hill            Moved from CNT_PAY_PaymentOptions to CNT_Payments.
------------------------------------------------------------*/
    @AuraEnabled
    public static Map<String, String> getUserMap(List<String> idList) {
        Map<String, String> userMap = new Map<String, String>();
        try{
            if(idList != null && idList.size() > 0) {                
                List<User> userList = CNT_UserData.getUsersDataGlobal(idList);
                if (userList != null) {
                    for(User user : userList) {
                        String userName = user.Name;
                        String globalUserId = user.USER_TXT_GlobalId__c;
                        if( userName!= null && globalUserId != null) {
                            if (userMap.get(globalUserId) == null) {
                                userMap.put(globalUserId, userName);
                            }
                        }
                    } 
                }  
            }
        } catch(Exception e){
            System.debug('CNT_Payments.getUserMap: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            return userMap;
        }       
        return userMap;
    }
    
    /*------------------------------------------------------------
Author:         Bea Hill
Company:        Deloitte
Description:   	Get names of users for list of globalUserIds
History 
<Date>          <Author>            <Change Description>
29/10/2019		Bea Hill       		Intial Version
04/11/2020      Bea Hill            Moved from CNT_PAY_PaymentOptions to CNT_Payments.
------------------------------------------------------------*/
    @AuraEnabled
    public static String getTrackingStep(String status, String reason) {
        String step = '';
        try{
            if(status != null && reason != null) {
                Payment_Step__mdt paymentTrackingStep = [SELECT toLabel(PAY_PCK_TrackingStep__c) FROM Payment_Step__mdt WHERE  PAY_PCK_Reason__c =: reason AND PAY_PCK_Status__c =: status LIMIT 1];
                if(paymentTrackingStep != null) {
                    step = paymentTrackingStep.PAY_PCK_TrackingStep__c;
                }
            }
        } catch(Exception e){
            System.debug('CNT_Payments.getTrackingStep: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            return step;
        }       
        return step;
    }
}