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
            var json = component.get("v.movementsList");
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


    navigateToDetail : function(component, event, helper) {
        var actualMovement = component.get("v.movementsList")[event.currentTarget.id].obtTransacBusqueda;
        var account = component.get("v.accountInfo");
        console.log(JSON.stringify(actualMovement));
        

        var url = "c__acountCode=" + account.accountCode 
        + "&c__acountName=" + account.accountName
        + "&c__bankName=" + account.bankName
        + "&c__subsidiaryName=" + account.subsidiaryName
        + "&c__accountNumber=" + account.accountNumber
        + "&c__accountCurrency=" + account.accountCurrency
        + "&c__movementValueDate=" + actualMovement.valueDate
        + "&c__movementCategory=" + actualMovement.tipoTransaccion
        + "&c__movementClientRef=" + actualMovement.refCliente
        + "&c__movementAmount=" + actualMovement.importe
        + "&c__movementBookDate=" + actualMovement.valueDate
        + "&c__movementBankRef=" + actualMovement.refBanco
        +"&c__movementDescription=" + actualMovement.descripcion;
        console.log(url);
        component.find("Service").redirect("movement-detail", url);
    },

    sortBy : function(component, event, helper) {
        var elementId = event.currentTarget.id;
        var data = component.get("v.movementsList");
        let sort;
        switch(elementId){
            
            case "CategoryDesc":
                component.set("v.sortByCategory", "asc");
                sort = data.sort((a, b) => ('' + a.obtTransacBusqueda.tipoTransaccion).localeCompare(b.obtTransacBusqueda.tipoTransaccion));
                break;
            case "CategoryAsc":
                component.set("v.sortByCategory", "desc");
                sort = data.sort((a, b) => ('' + b.obtTransacBusqueda.tipoTransaccion).localeCompare(a.obtTransacBusqueda.tipoTransaccion));
                break;
            case "AmountDesc":
                component.set("v.sortByAmount", "asc");
                sort = data.sort((a, b) => parseFloat(b.obtTransacBusqueda.importe) - parseFloat(a.obtTransacBusqueda.importe));
                break;
            case "AmountAsc":
                component.set("v.sortByAmount", "desc");
                sort = data.sort((a, b) => parseFloat(a.obtTransacBusqueda.importe) - parseFloat(b.obtTransacBusqueda.importe));
                break;
                                    
        }
        console.log(sort);
        component.set("v.movementsList", sort);

    },



})