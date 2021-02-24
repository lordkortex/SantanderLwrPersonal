/*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Controller of CMP_IPTDetailParent 
Test Class:     CNT_IPTDetailParent_Test
History
<Date>          <Author>        <Description>
27/02/2020      Shahad Naji     Initial version
27/02/2020      R. Cervino      Second version
----------------------------------------------------------------------------------*/
public class CNT_IPTDetailParent {/*

    @AuraEnabled
    public static String valueDate {get;set;}
    @AuraEnabled
    public static String totalElapsedTime {get;set;}
    @AuraEnabled
    public static String charges {get;set;}
    @AuraEnabled
    public static Decimal fees {get;set;}
    @AuraEnabled
    public static String uetr {get;set;}
    @AuraEnabled
    public static String originAccountName {get;set;}
    @AuraEnabled
    public static String originAccountNumber {get;set;}
    @AuraEnabled 
    public static String originAccountBank {get;set;}
    @AuraEnabled
    public static String originAccountBic  {get;set;}
    @AuraEnabled
    public static String beneficiaryAccountName  {get;set;}
    @AuraEnabled
    public static String beneficiaryAccountNumber {get;set;}
    @AuraEnabled 
    public static String beneficiaryAccountBank {get;set;}
    @AuraEnabled
    public static String beneficiaryAccountBic  {get;set;}
    @AuraEnabled
    public static String status {get;set;}
    @AuraEnabled
    public static String statusLabel {get;set;}
    @AuraEnabled
    public static String reason {get;set;}
    @AuraEnabled
    public static String transactionCancellationStatus {get;set;}
    @AuraEnabled
    public static String statusUpdate {get;set;}
    @AuraEnabled
    public static String currencyAux {get;set;}
    @AuraEnabled
    public static Decimal totalFee {get;set;}
    @AuraEnabled
    public static Decimal amount {get;set;}
    @AuraEnabled
    public static String lastUpdate {get;set;}
    @AuraEnabled
    public static String currentBank {get;set;}
    
    
    public class CNT_Step{
    @AuraEnabled
    public  String bank {get;set;}
    @AuraEnabled
    public  String bic {get;set;}
    @AuraEnabled
    public  String country {get;set;}
    @AuraEnabled        
    public  String countryName {get;set;}
    @AuraEnabled
    public String city {get;set;}
    @AuraEnabled
    public  String arrivalDate {get;set;}
    @AuraEnabled
    public  String arrivalTime {get;set;}
    @AuraEnabled 
    public String duration {get;set;}
    @AuraEnabled
    public  String durationDate {get;set;}
    @AuraEnabled
    public  String durationTime {get;set;}
    @AuraEnabled
    public  String departureDate {get;set;}
    @AuraEnabled
    public  String departureTime {get;set;}
    @AuraEnabled
    public  boolean feeApplied {get;set;}
    @AuraEnabled
    public Decimal stepFee {get;set;}
    }
    
    @AuraEnabled
    public static List<CNT_Step> stepList {get;set;}*/
        
