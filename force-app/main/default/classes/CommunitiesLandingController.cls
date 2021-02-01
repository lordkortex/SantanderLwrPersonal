/**
 * An apex page controller that takes the user to the right start page based on credentials or lack thereof
 */
public with sharing class CommunitiesLandingController {
    
    // Code we will invoke on page load.
    public PageReference forwardToStartPage() {
        /*SFDC POC - DO NOT USE THIS POC DIREECTLY IN PRODUCTION*/
        PageReference pageRef;
        string userId=UserInfo.getUserId();
        system.debug(userId);
        List<User> userLst = [SELECT Id, USER_country__c, Profile.Name FROM User WHERE Id =:userId LIMIT 1 ];
        if(userLst.size() > 0) {
            User u = new User();
            u = userLst.get(0);
            if(u.USER_country__c=='ES'){
                //String  url='https://preprod-onetrade.cs89.force.com/OneTradeLWC';
                String  url='https://preprod-onetrade.cs89.force.com/s/landing';
                system.debug('Navigate to:' + url);
                pageRef = new PageReference(url);

            }
            else{
                pageRef = Network.communitiesLanding();
                system.debug('Navigate to default');
            }
        }
        return pageRef;
       /*SFDC POC - DO NOT USE THIS POC DIREECTLY IN PRODUCTION ORIGINAL CODE BELOW:
            /*
            An apex page controller that takes the user to the right start page based on credentials or lack thereof *//*
            
            public with sharing class CommunitiesLandingController {
            
            // Code we will invoke on page load.
            public PageReference forwardToStartPage() {
            return Network.communitiesLanding();
            }
            
            public CommunitiesLandingController() {}
            }
            
            
            */
    }
    
    public CommunitiesLandingController() {}
}