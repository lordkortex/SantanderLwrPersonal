/*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    CMP_International_Treasury_Management controller
Test Class:     CNT_International_Treasury_Test
History
<Date>			<Author>		<Description>
28/10/2019		Shahad Naji     Initial version
16/12/2019		Shahad Naji		Add a List for currencies and another one for subsidiary
----------------------------------------------------------------------------------*/

public class CNT_International_Treasury_Management {
    
    @AuraEnabled
    public static List<String> countryList {get;set;}
    
    @AuraEnabled
    public static List<String> currencyList {get;set;}
    
    @AuraEnabled
    public static List<String> subsidiaryList {get;set;}
    
    @AuraEnabled
    public static List<WRAPPER_AccountList.AccountDetails> accountList {get;set;}
    //SNJ - 29/04/2020
    @AuraEnabled
    public static List<WRAPPER_AccountList.TipoDeCambio> tipoDeCambioList{get; set;}
    @AuraEnabled
    public static String divisaPrincipal {get; set;}
    @AuraEnabled
    public static String divisaPrincipalUsuario {get; set;}
    @AuraEnabled
    public static String headerLastModifiedDateMain {get; set;}
    

    /*------------------------------------------------------------
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Initializes Global Balance
    History 
    <Date>          <Author>            <Change Description>
    17/12/2019     Shahad Naji  		Intial Version
    08/01/2020		Shahad Naji 		Switch Last update vs End of day

------------------------------------------------------------*/    
    @AuraEnabled(cacheable=true)
    public static CNT_AccountsParent callMulesoft(String iWhen, String iUserId){
    CNT_AccountsParent accountParent =  CNT_AccountsParent.getBalanceData(iWhen,iUserId);
    /*String userCurrency = UserInfo.getDefaultCurrency();
        if(CNT_AccountsParent.currencyList.size() > 0){
            if(!CNT_AccountsParent.currencyList.contains(userCurrency)){
                userCurrency = 'EUR';
                CNT_International_Treasury_Management.setUserCurrency(userCurrency); 
            }
        }*/
        return accountParent;
    }
    /*------------------------------------------------------------
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Initializes Global Balance
    History 
    <Date>          <Author>            <Change Description>
    17/12/2019     Shahad Naji  		Intial Version
    08/01/2020		Shahad Naji 		Switch Last update vs End of day
    ------------------------------------------------------------*/    
    @AuraEnabled
    public static CNT_International_Treasury_Management initClass(String iWhen){
        CNT_International_Treasury_Management obj = new CNT_International_Treasury_Management();
        countryList = new List<String>();
        currencyList = new List<String>();
        subsidiaryList = new List<String>();
        accountList = new List<WRAPPER_AccountList.AccountDetails>();
        divisaPrincipal = '';
        /*  if(iWhen.endsWithIgnoreCase(Label.EndOfDay)){
            returnAccounts(Label.EndOfDay);
        }
        else{
            returnAccounts(Label.LastUpdate);
        }
        */        
        if(!countryList.isEmpty()){
            countryList.sort();
        }
        if(!currencyList.isEmpty()){
            currencyList.sort();
        }
        if(!subsidiaryList.isEmpty()){
            subsidiaryList.sort();
        }
        return obj;
    }
    
    
    
    /*------------------------------------------------------------
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Retrieves the information of the accounts grouped by country
    History 
    <Date>          <Author>            <Change Description>
    17/12/2019     Shahad Naji  		Intial Version
    ------------------------------------------------------------*/    
    @AuraEnabled 
    public static Map<String, List<WRAPPER_AccountList.AccountDetails>> orderByCountry(List<String> iCountries, List<WRAPPER_AccountList.AccountDetails> iAccountList){
        Map<String, List<WRAPPER_AccountList.AccountDetails>> countryAccountMap = new Map<String, List<WRAPPER_AccountList.AccountDetails>>();
        try{
            for(String countryItem : iCountries){
                List<WRAPPER_AccountList.AccountDetails> accountListAux = new  List<WRAPPER_AccountList.AccountDetails>();
                for(WRAPPER_AccountList.AccountDetails accountItem : iAccountList){
                    if(countryItem.equalsIgnoreCase(accountItem.country)){      
                        accountListAux.add(accountItem);
                    }
                }
                countryAccountMap.put(countryItem, accountListAux);  
            }
        }catch(Exception e ){throw new AuraHandledException('The following exception has occurred: ' + e.getMessage());        }
        return countryAccountMap;
    }  
    
