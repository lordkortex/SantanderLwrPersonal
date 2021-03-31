global with sharing class WS_B2B_OTP_Strategic_OTV {

    global static initiateOTP_OTV initiateOTP_OTV;

    global class initiateOTP_OTV {
        @AuraEnabled global String scaUid;
        @AuraEnabled global String scaSecret;
        global initiateOTP_OTV(){}
    }

    global class DocumentId {
        global String documentType;
        global String documentNumber;
        
        global DocumentId(){
            Account userAccount = Global_Utilities.getAccountData('');
            
            if(userAccount != null){
                this.documentType = userAccount.ACC_TXT_DocumentType__c;
                this.documentNumber = userAccount.ACC_TXT_DocumentNumber__c;
            }
        }
    }
	
    global class IdentifierType_OTV {
        global String emailAddress;
        global DocumentId documentId;
        global String aliasLocal;
        global String globalIdentity;
        
        global IdentifierType_OTV(){}
        
        global IdentifierType_OTV(User user){
            if(user != null){
                if(String.isNotBlank(user.USER_TXT_GlobalId__c)){
                    this.globalIdentity = user.USER_TXT_GlobalId__c;
                }else{
                    if(String.isNotBlank(user.Email)){
                        this.emailAddress = user.Email;
                    }else{
                        if(String.isNotBlank(user.Alias)){
                            this.aliasLocal = user.Alias;
                        }else{
                            this.documentId = new DocumentId();
                        }
                    }
                }
            }else{
                this.documentId = new DocumentId();
            }
        }        
    }

    //Initiate Body
    /*----------------------------------------------------------------------------------
	Author:         Antonio Matachana
	Company:        
	Description:    
	Test Class:     WS_B2B_OTP_Strategic_OTV_Test
	History
	<Date>          <Author>        <Description>
	11/02/2021      Antonio Matachana     	Initial version
	----------------------------------------------------------------------------------*/
    global class InputInitiateOTP_OTV {
        
        global IdentifierType_OTV userIdentification;
        global Object payload;
        global String configurationUid;
        
        
        global InputInitiateOTP_OTV(){
            User user = Global_Utilities.getUserData('');
            if(user != null){
                this.userIdentification = new IdentifierType_OTV(user);
                String payload = '{"title":"{title}","subtitle":"{subtitle}","oob":false,"validationChannel":"apigee"}';               
                payload = payload.replace('{title}', System.Label.cmpOTVtitleOTP);
                payload = payload.replace('{subtitle}', System.Label.cmpOTVsubTitleOTP);
                this.payload = JSON.deserializeUntyped(payload);
                this.configurationUid = System.Label.cmpOTVconfigUidOTP; 
            }
        }
    }

    //En pagos lo llaman desde CMP_B2B_AuthorizationHelper.js
    /*----------------------------------------------------------------------------------
	Author:         Antonio Matachana
	Company:        
	Description:    Call to GlobalId signin app
	Test Class:     WS_B2B_OTP_Strategic_OTV_Test
	History
	<Date>          <Author>        <Description>
	11/02/2021      Antonio Matachana     	Initial version
	----------------------------------------------------------------------------------*/
    global static initiateOTP_OTV getOTP_OTV(){
        try {
            CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('OTPIniciate_Strategic');
            String finalEndPoint = configWs.CNT_Endpoint__c;           
            if (!Test.isRunningTest()) {
                InputInitiateOTP_OTV initBodyOTV = new InputInitiateOTP_OTV();
                String res = Global_IntegrationWrapper.launchHTTP(JSON.serialize(initBodyOTV,true),finalEndPoint,configWs.CNT_HTTPMethod__c);
                system.debug('initiateOTP_OTV RES: ' + res);
                initiateOTP_OTV = (initiateOTP_OTV) System.JSON.deserialize(res, initiateOTP_OTV.class);
                System.debug('initiateOTP_OTV: ' + initiateOTP_OTV );
            }else{
                
                /*String json = '{'+
                    '  \"identityInitiateScaRequest\": {'+
                    '  \"identifierType\": {'+
                    '    \"emailAddress\": \"jhonrham@brithis.com\",'+
                    '    \"documentId\": {'+
                    '      \"documentType\": \"national_ id_card\",'+
                    '      \"documentNumber\": \"3456789S\"'+
                    '    },'+
                    '    \"aliasIdentity\": \"mariagarrido123\",'+
                    '    \"globalIdentity\": \"34567897er\"'+
                    '  },'+
                    '  \"embeddedSystem\": \"OTP\",'+
                    '  \"payLoadOperationRequesting\": \"accounts_balances+00000000000001221+ Json ( \'Operación\' , \'Traspaso entre cuentas\', \'importe\' \'2300,00\'  \'Fecha Valor\' , \'2020-08-15\')\",'+
                    '  \"configUid\": \"ConfiUID_000000001\"'+
                    '}'+               
                    '}';        
                
                initiateOTP_OTV = (initiateOTP_OTV) System.JSON.deserialize(json, initiateOTP_OTV.class);*/
            }
            return initiateOTP_OTV;
        } catch (Exception e) {
            System.debug('initiateOTP_OTV: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            throw new AuraHandledException('The following exception has occurred: ' + e.getMessage()); 
        }
    }

    //AMR Pruebas frima 27012021
    //PAGOS almacena la firma en el objeto SGN_User__c de SF 
    //¿Tenemos que pasar un identificador de la solicitud?
    //public static void storeOTPId(String otpId, String paymentID){
    // ¿Necesitamos crear un nuevo objeto para almacenar los datos devueltos de la petición a la APP de pagos?
    
    //global static void storeOTPId_OTV(String otpId, String paymentID){
    /*global static void storeOTPId_OTV(String scaUidOTV){
        try {
            List<SNG_Payment__c> signature = new List<SNG_Payment__c>([SELECT Id from SNG_Payment__c where SGN_TXT_IdPayment__c = :paymentID]);
            if(!signature.isEmpty()){ 
                
                String userID = Global_Utilities.getUserData('').USER_TXT_GlobalId__c;
                
                //Pendiente ver si creamos un objeto y cuando lo creamos
                List<SGN_User__c> user = new List<SGN_User__c>([SELECT Id, SNG_OTP_ID__c,SGN_DATET_Completed__c,SGN_ELCK_RelatedSign__r.SGN_TXT_IdPayment__c from SGN_User__c  WHERE SGN_ELCK_RelatedSign__r.SGN_TXT_IdPayment__c= :PaymentID AND SGN_TXT_GlobalId__c = :userID]);
                
                if(!user.isEmpty()){
                    user[0].SNG_OTP_ID__c = scaUidOTV;
                    update user;   
                }
            }
            
        } catch (Exception e) {
            System.debug('initiateOTP: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }*/

    // AMR Pruebas frima 27012021
    // Tenemos que definir si necesitamos el objeto para almacenar el scaUid y como recuperarlo
    //
    // Este método tendriamos que llamarlo desde el componente LWC de Terms && Conditions en el momento que recibamos la llamada desde la APP de Firmas y se lance el evento OTPValidation__e al que está subscrito el framework Cometd
    // Recuperamos el valor almacenado del scaUid y lo comparamos con el recibido del en el evento (scaUid__c, status__c), una vez validado pasamos a la siguiente pantalla.
    // ¿Tendríamos que validar el hash que nos comentaron en la reunión?, creo que en pagos no se está haciendo (revisar con David y Alberto) 
    global static String obtainOTPId (String paymentID) {
        try {
            List<SNG_Payment__c> signature = new List<SNG_Payment__c>([SELECT Id from SNG_Payment__c where SGN_TXT_IdPayment__c = :paymentID]);
            if(!signature.isEmpty()){ 
                String userID = Global_Utilities.getUserData('').USER_TXT_GlobalId__c;
                List<SGN_User__c> user = new List<SGN_User__c>([SELECT Id, SNG_OTP_ID__c,SGN_DATET_Completed__c,SGN_ELCK_RelatedSign__r.SGN_TXT_IdPayment__c from SGN_User__c  WHERE SGN_ELCK_RelatedSign__r.SGN_TXT_IdPayment__c= :PaymentID AND SGN_TXT_GlobalId__c = :userID]);
                if(!user.isEmpty()) {
                    //Aquí esta almacenado el scaUid recibido en la respuesta de nuestra llamada al endpoint de la App de Firmas
                    return user[0].SNG_OTP_ID__c;
                }
            }
        } catch (Exception e) {
            System.debug('obtainOTPId: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
        return '';
    }

}