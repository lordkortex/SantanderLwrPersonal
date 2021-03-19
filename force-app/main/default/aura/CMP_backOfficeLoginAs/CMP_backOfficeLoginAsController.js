({
  login: function (component, event, helper) {
    let targetUserId = component.get("v.selectedUserId");
    if (targetUserId != "" && targetUserId != undefined) {
      component
        .find("Service")
        .callApex2(
          component,
          helper,
          "c.getDummyUsername",
          { contactId: targetUserId },
          helper.getUserAccessToken
        );
    }
  }
});