    /*------------------------------------------------------------
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Retrieves the information of the accounts grouped by currecy
    History 
    <Date>          <Author>            <Change Description>
    17/12/2019     Shahad Naji  		Intial Version
    ------------------------------------------------------------*/
    @AuraEnabled 
    public static Map<String, List<WRAPPER_AccountList.AccountDetails>> orderByCurrency(List<String> iCurrencies, List<WRAPPER_AccountList.AccountDetails> iAccountList){
        Map<String, List<WRAPPER_AccountList.AccountDetails>> currencyAccountMap = new Map<String, List<WRAPPER_AccountList.AccountDetails>>();
        try{
            for(String currencyItem : iCurrencies){
                List<WRAPPER_AccountList.AccountDetails> accountListAux = new  List<WRAPPER_AccountList.AccountDetails>();
                for(WRAPPER_AccountList.AccountDetails accountItem : iAccountList){
                    if(currencyItem.equalsIgnoreCase(accountItem.currencyCodeAvailableBalance)){      
                        accountListAux.add(accountItem);
                    }
                }
                currencyAccountMap.put(currencyItem, accountListAux);  
            }
        }catch(Exception e ){
            throw new AuraHandledException('The following exception has occurred: ' + e.getMessage());
        }
        return currencyAccountMap;
    }
    /*------------------------------------------------------------
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Retrieves the information of the accounts grouped by subsidiary
    History 
    <Date>          <Author>            <Change Description>
    17/12/2019     Shahad Naji  		Intial Version
    ------------------------------------------------------------*/
    @AuraEnabled 
    public static Map<String, List<WRAPPER_AccountList.AccountDetails>> orderBySubsidiary(List<String> iSubsidiaries, List<WRAPPER_AccountList.AccountDetails> iAccountList){
        Map<String, List<WRAPPER_AccountList.AccountDetails>> subsidiaryAccountMap = new Map<String, List<WRAPPER_AccountList.AccountDetails>>();
        try{
            for(String subsidiaryItem : iSubsidiaries){
                List<WRAPPER_AccountList.AccountDetails> accountListAux = new  List<WRAPPER_AccountList.AccountDetails>();
                for(WRAPPER_AccountList.AccountDetails accountItem : iAccountList){
                    if(subsidiaryItem.equalsIgnoreCase(accountItem.subsidiaryName)){      
                        accountListAux.add(accountItem);
                    }
                }
                subsidiaryAccountMap.put(subsidiaryItem, accountListAux);  
            }
        }catch(Exception e ){throw new AuraHandledException('The following exception has occurred: ' + e.getMessage()); }
        return subsidiaryAccountMap;
    }   
    
    
    
