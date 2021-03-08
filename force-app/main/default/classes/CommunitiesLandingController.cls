/**
 * An apex page controller that takes the user to the right start page based on credentials or lack thereof
 */
public with sharing class CommunitiesLandingController {
    
    // Code we will invoke on page load.
    public PageReference forwardToStartPage() {
        /*SFDC POC*/
        PageReference pageRef;
        string userId=UserInfo.getUserId();
        List<User> userLst = [SELECT Id, USER_country__c, Profile.Name FROM User WHERE Id =:userId LIMIT 1 ];
        if(userLst.size() > 0) {
            User u = new User();
            u = userLst.get(0);
            if(u.USER_country__c=='ES'){
                String  url='https://integra-onetrade.cs100.force.com/s/landing';
                pageRef = new PageReference(url);

            }
            else{
				pageRef = Network.communitiesLanding();
            }
        }
        return pageRef;
    }
    
    public CommunitiesLandingController() {}
}