({
    openModalNewAccount : function(component, event, helper) {
        var modalNewAccount = component.find('modalNewAccount');
        var accountId = component.get('v.accountId');
        if (!$A.util.isEmpty(modalNewAccount)) {
            modalNewAccount.openModal(accountId);
        }
    }, 

    getAccountList : function(component, event, helper) {
        helper.showSpinner(component);
        return new Promise($A.getCallback(function (resolve, reject) {
            var action = component.get('c.getAccountList');
            action.setParams({
                'accountId' : component.get('v.accountId')
            });
            action.setCallback(this, function(actionResult){
                if(actionResult.getState() == 'SUCCESS'){
                    var stateRV = actionResult.getReturnValue();
                    if (stateRV.success) {
                        var accountData = stateRV.value.accountData;
                        if (!$A.util.isEmpty(accountData)) {
                            component.set('v.data', accountData);
                        }
                        resolve('La ejecucion ha sido correcta.'); 
                    }else{
                        toast().error($A.get('$Label.c.ERROR'), $A.get('$Label.c.ERROR_NOT_RETRIEVED')); 
                        reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));
                    }
                } else {
                    toast().error($A.get('$Label.c.ERROR'), $A.get('$Label.c.ERROR_NOT_RETRIEVED')); 
                    reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));
                }
                helper.hideSpinner(component);
            });
            $A.enqueueAction(action);
        }), this);
    },

    createPagination : function(component, event, helper) {
        var pageSize = component.get("v.pageSize");
        var accountList = component.get('v.data');
        var PaginationList = [];
        component.set("v.endPage",pageSize-1);
        component.set("v.startPage",0);
        component.set("v.totalRecords", accountList.length);
        
        for(var i=0; i< pageSize; i++){
            if(accountList.length> i) {
                PaginationList.push(accountList[i]);    
            }
        }
        component.set('v.PaginationList', PaginationList);
    },

    next : function(component, event){
        var sObjectList = component.get("v.data");
        var end = component.get("v.endPage");
        var start = component.get("v.startPage");
        var pageSize = component.get("v.pageSize");
        var Paginationlist = [];
        var counter = 0;
        for(var i=end+1; i<end+pageSize+1; i++){
            if(sObjectList.length > i){
                Paginationlist.push(sObjectList[i]);
            }
            counter ++ ;
        }
        start = start + counter;
        end = end + counter;
        component.set("v.startPage",start);
        component.set("v.endPage",end);
        component.set('v.PaginationList', Paginationlist);
    },
    
    previous : function(component, event){
        var sObjectList = component.get("v.data");
        var end = component.get("v.endPage");
        var start = component.get("v.startPage");
        var pageSize = component.get("v.pageSize");
        var Paginationlist = [];
        var counter = 0;
        for(var i= start-pageSize; i < start ; i++){
            if(i > -1){
                Paginationlist.push(sObjectList[i]);
                counter ++;
            }else{
                start++;
            }
        }
        start = start - counter;
        end = end - counter;
        component.set("v.startPage",start);
        component.set("v.endPage",end);
        component.set('v.PaginationList', Paginationlist);
    }, 

    sortData: function (component, helper, fieldName, sortDirection) {
        return new Promise($A.getCallback(function (resolve, reject) {
            try {
                var data = component.get("v.data");
                var reverse;
                if (sortDirection != 'asc') {
                    reverse = true;
                }
                data.sort(helper.sortBy(fieldName, reverse));
                component.set('v.data', data);
                resolve('La ejecucion ha sido correcta.'); 
            } catch (error) {
                toast().error($A.get('$Label.c.ERROR'), $A.get('$Label.c.ERROR_NOT_RETRIEVED')); 
                reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));
            }
        }));
    },


    sortBy: function (field, reverse, primer) {
        var key = function(x) {
            return x[field]
        };
        reverse = !reverse ? 1 : -1;
        return function (a, b) {
            return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
        }
    }, 

    refreshList : function(component, event, helper) {
        var parametros =  helper.getAccountList(component, event, helper);
        parametros.then($A.getCallback(function (value) {
            helper.sortingAndPagination(component, event, helper, component.get("v.sortedBy"), component.get("v.sortedDirection"));
        })).catch(function (error) {
            console.log(error);
        });
    },

    showSpinner: function (component, value) {
		component.set('v.spinner', true);
	},

	hideSpinner: function (component, value) {
		component.set('v.spinner', false);
    },

    sortingAndPagination : function(component, event, helper, fieldName, sortDirection) {
        var parametros =  helper.sortData(component, helper, fieldName, sortDirection);
        parametros.then($A.getCallback(function (value) {
            helper.createPagination(component, event, helper);
        })).catch(function (error) {
            console.log(error);
        });
    }
})