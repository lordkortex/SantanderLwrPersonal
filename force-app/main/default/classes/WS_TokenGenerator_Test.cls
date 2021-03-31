@isTest
public class WS_TokenGenerator_Test {

    @isTest
    static void generateSignatureHeader_Test(){
        WS_TokenGenerator.generateSignatureHeader(null, 'body', 'ES');
        WS_TokenGenerator.generateSignatureHeader('PaymentId', null, 'ES');
    }
}