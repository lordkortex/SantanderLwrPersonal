global with sharing class ServiceFCCDowJones {

    global static final String RECORD_TYPE = 'P,E';
	global static final String SEARCH_TYPE = 'broad';
    global static final String HITS_FROM = '0';
    global static final String HITS_TO = '1';
    global static final String FILTER_SL = 'ANY';
    global static final String FILTER_OEL = 'ANY';
    global static final String FILTER_OOL = '319,406,1114';
    global static final String FILTER_SOC = 'ANY';
    global static final String FILTER_SIC = 'ANY';

    global static Boolean validateDescription (String paymentId, String description) {
        Boolean res = null;
        try {
            WS_FCCDowJones.INPUT input = new WS_FCCDowJones.INPUT();
            input.name = EncodingUtil.urlEncode(description, 'UTF-8');
            input.recordType = RECORD_TYPE;
            input.searchType = SEARCH_TYPE;
            input.hitsFrom = HITS_FROM;
            input.hitsTo = HITS_TO;
            input.filterSl = FILTER_SL;
            input.filterOel = FILTER_OEL;
            input.filterOol = FILTER_OOL;
            input.filterSoc = FILTER_SOC;
            input.filterSic = FILTER_SIC;            
            WS_FCCDowJones.OUTPUT response = WS_FCCDowJones.search(paymentId, input);
            if (response != null && response.headerSummary != null && response.headerSummary.totalHits != null) {
                Integer totalHits = Integer.valueOf(response.headerSummary.totalHits);
                if (totalHits > 0) {
                    res = false;
                } else {
                    res = true;
                }
            }
        } catch (Exception e) {
            System.debug('ServiceFCCDowJones.validateDescription: ' + e.getMessage() + ' in line ' + e.getLineNumber());
        }
        return res;
    }
}