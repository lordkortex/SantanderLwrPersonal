/*----------------------------------------------------------------------------------
Author:         Joaquín Vera Vallés
Company:        Deloitte
Description:    Controller of downloading accounts in Last Update
Test Class:     CNT_DownloadAccountsLUController_Test
History
<Date>			<Author>		<Description>
10/07/2020		Joaquín Vera Vallés     Initial version
----------------------------------------------------------------------------------*/
public with sharing class CNT_DownloadAccountsLUController {

    @AuraEnabled
    public static Map<String, CNT_DownloadAccountsLUController.parentGrouping> downloadAccountsController(String actualData, String actualGrouping, String consolidationCurrency, List<WRAPPER_AccountList.TipoDeCambio> tiposDeCambio)
    {
        String userNumberFormat = Global_Utilities.getUserNumberFormat(UserInfo.getUserId());

        //Deserializing data
        List<CNT_DownloadAccountsLUController.gettingParams> dataDeserialized = (List<CNT_DownloadAccountsLUController.gettingParams>) JSON.deserialize(actualData,  List<CNT_DownloadAccountsLUController.gettingParams>.class);

        //Instance of return data
        Map<String, CNT_DownloadAccountsLUController.parentGrouping> returnData = new  Map<String, CNT_DownloadAccountsLUController.parentGrouping>();

        //Iterating the grouping
        for (CNT_DownloadAccountsLUController.gettingParams allAccsWithAgr : dataDeserialized) 
        {
            //Instanciate parent grouping
            CNT_DownloadAccountsLUController.parentGrouping parentGrouping = new  CNT_DownloadAccountsLUController.parentGrouping();

            //The account country list is the list of the accounts with the income grouping
            List<WRAPPER_AccountList.AccountDetails> accountCountryList = allAccsWithAgr.value;

            //ITerate all accounts in the same grouping
            for(WRAPPER_AccountList.AccountDetails acc : allAccsWithAgr.value)
            {
                if(acc.amountMainBalance != null)
                {
                    acc.amountMainBalance_Formatted = new CNT_FormattedNumber(acc.amountMainBalance, userNumberFormat);

                }
                if(acc.amountAvailableBalance != null)
                {
                    acc.amountAvailableBalance_Formatted =  new CNT_FormattedNumber(acc.amountAvailableBalance, userNumberFormat);
                }
                //Getting the mapping field of the subgroup
                String mappingField = (fieldToMap(actualGrouping).equals('currencyCodeAvailableBalance') ? acc.currencyCodeAvailableBalance : acc.country);
               
                //If the subgroup isn't created, creates it, if it is created, adds the account to 
                if(parentGrouping.childList.get(mappingField) == null)
                {
                    CNT_DownloadAccountsLUController.childGrouping childGroup = new CNT_DownloadAccountsLUController.childGrouping();
                    childGroup.accountList.add(acc);

                    if(acc.amountMainBalance != null)
                        {
                            childGroup.temporalTotalBalance = acc.amountMainBalance;
                            childGroup.totalBalance = new CNT_FormattedNumber(childGroup.temporalTotalBalance, userNumberFormat);
                        }

                        if(acc.amountAvailableBalance != null)
                        {
                            childGroup.temporalAvailableBalance = acc.amountAvailableBalance;
                            childGroup.availableBalance = new CNT_FormattedNumber(childGroup.temporalAvailableBalance, userNumberFormat);
                        }


                    parentGrouping.childList.put(mappingField, childGroup);
                }
                else 
                {
                    CNT_DownloadAccountsLUController.childGrouping childGroup = parentGrouping.childList.get(mappingField);
                    childGroup.accountList.add(acc);

                    if(acc.amountMainBalance != null)
                    {
                        childGroup.temporalTotalBalance += acc.amountMainBalance;
                        childGroup.totalBalance = new CNT_FormattedNumber(childGroup.temporalTotalBalance, userNumberFormat);

                    }
                    
                    if(acc.amountAvailableBalance != null)
                    {
                        childGroup.temporalAvailableBalance += acc.amountAvailableBalance;
                        childGroup.availableBalance = new CNT_FormattedNumber(childGroup.temporalAvailableBalance, userNumberFormat);
                    }

                    
                    parentGrouping.childList.put(mappingField, childGroup);
                }
                if(!fieldToMap(actualGrouping).equals('currencyCodeAvailableBalance'))
                {
                    if(acc.amountMainBalance != null)
                    {
                        parentGrouping.temporalTotalBalance += acc.amountMainBalance;
                        parentGrouping.totalBalance = new CNT_FormattedNumber(parentGrouping.temporalTotalBalance, userNumberFormat);
                    }
                    
                    if(acc.amountAvailableBalance != null)
                    {
                        parentGrouping.temporalAvailableBalance += acc.amountAvailableBalance;
                        parentGrouping.availableBalance = new CNT_FormattedNumber(parentGrouping.temporalAvailableBalance, userNumberFormat); 
                    }
                }
                
            }
            //Adds the subgrouping to the returning data
            returnData.put(allAccsWithAgr.key, parentGrouping);
        }
        if(fieldToMap(actualGrouping).equals('currencyCodeAvailableBalance'))
        {
            returnData = exchangeRates(returnData, consolidationCurrency, tiposDeCambio);
        }
        return returnData;
    }

    private static Map<String, CNT_DownloadAccountsLUController.parentGrouping> exchangeRates(Map<String, CNT_DownloadAccountsLUController.parentGrouping> parentGrouping, String consolidationCurrency,  List<WRAPPER_AccountList.TipoDeCambio> tiposDeCambio)
    {

        String userNumberFormat = Global_Utilities.getUserNumberFormat(UserInfo.getUserId());

        Map<String, Decimal> currencyList = getCurrenciesList(tiposDeCambio);
        //Iterating the parent grouping
        for (String key : parentGrouping.keySet()) 
        {
            CNT_DownloadAccountsLUController.parentGrouping singleParent = parentGrouping.get(key);

             Double sumBookBalance = 0;
             Double sumAvailableBalance = 0;
             for(String singleChildKey : singleParent.childList.keySet())
             {
                
                 if(currencyList.containsKey(singleChildKey))
                 {
                    singleParent.temporalTotalBalance += (singleParent.childList.get(singleChildKey).temporalTotalBalance / currencyList.get(singleChildKey) * currencyList.get(consolidationCurrency));
                    singleParent.temporalAvailableBalance += (singleParent.childList.get(singleChildKey).temporalAvailableBalance / currencyList.get(singleChildKey) * currencyList.get(consolidationCurrency));
                 }
                 else
                 {
                    singleParent.temporalTotalBalance += (singleParent.childList.get(singleChildKey).temporalTotalBalance);
                    singleParent.temporalAvailableBalance += (singleParent.childList.get(singleChildKey).temporalAvailableBalance);
                 }
                 if(singleParent.childList.get(singleChildKey).temporalTotalBalance != null)
                 {
                    singleParent.totalBalance = new CNT_FormattedNumber( singleParent.temporalTotalBalance, userNumberFormat);
                 }
                 if(singleParent.childList.get(singleChildKey).temporalAvailableBalance != null)
                 {
                    singleParent.availableBalance = new CNT_FormattedNumber( singleParent.temporalAvailableBalance, userNumberFormat);
                 }
             }
        }
        return parentGrouping;
        
        

    }

    private static Map<String, Decimal> getCurrenciesList(List<WRAPPER_AccountList.TipoDeCambio> tiposDeCambio)
    {
        Map<String, Decimal> returnData = new Map<String, Decimal>();
        for(WRAPPER_AccountList.TipoDeCambio singleExchange : tiposDeCambio)
        {
            if(returnData.get(singleExchange.divisa) == null)
            {
                returnData.put(singleExchange.divisa, singleExchange.importeDecimal);
            }
        }
        
        return returnData;
    }



    private static String fieldToMap (String grouping)

    {
        if(grouping.equals(Label.Country))
        {
            return 'currencyCodeAvailableBalance';
        }
        else if(grouping.equals(Label.currency))
        {
            return 'country';
        }

        else
        {
            return 'currencyCodeAvailableBalance';
        }
    }

    public class gettingParams 
    {
        public String key;
        public List<WRAPPER_AccountList.AccountDetails> value;
    }

    public class parentGrouping 
    {
        @AuraEnabled public CNT_FormattedNumber totalBalance;
        @AuraEnabled public CNT_FormattedNumber availableBalance;
        private Double temporalTotalBalance = 0;
        private Double temporalAvailableBalance = 0;

        @AuraEnabled public Map<String, CNT_DownloadAccountsLUController.childGrouping> childList = new Map<String, CNT_DownloadAccountsLUController.childGrouping>();

        public parentGrouping(){}

    }

    public class childGrouping {

        @AuraEnabled public CNT_FormattedNumber totalBalance ;
        @AuraEnabled public CNT_FormattedNumber availableBalance;
        private Double temporalTotalBalance = 0;
        private Double temporalAvailableBalance  = 0;

        @AuraEnabled public List<WRAPPER_AccountList.AccountDetails> accountList = new List<WRAPPER_AccountList.AccountDetails>(); 

        public childGrouping(){}

    }
}