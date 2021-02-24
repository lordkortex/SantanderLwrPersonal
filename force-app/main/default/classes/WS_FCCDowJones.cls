global with sharing class WS_FCCDowJones {
    global static String baseEndpoint;
    global static String baseMethod;
    global static String tokenPlatform;
    global static String tokenUser;

    global static String queryParams;
    global static String finalEndpoint;

    static {
        CNT_ApiConfiguration__c configWs = new CNT_ApiConfiguration__c();
        configWs = CNT_ApiConfiguration__c.getValues('WS_FCCDowJones');
        baseEndpoint = configWs.CNT_Endpoint__c;
        baseMethod = configWs.CNT_HTTPMethod__c;
        tokenPlatform = configWs.tokenPlatform__c;
        tokenUser = configWs.tokenUser__c;
    }

    global static WS_FCCDowJones.OUTPUT search (String paymentId, WS_FCCDowJones.INPUT input) {
        OUTPUT res = null; 
        try {
            queryParams = '';
            finalEndpoint = '';
            getParameters('name', input.name);
            getParameters('record-type', input.recordType);
            getParameters('search-type', input.searchType);
            getParameters('hits-from', input.hitsFrom);
            getParameters('hits-to', input.hitsTo);
            getParameters('exclude-deceased', input.excludeDeceased);
            getParameters('filter-sl', input.filterSl);
            getParameters('filter-ool', input.filterOol);
            getParameters('filter-soc', input.filterSoc);
            getParameters('filter-sic', input.filterSic);
            if (String.isNotBlank(queryParams)) {
                finalEndpoint = baseEndpoint + '?' + queryParams;
            }
            Map<String,String> extraHeaders = new Map<String,String>();
            extraHeaders.put('Global-Payment-Id', paymentId);
            extraHeaders.put('Accept-Language', UserInfo.getLanguage().left(2));
            String response = Global_IntegrationWrapper.launchHTTP(null, finalEndPoint, baseMethod, extraHeaders);
            res = getOutput(response);
        } catch (Exception e) {
            System.debug('WS_FCCDowJones.execute: ' + e.getMessage() + ' in line ' + e.getLineNumber());
            throw new CustomException(e.getMessage());
        }
        return res;
    }

    private static void getParameters (String fieldName, String field) {
        if (String.isNotBlank(fieldName) && String.isNotBlank(field)) {
            if (String.isNotBlank(queryParams) && queryParams.substring(queryParams.length() - 1, queryParams.length()) != '&') {
                queryParams = queryParams + '&';
            }
            queryParams = queryParams + fieldName + '=' + field;
        }
    }

    global static WS_FCCDowJones.OUTPUT getOutput (String response) {
        OUTPUT res = null;
        try {
           res = (WS_FCCDowJones.OUTPUT) JSON.deserialize(response, WS_FCCDowJones.OUTPUT.class);
        } catch (Exception e) {
            System.debug('WS_FCCDowJones.getOutput: ' + e.getMessage() + ' in line ' + e.getLineNumber());
        }
        return res;
    }

    global with sharing class INPUT {
        global String name {get;set;}
        global String recordType {get;set;}
        global String searchType {get;set;}
        global String hitsFrom {get;set;}
        global String hitsTo {get;set;}
        global String excludeDeceased {get;set;}
        global String filterSl {get;set;}
        global String filterSlOperator {get;set;}
        global String filterOel {get;set;}
        global String filterOelOperator {get;set;}
        global String filterOol {get;set;}
        global String filterSoc {get;set;}
        global String filterSic {get;set;}

        global INPUT () {
        }
    }

    global with sharing class OUTPUT {
        global HeaderSummary headerSummary {get;set;}

        global OUTPUT () {
        }
    }

    global with sharing class HeaderSummary {
        global Integer totalHits {get;set;}
        global List<SearchNameResults> searchNameResultsList {get;set;}

        global HeaderSummary () {
        }
    }
    
    global with sharing class SearchNameResults {
        global String searchName {get;set;}
        global SearchResult searchResults {get;set;}

        global SearchNameResults () {
        }
    }
    
    global with sharing class SearchResult {
        global Head head {get;set;}
        global Body body {get;set;}

        global SearchResult () {
        }
    }

    global with sharing class Head {
        global String apiVersion {get;set;}
        global String backendVersion {get;set;}
        global String totalHits {get;set;}
        global String hitsFrom {get;set;}
        global String hitsTo {get;set;}
        global String truncated {get;set;}
        global String cachedResultsId {get;set;}

        global Head () {
        }
    }
    
    global with sharing class Body {
        global List<Match> match {get;set;}

        global Body () {
        }
    }
    
    global with sharing class Match {
        global Double score {get;set;}
        global MatchType matchType {get;set;}
        global Payload payload {get;set;}
        global String peid {get;set;}
        global String revision {get;set;}
        global String recordType {get;set;}

        global Match () {
        }
    }
    
    global with sharing class MatchType {
        global String value {get;set;}
        global Boolean linguisticVariation {get;set;}
        global Boolean nonLinguisticVariation {get;set;}
        global Boolean structuralVariation {get;set;}
            
        global MatchType () {
        }
    }
    
    global with sharing class Payload {
        global RiskIcons riskIcons {get;set;}
        global String primaryName {get;set;}
        global String countryCode {get;set;}
        global String title {get;set;}
        global Boolean subsidiary {get;set;}
        global MatchedName matchedName {get;set;}
        global DateOfBirth matchedDateOfBirth {get;set;}  
        global DatesOfBirth datesOfBirth {get;set;}  
        global Countries countries {get;set;}
        global String gender {get;set;}
        
        global Payload () {
        }
    }

    global with sharing class DatesOfBirth {
        global List<DateOfBirth> dateOfBirth {get;set;}

        global DatesOfBirth () {
        }
    }
    
    global with sharing class Countries {
        global List<Country> country {get;set;}

        global Countries () {
        }
    }
    
    global with sharing class RiskIcons {
        global List<String> riskIcon {get;set;}

        global RiskIcons () {
        }
    }
    
    global with sharing class MatchedName {
        global String value {get;set;}
        global String nameType {get;set;}
            
        global MatchedName () {
        }
    }
        
    global with sharing class DateOfBirth {
        global Integer year {get;set;}
        global Integer month {get;set;}
        global Integer day {get;set;}

        global DateOfBirth () {
        }
    }
    
    global with sharing class Country {
        global String countryType {get;set;}
        global String countryCode {get;set;}
        
        global Country () {
        }
    }
}