    /*------------------------------------------------------------
    * //Depricated
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Generates dummy account values
    History 
    <Date>          <Author>            <Change Description>
    28/10/2019     Shahad Naji  		Intial Version
    ------------------------------------------------------------*/ 
    @AuraEnabled
    public static List<WRAPPER_AccountList.AccountDetails> generateAccounts(){ 
        
        countryList = new List<String>();
        currencyList = new List<String>();
        subsidiaryList = new List<String>();
        
        
        List<WRAPPER_AccountList.AccountDetails>  accounts = new List<WRAPPER_AccountList.AccountDetails> ();
        WRAPPER_AccountList.AccountDetails ad_1 = new WRAPPER_AccountList.AccountDetails();
        WRAPPER_AccountList.AccountDetails ad_2 = new WRAPPER_AccountList.AccountDetails();
        WRAPPER_AccountList.AccountDetails ad_3 = new WRAPPER_AccountList.AccountDetails();
        ad_1.accountId = 'Spain_'+1;
        ad_1.country = 'ES';
        ad_1.alias = 'Alias Name 1';
        ad_1.subsidiaryName = 'Subsidiary Name 1';
        ad_1.lastUpdateAvailableBalance = DateTime_Utilities.getCurrentUserDateTime();
        ad_1.displayNumber = 'ES26 0110 7298 5555 8888 1589';
        ad_1.bankName = 'Banco Santander';
        ad_1.amountMainBalance = 8343765.17;
        ad_1.amountAvailableBalance = 8045086.17;
        ad_1.currencyCodeAvailableBalance = 'EUR';
        accounts.add(ad_1);
        
        if(!countryList.contains(ad_1.country)){
            countryList.add(ad_1.country);
        }
        
        
        ad_2.accountId = 'Spain_'+2;
        ad_2.country = 'ES';
        ad_2.alias = 'Alias Name 2';
        ad_2.subsidiaryName = 'Subsidiary Name 2';
        ad_2.lastUpdateAvailableBalance = DateTime_Utilities.getCurrentUserDateTime();
        ad_2.displayNumber = 'ES26 0110 7298 5555 8888 1589';
        ad_2.bankName = 'Banco Santander';
        ad_2.amountMainBalance = 9500500.84;
        ad_2.amountAvailableBalance = 7945086.17 ;
        ad_2.currencyCodeAvailableBalance = 'GBP';
        accounts.add(ad_2);
        
        if(!countryList.contains(ad_2.country)){
            countryList.add(ad_2.country);
        }
        
        
        ad_3.accountId = 'Gran_Britain_'+2;
        ad_3.country = 'GB';
        ad_3.alias = 'Alias Name 3';
        ad_3.subsidiaryName = 'Subsidiary Name 3';
        ad_3.lastUpdateAvailableBalance = DateTime_Utilities.getCurrentUserDateTime();
        ad_3.displayNumber = 'GB26 0110 7298 5555 8888 1589';
        ad_3.bankName = 'Banco Santander';
        ad_3.amountMainBalance = 3100700.17;
        ad_3.amountAvailableBalance = 2945086.17 ;
        ad_3.currencyCodeAvailableBalance = 'GBP';
        accounts.add(ad_3);
        
        if(!countryList.contains(ad_3.country)){
            countryList.add(ad_3.country);
        }    
        
        return accounts;
    }
    


