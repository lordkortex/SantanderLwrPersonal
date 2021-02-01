({
    handleDoInit : function(component,event,helper) {
        component.set("v.loading", true);
        var sPageURLMain = decodeURIComponent(window.location.search.substring(1));
        if(sPageURLMain != "")
        {
            component.find("Service").dataDecryption(component,helper, sPageURLMain, this.handleParams);

        }    },

     /*
	Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Function to get the URL params that is sended from the global balance component.
    History
    <Date>			<Author>			<Description>
	31/01/2020		Guillermo Giral  	Initial version
	*/
    handleParams : function (component, helper, response){
    
        console.log(response);
            if(response != "") {
                var sParameterName;
                var data = {}; 
                for(var i = 0; i < response.length ; i++) {
                    sParameterName = response[i].split("="); 
                    
                    switch(sParameterName[0]) {
                        case("c__acountCode"):
                            sParameterName[1] === undefined ? 'Not found' : data.accountCode = sParameterName[1];    
                            break;  
                        case("c__acountName"):
                            sParameterName[1] === undefined ? 'Not found' :  data.accountName = sParameterName[1];
                            break;
                        case("c__bankName"):
                            sParameterName[1] === undefined ? data.bankName="" : data.subsidiaryName = sParameterName[1];
                            break;
                        case("c__subsidiaryName"):
                            sParameterName[1] === undefined ? data.subsidiaryName="" : data.bankName = sParameterName[1];
                            break;
                        case("c__accountNumber"):
                            sParameterName[1] === undefined ? 'Not found' : data.accountNumber = sParameterName[1];
                            break;
                        case("c__accountCurrency"):
                            sParameterName[1] === undefined ? 'Not found' : data.accountCurrency = sParameterName[1];
                            break;
                        case("c__movementValueDate"):
                            sParameterName[1] === undefined ? 'Not found' : data.movementValueDate = sParameterName[1];
                            break;
                        case("c__movementCategory"):
                            sParameterName[1] === undefined ? 'Not found' : data.movementCategory = sParameterName[1];
                            break;
                        case("c__movementClientRef"):
                            sParameterName[1] === undefined ? 'Not found' : data.movementClientRef = sParameterName[1];
                            break;
                        case("c__movementBankRef"):
                            sParameterName[1] === undefined ? 'Not found' : data.movementBankReference = sParameterName[1];
                            break;
                        case("c__movementAmount"):
                            sParameterName[1] === undefined ? 'Not found' : data.movementAmount = sParameterName[1];
                            break;
                        case("c__movementBookDate"):
                        console.log(sParameterName[1]);
                            sParameterName[1] === undefined ? ' Not found' : data.movementBookDate = sParameterName[1];
                            break;
                        case("c__movementDescription"):
                            sParameterName[1] === undefined ? 'Not found' : data.movementDescription = sParameterName[1];
                            break;
                    }
                }  
                component.set("v.data", data);
                component.set("v.loading", false);
            }
        }


})