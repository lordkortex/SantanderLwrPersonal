public inherited sharing class FX_ServiceApiTrades {
    

    @AuraEnabled(cacheable=true)
    public static String downloadFIlterTrades(String parameters, String content){

      Map<String,String> headers = new Map<String,String>();

          headers.put('X-B3-TraceId','463ac35c9f6413ad48485a3953bb6124');
          headers.put('X-B3-SpanId','a2fb4a1d1a96d312');
          headers.put('X-B3-Sampled','a2fb4a1d1a96d312');
          headers.put('X-B3-ParentSpanId','05e3ac9a4f6e3b90');
          headers.put('Authorization','Bearer eyJ0eXAiOiJKV1QiLCJraWQiOiJkZXNHdHNTYWxlc2ZvcmNlSW50ZXJuZXQiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJkZXNHdHNJbnRlcm5ldCIsInN1YiI6IlNHUGd0c2Z1bjIxMTkxMSIsImV4cCI6MTYxMTc1OTk3OSwiYXVkIjoiaHR0cDovL2R1bW15LmF1ZGllbmNlIiwiaWF0IjoxNjExNzUyNzc5LCJuYmYiOjE2MTE3NTI3NzksImp0aSI6IjIwMDg1YWJmYzM0Mjc4YmI0MDUwZmUzYWVjNWM5YTk5IiwiY291bnRyeSI6IkVTQlNDSEVTTU0iLCJsb2NhbF91aWQiOiI3ODQyOGpkaWkyMyIsImxvY2FsX3JlYWxtIjoiIn0.o-8MlzMFTHcTafhFz6ktRxul-ts7pNHMnFxXSDxysEDbgto3lJj_dyDsqQkJry2VZDOLbrldYTVjFTv6pW3CtFPqmO2LlQCLW5hyluDk4FzEdcFXSKuPaP7UOtfsi5JKJz40GrX8t6SeG0jWSu2UsGyajxMfpT-BmYvw4FI-21A7p5I2Qdz-uWV4tqXYdEFKlU-GnBlMb2be_1pd1rNkyqtdY-CncmbeVGYNpjs5h7spuv2MADYrFcAHaO0ZtbvUMSk4GooOjmhWjCYpyFXDJTOP2xBilc-mQ8pN-QZCWxbEvLCNj8z4t3w7CRRdGSWeesJdcxEjroxlfSR5kWKjqA');
          headers.put('globalID','9dd2086c-09c2-405d-adc9-a1de58dd576a');
          headers.put('Global-Payment-Id','13bce845-04b2-43bf-8120-9bf9ce525eb7');
          headers.put('Accept', content);
          
          CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('CNT_TradesFX_search_filterTrades');
          String response = Global_IntegrationWrapper.launchHTTP(parameters, configWs.CNT_Endpoint__c, configWs.CNT_HTTPMethod__c, headers);      
          return response;
    }

    @AuraEnabled
      public static String searchFIlterTrades(String parameters){

        Map<String,String> headers = new Map<String,String>();

            headers.put('X-B3-TraceId','463ac35c9f6413ad48485a3953bb6124');
            headers.put('X-B3-SpanId','a2fb4a1d1a96d312');
            headers.put('X-B3-Sampled','a2fb4a1d1a96d312');
            headers.put('X-B3-ParentSpanId','05e3ac9a4f6e3b90');
            //headers.put('Authorization','Bearer eyJ0eXAiOiJKV1QiLCJraWQiOiJkZXNHdHNTYWxlc2ZvcmNlSW50ZXJuZXQiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJkZXNHdHNJbnRlcm5ldCIsInN1YiI6IjViMDVkOTYyLWEzZWQtNGVlNi1hZjY1LTRkNzM4YjU2MDQ0NiIsImV4cCI6MTYxNDg2NTUzMywiaWF0IjoxNjE0ODU4MzMzLCJuYmYiOjE2MTQ4NTgzMzMsImp0aSI6IjJhODhjYWE4ZGNjYjc0YWE2MzI0MTc4Mjc4NWU1NWUzIiwiY291bnRyeSI6IkVTQlNDSEVTTU0iLCJsb2NhbF91aWQiOiI1YjA1ZDk2Mi1hM2VkLTRlZTYtYWY2NS00ZDczOGI1NjA0NDYiLCJsb2NhbF9yZWFsbSI6IiJ9.iS7_EpT_XADt_QKne4W7oDPOXWS6Tgdr__WH_tITWbOU34WpA3h70dQ5J0btnF8CgB_MOCeIp9WGx82m25b6YfiG7pqRQ364mqTMpIjxIG1FAIuM0D7ENEDawlbz1n7Et1QoQxbceprAqowd_IVrhrPLczIgp2AVZns-Z_hb1ze4KQ3PGtbURz21Ie1A2wqS-Tr-KW9KLuDVPlEMgE8eFYFSLvF0ymGT93e4H9Wf3YzaMLBbGfki3rnAoIMc4_dIqZlQAVEGbg66Pc2a77uZeeb4jo_Gx0EOJ2iLbvPg_vgEbkZ1vD37QXdp7DkLwM2g1SwxtMAS1HDagi1qQ9sTzw');
            /*CERT */ //headers.put('Authorization','Bearer eyJ0eXAiOiJKV1QiLCJraWQiOiJkZXNHdHNTYWxlc2ZvcmNlSW50ZXJuZXQiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJkZXNHdHNJbnRlcm5ldCIsInN1YiI6IjViMDVkOTYyLWEzZWQtNGVlNi1hZjY1LTRkNzM4YjU2MDQ0NiIsImV4cCI6MTYxNTIwNTg3NiwiaWF0IjoxNjE1MTk4Njc2LCJuYmYiOjE2MTUxOTg2NzYsImp0aSI6IjNhNjZkOWYzNDU2NjI0MTI0NGI4YTcxNTFiYjdkMzk5IiwiY291bnRyeSI6IkVTQlNDSEVTTU0iLCJsb2NhbF91aWQiOiI1YjA1ZDk2Mi1hM2VkLTRlZTYtYWY2NS00ZDczOGI1NjA0NDYiLCJsb2NhbF9yZWFsbSI6IiJ9.rBsU96vicqxvoK-KsWxvWzmVHg3ksboEZaEZup7CKuAbBwyhPyyuCcT2DQTydfbcj-SkOvt1ReyuFuM0x_N9esbaVqphSFuRmh3ns2U67XUgAwiNQgfvhZaCNC8e5wD0HQUo01TQHzNmq0dDmX9BayR4KsHnc6xdNvgPyCWHPsi7ThagFf_EZIcYLmEoIPHevzySvSDGcVdh6HFtOztevJCNMZT1KQ9j6Wn0924__J2MPTLCw5-mwf4IRuwW8f7RZeIBCPCE6H9jHdLZCLfjnV1lfhYoyvAeakad6esNdyIAQgtuEfWVzU_ZHOb7qu_-7ZzXonMFAUY95hndrI-GAg ');
            headers.put('globalID','9dd2086c-09c2-405d-adc9-a1de58dd576a');
            headers.put('Global-Payment-Id','13bce845-04b2-43bf-8120-9bf9ce525eb7');

            CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('CNT_TradesFX_search_filterTrades');
            String response = Global_IntegrationWrapper.launchHTTP(parameters, configWs.CNT_Endpoint__c, configWs.CNT_HTTPMethod__c, headers);
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