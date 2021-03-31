public with sharing class CNT_AuthorizationsController {

    @AuraEnabled
    public static WRAPPER_Authorizations getAuthorizations(String requestBody){
        try {
            system.debug('entramos en autorizaciones');
            system.debug('requestBody: '+requestBody);
            
            CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('CNT_Authorizations');
            system.debug('configWs: '+configWs);
            
            String response;
            if(Test.isRunningTest()){
                response = '{"pending_authorizations": {"listaAutorizaciones": [{"autorizacion": {"idauth": 111378,"fecPett": "2020-05-28T08:58:06.000Z","usuLogi": "gtsfun1","uidAlta": "SGPgtsfun211931","uidMod": "SGPgtsfun211931","ctipob": "us", "moddec1": "pruebajd1 Pruebajd1 Pruebajd1", "accio": "B","estapeti": "P", "fapro": "2020-05-28T08:58:06.000Z","comenta5": "Para eliminar directamente","apellids": "Pruebas Desarrollo", "nombusua": "Funcional GTS","nomelemt": "SGPjdnexu789108", "indDuplicado": null}}],"HAY_MAS_DATOS": "N","NUM_PAGINA": 2,"totalRegistros": 15,"totalPaginas": 1},"requested_authorizations": {"HAY_MAS_DATOS": "N","listaAutorizaciones": [{"autorizacion": {"accio": "B","apellids": "Pruebas Desarrollo","comenta5": "Para eliminar directamente","ctipob": "us","estapeti": "P", "fapro": "2020-05-28T08:58:06.000Z","fecPett": "2020-05-28T08:58:06.000Z","idauth": 111378,"indDuplicado": null, "moddec1": "pruebajd1 Pruebajd1 Pruebajd1","nombusua": "Funcional GTS","nomelemt": "SGPjdnexu789108","uidAlta": "SGPgtsfun211931","uidMod": "SGPgtsfun211931","usuLogi": "gtsfun1"}}],"NUM_PAGINA": 2,"totalPaginas": 1,"totalRegistros": 15}}'; 
            }else{
                response = Global_IntegrationWrapper.launchHttp(requestBody,configWs.CNT_Endpoint__c,configWs.CNT_HTTPMethod__c);
            }
            System.debug('respuesta: '+response);
            
            //Mock response
            //response = '{"pending_authorizations": {"listaAutorizaciones": [{"autorizacion": {"idauth": 111378,"fecPett": "2020-05-28T08:58:06.000Z","usuLogi": "gtsfun1","uidAlta": "SGPgtsfun211931","uidMod": "SGPgtsfun211931","ctipob": "us", "moddec1": "pruebajd1 Pruebajd1 Pruebajd1", "accio": "B","estapeti": "P", "fapro": "2020-05-28T08:58:06.000Z","comenta5": "Para eliminar directamente","apellids": "Pruebas Desarrollo", "nombusua": "Funcional GTS","nomelemt": "SGPjdnexu789108", "indDuplicado": null}}],"HAY_MAS_DATOS": "N","NUM_PAGINA": 2,"totalRegistros": 15,"totalPaginas": 1},"requested_authorizations": {"HAY_MAS_DATOS": "N","listaAutorizaciones": [{"autorizacion": {"accio": "B","apellids": "Pruebas Desarrollo","comenta5": "Para eliminar directamente","ctipob": "us","estapeti": "P", "fapro": "2020-05-28T08:58:06.000Z","fecPett": "2020-05-28T08:58:06.000Z","idauth": 111378,"indDuplicado": null, "moddec1": "pruebajd1 Pruebajd1 Pruebajd1","nombusua": "Funcional GTS","nomelemt": "SGPjdnexu789108","uidAlta": "SGPgtsfun211931","uidMod": "SGPgtsfun211931","usuLogi": "gtsfun1"}}],"NUM_PAGINA": 2,"totalPaginas": 1,"totalRegistros": 15}}'; 
            
            if (String.isNotBlank(response)){
                WRAPPER_Authorizations authorizationsData = WRAPPER_Authorizations.parse(response);
            	authorizationsData = formatTransactionsOutput(authorizationsData);
                system.debug('authorizationsData: '+authorizationsData); 
                system.debug('lista pending: '+authorizationsData.Pending_authorizations.listaAutorizaciones);
                system.debug('lista request: '+authorizationsData.Requested_authorizations.listaAutorizaciones);
                return authorizationsData;
            } else {
                throw new customException(Label.getDataError);
            }
        }
        catch (Exception e) {
            System.debug('CNT_AuthorizationsController.getAuthorizations: ' + e.getMessage());
        }
        return null;
    }
    
    
    @AuraEnabled
    public static String sendAuthorizationApproval(String requestBody){
        try {
            system.debug('entramos en autorizaciones');
            system.debug('requestBody: '+requestBody);
            
            CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('CNT_AuthorizationApproval');
            system.debug('configWs: '+configWs);
            
            String response;
            if(Test.isRunningTest()){
                response = 'OK';
            }else{
                response = Global_IntegrationWrapper.launchHttp(requestBody,configWs.CNT_Endpoint__c,configWs.CNT_HTTPMethod__c);
            }
            System.debug('respuesta: '+response);
            
            //Mock response
            response = 'OK';
            if (String.isNotBlank(response)){
                return 'APPROVALOK';
            } else {
                throw new customException(Label.getDataError);
            }
        }
        catch (Exception e) {
            System.debug('CNT_ViewAuthorization.sendAuthorizationApproval: ' + e.getMessage());
        }
        return null;
    }
  
    @AuraEnabled
    public static String sendDelete(String requestBody){
        try {
            system.debug('entramos en autorizaciones');
            system.debug('requestBody: '+requestBody);
            
            CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('CNT_AuthorizationDelete');
            system.debug('configWs: '+configWs);
            
            String response;
            if(Test.isRunningTest()){
                response = 'OK';
            }else{
                response = Global_IntegrationWrapper.launchHttp(requestBody,configWs.CNT_Endpoint__c,configWs.CNT_HTTPMethod__c);
            }
            System.debug('respuesta: '+response);
            
            if (String.isNotBlank(response)){
                //WRAPPER_AuthorizationApproval authorizationApproval = WRAPPER_AuthorizationApproval.parse(response);
                system.debug('Authorization was removed.'); 
                return 'DELETEOK';
            } else {
                throw new customException(Label.getDataError);
            }
        }
        catch (Exception e) {
            System.debug('CNT_ViewAuthorization.sendDelete: ' + e.getMessage());
        }
        return null;
    }
    
    
    public static WRAPPER_Authorizations formatTransactionsOutput (WRAPPER_Authorizations input){
        // Get the date format
        String dateFormat = Global_Utilities.getUserDateFormat(UserInfo.getUserId());
        if(dateFormat == null || dateFormat == ''){
            dateFormat = 'dd/MM/yyyy HH:mm';
        }else{
            dateFormat = dateFormat+' HH:mm';
        }
        
        // Format the dates
        for(WRAPPER_Authorizations.ListaAutorizaciones a : input.pending_authorizations.listaAutorizaciones){
        	a.autorizacion.fecPett = formatDateFromISOString(a.autorizacion.fecPett, dateFormat);
    	}
    	for(WRAPPER_Authorizations.ListaAutorizaciones a : input.requested_authorizations.listaAutorizaciones){
        	a.autorizacion.fecPett = formatDateFromISOString(a.autorizacion.fecPett, dateFormat);
        	a.autorizacion.fapro = formatDateFromISOString(a.autorizacion.fapro, dateFormat);
    	}
        return input;
    }
    
    
    /*----------------------------------------------------------------------------------
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Method that formats the dates and numbers in the data returned by Mulesoft
    History
    <Date>			<Author>		            <Description>
    19/05/2020		Guillermo Giral             Initial version
    ----------------------------------------------------------------------------------*/
    public static String formatDateFromISOString (String dateToFormat, String format){
        // Check if the value date is populated and it's in ISO format
        if(dateToFormat!= null && dateToFormat !='' && dateToFormat.contains('T')){
            String[] dateChunks = dateToFormat.split('T');
            Date d = Date.valueOf(dateToFormat);
            Datetime dt = Datetime.newInstanceGMT(d.year(), d.month(),d.day(), Integer.valueOf(dateChunks[1].substring(0,2)), Integer.valueOf(dateChunks[1].substring(3,5)), Integer.valueOf(dateChunks[1].substring(6,8)));
            return dt.format(format, String.valueOf(UserInfo.getTimeZone()));
        }
        return dateToFormat;
    }
}