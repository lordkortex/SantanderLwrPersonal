/*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Controller class of CMP_TransactionDetails and CMP_TransactionSearch
Test Class:     CNT_TransactionDetails_Test
History
<Date>			<Author>		<Description>
29/01/2020		Shahad Naji     Initial version
----------------------------------------------------------------------------------*/
public class CNT_TransactionDetails {
    
    @AuraEnabled
    public static List<String> lastUpdateCountries {get;set;}
    @AuraEnabled
    public static List<String> endOfDayCountries {get;set;}
    
    @AuraEnabled
    public static List<String> lastUpdateCurrencies {get;set;}
    @AuraEnabled
    public static List<String> endOfDayCurrencies {get;set;}
    
    
    @AuraEnabled
    public static List<String> lastUpdateBanks {get;set;}
    @AuraEnabled
    public static List<String> endOfDayBanks {get;set;}
    
    @AuraEnabled
    public static List<String> lastUpdateAccounts {get;set;}
    @AuraEnabled
    public static List<String> endOfDayAccounts {get;set;}
    
    @AuraEnabled
    public static List<String> transactionCategories {get;set;}
    
    @AuraEnabled
    public static List<WRAPPER_AccountList.AccountDetails> accountList {get;set;}
    
    
    /*------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Initializes Transactions component
History 
<Date>          <Author>            <Change Description>
29/01/2020     Shahad Naji  		Intial Version
------------------------------------------------------------*/
    @AuraEnabled
    public static CNT_TransactionDetails initClass(){
        CNT_TransactionDetails transactionDetails = new CNT_TransactionDetails();
        
        lastUpdateCountries = new List<String>();
        endOfDayCountries = new List<String>();
        lastUpdateCurrencies = new List<String>();
        endOfDayCurrencies = new List<String>();
        lastUpdateBanks = new List<String>();
        endOfDayBanks = new List<String>();
        lastUpdateAccounts = new List<String>();
        endOfDayAccounts = new List<String>();
        transactionCategories = new List<String>();
        
        //returnLastUpdateInformation();
        //returnEndOfDayInformation();
        
        if(!lastUpdateCountries.isEmpty()){
            lastUpdateCountries.sort();
        }
        if(!endOfDayCountries.isEmpty()){
            endOfDayCountries.sort();
        }
        if(!lastUpdateCurrencies.isEmpty()){
            lastUpdateCurrencies.sort();
        }
        if(!endOfDayCurrencies.isEmpty()){
            endOfDayCurrencies.sort();
        }
        if(!lastUpdateBanks.isEmpty()){
            lastUpdateBanks.sort();
        }
        if(!endOfDayBanks.isEmpty()){
            endOfDayBanks.sort();
        }
        if(!lastUpdateAccounts.isEmpty()){
            lastUpdateAccounts.sort();
        }
        if(!endOfDayAccounts.isEmpty()){
            endOfDayAccounts.sort();
        }
        transactionCategories  = CNT_TransactionDetails.getTransactionCategories(); 
        if(!transactionCategories.isEmpty()){
            transactionCategories.sort();
        }
        return transactionDetails;
    }
    
    
        
    /*------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:   	Receives a country ISO Code and returns its country name.
History 
<Date>          <Author>            <Change Description>
29/01/2020		Shahad Naji  		Intial Version
------------------------------------------------------------*/
    @AuraEnabled
    public static String getCountryName(String isoCode){
        String str = '';
        try{
            str = Global_Utilities.getCountryName(isoCode); 
        }catch(Exception e){throw new AuraHandledException('The following exception has occurred: ' + e.getMessage());}
        return str;
    }
    
    /*------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:   	Receives a country ISO Code and returns its currency label
History 
<Date>          <Author>            <Change Description>
29/01/2020		Shahad Naji  		Intial Version
------------------------------------------------------------*/    
     @AuraEnabled
    public static String getCurrencyLabel(String isoCode){
         String str = '';
        try{
            Wrapper_Currency iReturn = new Wrapper_Currency();
            iReturn = Global_Utilities.getCurrencyLabel(isoCode); 
            str = iReturn.iCurrencyName;
        }catch(Exception e){
            throw new AuraHandledException('The following exception has occurred: ' + e.getMessage());
        }
        return str;
    }
    
