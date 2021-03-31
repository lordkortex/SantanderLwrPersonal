@isTest
public class ServicePaymentLineTest {
    
    @isTest
    static void main(){
        WRAPPER_PAY_PaymentDraft_Mock paymentDraftMock = new WRAPPER_PAY_PaymentDraft_Mock();
        WRAPPER_PAY_PaymentDraft paymentDraft = paymentDraftMock.internationalInstantPaymentDraft(null);
        System.debug(paymentDraft.destinationAccount);
		System.debug(paymentDraft.destinationAccount.currencyCodeAvailableBalance);
        paymentDraft.paymentCurrency = 'GBP';
		System.debug(paymentDraft.paymentCurrency);
        Map<String,Object> mapa = ServicePaymentLine.getPaymentLine(System.Label.PTT_instant_transfer,paymentDraft);
        mapa = ServicePaymentLine.getPaymentLine(System.Label.PTT_international_transfer_single,paymentDraft);
        paymentDraft.paymentCurrency = 'EUR';
        paymentDraft.destinationAccount.country = 'BR';
        mapa = ServicePaymentLine.getPaymentLine(System.Label.PTT_international_transfer_single,paymentDraft);
    }
    
    @isTest
    static void getProvisionalServiceId_Test()
    {
        ServicePaymentLine.getProvisionalServiceId(ServicePaymentLine.INSTANT_TRANSFER);
        ServicePaymentLine.getProvisionalServiceId(ServicePaymentLine.INTERNATIONAL_TRANSFER_SINGLE);

    }

}