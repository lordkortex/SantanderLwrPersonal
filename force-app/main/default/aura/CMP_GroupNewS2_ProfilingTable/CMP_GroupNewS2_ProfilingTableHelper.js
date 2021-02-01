({
    /*
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Reusable function to filter the data displayed
                    in the table based on the receiving filters
    History
    <Date>			<Author>			<Description>
    10/02/2020  	Guillermo Giral   	Initial version
    */
    filterTableData : function (component, accountFilter, entitlementFilter, countryFilter){
        var tableData = JSON.parse(JSON.stringify(component.get("v.data")));
        var filteredData = [];
        var countryMap = component.get("v.countryMap"); // auxiliar attribute to be able to get the country name by its ISO code
        // If all the filters are clear, show all the data
        if(countryFilter != 'all' || accountFilter != 'all' || entitlementFilter != 'all'){
            // 1. If a country filter exists, loop through all the data to filter it
            // according to the rest of the filters
            if(countryFilter == 'all'){
                filteredData = JSON.parse(JSON.stringify(tableData)); //tableData.slice(0, tableData.length);
            } else {
                filteredData = tableData.filter(countryRow => countryRow.country == countryMap[countryFilter]);
            }
            // 2. If an account filter exists, apply the filter to the remaining filteredData
            if(accountFilter != 'all'){
                filteredData = this.filterTableRow(filteredData, accountFilter, true);
            }
            // 3. If an entitlement exists, apply the filter to the remaining filteredData
            if(entitlementFilter != 'all'){
                filteredData = this.filterTableRow(filteredData, entitlementFilter, false);
            }
            component.set("v.filteredData", filteredData);
            component.set("v.filters", { "countryFilter" : countryFilter, "accountFilter" : accountFilter, "entitlementFilter" : entitlementFilter });
        } else {
            component.set("v.filteredData", tableData);
            component.set("v.filters", {});
        }
    },

    /*
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Helper function to filter accounts / entitlements
                    based on a given filter
    History
    <Date>			<Author>			<Description>
    10/02/2020  	Guillermo Giral   	Initial version
    */
    filterTableRow : function (unfilteredData, filterValue, isAccountFilter){
        // A deep copy is creating from the unfiltered data passed to the function
        // This is done to avoid creating a reference (dependency) between filtered and unfiltered data
        var filteredData = JSON.parse(JSON.stringify(unfilteredData));
        if(filterValue != null && filterValue != undefined){
            if(isAccountFilter){
                // Loop through the account rows and filter out those which don't belong to the filtered account
                for(var countryRow in filteredData){
                    var unfilteredAccounts = JSON.parse(JSON.stringify(filteredData[countryRow].rows));
                    filteredData[countryRow].rows = JSON.parse(JSON.stringify(unfilteredAccounts.filter(accountRow => accountRow.account === filterValue)));
                }
            } else {
                for(var countryRow in unfilteredData){
                    // Loop through the entitlement rows and filter out those which don't contain the filtered entitlement
                    for(var accountRow in unfilteredData[countryRow].rows){
                        filteredData[countryRow].rows[accountRow].entitlement = unfilteredData[countryRow].rows[accountRow].entitlement.filter(row => row == filterValue);
                    }
                    // If all the entitlements for an account are removed, the account must be removed as well
                    filteredData[countryRow].rows = filteredData[countryRow].rows.filter(row => row.entitlement.length > 0);
                }
            }
            // If the country rows has no accounts anymore, filter the country as well
            filteredData = filteredData.filter(countryRow => countryRow.rows.length > 0);
            return filteredData;
        }
        return null;
    },

    /*
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Helper function to remove the Downloads - SIC Contingency   
                    entitlement from the data table
    History
    <Date>			<Author>			<Description>
    17/02/2020  	Guillermo Giral   	Initial version
    */
    removeSicFromTable : function (data){
        //DO NOT DELETE the following comment lines. They are highly important to access custom labels
        //$Label.c.ServiceProfiling_DowRepSicContingency
        if(data.length > 0){
            for(var row in data){
                data[row].entitlement = data[row].entitlement.filter(ent => ent != $A.get("$Label.c.ServiceProfiling_DowRepSicContingency"));
            }
            data = data.filter(accountRow => accountRow.entitlement.length > 0);
            return data;
        }
        return [];
    }
})