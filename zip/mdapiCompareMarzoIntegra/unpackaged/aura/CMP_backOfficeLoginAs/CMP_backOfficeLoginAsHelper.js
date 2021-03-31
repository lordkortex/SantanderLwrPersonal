({
  getUserAccessToken: function (component, helper, response) {
    console.log(response);
    let params = {
      username: response,
      consumerKey: $A.get("$Label.c.consumerKeyLoginAsApp"),
      targetContactId: component.get("v.selectedUserId")
    };
    component
      .find("Service")
      .callApex2(
        component,
        helper,
        "c.getUserAccessToken",
        params,
        helper.setResponseData
      );
  },

  setResponseData: function (component, helper, response) {
    console.log(response);
    // let loginUrl = "https://dev-onetrade.cs102.force.com/cashnexus/secur/frontdoor.jsp?sid="+ response;
    let redirectUrl;
    if (response.userProfile == $A.get("$Label.c.PortalUserProfile")) {
      let loginUrl =
        $A.get("$Label.c.domain") +
        "/secur/frontdoor.jsp?sid=" +
        response.accessToken;
      redirectUrl = loginUrl + "&retURL=" + $A.get("$Label.c.domain") + "/s/";
    } else {
      let loginUrl =
        $A.get("$Label.c.domainCashNexus") +
        "/secur/frontdoor.jsp?sid=" +
        response.accessToken;
      redirectUrl =
        loginUrl + "&retURL=" + $A.get("$Label.c.domainCashNexus") + "/s/";
    }
    window.open(redirectUrl);

    // Create the audit record once the user has been redirected to the page
    let params = {
      loggedAsUserId: component.get("v.selectedUserId"),
      loggedInUserId: $A.get("$SObjectType.CurrentUser.Id")
    };
    component
      .find("Service")
      .callApex2(component, helper, "c.createAuditRecord", params, undefined);
  }
});
