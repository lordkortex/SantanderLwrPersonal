public class WRAPPER_OTV_ServiceActivation {
  public class ServiceActivationPath {
    public String service_activation_id;
    public String companyId;
    public String serviceActivacionType;
    public serviceActivationDataPath serviceActivationDataPath;
  }
  public class ServiceActivationDataPath {
    public string status;
  }

  public class ServiceActivationData {
    public String companyId;
    public String serviceActivationType;
    //public String matrixCompanyGlobalId;
  }

  public class ServiceActivationResponse {
    public ServiceActivationId serviceActivationResponse;
  }

  public class ServiceActivationId {
    public String serviceActivationId;
  }
}
