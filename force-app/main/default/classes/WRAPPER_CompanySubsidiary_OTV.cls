global with sharing class WRAPPER_CompanySubsidiary_OTV {
    
    global WRAPPER_CompanySubsidiary_OTV(){
        System.debug('WRAPPER_CompanySubsidiary_OTV');
    }
         
    global class CompanySubsidiary {
        @AuraEnabled global String companyGlobalId; 
        @AuraEnabled global String identificationLegalCustomer;
        @AuraEnabled global String companyType;
        @AuraEnabled global String companyName;
        @AuraEnabled global String tradename;
        @AuraEnabled global String country;
        @AuraEnabled global String entity;
        @AuraEnabled global String agent;
        @AuraEnabled global String alias;
        @AuraEnabled global String companyIdentificationid;
        @AuraEnabled global String companyStartDate;
        @AuraEnabled global String companyEndDate;
        @AuraEnabled global String countryIncorporation;
        @AuraEnabled global String indCashNexus;
        @AuraEnabled global String indVirtualCompany;       
        @AuraEnabled global List<companyIdentifications> companyIdentifications;
             
        global CompanySubsidiary(){
            System.debug('WRAPPER_CompanySubsidiary_OTV.CompanySubsidiary');
        } 
    }
    
    global class companyIdentifications {
        @AuraEnabled global List<String> documentType;
        @AuraEnabled global List<String> documentNumber;
        
        global companyIdentifications(){
            System.debug('WRAPPER_CompanySubsidiary_OTV.companyIdentifications');
        }
    }
    
  	@AuraEnabled global List<CompanySubsidiary> companySubsidiaryList;
   
    global static List<WRAPPER_CompanySubsidiary_OTV.CompanySubsidiary> parse(String json) {
		return ( List<WRAPPER_CompanySubsidiary_OTV.CompanySubsidiary>) System.JSON.deserialize(json,  List<WRAPPER_CompanySubsidiary_OTV.CompanySubsidiary>.class);
	} 
}