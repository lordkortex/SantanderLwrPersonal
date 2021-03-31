public class WRAPPER_OTV_Omnichannel {
    
	public class OTV_OmnichannelService_PATCH_Declination {
        public String matrixCompanyId;
        public String reason;
        public String description;
        public String status;
    }
    public class OmnichannelServiceUser_PATCH{
        public String companyId;
        public String serviceId;
        public String userId;
        public String productType;
        public String contractId; 
        public String contractType;
        public String bankId;
        public String country;
        public OmnichannelServiceUserData_PATCH omnichannelServiceUserData;
    }
    
    public class OmnichannelServiceUserData_PATCH{
        public String status;
        public String startDate; 
        public String endDate;
    }
    
    
}