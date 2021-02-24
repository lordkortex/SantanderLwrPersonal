({
    checkOTP : function(component, event, helper) {

        //Get all numbers
        var input1 = document.getElementById("1").value;
        var input2 = document.getElementById("2").value;
        var input3 = document.getElementById("3").value;
        var input4 = document.getElementById("4").value;;
        var input5 = document.getElementById("5").value;
        var input6 = document.getElementById("6").value;

        var inputOTP = input1+input2+input3+input4+input5+input6;

        component.set("v.OTP",inputOTP);
    }
})