global class ServiceDeviceInfo {

     global class NavigatorInfo {
        global String userAgent {get;set;}
        global String latitude {get;set;}
        global String longitude {get;set;}

        global NavigatorInfo () {}
     }

    global class DeviceInfo {
        global String timestamp {get;set;}
        global String clientIp {get;set;}
        global String userAgent {get;set;}
        global String userName {get;set;}
        global String userProfileName {get;set;}
        global String userRoleName {get;set;}
        global String userType {get;set;}
        global String userCountry {get;set;}
        global String tlsProtocol {get;set;}
        global String tlsCipherSuit {get;set;}
        global String loginURL {get;set;}
        global String latitude {get;set;}
        global String longitude {get;set;}
        global String httpMethod {get;set;}

        global DeviceInfo () {}

        global DeviceInfo (NavigatorInfo navigatorInfo, String httpMethod) {
            Map<String, String> session = null;
            if (!Test.isRunningTest()) {
                session = Auth.SessionManagement.getCurrentSession();
            } else {
                session = new Map<String, String>{'LoginDomain' => ''};
            }
            if (session != null) {
            	this.loginURL = String.isNotBlank(session.get('LoginDomain')) ? session.get('LoginDomain') : '';
            }
            AuthSession sessionObject = null;
            List<AuthSession> sessions = new List<AuthSession>([
                SELECT LastModifiedDate, NumSecondsValid, CreatedDate, SourceIp
                FROM AuthSession
                WHERE UsersId = :UserInfo.getUserId()
                ORDER BY LastModifiedDate DESC LIMIT 1
            ]);
            if (!sessions.isEmpty()) {
                sessionObject = sessions.get(0);
            }
            if (sessionObject != null) {
                this.clientIp = String.isNotBlank(String.valueOf(sessionObject.get('SourceIp'))) ? String.valueOf(sessionObject.get('SourceIp')) : '';
               	this.timestamp = String.valueOf(DateTime_Utilities.stringToDateTimeStep(String.valueOf(sessionObject.get('CreatedDate')),0));
            }
            this.userAgent = String.isNotBlank(navigatorInfo.userAgent) ? navigatorInfo.userAgent : '' ;
            this.latitude = String.isNotBlank(navigatorInfo.latitude) ? navigatorInfo.latitude : '' ;
            this.longitude = String.isNotBlank(navigatorInfo.longitude) ?navigatorInfo.longitude : '' ;
            User user = Global_Utilities.getUserData(userInfo.getUserId());
            if (user != null) {
                this.userName = user.FirstName + user.LastName;
                this.userProfileName = user.Profile.Name;
                this.userRoleName = user.UserRole.Name;
                this.userCountry = user.USER_country__c;
            }
            this.tlsProtocol = 'TLS 1.1.';
            this.tlsCipherSuit = 'ECDHE-RSA-AES256-GCM-SHA384';
            this.httpMethod = httpMethod;
        }
    }

    /*
    Author:         R. Cervino
    Company:        Deloitte
    Description:    Gets the device info JSON from payment Detail
    History:
    <Date>          <Author>             <Description>
    18/11/2020      R. Cervino       	Initial version
    */
    global static String getDeviceInfo (Map<String, String> navigatorMap, String httpMethod) {
        String res ='';
        try {
            NavigatorInfo navigatorInfo = (NavigatorInfo) System.JSON.deserialize(JSON.serialize(navigatorMap), NavigatorInfo.class);
            res = String.valueOf(new DeviceInfo(navigatorInfo, httpMethod));
            System.debug('device header');
            System.debug(res);
        } catch (Exception e) {
            System.debug('Exception type caught: ' + e.getTypeName());
            System.debug('Message: ' + e.getMessage());
            System.debug('Cause: ' + e.getCause());
            System.debug('Line number: ' + e.getLineNumber());
            System.debug('Stack trace: ' + e.getStackTraceString());
        }
        return res;
    }
}