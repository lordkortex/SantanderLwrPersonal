({
	
    sortHelper: function (component, event, helper){
        var currentDir = component.get('v.arrowDirection');
        if (currentDir == 'arrowdown') {
            component.set('v.arrowDirection', 'arrowup');
            component.set('v.isAsc', true);
        } else {
            component.set('v.arrowDirection', 'arrowdown');
            component.set('v.isAsc', false);
        }
        helper.sortBy(component, event, helper);
    },
    
    normalizeMixedDataValue: function( value ) {
 
        var padding = "000000000000000";

        value = value.replace(
        /(\d+)((\.\d+)+)?/g,
        function( $0, integer, decimal, $3 ) {

                if ( decimal !== $3 ) {
                
                return(
                padding.slice( integer.length ) +
                integer +
                decimal
                );
                
            }
     
             decimal = ( decimal || ".0" );
                return(
                    padding.slice( integer.length ) +
                    integer +
                    decimal +
                    padding.slice( decimal.length )
                );
    		}
    	);
        return( value );
    },
 

    sortBy: function (component, event, helper) {
        var sort;
        var sortBy = event.target.id;
        var orderBy = component.get('v.isAsc');
        var data = component.get('v.VAMAccounts');
        if (orderBy == true) {
            if (sortBy == 'vamId') {                   
                sort = data.sort((a,b) => (helper.normalizeMixedDataValue(a.vamAccount) > helper.normalizeMixedDataValue(b.vamAccount)) ? 1 : ((helper.normalizeMixedDataValue(b.vamAccount) >helper.normalizeMixedDataValue(a.vamAccount)) ? -1 : 0));
            } else if (sortBy == 'country') {  
                sort = data.sort((a,b) => (helper.normalizeMixedDataValue(a.country) > helper.normalizeMixedDataValue(b.country)) ? 1 : ((helper.normalizeMixedDataValue(b.country) >helper.normalizeMixedDataValue(a.country)) ? -1 : 0));
            } else if (sortBy == 'entity') {                   
                sort = data.sort((a,b) => (helper.normalizeMixedDataValue(a.entityName) > helper.normalizeMixedDataValue(b.entityName)) ? 1 : ((helper.normalizeMixedDataValue(b.entityName) >helper.normalizeMixedDataValue(a.entityName)) ? -1 : 0));
            }
        } else {
        	if (sortBy == 'vamId') {                   
                sort = data.sort((a,b) => (helper.normalizeMixedDataValue(a.vamAccount) < helper.normalizeMixedDataValue(b.vamAccount)) ? 1 : ((helper.normalizeMixedDataValue(b.vamAccount) < helper.normalizeMixedDataValue(a.vamAccount)) ? -1 : 0));
            } else if(sortBy == 'country') { 
                sort = data.sort((a,b) => (helper.normalizeMixedDataValue(a.country) < helper.normalizeMixedDataValue(b.country)) ? 1 : ((helper.normalizeMixedDataValue(b.country) < helper.normalizeMixedDataValue(a.country)) ? -1 : 0));
            } else if(sortBy == 'entity') {                   
                sort = data.sort((a,b) => (helper.normalizeMixedDataValue(a.entityName) < helper.normalizeMixedDataValue(b.entityName)) ? 1 : ((helper.normalizeMixedDataValue(b.entityName) < helper.normalizeMixedDataValue(a.entityName)) ? -1 : 0));
            }
        }
        component.set('v.VAMAccounts', sort);
        helper.selectPage(component, event, helper);
    },
    
     setPaginations: function (component, event, helper) {
        var paginationsList = component.get('v.values');
        var itemsXpage = component.get('v.selectedValue');
        if ($A.util.isEmpty(itemsXpage)) {
            itemsXpage = paginationsList[0];
            component.set('v.selectedValue', itemsXpage);
        }
        var items = component.get('v.VAMAccounts');
        var numberItems = items.length;
        var numberPages = Math.ceil(numberItems / itemsXpage);
        var lastItemPage = 0;
        var pagesList = [];
        var listItems = [];
        for (let i = 0; i < numberPages; i++) {
            pagesList.push(i + 1);
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
    },

    previousPage: function (component, event, helper) {
        var itemsXpage = component.get('v.selectedValue');
        var items = component.get('v.VAMAccounts');
        var firstItem = component.get('v.firstItem');
        var finalItem = firstItem - 1;
        var currentPage = component.get('v.currentPage');
        var listItems = [];
        for (let i = parseInt(finalItem) - parseInt(itemsXpage); i < firstItem - 1; i++) {
            listItems.push(items[i]);
        }
        component.set('v.currentPage', currentPage - 1);
        component.set('v.firstItem', parseInt(finalItem) - parseInt(itemsXpage) + 1);
        component.set('v.finalItem', finalItem);
        component.set('v.paginationList', listItems);
    },

    nextPage: function (component, event, helper) {
        var itemsXpage = component.get('v.selectedValue');
        var items = component.get('v.VAMAccounts');
        var finalItem = component.get('v.finalItem');
        var firstItem = finalItem + 1;
        var currentPage = component.get('v.currentPage');
        var listItems = [];
        var count = 0;
        for (let i = finalItem; i < parseInt(finalItem) + parseInt(itemsXpage); i++) {
            if (items.length > i) {
                listItems.push(items[i]);
                count++;
            }
        }
        component.set('v.currentPage', currentPage + 1);
        component.set('v.firstItem', firstItem);
        component.set('v.finalItem', finalItem + count);
        component.set('v.paginationList', listItems);
    },

    selectPage: function (component, event, helper) {
        var selectedPage = component.get('v.currentPage');
        var items = component.get('v.VAMAccounts'); 
        var itemsXpage = component.get('v.selectedValue');
        var firstItem = (selectedPage - 1) * itemsXpage;
        var finalItem = firstItem;
        var listItems = [];
        var count = 0;
        for (let i = firstItem; i < parseInt(finalItem) + parseInt(itemsXpage); i++) {
            if (items.length > i) {
                listItems.push(items[i]);
                count++;
            }
        }
        component.set('v.firstItem', firstItem + 1);
        component.set('v.finalItem', finalItem + count);
        component.set('v.paginationList', listItems);
    },
})