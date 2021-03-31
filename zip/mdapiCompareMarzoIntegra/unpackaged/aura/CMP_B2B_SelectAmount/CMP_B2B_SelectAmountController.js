({
  initComponent: function (component, event, helper) {
    /*var steps = component.get('v.steps');
        steps.lastModifiedStep = 3;
        component.set('v.steps', steps);
       // let transferType = component.get('v.transferType');
       // let PTT_international_transfer_single = $A.get('$Label.c.PTT_international_transfer_single');
       	let BOOK_TO_BOOK =  $A.get('$Label.c.CNF_payment_productId_001');
        let paymentDraft = component.get('v.paymentDraft');
        if(!$A.util.isEmpty(paymentDraft)){
            if (paymentDraft.sourceAccount.currencyCodeAvailableBalance != paymentDraft.destinationAccount.currencyCodeAvailableBalance) {
                component.set('v.showBothAmountInput', true);
            } else {
                component.set('v.showBothAmountInput', false);
            }
            
            if(!$A.util.isEmpty(paymentDraft.productId)){
                let EUR = $A.get('$Label.c.EUR');
                let GBP = $A.get('$Label.c.GBP');
                let rateCurrencies = EUR + '/' + GBP;
                component.set('v.rateCurrencies', rateCurrencies);
            }else{
                //ToDO get rate currencies from paymentDraft structure
            }
        }*/

    helper
      .getPaymentDetails(component, event, helper)
      .then(
        $A.getCallback(function (value) {
          return helper.initComponent(component, event, helper);
        })
      )
      .then(
        $A.getCallback(function (value) {
          return helper.ServicePaymentLine(component, event, helper);
        })
      )
      .then(
        $A.getCallback(function (value) {
          return helper.formatUpdatedDate(component, event, helper);
        })
      )
      .then(
        $A.getCallback(function (value) {
          return helper.showHideComponents(component, event, helper);
        })
      )
      .catch(
        $A.getCallback(function (error) {
          console.log(error);
          reject("KO");
        })
      );
  },

  handleCheckContinue: function (component, event, helper) {
    component.set("v.spinner", true);
    helper
      .paymentDetailsContinue(component, event, helper)
      .then(
        $A.getCallback(function (value) {
          return helper.updatePaymentDetails(component, helper);
        })
      )
      .then(
        $A.getCallback(function (value) {
          return helper.processPaymentTransferFees(component, event, helper);
        })
      )
      .then(
        $A.getCallback(function (value) {
          helper.completeStep(component, event, helper);
        })
      )
      .catch(
        $A.getCallback(function (error) {
          console.log(error);
          reject("KO");
        })
      )
      .finally(
        $A.getCallback(function () {
          component.set("v.spinner", false);
        })
      );
    //SNJ_DEPRECATED
    /* if (($A.util.isEmpty(paymentDraft.amountSend) || paymentDraft.amountSend == 0)) {
            errorMSG = $A.get('$Label.c.B2B_Error_Enter_Input');
            var msg_parameter = $A.get('$Label.c.B2B_Amount_Input_Placeholder');
            errorMSG = errorMSG.replace('{0}', msg_parameter);
            component.set('v.errorMSG', errorMSG);
        } else if (component.get("v.disabledContinue") == true) {
            var notificationTitle =  $A.get('$Label.c.B2B_Error_Problem_Loading');
            var bodyText =  $A.get('$Label.c.B2B_Error_Enter_Amount');
            helper.showToast(component, notificationTitle, bodyText, true);
        } else {
            component.set('v.errorMSG', errorMSG);
            component.set('v.spinner', true);
            helper.processPaymentTransferFees(component, event, helper).then($A.getCallback(function (value) {
                helper.completeStep(component, event, helper);
            })).catch($A.getCallback(function (error) {
                console.log(error);
            })).finally($A.getCallback(function () {
                component.set('v.spinner', false);
            }));
        }*/
  },

  handleEditingProcess: function (component, event, helper) {
    let params = event.getParams().arguments;
    let amountEntered = null;
    let amountEnteredFrom = "";
    if (!$A.util.isEmpty(params.amountEntered)) {
      amountEntered = params.amountEntered;
    }
    if (!$A.util.isEmpty(params.amountEnteredFrom)) {
      amountEnteredFrom = params.amountEnteredFrom;
    }
    helper
      .showInformation(
        component,
        event,
        helper,
        amountEntered,
        amountEnteredFrom
      )
      .then(
        $A.getCallback(function (value) {
          component.set("v.isEditing", false);
          // helper.handleChangeAmount(component, event, helper, amountEntered, amountEnteredFrom);
        })
      )
      .catch(
        $A.getCallback(function (error) {
          console.log(error);
        })
      );
  },

  handleChange: function (component, event, helper) {
    let params = event.getParams();
    var steps = component.get("v.steps");
    steps.lastModifiedStep = 3;
    steps.focusStep = 3;
    steps.shownStep = 3;
    component.set("v.steps", steps);
    var amountEnteredFrom = "";
    if (params.inputId == "sourceAmountInput") {
      amountEnteredFrom = "source";
    } else if (params.inputId == "recipientAmountInput") {
      amountEnteredFrom = "recipient";
    }
    helper.handleChangeAmount(
      component,
      event,
      helper,
      params.amount,
      amountEnteredFrom
    );
    component.set("v.isEditing", false);
  }

  /*
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Execute methods when recipient currency is changed
    History:
    <Date>          <Author>            <Description>
    18/11/2020      Shahad Naji         Initial version
    */
  //SNJ_DEPRECATED
  /*
    handleCurrencyChange: function (component, event, helper) {
        let paymentDraft = component.get('v.paymentDraft');
        paymentDraft.timestamp = '';
        paymentDraft.exchangeRate = 0;
        paymentDraft.amountSend = null;
        paymentDraft.amountReceive = null;
        paymentDraft.exchangeRateServiceResponse = null;
        paymentDraft.transactionFee = null;
        paymentDraft.transactionFeeCurrency = null;
        paymentDraft.transactionFeeServiceResponse = null;
        paymentDraft.convertedTransactionFee = null;
        paymentDraft.convertedTransactionFeeCurrency = null;
        paymentDraft.convertedTransactionFeeServiceResponse = null;
        component.set('v.convertedAmount', null);
        component.set('v.exchangeRateToShow', null);
        component.set('v.paymentDraft', paymentDraft);
    }*/
});
