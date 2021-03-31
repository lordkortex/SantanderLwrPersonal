({
    /*
    Author:         Bea Hill
    Company:        Deloitte
    Description:    Handle the status history object and create the lists of comments to show in each part of the tracking
    History:
    <Date>          <Author>            <Description>
    30/09/2020      Bea Hill            Initial version
    */
    handleStatusHistory : function(component, event, helper) {
        var payment = component.get('v.payment');
        var statusHistory = payment.operationStatusesHistorical;
        var creationList = [];
        var authorizationList = [];
        var inProgressList = [];
        var completedList = [];
        for (let i = 0; i < statusHistory.length; i++) {
            let statusItem = statusHistory[i];
            statusItem.time = $A.localizationService.formatTime(statusItem.statusDate, 'HH:mm');
            if (statusItem.status == "001"  && statusItem.reason == "000") {
                if (statusHistory.length==1) {
                    statusItem.comment1 = $A.get("$Label.c.PAY_paymentInfoSaved");
                    statusItem.comment2 = $A.get("$Label.c.PAY_withSuccess");
                } else {
                    statusItem.comment1 = $A.get("$Label.c.PAY_paymentCreatedBy");
                    statusItem.comment2 = statusItem.userName + '.';
                }
                creationList.push(statusItem);
            } else if (statusItem.status == "002"  && statusItem.reason == "001") {
                statusItem.comment1 = $A.get("$Label.c.PAY_paymentPendingOf");
                statusItem.comment2 = $A.get("$Label.c.PAY_authorization") + '.';
                authorizationList.push(statusItem);
            } else if (statusItem.status == "002"  && statusItem.reason == "002") {
                statusItem.comment1 = $A.get("$Label.c.PAY_paymentPendingOf");
                statusItem.comment2 = $A.get("$Label.c.PAY_authorization") + '.';
                authorizationList.push(statusItem);
            }else if (statusItem.status == "003"  && statusItem.reason == "001") {
                statusItem.comment1 = $A.get("$Label.c.PAY_paymentSentToReviewBy");
                statusItem.comment2 = statusItem.userName  + '.';
                component.set('v.reviewSenderGlobalId', statusItem.globalUserId);
                authorizationList.push(statusItem);
            }else if (statusItem.status == "997"  && statusItem.reason == "001") {
                statusItem.comment1 = $A.get("$Label.c.PAY_paymentDeniedBy");
                statusItem.comment2 = statusItem.userName + '.';
                authorizationList.push(statusItem);
            }else if (statusItem.status == "101" && statusItem.reason == "001") {
                statusItem.comment1 = $A.get("$Label.c.PAY_paymentAuthorisedBy");
                statusItem.comment2 = statusItem.userName + '.';
                authorizationList.push(statusItem);
            }else if (statusItem.status == "103" && statusItem.reason == "001") {
                statusItem.comment1 = $A.get("$Label.c.PAY_paymentSettledWithSuccess");
                statusItem.comment2 = $A.get("$Label.c.PAY_recipientReceivedPayment");
                completedList.push(statusItem);
            // }else if (statusItem.status == "999" && statusItem.reason == "103") { // el 999-103 se replaza con 999-002
            //     completedList.push(statusItem);
            }else if (statusItem.status == "999" && statusItem.reason == "001") { 
                statusItem.comment1 = $A.get("$Label.c.PAY_RejectedOrderingBank") + '.';
                statusItem.comment2 = '';
                authorizationList.push(statusItem);
            }else if (statusItem.status == "999" && statusItem.reason == "002") { 
                statusItem.comment1 = $A.get("$Label.c.PAY_UnauthorizedByBank");
                statusItem.comment2 = $A.get("$Label.c.PAY_ErrorOccurredWithPayment");
                completedList.push(statusItem);
            }else if (statusItem.status == "999" && statusItem.reason == "003") { 
                statusItem.comment1 = $A.get("$Label.c.PAY_RejectedTechError") + '.';
                statusItem.comment2 = '';
                authorizationList.push(statusItem);
            }else if (statusItem.status == "998" && statusItem.reason == "003") { 
                statusItem.comment1 = $A.get("$Label.c.PAY_PaymentCanceledBy") + '.';
                statusItem.comment2 = statusItem.userName + '.';
                authorizationList.push(statusItem);
            }else {
                console.log('Status history item not recognized: ', JSON.stringify(statusItem));
            }
        }
        component.set('v.creation', creationList);
        component.set('v.authorization', authorizationList);
        component.set('v.inProgress', inProgressList);
        component.set('v.completed', completedList);
        var lastAuthorizationElement = authorizationList.length - 1;
        if (!$A.util.isEmpty(authorizationList)){
            component.set('v.authorizationLength', authorizationList.length - 1);
            component.set('v.authorizationTopLine', authorizationList[lastAuthorizationElement]);
        }
    },
    
    handleInReviewModal : function(component, event, helper) {
        let payment = component.get('v.payment');
        let subject = payment.reviewAdditionalData.subject;
        let description = payment.reviewAdditionalData.description;
        let currentUserGlobalId = component.get('v.currentUser.globalId');
        let paymentUserGlobalId = component.get('v.payment.userGlobalId');
        let signatory = component.get('v.signLevel.signatory');
        let reviewSenderGlobalId = component.get('v.reviewSenderGlobalId');


        if(currentUserGlobalId != paymentUserGlobalId
            && currentUserGlobalId != reviewSenderGlobalId
            && signatory == "true"){
                component.set('v.isOtherAuthorizer', true);
        }else{
            if (!$A.util.isEmpty(subject)){
                component.set('v.subject', subject);
            }else{
                component.set('v.subject', $A.get("$Label.c.PAY_wrongAmount_toast"));
                console.log('No se ha declarado el subject');
            }
            if(!$A.util.isEmpty(description)){
                component.set('v.description', description);
            }else{
                console.log('No se ha declarado el description');
            }
        }

    }
    
})