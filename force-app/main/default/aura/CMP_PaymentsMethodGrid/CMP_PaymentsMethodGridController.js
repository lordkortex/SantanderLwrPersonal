({
    goToBooktoBook: function (component, event, helper) {
        var url ="";
        let navService = component.find("navService");

        if(url!=''){
            
            helper.encrypt(component, url).then(function(results){

                    let pageReference = {
                            type: "comm__namedPage", 
                            attributes: {
                                    pageName: component.get("v.bookToBookPage")
                            },
                            state: {
                                    params : results
                            }
                    }
                    navService.navigate(pageReference); 
            });
        }else{
            let pageReference = {
                type: "comm__namedPage", 
                attributes: {
                        pageName: component.get("v.bookToBookPage")
                },
                state: {
                        params : ''
                }
            }
            navService.navigate(pageReference); 

        }
    },

    goToSingle: function (component, event, helper) {
        component.set('v.showToast', true);
    },

    goToMultiple: function(component, event, helper) {
        component.set('v.showToast', true);
    }
})