        /*@AuraEnabled(cacheable=true)
    public static WRAPPER_IPTDetail getIPTDetail(String uetr) {
    CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('CNT_GetIPTDetail');
    System.debug('configWs ' + configWs);
    String finalEndPoint = configWs.CNT_Endpoint__c.replace('{payment_Id}', uetr);
    System.debug('finalEndPoint ' + finalEndPoint);
    
    try{
    String response = Global_IntegrationWrapper.launchHttp('',finalEndPoint, configWs.CNT_HTTPMethod__c);
    
    if (String.isNotBlank(response)) {
    system.debug('La respuesta es ' + response);
    WRAPPER_IPTDetail iptDetailList = WRAPPER_IPTDetail.parse(response);
    return iptDetailList;
    } else {
    return null;
    //FALTA LA LABEL
    //throw new customException(Label.getDataError);
    }
    
    }catch (Exception e) {
    System.debug('CNT_IPTDetailParent.getIPTDetail: ' + e.getMessage());
    //  throw new customException(e.getMessage());
    } 
    return null;
    }
    
    private static String getStatus(String iStatus, String iReason){
    String iReturn = '';
    try{
    if(iStatus == 'ACSP'){
    if(iReason == 'G000' || iReason=='G001'){
    iReturn =  'ACSP';
    }
    else{
    iReturn =  'ONHOLD';
    }
    }
    }catch (Exception e) {
    System.debug('CNT_IPTDetailParent.getStatus: ' + e.getMessage());
    // throw new customException(e.getMessage());
    }
    return iReturn;
    }*/
        @AuraEnabled
        public static String getReason(String iReason){
            String iReturn = '';
            try{
                String iLabel =  UserInfo.getLanguage()+'_'+iReason;
                List<IPT_Reason__mdt> reasons = [SELECT id, MasterLabel, REA_PCK_CodeName__c, REA_TXT_Definition__c, REA_TXT_Name__c FROM IPT_Reason__mdt WHERE MasterLabel =: iLabel];
                if(!reasons.isEmpty()){
                    iReturn = reasons[0].REA_TXT_Name__c;
                }               
            }catch(Exception e){
                System.debug('CNT_IPTDetailParent.getReason: ' + e.getMessage());
                // throw new customException(e.getMessage()); 
            }
            return iReturn;
        }
        /*
    private static String getLastUpdate(String input, String format, String timeZone){
    String output = '';
    try{
    DateTime dt =  DateTime_Utilities.getDatetime(input, 0);
    String aux = String.valueof(dt);
    // aux = aux.replace('-', '/');
    String iDay = aux.substring(8, 10);
    system.debug('>>> Day: '+ iDay);
    String iMonth = aux.substring(5, 7);
    system.debug('>>> Month: '+ iMonth);
    String iYear = aux.substring(0, 4);
    system.debug('>>> Year: '+ iYear);
    String iHour = aux.substring(11, 13);
    system.debug('>>> Hour: '+ iHour);
    String iMinutes = aux.substring(14, 16);
    system.debug('>>> Minutes: '+ iMinutes);                
    
    if(format == 'MM/dd/yyyy'){
    output = iMonth+'/'+iDay+'/'+iYear+', '+iHour+':'+iMinutes+ ' ' + timeZone;
    }
    else{
    //dd/MM/yyyy
    output = iDay+'/'+iMonth+'/'+iYear+', '+iHour+':'+iMinutes+ ' ' + timeZone;
    }
    
    }catch(Exception e){
    System.debug('CNT_IPTDetailParent.getLastUpdate: ' + e.getMessage());
    }
    return output;
    }
    
    private static String getDate(String input,  String format){
    String output = '';
    try{
    DateTime dt =  DateTime_Utilities.getDatetime(input, 0);
    String aux = String.valueof(dt);
    // aux = aux.replace('-', '/');
    String iDay = aux.substring(8, 10);
    system.debug('>>> Day: '+ iDay);
    String iMonth = aux.substring(5, 7);
    system.debug('>>> Month: '+ iMonth);
    String iYear = aux.substring(0, 4);
    system.debug('>>> Year: '+ iYear);
    
    if(format == 'MM/dd/yyyy'){
    output = iMonth+'/'+iDay+'/'+iYear;
    }
    else{
    //dd/MM/yyyy
    output = iDay+'/'+iMonth+'/'+iYear;
    }
    
    }catch(Exception e){
    System.debug('CNT_IPTDetailParent.getDate: ' + e.getMessage());
    }
    return output;
    }
    
    private static String getTime(String input, String timeZone){
    String output = '';
    try{
    DateTime dt =  DateTime_Utilities.getDatetime(input, 0);
    String aux = String.valueof(dt);
    String iHour = aux.substring(11, 13);
    system.debug('>>> Hour: '+ iHour);
    String iMinutes = aux.substring(14, 16);
    system.debug('>>> Minutes: '+ iMinutes); 
    output = iHour+':'+iMinutes+ ' ' + timeZone;
    }catch(Exception e){
    System.debug('CNT_IPTDetailParent.getTime: ' + e.getMessage());
    }
    return output;
    }
    
    @AuraEnabled
    public static CNT_IPTDetailParent parseData(String uetr){
    WRAPPER_IPTDetail paymentDetail = getIPTDetail(uetr);
    CNT_IPTDetailParent iReturn = new CNT_IPTDetailParent();
    try{
    Id userId = UserInfo.getUserId();
    String userLanguage = UserInfo.getLanguage();
    TimeZone tz = UserInfo.getTimeZone();
    String userTz = tz.getDisplayName().substring(1,10);
    User iUser = [SELECT id,User_DateFormat__c FROM User WHERE id =: userId LIMIT 1];
    
    if(iUser != null){
    statusUpdate =  getLastUpdate(paymentDetail.lastUpdateTime, iUser.User_DateFormat__c, userTz);                  
    
    if(status == 'ACSP'){
    status = getStatus(status, reason);
    }
    else{
    status = paymentDetail.transactionStatus.status; 
    }
    
    reason = '';
    if(status == 'RJCT'){
    reason  = getReason(paymentDetail.transactionStatus.reason, userLanguage);
    }
    
    if(paymentDetail.paymentEventsArray != null){
    stepList = new List<CNT_Step>();
    for(Integer i = 0; i < paymentDetail.paymentEventsArray.size(); i++){
    CNT_Step step = new CNT_Step();
    step.bank =  paymentDetail.paymentEventsArray[i].fromAgent.agentName;
    step.bic = paymentDetail.paymentEventsArray[i].fromAgent.agentCode;
    step.city = paymentDetail.paymentEventsArray[i].fromAgent.agentLocation;
    step.country = paymentDetail.paymentEventsArray[i].fromAgent.agentCountry;
    
    String dateTimeArrivalAux = paymentDetail.paymentEventsArray[i].senderAcknowledgementReceipt;
    if(String.isNotEmpty(dateTimeArrivalAux) && i != 0){
    step.arrivalDate = getDate(dateTimeArrivalAux,  iUser.User_DateFormat__c);
    step.arrivalTime = getTime(dateTimeArrivalAux, userTz); 
    }                         
    
    String dateTimeDepatureAux = paymentDetail.paymentEventsArray[i].receivedDate;
    if(String.isNotEmpty(dateTimeDepatureAux) ){
    step.departureDate = getDate(dateTimeDepatureAux,  iUser.User_DateFormat__c);
    step.departureTime = getTime(dateTimeDepatureAux, userTz);
    }
    
    if(i == 0){
    step.arrivalDate = '';
    step.arrivalTime = '';
    step.durationDate = '';
    step.durationTime = '';
    }
    
    if(String.isNotEmpty(dateTimeArrivalAux) && String.isNotEmpty(dateTimeDepatureAux)){
    //Resta
    datetime dt_one = DateTime_Utilities.getDatetime(dateTimeArrivalAux, 0);
    datetime dt_two = DateTime_Utilities.getDatetime(dateTimeDepatureAux, 0);
    //step.duration = DateTime_Utilities.getDifferenceDateTime(dt_one, dt_two);
    }
    
    
    }
    }
    
    
    }
    }catch(Exception e){
    System.debug('CNT_IPTDetailParent.parseData: ' + e.getMessage());
    throw new AuraHandledException('The following exception has occurred: ' + e.getMessage()); 
    } 
    return iReturn;
    }*/
        /*
    
    @AuraEnabled
    public static CNT_IPTDetailParent generateDummyData(){
    
    
    CNT_IPTDetailParent obj = new CNT_IPTDetailParent();
    
    
    
    valueDate = '08/11/2019';
    totalElapsedTime = '3days 2h 7min';
    charges = 'No charges';
    uetr= 'slkfjñidghñadkfjghadñjkfghañdflgha';
    originAccountName = 'Deutsche Bank AG';
    originAccountNumber = 'DE26 0110 7298 5555 8888 1589';
    originAccountBank = 'Banco Santande';
    originAccountBic = 'BSHESMMAGE';
    beneficiaryAccountName = 'Taipei Fubon Commercial Bank';
    beneficiaryAccountNumber = 'ES26 0110 7298 5555 8888 1589';
    beneficiaryAccountBank = 'Taipei Fubon Commercial Bank';
    beneficiaryAccountBic = 'BRASBRRJIBR';
    //status = 'ACCC';
    status = 'RJCT';
    reason = '';
    // statusLabel = getStatusLabel(status, reason);
    statusUpdate = '11/11/2019, 10:15 GMT+1';  
    currencyAux = 'USD';
    stepList = new List<CNT_Step>();
    
    CNT_Step s1 = new CNT_Step();
    s1.bank = 'Alex prueba';
    s1.bic = 'BSHHESMXXX';
    s1.country = 'ES';
    s1.countryName = 'Spain';
    s1.city = 'Madrid';
    s1.arrivalDate = '';
    s1.arrivalTime = '';
    s1.durationDate = '';
    s1.durationTime='';
    s1.departureDate ='08/11/2019';
    s1.departureTime ='08:07 GMT+1';
    //s1.departureDate ='';
    //s1.departureTime ='';
    s1.feeApplied = false;
    
    stepList.add(s1);
    
    CNT_Step s2 = new CNT_Step();
    s2.bank = 'Bankia';
    s2.bic = 'POALILIT';
    s2.country = 'IL';
    s2.countryName = 'Israel';
    s2.city = 'Tel Aviv';
    s2.arrivalDate = '08/11/2019';
    s2.arrivalTime = '08:07 GMT+1';
    s2.durationDate = '3days';
    s2.durationTime = '2h 7min';
    s2.departureDate ='08/11/2019';
    s2.departureTime ='08:07 GMT+1';
    //s2.departureDate ='';
    //s2.departureTime ='';
    s2.feeApplied = false;
    stepList.add(s2);
    
    CNT_Step sz = new CNT_Step();
    sz.bank = 'Bankinter';
    sz.bic = 'POALILIT';
    sz.country = 'US';
    sz.countryName = 'United States of America';
    sz.city = 'New York';
    sz.arrivalDate = '08/11/2019';
    sz.arrivalTime = '08:07 GMT+1';
    sz.durationDate = '3days';
    sz.durationTime = '2h 7min';
    //sz.departureDate ='08/11/2019';
    //sz.departureTime ='08:07 GMT+1';
    sz.departureDate ='';
    sz.departureTime ='';
    sz.feeApplied = true;
    stepList.add(sz);
    
    CNT_Step s3 = new CNT_Step();
    s3.bank = 'BBVA';
    s3.bic = 'POALILIT';
    s3.country = 'xx';
    s3.countryName = 'Israel';
    s3.city = 'Tel Aviv';
    //s3.arrivalDate = '08/11/2019';
    //s3.arrivalTime = '08:07 GMT+1';
    s3.arrivalDate = '';
    s3.arrivalTime = '';
    s3.durationDate = '3days';
    s3.durationTime = '2h 7min';
    //s3.departureDate ='08/11/2019';
    //s3.departureTime ='08:07 GMT+1';
    s3.feeApplied = false;
    s3.departureDate ='';
    s3.departureTime ='';
    stepList.add(s3);
    
    return obj;
    }*/
        
