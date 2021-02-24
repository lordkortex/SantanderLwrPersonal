@isTest
public with sharing class WRAPPER_OneTrade_AccTrans_Test {
    static testMethod void testParse() {
		String json = '{'+
		'    \"balances\": {'+
		'        \"transactions\": {'+
		'            \"totalRegistros\": 10000,'+
		'            \"listaObtTransacciones\": ['+
		'                {'+
		'                    \"obtTransacBusqueda\": {'+
		'                        \"importe\": 5.0,'+
		'                        \"tipoTransaccion\": null,'+
		'                        \"refCliente\": null,'+
		'                        \"refBanco\": null,'+
		'                        \"descripcion\": \"TAR SERV ESPEC CASH/SUPERCASH\",'+
		'                        \"ltcCode\": null,'+
		'                        \"ltcDescription\": null,'+
		'                        \"transactionBatchReference\": null,'+
		'                        \"valueDate\": \"2020-08-13T00:00:00.000+0000\",'+
		'                        \"bookDate\": null,'+
		'                        \"moneda\": \"BRL\"'+
		'                    }'+
		'                },'+
		'                {'+
		'                    \"obtTransacBusqueda\": {'+
		'                        \"importe\": 280.68,'+
		'                        \"tipoTransaccion\": null,'+
		'                        \"refCliente\": null,'+
		'                        \"refBanco\": null,'+
		'                        \"descripcion\": \"ESTORNO DE SEGURO\",'+
		'                        \"ltcCode\": \"466758\",'+
		'                        \"ltcDescription\": \"ESTORNO DE SEGURO\",'+
		'                        \"transactionBatchReference\": null,'+
		'                        \"valueDate\": \"2020-08-12T00:00:00.000+0000\",'+
		'                        \"bookDate\": null,'+
		'                        \"moneda\": \"BRL\"'+
		'                    }'+
		'                },'+
		'                {'+
		'                    \"obtTransacBusqueda\": {'+
		'                        \"importe\": 51.9,'+
		'                        \"tipoTransaccion\": null,'+
		'                        \"refCliente\": null,'+
		'                        \"refBanco\": null,'+
		'                        \"descripcion\": \"TARIFA DE MANUT MENSAL C/C ATIVA   10/08/2020\",'+
		'                        \"ltcCode\": null,'+
		'                        \"ltcDescription\": null,'+
		'                        \"transactionBatchReference\": null,'+
		'                        \"valueDate\": \"2020-08-12T00:00:00.000+0000\",'+
		'                        \"bookDate\": null,'+
		'                        \"moneda\": \"BRL\"'+
		'                    }'+
		'                },'+
		'                {'+
		'                    \"obtTransacBusqueda\": {'+
		'                        \"importe\": 888.88,'+
		'                        \"tipoTransaccion\": null,'+
		'                        \"refCliente\": null,'+
		'                        \"refBanco\": null,'+
		'                        \"descripcion\": \"APLICACAO FIC FI FINANCAS PUBLICAS\",'+
		'                        \"ltcCode\": null,'+
		'                        \"ltcDescription\": null,'+
		'                        \"transactionBatchReference\": null,'+
		'                        \"valueDate\": \"2020-08-06T00:00:00.000+0000\",'+
		'                        \"bookDate\": null,'+
		'                        \"moneda\": \"BRL\"'+
		'                    }'+
		'                },'+
		'                {'+
		'                    \"obtTransacBusqueda\": {'+
		'                        \"importe\": 99.0,'+
		'                        \"tipoTransaccion\": null,'+
		'                        \"refCliente\": null,'+
		'                        \"refBanco\": null,'+
		'                        \"descripcion\": \"TAR EXTRATO CONCILIACAO BANCARIA\",'+
		'                        \"ltcCode\": \"877119\",'+
		'                        \"ltcDescription\": \"TAR EXTRATO CONCILIACAO BANCARIA\",'+
		'                        \"transactionBatchReference\": null,'+
		'                        \"valueDate\": \"2020-08-06T00:00:00.000+0000\",'+
		'                        \"bookDate\": null,'+
		'                        \"moneda\": \"BRL\"'+
		'                    }'+
		'                },'+
		'                {'+
		'                    \"obtTransacBusqueda\": {'+
		'                        \"importe\": 0.01,'+
		'                        \"tipoTransaccion\": \"MSC\",'+
		'                        \"refCliente\": \"NONREF\",'+
		'                        \"refBanco\": null,'+
		'                        \"descripcion\": \"Dummy movement info WOW 1!,Dummy movement info WOW 2!,Dummy movement info WOW 3!,Dummy movement info WOW 4!,Dummy movement info WOW 5!,Dummy movement info WOW 6!\",'+
		'                        \"ltcCode\": null,'+
		'                        \"ltcDescription\": null,'+
		'                        \"transactionBatchReference\": null,'+
		'                        \"valueDate\": \"2019-12-07T22:00:00.000+0000\",'+
		'                        \"bookDate\": \"2019-12-07T22:00:00.000+0000\",'+
		'                        \"moneda\": \"BRL\"'+
		'                    }'+
		'                }'+
		'            ]'+
		'        }'+
		'    }'+
		'}';
		WRAPPER_OneTrade_AccTransactions obj = WRAPPER_OneTrade_AccTransactions.parse(json);
		System.assert(obj != null);
	}
}