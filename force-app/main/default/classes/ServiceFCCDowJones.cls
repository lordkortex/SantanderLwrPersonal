global with sharing class ServiceFCCDowJones {

    global static final String FILTER_SL = 'US-OFAC,EU,UN,UNSC,US-FINCEN,3690';
    global static final String FILTER_SL_OPERATOR = 'OR';
    global static final String FILTER_OEL = '1,2,3,4,34';
    global static final String FILTER_OEL_OPERATOR = 'AND';

    global static Boolean validateDescription (String paymentId, String description) {
        Boolean res = null;
        try {
            WS_FCCDowJones.INPUT input = new WS_FCCDowJones.INPUT();
            input.name = EncodingUtil.urlEncode(description, 'UTF-8');
            input.recordType = 'P,E';
            input.hitsFrom = '0';
            input.hitsTo = '1';
            input.filterSl = FILTER_SL;
            input.filterSlOperator = FILTER_SL_OPERATOR;
            input.filterOel = FILTER_OEL;
            input.filterOelOperator = FILTER_OEL_OPERATOR;
            WS_FCCDowJones.OUTPUT response = WS_FCCDowJones.search(paymentId, input);
            if (response != null && response.searchResults != null && response.searchResults.head != null && response.searchResults.head.totalHits != null) {
                Integer totalHits = Integer.valueOf(response.searchResults.head.totalHits);
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