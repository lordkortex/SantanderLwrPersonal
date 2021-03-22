public inherited sharing class FX_ServiceApiTrades {
    

    @AuraEnabled(cacheable=true)
    public static String downloadFIlterTrades(String parameters, String content){

      Map<String,String> headers = new Map<String,String>();

          headers.put('X-B3-TraceId','463ac35c9f6413ad48485a3953bb6124');
          headers.put('X-B3-SpanId','a2fb4a1d1a96d312');
          headers.put('X-B3-Sampled','a2fb4a1d1a96d312');
          headers.put('X-B3-ParentSpanId','05e3ac9a4f6e3b90');
          headers.put('Authorization','Bearer eyJ0eXAiOiJKV1QiLCJraWQiOiJkZXNHdHNTYWxlc2ZvcmNlSW50ZXJuZXQiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJkZXNHdHNJbnRlcm5ldCIsInN1YiI6IjViMDVkOTYyLWEzZWQtNGVlNi1hZjY1LTRkNzM4YjU2MDQ0NiIsImV4cCI6MTYxNTM3NzY3MSwiaWF0IjoxNjE1MzcwNDcxLCJuYmYiOjE2MTUzNzA0NzEsImp0aSI6IjY5M2FkMmE0ZWEzZWVkZDlhMDViNzg5N2E3OTU4NWI4IiwiY291bnRyeSI6IkVTQlNDSEVTTU0iLCJsb2NhbF91aWQiOiI1YjA1ZDk2Mi1hM2VkLTRlZTYtYWY2NS00ZDczOGI1NjA0NDYiLCJsb2NhbF9yZWFsbSI6IiJ9.Uj3x41xurKxUoDdEhNJ-pvGl2U8O4GH-eLhkufODumlpVWrC4ZhG-ov2Ax5ciQIS_Nmf3vFYk_gkeuIWK3DZq6zo0MqYpqmgCXuKOZvA9bZ0cLs9ZBJFtHnh-xFs_-jyE5WuJjSHh08e7tbTr-F5W4mWPV2EFRtMjExzC4CoONRZzT9_oQbezq3IINGsksqGjJMQA3uvoPCo6-EzOx-sl5LQmwRgD_1gipVPyZZGZql6IO_ZX_lDLiGS1Ll0uwApoQBo__eQIA-o6bmsxqv-ki7EnPSyx4hS18FHL750SqrtO2ZpBM9xxAxlyJc6Ur48P3PPEJ84C8f2a-gXZpgpsA');
          headers.put('globalID','9dd2086c-09c2-405d-adc9-a1de58dd576a');
          headers.put('Global-Payment-Id','13bce845-04b2-43bf-8120-9bf9ce525eb7');
          headers.put('Accept', content);
          
          CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('CNT_TradesFX_search_filterTrades');
          
          String response = Global_IntegrationWrapper.launchHTTP(parameters,  configWs.CNT_Endpoint__c , configWs.CNT_HTTPMethod__c, headers);      
          return response;
    }

    @AuraEnabled
      public static String searchFIlterTrades(String parameters){

        Map<String,String> headers = new Map<String,String>();

            headers.put('X-B3-TraceId','463ac35c9f6413ad48485a3953bb6124');
            headers.put('X-B3-SpanId','a2fb4a1d1a96d312');
            headers.put('X-B3-Sampled','a2fb4a1d1a96d312');
            headers.put('X-B3-ParentSpanId','05e3ac9a4f6e3b90');
            headers.put('columns','true');
            //headers.put('Authorization','Bearer eyJ0eXAiOiJKV1QiLCJraWQiOiJkZXNHdHNTYWxlc2ZvcmNlSW50ZXJuZXQiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJkZXNHdHNJbnRlcm5ldCIsInN1YiI6IjViMDVkOTYyLWEzZWQtNGVlNi1hZjY1LTRkNzM4YjU2MDQ0NiIsImV4cCI6MTYxNDg2NTUzMywiaWF0IjoxNjE0ODU4MzMzLCJuYmYiOjE2MTQ4NTgzMzMsImp0aSI6IjJhODhjYWE4ZGNjYjc0YWE2MzI0MTc4Mjc4NWU1NWUzIiwiY291bnRyeSI6IkVTQlNDSEVTTU0iLCJsb2NhbF91aWQiOiI1YjA1ZDk2Mi1hM2VkLTRlZTYtYWY2NS00ZDczOGI1NjA0NDYiLCJsb2NhbF9yZWFsbSI6IiJ9.iS7_EpT_XADt_QKne4W7oDPOXWS6Tgdr__WH_tITWbOU34WpA3h70dQ5J0btnF8CgB_MOCeIp9WGx82m25b6YfiG7pqRQ364mqTMpIjxIG1FAIuM0D7ENEDawlbz1n7Et1QoQxbceprAqowd_IVrhrPLczIgp2AVZns-Z_hb1ze4KQ3PGtbURz21Ie1A2wqS-Tr-KW9KLuDVPlEMgE8eFYFSLvF0ymGT93e4H9Wf3YzaMLBbGfki3rnAoIMc4_dIqZlQAVEGbg66Pc2a77uZeeb4jo_Gx0EOJ2iLbvPg_vgEbkZ1vD37QXdp7DkLwM2g1SwxtMAS1HDagi1qQ9sTzw');
            /*CERT */ //headers.put('Authorization','Bearer eyJ0eXAiOiJKV1QiLCJraWQiOiJkZXNHdHNTYWxlc2ZvcmNlSW50ZXJuZXQiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJkZXNHdHNJbnRlcm5ldCIsInN1YiI6IjViMDVkOTYyLWEzZWQtNGVlNi1hZjY1LTRkNzM4YjU2MDQ0NiIsImV4cCI6MTYxNTM3NzY3MSwiaWF0IjoxNjE1MzcwNDcxLCJuYmYiOjE2MTUzNzA0NzEsImp0aSI6IjY5M2FkMmE0ZWEzZWVkZDlhMDViNzg5N2E3OTU4NWI4IiwiY291bnRyeSI6IkVTQlNDSEVTTU0iLCJsb2NhbF91aWQiOiI1YjA1ZDk2Mi1hM2VkLTRlZTYtYWY2NS00ZDczOGI1NjA0NDYiLCJsb2NhbF9yZWFsbSI6IiJ9.Uj3x41xurKxUoDdEhNJ-pvGl2U8O4GH-eLhkufODumlpVWrC4ZhG-ov2Ax5ciQIS_Nmf3vFYk_gkeuIWK3DZq6zo0MqYpqmgCXuKOZvA9bZ0cLs9ZBJFtHnh-xFs_-jyE5WuJjSHh08e7tbTr-F5W4mWPV2EFRtMjExzC4CoONRZzT9_oQbezq3IINGsksqGjJMQA3uvoPCo6-EzOx-sl5LQmwRgD_1gipVPyZZGZql6IO_ZX_lDLiGS1Ll0uwApoQBo__eQIA-o6bmsxqv-ki7EnPSyx4hS18FHL750SqrtO2ZpBM9xxAxlyJc6Ur48P3PPEJ84C8f2a-gXZpgpsA');
            headers.put('globalID','9dd2086c-09c2-405d-adc9-a1de58dd576a');
            headers.put('Global-Payment-Id','13bce845-04b2-43bf-8120-9bf9ce525eb7');

            CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('CNT_TradesFX_search_filterTrades');
            String endpoint = configWs.CNT_Endpoint__c;
            String response = Global_IntegrationWrapper.launchHTTP(parameters,endpoint, configWs.CNT_HTTPMethod__c, headers);
            return response;
            //WRAPPER_FX_TradesData is his wrapper class
    }

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

}