    @AuraEnabled
    public static  List<CNT_International_Treasury_Management.CNT_International_Treasury_Management_WRAPPER> pruebaList (){
        CNT_International_Treasury_Management obj = new CNT_International_Treasury_Management();
        countryList = new List<String>();
        currencyList = new List<String>();
        subsidiaryList = new List<String>();
        accountList = new List<WRAPPER_AccountList.AccountDetails>();

        List<CNT_International_Treasury_Management.CNT_International_Treasury_Management_WRAPPER> data = new List<CNT_International_Treasury_Management.CNT_International_Treasury_Management_WRAPPER>();
        
        List<WRAPPER_AccountList.AccountDetails>  accountList = new List<WRAPPER_AccountList.AccountDetails> ();
        WRAPPER_AccountList.AccountDetails ad_1 = new WRAPPER_AccountList.AccountDetails();
        WRAPPER_AccountList.AccountDetails ad_2 = new WRAPPER_AccountList.AccountDetails();
        WRAPPER_AccountList.AccountDetails ad_3 = new WRAPPER_AccountList.AccountDetails();
        ad_1.accountId = 'Spain_'+1;
        ad_1.country = 'ES';
        ad_1.countryName = 'Spain';
        ad_1.alias = 'Alias Name 1';
        ad_1.subsidiaryName = 'Subsidiary Name 1';
        ad_1.lastUpdateAvailableBalance = '2015-11-04T23:00:00.000Z';
        ad_1.displayNumber = 'ES26 0110 7298 5555 8888 1589';
        ad_1.bankName = 'Banco Santander';
        ad_1.amountMainBalance = 8343765.17;
        ad_1.amountAvailableBalance = 8045086.17;
        ad_1.currencyCodeAvailableBalance = 'EUR';
        accountList.add(ad_1);
        
        if(!countryList.contains(ad_1.country)){
            countryList.add(ad_1.country);
        }
        if(!currencyList.contains(ad_1.currencyCodeAvailableBalance)){
            currencyList.add(ad_1.currencyCodeAvailableBalance);
        }
        if(!subsidiaryList.contains(ad_1.subsidiaryName)){
            subsidiaryList.add(ad_1.subsidiaryName);
        }
        
        
        ad_2.accountId = 'Spain_'+2;
        ad_2.country = 'ES';
        ad_2.countryName = 'Spain';
        ad_2.alias = 'Alias Name 2';
        ad_2.subsidiaryName = 'Subsidiary Name 2';
        ad_2.lastUpdateAvailableBalance = '2015-11-04T23:00:00.000Z';
        ad_2.displayNumber = 'ES26 0110 7298 5555 8888 1589';
        ad_2.bankName = 'Banco Santander';
        ad_2.amountMainBalance = 9500500.84;
        ad_2.amountAvailableBalance = 7945086.17 ;
        ad_2.currencyCodeAvailableBalance = 'GBP';
        accountList.add(ad_2);
        
        if(!countryList.contains(ad_2.country)){
            countryList.add(ad_2.country);
        }
        if(!currencyList.contains(ad_2.currencyCodeAvailableBalance)){
            currencyList.add(ad_2.currencyCodeAvailableBalance);
        }
        if(!subsidiaryList.contains(ad_2.subsidiaryName)){
            subsidiaryList.add(ad_2.subsidiaryName);
        }
        
        
        ad_3.accountId = 'Gran_Britain_'+2;
        ad_3.country = 'GB';
        ad_3.countryName = 'United Kingdom';
        ad_3.alias = 'Alias Name 3';
        ad_3.subsidiaryName = 'Subsidiary Name 3';
        ad_3.lastUpdateAvailableBalance = '2015-11-04T23:00:00.000Z';
        ad_3.displayNumber = 'GB26 0110 7298 5555 8888 1589';
        ad_3.bankName = 'Banco Santander';
        ad_3.amountMainBalance = 3100700.17;
        ad_3.amountAvailableBalance = 2945086.17 ;
        ad_3.currencyCodeAvailableBalance = 'GBP';
        accountList.add(ad_3);
        
        if(!countryList.contains(ad_3.country)){
            countryList.add(ad_3.country);
        }
        if(!currencyList.contains(ad_3.currencyCodeAvailableBalance)){
            currencyList.add(ad_3.currencyCodeAvailableBalance);
        }
        if(!subsidiaryList.contains(ad_3.subsidiaryName)){
            subsidiaryList.add(ad_3.subsidiaryName);
        }

        CNT_International_Treasury_Management_WRAPPER data1 = new CNT_International_Treasury_Management_WRAPPER(
            countryList, currencyList, subsidiaryList, accountList
        );
        data.add(data1);

        return data;
        
    }
    /*------------------------------------------------------------
    Author:         Teresa Santos
    Company:        Deloitte
    Description:    Wrapper class of the  pruebalist
    History 
    <Date>          <Author>            <Change Description>
    10/01/2020	    Teresa Santos       Initial version
    ------------------------------------------------------------*/ 
    //WRAPPER OF MOVEMENT HISTORY DATA
    public class CNT_International_Treasury_Management_WRAPPER{
        @AuraEnabled public List<String> countryList     {get;set;}
        @AuraEnabled public List<String> currencyList    {get;set;}
        @AuraEnabled public List<String> subsidiaryList  {get;set;}
        @AuraEnabled public List<WRAPPER_AccountList.AccountDetails> accountList     {get;set;}

        public CNT_International_Treasury_Management_WRAPPER (List<String> countryList, List<String> currencyList, List<String> subsidiaryList, List<WRAPPER_AccountList.AccountDetails> accountList){
            this.countryList = countryList;
            this.currencyList = currencyList;
            this.subsidiaryList = subsidiaryList;
            this.accountList = accountList;
        }


    }
    
    /*------------------------------------------------------------
    Author:         Shahad Naji
    Company:        Deloitte
    Description:   	Returns default user currency, default user language and wheather is about a Cash Nexus user or not
    History 
    <Date>          <Author>            <Change Description>
    28/10/2019     Shahad Naji  		Intial Version
    22/01/2020	   Shahad Naji 			Returns wheather the current user belongs to Cash Nexus database or not
    ------------------------------------------------------------*/        
    @AuraEnabled
    public static Map<String, String> getUserInfo(){        
        Map<String, String> userData = new Map <String, String>();
        try{
            if(!userData.containsKey('getDefaultCurrency')){
                userData.put('getDefaultCurrency', UserInfo.getDefaultCurrency());
            }
            if(!userData.containsKey('getLanguage')){
                userData.put('getLanguage', UserInfo.getLanguage());
            }
            if(!userData.containsKey('isCashNexusUser')){
                Id userId = UserInfo.getUserId();
                User isCashNexus = [SELECT id, USER_CHK_CashNexus__c FROM User WHERE Id =: userId];
                if(isCashNexus.USER_CHK_CashNexus__c){
                    userData.put('isCashNexusUser', 'True'); 
                }
                else{
                    userData.put('isCashNexusUser', 'False');   
                }                
            }
        }catch(Exception e){throw new AuraHandledException('The following exception has occurred: ' + e.getMessage());}        
        return userData;
    }    
    
