/*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Apex class to filter accounts received from "CNT_BalanceLastUpdate" and/or "CNT_OneT_Accounts" services 
				For more information about "CNT_BalanceLastUpdate" and "CNT_BalanceLastUpdate" configuration access Setup > Custom Settings > API Configuration
Test Class:     ServiceFilterAccounts_Test
History
<Date>          <Author>        <Description>
12/11/2020      Shahad Naji     Initial version
----------------------------------------------------------------------------------*/
public with sharing class ServiceFilterAccounts {
  public static final String LIST_INTERNATIONAL_PAYMENS = 'list_international_payments';
  public static final String ADD_INTERNATIONAL_PAYMENT_INTERNAL = 'add_international_payment_internal';
  public static final String ADD_INTERNATIONAL_PAYMENT_EXTERNAL = 'add_international_payment_external';
  public static final String ADD_INTER_PAYM_INT_CUST_DIFF_GROUP = 'add_inter_paym_int_cust_diff_group';

  public static final String MULTI_ONE_TRADE = System.Label.PAY_ServiceAPILine_001; //'MULTI_ONE_TRADE';
  public static final String NEXUS = System.Label.PAY_ServiceAPILine_002; //'NEXUS';
  public static final String LOCAL_BANKING = System.Label.PAY_ServiceAPILine_003; //'LOCAL_BANKING';

  /*----------------------------------------------------------------------------------
Author:         Shahad Naji 
Company:        Deloitte
Description:    Method to discard accounts by country 
History
<Date>          <Author>           <Description>
12/11/2020     Shahad Naji        Initial version
----------------------------------------------------------------------------------*/
  public static Set<WRAPPER_AccountList.AccountDetails> discardAccountsByCountry(
    List<WRAPPER_AccountList.AccountDetails> accountList,
    List<String> countries
  ) {
    Set<WRAPPER_AccountList.AccountDetails> result = new Set<WRAPPER_AccountList.AccountDetails>();
    try {
      if (accountList != null && countries != null) {
        if (!accountList.isEmpty() && !countries.isEmpty()) {
          for (WRAPPER_AccountList.AccountDetails account : accountList) {
            if (!countries.contains(account.country)) {
              result.add(account);
            }
          }
        } else {
          result = null;
        }
      } else {
        result = null;
      }
    } catch (Exception e) {
      System.debug(
        'ServiceFilterAccounts.discardAccountsByCountry: ' +
        e.getMessage() +
        ', in line: ' +
        e.getLineNumber()
      );
      result = null;
    }
    return result;
  }

  /*----------------------------------------------------------------------------------
Author:         Shahad Naji 
Company:        Deloitte
Description:    Get the list of accounts filtered by country and/or currency, to submit a "book to book" payment
of them
History
<Date>          <Author>             <Description>
30/09/2020      Shahad Naji        	Initial version
----------------------------------------------------------------------------------*/
  public static Set<WRAPPER_AccountList.AccountDetails> filterAccountsByCountryAndCurrency(
    WrapperUserData userData,
    List<WRAPPER_AccountList.AccountDetails> accountLst
  ) {
    Set<WRAPPER_AccountList.AccountDetails> responseAccountLst = new Set<WRAPPER_AccountList.AccountDetails>();

    try {
      if (userData == null) {
        userData = ServiceUserData.getUserData();
      }
      if (userData != null && accountLst != null) {
        String serviceAPILine = ServiceAPILine.getAPILine(userData);
        if (!accountLst.isEmpty()) {
          if (serviceAPILine == MULTI_ONE_TRADE) {
            //MULTI_ONE_TRADE
            List<Multi_One_Trade_B2B_Ordering_Filters__c> filterValues = Global_Utilities.getMultiOneTradeB2BOrderingFilters();
            for (WRAPPER_AccountList.AccountDetails acc : accountLst) {
              for (Multi_One_Trade_B2B_Ordering_Filters__c fv : filterValues) {
                if (
                  acc.country.equalsIgnoreCase(fv.B2B_TXT_Country_ISO_Code__c)
                ) {
                  if (String.isNotEmpty(fv.B2B_TXT_Currencies__c)) {
                    List<String> currencyLst = fv.B2B_TXT_Currencies__c.split(
                      ';'
                    );
                    if (
                      currencyLst.contains(acc.currencyCodeAvailableBalance)
                    ) {
                      responseAccountLst.add(acc);
                    }
                  } else {
                    responseAccountLst.add(acc);
                  }
                }
              }
            }
          } else if (serviceAPILine == NEXUS) {
            //NEXUS
            List<Nexus_B2B_Ordering_Filters__c> filterValues = Global_Utilities.getNexusB2BOrderingFilters();
            for (WRAPPER_AccountList.AccountDetails acc : accountLst) {
              for (Nexus_B2B_Ordering_Filters__c fv : filterValues) {
                if (
                  acc.country.equalsIgnoreCase(fv.B2B_TXT_Country_ISO_Code__c)
                ) {
                  if (String.isNotEmpty(fv.B2B_TXT_Currencies__c)) {
                    List<String> currencyLst = fv.B2B_TXT_Currencies__c.split(
                      ';'
                    );
                    if (
                      currencyLst.contains(acc.currencyCodeAvailableBalance)
                    ) {
                      responseAccountLst.add(acc);
                    }
                  } else {
                    responseAccountLst.add(acc);
                  }
                }
              }
            }
          } else if (serviceAPILine == LOCAL_BANKING) {
            //LOCAL_BANKING
            List<Local_Banking_Filters__c> filterValues = Global_Utilities.getLocalBankingFilters();

            for (WRAPPER_AccountList.AccountDetails acc : accountLst) {
              for (Local_Banking_Filters__c fv : filterValues) {
                if (
                  acc.country.equalsIgnoreCase(fv.LB_TXT_Country_ISO_Code__c) &&
                  acc.country.equalsIgnoreCase(userData.country)
                ) {
                  if (String.isNotEmpty(fv.LB_TXT_Currencies__c)) {
                    List<String> currencyLst = fv.LB_TXT_Currencies__c.split(
                      ';'
                    );
                    if (
                      currencyLst.contains(
                        acc.currencyCodeAvailableBalance.trim()
                      )
                    ) {
                      responseAccountLst.add(acc);
                    }
                  } else {
                    responseAccountLst.add(acc);
                  }
                }
              }
            }
          } else {
            responseAccountLst = null;
          }
        }
      } else {
        responseAccountLst = null;
      }
    } catch (Exception e) {
      System.debug(
        'ServiceFilterAccounts.filterAccountsByCountryAndCurrency: ' +
        e.getMessage() +
        ', in line: ' +
        e.getLineNumber()
      );
      responseAccountLst = null;
    }

    return responseAccountLst;
  }

  /*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Method to get accounts filtered by attributions response
History
<Date>          <Author>             <Description>
19/11/2020     Shahad Naji        Initial version
----------------------------------------------------------------------------------*/

  public static List<WRAPPER_AccountList.AccountDetails> filterAccountsByAttributions(
    List<WRAPPER_AccountList.AccountDetails> accountList,
    List<String> services
  ) {
    List<WRAPPER_AccountList.AccountDetails> accountListResponse = new List<WRAPPER_AccountList.AccountDetails>();
    try {
      if (accountList != null) {
        if (!accountList.isEmpty()) {
          WS_Attributions wsAttributions = new WS_Attributions();
          wsAttributions.execute(null, null, services, null, null, null);
          if (wsAttributions.getResponse() != null) {
            System.debug(
              'wsAttributions.getResponse(): ' + wsAttributions.getResponse()
            );
            if (wsAttributions.getResponse().serviceListResponse != null) {
              if (
                wsAttributions.getResponse()
                  .serviceListResponse.serviceDataList != null
              ) {
                // 07-09-2020 - SNJ - comment callout code to not filter accounts by attibutions result
                accountList = ServiceFilterAccounts.getAccountsByAttributionsAndServices(
                  accountList,
                  wsAttributions.getResponse()
                    .serviceListResponse.serviceDataList,
                  services
                );
                accountListResponse = accountList;
              }
            }
          }
        }
      }
    } catch (Exception e) {
      System.debug(
        'ServiceFilterAccounts.filterAccountsByAttributions: ' +
        e.getMessage() +
        ', in line: ' +
        e.getLineNumber()
      );
      accountListResponse = null;
    }
    return accountListResponse;
  }

  /*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Method to get accounts filtered by channel services response
History
<Date>          <Author>             <Description>
18/11/2020     	Julian Hoyos        	Initial version
28/12/2020		Shahad Naji			Add userData as an input parameter
----------------------------------------------------------------------------------*/
  //TODO:change the content of the following method by invoking the methods of ServiceChannelServices class
  public static List<WRAPPER_AccountList.AccountDetails> filterAccountsByChannelServices(
    WrapperUserData userData,
    List<WRAPPER_AccountList.AccountDetails> accountList,
    List<String> services
  ) {
    List<WRAPPER_AccountList.AccountDetails> accountListResponse = new List<WRAPPER_AccountList.AccountDetails>();
    try {
      accountListResponse = ServiceChannelServices.filterAccountsByChannelServices(
        userData,
        accountList,
        services
      );
      /*   String customer_id = '';
            if(userData != null){
                customer_id = String.isNotBlank(userData.localUid) ? userData.localUid : '';
            }
            if(accountList != null){
                if(!accountList.isEmpty()){
                    WS_ChannelServices wsChannelServices = new WS_ChannelServices();
                    wsChannelServices.execute(null, customer_id, services, null, null, null, null);
                    if(wsChannelServices.getResponse() != null){                        
                        if(wsChannelServices.getResponse().servicesDataList != null){
                            accountList = ServiceFilterAccounts.getAccountsByChannelServiceAndServices (accountList, wsChannelServices.getResponse().servicesDataList, services);
                            accountListResponse =  accountList;
                        }                          
                    }
                }
            }*/
    } catch (Exception e) {
      System.debug(
        'ServiceFilterAccounts.filterAccountsByChannelServices: ' +
        e.getMessage() +
        ', in line: ' +
        e.getLineNumber()
      );
      accountListResponse = null;
    }
    return accountListResponse;
  }

  private static List<WRAPPER_AccountList.AccountDetails> getAccountsByAttributionsAndServices(
    List<WRAPPER_AccountList.AccountDetails> accountList,
    List<WS_Attributions.ServiceDataDetails> serviceDataList,
    List<String> services
  ) {
    List<WRAPPER_AccountList.AccountDetails> res = new List<WRAPPER_AccountList.AccountDetails>();
    try {
      List<String> contractIds = ServiceFilterAccounts.filterAccountsByServices(
        serviceDataList,
        services
      );
      for (WRAPPER_AccountList.AccountDetails account : accountList) {
        if (contractIds.contains(account.displayNumber)) {
          res.add(account);
        }
      }
    } catch (Exception e) {
      System.debug(
        'ServiceFilterAccounts.getAccountsByAttributions: ' +
        e.getMessage() +
        ', in line: ' +
        e.getLineNumber()
      );
    }
    return res;
  }

  private static List<String> filterAccountsByServices(
    List<WS_Attributions.ServiceDataDetails> serviceDataList,
    List<String> services
  ) {
    List<String> res = new List<String>();
    System.debug('bh_debug services: ' + services);
    try {
      for (WS_Attributions.ServiceDataDetails serviceData : serviceDataList) {
        if (serviceData.status != null) {
          if (serviceData.status == 'active') {
            if (serviceData.relationList != null) {
              for (
                WS_Attributions.RelationList relation : serviceData.relationList
              ) {
                if (relation.operabilityIndicator != null) {
                  if (
                    services.contains(LIST_INTERNATIONAL_PAYMENS) &&
                    relation.operabilityIndicator.equalsIgnoreCase('Consultive')
                  ) {
                    System.debug(
                      'bh_debug servicefilterAccounts 1: ' + relation.contratId
                    );
                    res.add(relation.contratId);
                  } else if (
                    (services.contains(ADD_INTERNATIONAL_PAYMENT_INTERNAL) ||
                    services.contains(ADD_INTERNATIONAL_PAYMENT_EXTERNAL) ||
                    services.contains(ADD_INTER_PAYM_INT_CUST_DIFF_GROUP)) &&
                    relation.operabilityIndicator.equalsIgnoreCase('Operative')
                  ) {
                    res.add(relation.contratId);
                    System.debug(
                      'bh_debug servicefilterAccounts 2: ' + relation.contratId
                    );
                  }
                }
              }
            }
          }
        }
      }
    } catch (Exception e) {
      System.debug(
        'ServiceFilterAccounts.filterAccountsByServices: ' +
        e.getMessage() +
        ', in line: ' +
        e.getLineNumber()
      );
    }
    return res;
  }

  /*----------------------------------------------------------------------------------
Author:         Julian Hoyos
Company:        Deloitte
Description:    Method to get the list of accounts filtered by a certain list of services 

History
<Date>          <Author>             <Description>
18/11/2020     Julian Hoyos        Initial version
29/11/2020		Shahad Naji 		Revised WS_ChannelServices parameters 
----------------------------------------------------------------------------------*/
  //DEPRECATED
  /*private static List<WRAPPER_AccountList.AccountDetails> getAccountsByChannelServiceAndServices (List<WRAPPER_AccountList.AccountDetails> accountList, List<WS_ChannelServices.ServicesDataList> servicesDataList, List<String> services) {
        List<WRAPPER_AccountList.AccountDetails> res = new List<WRAPPER_AccountList.AccountDetails>(); 
        try {
            List<String> contractIds = ServiceFilterAccounts.filterAccountsByChannelServices(servicesDataList, services);            
            for (WRAPPER_AccountList.AccountDetails account : accountList) {
                if (contractIds.contains(account.displayNumber)) {
                    res.add(account);
                }
            }
        } catch (Exception e) {
            System.debug('ServiceFilterAccounts.getAccountsByChannelServices: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
        return res;
    }*/

  /*----------------------------------------------------------------------------------
Author:         Julian Hoyos
Company:        Deloitte
Description:    Method to get the list of contractsIds filtered by services list values and operativityIndicatorContract 
			
History
<Date>          <Author>             <Description>
18/11/2020     	Shahad Naji         Initial version
----------------------------------------------------------------------------------*/
  //DEPRECATED
  /* private static List<String> filterAccountsByChannelServices(List<WS_ChannelServices.ServicesDataList> servicesDataList, List<String> services) {
        List<String> res = new List<String>(); 
        try {
            for(WS_ChannelServices.ServicesDataList serviceData : servicesDataList){
                if(String.isNotBlank(serviceData.serviceId)){
                    if(services.contains(serviceData.serviceId)){
                        if(serviceData.contractsList != null){
                            if(!serviceData.contractsList.isEmpty()){
                                for(WS_ChannelServices.ContractsList contractData : serviceData.contractsList){
                                    if(String.isNotBlank(contractData.operativityIndicatorContract)){
                                        if(contractData.operativityIndicatorContract == 'Operative'){
                                            if(String.isNotBlank(contractData.contractId)){
                                                res.add(contractData.contractId);
                                            }
                                        }
                                    }
                                }
                            }
                            
                        } 
                    }
                }                   
                
            }
        } catch (Exception e) {
            System.debug('ServiceFilterAccounts.filterAccountsByChannelServices: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
        return res;
    }*/

  public static void filterBalanceView(
    List<WRAPPER_AccountList.AccountDetails> beneficiaryAccounts,
    List<WRAPPER_AccountList.AccountDetails> originAccounts
  ) {
    Set<String> originNumbers = new Set<String>();
    //Get origin accounts number
    for (WRAPPER_AccountList.AccountDetails origin : originAccounts) {
      originNumbers.add(origin.displayNumber);
    }
    //Filter accounts Balance
    if (!originNumbers.isEmpty()) {
      for (
        WRAPPER_AccountList.AccountDetails beneficiary : beneficiaryAccounts
      ) {
        if (!originNumbers.contains(beneficiary.displayNumber)) {
          beneficiary.amountAvailableBalance = null;
          beneficiary.amountMainBalance = null;
        }
      }
    }
  }
}
