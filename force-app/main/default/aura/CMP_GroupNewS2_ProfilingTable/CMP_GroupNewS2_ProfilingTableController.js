({
    /*
	Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Function used to serve as aura:method. The data and grouping is passed
                    to the method and it builds the grouped table
    History
    <Date>			<Author>			<Description>
	27/01/2020  	Guillermo Giral   	Initial version
	*/
    buildTable : function(component, event, helper){
        var params = event.getParam("arguments");
        if(params){
            // Fetch the data from the aura:method params
            var grouping = params.grouping;
            var innerData = params.innerData;            
            var groupedData = [];

            // Remove SIC - Contingency from the list to add to the table
            innerData = helper.removeSicFromTable(innerData);

            // Build the data structure and group it accordingly
            if(innerData.length > 0){
                for(var key in grouping){
                    var tableData = {};
                    var firstIteration = true;
                    for(var row in innerData){
                        if(
                            innerData[row].account.substring(0,2) == grouping[key] && 
                            innerData[row].account != $A.get("$Label.c.ServiceProfiling_EntitltementNoAccount")
                        ){
                            if(firstIteration){
                                var rows = [];
                                rows.push(innerData[row]);
                                tableData.rows = rows;
                                firstIteration = false;
                            } else {
                                var rowPerCountryCode = tableData.rows;
                                rowPerCountryCode.push(innerData[row]);
                                tableData.rows = rows;
                            }
                            tableData.country = grouping[key];
                            tableData.displayRow = true;
                        }
                    }
                    if(Object.keys(tableData).length > 0){
                        groupedData.push(tableData);
                    }
                }
                component.set("v.data", groupedData);
                component.set("v.filteredData", component.get("v.data"));
                var newGrouping = component.get("v.grouping");
                for(var group in grouping){
                    if(!newGrouping.includes(grouping[group])){
                        newGrouping.push(grouping[group]);
                    }
                }
                component.set("v.grouping", newGrouping);
            }
        }
    },

    /*
	Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Function used to serve as aura:method. The new data and grouping is passed
                    to the method and it adds such data to the grouped table
    History
    <Date>			<Author>			<Description>
	27/01/2020  	Guillermo Giral   	Initial version
	*/
    addNewData : function(component, event, helper){
        var params = event.getParam('arguments');
        if(params){
            // Get the new data to be inserted and compare it with the already existing in the table
            var innerData = params.newData;
            var grouping = component.get("v.grouping");
            var tableData = component.get("v.data");

            // Remove SIC - Contingency from the list to add to the table
            innerData = helper.removeSicFromTable(innerData);

            // Check the data structure and group it accordingly
            if(innerData.length > 0){
                // Loop through the new data to check if the country exists in the table
                for(var row in innerData){
                    for(var ct in tableData){
                        // If the country already exists in the table, the acc-ent object 
                        // must be added to the current group (country)                   
                        if(
                            innerData[row].account.substring(0,2) == tableData[ct].country && 
                            innerData[row].account != $A.get("$Label.c.ServiceProfiling_EntitltementNoAccount")
                        ){
                            // Only add the new data to the table if it didn't exist previously
                            var existingAccounts = [];
                            for(var accountRow in tableData[ct].rows){
                                existingAccounts.push(tableData[ct].rows[accountRow].account);
                            }
                            // If the account doesn't exist, push the new account with its entitlements
                            if(!existingAccounts.includes(innerData[row].account)){
                                tableData[ct].rows.push(innerData[row]);
                            } else {
                                // If the account already existed, push the new entitlements
                                // Create the list of existing entitlements
                                var existingEntitlements = [];
                                for(var infoByCountry in tableData[ct].rows){ // Acc + ent info from a country
                                    for(var ent in tableData[ct].rows[infoByCountry].entitlement){ // Entitlement by account
                                        if(
                                            existingEntitlements.indexOf(tableData[ct].rows[infoByCountry].entitlement[ent]) == -1 &&
                                            tableData[ct].rows[infoByCountry].account == innerData[row].account
                                        ){
                                            existingEntitlements.push(tableData[ct].rows[infoByCountry].entitlement[ent]);
                                        }
                                    }
                                }
                                // Find the corresponding account and add the entitlement
                                for(var entitlementRow in innerData[row].entitlement){
                                    if(!existingEntitlements.includes(innerData[row].entitlement[entitlementRow])){
                                        // Loop through the existing data to find the account
                                        for(var entByAccount in tableData[ct].rows){
                                            if(tableData[ct].rows[entByAccount].account == innerData[row].account){
                                                tableData[ct].rows[entByAccount].entitlement.push(innerData[row].entitlement[entitlementRow]);
                                            }
                                        }
                                    }
                                }
                            }
                        // If the country does not exist in the table, a new country must be inserted with its associated data
                        // and the country must be added to the grouping list
                        } else {
                            if(
                                !grouping.includes(innerData[row].account.substring(0,2)) && 
                                innerData[row].account != $A.get("$Label.c.ServiceProfiling_EntitltementNoAccount")
                            ){
                                var groupedData = {};
                                var newRow = [];
                                groupedData.country = innerData[row].account.substring(0,2);
                                newRow.push(innerData[row]);
                                groupedData.rows = newRow;
                                groupedData.displayRow = true;
                                tableData.push(groupedData);
                                grouping.push(groupedData.country);
                            }
                        }
                    }
                }
                component.set("v.data", tableData);
                component.set("v.grouping", grouping);
            }
        }
    },

    /*
	Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Function used to serve as aura:method. It updates the entitlements
                    associated with a given account
    History
    <Date>			<Author>			<Description>
	05/02/2020  	Guillermo Giral   	Initial version
	*/
    updateEntitlements : function(component, event, helper){
        var params = event.getParam("arguments");
        if(params){
            if(params.currentAccount != undefined && params.newEntitlements.length > 0){
                var tableData = component.get("v.data");
                for(var row in tableData){
                    for(var childRow in tableData[row].rows){
                        if(tableData[row].rows[childRow].account == params.currentAccount){
                            tableData[row].rows[childRow].entitlement = params.newEntitlements;
                        }
                    }
                }
                component.set("v.data", tableData);
            }
        }
    },

    /*
	Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Function to implement the actions displayed in the table
    History
    <Date>			<Author>			<Description>
	27/01/2020  	Guillermo Giral   	Initial version
	*/
    handleRowsActions : function (component, event){
        var rowAction = event.getParams();
        if(rowAction.arrowClicked){
            // Change the direction of the "Expand / Collapse All" arrow if all / none of the rows are expanded
            if(component.get("v.data").filter(data => data.displayRow == true).length == 0){
                component.set("v.dataExpanded", false);
            } else if(component.get("v.data").filter(data => data.displayRow == true).length == component.get("v.data").length){
                component.set("v.dataExpanded", true);
            }
        } else if(rowAction.countryDeleteClicked){
            // Find the country marked for delete and remove it from the data table
            if(rowAction.countryDeleted != ""){
                var tableData = component.get("v.data");
                for(var row in tableData){
                    if(tableData[row].country == rowAction.countryDeleted){
                        tableData.splice(row,1);
                        component.set("v.data", tableData);
                    }
                }
            }
        } else if(rowAction.accountDeleteClicked){
            // Find the account marked for delete and remove it from the data table
            if(rowAction.accountDeleted != ""){
                var tableData = component.get("v.data");
                for(var row in tableData){
                    for(var innerRow in tableData[row].rows){
                        if(tableData[row].rows[innerRow].account == rowAction.accountDeleted){
                            tableData[row].rows.splice(innerRow,1);
                            component.set("v.data", tableData);
                        }
                    }
                }
                // Check if the country has no accounts. If so, delete the country row
                for(var row in tableData){
                    if(tableData[row].rows.length == 0){
                        tableData.splice(row,1);
                        component.set("v.data", tableData);
                    }
                }
            }
        }
    },

    /*
	Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Function to collapse/expand all the table rows or 
                    remove all the data from the table
    History
    <Date>			<Author>			<Description>
	27/01/2020  	Guillermo Giral   	Initial version
	*/
    handleTableChange : function (component, event){
        var data = component.get("v.data");
        if(event.getParam("removeAllData") == true){
            data = [];
        } else {
            for(var row in data){
                data[row].displayRow = component.get("v.dataExpanded");
            }
        }
        component.set("v.data", data);
    },

    /*
	Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Function to filter the data displayed
                    in the table
    History
    <Date>			<Author>			<Description>
	10/02/2020  	Guillermo Giral   	Initial version
    */
    filterData : function (component, event, helper){
        if((component.get("v.filters.accountFilter") != "all" && component.get("v.filters.accountFilter") != undefined) || 
            (component.get("v.filters.entitlementFilter") != "all" && component.get("v.filters.entitlementFilter") != undefined) || 
            (component.get("v.filters.countryFilter") != "all" && component.get("v.filters.countryFilter") != undefined))
        {
            helper.filterTableData(component, component.get("v.filters.accountFilter"), component.get("v.filters.entitlementFilter"), component.get("v.filters.countryFilter"));
        } else {
            component.set("v.filteredData", component.get("v.data"));
        }
    },

    /*
	Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Function to filter the data displayed
                    in the table based on the receiving filters
    History
    <Date>			<Author>			<Description>
	10/02/2020  	Guillermo Giral   	Initial version
    */
    onFilterEvent : function (component, event, helper){
        var params = event.getParams();
        if(params.filterDataTable){
            helper.filterTableData(component, params.filterByAccount, params.filterByEntitlement, params.filterByCountry);
        }
    },

    /*
	Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Function to check whether the profiling table
                    contains data and update the v.tableContainsData flag
    History
    <Date>			<Author>			<Description>
	19/02/2020  	Guillermo Giral   	Initial version
    */
    checkTableData : function (component, event, helper){
        component.get("v.filteredData").length > 0 ? component.set("v.tableContainsData", true) : component.set("v.tableContainsData", false);
    }
})