    /*------------------------------------------------------------
    Author:         Shahad Naji
    Company:        Deloitte
    Description:   	Calculates the sum of Book Balance values and the sum Available Balance values taking into consideration current selected currency.
    History 
    <Date>          <Author>            <Change Description>
    28/10/2019     Shahad Naji  		Intial Version
    ------------------------------------------------------------*/
    @AuraEnabled
    public static Map<String, Decimal> getSumBalance(String currentCurrency, List<WRAPPER_AccountList.AccountDetails> accountList){
        
        Map<String, Decimal> balanceValues =  new Map<String, Decimal>();
        Decimal globalBookBalance = 0.0;
        Decimal globalAvailableBalance = 0.0;
       
        
        for(WRAPPER_AccountList.AccountDetails item : accountList){
            if(item.currencyCodeAvailableBalance != currentCurrency){
                Decimal globalBookBalance_aux = Global_Utilities.convertCurrency(item.currencyCodeAvailableBalance, currentCurrency, item.amountMainBalance);
                globalBookBalance += globalBookBalance_aux;
                Decimal globalAvailableBalance_aux = Global_Utilities.convertCurrency(item.currencyCodeAvailableBalance, currentCurrency, item.amountAvailableBalance);
                globalAvailableBalance += globalAvailableBalance_aux;
            }else{
                globalBookBalance += item.amountMainBalance;
                globalAvailableBalance += item.amountAvailableBalance;                    
            }
        }
        
        if(!balanceValues.containsKey('globalBookBalance')){
            balanceValues.put('globalBookBalance',globalBookBalance.setScale(2));
        }
        if(!balanceValues.containsKey('globalAvailableBalance')){
            balanceValues.put('globalAvailableBalance', globalAvailableBalance.setScale(2));
        }
        
        return balanceValues;
    }
    
    /*------------------------------------------------------------
    Author:         Shahad Naji
    Company:        Deloitte
    Description:   	Receives a country ISO Code and returns its country name.
    History 
    <Date>          <Author>            <Change Description>
    17/02/2019		Shahad Naji  		Intial Version
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
    Author:         Diego Asis
    Company:        Deloitte
    Description:   	Get Welcome Pack checkbox value from user
    History 
    <Date>          <Author>                <Change Description>
    05/03/2019		Diego Asis  			Intial Version
    ------------------------------------------------------------*/
    
