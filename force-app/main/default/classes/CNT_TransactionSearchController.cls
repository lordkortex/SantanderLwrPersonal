/*----------------------------------------------------------------------------------
Author:         Guillermo Giral
Company:        Deloitte
Description:    Controller of Transaction Search components
Test Class:     CNT_TransactionSearchController_Test
History
<Date>			<Author>		    <Description>
17/03/2020		Guillermo Giral     Initial version
----------------------------------------------------------------------------------*/
public with sharing class CNT_TransactionSearchController 
{
    /*----------------------------------------------------------------------------------
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Method that retrieves the transaction data from Mulesoft
    History
    <Date>			<Author>		            <Description>
    17/03/2020		Guillermo Giral             Initial version
    ----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static WRAPPER_TransactionSearch getTransactions(String requestBody){
        try {
            
            CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('CNT_Transactions_Search');
            String response = Global_IntegrationWrapper.launchHttp(requestBody,configWs.CNT_Endpoint__c,configWs.CNT_HTTPMethod__c);
            
            if(Test.isRunningTest()){
                	response = '{'+
		'  \"balances\": {'+
		'    \"transactions\": {'+
		'      \"NUM_PAGINA\": 2,'+
		'      \"totalRegistros\": 6,'+
		'      \"totalPaginas\": 1,'+
		'      \"obtTransacBusqueda\": ['+
		'        {'+
		'          \"obtTransacBusqueda\": {'+
		'            \"aliasCuentaPerfilado\": \"Alias 04       \",'+
		'            \"aliasEntidad\": \"testjueves04   \",'+
		'            \"bookDate\": \"2020-05-19T22:00:00.000Z\",'+
		'            \"codCuenta\": 1373,'+
		'            \"codigoBIC\": {'+
		'              \"branch\": \"   \",'+
		'              \"entidadbic\": \"    \",'+
		'              \"locatorbic\": \"  \",'+
		'              \"paisbic\": \"  \"'+
		'            },'+
		'            \"cuentaExtracto\": \"ES0200491500082119349999                          \",'+
		'            \"descripcion\": \"TRANSFERENCIA A FAVOR DE HAPAG-LLOYD, REFERENCIA 0049 1500 696 0CJJJ24//  000000000000 HAPAG-LLOYD                                                                                                                                                                                                                                                                                                                                          \",'+
		'            \"importe\": -15048.99,'+
		'            \"moneda\": \"USD\",'+
		'            \"nombreEntidad\": \"BANCO SANTANDER ESPANHA\",'+
		'            \"refBanco\": \"614 04 EM. TRANS\",'+
		'            \"transactionCategory\": null,'+
		'            \"refCliente\": \"NONREF          \",'+
		'            \"swiftCode\": null,'+
		'            \"tipoTransaccion\": \"TRF\",'+
		'            \"valueDate\": \"2020-05-19T22:00:00.000Z\"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"obtTransacBusqueda\": {'+
		'            \"aliasCuentaPerfilado\": \"Alias 04       \",'+
		'            \"aliasEntidad\": \"testjueves04   \",'+
		'            \"bookDate\": \"2020-03-25T23:00:00.000Z\",'+
		'            \"codCuenta\": 1373,'+
		'            \"codigoBIC\": {'+
		'              \"branch\": \"   \",'+
		'              \"entidadbic\": \"    \",'+
		'              \"locatorbic\": \"  \",'+
		'              \"paisbic\": \"  \"'+
		'            },'+
		'            \"cuentaExtracto\": \"ES0200491500082119349999                          \",'+
		'            \"descripcion\": \"TRANSFERENCIA SEGUNDO MOVIMIENTO NUEVO                                                                                                                                                                                                                                                                                                                                                                                                      \",'+
		'            \"importe\": 15048.99,'+
		'            \"moneda\": \"USD\",'+
		'            \"nombreEntidad\": \"BANCO SANTANDER ESPANHA\",'+
		'            \"refBanco\": \"614 04 EM. TRANS\",'+
		'            \"transactionCategory\": null,'+
		'            \"refCliente\": \"NONREF          \",'+
		'            \"swiftCode\": null,'+
		'            \"tipoTransaccion\": \"TRF\",'+
		'            \"valueDate\": \"2020-03-25T23:00:00.000Z\"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"obtTransacBusqueda\": {'+
		'            \"aliasCuentaPerfilado\": \"Alias 04       \",'+
		'            \"aliasEntidad\": \"testjueves04   \",'+
		'            \"bookDate\": \"2020-03-25T23:00:00.000Z\",'+
		'            \"codCuenta\": 1373,'+
		'            \"codigoBIC\": {'+
		'              \"branch\": \"   \",'+
		'              \"entidadbic\": \"    \",'+
		'              \"locatorbic\": \"  \",'+
		'              \"paisbic\": \"  \"'+
		'            },'+
		'            \"cuentaExtracto\": \"ES0200491500082119349999                          \",'+
		'            \"descripcion\": \"PRIMER MOVIMIENTO NUEVO                                                                                                                                                                                                                                                                                                                                                                                                                     \",'+
		'            \"importe\": -15048.99,'+
		'            \"moneda\": \"USD\",'+
		'            \"nombreEntidad\": \"BANCO SANTANDER ESPANHA\",'+
		'            \"refBanco\": \"614 04 EM. TRANS\",'+
		'            \"transactionCategory\": null,'+
		'            \"refCliente\": \"NONREF          \",'+
		'            \"swiftCode\": null,'+
		'            \"tipoTransaccion\": \"TRF\",'+
		'            \"valueDate\": \"2020-03-25T23:00:00.000Z\"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"obtTransacBusqueda\": {'+
		'            \"aliasCuentaPerfilado\": \"Alias 04       \",'+
		'            \"aliasEntidad\": \"testjueves04   \",'+
		'            \"bookDate\": \"2020-03-25T23:00:00.000Z\",'+
		'            \"codCuenta\": 1373,'+
		'            \"codigoBIC\": {'+
		'              \"branch\": \"   \",'+
		'              \"entidadbic\": \"    \",'+
		'              \"locatorbic\": \"  \",'+
		'              \"paisbic\": \"  \"'+
		'            },'+
		'            \"cuentaExtracto\": \"ES0200491500082119349999                          \",'+
		'            \"descripcion\": \"TRANSFERENCIA A FAVOR DE HAPAG-LLOYD, REFERENCIA 0049 1500 696 0CJJJ24//  000000000000 HAPAG-LLOYD                                                                                                                                                                                                                                                                                                                                          \",'+
		'            \"importe\": -15048.99,'+
		'            \"moneda\": \"USD\",'+
		'            \"nombreEntidad\": \"BANCO SANTANDER ESPANHA\",'+
		'            \"refBanco\": \"614 04 EM. TRANS\",'+
		'            \"transactionCategory\": null,'+
		'            \"refCliente\": \"NONREF          \",'+
		'            \"swiftCode\": null,'+
		'            \"tipoTransaccion\": \"TRF\",'+
		'            \"valueDate\": \"2020-03-25T23:00:00.000Z\"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"obtTransacBusqueda\": {'+
		'            \"aliasCuentaPerfilado\": \"Alias 04       \",'+
		'            \"aliasEntidad\": \"testjueves04   \",'+
		'            \"bookDate\": \"2020-03-24T23:00:00.000Z\",'+
		'            \"codCuenta\": 1373,'+
		'            \"codigoBIC\": {'+
		'              \"branch\": \"   \",'+
		'              \"entidadbic\": \"    \",'+
		'              \"locatorbic\": \"  \",'+
		'              \"paisbic\": \"  \"'+
		'            },'+
		'            \"cuentaExtracto\": \"ES0200491500082119349999                          \",'+
		'            \"descripcion\": \"TRANSFERENCIA A FAVOR DE BOLLORE LOGISTICS BANGLADESH LTD, REFERENCIA 0049 1500 696 0CJIG07//  000000000000 BOLLORE LOGISTIC                                                                                                                                                                                                                                                                                                                \",'+
		'            \"importe\": -5840.93,'+
		'            \"moneda\": \"USD\",'+
		'            \"nombreEntidad\": \"BANCO SANTANDER ESPANHA\",'+
		'            \"refBanco\": \"614 04 EM. TRANS\",'+
		'            \"transactionCategory\": null,'+
		'            \"refCliente\": \"NONREF          \",'+
		'            \"swiftCode\": null,'+
		'            \"tipoTransaccion\": \"TRF\",'+
		'            \"valueDate\": \"2020-03-24T23:00:00.000Z\"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"obtTransacBusqueda\": {'+
		'            \"aliasCuentaPerfilado\": \"Alias 04       \",'+
		'            \"aliasEntidad\": \"testjueves04   \",'+
		'            \"bookDate\": \"2020-03-23T23:00:00.000Z\",'+
		'            \"codCuenta\": 1373,'+
		'            \"codigoBIC\": {'+
		'              \"branch\": \"   \",'+
		'              \"entidadbic\": \"    \",'+
		'              \"locatorbic\": \"  \",'+
		'              \"paisbic\": \"  \"'+
		'            },'+
		'            \"cuentaExtracto\": \"ES0200491500082119349999                          \",'+
		'            \"descripcion\": \"TRANSFERENCIA A FAVOR DE ORIENT OVERSEAS CONTAINER LINE, REFERENCIA 0049 1500 696 0CJIG12//  000000000000 ORIENT OVERSEAS                                                                                                                                                                                                                                                                                                                   \",'+
		'            \"importe\": -6575.73,'+
		'            \"moneda\": \"USD\",'+
		'            \"nombreEntidad\": \"BANCO SANTANDER ESPANHA\",'+
		'            \"refBanco\": \"614 04 EM. TRANS\",'+
		'            \"transactionCategory\": null,'+
		'            \"refCliente\": \"NONREF          \",'+
		'            \"swiftCode\": null,'+
		'            \"tipoTransaccion\": \"TRF\",'+
		'            \"valueDate\": \"2020-03-23T23:00:00.000Z\"'+
		'          }'+
		'        }'+
		'      ]'+
		'    }'+
		'  }'+
		'}';
            }
           
            if (String.isNotBlank(response)){
                WRAPPER_TransactionSearch listTransactions = WRAPPER_TransactionSearch.parse(response);
                Map<String, Object> jsonInput = (Map<String, Object>)JSON.deserializeUntyped(requestBody);
                Map<String, Object> obtTransacBusqueda = (Map<String, Object>)jsonInput.get('obtTransacBusqueda');
                Map<String, Object> entrada = (Map<String, Object>)obtTransacBusqueda.get('entrada');
                Map<String, Object> filtro = (Map<String, Object>)entrada.get('filtro');
                Boolean isEndOfDay = (String)filtro.get('typeBalance') == 'EOD';
                listTransactions = formatTransactionsOutput(listTransactions, isEndOfDay);
                return listTransactions;
            } else {
                throw new customException(Label.getDataError);
            }
        } catch (Exception e) {
            System.debug('CNT_TransactionSearchController.getTransactions: ' + e.getMessage());
        }
        return null;
    }

    /*----------------------------------------------------------------------------------
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Method that retrieves the data for an Account
    History
    <Date>			<Author>		            <Description>
    17/03/2020		Guillermo Giral             Initial version
    ----------------------------------------------------------------------------------*/
    @AuraEnabled(cacheable=true)
    public static WRAPPER_AccountTransactionSearch getTransactionsByAccount(Boolean isEndOfDay, String accountCode, String bookDateTime){
        try {
            CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('CNT_AccountTransactions_Search');
            String endpoint = configWs.CNT_Endpoint__c.replace('{accountCode}', accountCode);

            if(isEndOfDay){
                endpoint = endpoint.replace('{typeOfBalance}','EOD');
            } else {
                endpoint = endpoint.replace('{typeOfBalance}','LU');
            }

            // Make the callout
            String response = Global_IntegrationWrapper.launchHttp('',endpoint,configWs.CNT_HTTPMethod__c);
            
            if(Test.isRunningTest()){
                		response = '{'+
		'  \"balances\": {'+
		'    \"transactions\": {'+
		'      \"listaObtTransacciones\": ['+
		'        ['+
		'          {'+
		'            \"obtTransacBusqueda\": {'+
		'              \"aliasCuentaPerfilado\": \"Rocio test     \",'+
		'              \"aliasEntidad\": \"testro         \",'+
		'              \"bookDate\": \"2020-03-26T23:00:00.000Z\",'+
		'              \"codCuenta\": 1367,'+
		'              \"codigoBIC\": {'+
		'                \"branch\": \"XXX\",'+
		'                \"entidadbic\": \"BSCH\",'+
		'                \"locatorbic\": \"SP\",'+
		'                \"paisbic\": \"BR\"'+
		'              },'+
		'              \"cuentaExtracto\": \"2167130018899                                     \",'+
		'              \"descripcion\": \"3625-APLICACAO AUT CONTAMAX EMPRESARIAL                                                                                                                                                                                                                                                                                                                                                                                                     \",'+
		'              \"importe\": -519910.76,'+
		'              \"moneda\": \"BRL\",'+
		'              \"nombreEntidad\": \"BANCO SANTANDER BRASIL\",'+
		'              \"refBanco\": \"                \",'+
		'              \"refCliente\": \"NONREF          \",'+
		'              \"tipoTransaccion\": \"MSC\",'+
        '              \"valueDate\": \"2020-03-26T23:00:00.000Z\"'+
		'            }'+
		'          },'+
		'          {'+
		'            \"obtTransacBusqueda\": {'+
		'              \"aliasCuentaPerfilado\": \"Rocio test     \",'+
		'              \"aliasEntidad\": \"testro         \",'+
		'              \"bookDate\": \"2020-03-26T23:00:00.000Z\",'+
		'              \"codCuenta\": 1367,'+
		'              \"codigoBIC\": {'+
		'                \"branch\": \"XXX\",'+
		'                \"entidadbic\": \"BSCH\",'+
		'                \"locatorbic\": \"SP\",'+
		'                \"paisbic\": \"BR\"'+
		'              },'+
		'              \"cuentaExtracto\": \"2167130018899                                     \",'+
		'              \"descripcion\": \"0466-PAGAMENTO A FORNECEDORES6481732677   - D - 000001                                                                                                                                                                                                                                                                                                                                                                                      \",'+
		'              \"importe\": -360000.0,'+
		'              \"moneda\": \"BRL\",'+
		'              \"nombreEntidad\": \"BANCO SANTANDER BRASIL\",'+
		'              \"refBanco\": \"010327          \",'+
		'              \"refCliente\": \"6481732677      \",'+
		'              \"tipoTransaccion\": \"TRF\",'+
		'              \"valueDate\": \"2020-03-26T23:00:00.000Z\"'+
		'            }'+
		'          }'+
		'        ]'+
		'      ]'+
		'    }'+
		'  }'+
		'}';
            }
            if (String.isNotBlank(response)){
                WRAPPER_AccountTransactionSearch listTransactions = WRAPPER_AccountTransactionSearch.parse(response); 
                listTransactions = formatTransactionsOutputSingleAcc(listTransactions, isEndOfDay);
                return listTransactions;
            } else {
                throw new customException(Label.getDataError);
            }
        } catch (Exception e) {
            System.debug('CNT_TransactionSearchController.getTransactionsByAccount: ' + e.getMessage());
        }
        return null;
    }

    /*----------------------------------------------------------------------------------
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Method that retrieves the values for the filter options
    History
    <Date>			<Author>		            <Description>
    23/03/2020		Guillermo Giral             Initial version
    ----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static CNT_AccountsParent getFiltersData(String iWhen, String iCurrentUserId){
        try {          
            CNT_AccountsParent listFilterData = CNT_AccountsParent.getBalanceData(iWhen, iCurrentUserId);
            return listFilterData;
        } catch (Exception e) {
            System.debug('CNT_TransactionSearchController.getFiltersData: ' + e.getMessage());
        }
        return null;
    }

    /*----------------------------------------------------------------------------------
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Method that retrieves the values for the transaction categories
    History
    <Date>			<Author>		            <Description>
    19/04/2020		Guillermo Giral             Initial version
    ----------------------------------------------------------------------------------*/
    @AuraEnabled(cacheable=true)
    public static List<String> getTransactionCategories(){
        try {          
            List<String> pickListValuesList = new List<String>();
            Schema.DescribeFieldResult fieldResult = Transaction_Category__mdt.CAT_PCK_Category__c.getDescribe();
            List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
            for( Schema.PicklistEntry pickListVal : ple){
                pickListValuesList.add(pickListVal.getLabel());
            }     
            return pickListValuesList;
        } catch (Exception e) {
            System.debug('CNT_TransactionSearchController.getTransactionCategories: ' + e.getMessage());
        }
        return null;
    }

    /*----------------------------------------------------------------------------------
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Method that retrieves the values for the transaction categories
    History
    <Date>			<Author>		            <Description>
    19/04/2020		Guillermo Giral             Initial version
    ----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static String downloadFileDoc(String params){
        //try{
            
            String res='';
            CNT_DownloadTransactionsFile data = new CNT_DownloadTransactionsFile(params);

            data.execute();

            if (String.isNotBlank(data.getOutput())) {
                res= data.getOutput();
            }
            
            return res;
        //} catch (Exception e) {throw new customException(e.getMessage());}

    }

    /*----------------------------------------------------------------------------------
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Method to download the transactions in One Trade
    History
    <Date>			<Author>		            <Description>
    16/09/2020		Guillermo Giral             Initial version
    ----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static String downloadTransactionsOneTrade(String params){
        String res='';
        CNT_DownloadTransactionsFile data = new CNT_DownloadTransactionsFile(params, 'oneTrade');

        data.execute();

        if (String.isNotBlank(data.getOutput())) {
            res= data.getOutput();
        }
        
        return res;
    }
    

    /*----------------------------------------------------------------------------------
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Method that formats the dates and numbers in the data returned by Mulesoft
    History
    <Date>			<Author>		            <Description>
    19/05/2020		Guillermo Giral             Initial version
    ----------------------------------------------------------------------------------*/
    public static WRAPPER_TransactionSearch formatTransactionsOutput (WRAPPER_TransactionSearch input, Boolean endOfDay){
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

        // Fromat the dates and the numbers
        for(WRAPPER_TransactionSearch.ObtTransacBusqueda_Z t : input.balances.transactions.obtTransacBusqueda){
            t.obtTransacBusqueda.formattedValueDate = formatDateFromISOString(t.obtTransacBusqueda.valueDate, dateFormat, endOfDay);
            t.obtTransacBusqueda.formattedBookDate = formatDateFromISOString(t.obtTransacBusqueda.bookDate, dateFormat, endOfDay);
            t.obtTransacBusqueda.importeString = formatNumber(t.obtTransacBusqueda.importe, numberFormat);
            if(numberFormat == '###.###.###,##'){
                t.obtTransacBusqueda.importeEntero = t.obtTransacBusqueda.importeString.split(',')[0];
                t.obtTransacBusqueda.importeDecimal = t.obtTransacBusqueda.importeString.substring(t.obtTransacBusqueda.importeString.indexOf(','));
            } else if(numberFormat == '###,###,###.##'){
                t.obtTransacBusqueda.importeEntero = t.obtTransacBusqueda.importeString.split('\\.')[0];
                t.obtTransacBusqueda.importeDecimal = t.obtTransacBusqueda.importeString.substring(t.obtTransacBusqueda.importeString.indexOf('.'));
            }
        }
        return input;
    }

    /*----------------------------------------------------------------------------------
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Method that formats the dates and numbers in the data returned by Mulesoft
    History
    <Date>			<Author>		            <Description>
    19/05/2020		Guillermo Giral             Initial version
    ----------------------------------------------------------------------------------*/
    public static WRAPPER_AccountTransactionSearch formatTransactionsOutputSingleAcc(WRAPPER_AccountTransactionSearch input, Boolean endOfDay){
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

        // Fromat the dates and the numbers
        for(WRAPPER_AccountTransactionSearch.ListaObtTransacciones t : input.balances.transactions.listaObtTransacciones[0]){
            t.obtTransacBusqueda.formattedValueDate = formatDateFromISOString(t.obtTransacBusqueda.valueDate, dateFormat, endOfDay);
            t.obtTransacBusqueda.formattedBookDate = formatDateFromISOString(t.obtTransacBusqueda.bookDate, dateFormat, endOfDay);
            t.obtTransacBusqueda.importeString = formatNumber(t.obtTransacBusqueda.importe, numberFormat);
            if(numberFormat == '###.###.###,##'){
                t.obtTransacBusqueda.importeEntero = t.obtTransacBusqueda.importeString.split(',')[0];
                t.obtTransacBusqueda.importeDecimal = t.obtTransacBusqueda.importeString.substring(t.obtTransacBusqueda.importeString.indexOf(','));
            } else if(numberFormat == '###,###,###.##'){
                t.obtTransacBusqueda.importeEntero = t.obtTransacBusqueda.importeString.split('\\.')[0];
                t.obtTransacBusqueda.importeDecimal = t.obtTransacBusqueda.importeString.substring(t.obtTransacBusqueda.importeString.indexOf('.'));
            }
        }
        return input;
    }

    /*----------------------------------------------------------------------------------
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Method that formats the dates and numbers in the data returned by Mulesoft
    History
    <Date>			<Author>		            <Description>
    19/05/2020		Guillermo Giral             Initial version
    ----------------------------------------------------------------------------------*/
    public static WRAPPER_OneTrade_AccTransactions formatTransactionsOutputSingleAcc(WRAPPER_OneTrade_AccTransactions input, Boolean endOfDay){
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

        // Fromat the dates and the numbers
        for(WRAPPER_OneTrade_AccTransactions.ListaObtTransacciones t : input.balances.transactions.listaObtTransacciones){
            t.obtTransacBusqueda.formattedValueDate = formatDateFromISOString(t.obtTransacBusqueda.valueDate, dateFormat, endOfDay);
            t.obtTransacBusqueda.formattedBookDate = formatDateFromISOString(t.obtTransacBusqueda.bookDate, dateFormat, endOfDay);
            t.obtTransacBusqueda.importeString = formatNumber(t.obtTransacBusqueda.importe, numberFormat);
            if(numberFormat == '###.###.###,##'){
                t.obtTransacBusqueda.importeEntero = t.obtTransacBusqueda.importeString.split(',')[0];
                t.obtTransacBusqueda.importeDecimal = t.obtTransacBusqueda.importeString.substring(t.obtTransacBusqueda.importeString.indexOf(','));
            } else if(numberFormat == '###,###,###.##'){
                t.obtTransacBusqueda.importeEntero = t.obtTransacBusqueda.importeString.split('\\.')[0];
                t.obtTransacBusqueda.importeDecimal = t.obtTransacBusqueda.importeString.substring(t.obtTransacBusqueda.importeString.indexOf('.'));
            }
        }
        return input;
    }

    /*----------------------------------------------------------------------------------
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Method that formats the dates and numbers in the data returned by Mulesoft
    History
    <Date>			<Author>		            <Description>
    19/05/2020		Guillermo Giral             Initial version
    ----------------------------------------------------------------------------------*/
    public static String formatDateFromISOString (String dateToFormat, String format, Boolean endOfDay){
        // Check if the value date is populated and it's in ISO format
        if(dateToFormat!= null && dateToFormat !='' && dateToFormat.contains('T')){
            String[] dateChunks = dateToFormat.split('T');
            Date d = Date.valueOf(dateToFormat);
            Datetime dt = Datetime.newInstanceGMT(d.year(), d.month(),d.day(), Integer.valueOf(dateChunks[1].substring(0,2)), Integer.valueOf(dateChunks[1].substring(3,5)), Integer.valueOf(dateChunks[1].substring(6,8)));
            // Format date without taking into account the user timezone
            return dt.formatGMT(format);
            /*if(endOfDay){
                return dt.formatGMT(format);
            } else {
                return dt.format(format, String.valueOf(UserInfo.getTimeZone()));
            }*/
        }
        return dateToFormat;
    }

    /*----------------------------------------------------------------------------------
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Method that formats the number according to the choice of the user
    History
    <Date>			<Author>		            <Description>
    19/05/2020		Guillermo Giral             Initial version
    ----------------------------------------------------------------------------------*/
    public static String formatNumber (Double doub, String format){
        Decimal importe = Decimal.valueOf(doub).setScale(2);
        Double d1 = 1000;
        Double d2 = 0.35275;
        String importeString ='';
        String importeEntero ='';
        String importeDecimal ='';
        String tSep = d1.format().subString(1,2);
        String dSep = d2.format().subString(1,2);
        // Replace the thousands separator
        //String amount = importe.format().replaceAll('\\'+tSep, 'd');
        String amount = importe.format().replaceAll((tSep.equals('.') ? '\\' +tSep : tSep), 'd');

        if(format == '###.###.###,##'){
            amount = amount.replace(dSep, ',');
            amount = amount.replaceAll('d', '.');
            importeString = amount;
            importeEntero = importeString.split(',')[0];
            if(importeString.contains(',')){
                importeDecimal = importeString.substring(importeString.indexOf(','));
            } else{
                importeDecimal = ',00'; 
            }
        } else if(format == '###,###,###.##'){
            amount = amount.replace(dSep, '.');
            amount = amount.replaceAll('d', ',');
            importeString = amount;
            importeEntero = importeString.split('\\.')[0];
            if(importeString.contains('.')){
                importeDecimal = importeString.substring(importeString.indexOf('.'));
            } else{
                importeDecimal = '.00'; 
            }
        }
        return importeEntero + importeDecimal;
    }

    /*------------------------------------------------------------
    Author:         R. Cerviño
    Company:        Deloitte
    Description:   	Method to remove a file
    History 
    <Date>          <Author>                <Change Description>
    05/03/2019		 R. Cerviño  			Intial Version
    ------------------------------------------------------------*/
    
    @AuraEnabled 
    public static void removeFile (String id){
        try{
            CNT_SwiftPaymentTableRow.removeMT103(id);
        } catch(Exception e ){ throw new AuraHandledException('The following exception has occurred: ' + e.getMessage());}
    }
    
    /*----------------------------------------------------------------------------------
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Method that retrieves the timezone offset between the user's timezone
                    and GMT0. It is required to search the data appropriately
    History
    <Date>			<Author>		            <Description>
    27/04/2020		Guillermo Giral             Initial version
    ----------------------------------------------------------------------------------*/
    @AuraEnabled(cacheable=true)
    public static Map<String,String> getUserPreferredFormat(String userId){
        Map<String, String> mapUserFormats = new Map<String,String>();
        try {          
            mapUserFormats.put('dateFormat', Global_Utilities.getUserDateFormat(userId));
            mapUserFormats.put('numberFormat', Global_Utilities.getUserNumberFormat(userId));
            return mapUserFormats;
        } catch (Exception e) {
            System.debug('CNT_TransactionSearchController.getUserPreferredFormat: ' + e.getMessage());
        }
        return null;
    }
        
    /*----------------------------------------------------------------------------------
    Author:         R. Cervino
    Company:        Deloitte
    Description:    Data encrypting
    History
    <Date>			<Author>		<Description>
    21/05/2020		 R. Cervino    Initial version
    ----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static String encryptData(String str){
        return Global_Utilities.encryptData(str);
    }

    /*----------------------------------------------------------------------------------
    Author:         R. Cervino
    Company:        Deloitte
    Description:    Data decrypting
    History
    <Date>			<Author>		<Description>
    21/05/2020		 R. Cervino    Initial version
    ----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static String decryptData(String str){
        return Global_Utilities.decryptData(str);
    }

    /*----------------------------------------------------------------------------------
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Returns the user timezone based on the date provided
    History
    <Date>			<Author>		    <Description>
    08/07/2020		Guillermo Giral     Initial version
    ----------------------------------------------------------------------------------*/
    @AuraEnabled(cacheable=true)
    public static Map<String, Integer> getCurrentUserTimezoneOffSetInMiliseconds(List<String> dateInput){
        return Global_Utilities.getCurrentUserTimezoneOffSetInMiliseconds(dateInput);
    }
    
    /*----------------------------------------------------------------------------------
    Author:         Joaquín Vera
    Company:        Deloitte
    Description:    Getting the paginated movements
    History
    <Date>			<Author>		    <Description>
    30/07/2020		Joaquín Vera        Initial version
    ----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static WRAPPER_OneTrade_AccTransactions getPaginatedMovements(String bodyParams)
    {
        CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('CNT_OneT_Transactions_Search');

        String response = Global_IntegrationWrapper.launchHttp(bodyParams, configWs.CNT_Endpoint__c ,configWs.CNT_HTTPMethod__c);
        if(Test.isRunningTest()){
            response = '{'+
            '  \"balances\": {'+
            '    \"transactions\": {'+
            '      \"NUM_PAGINA\": 1,'+
            '      \"totalRegistros\": 1,'+
            '      \"totalPaginas\": 1,'+
            '      \"listaObtTransacciones\": ['+
            '        {'+
            '          \"obtTransacBusqueda\": {'+
            '            \"aliasCuentaPerfilado\": \"Alias 04       \",'+
            '            \"aliasEntidad\": \"testjueves04   \",'+
            '            \"bookDate\": \"2020-05-19T22:00:00.000Z\",'+
            '            \"codCuenta\": 1373,'+
            '            \"codigoBIC\": {'+
            '              \"branch\": \"   \",'+
            '              \"entidadbic\": \"    \",'+
            '              \"locatorbic\": \"  \",'+
            '              \"paisbic\": \"  \"'+
            '            },'+
            '            \"cuentaExtracto\": \"ES0200491500082119349999                          \",'+
            '            \"descripcion\": \"TRANSFERENCIA A FAVOR DE HAPAG-LLOYD, REFERENCIA 0049 1500 696 0CJJJ24//  000000000000 HAPAG-LLOYD                                                                                                                                                                                                                                                                                                                                          \",'+
            '            \"importe\": -15048.99,'+
            '            \"moneda\": \"USD\",'+
            '            \"nombreEntidad\": \"BANCO SANTANDER ESPANHA\",'+
            '            \"refBanco\": \"614 04 EM. TRANS\",'+
            '            \"transactionCategory\": null,'+
            '            \"refCliente\": \"NONREF          \",'+
            '            \"swiftCode\": null,'+
            '            \"tipoTransaccion\": \"TRF\",'+
            '            \"valueDate\": \"2020-05-19T22:00:00.000Z\",'+
            '            \"transactionType\": \"creditor\",'+
            '            \"creditorAccountDetails\": {'+
            '               \"name\": \"Coca Cola Ebury Pepe\",'+
            '               \"accountName\": \"Coca Cola\",'+
            '               \"accountNumber\": \"EB22222222\",'+
            '               \"bankId\": \"Coca Cola National Bank\",'+
            '               \"bankCode\": \"BCode3332222\",'+
            '               \"iban\": \"ES010123333333333\",'+
            '               \"swift\": \"swiftNumber34343434\"'+
            '            }'+
            '          }'+
            '        }'+
            '      ]'+
            '    }'+
            '  }'+
            '}';
        }
        if (String.isNotBlank(response)){
            //WRAPPER_AccountTransactionSearch listTransactions = WRAPPER_AccountTransactionSearch.parse(response); 
            WRAPPER_OneTrade_AccTransactions listTransactions = WRAPPER_OneTrade_AccTransactions.parse(response);
            if(listTransactions.balances.transactions.totalRegistros > 0){
                listTransactions = formatTransactionsOutputSingleAcc(listTransactions, false);
            	return listTransactions;
            }
        }

        return null;
        //return responseParsed;

    }
}