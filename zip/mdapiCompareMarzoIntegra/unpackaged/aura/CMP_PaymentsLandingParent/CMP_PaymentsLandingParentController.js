({
  /*
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    Initialize CMP_PaymentsLandingParent component
    History
    <Date>			<Author>			<Description>
	28/05/2020		Shahad Naji   		Initial version
    24/07/2020		Shahad Naji			Simplify code that handles the success or failure of asynchronous calls, or code that chains together multiple asynchronous calls.
    */
  doInit: function (component, event, helper) {
    helper.doInitHelper(component, event, helper);
  },

  /*
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    Display selected tab information
    History
    <Date>			<Author>			<Description>
	28/05/2020		Shahad Naji   		Initial version
    */
  displayData: function (component, event, helper) {
    component.set("v.showSpinner", true);
    component.set("v.noService", false);
    var isSingleTabSelected = component.get("v.isSingleTabSelected");
    if (isSingleTabSelected == true) {
      component.set("v.resetSearch", true);
      component.set("v.isSingleDataLoaded", false);
      Promise.all([helper.getCurrentUserData(component, event, helper)])
        .then(
          $A.getCallback(function (value) {
            return Promise.all([
              helper.getPaymentsStatuses(
                component,
                event,
                helper,
                isSingleTabSelected
              ),
              helper.getPaymentsInformation(
                component,
                event,
                helper,
                isSingleTabSelected
              )
            ]);
          }),
          this
        )
        .catch(function (error) {
          console.log("error");
        })
        .finally(
          $A.getCallback(function () {
            component.set("v.showSpinner", false);
          })
        );
    } else {
      component.set("v.showSpinner", false);
      console.log(
        ">>> SNJ - CMP_PaymentsLandingParent/doInit - Functionality to be develped the next Sprints"
      );
    }
  },

  /*
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Set selected filter of the header
    History:
    <Date>			<Author>			<Description>
    28/05/2020		Shahad Naji   		Initial version
    03/07/2020		Shahad Naji			Diffentiate between "Pending of my authorization" and "Pending authorization by others"
    */
  handleHeaderSearch: function (component, event, helper) {
    var selectedStatus = component.get("v.selectedPaymentStatusBox");
    if (!$A.util.isEmpty(selectedStatus)) {
      var statusLst = [];
      var statusName = selectedStatus.statusName;
      if (statusName.includes("true_")) {
        var res = statusName.split("true_");
        statusLst.push("chk_" + res[1]);
        component.set("v.pendingOfMyAuthorization", true);
      } else if (statusName.includes("false_")) {
        var res = statusName.split("false_");
        statusLst.push("chk_" + res[1]);
        component.set("v.pendingOfMyAuthorization", false);
      } else {
        statusLst.push("chk_" + selectedStatus.statusName);
      }
      component.set("v.isHeaderOptionSelected", true);
      component.set("v.selectedStatuses", statusLst);
    }
  },

  /*
    Author:        	María Íñigo
    Company:        Deloitte
	Description:    Display selected tab information
    History:
    <Date>			<Author>			<Description>
    02/07/2020		Bea Hill   		Adapted from CMP_B2B_Process
    */
  /*
    handleReloadRetrieveAccounts: function (component, event, helper) {
        let reload = component.get('v.reloadAccounts');
        if (reload) {
            component.set('v.showSpinner', true);
            var auxGetAccounts = helper.getLandingFiltersAccounts(component, event, helper);
            auxGetAccounts.catch(function (error) {
                console.log(error);
                helper.showToast(component, event, helper, error.title, error.body, error.noReload);
            }).finally($A.getCallback(function () {
                component.set('v.showSpinner', false);
                component.set('v.reloadAccounts', false);
            }));
        }
    },
    */
  handleReloadPage: function (component, event, helper) {
    let reload = event.getParam("reload");
    let landing = event.getParam("landing");
    if (reload && landing) {
      helper.doInitHelper(component, event, helper);
    }
  },

  handleSearchOperationsList: function (component, event, helper) {
    component.set("v.isLoading", true);
    var filterCounter = component.get("v.filterCounter");
    if (filterCounter > 0) {
      Promise.all([helper.searchOperationsList(component, event, helper)])
        .then(
          $A.getCallback(function (value) {
            component.set("v.isLoading", false);
          })
        )
        .catch(function (error) {
          console.log(error);
        })
        .finally($A.getCallback(function () {}));
    } else {
      var lst = component.get("v.initialSinglePaymentList");
      Promise.all([
        component.set("v.singlePaymentList", lst),
        component.find("paymentsLandingTable").setComponent(lst)
      ])
        .then(
          $A.getCallback(function (value) {
            component.set("v.isLoading", false);
          })
        )
        .catch(function (error) {
          console.log("error");
        })
        .finally($A.getCallback(function () {}));
    }
  },

  handleResetSearch: function (component, event, helper) {
    var reset = component.get("v.resetSearch");
    if (reset) {
      var initialList = component.get("v.initialSinglePaymentList");
      component.find("paymentsLandingTable").setComponent(initialList);
      component.set("v.singlePaymentList", initialList);
      console.log("RESET TABLE");
    }
  },

  /*
    Author:        	Bea Hill
    Company:        Deloitte
    Description:    Download selected payments
    History
    <Date>			<Author>			<Description>
    06/08/2020		Bea Hill   		    Initial version
    25/08/2020      Bea Hill            Create list of payments to download, call downloadCSV in helper
    */
  handleDownload: function (component, event, helper) {
    component.set("v.showSpinner", true);

    let params = event.getParams();
    let fileFormat = "";
    if (!$A.util.isEmpty(params)) {
      fileFormat = params.format;
    }
    helper
      .getDocumentId(component, event, helper, fileFormat)
      .then(
        $A.getCallback(function (documentId) {
          return helper.downloadFile(component, event, helper, documentId);
        })
      )
      .then(
        $A.getCallback(function (documentId) {
          helper.removeFile(component, event, helper, documentId);
        }),
        this
      )
      .catch(function (error) {
        helper.showToast(
          component,
          event,
          helper,
          error.title,
          error.body,
          error.noReload
        );
      })
      .finally(
        $A.getCallback(function () {
          component.set("v.showSpinner", false);
        })
      );

    // Promise.all([
    //     helper.callDownload(component, event, helper, fileFormat)
    // ]).then($A.getCallback(function (results) {
    //     if(results!=null && results!='' && results!=undefined){
    //         var domain=$A.get('$Label.c.domain');
    //         window.location.href = domain+'/sfc/servlet.shepherd/document/download/'+results+'?operationContext=S1';
    //         //setTimeout(function(){
    //             helper.removeFile(component, event, helper, results);
    //         //}, 100);
    //     }
    // }), this).catch(function (error) {
    //     console.log(error);
    //     helper.showToast(component, event, helper, error.title, error.body, error.noReload);
    // }).finally($A.getCallback(function () {
    //     component.set('v.showSpinner', false);
    // }));
  },

  /*
    Author:        	Guillermo Giral
    Company:        Deloitte
    Description:    Displays an error toast message when Send To Review fails
    History
    <Date>			<Author>			<Description>
    27/08/2020		Guillermo Giral   	Initial version
    */
  displaySendToReviewToast: function (component, event, helper) {
    if (event) {
      helper.showToast(
        component,
        event,
        helper,
        $A.get("$Label.c.B2B_Error_Problem_Loading"),
        $A.get("$Label.c.B2B_Error_Check_Connection"),
        true
      );
    }
  }
});