    @AuraEnabled 
    public static Boolean getCheckboxWelcomePack(){
        
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
    
    @AuraEnabled 
    public static Map<String, boolean> getIsCashNexus(){
        Map<String, boolean> userData = new Map <String, boolean>();
        
        try{
            Id userId = UserInfo.getUserId();
            User isCashNexus = [SELECT Id, USER_CHK_CashNexus__c, USER_CHK_TermsConditions__c, USER_TXT_BIC__c FROM User WHERE Id =: userId LIMIT 1];
            
            if(!userData.containsKey('isCashNexusUser')){ 
                if(isCashNexus.USER_CHK_CashNexus__c){
                    userData.put('isCashNexusUser', true); 
                }
                else{
                    userData.put('isCashNexusUser', false);
                    
                    if(!userData.containsKey('BIC')){ 
                        if(isCashNexus.USER_TXT_BIC__c != '' && isCashNexus.USER_TXT_BIC__c.length() == 8) {
                            String bicCountry = isCashNexus.USER_TXT_BIC__c.substring(4, 6);
                            List<String> countries = new List<String>();
                            countries.add('GB');
                            
                            if(countries.contains(bicCountry)) {
                                userData.put('BIC', true);
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

    @AuraEnabled
    public static Map<String,Decimal> getChangeCurrencies(String currentCurrency, Decimal amount){
        return Global_Utilities.exchangeRates(currentCurrency, amount);
    }

    /*----------------------------------------------------------------------------------
    Author:         Pablo Tejedor
    Company:        Deloitte
    Description:    Download Accounts Balance
    History
    <Date>			<Author>		        <Description>
    03/04/2020		Pablo Tejedor     		Initial version
    ----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static String downloadFileDoc(Boolean isLastUpdate, String accCode, String order, String currencyX, String bookBalance, String valueBalance){
        try{
            
            String res='';
            CNT_DownloadFile data = new CNT_DownloadFile(isLastUpdate, accCode, order, currencyX, bookBalance, valueBalance);

            data.execute();

            if (String.isNotBlank(data.getOutput())) {
                res= data.getOutput();
            }
            
            return res;
        } catch (Exception e) {throw new customException(e.getMessage());}

    }

    /*----------------------------------------------------------------------------------
    Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Remove MT103
    History
    <Date>			<Author>		        <Description>
    11/12/2019		R. Alexander Cervino     Initial version
    ----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static void removeFile(String id){
        try{
            if(id!=''){
                List<ContentDocument> doc = new List<ContentDocument>([SELECT id from ContentDocument where Id=:id LIMIT 1]);

                if(!doc.isEmpty()){
                    delete doc[0];
                }
            }

        } catch (Exception e) {throw new customException(e.getMessage());}

    }

           /*----------------------------------------------------------------------------------
Author:         Shahad Naji 
Company:        Deloitte
Description:    Sets user currency 
of them
History
<Date>			<Author>		     <Description>
04/05/2020		Shahad Naji        Initial version
----------------------------------------------------------------------------------*/
@AuraEnabled 
public static Boolean setUserCurrency(String currencyStr){
    Boolean isTrue = true;
    try{
        Id iUserId = UserInfo.getUserId();
        User iUser = [SELECT Id, DefaultCurrencyIsoCode, CurrencyIsoCode FROM User WHERE Id =: iUserId LIMIT 1];  
        iUser.CurrencyIsoCode = currencyStr;
        iUser.DefaultCurrencyIsoCode = currencyStr;
        system.debug('>>> ' + currencyStr);

        //iUser.DefaultCurrencyIsoCode = CNT_UserSettingsController.mapValue(Schema.SObjectType.User.fields.DefaultCurrencyIsoCode.PicklistValues, currencyStr);
        system.debug('>>> ' + iUser);
        update iUser;

    }catch(Exception e ){ 
        isTrue = false;
        throw new AuraHandledException('The following exception has occurred: ' + e.getMessage());
    }
    return isTrue;
}


@AuraEnabled 
public static String setUserCurrencyString(String currencyStr){
    String isTrue = currencyStr;
    try{
        Id iUserId = UserInfo.getUserId();
        User iUser = [SELECT Id, DefaultCurrencyIsoCode, CurrencyIsoCode FROM User WHERE Id =: iUserId LIMIT 1];  
        iUser.CurrencyIsoCode = currencyStr;
        iUser.DefaultCurrencyIsoCode = currencyStr;
        system.debug('>>> ' + currencyStr);

        //iUser.DefaultCurrencyIsoCode = CNT_UserSettingsController.mapValue(Schema.SObjectType.User.fields.DefaultCurrencyIsoCode.PicklistValues, currencyStr);
        system.debug('>>> ' + iUser);
        update iUser;

    }catch(Exception e ){ 
        isTrue = '';
        throw new AuraHandledException('The following exception has occurred: ' + e.getMessage());
    }
    return isTrue;
}
    
            /*----------------------------------------------------------------------------------
    Author:         R. Cervino
    Company:        Deloitte
    Description:    Data encrypting
    History
    <Date>			<Author>		<Description>
    21/05/2020		 R. Cervino    Initial version
    ----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static String encryptData(String str){
        return Global_Utilities.encryptData(str);
    }

        /*----------------------------------------------------------------------------------
    Author:         R. Cervino
    Company:        Deloitte
    Description:    Data decrypting
    History
    <Date>			<Author>		<Description>
    21/05/2020		 R. Cervino    Initial version
    ----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static String decryptData(String str){
        return Global_Utilities.decryptData(str);
    }
}