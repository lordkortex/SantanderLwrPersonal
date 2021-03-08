public class provisionalBlotterMockRequests {

    @AuraEnabled(cacheable=true)
    public static String createTrade(String parameters){
        try{
            CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('CNT_TradesFX_createTrade');
            String tradeId = Global_IntegrationWrapper.launchHTTP(parameters, configWs.CNT_Endpoint__c, configWs.CNT_HTTPMethod__c);
            return tradeId;    
        }catch(Exception e){
            throw new customException(e.getMessage());
        }
    }

    /*@AuraEnabled(cacheable=true)
    public static List<WRAPPER_FX_TradeDeatil> getTradeById(String tradeId){
       // try{

            Map<String,String> headers = new Map<String,String>();

            headers.put('X-B3-TraceId','463ac35c9f6413ad48485a3953bb6124');
            headers.put('X-B3-SpanId','a2fb4a1d1a96d312');
            headers.put('X-B3-Sampled','a2fb4a1d1a96d312');
            headers.put('X-B3-ParentSpanId','05e3ac9a4f6e3b90');
            headers.put('Authorization','Bearer eyJ0eXAiOiJKV1QiLCJraWQiOiJkZXNHdHNTYWxlc2ZvcmNlSW50ZXJuZXQiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJkZXNHdHNJbnRlcm5ldCIsInN1YiI6IlNHUGd0c2Z1bjIxMTkxMSIsImV4cCI6MTYxMTc1OTk3OSwiYXVkIjoiaHR0cDovL2R1bW15LmF1ZGllbmNlIiwiaWF0IjoxNjExNzUyNzc5LCJuYmYiOjE2MTE3NTI3NzksImp0aSI6IjIwMDg1YWJmYzM0Mjc4YmI0MDUwZmUzYWVjNWM5YTk5IiwiY291bnRyeSI6IkVTQlNDSEVTTU0iLCJsb2NhbF91aWQiOiI3ODQyOGpkaWkyMyIsImxvY2FsX3JlYWxtIjoiIn0.o-8MlzMFTHcTafhFz6ktRxul-ts7pNHMnFxXSDxysEDbgto3lJj_dyDsqQkJry2VZDOLbrldYTVjFTv6pW3CtFPqmO2LlQCLW5hyluDk4FzEdcFXSKuPaP7UOtfsi5JKJz40GrX8t6SeG0jWSu2UsGyajxMfpT-BmYvw4FI-21A7p5I2Qdz-uWV4tqXYdEFKlU-GnBlMb2be_1pd1rNkyqtdY-CncmbeVGYNpjs5h7spuv2MADYrFcAHaO0ZtbvUMSk4GooOjmhWjCYpyFXDJTOP2xBilc-mQ8pN-QZCWxbEvLCNj8z4t3w7CRRdGSWeesJdcxEjroxlfSR5kWKjqA');
            headers.put('globalID','9dd2086c-09c2-405d-adc9-a1de58dd576a');
            headers.put('Global-Payment-Id','13bce845-04b2-43bf-8120-9bf9ce525eb7');
            

            CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('CNT_TradesFX_getTradeById');
            String finalEndpoint = configWs.CNT_Endpoint__c.replace('{id}',tradeId);
            String responseAux = Global_IntegrationWrapper.launchHTTP('', finalEndpoint, configWs.CNT_HTTPMethod__c, headers);
           
            String response = responseAux.replaceAll('currency1', 'currency');
            System.debug('afer response: ' + response);
            new List<WRAPPER_FX_TradeDeatil> tradesById = WRAPPER_FX_TradeDeatil.parse(response);
            return tradesById;
            //return response;

       // }catch(Exception e){
         //   throw new customException(e.getMessage());
        //}
    }*/

    @AuraEnabled(cacheable=true)
      public static List<dataField> searchFIlterTrades(String parameters){
//        public static String searchFIlterTrades(String parameters){

        //parameters = '{"field": "","operator": "","value": ""}';

        Map<String,String> headers = new Map<String,String>();

            headers.put('X-B3-TraceId','463ac35c9f6413ad48485a3953bb6124');
            headers.put('X-B3-SpanId','a2fb4a1d1a96d312');
            headers.put('X-B3-Sampled','a2fb4a1d1a96d312');
            headers.put('X-B3-ParentSpanId','05e3ac9a4f6e3b90');
            headers.put('Authorization','Bearer eyJ0eXAiOiJKV1QiLCJraWQiOiJkZXNHdHNTYWxlc2ZvcmNlSW50ZXJuZXQiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJkZXNHdHNJbnRlcm5ldCIsInN1YiI6IlNHUGd0c2Z1bjIxMTkxMSIsImV4cCI6MTYxMTc1OTk3OSwiYXVkIjoiaHR0cDovL2R1bW15LmF1ZGllbmNlIiwiaWF0IjoxNjExNzUyNzc5LCJuYmYiOjE2MTE3NTI3NzksImp0aSI6IjIwMDg1YWJmYzM0Mjc4YmI0MDUwZmUzYWVjNWM5YTk5IiwiY291bnRyeSI6IkVTQlNDSEVTTU0iLCJsb2NhbF91aWQiOiI3ODQyOGpkaWkyMyIsImxvY2FsX3JlYWxtIjoiIn0.o-8MlzMFTHcTafhFz6ktRxul-ts7pNHMnFxXSDxysEDbgto3lJj_dyDsqQkJry2VZDOLbrldYTVjFTv6pW3CtFPqmO2LlQCLW5hyluDk4FzEdcFXSKuPaP7UOtfsi5JKJz40GrX8t6SeG0jWSu2UsGyajxMfpT-BmYvw4FI-21A7p5I2Qdz-uWV4tqXYdEFKlU-GnBlMb2be_1pd1rNkyqtdY-CncmbeVGYNpjs5h7spuv2MADYrFcAHaO0ZtbvUMSk4GooOjmhWjCYpyFXDJTOP2xBilc-mQ8pN-QZCWxbEvLCNj8z4t3w7CRRdGSWeesJdcxEjroxlfSR5kWKjqA');
            headers.put('globalID','9dd2086c-09c2-405d-adc9-a1de58dd576a');
            headers.put('Global-Payment-Id','13bce845-04b2-43bf-8120-9bf9ce525eb7');
            

        //try{
            CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('CNT_TradesFX_search_filterTrades');
            String responseAux = Global_IntegrationWrapper.launchHTTP(parameters, configWs.CNT_Endpoint__c, configWs.CNT_HTTPMethod__c, headers);
            String response = responseAux.replaceAll('currency1', 'currency');
            //System.debug('afer response: ' + response);
            return new List<dataField>(parse(response));
           // return response;
        //}catch(Exception e){
          //  throw new customException(e.getMessage());
        //}
    }

    @AuraEnabled(cacheable=true)
    public static WRAPPER_FX_Download downloadFIlterTrades(String parameters, String content){
//        public static String searchFIlterTrades(String parameters){

      //parameters = '{"field": "","operator": "","value": ""}';

      Map<String,String> headers = new Map<String,String>();

          headers.put('X-B3-TraceId','463ac35c9f6413ad48485a3953bb6124');
          headers.put('X-B3-SpanId','a2fb4a1d1a96d312');
          headers.put('X-B3-Sampled','a2fb4a1d1a96d312');
          headers.put('X-B3-ParentSpanId','05e3ac9a4f6e3b90');
          headers.put('Authorization','Bearer eyJ0eXAiOiJKV1QiLCJraWQiOiJkZXNHdHNTYWxlc2ZvcmNlSW50ZXJuZXQiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJkZXNHdHNJbnRlcm5ldCIsInN1YiI6IlNHUGd0c2Z1bjIxMTkxMSIsImV4cCI6MTYxMTc1OTk3OSwiYXVkIjoiaHR0cDovL2R1bW15LmF1ZGllbmNlIiwiaWF0IjoxNjExNzUyNzc5LCJuYmYiOjE2MTE3NTI3NzksImp0aSI6IjIwMDg1YWJmYzM0Mjc4YmI0MDUwZmUzYWVjNWM5YTk5IiwiY291bnRyeSI6IkVTQlNDSEVTTU0iLCJsb2NhbF91aWQiOiI3ODQyOGpkaWkyMyIsImxvY2FsX3JlYWxtIjoiIn0.o-8MlzMFTHcTafhFz6ktRxul-ts7pNHMnFxXSDxysEDbgto3lJj_dyDsqQkJry2VZDOLbrldYTVjFTv6pW3CtFPqmO2LlQCLW5hyluDk4FzEdcFXSKuPaP7UOtfsi5JKJz40GrX8t6SeG0jWSu2UsGyajxMfpT-BmYvw4FI-21A7p5I2Qdz-uWV4tqXYdEFKlU-GnBlMb2be_1pd1rNkyqtdY-CncmbeVGYNpjs5h7spuv2MADYrFcAHaO0ZtbvUMSk4GooOjmhWjCYpyFXDJTOP2xBilc-mQ8pN-QZCWxbEvLCNj8z4t3w7CRRdGSWeesJdcxEjroxlfSR5kWKjqA');
          headers.put('globalID','9dd2086c-09c2-405d-adc9-a1de58dd576a');
          headers.put('Global-Payment-Id','13bce845-04b2-43bf-8120-9bf9ce525eb7');
          headers.put('Accept', content);
          

      //try{
          CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('CNT_TradesFX_search_filterTrades');
          String response = Global_IntegrationWrapper.launchHTTP(parameters, configWs.CNT_Endpoint__c, configWs.CNT_HTTPMethod__c, headers);
          WRAPPER_FX_Download tradeDetail = WRAPPER_FX_Download.parse(response);
          return tradeDetail;
         // return response;
      //}catch(Exception e){
        //  throw new customException(e.getMessage());
      //}
    }
    @AuraEnabled(cacheable=true)
    public static void updateTradeById(String tradeId, List<String> parameters){
        try{
            CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('CNT_TradesFX_updateTradeById');
            String finalEndpoint = configWs.CNT_Endpoint__c.replace('{id}',tradeId);
            String response = Global_IntegrationWrapper.launchHTTP('', finalEndpoint, configWs.CNT_HTTPMethod__c);
        }catch(Exception e){
            throw new customException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<dataField> parse (String jsonInput){

        List<dataField> listaDatos = new LIst<dataField>();
        JSONParser parser = JSON.createParser(jsonInput);

        while(parser.nextToken() != JSONToken.END_ARRAY) { // we started with an array of objects

            listaDatos.add(buildOBJ(parser));
        }
        System.debug(listaDatos);

        return listaDatos;
    }


    @AuraEnabled(cacheable=true)
    public static dataField buildOBJ (JSONParser parser){

        dataField fieldInstance;

        if(parser.getCurrentToken() == JSONToken.START_OBJECT){
            
            fieldInstance = new dataField();

            while(parser.nextToken() != JSONToken.END_OBJECT){ 

                dataField fieldChild = buildField(parser);
                fieldInstance.childs.add(fieldChild);
            }
        }else if(parser.getCurrentToken() == JSONToken.FIELD_NAME){

            fieldInstance = buildField(parser);  
        }
        return fieldInstance;
    }

    public static dataField buildField (JSONParser parser){
        dataField fieldInstance = new dataField();
        String label = parser.getText();
        parser.nextToken();
        String value = parser.getText();
        if(parser.getCurrentToken() == JSONToken.START_OBJECT){
            fieldInstance = buildOBJ(parser);
        }else{
            fieldInstance.value = value;
        }
        fieldInstance.label = label;
        return fieldInstance;
    }


public class dataField {

    @AuraEnabled public String label;
    @AuraEnabled public String value;
    @AuraEnabled public String type;
    @AuraEnabled public List<dataField> childs = new List<dataField>();
}

}