public class WRAPPER_OTV_Info {
  public class userData {
    @AuraEnabled
    public AccountContactRelation accountRelation { get; set; }
    @AuraEnabled
    public String name { get; set; }
    @AuraEnabled
    public String firstName { get; set; }
    @AuraEnabled
    public String lastName { get; set; }
    @AuraEnabled
    public String globalId { get; set; }
    @AuraEnabled
    public String companyId { get; set; }
    @AuraEnabled
    public Boolean admin { get; set; }
    @AuraEnabled
    public String lastLogin { get; set; }
    @AuraEnabled
    public String accountName { get; set; }
    @AuraEnabled
    public String phone { get; set; }
    @AuraEnabled
    public String email { get; set; }
    @AuraEnabled
    public String position { get; set; }
    @AuraEnabled
    public String role { get; set; }
    @AuraEnabled
    public Boolean active { get; set; }
    @AuraEnabled
    public String color { get; set; }
    @AuraEnabled
    public String country { get; set; }
    @AuraEnabled
    public String countryURL { get; set; }
  }

  public class userAccountsParameters {
    @AuraEnabled
    public String companyId;
    @AuraEnabled
    public String userId;
  }

  public class CountryName {
    @AuraEnabled
    public String label { get; set; }
    @AuraEnabled
    public String value { get; set; }
    @AuraEnabled
    public String url { get; set; }
    @AuraEnabled
    public Boolean isActive { get; set; }
  }

  public class AccountsUser {
    @AuraEnabled
    public WRAPPER_AccountList_OTV.AccountAvailableService accountAvailableservice;
    @AuraEnabled
    public String accountName { get; set; }
  }
  public class Subsidiary {
    @AuraEnabled
    public String companyName { get; set; }
    @AuraEnabled
    public String country { get; set; }
  }
  public class MatrixServiceStatus {
    @auraEnabled
    public String companyId;
    @auraEnabled
    public String status;
  }

  public class CompanyDetail {
    @auraEnabled
    public String companyName;
    @auraEnabled
    public String companyDetail;
    @auraEnabled
    public String companyCountry;
  }

  public class UserInformation {
    @AuraEnabled
    public String initials { get; set; }
    @AuraEnabled
    public String fullName { get; set; }
    @AuraEnabled
    public String companyName { get; set; }
    @AuraEnabled
    public String imgCountry { get; set; }
    @AuraEnabled
    public String countryName { get; set; }
    @AuraEnabled
    public String userGlobalId { get; set; }
  }
  public class AccountUrlService {
    @AuraEnabled
    public String companyName { get; set; }
    @AuraEnabled
    public String country { get; set; }
    @AuraEnabled
    public String companyGlobalId { get; set; }
    @AuraEnabled
    public String documentType { get; set; }
    @AuraEnabled
    public String documentNumber { get; set; }
    @AuraEnabled
    public String imgCountry { get; set; }
  }

  public class SubsidiariesService {
    @AuraEnabled
    public Account account { get; set; }
    @AuraEnabled
    public String companyCountry { get; set; }
    @AuraEnabled
    public String companyId { get; set; }
    @AuraEnabled
    public String companyName { get; set; }
    @AuraEnabled
    public Boolean enrolado { get; set; }
    @AuraEnabled
    public String serviceId { get; set; }
    @AuraEnabled
    public String status { get; set; }
    @AuraEnabled
    public String statusActivation { get; set; }
  }
  public class userInfo {
    @AuraEnabled
    public String Name { get; set; }
    @AuraEnabled
    public String Email { get; set; }
    @AuraEnabled
    public String Phone { get; set; }
    @AuraEnabled
    public String Company { get; set; }
    @AuraEnabled
    public String Country { get; set; }
  }
}
