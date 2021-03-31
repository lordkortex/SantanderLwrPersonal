public class CNT_VAMParent {
    
    @AuraEnabled
    public static ReturnValue getVirtualAccounts(){
        return TRS_ControllerVAM.retrieveVirtualAccountsList();
    } 
}