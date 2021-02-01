/*----------------------------------------------------------------------------------
Author:         Guillermo Giral
Company:        Deloitte
Description:    Wrapper class to retrieve and give format the filter list
Test Class:     WRAPPER_TransactionSearch_Test
History
<Date>			<Author>		    <Description>
17/03/2020		Guillermo Giral     Initial version
----------------------------------------------------------------------------------*/
public class WRAPPER_TransactionSearch {

	public class Transactions {
		@AuraEnabled public Integer NUM_PAGINA;
		@AuraEnabled public Integer totalRegistros;
		@AuraEnabled public Integer totalPaginas;
		@AuraEnabled public List<ObtTransacBusqueda_Z> obtTransacBusqueda;
	}

	public class CodigoBIC {
		@AuraEnabled public String branch;
		@AuraEnabled public String entidadbic;
		@AuraEnabled public String locatorbic;
		@AuraEnabled public String paisbic;
		/*@AuraEnabled public String BRANCH;
		@AuraEnabled public String ENTIDAD_BIC;
		@AuraEnabled public String LOCATOR_BIC;
		@AuraEnabled public String PAIS_BIC;*/
	}

	public class ObtTransacBusqueda_Z {
		@AuraEnabled public ObtTransacBusqueda obtTransacBusqueda;
	}

	public class Balances {
		@AuraEnabled public Transactions transactions;
	}

	public class ObtTransacBusqueda {
		@AuraEnabled public String aliasCuentaPerfilado;
		@AuraEnabled public String aliasEntidad;
		@AuraEnabled public String bookDate;
        @AuraEnabled public String formattedBookDate;
		@AuraEnabled public Integer codCuenta;
		@AuraEnabled public CodigoBIC codigoBIC;
		@AuraEnabled public String cuentaExtracto;
		@AuraEnabled public String descripcion;
		@AuraEnabled public Double importe;
		@AuraEnabled public String moneda;
		@AuraEnabled public String nombreEntidad;
		@AuraEnabled public String refBanco;
		@AuraEnabled public String transactionCategory;
		@AuraEnabled public String refCliente;
		@AuraEnabled public String tipoTransaccion;
		@AuraEnabled public String valueDate;
        @AuraEnabled public String formattedValueDate;
		@AuraEnabled public String importeString;
		@AuraEnabled public String importeEntero;
		@AuraEnabled public String importeDecimal;
        
        //AM - 11/11/2020 - US6421: Campos Nuevos Nexus
		@AuraEnabled public String aditionalInformation;
		@AuraEnabled public String customerAditionalInformation;
		
		//AM - 11/11/2020 - US7687: Campos MT940
		@AuraEnabled public String customerTCode; //Local Code
        @AuraEnabled public String ltcDescription;
		@AuraEnabled public String customerTDescription;
		@AuraEnabled public String ltcCode; //Local Code
		@AuraEnabled public String transactionConsolidated;
		@AuraEnabled public String transactionBatchReference;
	}

	@AuraEnabled public Balances balances;

	
	public static WRAPPER_TransactionSearch parse(String json) {
		return (WRAPPER_TransactionSearch) System.JSON.deserialize(json, WRAPPER_TransactionSearch.class);
	}
}