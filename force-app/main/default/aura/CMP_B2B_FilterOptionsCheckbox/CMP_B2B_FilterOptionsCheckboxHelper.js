({
    setChecked: function (component, helper, checked) {
        if (!$A.util.isEmpty(checked)) {
            component.set('v.isChecked', checked);
        }
    },
})