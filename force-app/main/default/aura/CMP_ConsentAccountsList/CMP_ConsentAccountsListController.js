({
    init: function (component, event, helper) {
        component.set('v.columns', [
            {label: $A.get("$Label.c.name"), fieldName: 'Name', type: 'text', sortable: true},
            {label: $A.get("$Label.c.Type_of_Consent"), fieldName: 'ACC_PCK_Type__c', type: 'text', sortable: true},
            {label: $A.get("$Label.c.consentManagement"), fieldName: 'ACC_PCK_Management__c', type: 'text', sortable: true},
            {label: $A.get("$Label.c.Consent_Validation"), fieldName: 'ACC_CHK_Validation__c', type: 'boolean', sortable: true},
            {label: $A.get("$Label.c.Final_Consent_Date"), fieldName: 'ACC_DATE_FinalDate__c', type: 'date', sortable: true},
            {type: 'button-icon',
                fixedWidth: 40,
                typeAttributes: {
                    iconName: 'utility:edit',
                    name: 'edit_record', 
                    title: $A.get("$Label.c.edit"),
                    variant: 'border-filled',
                    alternativeText: $A.get("$Label.c.edit"),
                    disabled: false, 
                }   
            } 
        ]);
        helper.refreshList(component, event, helper);
    },
    
    handleNewAccount : function(component, event, helper) {
        component.set('v.accountId', '');
        helper.openModalNewAccount(component, event, helper);
    }, 

    editRecordAccount : function(component, event, helper) {
        var accountId = event.getParam('row').Id;
        component.set('v.accountId', accountId);    
        helper.openModalNewAccount(component, event, helper);
    }, 

    updateColumnSorting : function(component, event, helper) {
        var fieldName = event.getParam('fieldName');
        var sortDirection = event.getParam('sortDirection');

        component.set("v.sortedBy", fieldName);
        component.set("v.sortedDirection", sortDirection);
        helper.sortingAndPagination(component, event, helper, fieldName, sortDirection);
    },

    next : function (component, event, helper) {
        helper.next(component, event);
    },

    previous : function (component, event, helper) {
        helper.previous(component, event);
    }, 

    manageNewAccountResult: function (component, event, helper) {
        var accepted = event.getParam('accepted');
        if (accepted) {
            helper.refreshList(component, event, helper);
        }
    }
})