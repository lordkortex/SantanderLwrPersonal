({
  /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Get data (filtered or not)
    History
    <Date>			<Author>		<Description>
    11/12/2019		R. Alexander Cervino     Initial version*/

  getData: function (component, event, helper) {
    try {
      var entered = component.get("v.searchDone");
      if (entered > 1) {
        component.set("v.noResultsLabel", $A.get("$Label.c.NoResultsSearch"));
        component.set("v.searchLabel", $A.get("$Label.c.SearchAgain"));
      }
      component.set("v.searchDone", entered + 1);
      //$A.util.removeClass(component.find("spinnerTable"), "slds-hide");
      component.set("v.showSpinner", true);
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

  /*Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Function to initialize the table data
    History
    <Date>			<Author>		<Description>
    19/11/2019		R. Alexander Cervino     Initial version*/

  initTable: function (component, event, helper) {
    var params = event.getParam("arguments");
    if (params) {
      helper.initTable(component, event, params.tableData, true, helper);
    }
  },

  /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to sort the data table
    History
    <Date>			<Author>		<Description>
    19/11/2019		R. Alexander Cervino     Initial version*/

  sortBy: function (component, event, helper) {
    try {
      //Retrieve the field to sort by
      if (
        event.target.id != null &&
        event.target.id != "" &&
        event.target.id != undefined
      ) {
        var sortItem = "v.sort" + event.target.id;
        var sorted = helper.sortBy(
          component,
          sortItem,
          helper,
          event.target.id
        );

        if (sorted != undefined && sorted != null) {
          component.set("v.jsonArray", sorted);

          //Update the sort order
          if (component.get(sortItem) == "asc") {
            component.set(sortItem, "desc");
          } else {
            component.set(sortItem, "asc");
          }
          component.set("v.currentPage", 1);
          component.find("pagination").buildData("1");
        }
      }
    } catch (e) {
      console.error(e);
    }
  },
  /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method open the modal
    History
    <Date>			<Author>		<Description>
    17/03/2020		R. Alexander Cervino     Initial version*/

  openSearch: function (component, event, helper) {
    try {
      var cmpEvent = component.getEvent("openAdvancedFilters");
      cmpEvent.setParam("openModal", true);
      cmpEvent.fire();
    } catch (e) {
      console.log(e);
    }
  },

  /*
    Author:           R. Alexander Cervino
    Company:            Deloitte
    Description:        Method to navigate to a payment detail
    History
    <Date>			<Author>		<Description>
    12/12/2019		R. Alexander Cervino     Initial version
    */

  openPaymentDetails: function (component, event, helper) {
    // var url = "c__accountNumber="+component.get("v.accountItem.displayNumber")+"&c__bank="+component.get("v.accountItem.bankName")+"&c__mainAmount="+component.get("v.accountItem.amountMainBalance")+"&c__availableAmount="+component.get("v.accountItem.amountAvailableBalance")+"&c__currentCurrency="+component.get("v.accountItem.curencyCodeAvailableBalance");
    let paymentRow = event.currentTarget.id;
    let item = component.get("v.jsonArray")[paymentRow];
    var url =
      "c__paymentId=" +
      item.paymentDetail.paymentId +
      "&c__valueDate=" +
      item.paymentDetail.valueDate +
      "&c__reason=" +
      item.paymentDetail.transactionStatus.reason +
      "&c__status=" +
      item.paymentDetail.transactionStatus.status +
      "&c__orderingAccount=" +
      item.paymentDetail.originatorData.originatorAccount.accountId +
      "&c__orderingBIC=" +
      item.paymentDetail.originatorAgent.agentCode +
      "&c__orderingBank=" +
      item.paymentDetail.originatorAgent.agentName +
      "&c__orderingName=" +
      item.paymentDetail.originatorData.originatorName +
      "&c__beneficiaryAccount=" +
      item.paymentDetail.beneficiaryData.creditorCreditAccount.accountId +
      "&c__beneficiaryName=" +
      item.paymentDetail.beneficiaryData.beneficiaryName +
      "&c__beneficiaryBank=" +
      item.paymentDetail.beneficiaryData.creditorAgent.agentName +
      "&c__beneficiaryBIC=" +
      item.paymentDetail.beneficiaryData.creditorAgent.agentCode +
      "&c__amount=" +
      item.paymentDetail.paymentAmount.amount +
      "&c__currency=" +
      item.paymentDetail.paymentAmount.currency_X +
      "&c__beneficiaryCity=" +
      item.paymentDetail.beneficiaryData.creditorAgent.agentLocation +
      "&c__beneficiaryCountry=" +
      item.paymentDetail.beneficiaryData.creditorAgent.agentCountry +
      "&c__filters=" +
      component.get("v.filters") +
      "&c__allAccounts=" +
      JSON.stringify(component.get("v.fullAccountList"));
    helper.goTo(component, event, "payment-details", url);
  },

  /*
    Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to download the MT103
    History
    <Date>			<Author>		<Description>
    12/12/2019		R. Alexander Cervino     Initial version
    */

  downloadMT103: function (component, event, helper) {
    helper.downloadMT103(component, event, helper);
  },

  /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to download the MT103
    History
    <Date>			<Author>		<Description>
    12/12/2019		R. Alexander Cervino     Initial version*/

  doInit: function (component, event, helper) {
    var status = component.get("v.item.paymentDetail.transactionStatus.status");
    var reason = component.get("v.item.paymentDetail.transactionStatus.reason");
    if (status == "RJCT") {
      component.set("v.statusLabel", $A.get("$Label.c.payment_statusOne"));
      component.set("v.statusClass", "icon-circle__red");
    }
    if (status == "ACSC" || status == "ACCC") {
      component.set("v.statusLabel", $A.get("$Label.c.payment_statusTwo"));
      component.set("v.statusClass", "icon-circle__green");
    }
    if (status == "ACSP") {
      if (
        reason == "G000" ||
        reason == "G001" ||
        reason == null ||
        reason == "null"
      ) {
        component.set("v.statusLabel", $A.get("$Label.c.payment_statusThree"));
        component.set("v.statusClass", "icon-circle__blue");
      }
      if (reason == "G002" || reason == "G003" || reason == "G004") {
        component.set("v.statusLabel", $A.get("$Label.c.payment_statusFour"));
        component.set("v.statusClass", "icon-circle__orange");
      }
    }

    if (component.get("v.fromDetail") == true) {
      helper.getData(component, event, helper);
    }

    //helper.getDateTime(component, event, helper);
  }
});
