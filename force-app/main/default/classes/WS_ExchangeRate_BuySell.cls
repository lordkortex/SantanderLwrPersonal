global with sharing class WS_ExchangeRate_BuySell {

    
    
    global with sharing class INPUT {

        global String operationReference                                {get;set;}

        global INPUT (String operationReference) {
            this.operationReference = operationReference;
        }
    }
}