@isTest
global class WS_BeneficiaryAccounts_MockHttp{
    
    global class BasicResponse implements HttpCalloutMock{
        global HTTPResponse respond(HTTPRequest req) {
            HttpResponse res = new HttpResponse();
            res.setHeader('Content-Type', 'application/json');
            res.setBody(MockResponse.TestResponse());
            res.setStatusCode(200);
            return res;
        }
    }
    
    global class BeneficiaryAccounts implements HttpCalloutMock{
        global HTTPResponse respond(HTTPRequest req) {
            HttpResponse res = new HttpResponse();
            res.setHeader('Content-Type', 'application/json');
            res.setBody(MockResponse.WS_BeneficiaryAccounts());
            res.setStatusCode(200);
            return res;
        }
    }
    public String response = '';
    
    public void setResponse() {
        this.response = '{ "accountsListResponse": { "accountsDataList": [{ "transactionsAllowed": true, "displayNumber": "GB72ABBY09072322275601", "accountIdList": [{ "idType": "TEST", "accountId": "09072322275601" } ], "alias": "OTHER VT", "accountHolderAddress": { "country": "ES", "streetName": "Calle Patones", "townName": "Madrid" }, "aliasGts": "aliasGTS", "type": "BBA", "description": "OTHER VT", "status": "Open", "customerId": "4382", "country": "GB", "bankId": "ABBYGB20XXX", "bankDescription": "SANTANDER UK PLC", "parentCustomerName": "NoNAME", "customerName": "M.G.M. ACCIAIERIA ITALIA", "lastTransactionDate": "2021-01-20T10:12:15Z", "mainBalance": { "amount": 9774847.28, "currencyCode": "GBP", "lastUpdate": "2021-01-20T10:12:15Z" }, "availableBalance": { "amount": 9774847.28, "currencyCode": "GBP", "lastUpdate": "2021-01-20T10:12:15Z" }, "pendingBalance": { "amount": 0.0, "currencyCode": "GBP", "lastUpdate": "2021-01-20T10:12:15Z" }, "withholdingBalance": { "amount": 0.0, "currencyCode": "GBP", "lastUpdate": "2021-01-20T10:12:15Z" }, "overdraftLimit": { "amount": 0.0, "currencyCode": "GBP", "lastUpdate": "2021-01-20T10:12:15Z" }, "overdraftUsed": { "amount": 0.0, "currencyCode": "GBP", "lastUpdate": "2021-01-20T10:12:15Z" }, "hasSwiftPayments": "NO", "closedBalance": { "amount": 0.0, "currencyCode": "GBP", "lastUpdate": "2021-01-20T10:12:15Z" }, "closedAvailableBalance": { "amount": 0.0, "currencyCode": "GBP", "lastUpdate": "2021-01-20T10:12:15Z" }, "lastUpdateSwiftPayment": "2021-01-20T10:12:15Z", "pain002Active": false, "balanceAllowed": true, "internationalPaymentsAllowed": true, "companyIdsList": [{ "id": "4382", "idType": "LOCAL" }, { "id": "-1363016250", "idType": "GLOBAL" }, { "id": "4382", "idType": "NEXUS" } ] } ] } }';
       }
}