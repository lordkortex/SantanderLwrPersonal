/*----------------------------------------------------------------------------------
Author:         R. Cervino
Company:        Deloitte
Description:    Personal Settings  wrapper
Test Class:     WRAPPER_PersonalSettings_Test
History
<Date>			<Author>		<Description>
06/04/2020		R. Cervino     Initial version
----------------------------------------------------------------------------------*/
global class WRAPPER_PersonalSettings {
    
    global WRAPPER_PersonalSettings(){
        System.debug('WRAPPER_PersonalSettings');
    }
    
    global class Idioma {
        @AuraEnabled
        
        global String IDIOMA_ISO;
        @AuraEnabled
        
        global String DIALECTO_ISO;

        global Idioma() {}
    }
    @AuraEnabled
    
    global Personalsettings personalsettings;
    
    global class Personalsettings {
        @AuraEnabled
        
        global String apellidosUsuario;
        @AuraEnabled
        
        global String backoffice;
        @AuraEnabled
        
        global String checkMovil;
        @AuraEnabled
        
        global Integer codigoCliente;
        @AuraEnabled
        
        global String codigoErc;
        @AuraEnabled
        
        global String codigoFormatoCantidad;
        @AuraEnabled
        
        global String codigoFormatoFecha;
        @AuraEnabled
        
        global String codigoFormatoZona;
        @AuraEnabled
        
        global String dataCript;
        @AuraEnabled
        
        global String direccionUsuario;
        @AuraEnabled
        
        global String estado;
        @AuraEnabled
        
        global String fechaModificacion;
        @AuraEnabled
        
        global String idLogin;
        @AuraEnabled
        
        global String idToken;
        @AuraEnabled
        
        global Idioma idioma;
        @AuraEnabled
        
        global String indAprob;
        @AuraEnabled
        
        global String indCriptoVirtual;
        @AuraEnabled
        
        global List<Listacorporates> listacorporates;
        @AuraEnabled
        
        global String mailUsuario;
        @AuraEnabled
        
        global String nombreCliente;
        @AuraEnabled
        
        global String nombreFormatoCantidad;
        @AuraEnabled
        
        global String nombreFormatoFecha;
        @AuraEnabled
        
        global String nombreFormatoZona;
        @AuraEnabled
        
        global String nombreUsuario;
        @AuraEnabled
        
        global String telefonoUsuario;
        @AuraEnabled
        
        global String tieneVasco;
        @AuraEnabled
        
        global String tipoUsuario;
        @AuraEnabled
        
        global String token;
        @AuraEnabled
        
        global String UIDModificacion;
        @AuraEnabled
        
        global String ultimoLoginKO;
        @AuraEnabled
        
        global String ultimoLoginOK;
        @AuraEnabled
        
        global String usuarioDumy;
        @AuraEnabled
        
        global String vascoID;

        global Personalsettings() {}
    }
    
    global class Corporates {
        @AuraEnabled
        
        global Integer codigoCorporate;
        @AuraEnabled
        
        global String nombreCorporate;
        @AuraEnabled
        
        global String numDocumento;

        global Corporates() {}
    }
    
    global class Listacorporates {
        @AuraEnabled
        
        global Corporates corporates;
    
        global Listacorporates() {}
    }
    
    
    global static WRAPPER_PersonalSettings parse(String json) {
        return (WRAPPER_PersonalSettings) System.JSON.deserialize(json, WRAPPER_PersonalSettings.class);
    }
    
}