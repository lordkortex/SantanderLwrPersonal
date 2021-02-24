public class CNT_DownloadBalanceMovementsController {

    @AuraEnabled public CNT_AccountsParent accountsList;

    private String output;
    private String input;

    public String getOutput () {
        return this.output;
    }

    public CNT_DownloadBalanceMovementsController ( String input) {
        this.input=input;
    }

    public class FileIncome {
        public String content;
        public String filename;
    }

    @AuraEnabled (cacheable=true)
    public static CNT_GlobalPositionController retrieveInitialData(String userId)
    {
        return CNT_GlobalPositionController.retrieveData(true, userId);
    }

    @AuraEnabled
    public static String getTransactions(String fileDate, List<String> accountCodeList, String dateFrom, String dateTo){
        try {

            Map<Integer, String> response = new Map<Integer, String>();
            String newCodeList = String.join(accountCodeList, '.');
            
            if (fileDate != 'lastStatement'){
                /*Date oldDateTo = Date.valueOf(dateTo);
                Date plusOne = oldDateTo.addDays(1);
                String newDateTo = String.valueOf(plusOne);*/

                dateFrom += 'T00:00:00.000Z';
                dateTo += 'T00:00:00.000Z';
                
                CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('CNT_DownloadsTransactions');
                String finalEndPoint = configWs.CNT_Endpoint__c.replace('{accountCodeList}', newCodeList).replace('{dateFrom}', dateFrom).replace('{dateTo}', dateTo);
                response = CNT_DownloadBalanceMovementsController.launchHttp('',finalEndPoint,configWs.CNT_HTTPMethod__c);
            } else {
                CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('CNT_DownloadsTransactionsLast');
                String finalEndPoint = configWs.CNT_Endpoint__c.replace('{accountCodeList}', newCodeList);
                response = CNT_DownloadBalanceMovementsController.launchHttp('',finalEndPoint,configWs.CNT_HTTPMethod__c);
            }
           
            if (response.keySet().contains(204) || response.keySet().contains(200)){
                String output = '';

                if (response.keySet().contains(200)) {
                    FileIncome deserializedInvoices =(FileIncome)JSON.deserialize(response.get(200), FileIncome.class);

                    String jsonStr = deserializedInvoices.content;

                    //Generate the document
                    ContentVersion cont = new ContentVersion();
                    //cont.Title = deserializedInvoices.filename.substring(0,deserializedInvoices.filename.length()-3)+'pdf';
                    cont.Title = deserializedInvoices.filename;
                    cont.PathOnClient = 'file_' + Datetime.now().getTime() + '.xls';
                    cont.VersionData = EncodingUtil.base64Decode(jsonStr);
                    String title='';
                    if(Schema.sObjectType.ContentVersion.isCreateable()){
                        insert cont;
                        title=cont.title;
                    }
                    List<ContentDocument> doc = new List<ContentDocument>([SELECT id from ContentDocument where title =: title ORDER BY createdDate ASC LIMIT 1]);

                    if(!doc.isEmpty()){
                        output = doc[0].Id;
                    }else{
                        output = 'null';
                    }
                } else {
                    output ='204';
                }

                return output;
            } else {
                throw new customException(Label.getDataError);
            }
        } catch (Exception e) {
            System.debug('CNT_DownloadBalanceMovementsController.getTransactions: ' + e.getMessage());
        }
        return null;
    }

    @AuraEnabled
    public static String getExtracts(String fileDate, List<String> accountCodeList, String dateFrom, String dateTo, String indGroup){
        try {

            Map<Integer, String> response = new Map<Integer, String>();
            String newCodeList = String.join(accountCodeList, '.');

            if(fileDate == 'statementFor') {
                indGroup = '';
            }
            
            if (fileDate != 'lastStatement'){

                dateFrom += 'T00:00:00.000Z';
                dateTo += 'T00:00:00.000Z';
                
                CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('CNT_DownloadsExtract');
                String finalEndPoint = configWs.CNT_Endpoint__c.replace('{accountCodeList}', newCodeList).replace('{dateFrom}', dateFrom).replace('{dateTo}', dateTo).replace('{indGroup}', indGroup);
                response = CNT_DownloadBalanceMovementsController.launchHttp('',finalEndPoint,configWs.CNT_HTTPMethod__c);
            } else {
                CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('CNT_DownloadsExtractLast');
                String finalEndPoint = configWs.CNT_Endpoint__c.replace('{accountCodeList}',newCodeList);
                response = CNT_DownloadBalanceMovementsController.launchHttp('',finalEndPoint,configWs.CNT_HTTPMethod__c);
            }
           
            if (response.keySet().contains(204) || response.keySet().contains(200)){
                String output = '';
                
                if (response.keySet().contains(200)) {
                    FileIncome deserializedInvoices =(FileIncome)JSON.deserialize(response.get(200), FileIncome.class);

                    String jsonStr = deserializedInvoices.content;

                    //Generate the document
                    ContentVersion cont = new ContentVersion();
                    //cont.Title = deserializedInvoices.filename.substring(0,deserializedInvoices.filename.length()-3)+'pdf';
                    cont.Title = deserializedInvoices.filename;
                    cont.PathOnClient = 'file_' + Datetime.now().getTime();
                    cont.VersionData = EncodingUtil.base64Decode(jsonStr);
                    String title='';
                    if(Schema.sObjectType.ContentVersion.isCreateable()){
                        insert cont;
                        title=cont.title;
                    }
                    List<ContentDocument> doc = new List<ContentDocument>([SELECT id from ContentDocument where title =: title ORDER BY createdDate ASC LIMIT 1]);

                    if(!doc.isEmpty()){
                        output = doc[0].Id;
                    }else{
                        output = 'null';
                    }
                } else {
                    
                    output = '204';
                }

                return output;

            } else {
                throw new customException(Label.getDataError);
            }
        } catch (Exception e) {
            System.debug('CNT_DownloadBalanceMovementsController.getExtracts: ' + e.getMessage());
        }
        return null;
    }

    @AuraEnabled
    public static String getBalances(String fileDate, List<String> accountCodeList, String dateFrom, String dateTo, String fileType){
        try {

            Map<Integer, String> response = new Map<Integer, String>();
            String newCodeList = String.join(accountCodeList, '.');
            
            if (fileDate != 'lastStatement'){

                dateFrom += 'T00:00:00.000Z';
                dateTo += 'T00:00:00.000Z';
                
                CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('CNT_DownloadsBalanceDates');
                String finalEndPoint = configWs.CNT_Endpoint__c.replace('{accountCodeList}', newCodeList).replace('{dateFrom}', dateFrom).replace('{dateTo}', dateTo).replace('{fileType}', fileType);
                response = CNT_DownloadBalanceMovementsController.launchHttp('',finalEndPoint,configWs.CNT_HTTPMethod__c);
            } else {
                CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('CNT_DownloadsBalances');
                String finalEndPoint = configWs.CNT_Endpoint__c.replace('{accountCodeList}', newCodeList).replace('{fileType}', fileType);
                response = CNT_DownloadBalanceMovementsController.launchHttp('',finalEndPoint,configWs.CNT_HTTPMethod__c);
            }
           
            if (response.keySet().contains(204) || response.keySet().contains(200)){
                String output = '';
                
                if (response.keySet().contains(200)) {
                    FileIncome deserializedInvoices =(FileIncome)JSON.deserialize(response.get(200), FileIncome.class);

                    String jsonStr = deserializedInvoices.content;

                    //Generate the document
                    ContentVersion cont = new ContentVersion();
                    //cont.Title = deserializedInvoices.filename.substring(0,deserializedInvoices.filename.length()-3)+'pdf';
                    cont.Title = deserializedInvoices.filename;
                    if(fileType == 'xls') {
                        cont.PathOnClient = 'file_' + Datetime.now().getTime() + '.xls';
                    } else {
                        cont.PathOnClient = 'file_' + Datetime.now().getTime() + '.pdf';
                    }
                    cont.VersionData = EncodingUtil.base64Decode(jsonStr);
                    String title='';
                    if(Schema.sObjectType.ContentVersion.isCreateable()){
                        insert cont;
                        title=cont.title;
                    }
                    List<ContentDocument> doc = new List<ContentDocument>([SELECT id from ContentDocument where title =: title ORDER BY createdDate ASC LIMIT 1]);

                    if(!doc.isEmpty()){
                        output = doc[0].Id;
                    }else{
                        output = 'null';
                    }
                } else {
                    
                    output = '204';
                }
                
                return output;
                
            } else {
                
                throw new customException(Label.getDataError);
            }
        } catch (Exception e) {
            System.debug('CNT_DownloadBalanceMovementsController.getBalances: ' + e.getMessage());
        }
        return null;
    }

    @AuraEnabled
    public static String downloadFich (String fileDate, List<AccountList> accounts, String dateFrom, String dateTo, String extractType)
    {
        String output = '';

        try {
            Map<Integer, String> response = new Map<Integer, String>();

            Wrapper_PostDownload postDownload = new Wrapper_PostDownload();
            postDownload.accounts = accounts;
            postDownload.productId = 'FIND';
            postDownload.extractType = extractType;

            if (fileDate != 'lastStatement'){

                dateFrom += 'T00:00:00.000Z';
                dateTo += 'T00:00:00.000Z';
                
                postDownload.dateFrom = dateFrom;
                postDownload.dateTo = dateTo;
                CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('CNT_DownloadsFichPost');
                response = CNT_DownloadBalanceMovementsController.launchHttp(JSON.serialize(postDownload), configWs.CNT_Endpoint__c, configWs.CNT_HTTPMethod__c);
                System.debug('>>>>>>>' + response);
            } else {
                CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('CNT_DownloadsFichPost');
                response = CNT_DownloadBalanceMovementsController.launchHttp(JSON.serialize(postDownload), configWs.CNT_Endpoint__c, configWs.CNT_HTTPMethod__c);
            }            

            if (response.keySet().contains(204) || response.keySet().contains(200)){

                if (response.keySet().contains(200)) {
                    FileIncome deserializedInvoices =(FileIncome)JSON.deserialize(response.get(200), FileIncome.class);

                    String jsonStr = deserializedInvoices.content;

                    //Generate the document
                    ContentVersion cont = new ContentVersion();
                    //cont.Title = deserializedInvoices.filename.substring(0,deserializedInvoices.filename.length()-3)+'pdf';
                    cont.Title = deserializedInvoices.filename;
                    cont.PathOnClient = 'file_' + Datetime.now().getTime();
                    cont.VersionData = EncodingUtil.base64Decode(jsonStr);
                    String title='';
                    if(Schema.sObjectType.ContentVersion.isCreateable()){
                        insert cont;
                        title=cont.title;
                    }
                    List<ContentDocument> doc = new List<ContentDocument>([SELECT id from ContentDocument where title =: title ORDER BY createdDate ASC LIMIT 1]);

                    if(!doc.isEmpty()){
                        output = doc[0].Id;
                    }else{
                        output = '';
                    }
                } else {
                    output = '204';
                }

                return output;
            } else {

                return output;
                //throw new customException(Label.getDataError);
            }
        } catch (Exception e) {
            System.debug('CNT_DownloadBalanceMovementsController.getBalances: ' + e.getMessage());
        }
        
        return output;
    }

    @AuraEnabled 
    public static void removeFile (String id){
        try{
            CNT_SwiftPaymentTableRow.removeMT103(id);
        } catch(Exception e ){ throw new AuraHandledException('The following exception has occurred: ' + e.getMessage());}
    }

    public static Map<Integer, String> launchHTTP (String jsonParametros, String urlEndPoint, String method) {
        Map<Integer, String> respuesta = new Map<Integer, String>();
        try {
            System.debug(jsonParametros);
            System.debug(urlEndPoint);
            System.debug(method);
            HttpCalloutMock mock = null;
            
            Http h = new Http();
            HttpRequest req = new HttpRequest();
            system.debug(urlEndPoint);
            req.setEndpoint(urlEndPoint);
            req.setMethod(method);
            req.setClientCertificateName(System.Label.certificateMutual);

            req.setTimeout(25000);
            
            Id userLog = UserInfo.getUserId();
            String cacheToken;
            list<User> listUser = new list<User>();
            listUser = [SELECT USER_TXT_GlobalId__c,USER_CHK_CashNexus__c from USER Where Id=:userLog];
            
            if (!Cache.Session.contains('jwt')) {
                
                
                
                if (listUser != null){
                    Map<String,String> mapGlobalIdToJwtToken = new Map<String,String>();
                    //System.debug('listUser[0].USER_TXT_GlobalId__c ' + listUser[0].USER_TXT_GlobalId__c);
                    if(Cache.Org.contains('mapGlobalIdToJwtToken')) {
                        mapGlobalIdToJwtToken = (Map<String,String>)Cache.Org.get('mapGlobalIdToJwtToken');
                        System.debug('mapGlobalIdToJwtToken= ' + mapGlobalIdToJwtToken );
                        if (mapGlobalIdToJwtToken.get(listUser[0].USER_TXT_GlobalId__c) != null){
                            //System.debug('Resultado de la cache ' + mapGlobalIdToJwtToken.get(listUser[0].USER_TXT_GlobalId__c)); 
                            Cache.Session.put('jwt', mapGlobalIdToJwtToken.get(listUser[0].USER_TXT_GlobalId__c));
                            cacheToken=mapGlobalIdToJwtToken.get(listUser[0].USER_TXT_GlobalId__c);
                            mapGlobalIdToJwtToken.remove(listUser[0].USER_TXT_GlobalId__c);
                            Cache.Org.put('mapGlobalIdToJwtToken', mapGlobalIdToJwtToken);
                            
                        }
                    }
                }
            }else{
                cacheToken=(String)Cache.Session.get('jwt');
            }
            Auth.JWT jwt = new Auth.JWT();
            jwt.setIss(System.Label.jwtIss); //'desGtsInternet'
            String subJWT = '';
            if (listUser[0].USER_TXT_GlobalId__c != null){
                subJWT = listUser[0].USER_TXT_GlobalId__c;
            }else{
             subJWT ='ZZZ' ;
            }
            jwt.setSub(subJWT);
            //jwt.setSub('28f34477-9c11-4b9a-a9ca-9f77733b7406');
            //jwt.setSub('SGPjmnexu701955');  
            
            //jwt.setAud('http://dummy.audience');
            Map<String,String> claims = new Map<String,String>();
            if (listUser[0].USER_CHK_CashNexus__c ){
             claims.put('country','GTSNEXUSBIC');
             claims.put('local_uid', subJWT);
            }else{
             claims.put('country','ESBSCHESMM');
             claims.put('local_uid', '78428jdii23');
            }

            //claims.put('local_uid', 'SGPjmnexu701955');
            claims.put('local_realm', '');
            jwt.setAdditionalClaims(claims);

            jwt.setValidityLength(86400);
            Auth.JWS signedToken = new Auth.JWS(jwt,System.Label.certificateName); //'desGtsSalesforceInternet'
            String serializedToken;
            if (cacheToken != null)
             serializedToken=cacheToken;
            else serializedToken= signedToken.getCompactSerialization();
             
            //System.debug('TOKEN');
            System.debug(serializedToken);

            req.setHeader('Authorization', 'Bearer '+serializedToken);
        
        Double d = math.random();
        String randomValue=String.valueOf(d);
        randomValue=randomValue.right(2);
        String X_B3_sampled = returnRandomSample(Integer.valueOf(randomValue));
        String X_B3_spanId = returnRandomSpan();
        String X_B3_traceId = returnRandomSpan();
        
        req.setHeader('X-B3-sampled', X_B3_sampled);
        req.setHeader('X-B3-spanId', X_B3_spanId);
        req.setHeader('X-B3-traceId', X_B3_traceId);
        req.setHeader('globalId', subJWT);
            
            if(method.equals('POST') || method.equals('PUT')){
                //req.setHeader('Authorization', 'OAuth ' + UserInfo.getSessionId());
                req.setHeader('Content-Type', 'application/json');
                req.setBody(jsonParametros);
            }
            
            if (Test.isRunningTest() ) {
                respuesta.put(0, '');
            } else {
                h = new Http();
                HttpResponse res = h.send(req);
                System.debug(res);
                System.debug(String.valueOf(res.getBody()));
                
                respuesta.put(res.getStatusCode(), String.valueOf(res.getBody()));
                System.debug(respuesta);

            }

        } catch (Exception e) {throw new CustomException('Error durante la ejecución del servicio: ' + e.getMessage());}

        return respuesta;
    }

    public static String returnRandomSpan(){
        String hashString = '1000' + String.valueOf(Datetime.now().formatGMT('yyyy-MM-dd HH:mm:ss.SSS'));
        Blob hash = Crypto.generateDigest('MD5', Blob.valueOf(hashString));
        String hexDigest = EncodingUtil.convertToHex(hash);
        return hexDigest.right(16);
    }
    
    public static String returnRandomSample(Integer probability){
        Double d = math.random();
        String randomValue=String.valueOf(d);
        randomValue=randomValue.right(2);
        if (Integer.valueOf(randomValue) < probability)
            return '0';
        else return '1';
    }

    public class Wrapper_PostDownload
    {
        @AuraEnabled public List<AccountList> accounts {get;set;}
        @AuraEnabled public String dateFrom {get;set;}
        @AuraEnabled public String dateTo {get;set;}
        @AuraEnabled public String productId {get;set;}
        @AuraEnabled public String extractType {get;set;}
        
        public Wrapper_PostDownload()
        {
        }
    }

    public class accountWrapper {
        @AuraEnabled public String accountId {get;set;}
        @AuraEnabled public String corporateCode {get;set;}
        @AuraEnabled public String corporateName {get;set;}
    }

    public class AccountList {
        @AuraEnabled public accountWrapper account {get;set;}
    }

    public class Wrapper_GetDownload
    {
        @AuraEnabled public String accountCodeList;
        @AuraEnabled public String dateFrom;
        @AuraEnabled public String dateTo;
        
        public Wrapper_GetDownload()
        {
        }
    }

    public class Wrapper_GetBalances
    {
        @AuraEnabled public String accountCodeList;
        @AuraEnabled public String dateFrom;
        @AuraEnabled public String dateTo;
        @AuraEnabled public String fileType;
        
        public Wrapper_GetBalances()
        {
        }
    }

}