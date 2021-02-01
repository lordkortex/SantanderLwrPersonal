({
    //DO NOT DELETE the following comment lines. They are highly important to display breadcrumb items
    //$Label.c.International_Treasury_Management
    //$Label.c.SwiftPaymentsTitle
    //$Label.c.Details
    //$Label.c.MovementHistory_Extract
    //$Label.c.legalInformation
    //$Label.c.support
    //$Label.c.UserGroupProfile
    //$Label.c.UserGroupProfileSummary
    //$Label.c.privacy
    //$Label.c.GroupNewConfigProfiling_Profile 
    //$Label.c.MovementHistory_History
    //$Label.c.Authorizations
    //$Label.c.Users
    //$Label.c.Users_AddUsers
    doInit : function(component, event, helper) {
        var x = component.get("v.breadcrumb");
        var y = [];
        if(x.length > 0){         
            for(var i = 0; i < x.length; i++){
                var dynamicLabel = $A.get("$Label.c." + x[i]);   
                y.push(dynamicLabel);
            }
            component.set("v.navigation", y);        
           
        }
        console.log(x.toString());
    },
    goBack : function(component, event, helper) {
        //The first part is for redirect when the user is navegating at the extracts movements flow.

        if(component.get("v.breadcrumb").toString() == 'International_Treasury_Management,MovementHistory_Extract,Detail'){
          // console.log('volvemos de transacciones');
            component.set("v.source", 'globalBalance');
            component.set("v.sourceAux", 'globalBalanceTransactionDetail');
        }else if(component.get("v.breadcrumb").toString() == 'MovementHistory_History,MovementHistory_Extract,Detail'){
         //   console.log('volvemos de transacciones');
            component.set("v.source", 'dropdownMenu');
            component.set("v.sourceAux", 'dropdownMenuTransactionDetail');
 
        }else if(component.get("v.breadcrumb").toString() == 'International_Treasury_Management,MovementHistory_History,MovementHistory_Extract,Detail'){
             //console.log('volvemos de transacciones');
            component.set("v.source", 'historyofextracts');
            component.set("v.sourceAux", 'historyofextractsTransactionDetail');
        }else if(component.get("v.breadcrumb").toString() == 'International_Treasury_Management,MovementHistory_History'){
            //console.log('volvemos de extractos vamos a global balance');
            component.set("v.source", 'historyofextracts');
            component.set("v.sourceAux", 'historyofextractsGlobal'); 
        }else if(component.get("v.breadcrumb").toString() == 'International_Treasury_Management,MovementHistory_History,MovementHistory_Extract'){
             //console.log('volvemos de extractos vamos a historico');
            component.set("v.source", 'historyofextracts');
            component.set("v.sourceAux", 'historyofextractsExtracts');  
        }else if(component.get("v.breadcrumb").toString() == 'International_Treasury_Management,MovementHistory_Extract'){
             //console.log('volvemos de historico vamos a global balance');
            component.set("v.source", 'globalBalance');
            component.set("v.sourceAux", 'globalBalanceExtracts');  
        }else if(component.get("v.breadcrumb").toString() == 'MovementHistory_History,MovementHistory_Extract'){
            //console.log('volvemos de extractos vamos a historico iniciamos en dropdown');
            component.set("v.source", 'dropdownMenu');
            component.set("v.sourceAux", 'dropdownMenuHistoric');  
        }
        else if(component.get("v.breadcrumb").toString() == 'International_Treasury_Management,Account_Transactions'){
            //para volver de Transacciones a globalBalance
            console.log('entra recoge params');
            component.set("v.source", 'globalBalance');
            component.set("v.sourceAux", 'globalBalanceTransactions');  
        }else if(component.get("v.breadcrumb").toString() == 'International_Treasury_Management,Account_Transactions','Detail'){
            //para volver de detalle de transacciones  a transaciones
            component.set("v.source", 'globalBalance');
            component.set("v.sourceAux", 'globalBalanceDetailTransactions');  
        }else if(component.get("v.breadcrumb").toString() == 'Account_Transactions,Detail'){
            //Para volver de detalle a transaciones cuando venimos del dropdown
            console.log('para volver a transacciones');
            component.set("v.source", 'dropdownMenu');
            component.set("v.sourceAux", 'detailTransactions');  
        }

        //to go back from transactions detail view page to extract page
        if((component.get("v.source") == 'globalBalance' && component.get("v.sourceAux") == 'globalBalanceTransactionDetail' ) 
        || (component.get("v.source") == 'dropdownMenu' && component.get("v.sourceAux") == 'dropdownMenuTransactionDetail' )
        || (component.get("v.source") == 'historyofextracts' && component.get("v.sourceAux") == 'historyofextractsTransactionDetail' )){
             //console.log('entra para volver a extractos de transacciones');
            var eventGetDataBack = component.getEvent("getDataBack");
            eventGetDataBack.setParams({
                sourceBreadCrumb : component.get("v.source"),
                isbackGlobalbalance : false,
                isbackHistoric: false,
                isbackTransactionPage : false,
                isbackTransaction : true
            });   
            if(eventGetDataBack){
                 //console.log('se lanza el evento');
                eventGetDataBack.fire();
            }
               
        }//to go back from extracts or trasaction  page  to global balance page 
        else if((component.get("v.source") == 'historyofextracts' && component.get("v.sourceAux") == 'historyofextractsGlobal' )
        || (component.get("v.source") == 'globalBalance' && component.get("v.sourceAux") == 'globalBalanceExtracts' )
        || (component.get("v.source") == 'globalBalance' && component.get("v.sourceAux") == 'globalBalanceTransactions' )) {
             //console.log('lanzamos evento para ir a globalbalance');
            var eventGetDataBack = component.getEvent("getDataBack");
            eventGetDataBack.setParams({
                sourceBreadCrumb : component.get("v.source"),
                isbackHistoric: false,
                isbackTransaction : false,
                isbackTransactionPage : false,
                isbackGlobalbalance : true
            });   
            if(eventGetDataBack){
                 //console.log('se lanza el evento redireccion global balance');
                eventGetDataBack.fire();
            }
               
            
        } //to go back from extracts  page global balance page   
        else if((component.get("v.source") == 'historyofextracts' && component.get("v.sourceAux") == 'historyofextractsExtracts' )
        || (component.get("v.source") == 'dropdownMenu' && component.get("v.sourceAux") == 'dropdownMenuHistoric' )){
             //console.log('lanzamos evento para ir a historico');
            var eventGetDataBack = component.getEvent("getDataBack");
            eventGetDataBack.setParams({
                sourceBreadCrumb : component.get("v.source"),
                isbackTransaction: false,
                isbackGlobalbalance : false,
                isbackTransactionPage : false,
                isbackHistoric : true
            });   
            if(eventGetDataBack){
                  //console.log('se lanza el evento redireccion global balance');
                eventGetDataBack.fire();
            }

        }//go back to users
        else if(component.get("v.breadcrumb").toString() =='Users,Users_AddUsers'){
            component.find("Service").redirect("users", "");
        }//go back to transacction page
        if((component.get("v.source") == 'globalBalance' && component.get("v.sourceAux") == 'globalBalanceDetailTransactions')
        || (component.get("v.source") ==  'dropdownMenu' && component.get("v.sourceAux") == 'detailTransactions')){

              //console.log('lanzamos evento para ir a historico');
              var eventGetDataBack = component.getEvent("getDataBack");
              eventGetDataBack.setParams({
                  sourceBreadCrumb : component.get("v.source"),
                  isbackTransaction: false,
                  isbackGlobalbalance : false,
                  isbackTransactionPage : true,
                  isbackHistoric : false
              });   
              if(eventGetDataBack){
                    //console.log('se lanza el evento redireccion global balance');
                  eventGetDataBack.fire();
                } 
        }   
        //go back for other cases
        else{
            window.history.back();
        }
       
    },

    openSearchForm : function(component, event, helper){
        var iFire = component.getEvent("openTransactionForm");
        iFire.setParams({
            "openForm" : "True"
        });
        iFire.fire();
    },
    onButtonClick : function(component, event, helper) {
		var whichButton = event.currentTarget.id;

		var downloadClicked = whichButton == "downloadIcon";
		var searchClicked = whichButton == "searchIcon";
		var addClicked = whichButton == "addIcon";

		var buttonClickedEvent = component.getEvent("buttonClickedEvent");
		if(buttonClickedEvent){
			buttonClickedEvent.setParams({
											"downloadClicked" : downloadClicked,
											"searchClicked" : searchClicked,
											"addClicked" : addClicked
										});
			buttonClickedEvent.fire();
		}
	},
})