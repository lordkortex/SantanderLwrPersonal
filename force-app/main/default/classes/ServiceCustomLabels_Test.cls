@isTest
public class ServiceCustomLabels_Test {

    @isTest
    static void checkCountryWithXCompanySan_OK () {
        ServiceCustomLabels.checkCountryWithXCompanySan('PL');
    }

    @isTest
    static void checkCountryWithXCompanySan_KO () {
        ServiceCustomLabels.checkCountryWithXCompanySan(null);
    }
}