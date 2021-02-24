/*
Author:         Guillermo Giral
Company:        Deloitte
Description:    WS class to create the callout request for the web service to update the status of a payment (PATCH)
Test Class:
History:
<Date>          <Author>                <Description>
23/07/2020      Guillermo Giral         Initial version
*/
global with sharing class WS_TrackingPaymentOperation {
    private String result;
    private String baseEndpoint;
    private String baseMethod;
    private String paymentId;

    global String getResult () {
        return this.result;
    }

    global WS_TrackingPaymentOperation (String paymentId) {
        CNT_ApiConfiguration__c configWs = new CNT_ApiConfiguration__c();
        configWs = CNT_ApiConfiguration__c.getValues('WS_TrackingPaymentOperation');
        this.baseEndpoint = configWs.CNT_Endpoint__c;
        this.baseMethod = configWs.CNT_HTTPMethod__c;
        this.paymentId = paymentId;
    }

    /*
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Executes the callout to the PATCH tracking operation web service to udpate the status of the payment
    History:
    <Date>          <Author>                <Description>
    27/07/2020      Guillermo Giral         Initial version
    */
    public String execute (String status, String subject, String tcurrency, Double amount, String description) {
        this.result = 'KO';
        String inputJson = '';
        WRAPPER_TrackingPaymentOperation.INPUT input;
        try {
            // Send to review = status 003
            // Send to reject = status 997
            if (status == '003' || status == '997' || status == '998') {
                WRAPPER_TrackingPaymentOperation.OperationAmount operationAmount = new WRAPPER_TrackingPaymentOperation.OperationAmount(tcurrency, amount);
                WRAPPER_TrackingPaymentOperation.OperationStatus operationStatus = new WRAPPER_TrackingPaymentOperation.OperationStatus(status);
                WRAPPER_TrackingPaymentOperation.OperationDetail operationDetail = new WRAPPER_TrackingPaymentOperation.OperationDetail(subject, description, operationAmount, operationStatus);
                WRAPPER_TrackingPaymentOperation.InputData inputData = new WRAPPER_TrackingPaymentOperation.InputData(operationDetail);
                input = new WRAPPER_TrackingPaymentOperation.INPUT(inputData);
            }
            Map<String,String> extraHeaderParameters = new Map<String,String> ();
            extraHeaderParameters.put('Access-Channel', 'Web');
            extraHeaderParameters.put('Global-Payment-Id', this.paymentId);
            inputJson = JSON.serialize(input, true);
            // Generate the endpoint based on the paymentId
            String finalEndpoint = this.baseEndpoint.replace('{paymentId}', this.paymentId);
            // Make the callout to the POST web service
            HttpResponse res = new HttpResponse();
            res = Global_IntegrationWrapper.launchHTTPWithResponse(inputJson, finalEndpoint, this.baseMethod, extraHeaderParameters, UserInfo.getUserId(), true, null );
            if (String.valueOf(res.getStatusCode()).startsWith('2')) {
                this.result = 'OK';
                if (status == '997' || status == '998') {
                    CNT_B2B_SignatureUtilities.deleteSignatureRecord(this.paymentId);
                }
            }
        } catch (Exception e) {
            System.debug('WS_TrackingPaymentOperation.execute: ' + e.getMessage());
            throw new CustomException('Error when consulting update status service');
        }
        return this.result;
    }

    /*
    Author:         Bea Hill
    Company:        Deloitte
    Description:    Executes the callout to the PATCH tracking operation web service to udpate the status of the payment
    History:
    <Date>          <Author>                <Description>
    17/09/2020      Shahad Naji             Initial version
    */
    public String execute(String status, String reason, String subject, String tcurrency, Double amount, String description) {
        this.result = 'KO';
        String inputJson = '';
        WRAPPER_TrackingPaymentOperation.INPUT input;
        try {
            // Send to review = status 003
            // Send to reject = status 997
            if (status == '003' || status == '997' || status == '998') {
                WRAPPER_TrackingPaymentOperation.OperationAmount operationAmount = new WRAPPER_TrackingPaymentOperation.OperationAmount(tcurrency, amount);
                DateTime myDt = datetime.now();
                String today = myDT.formatGMT('yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'');
                WRAPPER_TrackingPaymentOperation.OperationStatus operationStatus = new WRAPPER_TrackingPaymentOperation.OperationStatus(status, reason, today);
                WRAPPER_TrackingPaymentOperation.OperationDetail operationDetail = new WRAPPER_TrackingPaymentOperation.OperationDetail(subject, description, operationAmount, operationStatus);
                WRAPPER_TrackingPaymentOperation.InputData inputData = new WRAPPER_TrackingPaymentOperation.InputData(operationDetail);
                System.debug('Operation Detail: ' + operationDetail);
                input = new WRAPPER_TrackingPaymentOperation.INPUT(inputData);
                System.debug('INPUT: ' + input);
            }
            Map<String,String> extraHeaderParameters = new Map<String,String> ();
            extraHeaderParameters.put('Access-Channel', 'Web');
            extraHeaderParameters.put('Global-Payment-Id', this.paymentId);
            inputJson = JSON.serialize(input, true);
            System.debug('Input JSON: ' + inputJson);
            // Generate the endpoint based on the paymentId
            String finalEndpoint = this.baseEndpoint.replace('{paymentId}', this.paymentId);
            // Make the callout to the POST web service
            HttpResponse res = new HttpResponse();
            res = Global_IntegrationWrapper.launchHTTPWithResponse(inputJson, finalEndpoint, this.baseMethod, extraHeaderParameters, UserInfo.getUserId(), true, null );
            System.debug('Response: ' + res);
            if (String.valueOf(res.getStatusCode()).startsWith('2')) {
                this.result = 'OK';
                if (status == '997' || status == '998') {
                    CNT_B2B_SignatureUtilities.deleteSignatureRecord(this.paymentId);
                }
            }
        } catch (Exception e) {
            System.debug('execute.WS_TrackingPaymentOperation: ' + e.getMessage());
            throw new CustomException('Error when consulting update status service');
        }
        return this.result;
    }

    /*
    Author:         Bea Hill
    Company:        Deloitte
    Description:    Executes the callout to the PATCH tracking operation web service to udpate the status to "Pending" when the user confirms details in the summary page
    History:
    <Date>          <Author>                <Description>
    07/08/2020      Bea Hill                Initial version
    29/20/2020      Bea Hill                Overwrite updateStatus function to set user information before updating a payment
    23/11/2020      Shahad Naji             Split result with multiple condition to check its values
    */
    public String updateStatus (String status, String reason) {
        WrapperUserData userData = null;
        return updateStatus(status, reason, userData);
    }

    public String updateStatus (String status, String reason, WrapperUserData userData) {
        this.result = '';
        String inputJson = '';
        WRAPPER_TrackingPaymentOperation.INPUT input;
        try {
            if (userData == null) {
                userData = ServiceUserData.getUserData();
                System.debug('userData: ' + userData);
            }
            String globalUserId = userData.globalId;
            DateTime myDt = datetime.now();
            String today = myDT.formatGMT('yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'');
            WRAPPER_TrackingPaymentOperation.OperationStatus operationStatus = new WRAPPER_TrackingPaymentOperation.OperationStatus(status, reason, today, globalUserId);
            WRAPPER_TrackingPaymentOperation.OperationDetail operationDetail = new WRAPPER_TrackingPaymentOperation.OperationDetail(operationStatus);
            WRAPPER_TrackingPaymentOperation.InputData inputData = new WRAPPER_TrackingPaymentOperation.InputData(operationDetail);
            input = new WRAPPER_TrackingPaymentOperation.INPUT(inputData);
            Map<String,String> extraHeaderParameters = new Map<String,String> ();
            extraHeaderParameters.put('Access-Channel', 'Web');
            extraHeaderParameters.put('Global-Payment-Id', this.paymentId);
            inputJson = JSON.serialize(input, true);
            // Generate the endpoint based on the paymentId
            String finalEndpoint = this.baseEndpoint.replace('{paymentId}', this.paymentId);
            // Make the callout to the PATCH web service
            String result = null;
            result = Global_IntegrationWrapper.launchHTTP(inputJson, finalEndpoint, this.baseMethod, extraHeaderParameters);
            String resultAux = '';
            if (String.isNotBlank(result)) {
                resultAux = result.replaceAll('\n', '');
                resultAux = resultAux.replaceAll('\\\\', '');
                resultAux = resultAux.replaceAll(' ', '');
                if (String.isNotBlank(resultAux)) {
                     if (resultAux.contains('"status":"OK"')) {
                        this.result = 'OK';
                        if (status == '997' || status == '998') {
                            CNT_B2B_SignatureUtilities.deleteSignatureRecord(this.paymentId);
                        }
                    } else {
                        throw new CustomException('Error when consulting update status service');
                    }
                } else {
                    throw new CustomException('Error when consulting update status service');
                }
            } else {
                throw new CustomException('Error when consulting update status service');
            }
        } catch (Exception e) {
            System.debug('WS_TrackingPaymentOperation.updateStatus: ' + e.getMessage());
            throw new CustomException(e.getMessage());
        }
        return this.result;
    }

    /*
    Author:         Bea Hill
    Company:        Deloitte
    Description:    Executes the callout to the PATCH tracking operation web service to udpate the details of the payment in step 4
    History:
    <Date>          <Author>                <Description>
    07/08/2020      Bea Hill                Initial version
    12/08/2020      Bea Hill                Removed the status and reason parameters
    07/09/2020      Bea Hill                Add chargeBearer
    14/01/2021      Shahad Naji             Extend updateInformation method to receive more input parameters
    */
    public String updateInformation (String clientReference, String purpose, String description, String chargeBearer, String paymentMethod, String commercialCode) {
        return this.updateInformation(clientReference, purpose, description, chargeBearer, paymentMethod, commercialCode,  null, null, null);
    }

    public String updateInformation (String clientReference, String purpose, String description, String chargeBearer, String paymentMethod, String commercialCode, String issueDate, double baseAmount, String baseCurrency) {
        this.result = '';
        String inputJson = '';
        WRAPPER_TrackingPaymentOperation.INPUT input;
        try {
            WRAPPER_TrackingPaymentOperation.OperationAmountBaseCurrency operationAmountBaseCurrency = null;
            if (baseAmount != null && String.isNotBlank(baseCurrency)) {
                operationAmountBaseCurrency = new WRAPPER_TrackingPaymentOperation.OperationAmountBaseCurrency(baseCurrency, baseAmount);
            }
            WRAPPER_TrackingPaymentOperation.OperationDetail operationDetail = new WRAPPER_TrackingPaymentOperation.OperationDetail(clientReference, purpose, description, chargeBearer, paymentMethod, commercialCode, issueDate, operationAmountBaseCurrency);
            WRAPPER_TrackingPaymentOperation.InputData inputData = new WRAPPER_TrackingPaymentOperation.InputData(operationDetail);
            input = new WRAPPER_TrackingPaymentOperation.INPUT(inputData);
            Map<String, String> extraHeaderParameters = new Map<String, String>();
            extraHeaderParameters.put('Access-Channel', 'Web');
            extraHeaderParameters.put('Global-Payment-Id', this.paymentId);
            inputJson = JSON.serialize(input, true);
            // Generate the endpoint based on the paymentId
            String finalEndpoint = this.baseEndpoint.replace('{paymentId}', this.paymentId);
            // Make the callout to the PATCH web service
            String result = null;
            result = Global_IntegrationWrapper.launchHTTP(inputJson, finalEndpoint, this.baseMethod, extraHeaderParameters);
            String resultAux = result.replaceAll('\n', '');
            resultAux = resultAux.replaceAll('\\\\', '');
            resultAux = resultAux.replaceAll(' ', '');
            if (result != null && resultAux.contains('"status":"OK"')) {
                this.result = 'OK';
                WRAPPER_PaymentSF paymentSF = new WRAPPER_PaymentSF();
                paymentSF.paymentId = this.paymentId;
                paymentSF.clientReference = clientReference;
                String JSONpaymentSF = JSON.serialize(paymentSF);
                HANDLER_Payment.updatePayment(JSONpaymentSF);
            } else {
                throw new CustomException('Error when consulting update information service');
            }
        } catch (Exception e) {
            System.debug('WS_TrackingPaymentOperation.updateInformation: ' + e.getMessage());
            throw new CustomException(e.getMessage());
        }
        return this.result;
    }

    /*
    Author:         Bea Hill
    Company:        Deloitte
    Description:    Executes the callout to the PATCH tracking operation web service to udpate the details of the payment in step 4
    History:
    <Date>          <Author>            <Description>
    07/08/2020      Bea Hill            Initial version
    12/08/2020      Bea Hill            Removed the status and reason parameters
    09/11/2020      Bea Hill            If userInputField == 'source', save the amount in the counterValueOperationAmount field, else 'recipient' operationAmount.
    01/02/2021      Candido             Refactor with WRAPPER_PAY_PaymentDraft
    */
    public String updateAmountInformation (String originAmount, Decimal convertedAmount, String sourceCurrency, Decimal sourceAmount, String destinationCurrency, Decimal destinationAmount) {
        Double doubleConvertedAmount = double.valueOf(convertedAmount);
        Double doubleSourceAmount = double.valueOf(sourceAmount);
        Double doubledestinationAmount = double.valueOf(destinationAmount);
        return updateAmountInformation(originAmount, doubleConvertedAmount, sourceCurrency, doubleSourceAmount, destinationCurrency, doubledestinationAmount);
    }

    public String updateAmountInformation (String originAmount, Double convertedAmount, String sourceCurrency, Double sourceAmount, String destinationCurrency, Double destinationAmount) {
        this.result = '';
        try {
            WRAPPER_TrackingPaymentOperation.OperationAmount operationAmount = new WRAPPER_TrackingPaymentOperation.OperationAmount();
            WRAPPER_TrackingPaymentOperation.CounterValueOperationAmount counterValueOperationAmount = new WRAPPER_TrackingPaymentOperation.CounterValueOperationAmount();
            WRAPPER_TrackingPaymentOperation.OperationAmount sourceTotalAmount = new WRAPPER_TrackingPaymentOperation.OperationAmount();
            if (originAmount == 'source') {
                sourceTotalAmount = new WRAPPER_TrackingPaymentOperation.OperationAmount(sourceCurrency, sourceAmount);
            } else if (originAmount == 'recipient') {
                sourceTotalAmount = new WRAPPER_TrackingPaymentOperation.OperationAmount(sourceCurrency, convertedAmount);
            }
            if (sourceCurrency == destinationCurrency) {
                operationAmount = new WRAPPER_TrackingPaymentOperation.OperationAmount(sourceCurrency, sourceAmount);
            } else if (originAmount == 'source') {
                counterValueOperationAmount = new WRAPPER_TrackingPaymentOperation.CounterValueOperationAmount(sourceCurrency, sourceAmount, destinationCurrency);
            } else {
                operationAmount = new WRAPPER_TrackingPaymentOperation.OperationAmount(destinationCurrency, destinationAmount);
            }
            WRAPPER_TrackingPaymentOperation.OperationDetail operationDetail = new WRAPPER_TrackingPaymentOperation.OperationDetail(operationAmount, counterValueOperationAmount, sourceTotalAmount);
            callToService(operationDetail);
        } catch (Exception e) {
            System.debug('WS_TrackingPaymentOperation.updateAmountInformation: ' + e.getMessage());
            throw new CustomException(e.getMessage());
        }
        return this.result;
    }

    public String updateFeesInformation (WS_TransferFees.OUTPUT transactionFeeServiceResponse, Decimal transactionFee, String transactionFeeCurrency) {
        Double doubleTransactionFee = Double.valueOf(transactionFee);
        return updateFeesInformation(transactionFeeServiceResponse, doubleTransactionFee, transactionFeeCurrency);
    }

    public String updateFeesInformation (WS_TransferFees.OUTPUT transactionFeeServiceResponse, Double transactionFee, String transactionFeeCurrency) {
        this.result = '';
        try {
            List<WS_TransferFees.CurrencyList> currencyList = transactionFeeServiceResponse.currencyList;
            String auxCurrencyList = JSON.serialize(currencyList, true);
            List<WRAPPER_TrackingPaymentOperation.CurrencyList> newCurrencyList = (List<WRAPPER_TrackingPaymentOperation.CurrencyList>) JSON.deserialize(auxCurrencyList, List<WRAPPER_TrackingPaymentOperation.CurrencyList>.class);
            WRAPPER_TrackingPaymentOperation.PricingDetails pricingDetails = new WRAPPER_TrackingPaymentOperation.PricingDetails(transactionFeeServiceResponse.productName, transactionFee, transactionFeeCurrency, newCurrencyList);
            WRAPPER_TrackingPaymentOperation.OperationDetail operationDetail = new WRAPPER_TrackingPaymentOperation.OperationDetail(pricingDetails);
            callToService(operationDetail);
        } catch (Exception e) {
            System.debug('WS_TrackingPaymentOperation.updateFeesInformation: ' + e.getMessage());
            throw new CustomException(e.getMessage());
        }
        return this.result;
    }

    public void callToService (WRAPPER_TrackingPaymentOperation.OperationDetail operationDetail) {
        try {
            WRAPPER_TrackingPaymentOperation.InputData inputData = new WRAPPER_TrackingPaymentOperation.InputData(operationDetail);
            WRAPPER_TrackingPaymentOperation.INPUT input = new WRAPPER_TrackingPaymentOperation.INPUT(inputData);
            Map<String, String> extraHeaderParameters = new Map<String, String>();
            extraHeaderParameters.put('Access-Channel', 'Web');
            extraHeaderParameters.put('Global-Payment-Id', this.paymentId);
            String inputJson = JSON.serialize(input, true);
            // Generate the endpoint based on the paymentId
            String finalEndpoint = this.baseEndpoint.replace('{paymentId}', this.paymentId);
            // Make the callout to the PATCH web service
            String result = null;
            result = Global_IntegrationWrapper.launchHTTP(inputJson, finalEndpoint, this.baseMethod, extraHeaderParameters);
            String resultAux = result.replaceAll('\n', '');
            resultAux = resultAux.replaceAll('\\\\', '');
            resultAux = resultAux.replaceAll(' ', '');
            if (result != null && resultAux.contains('"status":"OK"')) {
                this.result = 'OK';
            } else {
                throw new CustomException('Error calling Operation Tracking service');
            }
        } catch (Exception e) {
            System.debug('WS_TrackingPaymentOperation.callToService: ' + e.getMessage());
            throw new CustomException(e.getMessage());
        }
    }

    // FLOWERPOWER_TOERASE
    // CPC_DEPRECATED
    public String updateAmountInformation (WRAPPER_B2B_Data.PaymentAmount paymentData, WRAPPER_AccountList.AccountDetails sourceAccountData) {
        WRAPPER_AccountList.AccountDetails recipientAccountData = null;
        String userInputField = null;
        return updateAmountInformation(paymentData, sourceAccountData, recipientAccountData, userInputField);
    }

    // FLOWERPOWER_TOERASE
    // CPC_DEPRECATED
    public String updateAmountInformation (WRAPPER_B2B_Data.PaymentAmount paymentData, WRAPPER_AccountList.AccountDetails sourceAccountData, WRAPPER_AccountList.AccountDetails recipientAccountData, String userInputField) {
        this.result = '';
        String inputJson = '';
        Double transactionFee = double.valueOf(paymentData.transactionFee);
        Double amountSend = double.valueOf(paymentData.amountSend);
        Double amountReceive = double.valueOf(paymentData.amountReceive);
        WRAPPER_TrackingPaymentOperation.INPUT input;
        try {
            List<WS_TransferFees.CurrencyList> currencyList = paymentData.transactionFeeServiceResponse.currencyList;
            String auxCurrencyList = JSON.serialize(currencyList, true);
            List<WRAPPER_TrackingPaymentOperation.CurrencyList> newCurrencyList = (List<WRAPPER_TrackingPaymentOperation.CurrencyList>) JSON.deserialize(auxCurrencyList, List<WRAPPER_TrackingPaymentOperation.CurrencyList>.class);
            WRAPPER_TrackingPaymentOperation.OperationFeesFxDetails operationFeesFxDetails = new WRAPPER_TrackingPaymentOperation.OperationFeesFxDetails();
            if (paymentData.convertedTransactionFeeServiceResponse != null) {
                Double ccyCountervalueAmount = double.valueOf(paymentData.convertedTransactionFeeServiceResponse.fxExchangeResponse.ccyCountervalue.ccyCountervalueAmount);
                String ccyCountervalueCurrency = paymentData.convertedTransactionFeeServiceResponse.fxExchangeResponse.ccyCountervalue.ccyCountervalueCurrency;
                WRAPPER_TrackingPaymentOperation.CcyCountervalue ccyCounterValue = new WRAPPER_TrackingPaymentOperation.CcyCountervalue(ccyCountervalueAmount, ccyCountervalueCurrency);
                operationFeesFxDetails = new WRAPPER_TrackingPaymentOperation.OperationFeesFxDetails(paymentData.convertedTransactionFeeServiceResponse.fxExchangeResponse.fxCountervalueId, paymentData.convertedTransactionFeeServiceResponse.priceType, null, ccyCountervalue, paymentData.convertedTransactionFeeServiceResponse.fxExchangeResponse.valueDateEfx, paymentData.convertedTransactionFeeServiceResponse.fxExchangeResponse.customerExchangeRate);
            }
            WRAPPER_TrackingPaymentOperation.PricingDetails pricingDetails = new WRAPPER_TrackingPaymentOperation.PricingDetails(paymentData.transactionFeeServiceResponse.productName, transactionFee, paymentData.transactionFeeCurrency, newCurrencyList);
            WRAPPER_TrackingPaymentOperation.OperationAmount operationAmount = new WRAPPER_TrackingPaymentOperation.OperationAmount();
            WRAPPER_TrackingPaymentOperation.CounterValueOperationAmount counterValueOperationAmount = new WRAPPER_TrackingPaymentOperation.CounterValueOperationAmount();
            WRAPPER_TrackingPaymentOperation.OperationAmount sourceTotalAmount = new WRAPPER_TrackingPaymentOperation.OperationAmount();
            sourceTotalAmount = new WRAPPER_TrackingPaymentOperation.OperationAmount(sourceAccountData.currencyCodeAvailableBalance, amountSend);
            if (sourceAccountData.currencyCodeAvailableBalance == recipientAccountData.currencyCodeAvailableBalance) {
                operationAmount = new WRAPPER_TrackingPaymentOperation.OperationAmount(sourceAccountData.currencyCodeAvailableBalance, amountSend);
            } else if (userInputField == 'source') {
                counterValueOperationAmount = new WRAPPER_TrackingPaymentOperation.CounterValueOperationAmount(sourceAccountData.currencyCodeAvailableBalance, amountSend, recipientAccountData.currencyCodeAvailableBalance);
            } else {
                operationAmount = new WRAPPER_TrackingPaymentOperation.OperationAmount(recipientAccountData.currencyCodeAvailableBalance, amountReceive);
            }
            WRAPPER_TrackingPaymentOperation.OperationDetail operationDetail = new WRAPPER_TrackingPaymentOperation.OperationDetail(operationAmount, counterValueOperationAmount, pricingDetails, operationFeesFxDetails, sourceTotalAmount);
            WRAPPER_TrackingPaymentOperation.InputData inputData = new WRAPPER_TrackingPaymentOperation.InputData(operationDetail);
            input = new WRAPPER_TrackingPaymentOperation.INPUT(inputData);
            Map<String, String> extraHeaderParameters = new Map<String, String>();
            extraHeaderParameters.put('Access-Channel', 'Web');
            extraHeaderParameters.put('Global-Payment-Id', this.paymentId);
            inputJson = JSON.serialize(input, true);
            // Generate the endpoint based on the paymentId
            String finalEndpoint = this.baseEndpoint.replace('{paymentId}', this.paymentId);
            // Make the callout to the PATCH web service
            String result = null;
            result = Global_IntegrationWrapper.launchHTTP(inputJson, finalEndpoint, this.baseMethod, extraHeaderParameters);
            String resultAux = result.replaceAll('\n', '');
            resultAux = resultAux.replaceAll('\\\\', '');
            resultAux = resultAux.replaceAll(' ', '');
            if (result != null && resultAux.contains('"status":"OK"')) {
                this.result = 'OK';
            } else {
                throw new CustomException('Error when consulting updateAmountInformation service');
            }
        } catch (Exception e) {
            System.debug('WS_TrackingPaymentOperation.updateAmountInformation: ' + e.getMessage());
            throw new CustomException(e.getMessage());
        }
        return this.result;
    }

    /*
    23/11/2020       Shahad Naji         Split result with multiple condition to check its values
    */
    public String updateAdditionalData (String status, String reason, WrapperUserData userData, String subject, String description) {
        this.result = '';
        String inputJson = '';
        WRAPPER_TrackingPaymentOperation.INPUT input;
        try {
            if (userData == null) {
                userData = ServiceUserData.getUserData();
                System.debug('userData: ' + userData);
            }
            String globalUserId = userData.globalId;
            DateTime myDt = datetime.now();
            String today = myDT.formatGMT('yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'');
            WRAPPER_TrackingPaymentOperation.OperationStatus operationStatus = new WRAPPER_TrackingPaymentOperation.OperationStatus(status, reason, today, globalUserId);
            WRAPPER_TrackingPaymentOperation.OperationDetail operationDetail = new WRAPPER_TrackingPaymentOperation.OperationDetail();
            if (status == '997' && reason == '001') {
                WRAPPER_TrackingPaymentOperation.RejectAdditionalData rejectAdditionalData = new WRAPPER_TrackingPaymentOperation.RejectAdditionalData(subject, description);
                operationDetail = new WRAPPER_TrackingPaymentOperation.OperationDetail(operationStatus, rejectAdditionalData);
            } else if (status == '003' && reason == '001') {
                WRAPPER_TrackingPaymentOperation.ReviewAdditionalData reviewAdditionalData = new WRAPPER_TrackingPaymentOperation.ReviewAdditionalData(subject, description);
                operationDetail = new WRAPPER_TrackingPaymentOperation.OperationDetail(operationStatus, reviewAdditionalData);
            }
            WRAPPER_TrackingPaymentOperation.InputData inputData = new WRAPPER_TrackingPaymentOperation.InputData(operationDetail);
            input = new WRAPPER_TrackingPaymentOperation.INPUT(inputData);
            Map<String, String> extraHeaderParameters = new Map<String, String>();
            extraHeaderParameters.put('Access-Channel', 'Web');
            extraHeaderParameters.put('Global-Payment-Id', this.paymentId);
            inputJson = JSON.serialize(input, true);
            // Generate the endpoint based on the paymentId
            String finalEndpoint = this.baseEndpoint.replace('{paymentId}', this.paymentId);
            // Make the callout to the PATCH web service
            String result = null;
            result = Global_IntegrationWrapper.launchHTTP(inputJson, finalEndpoint, this.baseMethod, extraHeaderParameters);
            String resultAux  = '';
            if (String.isNotBlank(result)) {
                resultAux = result.replaceAll('\n', '');
                resultAux = resultAux.replaceAll('\\\\', '');
                resultAux = resultAux.replaceAll(' ', '');
                if (String.isNotBlank(resultAux)) {
                    if (resultAux.contains('"status":"OK"')) {
                        this.result = 'OK';
                    } else {
                        throw new CustomException('Error when consulting updateAdditionalData service');
                    }
                } else {
                    throw new CustomException('Error when consulting updateAdditionalData service');
                }
            } else {
                throw new CustomException('Error when consulting updateAdditionalData service');
            }
        } catch (Exception e) {
            System.debug('WS_TrackingPaymentOperation.updateAdditionalData: ' + e.getMessage());
            throw new CustomException(e.getMessage());
        }
        return this.result;
    }

    global String updateAccountsInformation (WRAPPER_AccountList.AccountDetails sourceAccountData, WRAPPER_AccountList.AccountDetails recipientAccountData, WRAPPER_AccountList.AccountDetails sourceFeeAccountData) {
        this.result = '';
        String inputJson = '';
        WRAPPER_TrackingPaymentOperation.INPUT input;
        try {
            if (sourceAccountData == null) {
                throw new CustomException('You must inform the source account.');
            }
            if (recipientAccountData == null) {
                throw new CustomException('You must inform the recipient account.');
            }
            WRAPPER_TrackingPaymentOperation.SourceAccount sourceAccount = new WRAPPER_TrackingPaymentOperation.SourceAccount(sourceAccountData.idType, sourceAccountData.displayNumber, sourceAccountData.currencyCodeAvailableBalance);
            WRAPPER_TrackingPaymentOperation.SourceAgent sourceAgent = new WRAPPER_TrackingPaymentOperation.SourceAgent(sourceAccountData.codigoBic, sourceAccountData.bankName, sourceAccountData.countryName);
            WRAPPER_TrackingPaymentOperation.SourceAddress sourceAddress = null;
            if (sourceAccountData.address != null) {
                sourceAddress = new WRAPPER_TrackingPaymentOperation.SourceAddress(sourceAccountData.address.streetName, sourceAccountData.address.townName, sourceAccountData.address.country);
            } else {
                // TO-DO
            }
            String sourceCustomerId = sourceAccountData.customerId;
            String sourceCompanyGlobalId = '';
            if (sourceAccountData.companyIdsList != null) {
                if (String.isNotBlank(sourceAccountData.companyIdsList.get('LOCAL'))) {
                    sourceCustomerId = sourceAccountData.companyIdsList.get('LOCAL');
                }
                if (String.isNotBlank(sourceAccountData.companyIdsList.get('GLOBAL'))) {
                    sourceCompanyGlobalId = sourceAccountData.companyIdsList.get('GLOBAL');
                }
            }
            String recipientCustomerId = recipientAccountData.customerId;
            String recipientCompanyGlobalId = '';
            if (recipientAccountData.companyIdsList != null) {
                if (String.isNotBlank(recipientAccountData.companyIdsList.get('LOCAL'))) {
                    recipientCustomerId = recipientAccountData.companyIdsList.get('LOCAL');
                }
                if (String.isNotBlank(recipientAccountData.companyIdsList.get('GLOBAL'))) {
                    recipientCompanyGlobalId = recipientAccountData.companyIdsList.get('GLOBAL');
                }
            }
            WRAPPER_TrackingPaymentOperation.SourceData sourceData = new WRAPPER_TrackingPaymentOperation.SourceData(sourceAccountData.subsidiaryName, sourceCustomerId, sourceCompanyGlobalId, sourceAddress, sourceAccount, sourceAgent, sourceAccountData.country);
            WRAPPER_TrackingPaymentOperation.SourceAccount destinationAccount = new WRAPPER_TrackingPaymentOperation.SourceAccount(recipientAccountData.idType, recipientAccountData.displayNumber, recipientAccountData.currencyCodeAvailableBalance);
            WRAPPER_TrackingPaymentOperation.SourceAgent destinationAgent = new WRAPPER_TrackingPaymentOperation.SourceAgent(recipientAccountData.codigoBic, recipientAccountData.bankName, recipientAccountData.countryName);
            WRAPPER_TrackingPaymentOperation.SourceAddress destinationAddress = null;
            if (recipientAccountData.address != null) {
                destinationAddress = new WRAPPER_TrackingPaymentOperation.SourceAddress(recipientAccountData.address.streetName, recipientAccountData.address.townName, recipientAccountData.address.country);
            } else {
                // TO-DO
            }
            WRAPPER_TrackingPaymentOperation.DestinationData destinationData = new WRAPPER_TrackingPaymentOperation.DestinationData(recipientAccountData.subsidiaryName, recipientCustomerId, recipientCompanyGlobalId, destinationAddress, destinationAccount, destinationAgent, recipientAccountData.country);
            WRAPPER_TrackingPaymentOperation.SourceFeeData sourceFeeData = null;
            if (sourceFeeAccountData != null) {
                WRAPPER_TrackingPaymentOperation.SourceAccount sourceFeeAccount = new WRAPPER_TrackingPaymentOperation.SourceAccount(sourceFeeAccountData.idType, sourceFeeAccountData.displayNumber, sourceFeeAccountData.currencyCodeAvailableBalance);
                WRAPPER_TrackingPaymentOperation.SourceAgent sourceFeeAgent = new WRAPPER_TrackingPaymentOperation.SourceAgent(sourceFeeAccountData.codigoBic, sourceFeeAccountData.bankName, sourceFeeAccountData.countryName);
                sourceFeeData = new WRAPPER_TrackingPaymentOperation.SourceFeeData(sourceFeeAccountData.subsidiaryName, sourceFeeAccount, sourceFeeAgent, sourceFeeAccountData.country);
            }
            WRAPPER_TrackingPaymentOperation.OperationDetail operationDetail = new WRAPPER_TrackingPaymentOperation.OperationDetail(sourceData, destinationData, sourceFeeData);
            WRAPPER_TrackingPaymentOperation.InputData inputData = new WRAPPER_TrackingPaymentOperation.InputData(operationDetail);
            input = new WRAPPER_TrackingPaymentOperation.INPUT(inputData);
            Map<String,String> extraHeaderParameters = new Map<String,String> ();
            extraHeaderParameters.put('Access-Channel', 'Web');
            extraHeaderParameters.put('Global-Payment-Id', this.paymentId);
            inputJson = JSON.serialize(input, true);
            String finalEndpoint = this.baseEndpoint.replace('{paymentId}', this.paymentId);
            String result = null;
            result = Global_IntegrationWrapper.launchHTTP(inputJson, finalEndpoint, this.baseMethod, extraHeaderParameters);
            String resultAux  = '';
            if (String.isNotBlank(result)) {
                resultAux = result.replaceAll('\n', '');
                resultAux = resultAux.replaceAll('\\\\', '');
                resultAux = resultAux.replaceAll(' ', '');
                if (String.isNotBlank(resultAux)) {
                    if (resultAux.contains('"status":"OK"')) {
                        this.result = 'OK';
                    } else {
                        throw new CustomException('Error when consulting updateAdditionalData service');
                    }
                } else {
                    throw new CustomException('Error when consulting updateAdditionalData service');
                }
            } else {
                throw new CustomException('Error when consulting updateAdditionalData service');
            }
        } catch (Exception e) {
            System.debug('WS_TrackingPaymentOperation.updateAccountsInformation: ' + e.getMessage());
            throw new CustomException(e.getMessage());
        }
        return this.result;
    }
}