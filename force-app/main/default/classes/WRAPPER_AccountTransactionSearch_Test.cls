@isTest
public with sharing class WRAPPER_AccountTransactionSearch_Test {
    // This test method should give 100% coverage
	static testMethod void testParse() {
		String json = '{'+
		'  \"balances\": {'+
		'    \"transactions\": {'+
		'      \"listaObtTransacciones\": ['+
		'        ['+
		'          {'+
		'            \"obtTransacBusqueda\": {'+
		'              \"aliasCuentaPerfilado\": \"Rocio test     \",'+
		'              \"aliasEntidad\": \"testro         \",'+
		'              \"bookDate\": \"2020-03-26T23:00:00.000Z\",'+
		'              \"codCuenta\": 1367,'+
		'              \"codigoBIC\": {'+
		'                \"branch\": \"XXX\",'+
		'                \"entidadbic\": \"BSCH\",'+
		'                \"locatorbic\": \"SP\",'+
		'                \"paisbic\": \"BR\"'+
		'              },'+
		'              \"cuentaExtracto\": \"2167130018899                                     \",'+
		'              \"descripcion\": \"3625-APLICACAO AUT CONTAMAX EMPRESARIAL                                                                                                                                                                                                                                                                                                                                                                                                     \",'+
		'              \"importe\": -519910.76,'+
		'              \"moneda\": \"BRL\",'+
		'              \"nombreEntidad\": \"BANCO SANTANDER BRASIL\",'+
		'              \"refBanco\": \"                \",'+
		'              \"refCliente\": \"NONREF          \",'+
		'              \"tipoTransaccion\": \"MSC\",'+
		'              \"valueDate\": \"2020-03-26T23:00:00.000Z\"'+
		'            }'+
		'          },'+
		'          {'+
		'            \"obtTransacBusqueda\": {'+
		'              \"aliasCuentaPerfilado\": \"Rocio test     \",'+
		'              \"aliasEntidad\": \"testro         \",'+
		'              \"bookDate\": \"2020-03-26T23:00:00.000Z\",'+
		'              \"codCuenta\": 1367,'+
		'              \"codigoBIC\": {'+
		'                \"branch\": \"XXX\",'+
		'                \"entidadbic\": \"BSCH\",'+
		'                \"locatorbic\": \"SP\",'+
		'                \"paisbic\": \"BR\"'+
		'              },'+
		'              \"cuentaExtracto\": \"2167130018899                                     \",'+
		'              \"descripcion\": \"0466-PAGAMENTO A FORNECEDORES6481732677   - D - 000001                                                                                                                                                                                                                                                                                                                                                                                      \",'+
		'              \"importe\": -360000.0,'+
		'              \"moneda\": \"BRL\",'+
		'              \"nombreEntidad\": \"BANCO SANTANDER BRASIL\",'+
		'              \"refBanco\": \"010327          \",'+
		'              \"refCliente\": \"6481732677      \",'+
		'              \"tipoTransaccion\": \"TRF\",'+
		'              \"valueDate\": \"2020-03-26T23:00:00.000Z\"'+
		'            }'+
		'          }'+
		'        ]'+
		'      ]'+
		'    }'+
		'  }'+
		'}';
		WRAPPER_AccountTransactionSearch r = WRAPPER_AccountTransactionSearch.parse(json);
		System.assert(r != null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_AccountTransactionSearch.Transactions objTransactions = new WRAPPER_AccountTransactionSearch.Transactions(System.JSON.createParser(json));
		System.assert(objTransactions != null);
		System.assert(objTransactions.listaObtTransacciones == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_AccountTransactionSearch objWRAPPER_AccountTransactionSearch = new WRAPPER_AccountTransactionSearch(System.JSON.createParser(json));
		System.assert(objWRAPPER_AccountTransactionSearch != null);
		System.assert(objWRAPPER_AccountTransactionSearch.balances == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_AccountTransactionSearch.CodigoBIC objCodigoBIC = new WRAPPER_AccountTransactionSearch.CodigoBIC(System.JSON.createParser(json));
		System.assert(objCodigoBIC != null);
		System.assert(objCodigoBIC.branch == null);
		System.assert(objCodigoBIC.entidadbic == null);
		System.assert(objCodigoBIC.locatorbic == null);
		System.assert(objCodigoBIC.paisbic == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_AccountTransactionSearch.Balances objBalances = new WRAPPER_AccountTransactionSearch.Balances(System.JSON.createParser(json));
		System.assert(objBalances != null);
		System.assert(objBalances.transactions == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_AccountTransactionSearch.ObtTransacBusqueda objObtTransacBusqueda = new WRAPPER_AccountTransactionSearch.ObtTransacBusqueda(System.JSON.createParser(json));
		System.assert(objObtTransacBusqueda != null);
		System.assert(objObtTransacBusqueda.aliasCuentaPerfilado == null);
		System.assert(objObtTransacBusqueda.aliasEntidad == null);
		System.assert(objObtTransacBusqueda.bookDate == null);
		System.assert(objObtTransacBusqueda.codCuenta == null);
		System.assert(objObtTransacBusqueda.codigoBIC == null);
		System.assert(objObtTransacBusqueda.cuentaExtracto == null);
		System.assert(objObtTransacBusqueda.descripcion == null);
		System.assert(objObtTransacBusqueda.importe == null);
		System.assert(objObtTransacBusqueda.moneda == null);
		System.assert(objObtTransacBusqueda.nombreEntidad == null);
		System.assert(objObtTransacBusqueda.refBanco == null);
		System.assert(objObtTransacBusqueda.refCliente == null);
		System.assert(objObtTransacBusqueda.tipoTransaccion == null);
		System.assert(objObtTransacBusqueda.valueDate == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_AccountTransactionSearch.ListaObtTransacciones objListaObtTransacciones = new WRAPPER_AccountTransactionSearch.ListaObtTransacciones(System.JSON.createParser(json));
		System.assert(objListaObtTransacciones != null);
		System.assert(objListaObtTransacciones.obtTransacBusqueda == null);
	}
}