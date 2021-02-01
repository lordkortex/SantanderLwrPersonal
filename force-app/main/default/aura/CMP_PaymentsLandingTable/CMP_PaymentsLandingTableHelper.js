({
    /*
	Author:        	María Iñigo
    Company:        Deloitte
	Description:    This method splits the items of payment list into pages
    History
    <Date>			<Author>			<Description>
	15/05/2020		María Iñigo  		Initial version
    02/06/2020		Shahad Naji  		Adapt pagination functionlity implemented in CMP_B2B_Grid_Accounts into CMP_PaymentsLandingTable
    08/06/2020		Shahad Naji			Deselect All rows when changing a page
    30/06/2020      Bea Hill            Set paginations based on filteredPaymentList
    13/08/2020      Bea Hill            Modify to depend solely on paymentList attribute not filteredPaymentList, set selectAll check for each page 
    */
    setPaginations : function(component, event, helper) {
        return new Promise($A.getCallback(function (resolve, reject) {
            var paginationsList = component.get('v.values');
            var itemsXpage = component.get('v.selectedValue');
            let selectAll = component.get('v.selectAll');
            if ($A.util.isEmpty(itemsXpage)) {
                itemsXpage = paginationsList[0];
                component.set('v.selectedValue', itemsXpage);
            }
            var items = component.get('v.paymentList');
            if(!$A.util.isEmpty(items)){
                var numberItems = items.length;
                var numberPages = Math.ceil(numberItems / itemsXpage);
                var lastItemPage = 0;
                var pagesList = [];
                var listItems = [];
                var checked = false;
                for (let i = 0; i < numberPages; i++) {
                    pagesList.push(i + 1);
                    selectAll.push(checked);
                }
                for (let i = 0; i < itemsXpage; i++) {
                    if (numberItems > i) {
                        listItems.push(items[i]);
                        lastItemPage++;
                    }
                }
                
                component.set('v.paymentsNumber', numberItems);
                component.set('v.finalItem', lastItemPage);
                component.set('v.firstItem', 1);
                component.set('v.pagesNumbers', pagesList);
                component.set('v.paginationList', listItems);
                component.set('v.currentPage', 1);
                component.set('v.selectAll', selectAll);
            }
            

            resolve('Ok');
        }), this); 
        
    },
    /*
	Author:        	María Iñigo
    Company:        Deloitte
	Description:    This method displays the items of a selected page
    History
    <Date>			<Author>			<Description>
	15/05/2020		María Iñigo  		Initial version
    02/06/2020		Shahad Naji  		Adapt pagination functionlity implemented in CMP_B2B_Grid_Accounts into CMP_PaymentsLandingTable
    08/06/2020		Shahad Naji			Deselect All rows when changing a page
    30/06/2020      Bea
    */
    selectPage: function (component, event, helper) {
        var selectedPage = component.get('v.currentPage');
        var items = component.get('v.paymentList');
        var itemsXpage = component.get('v.selectedValue');
        var firstItem = (parseInt(selectedPage) - 1) * parseInt(itemsXpage);
        var finalItem = parseInt(firstItem)  + parseInt(itemsXpage);
        var listItems = [];
        var count = 0;
        for (let i = firstItem; i < parseInt(firstItem) + parseInt(itemsXpage); i++) {
            if (items.length > i) {
                listItems.push(items[i]);
                count++;
            }
        }
        component.set('v.firstItem', firstItem + 1);
        component.set('v.finalItem', finalItem);
        component.set('v.paginationList', listItems);
        var index = selectedPage - 1;
        var selectAll = component.get('v.selectAll');
        var thisPageSelected = selectAll[index];
        if (!$A.util.isEmpty(thisPageSelected)) {
            component.set('v.isAllSelected', thisPageSelected);
            var selectAllCheckbox = document.getElementById('selectAllPayments');
            if(selectAllCheckbox != null && selectAllCheckbox != undefined){
                selectAllCheckbox.checked = thisPageSelected;
            }
        }  
    },
   
    /*
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    Method that returns the data sorted by the clicked column
    History
    <Date>			<Author>			<Description>
	01/06/2020		Shahad Naji   		Initial version
    */
	sortBy : function(component, event, helper, sortBy) {
		var sort;
        var orderBy = component.get('v.'+sortBy+'OrderBy');
        if(orderBy != null && orderBy != '' && orderBy != undefined){
            var data = component.get('v.paymentList');
            // var data = component.get('v.filteredPaymentList');
            if(orderBy == 'desc'){
                if(sortBy == 'clientReference'){                   
                    sort = data.sort((a,b) => (a.clientReference > b.clientReference) ? 1 : ((b.clientReference > a.clientReference) ? -1 : 0));
                }else if(sortBy == 'status'){
                    sort = data.sort((a,b) => (a.parsedPaymentStatus > b.parsedPaymentStatus) ? 1 : ((b.parsedPaymentStatus > a.parsedPaymentStatus) ? -1 : 0));
                }else if(sortBy == 'sourceAccount'){
                    sort = data.sort((a,b) => (a.sourceAccount > b.sourceAccount) ? 1 : ((b.sourceAccount > a.sourceAccount) ? -1 : 0));
                }else if(sortBy == 'beneficiaryAccount'){
                    sort = data.sort((a,b) => (a.beneficiaryAccount > b.beneficiaryAccount) ? 1 : ((b.beneficiaryAccount > a.beneficiaryAccount) ? -1 : 0));
                }else if(sortBy == 'amount'){                    
                    sort = data.sort((a, b) => parseFloat(a.amount) - parseFloat(b.amount));
                }else if(sortBy == 'currency'){
                    sort = data.sort((a,b) => (a.paymentCurrency > b.paymentCurrency) ? 1 : ((b.paymentCurrency > a.paymentCurrency) ? -1 : 0));
                }else if(sortBy == 'valueDate'){
                    sort = data.sort((a, b) => new Date(a.valueDate) - new Date(b.valueDate));
                }
                
            }else{
                if(sortBy == 'clientReference'){
                    sort = data.sort((a,b) => (a.clientReference < b.clientReference) ? 1 : ((b.clientReference < a.clientReference) ? -1 : 0));
                }else if(sortBy == 'status'){
                    sort = data.sort((a,b) => (a.parsedPaymentStatus < b.parsedPaymentStatus) ? 1 : ((b.parsedPaymentStatus < a.parsedPaymentStatus) ? -1 : 0));
                }else if(sortBy == 'sourceAccount'){
                    sort = data.sort((a,b) => (a.sourceAccount < b.sourceAccount) ? 1 : ((b.sourceAccount < a.sourceAccount) ? -1 : 0));
                }else if(sortBy == 'beneficiaryAccount'){
                    sort = data.sort((a,b) => (a.beneficiaryAccount < b.beneficiaryAccount) ? 1 : ((b.beneficiaryAccount < a.beneficiaryAccount) ? -1 : 0));
                }else if(sortBy == 'amount'){                    
                    sort = data.sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount));
                }else if(sortBy == 'currency'){
                    sort = data.sort((a,b) => (a.paymentCurrency < b.paymentCurrency) ? 1 : ((b.paymentCurrency < a.paymentCurrency) ? -1 : 0));
                }else if(sortBy == 'valueDate'){                    
                     sort = data.sort((a, b) => new Date(b.valueDate) - new Date(a.valueDate));
                }
            }
            
        }
        return sort;
	},
    /*
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    Method to select a row by adding the required style 
    History
    <Date>			<Author>			<Description>
    08/06/2020		Shahad Naji   		Initial version
    16/06/2020      Beatrice Hill       Added selectedRows functionality
    30/07/2020      Bea Hill            Add getSignatoryStatus
    13/08/2020      Bea Hill            Update checked boolean of the payment in paymentList
    */
    selectRow : function (component, event, helper, item, checked){
        let selectedRows = component.get('v.selectedRows');
        component.set('v.singleSelectedPayment', {});
        component.set('v.actions', {});
        component.set('v.signatoryStatus', {});
        component.set('v.hasActions', false);

        if(item != '' && item != null && item != undefined){
            var element = document.getElementById('ROW_'+item);
            let paymentList = component.get('v.paymentList');
            console.log(component.get("v.paymentList"));
            let paymentIndex = paymentList.findIndex(payment => payment.paymentId == item);
            if(element != null && element != undefined){
                if(checked){
                    paymentList[paymentIndex].checked = true;
                    element.classList.add('selected');
                    if(!selectedRows.includes(item)){
                        selectedRows.push(item);
                    }
                    if (selectedRows.length == 1) {
                        let selectedId = selectedRows[0];
                        let payment = paymentList.find(payment => payment.paymentId == selectedId)
                        component.set('v.singleSelectedPayment', payment);
                        helper.setActions(component, event, helper);
                                            } 
                }else{
                    paymentList[paymentIndex].checked = false;
                    element.classList.remove('selected');
                    if(selectedRows.includes(item)){
                        let itemIndex = selectedRows.indexOf(item);
                        selectedRows.splice(itemIndex, 1);
                    }
                    if (selectedRows.length == 1) {
                        let selectedId = selectedRows[0];
                        let paymentList = component.get('v.paymentList');
                        let payment = paymentList.find(payment => payment.paymentId == selectedId)
                        component.set('v.singleSelectedPayment', payment);
                        helper.setActions(component, event, helper);
                    } 
                }
                
                component.set('v.paymentList', paymentList);    
            } else {

            }
        }
        component.set('v.selectedRows', selectedRows);
    },
    /*
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    Method to deselect all selected rows
    History
    <Date>			<Author>			<Description>
    08/06/2020		Shahad Naji   		Initial version    
    12/08/2020      Bea Hill            Modified so only the payments on that page are unchecked 
    */
    uncheckAllSelected : function (component, event, helper){
        component.set('v.isAllSelected', false);
        var selectAllCheckbox = document.getElementById('selectAllPayments');
        if(selectAllCheckbox != null && selectAllCheckbox != undefined){
            selectAllCheckbox.checked = false;
        }
        helper.selectAll(component, event, helper, false);
    },
    /*
	Author:        	Beatrice Hill
    Company:        Deloitte
	Description:    Method to deselect selected rows
    History
    <Date>			<Author>			<Description>
    16/06/2020      Beatrice Hill       Initial version
    */
    uncheckSelected : function (component, event, helper){
        component.set('v.isAllSelected', false);
        var selectAllCheckbox = document.getElementById('selectAllPayments');
        if(selectAllCheckbox != null && selectAllCheckbox != undefined){
            selectAllCheckbox.checked = false;
        }
        helper.selectAll(component, event, helper, false);
    },

    /*
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    Method to select or deselect all selected rows
    History
    <Date>			<Author>			<Description>
    08/06/2020		Shahad Naji   		Initial version
    16/06/2020      Beatrice Hill       Change element ID to that which has checked attribute
    13/08/2020      Bea Hill            Update selectAll boolean for the current page
    */
    selectAll : function (component, event, helper, checked){
        var currentPage = component.get('v.currentPage');
        var selectAll = component.get('v.selectAll');
        if(checked){
            component.set('v.isAllSelected', true);           
            selectAll[currentPage-1] = true;    
        }else{
            component.set('v.isAllSelected', false);
            selectAll[currentPage-1] = false;
        }
        
        var paginationList = component.get('v.paginationList');
        if(paginationList.length > 0){
            for(let i=0; i<paginationList.length;i++){
                var item = paginationList[i].paymentId;
                var row = document.getElementById(item);
                if(row != null && row != undefined){
                    row.checked = component.get('v.isAllSelected'); 
                    helper.selectRow(component, event, helper, item, row.checked); 
                }

            }
        }
    },
    /*
	Author:        	Beatrice Hill
    Company:        Deloitte
	Description:    Encryption for page navigation
    History
    <Date>			<Author>			<Description>
    23/06/2020      Beatrice Hill       Adapted from CMP_AccountsCardRow
    */

    goTo : function (component, event, page, url){
        let navService = component.find("navService");

        if(url!=''){
            
            this.encrypt(component, url).then(function(results){

                    let pageReference = {
                            type: "comm__namedPage", 
                            attributes: {
                                    pageName: component.get("v.detailsPage")
                            },
                            state: {
                                    params : results
                            }
                    }
                    navService.navigate(pageReference); 
            });
        }else{
            console.log('pagename: ', component.get("v.detailsPage"));
            let pageReference = {
                type: "comm__namedPage", 
                attributes: {
                        pageName: component.get("v.detailsPage")
                },
                state: {
                        params : ''
                }
            }
            navService.navigate(pageReference); 

        }

    },

    /*
	Author:        	Beatrice Hill
    Company:        Deloitte
	Description:    Encryption for page navigation
    History
    <Date>			<Author>			<Description>
    18/06/2020      Beatrice Hill       Initial version
    */

    encrypt : function(component, data){  
        var result="null";
        var action = component.get("c.encryptData");
        action.setParams({ str : data });
        // Create a callback that is executed after 
        // the server-side action returns
        return new Promise(function (resolve, reject) {
                action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "ERROR") {
                        var errors = response.getError();
                        if (errors) {
                        if (errors[0] && errors[0].message) {
                                console.log("Error message: " + 
                                        errors[0].message);
                                reject(response.getError()[0]);
                        }
                        } else {
                        console.log("Unknown error");
                        }
                }else if (state === "SUCCESS") {
                        result = response.getReturnValue();
                }
                        resolve(result);
                });
                $A.enqueueAction(action);
        });
      
    },

    setActions : function(component, event, helper) {
        let paymentDetails = component.get('v.singleSelectedPayment');
        let currentUser = component.get('v.currentUser');
        Promise.all([
            helper.getSignatoryStatus(component, event, helper, paymentDetails.paymentId) 
        ]).then($A.getCallback(function (value) { 
            return helper.configureButtons(component, event, helper, paymentDetails, currentUser);
        }), this).catch(function (error) {
            console.log('error');
        }).finally($A.getCallback(function() {
            let actions = component.get('v.actions');
            if (!$A.util.isEmpty(actions)) {
                if (actions.edit == true ||
                    actions.discard == true ||
                    actions.reuse == true ||
                    actions.addToTemplate == true ||
                    actions.trySaveAgain == true ||
                    actions.authorize == true ||
                    actions.reject == true ||
                    actions.sendToReview == true ||
                    actions.gpiTracker == true
                   || actions.cancel == true) {
                        component.set('v.hasActions', true);
                    } else {
                        component.set('v.hasActions', false);
                    }
            } else {
                component.set('v.hasActions', false);
            }
        }));
    },

    getSignatoryStatus: function (component, event, helper, paymentId) {
        return new Promise($A.getCallback(function (resolve, reject) {
            var action = component.get("c.getSignatoryStatus");
            action.setParams({
                paymentId: paymentId
            });
            action.setCallback(this, function (actionResult) {
                if (actionResult.getState() == 'SUCCESS') {
                    var returnValue = actionResult.getReturnValue();
                    if (!$A.util.isEmpty(returnValue)) {
                        console.log(returnValue);
                        component.set("v.signatoryStatus", returnValue);
                        console.log('sig status: ', JSON.stringify(returnValue));
                    }
                    resolve('La ejecucion ha sido correcta.');

                } else if (actionResult.getState() == "ERROR") {
                    var errors = actionResult.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " +
                                errors[0].message);

                        }
                    } else {
                        console.log('problem getting signatory status');
                    }
                    reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));

                }
            });
            $A.enqueueAction(action);
        }), this);

    },


     /*
	Author:        	Bea Hill
    Company:        Deloitte
	Description:    Configure which buttons are available
    History
    <Date>			<Author>			<Description>
    27/07/2020		Bea Hill  		    Initial version
    10/08/2020      Bea Hill            Moved from CMP_PaymentsLandingUtilityBar
    15/09/2020		Shahad Naji			Changes buttons matrix
    */
   configureButtons: function (component, event, helper, paymentDetails, currentUser) {
    try {

        let status = paymentDetails.paymentStatus;

        let reason = ''
        if (!$A.util.isEmpty(paymentDetails.paymentReason)) {
            reason = paymentDetails.paymentReason;
        }

        let currentUserGlobalId = currentUser.globalId;

        let creatorUserId = '';
        if (!$A.util.isEmpty(paymentDetails.userGlobalId)) {
            creatorUserId = paymentDetails.userGlobalId;
        }

        let signatory = false;
        let signatoryStatus = component.get('v.signatoryStatus');
        if (signatoryStatus != null) {
            if (signatoryStatus.signatory == "true" && signatoryStatus.signed == "false") {
                signatory = true;
            }
        }
        let isCreator = false;
        if (currentUserGlobalId == creatorUserId) {
            isCreator = true;
        }

        let actions = {
                'edit': false,
                'discard': false,
                'reuse': false,
                'addToTemplate': false,
                'trySaveAgain': false, //saveForLater
                'authorize': false,
                'reject': false,
                'sendToReview': false,
                'gpiTracker': false,
                'cancel':false
            }
        if (status == '001' || status == 'Draft') {
            if (reason == '000') {
                actions.edit = isCreator;
                actions.discard = isCreator;
            } else if (reason == '001') {
                actions.discard = isCreator;
                actons.trySaveAgain = isCreator;
            } else if (reason == '002') {
                actions.discard = isCreator;
                actons.trySaveAgain = isCreator;
                actions.edit = isCreator;
            }
        }
        if (status == '002' || status == 'Pending') {
            if (reason == '001') {
                actions.edit = isCreator;
                actions.cancel = isCreator;
                actions.authorize = signatory;
                actions.reject = signatory;
                actions.sendToReview = signatory;           
            } else if (reason == '002') {
                actions.cancel = isCreator;
                actions.authorize = signatory;
                actions.reject = signatory;
                actions.sendToReview = signatory;
            }
        }
        if (status == '003' || status == 'In review') {
            if (reason == '001') {
                actions.cancel = isCreator;
                actions.edit = isCreator;           
            }
        }
        if (status == '101' || status == 'Authorized') {
            if (reason == '001') {
                actions.reuse = isCreator;
                actions.addToTemplate = isCreator;
            }
        }
        if (status == '102' || status == 'Processed') {
            if (reason == '001') {
                actions.reuse = isCreator;
                actions.addToTemplate = isCreator;
            }
        }
        if (status == '103' || status == 'Completed') {
            if (reason == '001') {
                actions.reuse = isCreator;
                actions.addToTemplate = isCreator;
                actions.gpiTracker = (isCreator || signatory);
            }
        }
        if (status == '201' || status == 'Scheduled') {
            if (reason == '001') {
                actions.reuse = isCreator;
                actions.addToTemplate = isCreator;
            }
        }
        if (status == '202' || status == 'Released') {
            if (reason == '001') {
                actions.gpiTracker = (isCreator || signatory);
                actions.reuse = isCreator;
                actions.addToTemplate = isCreator;
            } else if (reason == '002') {
                actions.reuse = isCreator;
                actions.addToTemplate = isCreator;
            }
        }
        if (status == '800' || status == 'On hold') {
            if (reason == '001') {
                actions.reuse = isCreator;
                actions.addToTemplate = isCreator;
            }
        }
        if (status == '801' || status == 'Delayed') {
            if (reason == '001') {
                actions.reuse = isCreator;
                actions.addToTemplate = isCreator;
            }
        }
        if (status == '997' || status == 'Not authorized') {
            if (reason == '001') {
                actions.reuse = isCreator;
            }
        }
        if (status == '998' || status == 'Canceled') {
            if (reason == '001') {
                actions.reuse = isCreator;
            } else if (reason == '002') {
                actions.reuse = isCreator;
            } else if (reason == '003') {
                actions.reuse = isCreator;
            }
        }
        if (status == '999' || status == 'Rejected') {
            if (reason == '001') {
                actions.reuse = isCreator;
            } else if (reason == '002') {
                actions.reuse = isCreator;
                actions.addToTemplate = isCreator;
            } else if (reason == '003') {
                actions.reuse = isCreator;
            } else if (reason == '004') {
                //no tiene acciones
            }
        }
        component.set('v.actions', actions);
    } catch (e) {
        console.log(e);
    }
},

})