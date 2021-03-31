@IsTest
public class WRAPPER_ChannelAccessAgreement_Test {
	
	static testMethod void testParse() {
		String json = '{'+
		'    \"agreementsListResponse\": {'+
		'        \"agreementsList\": ['+
		'            {'+
		'                \"agreementsDataDetails\": {'+
		'                    \"businessType\": \"a\",'+
		'                    \"channelAccessAgreementId\": \"a\",'+
		'                    \"channelAccessAgreementStatus\": \"a\",'+
		'                    \"setUpDate\": \"a\",'+
		'                    \"cancellationDate\": \"a\",'+
		'                    \"documentId\": {'+
		'                        \"documentType\": \"A\",'+
		'                        \"documentNumber\": \"a\"'+
		'                    },'+
		'                    \"holderName\": \"a\",'+
		'                    \"customerId\": \"a\"'+
		'                }'+
		'            }'+
		'        ]'+
		'    }'+
		'}';
		WRAPPER_ChannelAccessAgreement obj = WRAPPER_ChannelAccessAgreement.parse(json);
		System.assert(obj != null);
	}
}