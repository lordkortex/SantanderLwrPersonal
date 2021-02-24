({
    openPaymentDetails : function(component, event, helper) {
        console.log('>>> Open Payment Details');
       // var url = "c__accountNumber="+component.get("v.accountItem.displayNumber")+"&c__bank="+component.get("v.accountItem.bankName")+"&c__mainAmount="+component.get("v.accountItem.amountMainBalance")+"&c__availableAmount="+component.get("v.accountItem.amountAvailableBalance")+"&c__currentCurrency="+component.get("v.accountItem.curencyCodeAvailableBalance");
       var url='c__paymentId='+component.get("v.item.paymentDetail.paymentId")+'&c__valueDate='+component.get("v.item.paymentDetail.valueDate")+'&c__reason='+component.get("v.item.paymentDetail.transactionStatus.reason")+'&c__status='+component.get("v.item.paymentDetail.transactionStatus.status")
       +'&c__orderingAccount='+component.get("v.item.paymentDetail.originatorData.originatorAccount.accountId")+'&c__orderingBIC='+component.get("v.item.paymentDetail.originatorAgent.agentCode")+'&c__orderingBank='+component.get("v.item.paymentDetail.originatorAgent.agentName")
       +'&c__beneficiaryAccount='+component.get("v.item.paymentDetail.beneficiaryData.creditorCreditAccount.accountId")+'&c__beneficiaryName='+component.get("v.item.paymentDetail.beneficiaryData.beneficiaryName")+'&c__beneficiaryBank='+component.get("v.item.paymentDetail.beneficiaryData.creditorAgent.agentName")
       +'&c__beneficiaryBIC='+component.get("v.item.paymentDetail.beneficiaryData.creditorAgent.agentCode")+'&c__amount='+component.get("v.item.paymentDetail.paymentAmount.amount")
       +'&c__currency='+component.get("v.item.paymentDetail.paymentAmount.tcurrency")+'&c__beneficiaryCity='+component.get("v.item.paymentDetail.beneficiaryData.creditorAgent.agentLocation")
       +'&c__beneficiaryCountry='+component.get("v.item.paymentDetail.beneficiaryData.creditorAgent.agentCountry");
       console.log(url);
        if(component.get("v.backfront")==false){
           helper.goTo(component, event,"payment-details", url);
        }else{
            //helper.goTo(component, event,"Payment_Detail", url);  
            helper.goTo(component, event,"c__CMP_BackFrontGPITrackerPaymentDetail", url);                      
        }
    },



    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to show/hide the payment detail
    History
    <Date>			<Author>		<Description>
    12/12/2019		R. Alexander Cervino     Initial version*/

    showHideDetails : function(component, event, helper) {
        helper.showHideDetails(component, event, helper);
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to download the MT103
    History
    <Date>			<Author>		<Description>
    12/12/2019		R. Alexander Cervino     Initial version*/

    downloadMT103 : function(component, event, helper){
        helper.downloadMT103(component, event, helper);
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to download the MT103
    History
    <Date>			<Author>		<Description>
    12/12/2019		R. Alexander Cervino     Initial version*/

    doInit : function(component, event, helper){
        console.log(component.get("v.item.paymentDetail.transactionStatus.status"));
        console.log(component.get("v.item.paymentDetail.transactionStatus.reason"));

        var status =component.get("v.item.paymentDetail.transactionStatus.status");
        var reason=component.get("v.item.paymentDetail.transactionStatus.reason");;
        if(status=='RJCT'){
            component.set("v.statusLabel",$A.get("$Label.c.payment_statusOne"));
            component.set("v.statusClass","icon-circle__red");
        }
        if(status=='ACSC' || status=='ACCC'){
            component.set("v.statusLabel",$A.get("$Label.c.payment_statusTwo"));
            component.set("v.statusClass","icon-circle__green");
        }
        if(status=='ACSP'){
            if(reason=='G000' || reason =='G001' || reason==null || reason=='null'){
                component.set("v.statusLabel",$A.get("$Label.c.payment_statusThree"));
                component.set("v.statusClass","icon-circle__blue");
            }
            if(reason=='G002' || reason =='G003' || reason =='G004'){
                component.set("v.statusLabel",$A.get("$Label.c.payment_statusFour"));
                component.set("v.statusClass","icon-circle__orange");
            }
        }
        helper.getDateTime(component, event, helper);
    }

})