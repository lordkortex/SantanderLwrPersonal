({
  handleShowDiscard: function (component, event, helper) {
    component.set("v.showCancelModal", true);
  },

  handleCancelPayment: function (component, event, helper) {
    let cancel = event.getParam("cancel");
    if (cancel) {
      helper.cancelPayment(component, helper);
    }
    component.set("v.showCancelModal", false);
  },
  handleShowSaveLater: function (component, event, helper) {
    component.set("v.showSFLModal", true);
  },
  /*
    Author:        	Julian Hoyos
    Company:        Deloitte
    Description:    Method to save for later payment
    History:
    <Date>          <Author>            <Description>  
    28/12/2020      Julian Hoyos        Initial version
    29/12/2020		Shahad Naji			Reuse helper methods
    */
  handleSavePaymentForLater: function (component, event, helper) {
    let status = "001";
    let reason = "000";
    helper
      .updateStatus(component, status, reason)
      .then(
        $A.getCallback(function (value) {
          helper.sendToLanding(component, event, helper, true);
        })
      )
      .catch(function (error) {
        console.log(error);
      })
      .finally(
        $A.getCallback(function () {
          console.log("OK");
          component.set("v.spinner", false);
        })
      );
  },

  handleCloseSaveForLater: function (component, event, helper) {
    component.set("v.showSFLModal", false);
  }
});
