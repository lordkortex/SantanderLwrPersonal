/*----------------------------------------------------------------------------------
Author:         R. Alexander Cervino
Company:        Deloitte
Description:    Controller of CMP_SwiftPaymentTable
Test Class:     CNT_SwiftPaymentTable_Test
History
<Date>          <Author>        <Description>
19/11/2019      R. Alexander Cervino     Initial version
----------------------------------------------------------------------------------*/

public with sharing class CNT_SwiftPaymentTable {

   /*----------------------------------------------------------------------------------
   Author:         R. Alexander Cervino
   Company:        Deloitte
   Description:    Method to get the filtered data
   History
   <Date>          <Author>        <Description>
   19/11/2019      R. Alexander Cervino     Initial version
   ----------------------------------------------------------------------------------*/

   @AuraEnabled
   public static String getUETR(String uetr){

       Pattern MyPattern = Pattern.compile('^([a-f0-9]{8})-([a-f0-9]{4})-4([a-f0-9]{3})-([89ab])([a-f0-9]{3})-([a-f0-9]{12})$');
        
        Matcher MyMatcher = MyPattern.matcher(uetr);
        System.debug(MyMatcher.matches());
        if(MyMatcher.matches())
        {
       
        String response;
		WRAPPER_IPTPaymentList l = new WRAPPER_IPTPaymentList();														

       try {

            
            String serializedToken = null;
                       
            CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('CNT_UETRPublic');
            String finalEndPoint = configWs.CNT_Endpoint__c.replace('{payment_Id}', uetr).replace('{{entorno}}', 'cert');
            System.debug('ENDPOINT: ' + response);
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


			System.debug('HTTP_CALL REQ: ' + req);
            System.debug('HTTP_CALL REQ TOKEN: ' +  req.getHeader('Authorization'));
            System.debug('HTTP_CALL REQ nexus/noNexus: ' +  req.getHeader('user_type'));
            System.debug('HTTP_CALL REQ BODY: ' + String.valueOf(req.getBody()));
            System.debug('HTTP_CALL RES: ' + res);
            System.debug('HTTP_CALL RES STATUS: ' + res.getStatus());
            System.debug('HTTP_CALL RES STATUSCODE: ' + res.getStatusCode());
            System.debug('HTTP_CALL RES BODY: ' + String.valueOf(res.getBody()));

           response = String.valueOf(res.getBody());
           

            if(response!='' && response!=null){
                
                l=WRAPPER_IPTPaymentList.parse(response);
                WRAPPER_IPTPaymentList.getValueDateFormat(l);
                //WRAPPER_IPTPaymentList.getFormattedNumbers(l);
                l=formatPaymentAmounts(l);
            } 
            //req.setTimeout(timer);
            //response = Global_IntegrationWrapper.launchHttp('',finalEndPoint,configWs.CNT_HTTPMethod__c);

            //System.debug('RESPONSE: ' + response);
        } catch (Exception e) {
            System.debug('CNT_DownloadBalanceMovementsController.getTransactions: ' + e.getMessage());
        }
        
        return response;
        }
       else
       {
           return null;
       }
   }

    @AuraEnabled
    public static WRAPPER_IPTPaymentList getFilteredData(String filters){
        //try{
        WRAPPER_IPTPaymentList l = new WRAPPER_IPTPaymentList();
        CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('CNT_WRAPPERSWIFTPAYMENT');
        
        String response = null;
        WrapperUserData userData = ServiceUserData.getUserData(UserInfo.getUserId()); 
        String gtsOperationsUserProfile = System.Label.Profile_BackOffice_001;
        String localBankUserProfile = 'Local Support';
        if (userData != null) {
            if (String.isNotBlank(userData.profileName)) {
                if(userData.profileName != gtsOperationsUserProfile && userData.profileName != localBankUserProfile) {
                	response = Global_IntegrationWrapper.launchHttp(filters,configWs.CNT_Endpoint__c,configWs.CNT_HTTPMethod__c);
                } else {
                	String tokenPlatform = 'BBOO';
                	String tokenUser = '';
                	if (userData.profileName == gtsOperationsUserProfile) {
                		tokenUser = 'GTS_GLOBAL';
                        TokenInformation tokenInformation = new TokenInformation('ES', tokenPlatform, tokenUser, null, 'BSCHESMM');
                        response = Global_IntegrationWrapper.launchHTTP(filters, configWs.CNT_Endpoint__c,  configWs.CNT_HTTPMethod__c, null, null, null, 40000, tokenInformation); 
                	} else if(userData.profileName == localBankUserProfile) {
                		tokenUser = 'GTS_LOB';
                        //if(userData.country != null && (userData.country == 'ES' || userData.country == 'GB')){
                        	TokenInformation tokenInformation = new TokenInformation(userData.country, tokenPlatform, tokenUser, null, userData.bic);
                            response = Global_IntegrationWrapper.launchHTTP(filters, configWs.CNT_Endpoint__c,  configWs.CNT_HTTPMethod__c, null, null, null, 40000, tokenInformation);
                        /*}else{
                        	TokenInformation tokenInformation = new TokenInformation('ES', tokenPlatform, tokenUser, null, 'BSCHESMM');
                            response = Global_IntegrationWrapper.launchHTTP(filters, configWs.CNT_Endpoint__c,  configWs.CNT_HTTPMethod__c, null, null, null, 40000, tokenInformation);
                        }*/
                	}   
                }
			} else {
                response = null;
			}
		} else {
            response = null;
        }
    	
        
        
        //String response = Global_IntegrationWrapper.launchHttp(filters,configWs.CNT_Endpoint__c,configWs.CNT_HTTPMethod__c); //OLD
        
            //response = '{\"paymentList\": []}';//MOCK
            if(Test.isRunningTest()){
                response = '{\"paymentList\": ['+
                    '    {'+
                    '      \"paymentDetail\": {'+
                    '        \"paymentId\": \"3333626e-5747-4377-91a5-52e0f95122c8\",'+
                    '        \"originatorAgent\": {'+
                    '          \"agentCode\": \"test\",'+
                    '          \"agentName\": \"test\",'+
                    '          \"agentCountry\": \"test\",'+
                    '          \"agentLocation\": \"test\"'+
                    '        },'+
                    '        \"transactionStatus\": {'+
                    '          \"status\": \"RJCT\",'+
                    '          \"reason\":  \"test\"'+
                    '        },'+
                    '        \"originatorData\": {'+
                    '          \"originatorName\": \"PRUEBAS OLC DESEMPLEADO ISA\",'+
                    '          \"originatorAccount\": {'+
                    '            \"idType\": \"IBA\",'+
                    '            \"accountId\": \"ES9000490000000000000011\"'+
                    '          }'+
                    '        },'+
                    '        \"account\": {'+
                    '          \"idType\": "IBA",'+
                    '          \"accountId\": \"test\"'+
                    '        },'+
                    '        \"statusDate\": \"2020-03-30\",'+
                    '        \"cancellationStatus\": {'+
                    '          \"transactionCancellationStatus\": \"test\"'+
                    '        },'+
                    '        \"issueDate\": \"2020-02-19\",'+
                    '        \"valueDate\": \"2020-03-19\",'+
                    '        \"paymentAmount\": {'+
                    '          \"amount\": \"47.74\",'+
                    '          \"tcurrency\": \"EUR\"'+
                    '        },'+
                    '        \"beneficiaryData\": {'+
                    '          \"beneficiaryName\": \"Izzy Solomon Rabinovich Rubinschtei\",'+
                    '          \"creditorCreditAccount\": {'+
                    '            \"idType\": \"BBA\",'+
                    '            \"accountId\": \"400808595\"'+
                    '          },'+
                    '          \"creditorAgent\": {'+
                    '            \"agentCode\": \"test\",'+
                    '            \"agentName\": \"test\",'+
                    '            \"agentCountry\": \"test\",'+
                    '            \"agentLocation\": \"test\"'+
                    '          }'+
                    '        }'+
                    '      },'+
                    '      \"links\": {'+
                    '        \"paymentTrackerDetailsLink\":\"test\",'+
                    '        \"first\": \"test\",'+
                    '        \"prev\": \"test\",'+
                    '        \"next\":\"test\"'+
                    '      }'+
                    '    },'+
                    '    {'+
                    '      \"paymentDetail\": {'+
                    '        \"paymentId\": \"a2f4bd30-1365-4c2c-948b-43b257c38881\",'+
                    '        \"originatorAgent\": {'+
                    '          \"agentCode\": \"test\",'+
                    '          \"agentName\": \"test\",'+
                    '          \"agentCountry\": \"test\",'+
                    '          \"agentLocation\": \"test\"'+
                    '        },'+
                    '        \"transactionStatus\": {'+
                    '          \"status\": \"ACCC\",'+
                    '          \"reason\":\"001\"'+
                    '        },'+
                    '        \"originatorData\": {'+
                    '          \"originatorName\": \"OJEDA OSASCO LAZARO\",'+
                    '          \"originatorAccount\": {'+
                    '            \"idType\": \"IBA\",'+
                    '            \"accountId\": \"ES4800490000000000000000\"'+
                    '          }'+
                    '        },'+
                    '        \"account\": {'+
                    '          \"idType\": "IBAN",'+
                    '          \"accountId\": "test"'+
                    '        },'+
                    '        \"statusDate\": \"2020-05-05\",'+
                    '        \"cancellationStatus\": {'+
                    '          \"transactionCancellationStatus\": \"test\"'+
                    '        },'+
                    '        \"issueDate\": \"2019-11-20\",'+
                    '        \"valueDate\": \"2019-11-20\",'+
                    '        \"paymentAmount\": {'+
                    '          \"amount\": \"47.74\",'+
                    '          \"tcurrency\": \"USD\"'+
                    '        },'+
                    '        \"beneficiaryData\": {'+
                    '          \"beneficiaryName\": \"MANUELA OJEDA\",'+
                    '          \"creditorCreditAccount\": {'+
                    '            \"idType\": \"BBA\",'+
                    '            \"accountId\": \"\"'+
                    '          },'+
                    '          \"creditorAgent\": {'+
                    '            \"agentCode\": \"test\",'+
                    '            \"agentName\": \"test\",'+
                    '            \"agentCountry\":\"test\",'+
                    '            \"agentLocation\": \"test\"'+
                    '          }'+
                    '        }'+
                    '      },'+
                    '      \"links\": {'+
                    '        \"paymentTrackerDetailsLink\": \"test\",'+
                    '        \"first\": \"test\",'+
                    '        \"prev\": \"test\",'+
                    '        \"next\": \"test\"'+
                    '      }'+
                    '    }'+
                    '  ]'+
                    '}';           
            }
            if(response!='' && response!=null){
                
                l=WRAPPER_IPTPaymentList.parse(response);
                WRAPPER_IPTPaymentList.getValueDateFormat(l);
                //WRAPPER_IPTPaymentList.getFormattedNumbers(l);
                l=formatPaymentAmounts(l);
            }
            
            System.debug(l);
            return l;
            
            //return DUMMYDATA_SWIFTPAYMENTS.getJsonPayments();
        //} catch (Exception e) {throw new customException(e.getMessage());}
        
    }
    
    /*----------------------------------------------------------------------------------
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Method to format the amounts based on the user preferences
    History
    <Date>			<Author>		            <Description>
    13/07/2020		Guillermo Giral             Initial version
    ----------------------------------------------------------------------------------*/
    public static WRAPPER_IPTPaymentList formatPaymentAmounts(WRAPPER_IPTPaymentList input){
        // Get the user number format
        String numberFormat = Global_Utilities.getUserNumberFormat(UserInfo.getUserId());
        if(numberFormat == null || numberFormat == ''){
            numberFormat = '###.###.###,##';
        }

        // Fromat the dates and the numbers
        System.debug(input);
		if(input != null && input.paymentList != null){											   
			for(WRAPPER_IPTPaymentList.paymentList t : input.paymentList){
				if(numberFormat == '###.###.###,##' || numberFormat == '###,###,###.##'){
					if(t.paymentDetail.paymentAmount != null && t.paymentDetail.paymentAmount.amount != null){
						CNT_FormattedNumber amount = new CNT_FormattedNumber(t.paymentDetail.paymentAmount.amount, numberFormat);
						t.paymentDetail.paymentAmount.paymentAmount_FormattedWholeNumber = amount.wholeNumber_Formatted;
						t.paymentDetail.paymentAmount.paymentAmount_FormattedDecimalPart = amount.decimalPart_Formatted;
						t.paymentDetail.paymentAmount.paymentAmount_FormattedEntirePart = amount.entirePart_Formatted;
						t.paymentDetail.paymentAmount.currency_X = t.paymentDetail.paymentAmount.tcurrency;
					} else {
						t.paymentDetail.paymentAmount.paymentAmount_FormattedWholeNumber = '';
						t.paymentDetail.paymentAmount.paymentAmount_FormattedDecimalPart = '';
						t.paymentDetail.paymentAmount.paymentAmount_FormattedEntirePart = '';
						t.paymentDetail.paymentAmount.currency_X = '';	 
					}
				}
			}
		}
        return input;
    }
    
    /*----------------------------------------------------------------------------------
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Data encrypting
    History
    <Date>			<Author>		<Description>
    21/11/2019		Shahad Naji     Initial version
    ----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static String encryptData(String str){
        return Global_Utilities.encryptData(str);
    }

     /*----------------------------------------------------------------------------------
    Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Download MT103
    History
    <Date>			<Author>		        <Description>
    11/12/2019		R. Alexander Cervino     Initial version
    ----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static String downloadMT103Doc(String str){
        try{
            
            String res='';
            CNT_DownloadMT103 data = new CNT_DownloadMT103(str);

            data.execute();

            if (String.isNotBlank(data.getOutput())) {
                res= data.getOutput();
            }
            
            return res;
        } catch (Exception e) {throw new customException(e.getMessage());}

    }

    /*----------------------------------------------------------------------------------
    Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Remove MT103
    History
    <Date>			<Author>		        <Description>
    11/12/2019		R. Alexander Cervino     Initial version
    ----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static void removeMT103(String id){
        try{
            if(id!=''){
                List<ContentDocument> doc = new List<ContentDocument>([SELECT id from ContentDocument where Id=:id LIMIT 1]);

                if(!doc.isEmpty()){
                    delete doc[0];
                }
            }

        } catch (Exception e) {throw new customException(e.getMessage());}

    }

    /*------------------------------------------------------------
    Author:         R. Cervino
    Company:        Deloitte
    Description:    Get Date according to locale
    History 
    <Date>          <Author>            <Change Description>
    06/03/2020		R Cervino     Initial version
    ------------------------------------------------------------*/     
    @AuraEnabled
    public static String getDateAndTime(String dateT){
        return String.ValueofGmt(DateTime_Utilities.getDatetime(dateT,0));
    }
    
}