    /*------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:   	MuleSoft callout 
History 
<Date>          <Author>            <Change Description>
29/01/2020		Shahad Naji  		Intial Version
------------------------------------------------------------
    @AuraEnabled
    public static void returnLastUpdateInformation(){
        try{
            String iUserId = UserInfo.getUserId();
            User iUser = [SELECT Id, USER_TXT_GlobalId__c FROM User WHERE Id =: iUserId LIMIT 1];
            if(iUser != null){
                String aux = '';
                testGit prueba = new testGit();
                aux=prueba.listaCuentas(iUser.USER_TXT_GlobalId__c);
                List<Wrapper_MuleSoft_Classes.Wrapper_GlobalBalance> iData = (List<Wrapper_MuleSoft_Classes.Wrapper_GlobalBalance>) JSON.deserialize(aux,List<Wrapper_MuleSoft_Classes.Wrapper_GlobalBalance>.class);
                for(Wrapper_MuleSoft_Classes.Wrapper_GlobalBalance item : iData){                
                    for(Wrapper_MuleSoft_Classes.Wrapper_Account thisAccount : item.accounts){
                        WRAPPER_AccountList.AccountDetails myAccount = new WRAPPER_AccountList.AccountDetails();
                        
                                                
                        myAccount.country = thisAccount.country;
                        myAccount.countryName = getCountryName(thisAccount.country);
                        myAccount.currencyCodeAvailableBalance = getCurrencyLabel(thisAccount.currencyCodeAvailableBalance);
                        myAccount.displayNumber = thisAccount.displayNumber;
                        myAccount.bankName = thisAccount.bankName;
                        
                        if(lastUpdateCountries != Null){
                            if(!lastUpdateCountries.contains(myAccount.country + ' - ' +  myAccount.countryName)){
                                lastUpdateCountries.add(myAccount.country + ' - ' +  myAccount.countryName);
                            }  
                        }
                        
                        if(lastUpdateAccounts != Null){
                            if(!lastUpdateAccounts.contains(myAccount.country + ' - ' +  myAccount.displayNumber)){
                                lastUpdateAccounts.add(myAccount.country + ' - ' +  myAccount.displayNumber);
                            }  
                        }
                        
                        if(lastUpdateBanks != Null){
                            if(!lastUpdateBanks.contains( myAccount.bankName)){
                                lastUpdateBanks.add(myAccount.bankName);
                            }  
                        }
                        
                        if(lastUpdateCurrencies != Null){
                            if(!lastUpdateCurrencies.contains( myAccount.currencyCodeAvailableBalance)){
                                lastUpdateCurrencies.add(myAccount.currencyCodeAvailableBalance);
                            }  
                        }
                        
                    }
                }
            }
        }catch(Exception e){
            throw new AuraHandledException('The following exception has occurred: ' + e.getMessage());
        } 
    }    */
    
    /*------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:   	MuleSoft callout 
History 
<Date>          <Author>            <Change Description>
29/01/2020		Shahad Naji  		Intial Version
------------------------------------------------------------
    @AuraEnabled
    public static void returnEndOfDayInformation(){
        try{    
            String iUserId = UserInfo.getUserId();
            User iUser = [SELECT Id, USER_TXT_GlobalId__c FROM User WHERE Id =: iUserId LIMIT 1];
            if(iUser != null){
                String aux = '';
                testGit prueba = new testGit();
                aux=prueba.listaCuentasAyer(iUser.USER_TXT_GlobalId__c);
                List<Wrapper_MuleSoft_Classes.Wrapper_GlobalBalance> iData = (List<Wrapper_MuleSoft_Classes.Wrapper_GlobalBalance>) JSON.deserialize(aux,List<Wrapper_MuleSoft_Classes.Wrapper_GlobalBalance>.class);
                for(Wrapper_MuleSoft_Classes.Wrapper_GlobalBalance item : iData){                
                    for(Wrapper_MuleSoft_Classes.Wrapper_Account thisAccount : item.accounts){
                        WRAPPER_AccountList.AccountDetails myAccount = new WRAPPER_AccountList.AccountDetails();
                                                 
                        myAccount.country = thisAccount.country;
                        myAccount.countryName = getCountryName(thisAccount.country);
                        myAccount.currencyCodeAvailableBalance = getCurrencyLabel(thisAccount.currencyCodeAvailableBalance);
                        myAccount.displayNumber = thisAccount.displayNumber;
                        myAccount.bankName = thisAccount.bankName;
                        
                        if(endOfDayCountries != Null){
                            if(!endOfDayCountries.contains(myAccount.country + ' - ' +  myAccount.countryName)){
                                endOfDayCountries.add(myAccount.country + ' - ' +  myAccount.countryName);
                            }  
                        }
                        
                        if(endOfDayAccounts != Null){
                            if(!endOfDayAccounts.contains(myAccount.country + ' - ' +  myAccount.displayNumber)){
                                endOfDayAccounts.add(myAccount.country + ' - ' +  myAccount.displayNumber);
                            }  
                        }
                        
                        if(endOfDayBanks != Null){
                            if(!endOfDayBanks.contains( myAccount.bankName)){
                               endOfDayBanks.add(myAccount.bankName);
                            }  
                        }
                        
                        if(endOfDayCurrencies != Null){
                            if(!endOfDayCurrencies.contains(myAccount.currencyCodeAvailableBalance)){
                                endOfDayCurrencies.add(myAccount.currencyCodeAvailableBalance);
                            }  
                        }
                    }
                }
            }
        }catch(Exception e){
            throw new AuraHandledException('The following exception has occurred: ' + e.getMessage());
        } 
    }*/
    
    /*------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Decrypts URL parameters
History 
<Date>          <Author>            <Change Description>
30/01/2020	Shahad Naji     		Initial version
------------------------------------------------------------*/     
    @AuraEnabled
    public static String decryptData(String str){
        try{ 
            return Global_Utilities.decryptData(str);
        }catch(Exception e){throw new AuraHandledException('The following exception has occurred: ' + e.getMessage());} 
    }
    
   
    /*------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Retrieve Transaction Categories
History 
<Date>          <Author>            <Change Description>
31/01/2020		Shahad Naji     		Initial version
------------------------------------------------------------*/     
    @AuraEnabled
    public static List<String> getTransactionCategories(){
        List<String> lst = new List<String>();
        try{ 
            Schema.DescribeFieldResult field = Transaction_Category__mdt.CAT_PCK_Category__c.getDescribe();
            for (Schema.PicklistEntry f : field.getPicklistValues()){
                lst.add(f.getLabel()); 
            }           
        }catch(Exception e){throw new AuraHandledException('The following exception has occurred: ' + e.getMessage());} 
        return lst;
    }
    
    @AuraEnabled
    public static List<CNT_MovementHistoryExtracController.CNT_MovementHistoryExtractDataWrapper> datafalse() {
        return CNT_MovementHistoryExtracController.generateFalseData();
    }
    
    
}