/*----------------------------------------------------------------------------------
Author:         Antonio Duarte
Company:        Deloitte
Description:    cmpOTVSubsidiaryDeclineInvitation apex controller
Test Class:     CNT_OTV_ServiceDeclination_Test
History
<Date>          <Author>        	<Description>
19/03/2021      Antonio Duarte     	Initial version
----------------------------------------------------------------------------------*/
public class CNT_OTV_ServiceDeclination {

    /*------------------------------------------------------------
    Author:         Antonio Duarte
    Company:        Deloitte
    Description:    Method to send the invitation declination.
    History 
    <Date>          <Author>            <Change Description>
    11/03/2021	    Antonio Duarte     	Initial version
    ------------------------------------------------------------*/ 
    @AuraEnabled
    public static String declineOTVInvitation(String reason, String details,String status){
        String response;
        
        try{	
            User u = [SELECT Id, Contact.Account.ACC_TXT_CompanyId__c, Contact.Account.Parent.ACC_TXT_CompanyId__c,Contact.Account.ACC_PCK_OTView_Enrollment__c  FROM User WHERE Id = :UserInfo.getUserId()][0];
            
            //Prepare callout body
            WRAPPER_OTV_Omnichannel.OTV_OmnichannelService_PATCH_Declination body = new WRAPPER_OTV_Omnichannel.OTV_OmnichannelService_PATCH_Declination();
            body.matrixCompanyId = '1588401980';//u.Contact.Account?.Parent?.ACC_TXT_CompanyId__c == null?'':u.Contact.Account?.Parent?.ACC_TXT_CompanyId__c;
        	body.reason = reason;
        	body.description = details;
            if(status == 'Declined'){
                body.status = 'active';
            }else{
            	body.status = 'inactive';
            }
                        
            //Call Webservice
            CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('OTV_OmnichannelService_PATCH');
            configWs.CNT_Endpoint__c = configWs.CNT_Endpoint__c.replace('{company_id}',u.Contact.Account.ACC_TXT_CompanyId__c).replace('{service_id}','one_trade_view_multi');
            response = Global_IntegrationWrapper.launchHttp(JSON.Serialize(body), configWs.CNT_Endpoint__c, configWs.CNT_HTTPMethod__c);
            System.debug('declineOTVInvitation >>>>>>>' + response);
            
            //Check the response
            if(response == ''){//'' is 200 OK
                u.Contact.Account.ACC_PCK_OTView_Enrollment__c = 'Rejected';
        		update u.Contact.Account;
            }else{
                throw new CustomException ('Service KO');
            }
        }catch(Exception e){
            throw new CustomException (e);
        }
       
        return response;
    }
    
}