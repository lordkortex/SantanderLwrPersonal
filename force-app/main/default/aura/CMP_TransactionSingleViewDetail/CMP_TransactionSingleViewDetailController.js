({
    getTransactionDetails : function(component, event, helper){
       
        helper.getURLParams(component, event, helper);
    },

    /*
	Author:         Pablo Tejedor
    Company:        Deloitte
    Description:    Function to return page.
    History
    <Date>			<Author>			<Description>
	26/12/2019		 Pablo Tejedor   	Initial version
	*/
	gobackPage :function(component, event, helper) {
        var params = event.getParams();
        console.log(params.isbackTransactionPage);
        var fuente = component.get("v.source");
        console.log(fuente);
        
		if(params.isbackTransaction && (fuente =='globalBalance' || fuente == 'dropdownMenu' || fuente== 'historyofextracts') ){
			component.set("v.source",params.sourceBreadCrumb);
            var dateBack = component.get("v.transactionDetails.bookDate");
			var dateBackFormat = dateBack.split('/')[2]+'/'+dateBack.split('/')[1]+'/'+dateBack.split('/')[0];
            
            var url = "c__lastUpdateAvailableBalance="+dateBackFormat+
            "&c__source="+component.get("v.source")+
            "&c__accountNumberAndEntity="+component.get("v.transactionDetails.account")+
            "&c__accountNumberBank="+component.get("v.accountNumberBank")+
            "&c__accountName="+component.get("v.accountName")+
            "&c__currencyTable="+component.get("v.currencyTable")+
            "&c__selectedAccountSearch="+component.get("v.SelectedAccount")+
            "&c__dateFrom="+component.get("v.dateFrom")+			
			"&c__dateTo="+component.get("v.dateTo")+
			"&c__availableBalanceParam="+component.get("v.availableBalanceParam")+
			"&c__bookBalanceParam="+component.get("v.bookBalanceParam");
            
            component.find("Service").redirect("movementhistorydetail",url);

        }else if(params.isbackTransactionPage && (fuente =='transactionDropdown' || fuente == 'transactionGlobalBalance')){
            console.log('aaaaaaaa');
            var source;
            var comeFrom;
            if(fuente =='transactionGlobalBalance' ){
                source = 'globalBalance';
                comeFrom = 'transactionGB';
            }else{
                source ='';
                comeFrom = 'transactionDown';
            }
            console.log('pills a retornar');
            console.log(component.get("v.pills"));


            var url = "c__source="+source+
            "&c__subsidiaryName="+component.get("v.accountName")+
            "&c__accountNumber="+component.get("v.transactionRow.account")+
            "&c__bank="+component.get("v.accountNumberBank")+
            "&c__mainAmount="+component.get("v.bookBalanceParam")+
            "&c__availableAmount="+component.get("v.availableBalanceParam")+
            "&c__currentCurrency="+component.get("v.currencyTable")+
            "&c__showPills="+component.get("v.showPills")+
            "&c__pills="+JSON.stringify(component.get("v.pills"))+
            "&c__comeFrom="+comeFrom+
            "&c__isSearching="+component.get("v.isSearching");
  
            console.log('retornamos a transacciones');
            console.log(url);
            component.find("Service").redirect("transaction-search",url);

        }

    }, 
    /*
	Author:         Pablo Tejedor
    Company:        Deloitte
    Description:    Function to return page.
    History
    <Date>			<Author>			<Description>
	26/12/2019		 Pablo Tejedor   	Initial version
	*/
	copy :function(component, event, helper) {
        console.log('copy method 1' + location.href);
        var dummy = document.createElement('input'),
        //text = window.location.href;
        text = component.get("v.transactionDetails.description"); 
        document.body.appendChild(dummy);
        dummy.value = text;
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);

    },
   
})