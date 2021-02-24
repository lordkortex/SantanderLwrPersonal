({
    init: function (component, event, helper) {
        console.log('init CMP_B2B_FilterOptionsCheckbox.');
    },

    handleCheckbox: function(component, event, helper) {
        helper.setChecked(component, helper, event.target.checked);
    }
})