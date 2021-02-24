public class ControllerTransfersBeneficiaries {
    
     public static ReturnValue getBeneficiaries () {
        ReturnValue response = null;
        try {
			List<WRAPPER_AccountList.AccountDetails> res = ServiceTransfersBeneficiaries.getBeneficiaries();
            
            if(res != null){
                Map<String, Object> value = new Map<String, Object>();
                value.put('result', res);
                response = new ReturnValue(true, value);
            }else{
                throw new CustomException('Error obtaining the server response.');
            }

        } catch (Exception e) {
            System.debug('ControllerTransfersBeneficiaries.getBeneficiaries: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }

}