public inherited sharing class CNT_LWC_FX_TradesLandingParent {
    
    @AuraEnabled
    public static List<WRAPPER_FX_TradesData> searchFIlterTrades(String parameters){
        
        String responseAux = FX_ServiceApiTrades.searchFIlterTrades(parameters);
        String response = responseAux.replaceAll('currency', 'currency1');

        List<WRAPPER_FX_TradesData> trades = WRAPPER_FX_TradesData.parse(response);
        System.debug(trades);
        return trades;

    }

    @AuraEnabled(cacheable=true)
    public static WRAPPER_FX_Download downloadTrades(String parameters, String content){
        String response = FX_ServiceApiTrades.downloadFIlterTrades(parameters, content);
        WRAPPER_FX_Download tradeDetail = WRAPPER_FX_Download.parse(response);
        return tradeDetail;
    }

    @AuraEnabled
    public static ReturnValue downloadOTFXTrades(String fileFormat, String params){
        ReturnValue  rv = null;

        try {

            String content;
            if (fileFormat == 'CSV') {
                content = 'application/csv';
            } else if (fileFormat == 'XLS') {
                content = 'application/xls';
            }
    
            WRAPPER_FX_Download alltrades = downloadTrades(params, content);
            String file = alltrades.searchFileContent;

            Map<String, Object> value = new Map<String, Object>(); 
            Map<String, Object> output = new Map<String, Object>();
            if(String.isNotBlank(file)){
                output = provisionalDownload.downloadTradesList(file, fileFormat);
                
                System.debug('CNT_PaymentsLandingParent.downloadPayments: ' + fileFormat);
            }              
            if(output != null){
                value.put('output', output);
                System.debug('CNT_PaymentsLandingParent.downloadPayments output: ' + output);
            }                
            
            rv = new ReturnValue(true, value);
        } catch (Exception e) {
            System.debug('CNT_PaymentsLandingParent.downloadPayments: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            rv = new ReturnValue(false, null, e.getMessage());
        }
        return rv; 
        
    }

    @AuraEnabled
    public static Map<String,String> downloadTradesList(String file, String fileFormat) {
        String trades = ''; 
        system.debug('punto 2 ' + file);
        Map<String,String> output = new Map<String,String>();
        try {
            String suffix = fileFormat.toLowerCase();
            String fileName = 'Trades_list_' + Datetime.now().getTime() + '.' + suffix;
            String tradesListFile = file;
            if (String.isNotBlank(file)) {

                output.put('tradesListFile', tradesListFile);

                if (tradesListFile != '') {
                    //Generate the document
                    ContentVersion cont = new ContentVersion();
                    cont.Title = fileName;
                    cont.PathOnClient = fileName;
                    cont.VersionData = EncodingUtil.base64Decode(tradesListFile);
                    System.debug('cont.Title: ' + cont.Title);
                    System.debug('cont.PathOnClient: ' + cont.PathOnClient);
                    System.debug('cont.VersionData: ' + cont.VersionData);
                    if(Schema.sObjectType.ContentVersion.isCreateable()){
                        insert cont;
                    }
                    output.put('fileName', fileName);
                    String sQuery = 'SELECT id from ContentDocument where title = :fileName ORDER BY CreatedDate DESC LIMIT 1';
                    List <sObject> doc = Database.query(sQuery);

                    System.debug('doc[0]: ' + doc[0]);
                    if(!doc.isEmpty()){
                        output.put('documentId', doc[0].Id);
                    } else {
                        output.put('documentId', null);
                    }
                    
                }
            } else {
                throw new CustomException('Error when consulting the payment downloads server');
            }
            
        } catch (Exception e) {
            
            throw new CustomException(e.getMessage());
        }
        return output;
    }

    @AuraEnabled
    public static void removeFile(String id){
        try{
            if(id!=''){
                List<ContentDocument> doc = new List<ContentDocument>([SELECT id from ContentDocument where Id=:id LIMIT 1]);
                if(!doc.isEmpty()){
                    delete doc[0];
                }
            }

        } catch (Exception e) {throw new customException(e.getMessage());}

    }

}