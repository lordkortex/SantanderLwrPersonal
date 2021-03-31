global with sharing class ServiceChannelServices {

    /*
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Method to get accounts filtered by channel services response
    History
    <Date>          <Author>             <Description>
    26/01/2021		Shahad Naji       	Initial version
    */
    global static List<WRAPPER_AccountList.AccountDetails> filterAccountsByChannelServices (WrapperUserData userData, List<WRAPPER_AccountList.AccountDetails> accountList, List<String> services) {
        List<WRAPPER_AccountList.AccountDetails> accountListResponse = new List<WRAPPER_AccountList.AccountDetails>();
        try {
            Boolean multipleCallouts = ServiceChannelServices.isChannelAccessAgreementIdRequired(userData);
            if (multipleCallouts) {
                accountListResponse =  ServiceChannelServices.executeMultipleCallouts(accountList, services);
            } else {
                accountListResponse = ServiceChannelServices.executeOneCallout(accountList, services);
            }
        } catch (Exception e) {
            System.debug('ServiceChannelServices.filterAccountsByChannelServices: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            accountListResponse = null;
        }
        return accountListResponse;
    }

    @TestVisible
    private static List<WRAPPER_AccountList.AccountDetails> executeMultipleCallouts(List<WRAPPER_AccountList.AccountDetails> accountList, List<String> services) {
        List<WRAPPER_AccountList.AccountDetails> accountListResponse = new List<WRAPPER_AccountList.AccountDetails>();
        try {
            List<Map<String, String>> otherAccountDataList = getAccountsData(accountList);
            if (otherAccountDataList.isEmpty()) {
                throw new CustomException('We not found otherAccountDataList');
            }
            List<WS_ChannelServices.ServicesDataList> servicesDataList = new List<WS_ChannelServices.ServicesDataList>();
            for (Map<String, String> oad : otherAccountDataList) {
                String channelAccessAgreementId = (String) oad.get('customerId');
                String country = (String) oad.get('country');
                String codigoBic = (String) oad.get('codigoBic');
                WS_ChannelServices.OUTPUT output = new WS_ChannelServices.OUTPUT();
                WS_ChannelServices wsChannelServices = new WS_ChannelServices();
                output = wsChannelServices.execute(null, null, services, null, null, null, channelAccessAgreementId, country, codigoBic);
                if (output != null && output.servicesDataList != null && !output.servicesDataList.isEmpty()) {
                    servicesDataList.addAll(output.servicesDataList);
                }
            }
            if (servicesDataList.isEmpty()) {
                throw new CustomException('We not found servicesDataList');
            }
            accountListResponse = ServiceChannelServices.getAccountsByChannelServiceAndServices(accountList, servicesDataList, services);
        } catch (Exception e) {
            System.debug('ServiceChannelServices.executeMultipleCallouts: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            accountListResponse = null;
        }
        return accountListResponse;
    }

    @TestVisible
    private static List<WRAPPER_AccountList.AccountDetails> executeOneCallout (List<WRAPPER_AccountList.AccountDetails> accountList, List<String> services) {
        List<WRAPPER_AccountList.AccountDetails> accountListResponse = new List<WRAPPER_AccountList.AccountDetails>();
        try {
            if (accountList != null && !accountList.isEmpty()) {
                WS_ChannelServices wsChannelServices = new WS_ChannelServices();
                wsChannelServices.execute(null, null, services, null, null, null, null);
                if (wsChannelServices.getResponse() != null) {
                    if (wsChannelServices.getResponse().servicesDataList != null) {
                        accountList = ServiceChannelServices.getAccountsByChannelServiceAndServices(accountList, wsChannelServices.getResponse().servicesDataList, services);
                        accountListResponse =  accountList;
                    }
                }
            }
        } catch (Exception e) {
            System.debug('ServiceChannelServices.executeOneCallout: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            accountListResponse = null;
        }
        return accountListResponse;
    }

    /*
    Author:         Julian Hoyos
    Company:        Deloitte
    Description:    Method to get the list of accounts filtered by a certain list of services
    History:
    <Date>          <Author>            <Description>
    18/11/2020      Julian Hoyos        Initial version
    29/11/2020      Shahad Naji         Revised WS_ChannelServices parameters
    26/01/2021      Shahad Naji         Removes the method from ServiceFilterAccounts class and add it into this class
    */
    @TestVisible
    private static List<WRAPPER_AccountList.AccountDetails> getAccountsByChannelServiceAndServices (List<WRAPPER_AccountList.AccountDetails> accountList, List<WS_ChannelServices.ServicesDataList> servicesDataList, List<String> services) {
        List<WRAPPER_AccountList.AccountDetails> res = new List<WRAPPER_AccountList.AccountDetails>();
        try {
            List<String> contractIds = ServiceChannelServices.filterAccountsByChannelServices(servicesDataList, services);
            for (WRAPPER_AccountList.AccountDetails account : accountList) {
                if (contractIds.contains(account.displayNumber)) {
                    res.add(account);
                }
            }
        } catch (Exception e) {
            System.debug('ServiceChannelServices.getAccountsByChannelServices: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
        return res;
    }

    /*
    Author:         Julian Hoyos
    Company:        Deloitte
    Description:    Method to get the list of contractsIds filtered by services list values and operativityIndicatorContract
    History:
    <Date>          <Author>            <Description>
    18/11/2020      Shahad Naji         Initial version
    29/11/2020      Shahad Naji         Revised WS_ChannelServices parameters
    26/01/2021      Shahad Naji         Removes the method from ServiceFilterAccounts class and add it into this class
    */
    @TestVisible
    private static List<String> filterAccountsByChannelServices(List<WS_ChannelServices.ServicesDataList> servicesDataList, List<String> services) {
        List<String> res = new List<String>();
        try {
            for (WS_ChannelServices.ServicesDataList serviceData : servicesDataList) {
                if (String.isNotBlank(serviceData.serviceId)) {
                    if (services.contains(serviceData.serviceId)) {
                        if (serviceData.contractsList != null) {
                            if (!serviceData.contractsList.isEmpty()) {
                                for (WS_ChannelServices.ContractsList contractData : serviceData.contractsList) {
                                    if (String.isNotBlank(contractData.operativityIndicatorContract)) {
                                        if (contractData.operativityIndicatorContract == 'Operative') {
                                            if (String.isNotBlank(contractData.contractId)) {
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
            System.debug('ServiceChannelServices.filterAccountsByChannelServices: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
        return res;
    }

    @TestVisible
    private static Boolean isChannelAccessAgreementIdRequired (WrapperUserData userData) {
        Boolean isChannelAccessAgreementIdRequired = false;
        try {
            if (userData != null) {
                if (userData.country == 'PL') {
                    isChannelAccessAgreementIdRequired = true;
                }
            }
        } catch (Exception e) {
            System.debug('ServiceChannelServices.isChannelAccessAgreementIdRequired: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            return null;
        }
        return isChannelAccessAgreementIdRequired;
    }

    /*
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Method to get a set of customer ids of the accounts that belong to the current user
    History:
    <Date>          <Author>            <Description>
    27/01/2021      Shahad Naji         Initial version
    18/02/2021      Candido             Refactorized to get country and bic of every account
    */
    @TestVisible
    private static List<Map<String, String>> getAccountsData (List<WRAPPER_AccountList.AccountDetails> accountList) {
        List<Map<String, String>> response = new List<Map<String, String>>();
        Set<String> backupCustomerIds = new Set<String>();
        try {
            for (WRAPPER_AccountList.AccountDetails acc : accountList) {
                if (String.isNotBlank(acc.customerId)) {
                    if (!backupCustomerIds.contains(acc.customerId)) {
                        backupCustomerIds.add(acc.customerId);
                        Map<String, String> accountData = new Map<String, String>();
                        accountData.put('customerId', acc.customerId);
                        accountData.put('country', acc.country);
                        accountData.put('codigoBic', acc.codigoBic);
                        response.add(accountData);
                    }
                }
            }
        } catch (Exception e) {
            System.debug('ServiceChannelServices.getAccountsData: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
        return response;
    }
}