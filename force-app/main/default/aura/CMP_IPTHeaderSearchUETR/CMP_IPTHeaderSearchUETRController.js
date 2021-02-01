({
    /*
	Author:         Adrian Muñio
    Company:        Deloitte
	Description:    Method to autosearch for a value that comes from cache.
    History
    <Date>			<Author>			<Description>
	09/11/2020		Adrian Muñio   		Initial version
    */
   checkSSO : function(component, event, helper){
        
        var inputValue = component.get("v.searchValue");
        var valid;

        if(inputValue == undefined || inputValue == null || inputValue == ''){
            $A.util.addClass(component.find("uetrError"),'slds-hide');
            valid = false;
        }else{
            //CAMBIO UETR DE MAYUSCULAS A MINUSCULAS 30/07/2020 INCIDENCIA
            inputValue = inputValue.toLowerCase();
            let re = "^([a-f0-9]{8})-([a-f0-9]{4})-4([a-f0-9]{3})-([89ab])([a-f0-9]{3})-([a-f0-9]{12})$";
            let found = inputValue.match(re);
            if(inputValue.length==36 && found!=null){
                $A.util.addClass(component.find("uetrError"),'slds-hide');
                valid = true;
            }else{
                $A.util.removeClass(component.find("uetrError"),'slds-hide');
                valid = false;
            }
        }

        if(valid && !$A.util.isEmpty(inputValue)){
            try{
                helper.getData(component, event, helper, inputValue);
            } catch (e) {
                console.log(e);
            }
        }
    },
    
    /*
	Author:         Adrian Muñio
    Company:        Deloitte
	Description:    Method to go to the previous page.
    History
    <Date>			<Author>			<Description>
	17/06/2020		Adrian Muñio   		Initial version
    */
	goBack : function(component, event, helper) {
        window.history.back();
    },

    /*
	Author:         Adrian Muñio
    Company:        Deloitte
	Description:    Method to clear the search field.
    History
    <Date>			<Author>			<Description>
	17/06/2020		Adrian Muñio   		Initial version
    */
    handleClear : function(component, event, helper) {
        component.set("v.isSearched", false);
        component.set("v.searchValue", "");
        document.getElementById("text-input-id-1").focus();
    },
    
    /*
	Author:         Adrian Muñio
    Company:        Deloitte
	Description:    Method to save input value into search when user key down the input field.
    History
    <Date>			<Author>			<Description>
	17/06/2020		Adrian Muñio   		Initial version
    */
    setInputOnKeyDown : function(component, event, helper) {
        let inputValue = event.target.value;
        let key = event.key;
        let keyCode = event.keyCode;
        
        if(key == 'Enter' && keyCode == 13){
            
            var valid;
            if(inputValue == undefined || inputValue == null || inputValue == ''){
                $A.util.addClass(component.find("uetrError"),'slds-hide');
                valid = false;
            }else{
                //CAMBIO UETR DE MAYUSCULAS A MINUSCULAS 30/07/2020 INCIDENCIA
        		inputValue = inputValue.toLowerCase();
                let re = "^([a-f0-9]{8})-([a-f0-9]{4})-4([a-f0-9]{3})-([89ab])([a-f0-9]{3})-([a-f0-9]{12})$";
                let found = inputValue.match(re);
                if(inputValue.length==36 && found!=null){
                    $A.util.addClass(component.find("uetrError"),'slds-hide');
                    valid = true;
                }else{
                    $A.util.removeClass(component.find("uetrError"),'slds-hide');
                    valid = false;
                }
            }

            if (inputValue != component.get("v.searchValue") && valid && !$A.util.isEmpty(inputValue)) {
                component.set('v.searchValue', inputValue);
                try{
                    helper.getData(component, event, helper, inputValue);
                } catch (e) {
                    console.log(e);
                }
            }
        }
    },

    /*
	Author:         Adrian Muñio
    Company:        Deloitte
	Description:    Method to save input value into search when user leaves the input field
    History
    <Date>			<Author>			<Description>
	17/06/2020		Adrian Muñio   		Initial version
    */
    setInputOnBlur : function(component, event, helper) {        
        let inputValue = event.target.value;
        var valid;

        if(inputValue == undefined || inputValue == null || inputValue == ''){
            $A.util.addClass(component.find("uetrError"),'slds-hide');
            valid = false;
        }else{
            //CAMBIO UETR DE MAYUSCULAS A MINUSCULAS 30/07/2020 INCIDENCIA
        	inputValue = inputValue.toLowerCase();
            let re = "^([a-f0-9]{8})-([a-f0-9]{4})-4([a-f0-9]{3})-([89ab])([a-f0-9]{3})-([a-f0-9]{12})$";
            let found = inputValue.match(re);
            if(inputValue.length==36 && found!=null){
                $A.util.addClass(component.find("uetrError"),'slds-hide');
                valid = true;
            }else{
                $A.util.removeClass(component.find("uetrError"),'slds-hide');
                valid = false;
            }
        }

        if(inputValue != component.get("v.searchValue") && valid && !$A.util.isEmpty(inputValue)){
            component.set('v.searchValue', inputValue);
            try{
                helper.getData(component, event, helper, inputValue);
            } catch (e) {
                console.log(e);
            }
        }
    }
})