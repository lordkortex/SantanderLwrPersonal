/*
Author:         Diego Asis
Company:        Deloitte
Description:    Training screen controller
History
<Date>			<Author>		    <Description>
27/01/2020		Diego Asis     		Initial version
-->*/
({
    //$Label.c.Payments
    //$Label.c.Beneficiary
    //$Label.c.Users
    //$Label.c.Roles
    //$Label.c.Groups
    //$Label.c.AuthorisationPolicies
	
    doInit : function(component, event, helper) {
		  
        //Payments
        var paymentsList = [$A.get("$Label.c.Payments1"), $A.get("$Label.c.Payments2")];
        component.set("v.paymentsList", paymentsList);
        
        //Beneficiary
        var beneficiaryList = [$A.get("$Label.c.Beneficiary1"), $A.get("$Label.c.Beneficiary2")];
        component.set("v.beneficiaryList", beneficiaryList);
        
        //Users
        var usersList = [$A.get("$Label.c.Users1"), $A.get("$Label.c.Users2")];
        component.set("v.usersList", usersList);
        
        //Roles
        var rolesList = [$A.get("$Label.c.Roles1"), $A.get("$Label.c.Roles2"), $A.get("$Label.c.Roles3")];
        component.set("v.rolesList", rolesList);
        
        //Groups
        var groupsList = [$A.get("$Label.c.Groups1"), $A.get("$Label.c.Groups2")];
        component.set("v.groupsList", groupsList);
        
        //Authorisaton policies
        var authorisationsList = [$A.get("$Label.c.AuthorisationPolicies1"), $A.get("$Label.c.AuthorisationPolicies2")];
        component.set("v.authorisationsList", authorisationsList);
	}
})