({
	getComponentData : function(component, helper, response) {
		//helper.populateComponentData(component, helper, response);
		component.set("v.loadingUserInfo", true);
		component.find("service").callApex2(component, helper, "c.retrieveInitialData", {userId: $A.get( "$SObjectType.CurrentUser.Id" )}, helper.populateComponentData);
	},
    
    populateComponentData : function(component,helper,response){
		component.set("v.loadingUserInfo", true);
		var userId = $A.get("$SObjectType.CurrentUser.Id");
		var setData = [];

		 if(window.localStorage.getItem(userId + '_balanceEODGP') != undefined && response != undefined)
        {
            component.find("service").saveToCache('balanceEODGP', response);
            if(typeof response == 'string')
            {
                setData = JSON.parse(response).responseAcc;
            }
            else if(typeof response == 'object')
            {
                setData = response.responseAcc;
            }
        } 
        else if (window.localStorage.getItem(userId + '_balanceEODGP') != undefined && response == undefined )
        {
            component.find("service").callApex2(component, helper, "c.retrieveInitialData", {userId: $A.get( "$SObjectType.CurrentUser.Id" )}, helper.populateComponentData);
            
        } 
        else
        {
            component.find("service").saveToCache('balanceEODGP', response);
            setData = response.responseAcc;
        }

		var myMap = [];
		var countryMap = [];
		var corporateCode = [];
		var corporateName = [];

		for(var i = 0; i < setData.accountList.length; i++) {
			var acc = setData.accountList[i].displayNumber.trim();
			myMap.push([acc, setData.accountList[i].codigoCuenta]);
		}
		component.set("v.codeList", myMap);

		for(var i = 0; i < setData.accountList.length; i++) {
            var acc = setData.accountList[i].displayNumber.trim();
			countryMap.push([acc, setData.accountList[i].country]);
		}
		component.set("v.accountCountryList", countryMap);
		
		for(var i = 0; i < setData.accountList.length; i++) {
			var acc = setData.accountList[i].displayNumber.trim();
			corporateCode.push([acc, setData.accountList[i].codigoCorporate]);
		}
		component.set("v.corporateCodeList", corporateCode);

		for(var i = 0; i < setData.accountList.length; i++) {
			var acc = setData.accountList[i].displayNumber.trim();
			corporateName.push([acc, setData.accountList[i].subsidiaryName]);
		}
		component.set("v.corporateNameList", corporateName);

		var accounts = setData.accountList.map(function(item) {
            item['displayNumber'] = item['displayNumber'].trim();
            return item['displayNumber'];
		});

		component.set("v.accountsListString", accounts);
		component.set("v.accounts", setData.accountList);
		component.set("v.countries", setData.countryList);
		component.set("v.loadingUserInfo", false);
		component.set("v.keepAccList", accounts);
	},

	downloadFiles : function(component, event, helper){
		
		var fileFormat = component.get("v.fileFormat");
		var codeList = component.get("v.codeList");
		var filePerDay = component.get("v.isFileForDay");
		var auxList = [];
		var selectedAccounts = component.get("v.selectedAccounts");
		var dates = component.get("v.dates");
		var singleDate = component.get("v.singleDate");
		var extractType = component.get("v.extractType");
		var balanceFileFormat = '';
		var corpCodeList = component.get("v.corporateCodeList");
		var corpCode = [];
		var corpNameList = component.get("v.corporateNameList");
		var corpName = [];
		var accList = [];

		//Recoger el file type en caso de balances
		if (fileFormat == $A.get("$Label.c.pdfBalances")) {
			balanceFileFormat = 'pdf';
		}
		if (fileFormat == $A.get("$Label.c.excelBalances")) {
			balanceFileFormat = 'xls';
		}

		//Asignar los valores al objeto account
		for(var i = 0; i < selectedAccounts.length; i++) {
			var corporateCode = '';
			for (var j = 0; j < corpCodeList.length && corporateCode == ''; j++){
				if (selectedAccounts[i] == corpCodeList[j][0]){
					corporateCode = corpCodeList[j][1];
				}
			}

			var corporateName = '';
			for (var k = 0; k < corpNameList.length && corporateName == ''; k++){
				if (selectedAccounts[i] == corpNameList[k][0]){
					corporateName = corpNameList[k][1];
				}
			}

			var account = {
				'account': {
					"accountId" : selectedAccounts[i],
					"corporateCode" : corporateCode,
					"corporateName" : corporateName
				}
			}
			accList.push(account);
		}		
		
		//Recoger los codigos de las cuentas seleccionadas
		for(var i = 0; i < selectedAccounts.length; i++) {
			for(var j = 0; j < codeList.length; j++){
				if (selectedAccounts[i] == codeList[j][0]){
					auxList.push(codeList[j][1]);
				}
			}
		}

		var paramsPost = {};
		
		if(dates.length != 0) {	
			paramsPost = {
				"accounts" : accList,
				"fileDate" : component.get("v.fileDate"),
				"dateFrom" : dates[0],
				"dateTo" : dates[1],
				"extractType" : extractType,
			};
		} else {
			paramsPost = {
				"accounts" : accList,
				"fileDate" : component.get("v.fileDate"),
				"dateFrom" : singleDate[0],
				"dateTo" : singleDate[0],
				"extractType" : extractType,
			};
		}

		var params = {};

		if(dates.length != 0) {
			params = {
				"fileDate" : component.get("v.fileDate"),
				"accountCodeList" : auxList,
				"dateFrom" : dates[0],
				"dateTo" : dates[1],
				"fileType" : balanceFileFormat,
				"indGroup" : filePerDay
			};
		} else {
			params = {
				"fileDate" : component.get("v.fileDate"),
				"accountCodeList" : auxList,
				"dateFrom" : singleDate[0],
				"dateTo" : singleDate[0],
				"fileType" : balanceFileFormat,
			};
		}

		if(fileFormat != $A.get("$Label.c.excelTransaction") && fileFormat != $A.get("$Label.c.pdfStatement")  && fileFormat != $A.get("$Label.c.pdfBalances") && fileFormat != $A.get("$Label.c.excelBalances")) {
			params = paramsPost;
		}

		helper.download(component, helper, params, fileFormat);


	},

	download : function(component, helper, params, fileFormat){
        //First retrieve the doc and the remove it
        try{            
            this.retrieveFiles(component, helper, params, fileFormat).then(function(results){
                if(results!=null && results!='' && results!=undefined){
					if(results == '204') {
						component.set("v.show", true);
						component.set("v.message", $A.get("$Label.c.NoFileError"));
						component.set("v.type", "error");
					} else {
						component.set("v.show", true);
						component.set("v.message", $A.get("$Label.c.SuccessfullyDownloadedFile"));
						component.set("v.type", "success");

						var domain=$A.get('$Label.c.domain');
						
						if(component.get("v.fromCashNexus")==true){
							domain=$A.get('$Label.c.domainCashNexus');
						}
						
						if(component.get("v.backfront")==true){
							domain=$A.get('$Label.c.domainBackfront');
						}

						window.location.href = domain+'/sfc/servlet.shepherd/document/download/'+results+'?operationContext=S1';
						
						helper.removeFile(component, event, helper, results);
					}
					
                } else {
					component.set("v.show", true);
					component.set("v.message", $A.get("$Label.c.FailedDownloadFile"));
					component.set("v.type", "error");
				}
            });

        } catch (e) {
            console.log(e);
        }
    },

    removeFile : function(component, event, helper, ID){

        try{
            var action = component.get("c.removeFile");
            //Send the payment ID
            action.setParams({id:ID});
            action.setCallback(this, function(response) {
                var state = response.getState();

                if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                                        errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }else if (state === "SUCCESS") {
                }
            });
            $A.enqueueAction(action);

        } catch (e) {
            console.log(e);
        }
    },

	retrieveFiles : function(component, helper, params, fileFormat){
		
		try{

			var action = '';

			if (fileFormat == $A.get("$Label.c.excelTransaction")){
				action = component.get("c.getTransactions");
			} else if (fileFormat == $A.get("$Label.c.pdfStatement")) {
				action = component.get("c.getExtracts");
			} else if (fileFormat == $A.get("$Label.c.pdfBalances") || fileFormat == $A.get("$Label.c.excelBalances")){
				action = component.get("c.getBalances");
			} else {
				action = component.get("c.downloadFich");
			}
           
            //Send the payment ID
            action.setParams(params);
            return new Promise(function (resolve, reject) {
                action.setCallback(this, function(response) {
                    var state = response.getState();
                    if (state === "ERROR") {					   
						var errors = response.getError();
                        if (errors) {
                            if (errors[0] && errors[0].message) {
                                console.log("Error message: " + 
                                            errors[0].message);
                                reject(errors);
                            }
                        } else {
                            console.log("Unknown error");
                        }
                    }else if (state === "SUCCESS") {						
                        resolve(response.getReturnValue());
                    }
                });
                $A.enqueueAction(action);
            });

        } catch (e) {
            console.log(e);
        }
    },

	setExtractType : function(component, event, helper) {
		
		var fileFormat = component.get("v.fileFormat");

		if(fileFormat == 'MT940') {
			component.set("v.extractType", '01');
		}
		if(fileFormat == 'FINSTA') {
			component.set("v.extractType", '02');
		}
		if(fileFormat == 'BAI2') {
			component.set("v.extractType", '03');
		}
		if(fileFormat == 'N43') {
			component.set("v.extractType", '04');
		}
		if(fileFormat == 'XML') {
			component.set("v.extractType", '05');
		}
		if(fileFormat == 'MT942') {
			component.set("v.extractType", '06');
		}
		if(fileFormat == 'CAMT0052') {
			component.set("v.extractType", '07');
		}
		if(fileFormat == 'MT941') {
			component.set("v.extractType", '08');
		}
		if(fileFormat == 'MT950') {
			component.set("v.extractType", '15');
		}
		if(fileFormat == 'SIC Contingency') {
			component.set("v.extractType", '99');
		}
	}
})