global with sharing class WS_BeneficiaryAccounts {

    private String method;
    private String endPoint;
    private String tokenPlatform;
    private String tokenUser;

    private List<WRAPPER_AccountList.AccountDetails> result;

    private WrapperUserData userData;
    private WRAPPER_AccountList.AccountDetails sourceAccount;

    global WS_BeneficiaryAccounts (WrapperUserData userData, WRAPPER_AccountList.AccountDetails sourceAccount) {
        CNT_ApiConfiguration__c configWs = new CNT_ApiConfiguration__c();
        configWs = CNT_ApiConfiguration__c.getValues('WS_BeneficiaryAccounts');
        this.endpoint = configWs.CNT_Endpoint__c;
        this.method = configWs.CNT_HTTPMethod__c;
        this.tokenPlatform = configWs.tokenPlatform__c;
        this.tokenUser = configWs.tokenUser__c;
        this.userData = userData;
        this.sourceAccount = sourceAccount;
    }

    global List<WRAPPER_AccountList.AccountDetails> execute () {
        String companyGlobalId = null;
        String countryOriginator = null; 
        if (sourceAccount != null){
            if (sourceAccount.companyIdsList != null){
                 companyGlobalId = sourceAccount.companyIdsList.get(System.Label.CNF_GTSIdentifier);
            } 
            if(sourceAccount.country != null){
                countryOriginator = sourceAccount.country;
            }           
        }
        return execute(companyGlobalId, countryOriginator);
    }

    global List<WRAPPER_AccountList.AccountDetails> execute (String companyGlobalId, String countryOriginator) {
        this.result = new List<WRAPPER_AccountList.AccountDetails>(); 
        try {
            if (String.isNotBlank(companyGlobalId)) {
                this.endPoint = this.endPoint.replace('{companyGlobalId}', companyGlobalId);
            } else {
                throw new CustomException('Empty company global ID.');
            }
            if (String.isNotBlank(countryOriginator)){
                this.endPoint = this.endPoint.replace('{countryOriginator}', countryOriginator);
             } else {
                throw new CustomException('Empty Country Originator.');
            }
            Map<String,String> extraHeaderParameters = new Map<String,String> ();
            extraHeaderParameters.put('X-Santander-Client-Id', this.userData.userId);
            String serviceResponse = Global_IntegrationWrapper.launchHTTP(null, this.endPoint, this.method);
            if (String.isNotBlank(serviceResponse)) {
                WS_BeneficiaryAccounts.OUTPUT output = (WS_BeneficiaryAccounts.OUTPUT) JSON.deserialize(serviceResponse, WS_BeneficiaryAccounts.OUTPUT.class);
                this.result = getList(output);
            } else {
                throw new CustomException('Error when consulting the beneficiary accounts.');
            }
                
        } catch (Exception e) {
            System.debug('WS_BeneficiaryAccounts.execute: ' + e.getMessage() + ', ' + ' in line: ' + e.getLineNumber());
            throw new CustomException(e.getMessage());
        }
        return this.result;
    }

    global List<WRAPPER_AccountList.AccountDetails> getList (WS_BeneficiaryAccounts.OUTPUT output) {
        List<WRAPPER_AccountList.AccountDetails> result = new List<WRAPPER_AccountList.AccountDetails>();
        String serviceAPILine = ServiceAPILine.getAPILine();

        if (output != null) {
            for (AccountsData accountsData : output.accountsListResponse.accountsDataList) {
                WRAPPER_AccountList.AccountDetails element = new WRAPPER_AccountList.AccountDetails();

                if(accountsData.accountIdList != null){
                    if(accountsData.accountIdList.size() == 1){
                        element.displayNumber =  accountsData.accountIdList.get(0).accountId;
                        element.idType = accountsData.accountIdList.get(0).idType;
                    }else{
                        //NEXUS
                        if (serviceAPILine == System.Label.PAY_ServiceAPILine_002) {
                            for(WS_BeneficiaryAccounts.AccountId accountIdListItem : accountsData.accountIdList){
                                if(accountIdListItem.idType == 'BBA'){
                                    element.displayNumber = accountIdListItem.accountId;
                                    element.idType = accountIdListItem.idType;
                                }
                            }
                            
                            if(element.displayNumber == null && element.idType == null){
                                element.displayNumber =  accountsData.accountIdList.get(0).accountId;
                                element.idType = accountsData.accountIdList.get(0).idType;
                            }
                            
                        } else if (serviceAPILine == System.Label.PAY_ServiceAPILine_001|| serviceAPILine == System.Label.PAY_ServiceAPILine_003) { //LOCAL OR AQUANIMA
                            for(WS_BeneficiaryAccounts.AccountId accountIdListItem : accountsData.accountIdList){
                                if(accountIdListItem.idType == 'IBA'){
                                    element.displayNumber = accountIdListItem.accountId;
                                    element.idType = accountIdListItem.idType;
                                }
                            }
                            
                            if(element.displayNumber == null && element.idType == null){
                                element.displayNumber =  accountsData.accountIdList.get(0).accountId;
                                element.idType = accountsData.accountIdList.get(0).idType;
                            }
                        }
                    }
                }
                
                element.alias = accountsData.alias;
                element.type = accountsData.type;
                //element.idType = accountsData.type; 
                element.description = accountsData.description;
                element.status = accountsData.status;
                element.codigoCorporate = accountsData.customerId;
                element.customerId = accountsData.customerId;
                element.country = accountsData.country; 
                if(String.isNotBlank(accountsData.country)){
                    element.mandatoryPurpose = Global_Utilities.getCountryMandatoryPurpose(accountsData.country);
                }
                element.countryName = Global_Utilities.getCountryName(accountsData.country);
                
               if(accountsData.accountHolderAddress != null){
                    element.address = new WRAPPER_AccountList.Address();
               		if(accountsData.accountHolderAddress.streetName != null){
                    	element.address.streetName = accountsData.accountHolderAddress.streetName;
                    }
                   if(accountsData.accountHolderAddress.townName != null){
                    	element.address.townName = accountsData.accountHolderAddress.townName;
                   }
                   if(accountsData.accountHolderAddress.country != null){
                       element.address.country = accountsData.accountHolderAddress.country;
                   }
				}
                
                if(accountsData.companyIdsList != null){
                    Map<String, String> auxCompanyIds = new  Map<String, String>();
                    for(CompanyId idItem : accountsData.companyIdsList){
                        if(String.isNotBlank(idItem.id) && String.isNotBlank(idItem.idType))
                        auxCompanyIds.put(idItem.idType, idItem.id);
                    }
                    element.companyIdsList = auxCompanyIds;
                }
                
                 
                if(accountsData.bankId != null){
					if(String.isNotEmpty(accountsData.bankId)){
						String bic_aux = accountsData.bankId;
						if(bic_aux.length() >= 11){ 
							element.bic =  accountsData.bankId.substring(0,4);
							element.branch =  accountsData.bankId.substring(8,11);
							element.locatorbic =  accountsData.bankId.substring(6,8);
							element.paisbic =  accountsData.bankId.substring(4,6); 
                        } else {
                            element.bic =  accountsData.bankId.substring(0,4);
							element.branch =  'XXX';
							element.locatorbic = accountsData.bankId.substring(6,8);
							element.paisbic =  accountsData.bankId.substring(4,6); 
                        }
						element.codigoBic = accountsData.bankId; 
					}
                }
                element.bankName = accountsData.bankDescription;
                element.parentCustomerName = accountsData.parentCustomerName;
                element.subsidiaryName = accountsData.customerName;
                element.lastTransaction = accountsData.lastTransactionDate;
                if (accountsData.mainBalance != null) {
                    element.amountMainBalance = accountsData.mainBalance.amount;
                    element.currencyCodeMainBalance = accountsData.mainBalance.currencyCode;
                    element.lastupdateMainBalance = accountsData.mainBalance.lastUpdate;
                }
                if (accountsData.availableBalance != null) {
                    element.amountAvailableBalance = accountsData.availableBalance.amount;
                    element.currencyCodeAvailableBalance = accountsData.availableBalance.currencyCode;
                    element.lastUpdateAvailableBalance = accountsData.availableBalance.lastUpdate;
                }
                if (accountsData.withholdingBalance != null) {
                    element.amountWithholdingBalance = accountsData.withholdingBalance.amount;
                    element.currencyCodeWithholdingBalance = accountsData.withholdingBalance.currencyCode;
                    element.lastudpateWithholdingBalance = accountsData.withholdingBalance.lastUpdate;
                }
                if (accountsData.overdraftLimit != null) {
                    element.amountOverdraftLimit = accountsData.overdraftLimit.amount;
                    element.currencycodeOverdraftLimit = accountsData.overdraftLimit.currencyCode;
                    element.lastUpdateOverdraftLimit = accountsData.overdraftLimit.lastUpdate;
                }
                element.hasSwiftPayment = accountsData.hasSwiftPayments;
                element.hasSwiftPayments = accountsData.hasSwiftPayments;
                element.balanceAllowed = accountsData.balanceAllowed;
                element.internationalPaymentsAllowed = accountsData.internationalPaymentsAllowed;
                result.add(element);
            }
        } 
        return result;
    }

    global class AccountHolderAddress {
        @AuraEnabled
		global String streetName {get;set;}
        @AuraEnabled 
		global String townName {get;set;}
		@AuraEnabled
		global String country {get;set;}
		global AccountHolderAddress () {}  
	}
    
    global with sharing class OUTPUT { 
        @AuraEnabled
        global AccountsListResponse accountsListResponse {get;set;}
    }

    global with sharing class AccountsListResponse {
        global List<AccountsData> accountsDataList {get;set;}
        global AccountsListResponse () {
        }
    }

    global with sharing class AccountsData {
        global Boolean transactionsAllowed {get;set;}
        global String displayNumber {get;set;}
        global List<AccountId> accountIdList {get;set;}
        global String alias {get;set;}
        global AccountHolderAddress accountHolderAddress {get;set;}
        global String aliasGts {get;set;}
        global String type {get;set;}
        global String description {get;set;}
        global String status {get;set;}
        global String customerId {get;set;}
        global String country {get;set;}
        global String bankId {get;set;}
        global String bankDescription {get;set;}
        global String parentCustomerName {get;set;}
        global String customerName {get;set;}
        global String lastTransactionDate {get;set;}
        global Balance mainBalance {get;set;}
        global Balance availableBalance {get;set;}
        global Balance pendingBalance {get;set;}
        global Balance withholdingBalance {get;set;}
        global Balance overdraftLimit {get;set;}
        global Balance overdraftUsed {get;set;}
        global String hasSwiftPayments {get;set;}
        global Balance closedBalance {get;set;}
        global Balance closedAvailableBalance {get;set;}
        global String lastUpdateSwiftPayment {get;set;}
        global Boolean pain002Active {get;set;}
        global Boolean balanceAllowed {get;set;}
        global Boolean internationalPaymentsAllowed {get;set;}
        global List<CompanyId> companyIdsList {get;set;} 

        global AccountsData () {
        }
    }

    global with sharing class AccountId {
        global String idType {get;set;}
        global String accountId {get;set;}

        global AccountId () {
        }
    }
    
     global with sharing class CompanyId {
        global String id {get;set;} 
        global String idType {get;set;}
        
        global CompanyId(){
            System.debug('WRAPPER_Balance_LU.CompanyId');
        }
     }
        

    global with sharing class Balance {
        global Decimal amount {get;set;}
        global String currencyCode {get;set;}
        global String lastUpdate {get;set;}

        global Balance () {
        }
    }
}