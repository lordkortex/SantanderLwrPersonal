({
  doInit: function (component, event, helper) {
    helper.getData(component, event, component.get("v.filters"));
  },
  /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Get data (filtered or not)
    History
    <Date>			<Author>		<Description>
    11/12/2019		R. Alexander Cervino     Initial version*/

  getData: function (component, event, helper) {
    try {
      helper.update(component, event, helper);

      $A.util.removeClass(component.find("spinner"), "slds-hide");
      var filters = component.get("v.filters");
      //component.set("v.filters", filters);
      helper.getData(component, event, helper, filters);

      component.set("v.currentPage", 1);
      component.find("pagination").buildData(component.get("v.currentPage"));
    } catch (e) {
      console.log(e);
    }
  },

  /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to display the sorted/filtered/paginated data values
    History
    <Date>			<Author>		<Description>
    19/11/2019		R. Alexander Cervino     Initial version*/

  buildData: function (component, event, helper) {
    helper.buildData(component, event, helper);
  },

  /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Methos to remove a single pill
    History
    <Date>			<Author>		<Description>
    24/01/2020		R. Alexander Cervino     Initial version*/

  openAddModal: function (component, event, helper) {
    helper.openAddModal(component, event, helper);
  },

  /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Methos to remove a single pill
    History
    <Date>			<Author>		<Description>
    24/01/2020		R. Alexander Cervino     Initial version*/

  deletePain002: function (component, event, helper) {
    component.set("v.toDelete", event.getParam("toDelete"));
  },

  /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Methos to remove a single pill
    History
    <Date>			<Author>		<Description>
    24/01/2020		R. Alexander Cervino     Initial version*/

  updateList: function (component, event, helper) {
    if (
      component.get("v.isOpen") == false &&
      component.get("v.isDelete") == false
    ) {
      helper.update(component, event, helper);
    }
  }
});
