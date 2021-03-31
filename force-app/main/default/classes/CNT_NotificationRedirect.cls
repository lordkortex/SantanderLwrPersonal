public class CNT_NotificationRedirect {

    @AuraEnabled
    public static ReturnValue getUserData () {
        ReturnValue response = ServiceUserData.getControllerUserData ();
		return response;
	}
}