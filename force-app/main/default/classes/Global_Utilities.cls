/*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Holds auxiliar functions
Test Class:     Global_Utilities_Test
History
<Date>			<Author>		<Description>
25/10/2019		Shahad Naji     Initial version
26/11/2019		Shahad Naji 	Removing getCurrentUserDateTime and formatDate and adding them to DateTime_Utilities Class
----------------------------------------------------------------------------------*/


global without sharing class Global_Utilities {
    
    
    
    /*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Converts a value from provided currency to corporate currency
History
<Date>			<Author>		<Description>
25/10/2019		Shahad Naji     Initial version
----------------------------------------------------------------------------------*/    
    public static Map<String, Decimal> exchangeRates(String currentCurrency, Decimal value){
        Map<String, Decimal>  convertedValues = New Map<String, Decimal>();
        try{
            List<CurrencyType> otherCurrencyType = New List<CurrencyType>([SELECT Id, IsoCode FROM CurrencyType WHERE IsoCode !=: currentCurrency]);
            for(CurrencyType otherCurrency: otherCurrencyType){
                Decimal convertedCurrency = Global_Utilities.convertCurrency(currentCurrency, otherCurrency.IsoCode, value);
                convertedValues.put(otherCurrency.IsoCode, convertedCurrency);
            }
        }catch(Exception e){
            System.debug('Exception type caught: ' + e.getTypeName());    
            System.debug('Message: ' + e.getMessage());
            System.debug('Cause: ' + e.getCause());    // returns null
            System.debug('Line number: ' + e.getLineNumber());    
            System.debug('Stack trace: ' + e.getStackTraceString());   
        }
        
        return convertedValues;
    }
    /*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Converts a value from a currency to another
History
<Date>			<Author>		<Description>
25/10/2019		Shahad Naji     Initial version
----------------------------------------------------------------------------------*/    
    public static Decimal convertCurrency(String fromIsoCode, String toIsoCode, Decimal value) {
        Decimal convertedValue = value;
        try{
            Map<string, CurrencyType> currencyTypesByIsoCode = new Map<string, CurrencyType>();
            List<CurrencyType> currencyTypes = New List<CurrencyType>([SELECT Id, IsoCode, ConversionRate, IsCorporate FROM CurrencyType]);
            for (CurrencyType currencyType : currencyTypes) {
                currencyTypesByIsoCode.put(currencyType.IsoCode, currencyType);
            }
            Boolean conversionRequired = (fromIsoCode != toIsoCode && value != null);
            Boolean fromIsoCodeValid = currencyTypesByIsoCode.containsKey(fromIsoCode);
            Boolean toIsoCodeValid = currencyTypesByIsoCode.containsKey(toIsoCode);            
            if (conversionRequired && fromIsoCodeValid && toIsoCodeValid) {
                CurrencyType fromCurrencyType = currencyTypesByIsoCode.get(fromIsoCode);
                convertedValue = value / fromCurrencyType.ConversionRate;
                CurrencyType toCurrencyType = currencyTypesByIsoCode.get(toIsoCode);
                convertedValue = convertedValue * toCurrencyType.ConversionRate;
            }              
        }catch(Exception e){
            System.debug('Exception type caught: ' + e.getTypeName());    
            System.debug('Message: ' + e.getMessage());    
            System.debug('Cause: ' + e.getCause());    // returns null
            System.debug('Line number: ' + e.getLineNumber());    
            System.debug('Stack trace: ' + e.getStackTraceString()); 
        }        
        return convertedValue;
    }
    /*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Returns current user date time
History
<Date>			<Author>		<Description>
25/10/2019		Shahad Naji     Initial version
----------------------------------------------------------------------------------*/    
    public static String getCurrentUserDateTime(){
        
        Datetime now = Datetime.now(); 
        Integer offset = UserInfo.getTimezone().getOffset(now); 
        Datetime local = now.addSeconds(offset/1000);
        String str = local.format('dd/MM/yyyy HH:mm');
        return str;
    }
    /*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Format Date
History
<Date>			<Author>		<Description>
25/10/2019		Shahad Naji     Initial version
----------------------------------------------------------------------------------*/        
    public static String formatDate(Datetime dateToStr){
        String str = dateToStr.format('dd/MM/yyyy HH:mm');
        return str;
    }
    /*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Removes white spaces of a String value
History
<Date>			<Author>		<Description>
25/10/2019		Shahad Naji     Initial version
----------------------------------------------------------------------------------*/    
    public static String removeWhiteSpace(String str){
        
        String[] splitString = str.split(' '); 
        str = '';
        for(String s: splitString) {
            str = str+s;
        }
        return str;
    }
    
    /*----------------------------------------------------------------------------------
Author:         R. Alexander Cervino
Company:        Deloitte
Description:    Method to encrypt data
History
<Date>			<Author>		<Description>
18/11/2019		Alexander Cervino     Initial version
----------------------------------------------------------------------------------*/    
    @AuraEnabled public static String encryptData(String str){
        
        try {
            Blob data = Blob.valueOf(str);
            Blob cryptoKey = EncodingUtil.base64Decode(cryptoKey__c.getOrgDefaults().cryptoKey__c);
            // Encrypt the data and have Salesforce.com generate the initialization vector
            Blob encryptedData = Crypto.encryptWithManagedIV('AES256', cryptoKey, data);
            
            return EncodingUtil.base64Encode(encryptedData);        
        }catch (Exception e) {throw new AuraHandledException('Darn it! Something went wrong: '+ e.getMessage());    
                             }       
    }
    
    /*----------------------------------------------------------------------------------
Author:         R. Alexander Cervino
Company:        Deloitte
Description:    Method to decrypt data
History
<Date>			<Author>		<Description>
18/11/2019		Alexander Cervino     Initial version
----------------------------------------------------------------------------------*/    
    @AuraEnabled public static String decryptData(String str){
        
        try {
            system.debug('entra');
            Blob cryptoKey = EncodingUtil.base64Decode(cryptoKey__c.getOrgDefaults().cryptoKey__c);
            
            Blob decryptedData = Crypto.decryptWithManagedIV('AES256', cryptoKey, EncodingUtil.base64Decode(str));
            
            return decryptedData.toString();        
        }catch (Exception e) {throw new AuraHandledException('Something went wrong: ' + e.getMessage());    
                             }       
    }
    
    
    /*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:   	Receives a country ISO Code and returns its country name.
History
<Date>			<Author>		<Description>
26/11/2019		Shahad Naji     Initial version
----------------------------------------------------------------------------------*/   
    public static String getCountryName(String ISOCode){
        String str = '';
        try {
            List<Country__mdt> countryNameList = [SELECT toLabel(COU_PCK_Name__c) FROM Country__mdt WHERE COU_PCK_ISO_Code2__c =: ISOCode LIMIT 1];
            if(!countryNameList.isEmpty()){
                str = countryNameList[0].COU_PCK_Name__c;
            }  
            
        }catch(Exception e){
            System.debug('Exception type caught: ' + e.getTypeName());    
            System.debug('Message: ' + e.getMessage());    
            System.debug('Cause: ' + e.getCause());    // returns null
            System.debug('Line number: ' + e.getLineNumber());    
            System.debug('Stack trace: ' + e.getStackTraceString());   
        }
        return str;
    }
    
    /*----------------------------------------------------------------------------------
Author:         Maria Inigo
Company:        Deloitte
Description:   	Receives a country ISO Code and returns its country name.
History
<Date>			<Author>		<Description>
15/09/2020		Maria Inigo     Initial version
----------------------------------------------------------------------------------*/   
    public static String getCountryCurrency(String ISOCode){
        String str = '';
        try {
            List<Country__mdt> countryCurrencyList = [SELECT COU_PCK_CurrencyCode__c FROM Country__mdt WHERE COU_PCK_ISO_Code2__c =: ISOCode LIMIT 1];
            if(!countryCurrencyList.isEmpty()){
                str = countryCurrencyList[0].COU_PCK_CurrencyCode__c;
            }  
            
        }catch(Exception e){
            System.debug('Exception type caught: ' + e.getTypeName());    
            System.debug('Message: ' + e.getMessage());    
            System.debug('Cause: ' + e.getCause());    // returns null
            System.debug('Line number: ' + e.getLineNumber());    
            System.debug('Stack trace: ' + e.getStackTraceString());   
        }
        return str;
    }
    
    /*----------------------------------------------------------------------------------
Author:         R. Cervino
Company:        Deloitte
Description:   	Receives if the purpose field is mandatory for a Country.
History
<Date>			<Author>		<Description>
24/11/2020		R. Cervino     Initial version
----------------------------------------------------------------------------------*/   
    public static Boolean getCountryMandatoryPurpose(String ISOCode){
        Boolean res = true;
        try {
            List<Country__mdt> purposeList = [SELECT COU_PCK_mandatoryPurpose__c FROM Country__mdt WHERE COU_PCK_ISO_Code2__c =: ISOCode LIMIT 1];
            if(!purposeList.isEmpty()){
                res = purposeList[0].COU_PCK_mandatoryPurpose__c;
            }  
            
        }catch(Exception e){
            System.debug('Exception type caught: ' + e.getTypeName());    
            System.debug('Message: ' + e.getMessage());    
            System.debug('Cause: ' + e.getCause());    // returns null
            System.debug('Line number: ' + e.getLineNumber());    
            System.debug('Stack trace: ' + e.getStackTraceString());   
        }
        return res;
    }
    /*----------------------------------------------------------------------------------
Author:         Joaquin Vera
Company:        Deloitte
Description:   	Recieves a DateTime and formats it to Mulesoft Server DateTime
History
<Date>			<Author>		<Description>
13/12/2019		Joaquin Vera     Initial version
----------------------------------------------------------------------------------*/   
    public static String formatToServerDate(DateTime inputDate){
        if(inputDate != null)
        {
            return inputDate.format('yyyy-MM-dd\'T\'HH:mm:ss.XXX').replace('.+','-');
        } 
        return null;
    }
    /*----------------------------------------------------------------------------------
Author:         Joaquin Vera
Company:        Deloitte
Description:   	Generates a random number of the size inserted by param
History
<Date>			<Author>		<Description>
13/12/2019		Joaquin Vera     Initial version
----------------------------------------------------------------------------------*/   
    public static String generateRandomNumber(Integer size){
        
        /* Double min = Math.pow(10,size -1);
Double max = Math.pow(10,size) - 1;

String randomNumber = String.valueOf(Math.Round(Math.Random() * (max-min) + min));
return randomNumber;*/
        String chars = '0123456789';
        String randStr = '';
        
        for(Integer i = 0; i < size; i++)
        {
            randStr += String.valueOf(Math.mod(Math.abs(Crypto.getRandomInteger()), chars.length()));
        }
        return randStr;
    }
    
    /*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:   	Returns current user currency information
History
<Date>			<Author>		<Description>
02/01/2020		shahad Naji     Initial version
----------------------------------------------------------------------------------*/    
    public static Wrapper_Currency getUserCurrency(){
        Wrapper_Currency iReturn = new Wrapper_Currency();
        try {
            CurrencyType iCurrency= new CurrencyType();
            String userCurrency = UserInfo.getDefaultCurrency();            
            iCurrency = [SELECT Id, LastModifiedDate, IsoCode, ConversionRate, IsCorporate FROM CurrencyType WHERE IsoCode =: userCurrency LIMIT 1]; 
            if(iCurrency != null){
                iReturn.iId = iCurrency.id;
                iReturn.iLastModifiedDate = iCurrency.LastModifiedDate;
                iReturn.iIsoCode = iCurrency.IsoCode;
                iReturn.iConversionRate = iCurrency.ConversionRate;
                iReturn.iIsCorporate = iCurrency.IsCorporate;
            }
        }catch(Exception e){
            System.debug('Exception type caught: ' + e.getTypeName());    
            System.debug('Message: ' + e.getMessage());    
            System.debug('Cause: ' + e.getCause());    // returns null
            System.debug('Line number: ' + e.getLineNumber());    
            System.debug('Stack trace: ' + e.getStackTraceString());   
        }
        
        return iReturn;
    }
    
    /*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:   	Returns the currencies information
History
<Date>			<Author>		<Description>
02/01/2020		shahad Naji     Initial version
----------------------------------------------------------------------------------*/      
    public static List<Wrapper_Currency> getCurrencies(String userCurrency, List<String> currencyList){
        List<Wrapper_Currency> iReturn = new List<Wrapper_Currency>();
        List<CurrencyType> aux = new List<CurrencyType>();
        try{
            if(currencyList.contains(userCurrency)){
                aux = [SELECT Id, LastModifiedDate, IsoCode, ConversionRate, IsCorporate FROM CurrencyType WHERE IsoCode IN :currencyList ORDER BY IsoCode];
            }else{
                system.debug('>>> SNJ we are here');
                aux = [SELECT Id, LastModifiedDate, IsoCode, ConversionRate, IsCorporate FROM CurrencyType WHERE (IsoCode IN :currencyList) OR (IsoCode LIKE :userCurrency) ORDER BY IsoCode]; 
            }
            if(!aux.isEmpty()){
                for(CurrencyType item : aux){
                    Wrapper_Currency iWC = new Wrapper_Currency();
                    iWC.iId = item.Id;
                    iWC.iLastModifiedDate = item.LastModifiedDate;
                    iWC.iIsoCode = item.IsoCode;
                    iWC.iConversionRate =  item.ConversionRate;
                    iWC.iIsCorporate = item.IsCorporate;
                    iReturn.add(iWC);
                }
            }
        }catch(Exception e){
            System.debug('Exception type caught: ' + e.getTypeName());    
            System.debug('Message: ' + e.getMessage());    
            System.debug('Cause: ' + e.getCause());    // returns null
            System.debug('Line number: ' + e.getLineNumber());    
            System.debug('Stack trace: ' + e.getStackTraceString());  
        }
        return iReturn;
    }
    
    /*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:   	Returns a currency information
History
<Date>			<Author>		<Description>
02/01/2020		shahad Naji     Initial version
----------------------------------------------------------------------------------*/        
    public static Wrapper_Currency getCurrency(String iCurrency){
        Wrapper_Currency iReturn = new Wrapper_Currency();
        CurrencyType aux = new CurrencyType();
        try{
            aux = [SELECT Id, LastModifiedDate, IsoCode, ConversionRate, IsCorporate FROM CurrencyType WHERE IsoCode =: iCurrency LIMIT 1];
            if(aux != null){
                iReturn.iId = aux.id;
                iReturn.iLastModifiedDate = aux.LastModifiedDate;
                iReturn.iIsoCode = aux.IsoCode;
                iReturn.iConversionRate = aux.ConversionRate;
                iReturn.iIsCorporate = aux.IsCorporate;               
            }
        }catch(Exception e){            
            System.debug('Exception type caught: ' + e.getTypeName());    
            System.debug('Message: ' + e.getMessage());    
            System.debug('Cause: ' + e.getCause());// returns null
            System.debug('Line number: ' + e.getLineNumber());    
            System.debug('Stack trace: ' + e.getStackTraceString());
        }
        return iReturn;
    }
    
    
    /*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:   	Returns a currency values of IsoCode and Name 
History
<Date>			<Author>		<Description>
29/01/2020		shahad Naji     Initial version
----------------------------------------------------------------------------------*/ 
    public static Wrapper_Currency getCurrencyLabel(String iCurrency){
        Wrapper_Currency iReturn = new Wrapper_Currency();
        CurrencyType aux = new CurrencyType();
        try{
            aux = [SELECT Id, LastModifiedDate, toLabel(IsoCode) FROM CurrencyType WHERE IsoCode =: iCurrency LIMIT 1];
            if(aux != null){
                iReturn.iId = aux.id;
                iReturn.iCurrencyName = aux.IsoCode;                        
            }
        }catch(Exception e){            
            System.debug('Exception type caught: ' + e.getTypeName());    
            System.debug('Message: ' + e.getMessage());    
            System.debug('Cause: ' + e.getCause());// returns null
            System.debug('Line number: ' + e.getLineNumber());    
            System.debug('Stack trace: ' + e.getStackTraceString());
        }
        return iReturn;
    }
    
    /*----------------------------------------------------------------------------------
Author:         R. Alexander Cervino
Company:        Deloitte
Description:    Method to get the countries ISO2
History
<Date>			<Author>		<Description>
10/12/2019		R. Alexander Cervino     Initial version
----------------------------------------------------------------------------------*/
    public static List<String> getISO2Values() {
        List<String> res = new List<String>();
        try{
            List<Country__mdt> countries = [SELECT toLabel(COU_PCK_ISO_Code2__c), toLabel(COU_PCK_Name__c) FROM Country__mdt];
            
            if(!countries.isEmpty()){
                for(Country__mdt i : countries){
                    res.add(i.COU_PCK_ISO_Code2__c+'-'+i.COU_PCK_Name__c);
                }
            }
            
        }catch(Exception e){throw new AuraHandledException('The following exception has occurred: '+ e.getMessage());}
        
        return res;
    }
    
    /*----------------------------------------------------------------------------------
Author:         Guillermo Giral
Company:        Deloitte
Description:    Method to get the country code and name for each country
History
<Date>			<Author>		    <Description>
08/06/2020		Guillermo Giral     Initial version
----------------------------------------------------------------------------------*/
    public static Map<String, String> getCountriesMap() {
        Map<String, String> res = new Map<String, String>();
        List<Country__mdt> countries = [SELECT toLabel(COU_PCK_ISO_Code2__c), toLabel(COU_PCK_Name__c) FROM Country__mdt];
        
        if(!countries.isEmpty()){
            for(Country__mdt i : countries){
                res.put(i.COU_PCK_ISO_Code2__c, i.COU_PCK_Name__c);
            }
            return res;
        }
        return null;
    }
    
    /*----------------------------------------------------------------------------------
Author:         R. Alexander Cervino
Company:        Deloitte
Description:    Method to get the countries ISO2
History
<Date>			<Author>		<Description>
12/02/2020		R. Alexander Cervino     Initial version
----------------------------------------------------------------------------------*/
    public static List<String> getStatuses() {
        List<String> res = new List<String>();
        system.debug('>>> at global_utilities' );
        try{
            List<Status__mdt> statuses = [SELECT toLabel(Status__c) FROM Status__mdt];
            
            if(!statuses.isEmpty()){
                for(Status__mdt i : statuses){
                    res.add(i.Status__c);
                    system.debug('>>> ' + i.Status__c);
                }
            }
            
        }catch(Exception e){
            // throw new AuraHandledException('The following exception has occurred: '+ e.getMessage());
            System.debug('Exception type caught: ' + e.getTypeName());    
            System.debug('Message: ' + e.getMessage());    
            System.debug('Cause: ' + e.getCause());// returns null
            System.debug('Line number: ' + e.getLineNumber());    
            System.debug('Stack trace: ' + e.getStackTraceString());
        }
        
        return res;
    }
    
    
    @AuraEnabled (cacheable=true)
    public static String getUserNumberFormat(String userId)
    {
        if(userId==''){
            userId=UserInfo.getUserId();
        }
        
        List<User> matchingUser = [SELECT Id, USER_NumberFormat__c FROM User WHERE Id = :userId LIMIT 1 ];
        if(matchingUser.size() > 0) {
            return matchingUser.get(0).USER_NumberFormat__c;
        }
        
        return '';
        
    }
    
    /*----------------------------------------------------------------------------------
Author:         M. Inigo
Company:        Deloitte
Description:    Method to get the current user document type
History
<Date>			<Author>		<Description>
08/07/2020		M. Inigo        Initial version
----------------------------------------------------------------------------------*/
    @AuraEnabled (cacheable=true)
    public static Account getAccountData(String userId)
    {
        Account result = new Account();
        if(userId==''){
            userId=UserInfo.getUserId();
        }
        List<Contact> contact = [SELECT AccountId FROM Contact WHERE CONTACT_User__c = :userId LIMIT 1 ];
        if(!contact.isEmpty()){
            List<Account> account = [SELECT Id, ACC_CHK_CIB__c, ACC_TXT_DocumentType__c, ACC_TXT_DocumentNumber__c,ACC_TXT_CompanyId__c, ACC_TXT_BIC__c FROM Account WHERE Id = :contact[0].AccountId LIMIT 1 ];
            if(account.size() > 0) {
                result = account.get(0) ;
            }
        }
        return result;
    }
    
    @AuraEnabled (cacheable=true)
    public static User getUserData(String userId)
    {
        return CNT_UserData.getUserData(userId);
    }
    
    /*----------------------------------------------------------------------------------
Author:         Guillermo Giral 
Company:        Deloitte
Description:    Gets the user preferred date format
History
<Date>			<Author>		     <Description>
15/03/2020		Guillermo Giral      Initial version
----------------------------------------------------------------------------------*/
    @AuraEnabled (cacheable=true)
    public static String getUserDateFormat(String userId)
    {
        if(userId==''){
            userId=UserInfo.getUserId();
        }
        
        List<User> matchingUser = [SELECT Id, User_DateFormat__c FROM User WHERE Id = :userId LIMIT 1 ];
        if(matchingUser.size() > 0) {
            System.debug('Returned date format:' + matchingUser.get(0).User_DateFormat__c);
            return matchingUser.get(0).User_DateFormat__c;
        }
        
        return '';
        
    }
    
    /*----------------------------------------------------------------------------------
Author:         Joaquín Vera 
Company:        Deloitte
Description:    Gets the exchanges rates from a each of the currencies to the rest
of them
History
<Date>			<Author>		     <Description>
31/03/2020		Joaquín Vera        Initial version
----------------------------------------------------------------------------------*/
    @AuraEnabled (cacheable=true)
    public static Map<String,Decimal> getExchangeRates(String actualIsoCode, List<String> currencyList, Decimal value)
    {
        Map<String,Decimal> mapReturn = new Map<String,Decimal>();
        
        List<CurrencyType> currencies = new List<CurrencyType>([SELECT Id, IsoCode, ConversionRate FROM CurrencyType WHERE IsoCode IN :currencyList]);
        CurrencyType fromCode;
        
        for(CurrencyType currencyMatch : currencies) {
            if(currencyMatch.IsoCode == actualIsoCode) {
                fromCode = currencyMatch;
                break;
            }
        }
        Decimal valueTemp;
        for(CurrencyType actualCurrency: currencies)
        {
            valueTemp = 0.0;
            if(actualCurrency.IsoCode != fromCode.IsoCode) 
            {
                valueTemp = value / fromCode.ConversionRate.setScale(8);
                valueTemp = valueTemp * actualCurrency.ConversionRate.setScale(8);
            }
            else
            {
                valueTemp = value.setScale(8);
            }
            mapReturn.put(actualCurrency.IsoCode, valueTemp.setScale(8));
        }
        
        return mapReturn;
    }
    
    /*-------------------------------------------------------------------------------------------------------------------
Author:         Guillermo 
Company:        Deloitte
Description:    Gets the exchanges rates from a each of the currencies to the rest
of them and return an object with information about each one
Return:         Map<String, Map<Decimal,CurrencyType>> Map of ISO code to map of exchange rate + CurrencyType info
History
<Date>			<Author>		        <Description>
04/08/2020		Guillermo Giral         Initial version
--------------------------------------------------------------------------------------------------------------------*/
    @AuraEnabled (cacheable=true)
    public static Map<String, Map<Decimal,CurrencyType>> getExchangeRatesWithExtraInfo(String actualIsoCode, List<String> currencyList, Decimal value)
    {
        Map<String, Map<Decimal,CurrencyType>> mapReturn = new Map<String, Map<Decimal,CurrencyType>>();
        
        List<CurrencyType> currencies = new List<CurrencyType>([SELECT Id, IsoCode, ConversionRate, LastModifiedDate FROM CurrencyType WHERE IsoCode IN :currencyList]);
        CurrencyType fromCode;
        
        for(CurrencyType currencyMatch : currencies) {
            if(currencyMatch.IsoCode == actualIsoCode) {
                fromCode = currencyMatch;
                break;
            }
        }
        
        if(fromCode == null){
            fromCode = [SELECT Id, IsoCode, ConversionRate, LastModifiedDate FROM CurrencyType WHERE IsoCode =: UserInfo.getDefaultCurrency() LIMIT 1][0];
        }
        
        Decimal valueTemp;
        for(CurrencyType actualCurrency: currencies)
        {
            valueTemp = 0.0;
            if(actualCurrency.IsoCode != fromCode.IsoCode) 
            {
                valueTemp = value / fromCode.ConversionRate.setScale(8);
                valueTemp = valueTemp * actualCurrency.ConversionRate.setScale(8);
            }
            else
            {
                valueTemp = value.setScale(8);
            }
            mapReturn.put(actualCurrency.IsoCode, new Map<Decimal, CurrencyType>{valueTemp.setScale(8) => actualCurrency});
        }
        
        return mapReturn;
    }
    
    /*----------------------------------------------------------------------------------
Author:         R. Cervino
Company:        Deloitte
Description:   	Returns a personal settings information
History
<Date>			<Author>		<Description>
06/04/2020		R. Cervino     Initial version
----------------------------------------------------------------------------------*/  
    @AuraEnabled (cacheable=true)
    public static WRAPPER_PersonalSettings getPersonalSettings(){
        
        CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('PersonalSettings');
        return WRAPPER_PersonalSettings.parse(Global_IntegrationWrapper.launchHTTP('',configWs.CNT_Endpoint__c,configWs.CNT_HTTPMethod__c));
    }
    
    /*----------------------------------------------------------------------------------------------------------
Author:         R. Alexander Cervino
Company:        Deloitte
Description:    Method to get the currencies ISO3
History
<Date>			<Author>		         <Description>
07/04/2020		R. Alexander Cervino     Initial version
18/06/2020      Guillermo Giral          Improved performance by querying instead of using Describe methods
------------------------------------------------------------------------------------------------------------*/
    public static List<String> getISO3Values() {
        List<String> res = new List<String>();
        try{
            // Schema.DescribeFieldResult F = Currency__mdt.Currency_Iso_alpha_code_3__c.getDescribe();
            // Schema.sObjectField T = F.getSObjectField();
            // List<PicklistEntry> entries = T.getDescribe().getPicklistValues();
            
            // if(!entries.isEmpty()){
            //     for(PicklistEntry i : entries){
            //         res.add(i.getValue());
            //     }
            // }
            for(Currency__mdt curr : [SELECT Currency_Iso_alpha_code_3__c FROM Currency__mdt]){
                res.add(curr.Currency_Iso_alpha_code_3__c);
            }
            res.sort();
        }catch(Exception e){throw new AuraHandledException('The following exception has occurred: '+ e.getMessage());}
        
        return res;
    }
    
    /*----------------------------------------------------------------------------------
Author:         Guillermo Giral
Company:        Deloitte
Description:    Returns a map with the object picklist's values and translations
History
<Date>			<Author>		    <Description>
01/06/2020		Guillermo Giral     Initial version
----------------------------------------------------------------------------------*/    
    public static Map<String, String> getPicklistValuesWithTranslations(String objectApiName, String fieldApiName){
        try{
            Map<String,String> pickListValuesMap= new Map<String,String>();
            Schema.SObjectType objectToken = Schema.getGlobalDescribe().get(objectApiName);
            Set<String> objectFields = objectToken.getDescribe().fields.getMap().keySet();
            System.debug(objectFields);
            // Check whether the field exists in the object passed as parameter
            if(objectFields.contains(fieldApiName.toLowerCase())) {
                Schema.DescribeFieldResult fieldResult = objectToken.getDescribe().fields.getMap().get(fieldApiName).getDescribe();
                System.debug(fieldResult);
                List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
                for( Schema.PicklistEntry pickListVal : ple){
                    pickListValuesMap.put(pickListVal.getValue(), pickListVal.getLabel());
                }     
                return pickListValuesMap;
            }
            // If the field does not exist in the object, return null
            return null;
        } catch (Exception e){
            System.debug('The object does not exist, please enter the proper object API name');
            return null;
        }
    }
    
    /*----------------------------------------------------------------------------------
Author:         Guillermo Giral
Company:        Deloitte
Description:    Returns current user timezone offset with GMT0
History
<Date>			<Author>		<Description>
27/04/2020		Guillermo Giral     Initial version
----------------------------------------------------------------------------------*/    
    @AuraEnabled
    public static Map<String, Integer> getCurrentUserTimezoneOffSetInMiliseconds(List<String> dateInput){  
        Map<String, Integer> result = new Map<String, Integer>();
        System.debug(dateInput);
        
        if(dateInput[0]!=null && dateInput[0]!=''){
            Date newDate = Date.valueOf(dateInput[0]);
            Integer d = newDate.day();
            Integer mo = newDate.month();
            Integer yr = newDate.year();
            Datetime now =  DateTime.newInstance(yr, mo, d);
            Integer offset = UserInfo.getTimezone().getOffset(now); 
            result.put(dateInput[0],offset);
        }else{
            result.put(dateInput[0],null);
            
        }
        
        if(dateInput[1]!=null && dateInput[1]!=''){
            Date newDate2 = Date.valueOf(dateInput[1]);
            Integer d2 = newDate2.day();
            Integer mo2 = newDate2.month();
            Integer yr2 = newDate2.year();
            Datetime now2 =  DateTime.newInstance(yr2, mo2, d2);
            Integer offset2 = UserInfo.getTimezone().getOffset(now2); 
            result.put(dateInput[1],offset2);
        }else{
            result.put(dateInput[1],null);
            
        }
        
        return result;
    }
    
    
    
    public static String formatAmount(Decimal val, integer dec, String tSep, String dSep) {
        String s, tmp;
        Integer i = 4 + dec;
        
        // If the number of decimals is zero (0)... prevents the first 1000s seperator from being set at the 4th.
        if(dec==0){
            i--;
        }
        
        s = val.setScale(dec).toPlainString().replace(tSep, dSep);
        while(s.length() > i) {
            tmp = s.substring(0, s.length() - i) + tSep + s.substring(s.length() - i);
            s = tmp;
            i += 4;
        }
        
        // If the number is negative and has a number non-decimal digits divisible by 3, it prevents putting a comma before the 1st digit (ex -300,000.00  comes out -,300,000.00)
        if (s.substring(0,1) == '-') {
            if (s.substring(1,2) == tSep) {
                s = '-' + s.substring(2);
            }
        }
        
        return s;
    }	
    
    /*----------------------------------------------------------------------------------
Author:         Shahad Naji 
Company:        Deloitte
Description:    Gets the list of items to filter Ordering Accounts for NEXUS service API Line
of them
History
<Date>          <Author>             <Description>
29/10/2020      Shahad Naji        	Initial version
----------------------------------------------------------------------------------*/
    public static List<Nexus_B2B_Ordering_Filters__c> getNexusB2BOrderingFilters(){
        List<Nexus_B2B_Ordering_Filters__c> lst = new List<Nexus_B2B_Ordering_Filters__c>();
        try {
            lst = [SELECT id, B2B_TXT_Country_ISO_Code__c, B2B_TXT_Country_Name__c, B2B_TXT_Currencies__c FROM Nexus_B2B_Ordering_Filters__c WHERE B2B_CHK_Active__c = true];            
        }catch(Exception e){            
            System.debug('Exception type caught: ' + e.getTypeName());    
            System.debug('Message: ' + e.getMessage());    
            System.debug('Cause: ' + e.getCause());// returns null
            System.debug('Line number: ' + e.getLineNumber());    
            System.debug('Stack trace: ' + e.getStackTraceString());
        }
        return lst;
    }
    
    /*----------------------------------------------------------------------------------
Author:         Shahad Naji 
Company:        Deloitte
Description:    Gets the list of items to filter Ordering Accounts Multi One Trade service API Line
of them
History
<Date>          <Author>             <Description>
29/10/2020      Shahad Naji        	Initial version
----------------------------------------------------------------------------------*/
    public static List<Multi_One_Trade_B2B_Ordering_Filters__c> getMultiOneTradeB2BOrderingFilters(){
        List<Multi_One_Trade_B2B_Ordering_Filters__c> lst = new List<Multi_One_Trade_B2B_Ordering_Filters__c>();
        try {
            lst = [SELECT id, B2B_TXT_Country_ISO_Code__c, B2B_TXT_Country_Name__c, B2B_TXT_Currencies__c FROM Multi_One_Trade_B2B_Ordering_Filters__c WHERE B2B_CHK_Active__c = true];            
        }catch(Exception e){            
            System.debug('Exception type caught: ' + e.getTypeName());    
            System.debug('Message: ' + e.getMessage());    
            System.debug('Cause: ' + e.getCause());// returns null
            System.debug('Line number: ' + e.getLineNumber());    
            System.debug('Stack trace: ' + e.getStackTraceString());
        }
        return lst;
    }
    
    /*----------------------------------------------------------------------------------
Author:         Shahad Naji 
Company:        Deloitte
Description:    Gets the list of items to filters parameters for Local Banking service API Line
of them
History
<Date>          <Author>             <Description>
19/11/2020      Shahad Naji        	Initial version
----------------------------------------------------------------------------------*/
    public static List<Local_Banking_Filters__c> getLocalBankingFilters(){
        List<Local_Banking_Filters__c> lst = new List<Local_Banking_Filters__c>();
        try {
            lst = [SELECT id, LB_TXT_Country_ISO_Code__c, LB_TXT_Country_Name__c, LB_TXT_Currencies__c FROM Local_Banking_Filters__c WHERE LB_CHK_Active__c = true];            
        }catch(Exception e){            
            System.debug('Exception type caught: ' + e.getTypeName());    
            System.debug('Message: ' + e.getMessage());    
            System.debug('Cause: ' + e.getCause());// returns null
            System.debug('Line number: ' + e.getLineNumber());    
            System.debug('Stack trace: ' + e.getStackTraceString());
        }
        return lst;
    }
    
    public static ReturnValue sendEmailWithoutTemplate(String Subject, String Body, String OWAAddress, List<String> ToAddresses, List<String> bccAddresses, List<String> ccAddresses, Map<String, String> subjectReplacements, Map<String, String> bodyReplacements){
	
        ReturnValue response = null;
        List<Messaging.SendEmailResult> result;
            
        try{	
            List<OrgWideEmailAddress> owa = [SELECT Id, DisplayName, Address FROM OrgWideEmailAddress WHERE DisplayName = :OWAAddress LIMIT 1];
           
            if(!String.isNotBlank(Subject) && !String.isNotBlank(Body))
                throw new CustomException('Both Subject and Body cannot be empty');
    
            List<Messaging.SingleEmailMessage> allmsg = new List<Messaging.SingleEmailMessage>();
            Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();    
            
            if(!owa.isEmpty())
                mail.setOrgWideEmailAddressId(owa[0].id);
            
            if(subjectReplacements != null && String.isNotBlank(Subject)){
                for(String replacement : subjectReplacements.keySet())
                    Subject = Subject.replace(replacement, subjectReplacements.get(replacement));	              
            }
            
            if(bodyReplacements != null && String.isNotBlank(Body)){              
                for(String replacement : bodyReplacements.keySet())
                    Body = Body.replace(replacement, bodyReplacements.get(replacement));	               
            }
            
            mail.setToAddresses(ToAddresses);
            mail.setBccAddresses(bccAddresses);
            mail.setCcAddresses(ccAddresses);
            mail.setSubject(Subject);
            mail.setHtmlBody(body);
            mail.setSaveAsActivity(false); 
            
            allmsg.add(mail);
            result = Messaging.sendEmail(allmsg,false);
            
            Map<String, Object> value = new Map<String, Object>();
            value.put('result', result);
            response = new ReturnValue(true, value);
        }
        catch (Exception e) {
            System.debug('sendEmailWithoutTemplate: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
            
        return response;
    }
}