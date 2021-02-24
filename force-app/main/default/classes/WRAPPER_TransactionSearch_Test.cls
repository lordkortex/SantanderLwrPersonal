/*----------------------------------------------------------------------------------
Author:         Guillermo Giral
Company:        Deloitte
Description:    Test class for WRAPPER_TransactionSearch
History
<Date>			<Author>		    <Description>
17/03/2020		Guillermo Giral     Initial version
----------------------------------------------------------------------------------*/
@IsTest
public class WRAPPER_TransactionSearch_Test {
	
	// This test method should give 100% coverage
	static testMethod void testParse() {
		String json = '{'+
		'  \"balances\": {'+
		'    \"transactions\": {'+
		'      \"NUM_PAGINA\": 2,'+
		'      \"totalRegistros\": 6,'+
		'      \"totalPaginas\": 1,'+
		'      \"obtTransacBusqueda\": ['+
		'        {'+
		'          \"obtTransacBusqueda\": {'+
		'            \"aliasCuentaPerfilado\": \"Alias 04       \",'+
		'            \"aliasEntidad\": \"testjueves04   \",'+
		'            \"bookDate\": \"2020-05-19T22:00:00.000Z\",'+
		'            \"codCuenta\": 1373,'+
		'            \"codigoBIC\": {'+
		'              \"branch\": \"   \",'+
		'              \"entidadbic\": \"    \",'+
		'              \"locatorbic\": \"  \",'+
		'              \"paisbic\": \"  \"'+
		'            },'+
		'            \"cuentaExtracto\": \"ES0200491500082119349999                          \",'+
		'            \"descripcion\": \"TRANSFERENCIA A FAVOR DE HAPAG-LLOYD, REFERENCIA 0049 1500 696 0CJJJ24//  000000000000 HAPAG-LLOYD                                                                                                                                                                                                                                                                                                                                          \",'+
		'            \"importe\": -15048.99,'+
		'            \"moneda\": \"USD\",'+
		'            \"nombreEntidad\": \"BANCO SANTANDER ESPANHA\",'+
		'            \"refBanco\": \"614 04 EM. TRANS\",'+
		'            \"transactionCategory\": null,'+
		'            \"refCliente\": \"NONREF          \",'+
		'            \"swiftCode\": null,'+
		'            \"tipoTransaccion\": \"TRF\",'+
		'            \"valueDate\": \"2020-05-19T22:00:00.000Z\"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"obtTransacBusqueda\": {'+
		'            \"aliasCuentaPerfilado\": \"Alias 04       \",'+
		'            \"aliasEntidad\": \"testjueves04   \",'+
		'            \"bookDate\": \"2020-03-25T23:00:00.000Z\",'+
		'            \"codCuenta\": 1373,'+
		'            \"codigoBIC\": {'+
		'              \"branch\": \"   \",'+
		'              \"entidadbic\": \"    \",'+
		'              \"locatorbic\": \"  \",'+
		'              \"paisbic\": \"  \"'+
		'            },'+
		'            \"cuentaExtracto\": \"ES0200491500082119349999                          \",'+
		'            \"descripcion\": \"TRANSFERENCIA SEGUNDO MOVIMIENTO NUEVO                                                                                                                                                                                                                                                                                                                                                                                                      \",'+
		'            \"importe\": 15048.99,'+
		'            \"moneda\": \"USD\",'+
		'            \"nombreEntidad\": \"BANCO SANTANDER ESPANHA\",'+
		'            \"refBanco\": \"614 04 EM. TRANS\",'+
		'            \"transactionCategory\": null,'+
		'            \"refCliente\": \"NONREF          \",'+
		'            \"swiftCode\": null,'+
		'            \"tipoTransaccion\": \"TRF\",'+
		'            \"valueDate\": \"2020-03-25T23:00:00.000Z\"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"obtTransacBusqueda\": {'+
		'            \"aliasCuentaPerfilado\": \"Alias 04       \",'+
		'            \"aliasEntidad\": \"testjueves04   \",'+
		'            \"bookDate\": \"2020-03-25T23:00:00.000Z\",'+
		'            \"codCuenta\": 1373,'+
		'            \"codigoBIC\": {'+
		'              \"branch\": \"   \",'+
		'              \"entidadbic\": \"    \",'+
		'              \"locatorbic\": \"  \",'+
		'              \"paisbic\": \"  \"'+
		'            },'+
		'            \"cuentaExtracto\": \"ES0200491500082119349999                          \",'+
		'            \"descripcion\": \"PRIMER MOVIMIENTO NUEVO                                                                                                                                                                                                                                                                                                                                                                                                                     \",'+
		'            \"importe\": -15048.99,'+
		'            \"moneda\": \"USD\",'+
		'            \"nombreEntidad\": \"BANCO SANTANDER ESPANHA\",'+
		'            \"refBanco\": \"614 04 EM. TRANS\",'+
		'            \"transactionCategory\": null,'+
		'            \"refCliente\": \"NONREF          \",'+
		'            \"swiftCode\": null,'+
		'            \"tipoTransaccion\": \"TRF\",'+
		'            \"valueDate\": \"2020-03-25T23:00:00.000Z\"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"obtTransacBusqueda\": {'+
		'            \"aliasCuentaPerfilado\": \"Alias 04       \",'+
		'            \"aliasEntidad\": \"testjueves04   \",'+
		'            \"bookDate\": \"2020-03-25T23:00:00.000Z\",'+
		'            \"codCuenta\": 1373,'+
		'            \"codigoBIC\": {'+
		'              \"branch\": \"   \",'+
		'              \"entidadbic\": \"    \",'+
		'              \"locatorbic\": \"  \",'+
		'              \"paisbic\": \"  \"'+
		'            },'+
		'            \"cuentaExtracto\": \"ES0200491500082119349999                          \",'+
		'            \"descripcion\": \"TRANSFERENCIA A FAVOR DE HAPAG-LLOYD, REFERENCIA 0049 1500 696 0CJJJ24//  000000000000 HAPAG-LLOYD                                                                                                                                                                                                                                                                                                                                          \",'+
		'            \"importe\": -15048.99,'+
		'            \"moneda\": \"USD\",'+
		'            \"nombreEntidad\": \"BANCO SANTANDER ESPANHA\",'+
		'            \"refBanco\": \"614 04 EM. TRANS\",'+
		'            \"transactionCategory\": null,'+
		'            \"refCliente\": \"NONREF          \",'+
		'            \"swiftCode\": null,'+
		'            \"tipoTransaccion\": \"TRF\",'+
		'            \"valueDate\": \"2020-03-25T23:00:00.000Z\"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"obtTransacBusqueda\": {'+
		'            \"aliasCuentaPerfilado\": \"Alias 04       \",'+
		'            \"aliasEntidad\": \"testjueves04   \",'+
		'            \"bookDate\": \"2020-03-24T23:00:00.000Z\",'+
		'            \"codCuenta\": 1373,'+
		'            \"codigoBIC\": {'+
		'              \"branch\": \"   \",'+
		'              \"entidadbic\": \"    \",'+
		'              \"locatorbic\": \"  \",'+
		'              \"paisbic\": \"  \"'+
		'            },'+
		'            \"cuentaExtracto\": \"ES0200491500082119349999                          \",'+
		'            \"descripcion\": \"TRANSFERENCIA A FAVOR DE BOLLORE LOGISTICS BANGLADESH LTD, REFERENCIA 0049 1500 696 0CJIG07//  000000000000 BOLLORE LOGISTIC                                                                                                                                                                                                                                                                                                                \",'+
		'            \"importe\": -5840.93,'+
		'            \"moneda\": \"USD\",'+
		'            \"nombreEntidad\": \"BANCO SANTANDER ESPANHA\",'+
		'            \"refBanco\": \"614 04 EM. TRANS\",'+
		'            \"transactionCategory\": null,'+
		'            \"refCliente\": \"NONREF          \",'+
		'            \"swiftCode\": null,'+
		'            \"tipoTransaccion\": \"TRF\",'+
		'            \"valueDate\": \"2020-03-24T23:00:00.000Z\"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"obtTransacBusqueda\": {'+
		'            \"aliasCuentaPerfilado\": \"Alias 04       \",'+
		'            \"aliasEntidad\": \"testjueves04   \",'+
		'            \"bookDate\": \"2020-03-23T23:00:00.000Z\",'+
		'            \"codCuenta\": 1373,'+
		'            \"codigoBIC\": {'+
		'              \"branch\": \"   \",'+
		'              \"entidadbic\": \"    \",'+
		'              \"locatorbic\": \"  \",'+
		'              \"paisbic\": \"  \"'+
		'            },'+
		'            \"cuentaExtracto\": \"ES0200491500082119349999                          \",'+
		'            \"descripcion\": \"TRANSFERENCIA A FAVOR DE ORIENT OVERSEAS CONTAINER LINE, REFERENCIA 0049 1500 696 0CJIG12//  000000000000 ORIENT OVERSEAS                                                                                                                                                                                                                                                                                                                   \",'+
		'            \"importe\": -6575.73,'+
		'            \"moneda\": \"USD\",'+
		'            \"nombreEntidad\": \"BANCO SANTANDER ESPANHA\",'+
		'            \"refBanco\": \"614 04 EM. TRANS\",'+
		'            \"transactionCategory\": null,'+
		'            \"refCliente\": \"NONREF          \",'+
		'            \"swiftCode\": null,'+
		'            \"tipoTransaccion\": \"TRF\",'+
		'            \"valueDate\": \"2020-03-23T23:00:00.000Z\"'+
		'          }'+
		'        }'+
		'      ]'+
		'    }'+
		'  }'+
		'}';
		WRAPPER_TransactionSearch obj = WRAPPER_TransactionSearch.parse(json);
		System.assert(obj != null);
	}
}