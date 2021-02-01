public with sharing class CNT_StatementHistoryController {

    

    public CNT_StatementHistoryController(){}


    @AuraEnabled(cacheable=true)
    public static CNT_GlobalPositionController retrieveInitialData(String userId)
    {

        return CNT_GlobalPositionController.retrieveData(true, userId);
    }


     @AuraEnabled(cacheable=true)
     public static WRAPPER_StatementList searchExtracts(String accountCode, String dateFrom, String dateTo)
     {
        
            String response='';
            
            CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('CNT_GetMovementHistoryData');
             String finalEndpoint = configWs.CNT_Endpoint__c.replace('{accountCode}', accountCode);
            
            finalEndpoint = finalEndpoint.replace('{dateTo}', dateTo);
            finalEndpoint = finalEndpoint.replace('{dateFrom}', dateFrom);
            
            response = Global_IntegrationWrapper.launchHttp('',finalEndpoint,configWs.CNT_HTTPMethod__c);

            if(response != null && response != '')
            {
              

                    // Get the date format
                    String dateFormat = Global_Utilities.getUserDateFormat(UserInfo.getUserId());
                    if(dateFormat == null || dateFormat == ''){
                        dateFormat = 'dd/MM/yyyy';
                    }

                    // Get the number format
                    String numberFormat = Global_Utilities.getUserNumberFormat(UserInfo.getUserId());
                    if(numberFormat == null || numberFormat == ''){
                        numberFormat = '###.###.###,##';
                    }

                    WRAPPER_StatementList responseParsed = WRAPPER_StatementList.parse(response);
                    if(responseParsed.listaSaldos == null)
                    {
                        return null;
                    }
                    else{

                        for(WRAPPER_StatementList.ListaSaldos saldoActual: responseParsed.listaSaldos)
                        {
                            saldoActual.saldo.valueDate_Formatted = CNT_TransactionSearchController.formatDateFromISOString(saldoActual.saldo.valueDate, dateFormat, true);
                            saldoActual.saldo.bookDate_Formatted = CNT_TransactionSearchController.formatDateFromISOString(saldoActual.saldo.bookDate, dateFormat, true);
                            saldoActual.saldo.valueBalance_Formatted = CNT_TransactionSearchController.formatNumber(saldoActual.saldo.valueBalance, numberFormat);
                            saldoActual.saldo.bookBalance_Formatted = CNT_TransactionSearchController.formatNumber(saldoActual.saldo.bookBalance, numberFormat);
                        }
                    }
                    
                    return responseParsed;
                
                
            }
            return null;

     }

    @AuraEnabled(cacheable=true)
    public static WRAPPER_AccountTransactionSearch  searchMovements(String accountCode, String dateToSearch)
    {
        String response = '';

        CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('CNT_StatementMovementsSearch');

         String finalEndpoint = configWs.CNT_Endpoint__c.replace('{codigoCuenta}', accountCode);
        
        finalEndpoint = finalEndpoint.replace('{dateSearch}', dateToSearch);

        response = Global_IntegrationWrapper.launchHttp('',finalEndpoint,configWs.CNT_HTTPMethod__c);

        if(response != null && response != '')
        {
            if(response != null && response != '')
            {
                 // Get the date format
                String dateFormat = Global_Utilities.getUserDateFormat(UserInfo.getUserId());
                if(dateFormat == null || dateFormat == ''){
                    dateFormat = 'dd/MM/yyyy';
                }

                // Get the number format
                String numberFormat = Global_Utilities.getUserNumberFormat(UserInfo.getUserId());
                if(numberFormat == null || numberFormat == ''){
                    numberFormat = '###.###.###,##';
                }

                //Parsing the response
            WRAPPER_AccountTransactionSearch responseParsed = WRAPPER_AccountTransactionSearch.parse(response);


            for(WRAPPER_AccountTransactionSearch.ListaObtTransacciones singleMovement: responseParsed.balances.transactions.listaObtTransacciones[0])
            {
                singleMovement.obtTransacBusqueda.valueDate = CNT_TransactionSearchController.formatDateFromISOString(singleMovement.obtTransacBusqueda.valueDate, dateFormat, true);
                singleMovement.obtTransacBusqueda.importeFormatted = new CNT_FormattedNumber(singleMovement.obtTransacBusqueda.importe, numberFormat);
            }

            return responseParsed;
        }
    }
    return null;

    }

    @AuraEnabled
    public static Map<String, Integer> getCurrentUserTimezoneOffSetInMiliseconds(List<String> dateInput){  
        Map<String, Integer> result = Global_Utilities.getCurrentUserTimezoneOffSetInMiliseconds(dateInput);

        return result;
    }

}