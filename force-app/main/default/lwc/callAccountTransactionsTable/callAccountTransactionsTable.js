import { LightningElement } from 'lwc';

export default class CallAccountTransactionsTable extends LightningElement {
    accountDetails = {"accountName":"CORPMUCHASCORPP00101","accountNumber":"0000005000351504ARS","bank":"BANCO SANTANDER RIO S.A.","bookBalance":"0","availableBalance":"0","accountCurrency":"undefined","accountAlias":"","idType":"BBA","country":"AR","bankAlias":"BANCO SANTANDER RIO S.A.","bic":"BSCH","accountCode":"undefined","bookDate":"undefined","codigoBic":"BSCHARBAXXX","codigoEmisora":"undefined","aliasEntidad":"undefined","codigoCuenta":"undefined","countryName":"Argentina","status":"H","finalCodigoBic":"BSCHARBAXXX"};
    filters = [];
    dates = [];
    sortBookDate = "desc";
    currentPage = 1;
    listOfPages = []
    sortamount = "desc";
    sortCategory = "desc";
    selectedFilters = [];
    maximumRecords = 3;
    userPreferredDateFormat
    userPreferredNumberFormat
    selectedTimeframe = "Select One";
    formFilters = {};
    isIAM 
    listOfPages = [];
    currentPageNumber = 1;
    transactionResults = [{"obtTransacBusqueda":{"bookDate":"2020-11-12T00:00:00.000+0000","descripcion":"PAGO A PROVEED ACRED SANTANDER RIO","formattedBookDate":"12/11/2020","formattedValueDate":"12/11/2020","importe":-240,"importeDecimal":",00","importeEntero":"-240","importeString":"-240,00","ltcCode":"1858","ltcDescription":"PAGO A PROVEED ACRED SANTANDER RIO","moneda":"ARS","refBanco":"MOV-000000003","refCliente":"2020111206774199","tipoTransaccion":"TRF","transactionBatchReference":"2020111206774199","valueDate":"2020-11-12T00:00:00.000+0000"}},{"obtTransacBusqueda":{"bookDate":"2020-11-11T00:00:00.000+0000","descripcion":"PAGO A PROVEED ACRED SANTANDER RIO","formattedBookDate":"11/11/2020","formattedValueDate":"11/11/2020","importe":-240,"importeDecimal":",00","importeEntero":"-240","importeString":"-240,00","ltcCode":"1858","ltcDescription":"PAGO A PROVEED ACRED SANTANDER RIO","moneda":"ARS","refBanco":"MOV-000000004","refCliente":"2020111106774201","tipoTransaccion":"TRF","transactionBatchReference":"2020111106774201","valueDate":"2020-11-11T00:00:00.000+0000"}},{"obtTransacBusqueda":{"bookDate":"2020-10-28T00:00:00.000+0000","descripcion":"TRANSFERENCIA POR SISTEMA MEP","formattedBookDate":"28/10/2020","formattedValueDate":"28/10/2020","importe":-240,"importeDecimal":",00","importeEntero":"-240","importeString":"-240,00","ltcCode":"0444","ltcDescription":"TRANSFERENCIA POR SISTEMA MEP","moneda":"ARS","refBanco":"MOV-000000002","refCliente":"2020102806773116","tipoTransaccion":"TRF","transactionBatchReference":"2020102806773116","valueDate":"2020-10-28T00:00:00.000+0000"}}];

}