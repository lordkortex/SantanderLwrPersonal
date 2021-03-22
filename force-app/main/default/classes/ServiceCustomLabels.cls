public with sharing class ServiceCustomLabels {

    public static Boolean checkCountryWithXCompanySan (String country) {
        Boolean res = false;
        try {
            if (String.isBlank(country)) {
                throw new customException('Need country to check if is necessary x-company-san');
            }
            String label = System.Label.CNF_CountriesWithXCompanySan;
            if (String.isNotBlank(label)) {
                List<String> countries = label.split(';');
                if (countries.contains(country)) {
                    res = true;
                }
            }
        } catch (Exception e) {
            System.debug('ServiceCustomLabels.checkCountryWithXCompanySan: ' + e.getMessage() + ' in line ' + e.getLineNumber());
        }
        return res;
    }
}