        @AuraEnabled
        public static CNT_IPTDetailParent generateObject(){
            
            
            CNT_IPTDetailParent obj = new CNT_IPTDetailParent();
            
            
            
            
            //stepList = new List<CNT_Step>();
            
            
            /*CNT_Step s3 = new CNT_Step();
    s3.bank = 'BBVA';
    s3.bic = 'POALILIT';
    s3.country = 'xx';
    s3.countryName = 'Israel';
    s3.city = 'Tel Aviv';
    //s3.arrivalDate = '08/11/2019';
    //s3.arrivalTime = '08:07 GMT+1';
    s3.arrivalDate = '';
    s3.arrivalTime = '';
    s3.durationDate = '3days';
    s3.durationTime = '2h 7min';
    //s3.departureDate ='08/11/2019';
    //s3.departureTime ='08:07 GMT+1';
    s3.feeApplied = false;
    s3.departureDate ='';
    s3.departureTime ='';
    stepList.add(s3);*/
            
            return obj;
        }
        
        
        /*------------------------------------------------------------
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Decrypts URL parameters
    History 
    <Date>          <Author>            <Change Description>
    02/12/2019      Shahad Naji     Initial version
    ------------------------------------------------------------*/     
        @AuraEnabled
        public static String decryptData(String str){
            return Global_Utilities.decryptData(str);
        }
        
