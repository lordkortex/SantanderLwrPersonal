({
    /*Author:       Guillermo Giral
    Company:        Deloitte
    Description:    Function to get the data from the server
    History
    <Date>			<Author>			<Description>
	17/01/2020		Guillermo Giral     Initial version
	*/
    
    //The following method retrieves data from apex controller
    getAuthorizationsData : function(component, helper, response) {
        var userValues = JSON.parse(response);
        component.set("v.cdemgr", userValues.inicio.user.codigoCliente.toString());
        component.set("v.nombreCliente", userValues.inicio.user.nombreCliente.toString());

        var params = {};

        params.pending_auth = {};
        params.pending_auth.cdemgr = userValues.inicio.user.codigoCliente.toString();
        params.pending_auth.campo_ordenacion = "idauth";
        params.pending_auth.ordenacion_ascendente = "S";
        params.pending_auth.tam_pagina = "40";
        params.pending_auth.num_pagina = "1";

        params.requested_auth = {};
        params.requested_auth.cdemgr = userValues.inicio.user.codigoCliente.toString();
        params.requested_auth.campo_ordenacion = "idauth";
        params.requested_auth.ordenacion_ascendente = "S";
        params.requested_auth.tam_pagina = "40";
        params.requested_auth.num_pagina = "1";
        console.log(params);
        
        component.find("service").callApex2(component, helper,"c.getAuthorizations", {"requestBody":JSON.stringify(params)}, helper.populateAuthorizationsTables);
    },
    
    /*Author:       Guillermo Giral
    Company:        Deloitte
    Description:    Function to populate the tables with the data fetched from the server (pending + request auths)
    History
    <Date>			<Author>			<Description>
	17/01/2020		Guillermo Giral     Initial version
	*/
    
    //The following method populates the authorization tables with the data coming from the apex controller
    populateAuthorizationsTables : function(component,helper,response){
        console.log('pendingAuthorizations: '+response.pending_authorizations);
        console.log('requestAuthorizations: '+response.requested_authorizations);
        if(response){
            // Set data
            component.set("v.pendingAuthorizations", response.pending_authorizations.listaAutorizaciones);
            component.set("v.requestAuthorizations", response.requested_authorizations.listaAutorizaciones);
            
            if("v.isExpandedPending"){
                helper.buildPagination(component, helper, response.pending_authorizations);
            }
            
            if("v.isExpandedRequest"){
                helper.buildPagination(component, helper, response.requested_authorizations);
            }
        }
    },
    
    //The following method sends the pending authorization result
    sendApprovalResult : function(component,event,helper){
        var eventParams = event.getParams();
        
        var operation;
        if(eventParams.title == $A.get("$Label.c.rejectAction")){
            operation = "R";
        }else if(eventParams.title == $A.get("$Label.c.approveAction")){
        	operation = "A";
        }
        console.log(eventParams.idAuthorization);
        
        //Build JSON Request
        var params = {};
        params.obt_nombre_objeto = {};
        params.obt_nombre_objeto.entrada = {};
        params.obt_nombre_objeto.entrada.idauth = eventParams.idAuthorization.toString();
        params.obt_nombre_objeto.entrada.c_tip_ob = eventParams.objAuthorization.toString();
        params.obt_nombre_objeto.entrada.accio = eventParams.actionAuthorization.toString();
        params.obt_nombre_objeto.entrada.esta_peti = eventParams.stateAuthorization.toString();
        params.obt_nombre_objeto.entrada.nom_element = eventParams.nomAuthorization.toString();
        params.id_auth = eventParams.idAuthorization.toString();
        params.esta_peti = operation;
        params.cd_emgr = component.get("v.cdemgr");
        params.nombre_cliente = component.get("v.nombreCliente");
        params.comenta5 = eventParams.approvalComments;
        params.nombre_grupo = component.get("v.nombreCliente").substring(0,50);
        console.log("params: "+JSON.stringify(params));
        
        component.find("service").callApex2(component, helper,"c.sendAuthorizationApproval", {"requestBody":JSON.stringify(params)}, this.showResultToast);
        console.log("se ha llamado?");
        //this.getAuthorizationsData;
    },
    
    //The following method sends the delete authorization request
    sendDelete : function(component,event,helper){
        var eventParams = event.getParams();
        component.set("v.indexAuth", eventParams.indexAuthorization);
        
        //Build JSON Request
        var params = {};
        params.cdemgr = component.get("v.cdemgr");
        params.id_auth = eventParams.idAuthorization.toString();
        params.nombre_cliente = component.get("v.nombreCliente");
        console.log("params: "+JSON.stringify(params));
        
        component.find("service").callApex2(component, helper,"c.sendDelete", {"requestBody":JSON.stringify(params)}, this.showResultToast);
    },
    
    showResultToast : function(component,helper,response){
        if(response){
            if(response == "DELETEOK"){
                //Show the toast
                component.set("v.messageToast", "Operation successful");
                component.set("v.typeToast", "success");
                component.set("v.showToast", true);
                
                //Delete the Requested Auth row
                var allRequestAuthorizations = component.get("v.requestAuthorizations");
                allRequestAuthorizations.splice(component.get("v.indexAuth"), 1);
                component.set("v.requestAuthorizations",allRequestAuthorizations);
                
            }else if(response == "APPROVALOK"){
                //Show the toast
				component.set("v.messageToast", "Operation successful");
                component.set("v.typeToast", "success");
                component.set("v.showToast", true);
                
                //Delete the Pending Auth row
                var allPendingAuthorizations = component.get("v.pendingAuthorizations");
                allPendingAuthorizations.splice(component.get("v.indexAuth"), 1);
                component.set("v.pendingAuthorizations",allPendingAuthorizations);
            }
        }else{
            component.set("v.messageToast", "Error performing the operation");
            component.set("v.typeToast", "error");
            component.set("v.showToast", true);
        }
    }
})