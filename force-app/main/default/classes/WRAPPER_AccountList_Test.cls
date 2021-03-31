/*----------------------------------------------------------------------------------
Author:         R. Cervino
Company:        Deloitte
Description:    Test class of Wrapper_Currency
History
<Date>			<Author>		<Description>
31/03/2020		R. Cervino    	Initial version
23/02/2021		Andrea Martin   Add new fields 

----------------------------------------------------------------------------------*/
@isTest
public class WRAPPER_AccountList_Test {
    @isTest
    static void testUtil (){
        WRAPPER_AccountList.LastestTransaction wcTest = new WRAPPER_AccountList.LastestTransaction();
        wcTest.transactionId = '987655433';
        wcTest.creationDate = 'test';
        wcTest.processedDate = 'test';
        wcTest.accountingDate = 'test';
        wcTest.transactionType = 'test';
        wcTest.transactionCategory = 'test';
        wcTest.amount = 10.0;
        wcTest.description='test';
        wcTest.currencyCode = 'EUR';
        List<WRAPPER_AccountList.LastestTransaction> auc = new List<WRAPPER_AccountList.LastestTransaction>();
        auc.add(wcTest);
        
        WRAPPER_AccountList.Address wsTestAddress = new WRAPPER_AccountList.Address();
        wsTestAddress.country= 'test';
        wsTestAddress.streetName= 'test';
        wsTestAddress.townName= 'test';
        wsTestAddress.floor = 'test';
        wsTestAddress.state = 'test';
        wsTestAddress.province = 'test';
        wsTestAddress.addressAddition = 'test';

        WRAPPER_AccountList.CreditorDocument creditorDocument = new  WRAPPER_AccountList.CreditorDocument();
        creditorDocument.documentNumber = 'test';
        creditorDocument.documentType = 'test';
        
        WRAPPER_AccountList.AccountDetails wcTestACCList = new WRAPPER_AccountList.AccountDetails();
        
		wcTestACCList.accountId='test';
		wcTestACCList.mandatoryPurpose=true;     
		wcTestACCList.displayNumber='test';
        wcTestACCList.parentCustomerName='test';
		wcTestACCList.alias='test';
		wcTestACCList.type='test';
		wcTestACCList.description='test';
		wcTestACCList.status='test';
		wcTestACCList.customerId='test';
        wcTestACCList.country = 'test';
        wcTestACCList.favorite = true;
        wcTestACCList.address= wsTestAddress;
		wcTestACCList.lastTransaction='test';
		wcTestACCList.amountMainBalance=10.0;
		wcTestACCList.currencyCodeMainBalance='test';
		wcTestACCList.lastupdateMainBalance='test';
		wcTestACCList.amountAvailableBalance=10.0;
		wcTestACCList.currencyCodeAvailableBalance='test';
		wcTestACCList.lastUpdateAvailableBalance='test';
        wcTestACCList.lastUpdateAvailableBalanceMain='test';
		wcTestACCList.amountWithholdingBalance=10.0;
		wcTestACCList.currencyCodeWithholdingBalance='test';
		wcTestACCList.lastudpateWithholdingBalance='test';
		wcTestACCList.amountOverdraftLimit=10.0;

		wcTestACCList.currencycodeOverdraftLimit='test';
		wcTestACCList.lastUpdateOverdraftLimit='test';
		wcTestACCList.bic='test';
		wcTestACCList.bankName='test';
		wcTestACCList.valueDate='test';
		wcTestACCList.aliasEntidad='test';
		wcTestACCList.subsidiaryName='test';
		wcTestACCList.countryName='test';
		wcTestACCList.branch='test';
		wcTestACCList.locatorbic='test';
		wcTestACCList.paisbic='test';
		wcTestACCList.codigoCorporate='test';
		wcTestACCList.codigoCuenta='test';
		wcTestACCList.transactionList=auc;
		wcTestACCList.internationalPaymentsAllowed=true;
		wcTestACCList.hasSwiftPayment='true';
		wcTestACCList.hasSwiftPayments='tru';
		wcTestACCList.idType='test';
		wcTestACCList.codigoEmisora='test';
		wcTestACCList.codigoBic='test';
        wcTestACCList.aliasCuentaPerfilado= 'test';
        wcTestACCList.balanceAllowed=true;
        wcTestACCList.transactionsAllowed=true;
        wcTestACCList.companyIdsList=null;
        wcTestACCList.dataProvider='test';
        wcTestACCList.associatedAccountList=null;
        wcTestACCList.creditorDocument = creditorDocument;
        
    List<WRAPPER_AccountList.AccountDetails> accountsList = new List<WRAPPER_AccountList.AccountDetails>();
        accountsList.add(wcTestACCList);
        
    
    WRAPPER_AccountList.TipoDeCambio wcTestTipoCambio = new WRAPPER_AccountList.TipoDeCambio();
    wcTestTipoCambio.claError='test';
    wcTestTipoCambio.divisa='test';
    wcTestTipoCambio.fecha='test';
    wcTestTipoCambio.tipError='test';
    wcTestTipoCambio.importeDecimal=1.0;
    wcTestTipoCambio.importe=1.0;
    wcTestTipoCambio.nombreDivisa='test';
	List<WRAPPER_AccountList.TipoDeCambio> tipoDeCambio = new List<WRAPPER_AccountList.TipoDeCambio>();
    tipoDeCambio.add(wcTestTipoCambio);
        
        
    WRAPPER_AccountList wAccountList = new WRAPPER_AccountList();
       
    }
}