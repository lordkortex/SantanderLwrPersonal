/*----------------------------------------------------------------------------------
Author:         R. Alexander Cervino
Company:        Deloitte
Description:    Controller of CNT_MRTrackerSearch
Test Class:     CNT_MRTrackerSearch_Testy
History
<Date>          <Author>        <Description>
21/01/2020      R. Alexander Cervino     Initial version
----------------------------------------------------------------------------------*/
public with sharing class CNT_MRTrackerSearch {
    
    /*----------------------------------------------------------------------------------
    Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to get the countries ISO2
    History
    <Date>          <Author>        <Description>
    10/12/2019      R. Alexander Cervino     Initial version
    ----------------------------------------------------------------------------------*/
    
    @AuraEnabled(cacheable=true)
    public static List<String> getISO2Values() {
        try{
            if (Cache.Org.contains('serializedToken')) {
                System.debug('Cache.Org.token : ' + Cache.Org.get('serializedToken'));
            }
            if (Cache.Org.contains('data')) {
                System.debug('Cache.Org data : ' + Cache.Org.get('data'));
            }
            return Global_Utilities.getISO2Values();
            
        }catch(Exception e){throw new AuraHandledException('The following exception has occurred: '+ e.getMessage());}
        
    }
    
    /*----------------------------------------------------------------------------------
    Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to get the countries ISO2
    History
    <Date>          <Author>        <Description>
    12/02/2020      R. Alexander Cervino     Initial version
    ----------------------------------------------------------------------------------*/
    
    @AuraEnabled(cacheable=true)
    public static List<String> getStatus() {
        List<String> res = new List<String>();
        try{
            system.debug('>>> at mr tracker' );
            res = Global_Utilities.getStatuses();
            
        }catch(Exception e){throw new AuraHandledException('The following exception has occurred: '+ e.getMessage());}
        return res;
    }
    
    /*----------------------------------------------------------------------------------
    Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to get the account Numbers
    History
    <Date>          <Author>        <Description>
    22/01/2020      R. Alexander Cervino     Initial version
    ----------------------------------------------------------------------------------*/
    
    @AuraEnabled
    public static String getAccounts() {
        try{
            CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('AccountService');
            String response = Global_IntegrationWrapper.launchHTTP('',configWs.CNT_Endpoint__c,configWs.CNT_HTTPMethod__c);                    
            return response;            
        }catch(Exception e){throw new AuraHandledException('The following exception has occurred: '+ e.getMessage());}
    }
    
    /*----------------------------------------------------------------------------------
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Method to get the account numbers and payments for the given user
    History
    <Date>          <Author>            <Description>
    07/07/2020      Guillermo Giral     Initial version
    ----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static WRAPPER_PaymentsTracker getAccountsAndPayments() {
        try{
            CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('CNT_PaymentsTracker');
            List<User> user = [SELECT Id, USER_country__c, USER_TXT_BIC__c FROM User WHERE id =: UserInfo.getUserId()];
            
            String response = Global_IntegrationWrapper.launchHTTP('',configWs.CNT_Endpoint__c,configWs.CNT_HTTPMethod__c);
            System.debug('Service response: ' + response);
            if(String.isNotBlank(response)){
                WRAPPER_PaymentsTracker payments = WRAPPER_PaymentsTracker.parse(response);
                
                payments = formatPaymentAmounts(payments);
                payments = formatPaymentDates(payments);
                
                payments = removePaymentsNoAccess(payments);
                
                payments.accountsDataList[0].canUserSeePaymentsTracker = canUserSeePaymentsTracker(payments);
                payments.accountsDataList[0].canUserSeeGP = canUserSeeGlobalPosition(payments);
                
				                
                
                return payments;   
            }   
            return null;        
        }catch(Exception e){
            throw new AuraHandledException('The following exception has occurred: '+ e.getMessage());
        }
    }
    
    /*------------------------------------------------------------
    Author:         Diego Asis
    Company:        Deloitte
    Description:   	Get Welcome Pack checkbox value from user
    History 
    <Date>          <Author>                <Change Description>
    05/03/2019		Diego Asis  			Intial Version
    ------------------------------------------------------------*/
    
    @AuraEnabled 
    public static Map<String, boolean> getIsCashNexus(){
        Map<String, boolean> userData = new Map <String, boolean>();
        
        try{
            Id userId = UserInfo.getUserId();
            User isCashNexus = [SELECT Id, USER_CHK_CashNexus__c, USER_TXT_BIC__c,USER_CHK_TermsConditions__c  FROM User WHERE Id =: userId];
            System.debug(userData);
            System.debug(isCashNexus);
            
            if(!userData.containsKey('isCashNexusUser')){ 
                if(isCashNexus.USER_CHK_CashNexus__c){
                    userData.put('isCashNexusUser', true); 
                }
                else{
                    userData.put('isCashNexusUser', false);
                    System.debug('entro1');
                    if(!userData.containsKey('BIC')){ 
                        if(isCashNexus.USER_TXT_BIC__c != '') {
                            String bicCountry = isCashNexus.USER_TXT_BIC__c.substring(4, 6);
                            System.debug(bicCountry);
                            
                            List<String> countries = new List<String>();
                            countries.add('GB');
                            countries.add('ES');
                            countries.add('BR');
                            countries.add('KY');
                            countries.add('LU');
                            countries.add('PL');
                            countries.add('CL');
                            countries.add('MX');
                            countries.add('PT');
                            System.debug('entro2');
                            
                            if(countries.contains(bicCountry)) {
                                userData.put('BIC', true);
                                if(bicCountry == 'GB'){ 
                                    userData.put('GB', true);
                                }
                                else if(bicCountry == 'ES'){
                                    userData.put('ES', true);
                                }
                                else if(bicCountry == 'PL'){
                                    userData.put('PL', true);
                                }
                                else if(bicCountry == 'CL'){
                                    userData.put('CL', true);
                                }
                                else if(bicCountry == 'MX'){
                                    userData.put('MX', true);
                                }else if(bicCountry == 'PT'){
                                    userData.put('PT', true);
                                }
                                else if(bicCountry == 'BR' || bicCountry == 'KY' || bicCountry == 'LU'){
                                    userData.put('Other', true);
                                }
                            } else {
                                userData.put('BIC', false);
                            }
                        } else {
                            userData.put('BIC', false);
                        }              
                    }
                }                
            }
            
            if(!userData.containsKey('agreedTerms')){ 
                if(isCashNexus.USER_CHK_TermsConditions__c){
                    userData.put('agreedTerms', true); 
                }
                else{
                    userData.put('agreedTerms', false);   
                }                
            }
        }
        catch(Exception e ){throw new AuraHandledException('The following exception has occurred: ' + e.getMessage());}
        
        return userData;
    }
    
    
    /*------------------------------------------------------------
    Author:         Diego Asis
    Company:        Deloitte
    Description:   	Get Welcome Pack checkbox value from user
    History 
    <Date>          <Author>                <Change Description>
    05/03/2019		Diego Asis  			Intial Version
    ------------------------------------------------------------*/
    
    @AuraEnabled 
    public static Boolean getCheckboxWelcomePack (){
        
        Boolean ok = false;
        List<User> lstUser = new List<User>();
        Id userId = UserInfo.getUserId();
        
        try{
            lstUser = [SELECT Id, USER_CHK_welcomePack__c FROM User WHERE Id=:userId LIMIT 1];
            
            if(lstUser != null){
                ok = lstUser[0].USER_CHK_welcomePack__c;
            }  
        } catch(Exception e ){throw new AuraHandledException('The following exception has occurred: ' + e.getMessage());}
        
        return ok;
    }
    
    /*------------------------------------------------------------
    Author:          R. Cerviño
    Company:        Deloitte
    Description:   	Method to download all payments 
    History 
    <Date>          <Author>                <Change Description>
    05/03/2019		 R. Cerviño  			Intial Version
    ------------------------------------------------------------*/
    
    @AuraEnabled 
    public static String downloadAll (String body){
        try{
            CNT_DownloadAllPayments cnt=new CNT_DownloadAllPayments(body);
            cnt.execute();
            return cnt.getOutput();
        } catch(Exception e ){throw new AuraHandledException('The following exception has occurred: ' + e.getMessage());}
    }
    
    /*------------------------------------------------------------
    Author:         R. Cerviño
    Company:        Deloitte
    Description:   	Method to remove a file
    History 
    <Date>          <Author>                <Change Description>
    05/03/2019		 R. Cerviño  			Intial Version
    ------------------------------------------------------------*/
    
    @AuraEnabled 
    public static void removeFile (String id){
        try{
            CNT_SwiftPaymentTableRow.removeMT103(id);
        } catch(Exception e ){ throw new AuraHandledException('The following exception has occurred: ' + e.getMessage());}
    }
    
    /*------------------------------------------------------------
    Author:         Shahad Naji
    Company:        Deloitte
    Description:   	Method to decrypt data
    History 
    <Date>          <Author>                <Change Description>
    01/04/2020		Shahad Naji   			Intial Version
    ------------------------------------------------------------*/
    @AuraEnabled
    public static String decryptData(String str){
        return Global_Utilities.decryptData(str);
    }
    
    /*------------------------------------------------------------
    Author:         R. Cerviño
    Company:        Deloitte
    Description:   	Method to retriebe ll currencies
    History 
    <Date>          <Author>                <Change Description>
    06/04/2020		 R. Cerviño  			Intial Version
    ------------------------------------------------------------*/
    
    @AuraEnabled(cacheable=true)
    public static List<String> getCurrencies (){
        try{
            
            /*List<Currencytype> curr=new List<CurrencyType>([SELECT ISOCode FROM CurrencyType]);
                List<String> res= new List<String>();
                if(curr.isEmpty()==false){
                    for(CurrencyType c : curr){
                    res.add(c.ISOCode);
                }
			}*/
            
            return Global_Utilities.getISO3Values();
        } catch(Exception e ){ throw new AuraHandledException('The following exception has occurred: ' + e.getMessage());}
    }
    
    /*----------------------------------------------------------------------------------
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Method to format the amounts based on the user preferences
    History
    <Date>			<Author>		            <Description>
    13/07/2020		Guillermo Giral             Initial version
    ----------------------------------------------------------------------------------*/
    public static WRAPPER_PaymentsTracker formatPaymentAmounts(WRAPPER_PaymentsTracker input){
        // Get the user number format
        String numberFormat = Global_Utilities.getUserNumberFormat(UserInfo.getUserId());
        if(numberFormat == null || numberFormat == ''){
            numberFormat = '###.###.###,##';
        }
        
        // Fromat the dates and the numbers
        for(WRAPPER_PaymentsTracker.paymentsList t : input.paymentsList){
            if(numberFormat == '###.###.###,##' || numberFormat == '###,###,###.##'){
                if(t.paymentDetail.paymentAmount != null && t.paymentDetail.paymentAmount.amount != null){
                    CNT_FormattedNumber amount = new CNT_FormattedNumber(t.paymentDetail.paymentAmount.amount, numberFormat);
                    t.paymentDetail.paymentAmount.paymentAmount_FormattedWholeNumber = amount.wholeNumber_Formatted;
                    t.paymentDetail.paymentAmount.paymentAmount_FormattedDecimalPart = amount.decimalPart_Formatted;
                    t.paymentDetail.paymentAmount.paymentAmount_FormattedEntirePart = amount.entirePart_Formatted;
                } else {
                    t.paymentDetail.paymentAmount.paymentAmount_FormattedWholeNumber = '';
                    t.paymentDetail.paymentAmount.paymentAmount_FormattedDecimalPart = '';
                    t.paymentDetail.paymentAmount.paymentAmount_FormattedEntirePart = '';
                }
            }
        }
        return input;
    }
    
    
    public static WRAPPER_PaymentsTracker formatPaymentDates(WRAPPER_PaymentsTracker input){
        try{
            String format = Global_Utilities.getUserDateFormat(UserInfo.getUserId());
            if(format == null || format == ''){
                format='dd/MM/yyyy';
            }
            
            for(WRAPPER_PaymentsTracker.paymentsList p : input.paymentsList){
                System.debug('llega 1');
                String vDateOriginal=p.paymentDetail.valueDate;
                String sDateOriginal=p.paymentDetail.statusDate;
                if(vDateOriginal!= null && vDateOriginal !=''){
                    Date d=Date.valueOf(vDateOriginal);
                    Datetime dt = Datetime.newInstanceGMT(d.year(), d.month(),d.day());
                    p.paymentDetail.valueDate = dt.formatGmt(format);
                }
                System.debug('llega 2');
                if(sDateOriginal!= null && sDateOriginal !=''){
                    System.debug('llega 3');
                    String formattedDate = String.ValueofGmt(DateTime_Utilities.stringToDateTimeStep(sDateOriginal,0));
                    
                    Date f=Date.valueOf(formattedDate.substring(0,10));
                    Datetime ft = Datetime.newInstanceGMT(f.year(), f.month(), f.day());
                    String firstPart =ft.formatGmt(format);
                    
                    p.paymentDetail.statusDate = firstPart +' - ' +formattedDate.substring(11);
                    System.debug('llega 4');
                }
            }
            
        }catch(Exception e){
            System.debug('CNT_IPTDetailParent.getReason: ' + e.getMessage());
        }
        
        return input;
    }
    
    /*----------------------------------------------------------------------------------------------------------------------------------------
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Check whether any of the accounts can be displayed in the window
    History
    <Date>			<Author>		        <Description>
    14/09/2020      Guillermo Giral             Initial Version
    -----------------------------------------------------------------------------------------------------------------------------------------*/
    private static Boolean canUserSeeGlobalPosition (WRAPPER_PaymentsTracker response){
        Boolean canSeeGlobalPosition = false;
        // Loop through every of the accounts to check if the user has permission to see any of the balances
        for(WRAPPER_PaymentsTracker.AccountsDataList cuenta : response.accountsDataList)
        {
            if(cuenta.balanceAllowed != null && cuenta.balanceAllowed == true){
                canSeeGlobalPosition = true;
                break;
            }
        }
        
        return canSeeGlobalPosition;
    }

    /*----------------------------------------------------------------------------------------------------------------------------------------
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Check whether any of the accounts can be displayed payments tracker
    History
    <Date>			<Author>		        <Description>
    14/09/2020      Guillermo Giral             Initial Version
    -----------------------------------------------------------------------------------------------------------------------------------------*/
    private static Boolean canUserSeePaymentsTracker (WRAPPER_PaymentsTracker response){
        Boolean canSeePaymentsTracker = false;
        // Loop through every of the accounts to check if the user has permission to see any of the balances
        for(WRAPPER_PaymentsTracker.AccountsDataList cuenta : response.accountsDataList)
        {
            if(cuenta.internationalPaymentsAllowed != null && cuenta.internationalPaymentsAllowed == true){
                canSeePaymentsTracker = true;
                break;
            }
        }
        
        return canSeePaymentsTracker;
    }
    
    /*----------------------------------------------------------------------------------------------------------------------------------------
    Author:         Adrian Munio
    Company:        Deloitte
    Description:    Method to remove any of the accounts that should not be displayed because they don't have access to them.
    History
    <Date>			<Author>		        <Description>
    22/09/2020      Adrian Munio            Initial Version
    -----------------------------------------------------------------------------------------------------------------------------------------*/
    private static WRAPPER_PaymentsTracker removePaymentsNoAccess (WRAPPER_PaymentsTracker response){
        System.debug('CNT_MRTrackerSearch.removePaymentsNoAccess >>>>> START');
        //Loop through every of the accounts to check if the user has permissions to see any of the balances
        //If not, we will remove it from the list to don't show it on the screen.
        
        List<WRAPPER_PaymentsTracker.AccountsDataList> newListAccounts = new List<WRAPPER_PaymentsTracker.accountsDataList>();
		List<WRAPPER_PaymentsTracker.PaymentsList> newListPayments = new List<WRAPPER_PaymentsTracker.PaymentsList>();
        List<String> accountsNames = new List<String>();
        
        for(WRAPPER_PaymentsTracker.AccountsDataList cuenta : response.accountsDataList){
            if((cuenta.internationalPaymentsAllowed != null) && (cuenta.internationalPaymentsAllowed)){
                newListAccounts.add(cuenta);
                //AM - 20/10/2020 - INC 679 OT Payments 15 dias
                if(!cuenta.accountIdList.isEmpty()){
                    for(WRAPPER_PaymentsTracker.AccountIdList accIdList : cuenta.accountIdList){
                        accountsNames.add(accIdList.accountId);
                    }
                }
                //accountsNames.add(cuenta.displayNumber);
            }
        }
        for(WRAPPER_PaymentsTracker.PaymentsList payment : response.PaymentsList){
            //AM - 20/10/2020 - INC 679 OT Payments 15 dias
            //if((!accountsNames.isEmpty()) && accountsNames.contains(payment.paymentDetail.originatorData.originatorName)){  
            if((!accountsNames.isEmpty()) && accountsNames.contains(payment.paymentDetail.originatorData.originatorAccount.AccountId)){
            	newListPayments.add(payment);
            }
        }
        
        
        System.debug('CNT_MRTrackerSearch.removePaymentsNoAccess >>>>> OLD LIST ACCOUNTS: ' + response.AccountsDataList.size());
        System.debug('CNT_MRTrackerSearch.removePaymentsNoAccess >>>>> NEW LIST ACCOUNTS: ' + newListAccounts.size());
        response.AccountsDataList = newListAccounts;
        
        System.debug('CNT_MRTrackerSearch.removePaymentsNoAccess >>>>> OLD LIST PAYMENTS: ' + response.PaymentsList.size());
        System.debug('CNT_MRTrackerSearch.removePaymentsNoAccess >>>>> NEW LIST PAYMENTS: ' + newListPayments.size());
        response.PaymentsList = newListPayments;
        
        System.debug('CNT_MRTrackerSearch.removePaymentsNoAccess >>>>> END');
        return response;
    }

    /*----------------------------------------------------------------------------------
    Author:         Adrian Munio
    Company:        Deloitte
    Description:    Method to obtain the user Country from the current user.
    History
    <Date>			<Author>		            <Description>
    05/11/2020		Adrian Munio                Initial version
    ----------------------------------------------------------------------------------*/
    @AuraEnabled(cacheable=true)
    public static String getUserUETR (String userId){
        System.debug('CNT_MRTrackerSearch.getUserCountry >>>>> START');
        try{
            List<User> currentUser = [SELECT Id, USER_TXT_BIC__c, USER_country__c, USER_TXT_GlobalId__c FROM User WHERE Id =: userId LIMIT 1];
            
            //If the user country is Portugal and comes from SSO with and uetr cached we will redirect him to Search uetr screen.
            if(currentUser != null && !currentUser.isEmpty() && currentUser[0].USER_country__c == 'PT'){
                //Cache.Session.put('searchUETR', '5c957950-12cc-41eb-b06e-f9fdc18b5591'); //Test Line
                String uetr;
                if(Cache.Session.contains('searchUETR')){
                    uetr = (String) Cache.Session.get('searchUETR');
                    Cache.Session.remove('searchUETR');
                }
                return uetr;
            }
        }catch(Exception e){
            System.debug('CNT_GlobalPositionController.getUserCountry: ' + e.getMessage());
        }
        return null;
    }
}