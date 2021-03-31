global with sharing class WRAPPER_Services_OTV {
  global WRAPPER_Services_OTV() {
    System.debug('WRAPPER_Services_OTV');
  }

  global class ServiceOmnichannelUser {
    @AuraEnabled
    global String omnichannelId;
    @AuraEnabled
    global String userID;
    @AuraEnabled
    global String role;
    @AuraEnabled
    global List<Services> services;

    global ServiceOmnichannelUser() {
      System.debug('WRAPPER_Services_OTV');
    }
  }

  global class Services {
    @AuraEnabled
    global String serviceId;
    @AuraEnabled
    global String productType;
    @AuraEnabled
    global List<Contracts> contracts;

    global Services() {
      System.debug('WRAPPER_Services_OTV.Services');
    }
  }

  global class Contracts {
    @AuraEnabled
    global String contractId;
    @AuraEnabled
    global String contractType;
    @AuraEnabled
    global String bankId;
    @AuraEnabled
    global String country;
    @AuraEnabled
    global String status;
    @AuraEnabled
    global String startDate; //opcional
    @AuraEnabled
    global String endDate; //opcional

    global Contracts() {
      System.debug('WRAPPER_Services_OTV.Contracts');
    }
  }

  @AuraEnabled
  global ServiceOmnichannelUser serviceOmnichannelUser;

  global static WRAPPER_Services_OTV.ServiceOmnichannelUser parse(String json) {
    return (WRAPPER_Services_OTV.ServiceOmnichannelUser) System.JSON.deserialize(
      json,
      WRAPPER_Services_OTV.ServiceOmnichannelUser.class
    );
  }
}
