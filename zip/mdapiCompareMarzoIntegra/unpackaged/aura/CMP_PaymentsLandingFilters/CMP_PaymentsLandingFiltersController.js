({
  /*
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    Initialize CMP_PaymentsLandingFilters component
    History
    <Date>			<Author>			<Description>
	02/06/2020		Shahad Naji   		Initial version
    */
  doInit: function (component, event, helper) {
    helper.setFilters(component, event, helper);
  },
  /*
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    Prints what is shown on the screen
    History
    <Date>			<Author>			<Description>
	28/05/2020		Shahad Naji   		Initial version
    */
  printScreen: function (component, event, helper) {
    var length = component.get("v.numberOfPayments");
    if ($A.util.isEmpty(length)) {
      helper.showToast(
        component,
        event,
        helper,
        $A.get("$Label.c.PAY_noPaymentsDownloadPrint"),
        $A.get("$Label.c.PAY_checkFilterSearchCriteria"),
        "Error",
        "error",
        true
      );
    } else {
      window.print();
    }
  },
  /*
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    Method to display download modal (CMP_PaymentsLandingDownloadModal)
    History
    <Date>			<Author>			<Description>
    02/06/2020		Shahad Naji   		Initial version
    26/08/2020      Bea Hill            Call to download service instead of opening the modal
    04/09/2020      Bea Hill            Open download modal instead of calling to service directly
    */
  openDownloadModal: function (component, event, helper) {
    var length = component.get("v.numberOfPayments");
    if (length == 0) {
      helper.showToast(
        component,
        event,
        helper,
        $A.get("$Label.c.PAY_noPaymentsDownloadPrint"),
        $A.get("$Label.c.PAY_checkFilterSearchCriteria"),
        "Error",
        "error",
        true
      );
    } else {
      component.set("v.showDownloadModal", true);
    }
  },
  /*
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    Method to display advanced filter modal (CMP_PaymentsLandingFilterModal)
    History
    <Date>			<Author>			<Description>
	03/06/2020		Shahad Naji   		Initial version
    */
  openFilterModal: function (component, event, helper) {
    component.set("v.showFilterModal", true);
  },
  /*
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    Method to clear search input
    History
    <Date>			<Author>			<Description>
    02/06/2020		Shahad Naji   		Initial version
    16/16/2020      Bea Hill            Added 'No results' attribute
    07/07/2020      Bea Hill            Simplified now that searchedString not linked to filter modal
    24/07/2020      Bea Hill            Decrease filterCounter on clearing the search
    31/07/2020		Shahad Naji			Reset search or delete clienteReference parameter from search
    */
  clearInput: function (component, event, helper) {
    var clientReference = component.get("v.searchedString");

    component.set("v.searchedString", "");
    component.set("v.applyIsClicked", true);
    helper.countFilters(component, event, helper);
  },
  /*
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    Method to search when Enter key is pressed
    History
    <Date>			<Author>			<Description>
    02/06/2020		Shahad Naji   		Initial version
    16/16/2020      Bea Hill            Added 'No results' attribute
    07/07/2020      Bea Hill            Simplified now that searchedString not linked to filter modal
    24/07/2020      Bea Hill            Increase filterCounter on searching
    */
  setInputOnKeyDown: function (component, event, helper) {
    let inputValue = event.target.value;
    let key = event.key;
    let keyCode = event.keyCode;
    let searchedString = component.get("v.searchedString");
    if (searchedString == null || searchedString == undefined) {
      searchedString = "";
    }
    if (key == "Enter" && keyCode == 13) {
      if (!$A.util.isEmpty(inputValue)) {
        helper.clearSelectedPaymentStatusBox(component, event, helper);
        component.set("v.searchedString", inputValue);
      } else {
        component.set("v.searchedString", "");
      }
      component.set("v.applyIsClicked", true);
      helper.countFilters(component, event, helper);
      helper.clearSelectedPaymentStatusBox(component, event, helper);
    }
  },
  /*
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    Method to save input value into search when user leaves the input field
    History
    <Date>			<Author>			<Description>
    02/06/2020		Shahad Naji   		Initial version
    
    */
  setInputOnBlur: function (component, event, helper) {
    let inputValue = event.target.value;
    helper.clearSelectedPaymentStatusBox(component, event, helper);
    component.set("v.searchedString", inputValue);
  },
  /*
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    Method to handle apply filter button
    History
    <Date>			<Author>			<Description>
    ??/06/2020		Shahad Naji   		Initial version
    17/06/2020      Bea Hill            Added control of NoResults attribute for demo
    07/07/2020      Bea Hill            All control of filters through filterCounter method
    */
  handleFilter: function (component, event, helper) {
    var eventDropdown = event.getParam("showDropdown");
    var eventName = event.getParam("name");
    var eventAction = event.getParam("action");
    if (eventDropdown) {
      let filters = component.find("filter");
      for (let i = 0; i < filters.length; i++) {
        if (filters[i].get("v.name") == eventName) {
          filters[i].set("v.showDropdown", true);
        } else {
          filters[i].set("v.showDropdown", false);
        }
      }
    }
    if (!$A.util.isEmpty(eventAction) && !$A.util.isEmpty(eventName)) {
      //Status
      if (eventName == "status" && eventAction == "clear") {
        helper.clearSelectedPaymentStatusBox(component, event, helper);
      } else if (eventName == "status" && eventAction == "apply") {
        if (!$A.util.isEmpty(component.get("v.selectedStatuses"))) {
        }
      }

      //Currency
      if (eventName == "currency" && eventAction == "clear") {
      } else if (eventName == "currency" && eventAction == "apply") {
        if (!$A.util.isEmpty(component.get("v.selectedCurrencies"))) {
        }
      }

      component.set("v.applyIsClicked", true);
      helper.clearSelectedPaymentStatusBox(component, event, helper);
    }
  },

  /*
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    Reset filter options
    History
    <Date>			<Author>			<Description>
    15/06/2020		Shahad Naji   		Initial version
    17/06/2020      Bea Hill            Adapted from CMP_B2B_FilterAccounts
    */
  handleResetSearch: function (component, event, helper) {
    var clear = component.get("v.resetSearch");
    if (clear) {
      helper.resetSearch(component, event, helper);
      component.set("v.selectedPaymentStatusBox", "");
    }
  },

  /*
	Author:        	Bea Hill
    Company:        Deloitte
    Description:    When user changes selected status box
    History
    <Date>			<Author>			<Description>
    17/06/2020		Bea Hill   		    Initial version
    */

  changeSelectedStatusBox: function (component, event, helper) {
    helper.statusAction(component, event, helper);
  },

  handleApplySearch: function (component, event, helper) {
    var applyIsClicked = component.get("v.applyIsClicked");
    if (applyIsClicked) {
      helper.countFilters(component, event, helper);
      helper.applySearch(component, event, helper);
    }
  }
});
