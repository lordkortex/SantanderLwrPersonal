({
    /*
	Author:        	Shahd Naji
    Company:        Deloitte
	Description:    Set component
    History
    <Date>			<Author>			<Description>
    01/05/2020		Shahad Naji  		Initial version
    30/06/2020      Bea Hill            Include filteredPaymentList
    10/02/2021      Andrea Marin        Encrypt the accounts numbers
    */
    doInit : function(component, event, helper) {
        component.set('v.isLoading', true);
        var params = event.getParam("arguments");
        if(params){
            if(params.paymentList != "[]" && !$A.util.isEmpty(params.paymentList)){
                let paymentList = params.paymentList;
                for (let i = 0; i<paymentList.length;  i++) {
                    let payment = paymentList[i];
                    payment.checked = false;
                    payment.sourceAccountEncripted = helper.encryptAccountNumber(component, event, helper, payment.sourceAccount);
                    payment.beneficiaryAccountEncripted = helper.encryptAccountNumber(component, event, helper, payment.beneficiaryAccount);
                    
                }
                component.set('v.paymentList', paymentList);
            }else{
                component.set('v.paymentList', []);
            }
           
        }
        component.set('v.selectedRows', []);
        component.set('v.singleSelectedPayment', {});
        component.set('v.actions', {});


        var aux = helper.setPaginations(component, event, helper); 
        aux.catch(function (error) {
            console.log('error');
        }).finally($A.getCallback(function() {
            component.set('v.isLoading', false);

        }));
    },
    /*
	Author:        	María Iñigo
    Company:        Deloitte
	Description:    This method is fired when the number of items to display in a single page is changed
    History
    <Date>			<Author>			<Description>
	15/05/2020		María Iñigo  		Initial version
    02/06/2020		Shahad Naji  		Adapt pagination functionlity implemented in CMP_B2B_Grid_Accounts into CMP_PaymentsLandingTable
    */
    changePagination: function (component, event, helper) {
        helper.setPaginations(component, event, helper);
    },
    /*
	Author:        	María Iñigo
    Company:        Deloitte
	Description:    This method is fired when other page is selected
    History
    <Date>			<Author>			<Description>
	15/05/2020		María Iñigo  		Initial version
    02/06/2020		Shahad Naji  		Adapt pagination functionlity implemented in CMP_B2B_Grid_Accounts into CMP_PaymentsLandingTable
    */
    changePage: function (component, event, helper) {
        helper.selectPage(component, event, helper);
    },
    /*
	Author:        	María Iñigo
    Company:        Deloitte
	Description:    This method is to go the previous table page 
    History
    <Date>			<Author>			<Description>
	15/05/2020		María Iñigo  		Initial version
    02/06/2020		Shahad Naji  		Adapt pagination functionlity implemented in CMP_B2B_Grid_Accounts into CMP_PaymentsLandingTable
    12/08/2020      Bea Hill            Sets the attribute currentPage to launch the onchange event.
    */
    handlePreviousPage: function (component, event, helper) {
        var currentPage = component.get('v.currentPage');
        var prevPage = parseInt(currentPage) - 1;
        component.set('v.currentPage', prevPage);
    },
    /*
	Author:        	María Iñigo
    Company:        Deloitte
	Description:    This method is to go the next table page 
    History
    <Date>			<Author>			<Description>
	15/05/2020		María Iñigo  		Initial version
    02/06/2020		Shahad Naji  		Adapt pagination functionlity implemented in CMP_B2B_Grid_Accounts into CMP_PaymentsLandingTable
    12/08/2020      Bea Hill            Sets the attribute currentPage to launch the onchange event.
    */
    handleNextPage: function (component, event, helper) {
        var currentPage = component.get('v.currentPage');
        var nextPage = parseInt(currentPage) +1;
        component.set('v.currentPage', nextPage);
    },
    /*
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    Method to sort the data of the table by a certain column
    History
    <Date>			<Author>			<Description>
	01/06/2020		Shahad Naji   		Initial version
    */
    sortBy : function(component, event, helper) {
        var columnId = event.target.id;
        if(columnId == null || columnId == '' || columnId == undefined){
            if (event.target.parentNode&&event.target.parentNode.id){
                let parentId = event.target.parentNode.id;
                if(parentId != null && parentId != '' && parentId != undefined){
                    columnId = parentId;
                }
            }
        }
        if(columnId != null && columnId != '' && columnId != undefined){
            var sorted = helper.sortBy(component,event, helper,columnId);
            if(sorted != null && sorted != undefined){
                component.set('v.paymentList', sorted);
                var orderBy = component.get('v.'+columnId+'OrderBy');
                var oldSelectedSort = component.get('v.selectedSort');
                if(oldSelectedSort == columnId){
                    if(orderBy == 'asc'){
                        component.set('v.'+columnId+'OrderBy', 'desc');
                    }else{
                        component.set('v.'+columnId+'OrderBy', 'asc');
                    }
                }
                else{
                    if(oldSelectedSort != null && oldSelectedSort != '' && oldSelectedSort != undefined){
                        component.set('v.'+oldSelectedSort+'OrderBy', 'desc');
                    }
                    component.set('v.selectedSort', columnId);
                    if(orderBy == 'asc'){
                        component.set('v.'+columnId+'OrderBy', 'desc');
                    }else{
                        component.set('v.'+columnId+'OrderBy', 'asc');
                    }
                }   
                
                helper.selectPage(component, event, helper);
                helper.selectAll(component, event, helper, false);
            }
        }
    },
    /*
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    Method to select a row by adding the required style 
    History
    <Date>			<Author>			<Description>
	08/06/2020		Shahad Naji   		Initial version
    */
    handleSelectedRow : function(component, event, helper) {
        var item = event.currentTarget.id;
        var checked = event.target.checked;
        console.log('item in handleSelectedRow: ', item )
   		helper.selectRow(component, event, helper, item, checked);
    },
    /*
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    Method to select all rows of a page
    History
    <Date>			<Author>			<Description>
	08/06/2020		Shahad Naji   		Initial version
    */
    handleSelectAll : function(component, event, helper) {
        var checked = event.target.checked;
		helper.selectAll(component, event, helper, checked);
       
    },
    /*
	Author:        	Beatrice Hill
    Company:        Deloitte
	Description:    Method to deselect selected rows
    History
    <Date>			<Author>			<Description>
    16/06/2020      Beatrice Hill       Initial version
    */
    handleClearSelection : function(component, event, helper) {
        helper.uncheckSelected(component, event, helper);
    },
 
    /*
	Author:        	Beatrice Hill
    Company:        Deloitte
	Description:    Navigate to Payment Details page
    History
    <Date>			<Author>			<Description>
    18/06/2020      Beatrice Hill       Initial version
    */
    handleClickRow : function (component, event, helper) {
        var page = component.get('v.detailsPage');
        var payment = event.currentTarget.parentElement.id;

        if (payment != null && payment != undefined && payment != '') {
            if (payment.includes("_")) {
                var paymentAux = payment.split("_");
                var paymentID = paymentAux[1];
                var url = 
                "c__currentUser="+JSON.stringify(component.get("v.currentUser"))
                +"&c__paymentID="+paymentID;
        
                helper.goTo(component, event, page, url);

            }
            
            
        }
        
    }


})