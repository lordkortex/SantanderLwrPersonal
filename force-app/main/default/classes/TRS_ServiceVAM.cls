global with sharing class TRS_ServiceVAM {

    global static WS_TRS_VAM.OUTPUT retrieveList (String country) {
        WS_TRS_VAM.OUTPUT res = null;
        try {
            WS_TRS_VAM.INPUT input = new WS_TRS_VAM.INPUT();
            input.country = country;			            
            res = WS_TRS_VAM.execute(input, 'GetList');
        } catch (Exception e) {
            System.debug('TRS_ServiceVAM.retrieveList: ' + e.getMessage() + ' in line ' + e.getLineNumber());
            throw new CustomException('TRS_ServiceVAM.retrieveList: ' + e.getMessage() + ' in line ' + e.getLineNumber());
        }
        return res;
    }
    
    global static WS_TRS_VAM.OUTPUT retrieveAccount (String vamAccount) {
        WS_TRS_VAM.OUTPUT res = null;
        try {
            WS_TRS_VAM.INPUT input = new WS_TRS_VAM.INPUT();
            input.vamAccount = vamAccount;			       
            res = WS_TRS_VAM.execute(input, 'GetAccount');
        } catch (Exception e) {
            System.debug('TRS_ServiceVAM.retrieveAccount: ' + e.getMessage() + ' in line ' + e.getLineNumber());
            throw new CustomException('TRS_ServiceVAM.retrieveAccount: ' + e.getMessage() + ' in line ' + e.getLineNumber());
        }
        return res;
    }
}