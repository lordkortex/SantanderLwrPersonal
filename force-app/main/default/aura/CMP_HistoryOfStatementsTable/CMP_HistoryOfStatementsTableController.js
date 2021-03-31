({
        /*
	Author:         Pablo Tejedor
    Company:        Deloitte
    Description:    Function to show the required batch of rows in the table
    History
    <Date>			<Author>			<Description>
	03/03/2020		Pablo Tejedor    Initial version
	*/

    buildTablePage : function(component, event, helper){
        try {
            var json = component.get("v.statementsList");
            var currentPage = event.getParam("currentPage");
            var oldPage = component.get("v.oldPage");
            var perPage = component.get("v.transactionsPerPage");
            var start = component.get("v.start");

            if (currentPage != null && currentPage != undefined && currentPage != '' && oldPage!=currentPage){
                //Update the index of dataset to display
                if(currentPage >oldPage && currentPage!=1){
                    component.set("v.start",perPage*currentPage-perPage);
                    if(Math.ceil(json.length/currentPage) >= perPage){
                        component.set("v.end",perPage*currentPage);
                    }else{
                        component.set("v.end",json.length);
                    }
                }else{
                    component.set("v.end",start);
                    if(currentPage==1){ 
                        component.set("v.start",0);
                        component.set("v.end",perPage);

                    }else{
                        component.set("v.start",start-perPage);
                    }
                }
                component.set("v.oldPage",currentPage);

                //Update a set of the paginated data
                var paginatedValues=[];
                for(var i= component.get("v.start");i<=component.get("v.end");i++){
                    paginatedValues.push(json[i]);
                }

                component.set("v.paginatedTransactions",paginatedValues);
            }
        } catch(e) {
            console.error(e);
        }
    },

    /*
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Method that launches everytime the pagination is changed
    History
    <Date>          <Author>                <Description>
    19/03/2020      Guillermo Giral        Initial version
    */
    paginationChange : function(component, event, helper) {
        helper.buildPagination(component, event ,helper);
    },


    navigateToMovements : function(component, event, helper) {
        

        var selectedExtract = component.get("v.statementsList")[event.currentTarget.id].saldo;
        var account = component.get("v.selectedAccountObject")[0];

        //Acount params
        var url = "c__acountCode=" + account.codigoCuenta 
        + "&c__acountName=" + account.alias
        + "&c__bankName=" + account.bankName
        + "&c__accountCountry=" + account.country
        + "&c__subsidiaryName=" + account.subsidiaryName
        + "&c__accountNumber=" + account.displayNumber
        + "&c__accountCurrency=" + account.currencyCodeAvailableBalance
        + "&c__bookBalance=" + selectedExtract.bookBalance_Formatted
        + "&c__valueBalance=" + selectedExtract.valueBalance_Formatted;

        //Extract params
        url += "&c__valueDate=" + selectedExtract.valueDate;

        //User params
        url += "&c__userNumberFormat=" + component.get("v.userNumberFormat")
        + "&c__userDateFormat=" + component.get("v.userDateFormat");

        component.find("Service").redirect("statement-movement", url);

    }
})