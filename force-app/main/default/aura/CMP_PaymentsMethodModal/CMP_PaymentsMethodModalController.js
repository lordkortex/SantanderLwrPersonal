({
    /*
	Author:         Beatrice Hill
    Company:        Deloitte
    Description:    Method to set country dropdown values
    History:
    <Date>          <Author>            <Description>
    16/06/2020      Beatrice Hill       Initial version
    */
    doInit: function (component, event, helper) {
        helper.setDropdownList(component, helper);
    },

    /*
    Author:         Beatrice Hill
    Company:        Deloitte
    Description:    Method to close payment methods modal (CMP_PaymentsMethodModal)
    History:
    <Date>          <Author>            <Description>
    15/06/2020      Beatrice Hill       Initial version
    */
    closeMethodModal: function (component, event, helper) {
        helper.closeModal(component, helper);
    }
})