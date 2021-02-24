({
	/*
	Author:         Antonio Duarte
    Company:        Deloitte
    Description:    This method initializes CMP_LoginError component
    History
    <Date>			<Author>			<Description>
	10/08/2020		Antonio Duarte     	Initial version
	*/
	doInit : function(component, event, helper) {
        helper.getURLParams(component, event,helper);
    }
})