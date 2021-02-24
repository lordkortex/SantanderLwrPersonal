({
    buttonSelected: function(component, event, helper){
        console.log("asdpjasdpasdjpoasdjasdpjoasdasdjoasdjasdpo ");
        var compEvent = component.getEvent("CheckChanged");

        compEvent.setParams({ 
            data : component.get("v.data"),
            checked : event.currentTarget.checked
         });
        //fire event from child and capture in parent
        console.log("compEvent " + compEvent.getParam("checked"));
        compEvent.fire();
                    

    }
    })