        /*------------------------------------------------------------
    Author:         R. Cervino
    Company:        Deloitte
    Description:    Methos to get payments steps
    History 
    <Date>          <Author>            <Change Description>ture
    06/03/2020      R Cervino     Initial version
    ------------------------------------------------------------*/     
        @AuraEnabled
        public static WRAPPER_IPTDetail getSteps(String str, Boolean fromTracker){
            WRAPPER_IPTDetail detail = new WRAPPER_IPTDetail();
            
            CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('CNT_IPTDetailParentGetSteps');
            String finalEndPoint = configWs.CNT_Endpoint__c.replace('{str}',str);
            if (Test.isRunningTest() ) {
            String json = '  {  "cancellationStatus": {    "transactionCancellationStatus": null  },  "completionTime": null,  "initiationTime": "2020-10-14T07:38:08Z",  "lastUpdateTime": "2020-10-14T07:40:06.334Z",  "paymentEventsArray": [    {      "networkReference": "20201014BSCHESMMAXXX4667194407",      "messageNameIdentification": "299",      "fromAgent": {        "agentCode": "BSCHESMMXXX",        "agentCountry": "ES",        "agentLocation": "MADRID",        "agentName": "BANCO SANTANDER S.A."      },      "toAgent": {        "agentCode": "TRCKCHZZXXX",        "agentCountry": null,        "agentLocation": null,        "agentName": null      },      "originatorAgent": {        "agentCode": "BSCHESMMXXX",        "agentCountry": "ES",        "agentLocation": "MADRID",        "agentName": "BANCO SANTANDER S.A."      },      "senderAcknowledgementReceipt": "2020-10-14T07:39:55Z",      "receivedDate": null,      "chargeBearer": null,      "chargeAmount": [              ],      "instructedAmount": {        "amount": null,        "tcurrency": null      },      "confirmedAmount": {        "amount": 272.0,        "tcurrency": "EUR"      },      "foreignExchangeDetails": {        "sourceCurrency": null,        "targetCurrency": null,        "exchangeRate": 0.0      },      "forwardedToAgent": {        "agentCode": null,        "agentCountry": null,        "agentLocation": null,        "agentName": null      },      "lastUpdateTime": "2020-10-14T07:40:03.548Z",      "updatePayment": "20201014SCBLDEFXAXXX0801763204"    },    {      "networkReference": "20201014073953133-030000122933",      "messageNameIdentification": "199",      "fromAgent": {        "agentCode": "BSCHBRSPXXX",        "agentCountry": "BR",        "agentLocation": "SAO PAULO",        "agentName": "BANCO SANTANDER (BRASIL) S.A."      },      "toAgent": {        "agentCode": "TRCKCHZZXXX",        "agentCountry": null,        "agentLocation": null,        "agentName": null      },      "originatorAgent": {        "agentCode": "BSCHBRSPXXX",        "agentCountry": "BR",        "agentLocation": "SAO PAULO",        "agentName": "BANCO SANTANDER (BRASIL) S.A."      },      "senderAcknowledgementReceipt": "2020-10-14T07:39:53Z",      "receivedDate": null,      "chargeBearer": null,      "chargeAmount": [              ],      "instructedAmount": {        "amount": null,        "tcurrency": null      },      "confirmedAmount": {        "amount": 272.0,        "tcurrency": "EUR"      },      "foreignExchangeDetails": {        "sourceCurrency": null,        "targetCurrency": null,        "exchangeRate": 0.0      },      "forwardedToAgent": {        "agentCode": null,        "agentCountry": null,        "agentLocation": null,        "agentName": null      },      "lastUpdateTime": "2020-10-14T07:40:03.423Z",      "updatePayment": "20201014SCBLDEFXAXXX0801763201"    },    {      "networkReference": "20201014SCBLDEFXAXXX0801763204",      "messageNameIdentification": "202COV",      "fromAgent": {        "agentCode": "SCBLDEFXXXX",        "agentCountry": "DE",        "agentLocation": "FRANKFURT AM MAIN",        "agentName": "STANDARD CHARTERED BANK AG"      },      "toAgent": {        "agentCode": "BSCHESMMXXX",        "agentCountry": "ES",        "agentLocation": "MADRID",        "agentName": "BANCO SANTANDER S.A."      },      "originatorAgent": {        "agentCode": null,        "agentCountry": null,        "agentLocation": null,        "agentName": null      },      "senderAcknowledgementReceipt": "2020-10-14T07:39:19Z",      "receivedDate": "2020-10-14T07:39:50Z",      "chargeBearer": null,      "chargeAmount": [              ],      "instructedAmount": {        "amount": 297.0,        "tcurrency": "EUR"      },      "confirmedAmount": {        "amount": null,        "tcurrency": null      },      "foreignExchangeDetails": {        "sourceCurrency": null,        "targetCurrency": null,        "exchangeRate": 0.0      },      "forwardedToAgent": {        "agentCode": null,        "agentCountry": null,        "agentLocation": null,        "agentName": null      },      "lastUpdateTime": "2020-10-14T07:39:32.961Z",      "updatePayment": null    },    {      "networkReference": "20201014SCBLDEFXAXXX0801763201",      "messageNameIdentification": "103",      "fromAgent": {        "agentCode": "SCBLDEFXXXX",        "agentCountry": "DE",        "agentLocation": "FRANKFURT AM MAIN",        "agentName": "STANDARD CHARTERED BANK AG"      },      "toAgent": {        "agentCode": "BSCHBRSPXXX",        "agentCountry": "BR",        "agentLocation": "SAO PAULO",        "agentName": "BANCO SANTANDER (BRASIL) S.A."      },      "originatorAgent": {        "agentCode": "SCBLDEFXXXX",        "agentCountry": "DE",        "agentLocation": "FRANKFURT AM MAIN",        "agentName": "STANDARD CHARTERED BANK AG"      },      "senderAcknowledgementReceipt": "2020-10-14T07:39:17Z",      "receivedDate": "2020-10-14T07:39:30Z",      "chargeBearer": "SHAR",      "chargeAmount": [        {          "amount": 0.0,          "tcurrency": "EUR"        },        {          "amount": 25.0,          "tcurrency": "EUR"        }      ],      "instructedAmount": {        "amount": 297.0,        "tcurrency": "EUR"      },      "confirmedAmount": {        "amount": null,        "tcurrency": null      },      "foreignExchangeDetails": {        "sourceCurrency": null,        "targetCurrency": null,        "exchangeRate": 0.0      },      "forwardedToAgent": {        "agentCode": null,        "agentCountry": null,        "agentLocation": null,        "agentName": null      },      "lastUpdateTime": "2020-10-14T07:39:32.785Z",      "updatePayment": null    },    {      "networkReference": "20201014SCBLDEFXAXXX0801763189",      "messageNameIdentification": "103",      "fromAgent": {        "agentCode": "SCBLDEFXXXX",        "agentCountry": "DE",        "agentLocation": "FRANKFURT AM MAIN",        "agentName": "STANDARD CHARTERED BANK AG"      },      "toAgent": {        "agentCode": "SCBLDEFXXXX",        "agentCountry": "DE",        "agentLocation": "FRANKFURT AM MAIN",        "agentName": "STANDARD CHARTERED BANK AG"      },      "originatorAgent": {        "agentCode": "SCBLDEFXXXX",        "agentCountry": "DE",        "agentLocation": "FRANKFURT AM MAIN",        "agentName": "STANDARD CHARTERED BANK AG"      },      "senderAcknowledgementReceipt": "2020-10-14T07:39:00Z",      "receivedDate": "2020-10-14T07:39:13Z",      "chargeBearer": "SHAR",      "chargeAmount": [              ],      "instructedAmount": {        "amount": 297.0,        "tcurrency": "EUR"      },      "confirmedAmount": {        "amount": null,        "tcurrency": null      },      "foreignExchangeDetails": {        "sourceCurrency": null,        "targetCurrency": null,        "exchangeRate": 0.0      },      "forwardedToAgent": {        "agentCode": null,        "agentCountry": null,        "agentLocation": null,        "agentName": null      },      "lastUpdateTime": "2020-10-14T07:39:18.938Z",      "updatePayment": null    },    {      "networkReference": "20201014PASCITMMAXXX0128377723",      "messageNameIdentification": "103",      "fromAgent": {        "agentCode": "PASCITMMXXX",        "agentCountry": "IT",        "agentLocation": "SIENA",        "agentName": "BANCA MONTE DEI PASCHI DI SIENA S.P.A."      },      "toAgent": {        "agentCode": "SCBLDEFXXXX",        "agentCountry": "DE",        "agentLocation": "FRANKFURT AM MAIN",        "agentName": "STANDARD CHARTERED BANK AG"      },      "originatorAgent": {        "agentCode": "PASCITMMXXX",        "agentCountry": "IT",        "agentLocation": "SIENA",        "agentName": "BANCA MONTE DEI PASCHI DI SIENA S.P.A."      },      "senderAcknowledgementReceipt": "2020-10-14T07:38:08Z",      "receivedDate": "2020-10-14T07:38:50Z",      "chargeBearer": "SHAR",      "chargeAmount": [              ],      "instructedAmount": {        "amount": 297.0,        "tcurrency": "EUR"      },      "confirmedAmount": {        "amount": null,        "tcurrency": null      },      "foreignExchangeDetails": {        "sourceCurrency": null,        "targetCurrency": null,        "exchangeRate": 0.0      },      "forwardedToAgent": {        "agentCode": null,        "agentCountry": null,        "agentLocation": null,        "agentName": null      },      "lastUpdateTime": "2020-10-14T07:38:17.097Z",      "updatePayment": null    }  ],  "transactionStatus": {    "status": "ACSP",    "reason": "G004"  },  "creditorAgent": {    "agentCode": "BSCHBRSPXXX",    "agentCountry": "BR",    "agentLocation": "SAO PAULO",    "agentName": "BANCO SANTANDER (BRASIL) S.A."  },  "debtorAgent": {    "agentCode": "PASCITMMXXX",    "agentCountry": "IT",    "agentLocation": "SIENA",    "agentName": "BANCA MONTE DEI PASCHI DI SIENA S.P.A."  }}';
                detail =  (WRAPPER_IPTDetail) System.JSON.deserialize(json, WRAPPER_IPTDetail.class);
            } else{
                if(fromTracker == true) {
                    detail=WRAPPER_IPTDetail.parse(Global_IntegrationWrapper.launchHTTP('',finalEndPoint,configWs.CNT_HTTPMethod__c));
                } else{
                    String serializedToken = null;
                       
                    System.debug('ENDPOINT: ' + detail);
                    Auth.JWT jwt = new Auth.JWT();
                    Map<String, String> claims = new Map<String, String>();
                    jwt.setIss(System.Label.jwtIss);
                    jwt.setSub('ZZZ');
                    claims.put('local_realm', 'stssanesintranetprev1');
                    //claims.put('local_uid', 'ZZZ');
                    claims.put('sec_mode', 'platform');
                    claims.put('country', 'ESBSCHESMM');
                    jwt.setAdditionalClaims(claims);
                    jwt.setValidityLength(86400);
                    Auth.JWS signedToken = new Auth.JWS(jwt, System.Label.certificateName);
                    serializedToken = signedToken.getCompactSerialization();
                
                    Http h = new Http();
                    HttpRequest req = new HttpRequest();
                    req.setHeader('Authorization', 'Bearer '+ serializedToken);
                    req.setEndpoint(finalEndPoint);
                    req.setMethod(configWs.CNT_HTTPMethod__c);
                    req.setClientCertificateName(System.Label.certificateMutual);
                    HttpResponse res = h.send(req);

                    detail = WRAPPER_IPTDetail.parse(res.getBody());
                    System.debug(res.getBody());
                }
                 
            }
           
            if (detail.paymentEventsArray != null){
                WRAPPER_IPTDetail.getVisualSteps(detail);
                WRAPPER_IPTDetail.getLastUpdate(detail);
                WRAPPER_IPTDetail.getCountryName(detail);
            }
            //AM - 16/11/2020 - Fix UETR Pagos No Ingestados
            else{
                throw new customException('Payment was not found.');
            }
            
            return detail;
        }
        
