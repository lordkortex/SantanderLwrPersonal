global with sharing class ServiceAPILine {

    global static final String MULTI_ONE_TRADE = System.Label.PAY_ServiceAPILine_001; //'MULTI_ONE_TRADE';
    global static final String NEXUS = System.Label.PAY_ServiceAPILine_002;//'NEXUS';
    global static final String LOCAL_BANKING = System.Label.PAY_ServiceAPILine_003;//'LOCAL_BANKING';
    global static final String BACKOFFICE_LOCAL_BANK = System.Label.PAY_ServiceAPILine_004;//'BACKOFFICE_LOCAL_BANK';
    global static final String BACKOFFICE_GTS_OPERATIONS = System.Label.PAY_ServiceAPILine_005;//'BACKOFFICE_GTS_OPERATIONS';

    /*----------------------------------------------------------------------------------
    Author:         Candido
    Company:        Deloitte
    Description:    Get the API line to execute according to the user's data
    History:
    <Date>          <Author>            <Description>
    26/10/2020      Candido             Initial version
	10/11/2020		Shahad Naji			Adding back-office API Line
    ----------------------------------------------------------------------------------*/
    global static String getAPILine () {
        return getAPILine(UserInfo.getUserId());
    }

    global static String getAPILine (String userId) {
        WrapperUserData userData;
        try {
            if (String.isBlank(userId)) {
                throw new CustomException('userId is not informed.');
            }
            userData = ServiceUserData.getUserData(userId);
        } catch (Exception e) {
            System.debug('ServiceAPILine.getAPILine: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
        return getAPILine(userData);
    }

    global static String getAPILine (WrapperUserData userData) {
        String res = null;
        String gtsOperationsUserProfile = System.Label.Profile_BackOffice_001;
        String localBankUserProfile = System.Label.Profile_BackOffice_002;
        try {
            if (userData == null) {
                throw new CustomException('userData wrapper is not informed.');
            }
            // TO-DO: how to check if user is MULTI_ONE_TRADE, NEXUS or LOCAL_BANKING
            if(userData.ProfileName == gtsOperationsUserProfile){
                res = BACKOFFICE_GTS_OPERATIONS;
            } else if(userData.ProfileName == localBankUserProfile){
                res = BACKOFFICE_LOCAL_BANK;
            } else{                
                if (userData.multiOneTrade != null && userData.multiOneTrade == true) {
                    res = MULTI_ONE_TRADE;
                } else if (userData.cashNexus != null && userData.cashNexus == true) {
                    res = NEXUS;
                } else {
                    res = LOCAL_BANKING;
                }
            }
        } catch (Exception e) {
            System.debug('ServiceAPILine.getAPILine: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
        return res;
    }

    /*----------------------------------------------------------------------------------
    Author:         Candido
    Company:        Deloitte
    Description:    Validate if the API line is MultiOneTrade
    History:
    <Date>          <Author>            <Description>
    26/10/2020      Candido             Initial version
    ----------------------------------------------------------------------------------*/
    global static Boolean isMultiOneTrade () {
        return isMultiOneTrade(UserInfo.getUserId());
    }

    global static Boolean isMultiOneTrade (String userId) {
        WrapperUserData userData;
        try {
            if (String.isBlank(userId)) {
                throw new CustomException('userId is not informed.');
            }
            userData = ServiceUserData.getUserData(userId);
        } catch (Exception e) {
            System.debug('ServiceAPILine.isMultiOneTrade: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
        return isMultiOneTrade(userData);
    }

    global static Boolean isMultiOneTrade (WrapperUserData userData) {
        Boolean res = null;
        try {
            if (userData == null) {
                throw new CustomException('userData wrapper is not informed.');
            }
            String APILine = getAPILine(userData);
            if (String.isNotBlank(APILine)) {
                if (APILine == MULTI_ONE_TRADE) {
                    res = true;
                } else {
                    res = false;
                }
            }
        } catch (Exception e) {
            System.debug('ServiceAPILine.isMultiOneTrade: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
        return res;
    }

    /*----------------------------------------------------------------------------------
    Author:         Candido
    Company:        Deloitte
    Description:    Validate if the API line is nexus
    History:
    <Date>          <Author>            <Description>
    26/10/2020      Candido             Initial version
    ----------------------------------------------------------------------------------*/
    global static Boolean isNexus () {
        return isNexus(UserInfo.getUserId());
    }

    global static Boolean isNexus (String userId) {
        WrapperUserData userData;
        try {
            if (String.isBlank(userId)) {
                throw new CustomException('userId is not informed.');
            }
            userData = ServiceUserData.getUserData(userId);
        } catch (Exception e) {
            System.debug('ServiceAPILine.isNexus: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
        return isNexus(userData);
    }

    global static Boolean isNexus (WrapperUserData userData) {
        Boolean res = null;
        try {
            if (userData == null) {
                throw new CustomException('userData wrapper is not informed.');
            }
            String APILine = getAPILine(userData);
            if (String.isNotBlank(APILine)) {
                if (APILine == NEXUS) {
                    res = true;
                } else {
                    res = false;
                }
            }
        } catch (Exception e) {
            System.debug('ServiceAPILine.isNexus: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
        return res;
    }

    /*----------------------------------------------------------------------------------
    Author:         Candido
    Company:        Deloitte
    Description:    Validate if the API line is local bank
    History:
    <Date>          <Author>            <Description>
    26/10/2020      Candido             Initial version
    ----------------------------------------------------------------------------------*/
    global static Boolean isLocalBanking () {
        return isLocalBanking(UserInfo.getUserId());
    }

    global static Boolean isLocalBanking (String userId) {
        WrapperUserData userData;
        try {
            if (String.isBlank(userId)) {
                throw new CustomException('userId is not informed.');
            }
            userData = ServiceUserData.getUserData(userId);
        } catch (Exception e) {
            System.debug('ServiceAPILine.isLocalBanking: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
        return isLocalBanking(userData);
    }

    global static Boolean isLocalBanking (WrapperUserData userData) {
        Boolean res = null;
        try {
            if (userData == null) {
                throw new CustomException('userData wrapper is not informed.');
            }
            String APILine = getAPILine(userData);
            if (String.isNotBlank(APILine)) {
                if (APILine == LOCAL_BANKING) {
                    res = true;
                } else {
                    res = false;
                }
            }
        } catch (Exception e) {
            System.debug('ServiceAPILine.isLocalBanking: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
        return res;
    }
        
        /*----------------------------------------------------------------------------------
    Author:         Candido
    Company:        Deloitte
    Description:    Validate if the API line is back-office local bank
    History:
    <Date>          <Author>            <Description>
    10/11/2020      Shahad Naji         Initial version
----------------------------------------------------------------------------------*/
    global static Boolean isBackOfficeLocalBank () {
        return isBackOfficeLocalBank(UserInfo.getUserId());
    }
    global static Boolean isBackOfficeLocalBank (String userId) {
        WrapperUserData userData;
        try {
            if (String.isBlank(userId)) {
                throw new CustomException('userId is not informed.');
            }
            userData = ServiceUserData.getUserData(userId);
        } catch (Exception e) {
            System.debug('ServiceAPILine.isBackOfficeLocalBank: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
        return isBackOfficeLocalBank(userData);
    }
    global static Boolean isBackOfficeLocalBank (WrapperUserData userData) {
        Boolean res = null;
        try {
            if (userData == null) {
                throw new CustomException('userData wrapper is not informed.');
            }
            String APILine = getAPILine(userData);
            if (String.isNotBlank(APILine)) {
                if (APILine == BACKOFFICE_LOCAL_BANK) {
                    res = true;
                } else {
                    res = false;
                }
            }
        } catch (Exception e) {
            System.debug('ServiceAPILine.isBackOfficeLocalBank: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
        return res;
    }
    
            /*----------------------------------------------------------------------------------
    Author:         Candido
    Company:        Deloitte
    Description:    Validate if the API line is back-office GTS Operations
    History:
    <Date>          <Author>            <Description>
    10/11/2020      Shahad Naji         Initial version
----------------------------------------------------------------------------------*/
    global static Boolean isBackOfficeGTSOperations () {
        return isBackOfficeGTSOperations(UserInfo.getUserId());
    }
    global static Boolean isBackOfficeGTSOperations (String userId) {
        WrapperUserData userData;
        try {
            if (String.isBlank(userId)) {
                throw new CustomException('userId is not informed.');
            }
            userData = ServiceUserData.getUserData(userId);
        } catch (Exception e) {
            System.debug('ServiceAPILine.isBackOfficeGTSOperations: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
        return isBackOfficeGTSOperations(userData);
    }
    global static Boolean isBackOfficeGTSOperations (WrapperUserData userData) {
        Boolean res = null;
        try {
            if (userData == null) {
                throw new CustomException('userData wrapper is not informed.');
            }
            String APILine = getAPILine(userData);
            if (String.isNotBlank(APILine)) {
                if (APILine == BACKOFFICE_GTS_OPERATIONS) {
                    res = true;
                } else {
                    res = false;
                }
            }
        } catch (Exception e) {
            System.debug('ServiceAPILine.isBackOfficeGTSOperations: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
        return res;
    }
}