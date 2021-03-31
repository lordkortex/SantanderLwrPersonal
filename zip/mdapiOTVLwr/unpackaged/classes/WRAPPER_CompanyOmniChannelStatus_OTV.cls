global with sharing class WRAPPER_CompanyOmniChannelStatus_OTV {
  global WRAPPER_CompanyOmniChannelStatus_OTV() {
    System.debug('WRAPPER_CompanyOmniChannelStatus_OTV');
  }

  global class companyList {
    @AuraEnabled
    global String companyId;
    @AuraEnabled
    global String serviceId;
    @AuraEnabled
    global String status;

    global companyList() {
      System.debug('WRAPPER_CompanyOmniChannelStatus_OTV.companyList');
    }
  }

  @AuraEnabled
  global String companyId;
  @AuraEnabled
  global List<companyList> companyList;

  global static WRAPPER_CompanyOmniChannelStatus_OTV parse(String json) {
    return (WRAPPER_CompanyOmniChannelStatus_OTV) System.JSON.deserialize(
      json,
      WRAPPER_CompanyOmniChannelStatus_OTV.class
    );
  }
}