        /*------------------------------------------------------------
    Author:         R. Cervino
    Company:        Deloitte
    Description:    Method to minus dates
    History 
    <Date>          <Author>            <Change Description>
    06/03/2020      R Cervino     Initial version
    ------------------------------------------------------------*/     
        @AuraEnabled
        public static List<Integer> diffDates(String arrival, String departure){
            DateTime arrDateTime = DateTime.ValueofGmt(arrival.replace('T', ' ')); 
            DateTime depDateTime = DateTime.ValueofGmt(departure.replace('T', ' ')); 
            
            return DateTime_Utilities.getDifferenceDateTime(arrDateTime, depDateTime);
        }
        
        /*------------------------------------------------------------
    Author:         R. Cervino
    Company:        Deloitte
    Description:    To get date in user's locale format
    History 
    <Date>          <Author>            <Change Description>
    06/03/2020      R Cervino     Initial version
    ------------------------------------------------------------*/     
        @AuraEnabled
        public static String getDateAndTime(String dateT){
            System.debug('dateT: ' + dateT);
            //return String.ValueofGmt(DateTime_Utilities.getDatetime(dateT,3));
            return String.ValueofGmt(DateTime_Utilities.stringToDateTimeStep(dateT,3));
        }
        
        
        
        /*------------------------------------------------------------
    Author:         R. Cervino
    Company:        Deloitte
    Description:    To get date in user's locale format
    History 
    <Date>          <Author>            <Change Description>
    06/03/2020      R Cervino     Initial version
    ------------------------------------------------------------*/     
        @AuraEnabled
        public static List<BIC_List__mdt> getBICList(){
            List<BIC_List__mdt> bics = [SELECT Label, Fee_format__c FROM BIC_List__mdt];
            if(bics!=null){
                return bics;
                
            }
            return null;
            
        }


