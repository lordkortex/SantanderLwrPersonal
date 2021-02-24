/**
 * An apex page controller that takes the user to the right start page based on credentials or lack thereof
 */
public with sharing class CommunitiesLandingController {
    
    // Code we will invoke on page load.
    public PageReference forwardToStartPage() {
        PageReference pageRef;
        string userId=UserInfo.getUserId();
        system.debug(userId);
        List<User> userLst = [SELECT Id, USER_country__c, Profile.Name FROM User WHERE Id =:userId LIMIT 1 ];
        if(userLst.size() > 0) {
            User u = new User();
            u = userLst.get(0);
            if(u.USER_country__c=='ES'|| u.USER_country__c=='BR'){
                String  url='https://www.santanderonetrade.com/s/landing';
                system.debug('Navigate to:' + url);
                pageRef = new PageReference(url);

            }
            else{
                pageRef = Network.communitiesLanding();
                system.debug('Navigate to default');
            }
        }
        return pageRef;
    }
    
    public CommunitiesLandingController() {}
}