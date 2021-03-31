/*----------------------------------------------------------------------------------
Author:         Guillermo Giral
Company:        Deloitte
Description:    Wrapper class to retrieve and give format the filter list
Test Class:     WRAPPER_TransactionSearch_Test
History
<Date>			<Author>		    <Description>
17/03/2020		Guillermo Giral     Initial version
----------------------------------------------------------------------------------*/
global class WRAPPER_TransactionSearch {
    
    global WRAPPER_TransactionSearch() {
        System.debug('WRAPPER_TransactionSearch');
    }
    
    global class Transactions {
        @AuraEnabled global Integer NUM_PAGINA;
        @AuraEnabled global Integer totalRegistros;
        @AuraEnabled global Integer totalPaginas;
        @AuraEnabled global List<ObtTransacBusqueda_Z> obtTransacBusqueda;
        
        global Transactions() {
            System.debug('WRAPPER_TransactionSearch.Transactions');
        }
    }
    
    global class CodigoBIC {
        @AuraEnabled global String branch;
        @AuraEnabled global String entidadbic;
        @AuraEnabled global String locatorbic;
        @AuraEnabled global String paisbic;
        /*@AuraEnabled global String BRANCH;
@AuraEnabled global String ENTIDAD_BIC;
@AuraEnabled global String LOCATOR_BIC;
@AuraEnabled global String PAIS_BIC;*/
        
        global CodigoBIC() {
            System.debug('WRAPPER_TransactionSearch.CodigoBIC');
        }
    }
    
    global class ObtTransacBusqueda_Z {
        @AuraEnabled global ObtTransacBusqueda obtTransacBusqueda;
        
        global ObtTransacBusqueda_Z() {
            System.debug('WRAPPER_TransactionSearch.ObtTransacBusqueda_Z');
        }
    }
    
    global class Balances {
        @AuraEnabled global Transactions transactions;
        
        global Balances() {
            System.debug('WRAPPER_TransactionSearch.Balances');
        }
    }
    
    global class ObtTransacBusqueda {
        @AuraEnabled global String aliasCuentaPerfilado;
        @AuraEnabled global String aliasEntidad;
        @AuraEnabled global String bookDate;
        @AuraEnabled global String formattedBookDate;
        @AuraEnabled global Integer codCuenta;
        @AuraEnabled global CodigoBIC codigoBIC;
        @AuraEnabled global String cuentaExtracto;
        @AuraEnabled global String descripcion;
        @AuraEnabled global Double importe;
        @AuraEnabled global String moneda;
        @AuraEnabled global String nombreEntidad;
        @AuraEnabled global String refBanco;
        @AuraEnabled global String transactionCategory;
        @AuraEnabled global String refCliente;
        @AuraEnabled global String tipoTransaccion;
        @AuraEnabled global String valueDate;
        @AuraEnabled global String formattedValueDate;
        @AuraEnabled global String importeString;
        @AuraEnabled global String importeEntero;
        @AuraEnabled global String importeDecimal;
        
        //AM - 11/11/2020 - US6421: Campos Nuevos Nexus
        @AuraEnabled global String aditionalInformation;
        @AuraEnabled global String customerAditionalInformation;
        
        //AM - 11/11/2020 - US7687: Campos MT940
        @AuraEnabled global String customerTCode; //Local Code
        @AuraEnabled global String ltcDescription {get;set;}
        @AuraEnabled global String customerTDescription;
        @AuraEnabled global String ltcCode; //Local Code
        @AuraEnabled global String transactionConsolidated;
        @AuraEnabled global String transactionBatchReference;
        
        global ObtTransacBusqueda() {
            System.debug('WRAPPER_TransactionSearch.ObtTransacBusqueda');
        }
    }
    
    @AuraEnabled global Balances balances;
    
    
    global static WRAPPER_TransactionSearch parse(String json) {
        return (WRAPPER_TransactionSearch) System.JSON.deserialize(json, WRAPPER_TransactionSearch.class);
    }
}