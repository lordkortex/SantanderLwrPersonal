({
  /*
	Author:        	Bea Hill
    Company:        Deloitte
	Description:    Set tracking step integer
    History
    <Date>			<Author>			<Description>
	23/06/2020		Bea Hill   		    Initial version
    */
  doInit: function (component, event, helper) {
    var payment = component.get("v.payment");
    var trackingStep = payment.trackingStep;
    var status = payment.paymentStatus; //MWB
    var reason = payment.paymentReason; //MWB
    var step = 0;
    if (trackingStep == $A.get("$Label.c.PAY_Creation")) {
      step = 1;
    } else if (trackingStep == $A.get("$Label.c.Authorization")) {
      step = 2;
    } else if (trackingStep == $A.get("$Label.c.PAY_InProgress")) {
      step = 3;
    } else if (trackingStep == $A.get("$Label.c.completed")) {
      step = 4;
    } else if (trackingStep == $A.get("$Label.c.PAY_Rejected")) {
      step = 4;
    }
    component.set("v.trackingStep", step);
    helper.handleStatusHistory(component, event, helper);

    if (status == "003" && reason == "001") {
      helper.handleInReviewModal(component, event, helper);
    }
  },
  /*
	Author:        	Bea Hill
    Company:        Deloitte
	Description:    Show additional details of the Authorization stage
    History
    <Date>			<Author>			<Description>
	18/06/2020		Bea Hill   		    Initial version
    */
  moreAuth: function (component, event, helper) {
    component.set("v.showMoreAuth", true);
  },
  /*
    Author:        	Bea Hill
    Company:        Deloitte
    Description:    Hide additional details of the Authorization stage
    History
    <Date>			<Author>			<Description>
    18/06/2020		Bea Hill   		    Initial version
    */
  lessAuth: function (component, event, helper) {
    component.set("v.showMoreAuth", false);
  },
  /*
	Author:        	Bea Hill
    Company:        Deloitte
	Description:    Show additional details of the Authorization stage
    History
    <Date>			<Author>			<Description>
	18/06/2020		Bea Hill   		    Initial version
    */
  moreInProg: function (component, event, helper) {
    component.set("v.showMoreInProg", true);
  },
  /*
    Author:        	Bea Hill
    Company:        Deloitte
    Description:    Hide additional details of the Authorization stage
    History
    <Date>			<Author>			<Description>
    18/06/2020		Bea Hill   		    Initial version
    */
  lessInProg: function (component, event, helper) {
    component.set("v.showMoreInProg", false);
  }
});
