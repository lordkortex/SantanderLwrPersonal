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
            getParameters('filter-sl-operator', input.filterSlOperator);
            getParameters('filter-oel', input.filterOel);
            getParameters('filter-oel-operator', input.filterOelOperator);
            if (String.isNotBlank(queryParams)) {
                finalEndpoint = baseEndpoint + '?' + queryParams;
            }
            Map<String,String> extraHeaders = new Map<String,String>();
            extraHeaders.put('Global-Payment-Id', paymentId);
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
            if (String.isNotBlank(response)) {
                res = new OUTPUT();
                res.searchResults = new SearchResults();
                res.searchResults.head = new Head();
                JSONParser parser = JSON.createParser(response);
                while (parser.nextToken() != null) {
                    if (parser.getCurrentToken() == JSONToken.FIELD_NAME) {
                        if (parser.getText() == 'api-version') {
                            parser.nextToken();
                            String value = parser.getText();
                            res.searchResults.head.apiVersion = value;
                        }
                        if (parser.getText() == 'backend-version') {
                            parser.nextToken();
                            String value = parser.getText();
                            res.searchResults.head.backendVersion = value;
                        }
                        if (parser.getText() == 'total-hits') {
                            parser.nextToken();
                            String value = parser.getText();
                            res.searchResults.head.totalHits = value;
                        }
                        if (parser.getText() == 'hits-from') {
                            parser.nextToken();
                            String value = parser.getText();
                            res.searchResults.head.hitsFrom = value;
                        }
                        if (parser.getText() == 'hits-to') {
                            parser.nextToken();
                            String value = parser.getText();
                            res.searchResults.head.hitsTo = value;
                        }
                        if (parser.getText() == 'truncated') {
                            parser.nextToken();
                            String value = parser.getText();
                            res.searchResults.head.truncated = value;
                        }
                        if (parser.getText() == 'cached-results-id') {
                            parser.nextToken();
                            String value = parser.getText();
                            res.searchResults.head.cachedResultsId = value;
                        }
                    }
                }
            }
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

        global INPUT () {
        }
    }

    global with sharing class OUTPUT {
        global SearchResults searchResults {get;set;}

        global OUTPUT () {
        }
    }

    global with sharing class SearchResults {
        global Head head {get;set;}

        global SearchResults () {
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
}