({
    /*
	Author:         Shahad
    Company:        Deloitte
    Description:    This method initializes CMP_PaymentDetails component
    History
    <Date>			<Author>			<Description>
	27/02/2020		Shahad Naji     	Initial version
	*/
	doInit : function(component, event, helper) {
		var iUetr = component.get("v.uetr");
        var iAgent = component.get("v.agent");

        helper.getBicListFull(component, event,helper);
        helper.getDataObject(component, event,helper);
        //helper.getDateTime(component,event, helper,component.get("v.iObject.lastUpdate"));

    },
    /*
	Author:         Shahad
    Company:        Deloitte
    Description:    This method initializes CMP_PaymentDetails component
    History
    <Date>			<Author>			<Description>
	27/02/2020		Shahad Naji     	Initial version
	*/
	getDataSteps : function(component, event, helper) {
       
        helper.getDataSteps(component);
    },
    
    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to download the MT103
    History
    <Date>			<Author>		<Description>
    12/12/2019		R. Alexander Cervino     Initial version*/

    getStatuses : function(component, event, helper){

        var status =component.get("v.item.paymentDetail.transactionStatus.status");
        var reason=component.get("v.item.paymentDetail.transactionStatus.reason");;
        if(status=='RJCT'){
            component.set("v.statusLabel",$A.get("$Label.c.payment_statusOne"));
            component.set("v.statusClass","icon-circle__red");
        }
        if(status=='ACSC'){
            component.set("v.statusLabel",$A.get("$Label.c.payment_statusTwo"));
            component.set("v.statusClass","icon-circle__green");
        }
        if(status=='ACSP'){
            if(reason=='G000' || reason =='G001'){
                component.set("v.statusLabel",$A.get("$Label.c.payment_statusThree"));
                component.set("v.statusClass","icon-circle__blue");
            }
            if(reason=='G002' || reason =='G003' || reason =='G004'){
                component.set("v.statusLabel",$A.get("$Label.c.payment_statusFour"));
                component.set("v.statusClass","icon-circle__orange");
            }
        }
    },
    
    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to download the MT103
    History
    <Date>			<Author>		<Description>
    12/12/2019		R. Alexander Cervino     Initial version*/

    getDataEvent : function(component, event, helper){
        //component.set("v.totalElapsedTime",event.getParam('elapsed'));
    }
})