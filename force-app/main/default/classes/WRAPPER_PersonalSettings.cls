/*----------------------------------------------------------------------------------
Author:         R. Cervino
Company:        Deloitte
Description:    Personal Settings  wrapper
Test Class:     WRAPPER_PersonalSettings_Test
History
<Date>			<Author>		<Description>
06/04/2020		R. Cervino     Initial version
----------------------------------------------------------------------------------*/
public class WRAPPER_PersonalSettings {
    public class Idioma {
        @AuraEnabled
        
        public String IDIOMA_ISO;
        @AuraEnabled
        
        public String DIALECTO_ISO;
    }
    @AuraEnabled
    
    public Personalsettings personalsettings;
    
    public class Personalsettings {
        @AuraEnabled
        
        public String apellidosUsuario;
        @AuraEnabled
        
        public String backoffice;
        @AuraEnabled
        
        public String checkMovil;
        @AuraEnabled
        
        public Integer codigoCliente;
        @AuraEnabled
        
        public String codigoErc;
        @AuraEnabled
        
        public String codigoFormatoCantidad;
        @AuraEnabled
        
        public String codigoFormatoFecha;
        @AuraEnabled
        
        public String codigoFormatoZona;
        @AuraEnabled
        
        public String dataCript;
        @AuraEnabled
        
        public String direccionUsuario;
        @AuraEnabled
        
        public String estado;
        @AuraEnabled
        
        public String fechaModificacion;
        @AuraEnabled
        
        public String idLogin;
        @AuraEnabled
        
        public String idToken;
        @AuraEnabled
        
        public Idioma idioma;
        @AuraEnabled
        
        public String indAprob;
        @AuraEnabled
        
        public String indCriptoVirtual;
        @AuraEnabled
        
        public List<Listacorporates> listacorporates;
        @AuraEnabled
        
        public String mailUsuario;
        @AuraEnabled
        
        public String nombreCliente;
        @AuraEnabled
        
        public String nombreFormatoCantidad;
        @AuraEnabled
        
        public String nombreFormatoFecha;
        @AuraEnabled
        
        public String nombreFormatoZona;
        @AuraEnabled
        
        public String nombreUsuario;
        @AuraEnabled
        
        public String telefonoUsuario;
        @AuraEnabled
        
        public String tieneVasco;
        @AuraEnabled
        
        public String tipoUsuario;
        @AuraEnabled
        
        public String token;
        @AuraEnabled
        
        public String UIDModificacion;
        @AuraEnabled
        
        public String ultimoLoginKO;
        @AuraEnabled
        
        public String ultimoLoginOK;
        @AuraEnabled
        
        public String usuarioDumy;
        @AuraEnabled
        
        public String vascoID;
    }
    
    public class Corporates {
        @AuraEnabled
        
        public Integer codigoCorporate;
        @AuraEnabled
        
        public String nombreCorporate;
        @AuraEnabled
        
        public String numDocumento;
    }
    
    public class Listacorporates {
        @AuraEnabled
        
        public Corporates corporates;
    }
    
    
    public static WRAPPER_PersonalSettings parse(String json) {
        return (WRAPPER_PersonalSettings) System.JSON.deserialize(json, WRAPPER_PersonalSettings.class);
    }
    
}