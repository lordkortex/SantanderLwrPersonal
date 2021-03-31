({
    checkNumber : function(component, event, helper) {
        var value = document.getElementById(event.target.id).value;
        var input = event.target;
        if(value != null && value != '' && value!=undefined){
            let validRegExp = new RegExp('[0-9]');
            let isInputValid = validRegExp.test(value);
            if (isInputValid != true ){
                document.getElementById(event.target.id).value = '';
            }else{
                var currentInt = parseInt(event.target.id);
                if(event.target.id!=6){
                    document.getElementById((currentInt+1).toString()).focus();
                }
            }
        }
        helper.checkOTP(component, event, helper);
    },
    checkOTP : function(component, event, helper) {
        helper.checkOTP(component, event, helper);
    }
})