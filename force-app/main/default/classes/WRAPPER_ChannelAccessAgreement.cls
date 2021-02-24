public class WRAPPER_ChannelAccessAgreement {

	public AgreementsListResponse agreementsListResponse;

	public class DocumentId {
		public String documentType;
		public String documentNumber;
	}

	public class AgreementsDataDetails {
		public String businessType;
		public String channelAccessAgreementId;
		public String channelAccessAgreementStatus;
		public String setUpDate;
		public String cancellationDate;
		public DocumentId documentId;
		public String holderName;
		public String customerId;
	}

	public class AgreementsList {
		public AgreementsDataDetails agreementsDataDetails;
	}

	public class AgreementsListResponse {
		public List<AgreementsList> agreementsList;
	}

	
	public static WRAPPER_ChannelAccessAgreement parse(String json) {
		return (WRAPPER_ChannelAccessAgreement) System.JSON.deserialize(json, WRAPPER_ChannelAccessAgreement.class);
	}
}