            /*------------------------------------------------------------
    Author:         Adrian Muñio
    Company:        Deloitte
    Description:    To get the segment related with the user
    History 
    <Date>          <Author>            <Change Description>
    06/03/2020      Adrian Muñio        Initial version
    ------------------------------------------------------------*/     
    @AuraEnabled
    public static String getShowFeeValue(String bic){
        system.debug('CNT_IPTDetailParent.getShowFeeValue >>>>> START');

        String segmento = null;
        List<Contact> c = [SELECT Id, CONTACT_User__c, AccountId FROM Contact WHERE CONTACT_User__c =: UserInfo.getUserId() LIMIT 1];
        if(!c.isEmpty() && c[0].AccountId != null){
            List<Account> accs = [SELECT Id, ACC_PCK_Segment__c FROM Account WHERE Id =: c[0].AccountId LIMIT 1];
            if(!accs.isEmpty() && accs[0].ACC_PCK_Segment__c != null){
                 segmento = accs[0].ACC_PCK_Segment__c;
            }
        }
        
        String showFeeValue = null;
        if(segmento != null){
            system.debug('CNT_IPTDetailParent.getShowFeeValue >>>>> Segment -> ' + segmento);
            system.debug('CNT_IPTDetailParent.getShowFeeValue >>>>> BIC -> ' + bic);
            
            for(BICSegmentRelation__c csRelation :BICSegmentRelation__c.getAll().values()){
                if(csRelation.BIC__c == bic && csRelation.Segment__c == segmento){
                    system.debug('CNT_IPTDetailParent.getShowFeeValue >>>>> Fee Value -> ' + showFeeValue);
                    showFeeValue = csRelation.showFeeValue__c;
                    break;
                }
            }
        }
        system.debug('CNT_IPTDetailParent.getShowFeeValue >>>>> END');
        return showFeeValue;
    }
}