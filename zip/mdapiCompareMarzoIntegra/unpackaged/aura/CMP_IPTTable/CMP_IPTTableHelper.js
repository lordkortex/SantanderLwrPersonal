({
  getData: function (component, event, helper) {
    try {
      var action = component.get("c.getFilteredData");
      action.setParams({ filters: component.get("v.filters") });
      action.setCallback(this, function (response) {
        var state = response.getState();
        console.log(state);
        if (state == "ERROR") {
          var errors = response.getError();
          if (errors) {
            if (errors[0] && errors[0].message) {
              console.log("Error message: " + errors[0].message);
              component.set("v.jsonArray", []);
            }
          } else {
            console.log("Unknown error");
          }
        } else if (state == "SUCCESS") {
          helper.initTable(
            component,
            event,
            response.getReturnValue(),
            false,
            helper
          );
        }
        //$A.util.addClass(component.find("spinnerTable"), "slds-hide");
        component.set("v.showSpinner", false);
      });

      $A.enqueueAction(action);
    } catch (e) {
      console.log(e);
    }
  },

  /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to sort the data table
    History
    <Date>			<Author>		<Description>
    19/11/2019		R. Alexander Cervino     Initial version*/

  initTable: function (component, event, res, hideSpinner, helper) {
    if (res != null && res != undefined && Object.keys(res).length > 0) {
      var end;
      var parseJSON = res.paymentsList;
      if (parseJSON == undefined) {
        parseJSON = res.paymentList;
      }

      // Set the status and icon for the payments
      parseJSON = JSON.parse(
        JSON.stringify(helper.setPaymentStatus(parseJSON))
      );
      component.set("v.jsonArray", parseJSON);

      if (parseJSON.length < component.get("v.paymentsPerPage")) {
        end = parseJSON.length;
      } else {
        end = component.get("v.paymentsPerPage");
      }
      component.set("v.end", end);

      var paginatedValues = [];

      for (var i = component.get("v.start"); i <= component.get("v.end"); i++) {
        paginatedValues.push(parseJSON[i]);
      }

      component.set("v.paginatedPayments", paginatedValues);

      var toDisplay = [];
      var finish = parseJSON.length;

      if (parseJSON.length > 1000) {
        //Max payments to retrieve
        finish = 1000;
      }

      for (var i = 0; i < finish; i++) {
        toDisplay.push(parseJSON[i]);
      }

      component.find("pagination").initPagination(toDisplay);
    } else {
      component.set("v.jsonArray", []);
    }

    // Hide spinner if necessary
    if (hideSpinner)
      //$A.util.addClass(component.find("spinnerTable"), "slds-hide");
      component.set("v.showSpinner", false);
  },

  /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to sort the data table
    History
    <Date>			<Author>		<Description>
    19/11/2019		R. Alexander Cervino     Initial version*/

  sortBy: function (component, sortItem, helper, sortBy) {
    try {
      var order = component.get(sortItem);
      if (order != "" && order != null && order != undefined) {
        var data = component.get("v.jsonArray");
        if (data != null && data != undefined) {
          let sort;
          if (order == "desc") {
            if (sortBy == "settledAmount") {
              //
              sort = data.sort(
                (a, b) =>
                  parseFloat(b.paymentDetail.paymentAmount.amount) -
                  parseFloat(a.paymentDetail.paymentAmount.amount)
              );
            } else if (sortBy == "valueDate") {
              sort = data.sort(
                (a, b) =>
                  new Date(
                    helper.formatDate(b.paymentDetail.valueDate)
                  ).getTime() -
                  new Date(
                    helper.formatDate(a.paymentDetail.valueDate)
                  ).getTime()
              );
            }
          } else {
            if (sortBy == "settledAmount") {
              sort = data.sort(
                (a, b) =>
                  parseFloat(a.paymentDetail.paymentAmount.amount) -
                  parseFloat(b.paymentDetail.paymentAmount.amount)
              );
            } else if (sortBy == "valueDate") {
              sort = data.sort(
                (a, b) =>
                  new Date(
                    helper.formatDate(a.paymentDetail.valueDate)
                  ).getTime() -
                  new Date(
                    helper.formatDate(b.paymentDetail.valueDate)
                  ).getTime()
              );
            }
          }
          return sort;
        }
      }
    } catch (e) {
      console.error(e);
    }
  },

  /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to sort the data table
    History
    <Date>			<Author>		<Description>
    19/11/2019		R. Alexander Cervino     Initial version*/

  formatDate: function (date) {
    if (date != "" && date.length == 10) {
      var res =
        date.slice(6, 10) + "/" + date.slice(3, 5) + "/" + date.slice(0, 2);
      return res;
    }
  },

  /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to display the sorted/filtered/paginated data values
    History
    <Date>			<Author>		<Description>
    19/11/2019		R. Alexander Cervino     Initial version*/

  buildData: function (component, event, helper) {
    try {
      var json = component.get("v.jsonArray");
      var currentPage = event.getParam("currentPage");
      var oldPage = component.get("v.oldPage");
      var perPage = component.get("v.paymentsPerPage");
      var end = component.get("v.end");
      var start = component.get("v.start");

      if (
        currentPage != null &&
        currentPage != undefined &&
        currentPage != "" &&
        oldPage != currentPage
      ) {
        //Update the index of dataset to display
        if (currentPage > oldPage && currentPage != 1) {
          component.set("v.start", perPage * currentPage - perPage);
          if (Math.ceil(json.length / currentPage) >= perPage) {
            component.set("v.end", perPage * currentPage);
          } else {
            component.set("v.end", json.length);
          }
        } else {
          component.set("v.end", start);
          if (currentPage == 1) {
            component.set("v.start", 0);
            component.set("v.end", perPage);
          } else {
            component.set("v.start", start - perPage);
          }
        }
        component.set("v.oldPage", currentPage);

        //Update a set of the paginated data
        var paginatedValues = [];
        for (
          var i = component.get("v.start");
          i <= component.get("v.end");
          i++
        ) {
          paginatedValues.push(json[i]);
        }

        component.set("v.paginatedPayments", paginatedValues);
      }
    } catch (e) {
      console.error(e);
    }
  },

  /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to navigate to page
    History
    <Date>			<Author>		<Description>
    19/11/2019		R. Alexander Cervino     Initial version*/

  goTo: function (component, event, page, url) {
    try {
      this.encrypt(component, url).then(function (results) {
        let navService = component.find("navService");
        let pageReference = {};

        pageReference = {
          type: "comm__namedPage",
          attributes: {
            pageName: page
          },
          state: {
            params: results
          }
        };
        navService.navigate(pageReference);
      });
    } catch (e) {
      console.log(e);
    }
  },

  /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to cipher data
    History
    <Date>			<Author>		<Description>
    19/11/2019		R. Alexander Cervino     Initial version*/

  encrypt: function (component, data) {
    try {
      var result = "null";
      var action = component.get("c.encryptData");
      action.setParams({ str: data });
      return new Promise(function (resolve, reject) {
        action.setCallback(this, function (response) {
          var state = response.getState();
          if (state === "ERROR") {
            var errors = response.getError();
            if (errors) {
              if (errors[0] && errors[0].message) {
                console.log("Error message: " + errors[0].message);
                reject(response.getError()[0]);
              }
            } else {
              console.log("Unknown error");
            }
          } else if (state === "SUCCESS") {
            result = response.getReturnValue();
          }
          resolve(result);
        });
        $A.enqueueAction(action);
      });
    } catch (e) {
      console.log(e);
    }
  },

  /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to download the MT103
    History
    <Date>			<Author>		<Description>
    12/12/2019		R. Alexander Cervino     Initial version*/

  downloadMT103: function (component, event, helper) {
    //First retrieve the doc and the remove it
    try {
      this.retrieveMT103(component, event, helper).then(function (results) {
        if (results != null && results != "" && results != undefined) {
          //console.log($A.get('$Setup.MyCustomSet__c.URL__c'));
          var domain = $A.get("$Label.c.domain");
          if (component.get("v.isOneTrade") == false) {
            if (component.get("v.fromCashNexus") == true) {
              domain = $A.get("$Label.c.domainCashNexus");
            }
            if (component.get("v.backfront") == true) {
              domain = $A.get("$Label.c.domainBackfront");
            }
          }

          window.location.href =
            domain +
            "/sfc/servlet.shepherd/document/download/" +
            results +
            "?operationContext=S1";

          setTimeout(function () {
            helper.removeMT103(component, event, helper, results);
          }, 80000);
        }
      });
    } catch (e) {
      console.log(e);
    }
  },

  /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to remove the downloaded MT103
    History
    <Date>			<Author>		<Description>
    17/12/2019		R. Alexander Cervino     Initial version*/

  removeMT103: function (component, event, helper, ID) {
    try {
      var action = component.get("c.removeMT103");
      //Send the payment ID
      action.setParams({ id: ID });
      action.setCallback(this, function (response) {
        var state = response.getState();

        if (state === "ERROR") {
          var errors = response.getError();
          if (errors) {
            if (errors[0] && errors[0].message) {
              console.log("Error message: " + errors[0].message);
            }
          } else {
            console.log("Unknown error");
          }
        } else if (state === "SUCCESS") {
        }
      });
      $A.enqueueAction(action);
    } catch (e) {
      console.log(e);
    }
  },

  /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to retieve the MT103
    History
    <Date>			<Author>		<Description>
    16/12/2019		R. Alexander Cervino     Initial version*/

  retrieveMT103: function (component, event, helper) {
    try {
      var action = component.get("c.downloadMT103Doc");
      //Send the payment ID
      //action.setParams({str:component.get("v.item.paymentDetail.paymentId")});
      action.setParams({ str: event.currentTarget.id });
      return new Promise(function (resolve, reject) {
        action.setCallback(this, function (response) {
          var state = response.getState();
          if (state === "ERROR") {
            var errors = response.getError();
            if (errors) {
              if (errors[0] && errors[0].message) {
                console.log("Error message: " + errors[0].message);
                reject(errors);
              }
            } else {
              console.log("Unknown error");
            }
          } else if (state === "SUCCESS") {
            resolve(response.getReturnValue());
          }
        });
        $A.enqueueAction(action);
      });
    } catch (e) {
      console.log(e);
    }
  },

  /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to get date by user locale
    History
    <Date>			<Author>		<Description>
    17/03/2020		R. Alexander Cervino     Initial version*/

  getDateTime: function (component, event, helper) {
    try {
      if (component.get("v.item.paymentDetail.statusDate") != undefined) {
        var action = component.get("c.getDateAndTime");
        action.setParams({
          dateT: component.get("v.item.paymentDetail.statusDate")
        });

        action.setCallback(this, function (response) {
          var state = response.getState();
          if (state === "SUCCESS") {
            var res = response.getReturnValue();
            var results =
              res.substring(8, 10) +
              "/" +
              res.substring(5, 7) +
              "/" +
              res.substring(0, 4) +
              " | " +
              res.substring(11);
            component.set("v.item.paymentDetail.statusDate", results);
          } else {
            var errors = response.getError();
            if (errors) {
              if (errors[0] && errors[0].message) {
                console.log("Error message: " + errors[0].message);
              }
            } else {
              console.log("Unknown error");
            }
          }
        });
        $A.enqueueAction(action);
      }
    } catch (e) {
      console.log("CMP_IPTDetailParent / getDummyData : " + e);
    }
  },

  /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to download the MT103
    History
    <Date>			<Author>		<Description>
    12/12/2019		R. Alexander Cervino     Initial version*/

  setPaymentStatus: function (payments) {
    for (var key in payments) {
      // var status =component.get("v.item.paymentDetail.transactionStatus.status");
      // var reason=component.get("v.item.paymentDetail.transactionStatus.reason");
      // if(status=='RJCT'){
      //     component.set("v.statusLabel",$A.get("$Label.c.payment_statusOne"));
      //     component.set("v.statusClass","icon-circle__red");
      // }
      // if(status=='ACSC' || status=='ACCC'){
      //     component.set("v.statusLabel",$A.get("$Label.c.payment_statusTwo"));
      //     component.set("v.statusClass","icon-circle__green");
      // }
      // if(status=='ACSP'){
      //     if(reason=='G000' || reason =='G001' || reason==null || reason=='null'){
      //         component.set("v.statusLabel",$A.get("$Label.c.payment_statusThree"));
      //         component.set("v.statusClass","icon-circle__blue");
      //     }
      //     if(reason=='G002' || reason =='G003' || reason =='G004'){
      //         component.set("v.statusLabel",$A.get("$Label.c.payment_statusFour"));
      //         component.set("v.statusClass","icon-circle__orange");
      //     }
      // }
      var status = payments[key].paymentDetail.transactionStatus.status;
      var reason = payments[key].paymentDetail.transactionStatus.reason;
      if (status == "RJCT") {
        payments[key].paymentDetail.statusLabel = $A.get(
          "$Label.c.payment_statusOne"
        );
        payments[key].paymentDetail.statusClass = "icon-circle__red";
      }
      if (status == "ACSC" || status == "ACCC") {
        payments[key].paymentDetail.statusLabel = $A.get(
          "$Label.c.payment_statusTwo"
        );
        payments[key].paymentDetail.statusClass = "icon-circle__green";
      }
      if (status == "ACSP") {
        if (
          reason == "G000" ||
          reason == "G001" ||
          reason == null ||
          reason == "null"
        ) {
          payments[key].paymentDetail.statusLabel = $A.get(
            "$Label.c.payment_statusThree"
          );
          payments[key].paymentDetail.statusClass = "icon-circle__blue";
        }
        if (reason == "G002" || reason == "G003" || reason == "G004") {
          payments[key].paymentDetail.statusLabel = $A.get(
            "$Label.c.payment_statusFour"
          );
          payments[key].paymentDetail.statusClass = "icon-circle__orange";
        }
      }
    }
    return payments;
  }
});
