/*-------------------------------------------------------------------------------------------------
Author:         Shahad Naji & Guillermo Giral
Company:        Deloitte
Description:    Controller class for several Cash Nexus screens, handles the response
of the Balances Mulesoft service
Test Class:     CNT_AccountsParent_Test
History
<Date>			<Author>		    <Description>
19/03/2020		Shahad Naji         Initial version
23/03/2020		Guillermo Giral		Added methods to transform the response to a list of accounts
28/04/2020      Shahad Naji         Calcualte exchange rates according to server response result and do not company exchange rates 
06/05/2020		Shahad Naji			Control error
--------------------------------------------------------------------------------------------------*/
public class CNT_AccountsParent {
    
    @AuraEnabled
    public static List<String> countryList {get;set;}
    
    @AuraEnabled
    public static List<String> currencyList {get;set;}
    
    @AuraEnabled
    public static List<String> subsidiaryList {get;set;}
    
    @AuraEnabled
    public static List<String> bankList {get;set;}
    
    @AuraEnabled
    public static List<WRAPPER_AccountList.AccountDetails> accountList {get;set;}
    
    @AuraEnabled
    public static Map<String, List<String>> currencyGlobalBalance {get; set;}
    
    //SNJ - 29/04/2020 - Tipos de cambio
    @AuraEnabled
    public static List<WRAPPER_AccountList.TipoDeCambio> tipoDeCambioList {get; set;}
    //List of currencies retrives by  service
    @AuraEnabled
    public static Set<String> currenciesLst {get;set;}
    @AuraEnabled
    public static String divisaPrincipal {get; set;}
    
    @AuraEnabled
    public static String divisaPrincipalUsuario {get; set;}
    
    @AuraEnabled
    public static Map<String, String> mapUserFormats {get; set;}
    
    @AuraEnabled
    public static String headerLastModifiedDate {get; set;}
    @AuraEnabled
    public static String headerLastModifiedDateMain {get; set;}
    
    @AuraEnabled
    public CNT_GlobalPositionController responseGP {get; set;}
    
    @AuraEnabled
    public static WRAPPER_Balance responseForGPEOD {get;set;}
    
    @AuraEnabled
    public static WRAPPER_Balance_LU responseForGPLU {get;set;}
    
    @AuraEnabled
    public static Boolean isComingFromGP {get; set;}
    
    @AuraEnabled
    public static String exchangeRatesString {get; set;}
    
    @AuraEnabled
    public Boolean canUserSeeGP {get; set;}
    
    @AuraEnabled
    public Boolean canUserSeePaymentsTracker {get; set;}
    
    @AuraEnabled
    public static Boolean is403Error {get; set;}
    
    
    /*------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Initializes Accounts Parent
History 
<Date>          <Author>            <Change Description>
17/12/2019     Shahad Naji  		Intial Version
08/01/2020		Shahad Naji 		Switch Last update vs End of day
28/04/2020      Shahad Naji         Do not use company exchange rates. Calcualte exchange rates according to server response result.
29/04/2020      Shahad Naji         Default currencies are EUR, GBP and USD. Set default currency 'divisaPrincipal'
------------------------------------------------------------*/    
    @AuraEnabled //(cacheable=true)
    public static CNT_AccountsParent getBalanceData(String iWhen, String iUserId){
        CNT_AccountsParent obj = new CNT_AccountsParent();
        is403Error = false;
        // try{
        countryList = new List<String>();
        currencyList = new List<String>();
        subsidiaryList = new List<String>();
        bankList = new List<String>();        
        accountList = new List<WRAPPER_AccountList.AccountDetails>();        
        tipoDeCambioList = new List<WRAPPER_AccountList.TipoDeCambio>();
        currenciesLst = new Set<String>();
        divisaPrincipal = '';
        divisaPrincipalUsuario = UserInfo.getDefaultCurrency();
        
        // Create the wrapper
        setAccountBalance(iWhen, iUserId, obj);
        
        if(headerLastModifiedDate != null && headerLastModifiedDate != ''){
            headerLastModifiedDateMain = headerLastModifiedDate;
            if(iWhen == 'endOfDay'){              
                headerLastModifiedDate =  String.valueOfGMT(DateTime_Utilities.stringToDateTimeStep(headerLastModifiedDate,0));
            }else{                
                headerLastModifiedDate =  String.valueOfGMT(DateTime_Utilities.stringToDateTimeStep(headerLastModifiedDate,2));
            }            
        }
        
        
        // Set the number and date format for the user
        mapUserFormats = new Map<String, String>();
        mapUserFormats.put('dateFormat', Global_Utilities.getUserDateFormat(iUserId));
        mapUserFormats.put('numberFormat', Global_Utilities.getUserNumberFormat(iUserId));
        
        // Get the global balance sum for each currency
        currencyGlobalBalance = new Map<String, List<String>>();
        List<String> currencyList_Aux = new List<String>(currencyList);
        
        //Default currencies
        if(!currencyList_Aux.contains('EUR')){
            currencyList_Aux.add('EUR');
        }
        if(!currencyList_Aux.contains('GBP')){
            currencyList_Aux.add('GBP');
        }
        if(!currencyList_Aux.contains('USD')){
            currencyList_Aux.add('USD');            
        }
        
        
        //Default currencies
        if(!currencyList.contains('EUR')){
            currencyList.add('EUR');            
        }
        if(!currencyList.contains('GBP')){
            currencyList.add('GBP');
        }
        if(!currencyList.contains('USD')){
            currencyList.add('USD');
        }
        
        
        
        
        if(!currencyList_Aux.contains(divisaPrincipal) && divisaPrincipal != '' && divisaPrincipal != null){
            currencyList_Aux.add(divisaPrincipal);
        }
        
        
        if(!currencyList.contains(divisaPrincipal) && divisaPrincipal != '' && divisaPrincipal != null){
            currencyList.add(divisaPrincipal);
        }
        
        
        
        for(String curr : currencyList_Aux){
            //Map<String, Decimal> globalBalance = CNT_International_Treasury_Management.getSumBalance(curr, accountList);
            Map<String, Decimal> globalBalance = getTotalSum(curr, currencyList_Aux, accountList, tipoDeCambioList);
            System.debug('GLOBAL BALANCE: ' + globalBalance);
            System.debug('CURR: ' + curr);
            System.debug('CURRENCY LIST AUX: ' + currencyList_Aux);
            System.debug('TIPO CAMBIO LIOST: ' + String.valueOf(tipoDeCambioList));
            List<String> gBalanceList = new List<String>{
                String.valueOf(globalBalance.get('globalBookBalance')), 
                    String.valueOf(globalBalance.get('globalAvailableBalance'))
                    };
                        currencyGlobalBalance.put(curr, gBalanceList);
        }
        
        if(!countryList.isEmpty()){
            countryList.sort();
        }
        if(!currencyList.isEmpty()){
            currencyList.sort();
        }
        if(!subsidiaryList.isEmpty()){
            subsidiaryList.sort();
        }
        if(!bankList.isEmpty()){
            bankList.sort();
        }
        // }catch(Exception e){
        //     obj = null;
        //     system.debug('Exception: ' + e);}
        //     
        if(Test.isRunningTest()){
            List<String> iCountries = new List<String>();
            iCountries.add('ES');
            iCountries.add('BR');
            orderByCountry(iCountries,accountList);
            orderByCurrency(iCountries,accountList);
            orderBySubsidiary(iCountries,accountList);
            
        }
        return obj;
    }
    
    /*------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:   	MuleSoft callout
History 
<Date>          <Author>            <Change Description>
12/12/2019		Shahad Naji  		Intial Version
08/01/2020		Shahad Naji 		Switch Last update vs End of day
02/03/2020      Guillermo Giral     Method reordering
23/03/2020      Guillermo Giral     Logic revision
27/04/2020		Shahad Naji 		Error Control
------------------------------------------------------------*/
    @AuraEnabled
    public static void setAccountBalance(String iWhen, String iUserId, CNT_AccountsParent obj){    
        
        //try{
        //String iUserId = UserInfo.getUserId();
        User iUser = [SELECT Id, USER_TXT_GlobalId__c FROM User WHERE Id =: iUserId LIMIT 1];     
        if(iUser != null){
            
            // Call the Mulesoft WS
            if(iWhen == 'endOfDay'){
                WRAPPER_Balance balancesObj;
                if(isComingFromGP != null && isComingFromGP){
                    balancesObj = CNT_GlobalPositionController.responseForAccEOD;
                }else{
                    balancesObj = retrieveData(iWhen);
                    responseForGPEOD = balancesObj;
                    CNT_GlobalPositionController.isComingFromAcc = true;
                    obj.responseGP = CNT_GlobalPositionController.retrieveData(true, iUserId); 
                }
                
                modifyDataEOD(balancesObj, iWhen);
                
            }else if(iWhen == 'lastUpdate'){
                WRAPPER_Balance_LU balancesObj;
                if(isComingFromGP != null && isComingFromGP){
                    balancesObj = CNT_GlobalPositionController.responseForAccLU;
                }else{
                    balancesObj = retrieveDataLU(iWhen);
                    responseForGPLU = balancesObj;
                    CNT_GlobalPositionController.isComingFromAcc = true;
                    obj.responseGP = CNT_GlobalPositionController.retrieveData(false, iUserId);
                }
                
                modifyDataLU(balancesObj, iWhen);
            } else if(iWhen == 'oneTrade'){
                WRAPPER_Balance_LU balancesObj;
                if(isComingFromGP != null && isComingFromGP){
                    balancesObj = CNT_GlobalPositionController.responseForAccLU;
                }else{
                    balancesObj = retrieveDataIAM();
                    responseForGPLU = balancesObj;
                    CNT_GlobalPositionController.isComingFromAcc = true;
                    obj.responseGP = CNT_GlobalPositionController.retrieveIAMData(iUserId);
                }
                obj.canUserSeeGP = canUserSeeGlobalPosition(balancesObj);
                obj.canUserSeePaymentsTracker = canUserSeePaymentsTracker(balancesObj);
                modifyDataLU(balancesObj, iWhen);
            }
        }
        
        // }catch(Exception e){
        //throw new AuraHandledException('The following exception has occurred: ' + e.getMessage());
        // }        
    }
    
    /*------------------------------------------------------------
Author:         Adrian Muñio
Company:        Deloitte
Description:    Retrieves the EOD data to be modified
History 
<Date>          <Author>            <Change Description>
08/06/2020      Adrian Muñio  		Intial Version
------------------------------------------------------------*/
    @AuraEnabled //(cacheable=true)
    public static void modifyDataEOD(WRAPPER_Balance response, String iWhen){
        WRAPPER_Balance balancesObj = response;
        DateTime lastValueDate;
        if(balancesObj != null){
            // Create the four lists used in the component
            accountList = new List<WRAPPER_AccountList.AccountDetails>();
            countryList = new List<String>();
            currencyList = new List<String>();
            subsidiaryList = new List<String>();
            bankList = new List<String>();
            tipoDeCambioList = new List<WRAPPER_AccountList.TipoDeCambio>();
            
            // Iterate each country (paisArbol) in the balances tree (balancesArbol)
            for(WRAPPER_Balance.BalancesArbol item : balancesObj.balancesArbol){      
                String codPais = item.paisArbol.codPais;  
                // divisaPrincipal = UserInfo.getDefaultCurrency();
                
                if(divisaPrincipal == null || divisaPrincipal == ''){
                    divisaPrincipal = item.paisArbol.divisaUsuario;
                } 
                
                for(WRAPPER_Balance.ListaMonedasArbol listMonedasArbol : item.paisArbol.listaMonedasArbol){                       
                    for(WRAPPER_Balance.CuentaArbol thisAccount : listMonedasArbol.monedaArbol.cuentaArbol){	                                    
                        WRAPPER_AccountList.AccountDetails myAccount = new WRAPPER_AccountList.AccountDetails();
                        myAccount.country = codPais;
                        
                        if(String.isNotBlank(codPais)){
                        	myAccount.mandatoryPurpose = Global_Utilities.getCountryMandatoryPurpose(codPais);
                    	} 
                        myAccount.alias = thisAccount.aliasCuentaPerfilado != null ? thisAccount.aliasCuentaPerfilado : '';
                        myAccount.aliasEntidad = thisAccount.aliasEntidad;                                    
                        myAccount.subsidiaryName = thisAccount.nombreCorporate;
                        
                        myAccount.status = thisAccount.status != null ? thisAccount.status : '';
                        
                        if(thisAccount.bookDate != null && thisAccount.bookDate != ''){
                            myAccount.lastUpdateAvailableBalanceMain = thisAccount.bookDate;
                            myAccount.lastUpdateAvailableBalance = String.valueOfGMT(DateTime_Utilities.stringToDateTimeStep(thisAccount.bookDate, 0));
                            //Get max value of bookDate in the account array
                            String auxDate = thisAccount.bookDate.replaceAll('T',' ');
                            if(lastValueDate == null ){
                                lastValueDate =  DateTime.valueOf(auxDate);
                            }else{
                                if(DateTime.valueOf(auxDate) > lastValueDate){
                                    lastValueDate = DateTime.valueOf(auxDate);
                                }
                            }
                        }else{
                            myAccount.lastUpdateAvailableBalanceMain = null;
                            myAccount.lastUpdateAvailableBalance = null;
                        }
                        
                        
                        
                        
                        myAccount.valueDate = thisAccount.bookDate;
                        myAccount.displayNumber = thisAccount.cuentaExtracto;
                        myAccount.bankName = thisAccount.nombreEmisora;
                        // myAccount.amountMainBalance = thisAccount.bookBalance != null ? Decimal.valueOf(thisAccount.bookBalance) : 0.0;
                        myAccount.amountMainBalance = thisAccount.bookBalance != null ? Decimal.valueOf(thisAccount.bookBalance) : thisAccount.bookBalance;
                        myAccount.amountAvailableBalance = thisAccount.valueBalance != null ? Decimal.valueOf(thisAccount.valueBalance) : thisAccount.valueBalance;
                        myAccount.currencyCodeAvailableBalance = thisAccount.divisa != null ? thisAccount.divisa : thisAccount.divisa;
                        myAccount.countryName = codPais != null ? getCountryName(codPais) : '';
                        myAccount.codigoCorporate = thisAccount.codigoCorporate != null ? String.valueOf(thisAccount.codigoCorporate) : '';
                        myAccount.codigoCuenta = thisAccount.codigoCuenta != null ? String.valueOf(thisAccount.codigoCuenta) : '';
                        myAccount.internationalPaymentsAllowed = false;
                        myAccount.hasSwiftPayment ='YES';
                        myAccount.hasSwiftPayments = 'YES';
                        myAccount.codigoEmisora = thisAccount.codEmisora != null ? String.valueOf(thisAccount.codEmisora) : '';
                        //SNJ - 27/04/2020 - control error and adding codigoBic attribute
                        if(thisAccount.codigoBic != null){
                            String auxiliarAttr = '';
                            if(thisAccount.codigoBic.entidadbic != null){
                                auxiliarAttr += thisAccount.codigoBic.entidadbic;
                                myAccount.bic = thisAccount.codigoBic.entidadbic;
                            }
                            if(thisAccount.codigoBic.paisbic != null){
                                auxiliarAttr += thisAccount.codigoBic.paisbic;
                                myAccount.paisbic = thisAccount.codigoBic.paisbic;
                            }
                            if(thisAccount.codigoBic.locatorbic != null){
                                auxiliarAttr += thisAccount.codigoBic.locatorbic;
                                myAccount.locatorbic = thisAccount.codigoBic.locatorbic;   
                            }
                            if(thisAccount.codigoBic.branch != null){
                                auxiliarAttr += thisAccount.codigoBic.branch;
                                myAccount.branch = thisAccount.codigoBic.branch;  
                            }
                            myAccount.codigoBic =  auxiliarAttr;                                       
                            
                        }else{
                            myAccount.codigoBic = '';
                        }
                        
                        if(countryList != null){
                            if(String.isNotEmpty(myAccount.country)){
                                if(!countryList.contains(myAccount.country)){
                                    countryList.add(myAccount.country);
                                }  
                            }                                        
                        }                    
                        if(currencyList != null){
                            if(String.isNotEmpty(myAccount.currencyCodeAvailableBalance) && myAccount.currencyCodeAvailableBalance != ''){
                                if(!currencyList.contains(myAccount.currencyCodeAvailableBalance) && myAccount.currencyCodeAvailableBalance != ''){
                                    currencyList.add(myAccount.currencyCodeAvailableBalance);
                                } 
                            }                                        
                        }                    
                        if(subsidiaryList != null){
                            if(String.isNotEmpty(myAccount.subsidiaryName)){
                                if(!subsidiaryList.contains(myAccount.subsidiaryName)){
                                    subsidiaryList.add(myAccount.subsidiaryName);
                                }
                            }                                        
                        } 
                        if(bankList != null){
                            if(String.isNotEmpty(myAccount.bankName)){
                                if(!bankList.contains(myAccount.bankName)){
                                    bankList.add(myAccount.bankName);
                                }
                            }                                        
                        }                   
                        accountList.add(myAccount);                     
                    }
                }
            }                        
            //SNJ - 29/04/2020
            if(balancesObj.listaTipCambio.size() > 0){
                
                for(WRAPPER_Balance.listaTipCambio item : balancesObj.listaTipCambio){
                    if(item.tipoDeCambio != null){
                        WRAPPER_AccountList.TipoDeCambio iTipoDeCambio = new WRAPPER_AccountList.TipoDeCambio();
                        iTipoDeCambio.claError = item.tipoDeCambio.claError; 
                        iTipoDeCambio.divisa = item.tipoDeCambio.divisa;
                        iTipoDeCambio.fecha = item.tipoDeCambio.fecha;
                        iTipoDeCambio.importe = item.tipoDeCambio.importe;
                        iTipoDeCambio.importeDecimal = item.tipoDeCambio.importeDecimal != null ? item.tipoDeCambio.importeDecimal : item.tipoDeCambio.importe;
                        iTipoDeCambio.nombreDivisa = item.tipoDeCambio.nombreDivisa;
                        iTipoDeCambio.tipError = item.tipoDeCambio.tipError;
                        
                        
                        if(currencyList != null && String.isNotEmpty(iTipoDeCambio.divisa) && iTipoDeCambio.divisa != '' && iTipoDeCambio.divisa!= null){
                            if(currencyList.contains(iTipoDeCambio.divisa)){
                                tipoDeCambioList.add(iTipoDeCambio);
                                currenciesLst.add(iTipoDeCambio.divisa);
                            }                                   
                        }
                        
                        if(iTipoDeCambio.divisa == divisaPrincipal && !currencyList.contains(iTipoDeCambio.divisa) && iTipoDeCambio.divisa != '' && iTipoDeCambio.divisa != null){
                            tipoDeCambioList.add(iTipoDeCambio);
                        }
                        
                        if(iTipoDeCambio.divisa == 'EUR'){
                            tipoDeCambioList.add(iTipoDeCambio);
                            
                        }
                        else if(iTipoDeCambio.divisa == 'USD'){
                            tipoDeCambioList.add(iTipoDeCambio);
                            
                        }else if(iTipoDeCambio.divisa == 'GBP'){
                            tipoDeCambioList.add(iTipoDeCambio);
                            
                        }                                 
                    } 
                }
            }
            
            System.debug('Accounts: ' + accountList);
            System.debug('Currency list: ' + currencyList);
            System.debug('Subsidiary list: ' + subsidiaryList);
            System.debug('Banks list: ' + bankList);
            //SNJ - 29/04/2020
            System.debug('Exchange currency list: ' + tipoDeCambioList);
            headerLastModifiedDate = String.valueOf(lastValueDate);
            
        }
    }
    
    /*------------------------------------------------------------
Author:         Adrian Muñio
Company:        Deloitte
Description:    Retrieves the LU data to be modified
History 
<Date>          <Author>            <Change Description>
08/06/2020      Adrian Muñio  		Intial Version
05/08/2020		Guillermo Giral		Added logic for OneTrade
------------------------------------------------------------*/
    @AuraEnabled
    public static void modifyDataLU(WRAPPER_Balance_LU response, String iWhen){
        WRAPPER_Balance_LU balancesObj = (WRAPPER_Balance_LU) response;
        DateTime lastDate;
        if(balancesObj != null){
            exchangeRatesString = balancesObj.descripcionConversion;
            // Create the four lists used in the component
            accountList = new List<WRAPPER_AccountList.AccountDetails>();
            countryList = new List<String>();
            currencyList = new List<String>(); 
            
            subsidiaryList = new List<String>();
            bankList = new List<String>(); 
            tipoDeCambioList = new List<WRAPPER_AccountList.TipoDeCambio>();
            for(WRAPPER_Balance_LU.AccountsDataList item : balancesObj.accountsList.accountsDataList){
                WRAPPER_AccountList.AccountDetails myAccount = new WRAPPER_AccountList.AccountDetails();
                myAccount.displayNumber =  item.accountIdList.get(0).accountId;
                if(iWhen == 'lastUpdate'){
                    myAccount.alias = item.aliasCuentaPerfilado != null ? item.aliasCuentaPerfilado : '';//HHH
                } else if(iWhen == 'oneTrade'){
                    if(item.aliasGTS != null){
                        myAccount.alias = item.aliasGTS;
                    } else if(item.alias != null){
                        myAccount.alias = item.alias;
                    } else {
                        myAccount.alias = '';
                    }
                }
                //myAccount.accountHolder = UserInfo.getName();
                myAccount.balanceAllowed = item.balanceAllowed != null ? item.balanceAllowed : false;
                myAccount.amountAvailableBalance = 0.0;
                myAccount.amountMainBalance = 0.0;
                
                //AM - 28-09-2020 - Ebury Accounts
                if(iWhen == 'oneTrade' && item.dataProvider != null && (item.dataProvider == Label.EburyCaps || item.dataProvider == Label.Ebury)){
                    myAccount.dataProvider 	= Label.Ebury;
                    myAccount.country 		= Label.Ebury;
                    item.dataProvider 		= Label.Ebury;
                    item.country 			= Label.Ebury;
                    
                    //Ebury accounts won't have availableBalance, we will use mainBalance to show both.
                    item.availableBalance = item.mainBalance;
                    
                    //List of associated account details to show at Details Account Page.
                    if(item.associatedAccountList != null && !item.associatedAccountList.isEmpty()){
                        myAccount.associatedAccountList = item.associatedAccountList;
                    }
                }
                
                // Set available and book balance only if the user has permission to see the balance
                // of the given account (only applies to One Trade)
                if(iWhen != 'oneTrade' || (iWhen == 'oneTrade' && myAccount.balanceAllowed)){
                    if(item.availableBalance != null){
                        if(item.availableBalance.amount != null){
                            myAccount.amountAvailableBalance = Decimal.valueOf(item.availableBalance.amount);
                        }else{
                            //myAccount.amountAvailableBalance = item.availableBalance.amount;
                            myAccount.amountAvailableBalance = 0.0;
                        }
                        
                    }else{
                        //myAccount.amountAvailableBalance = item.availableBalance.amount;
                        myAccount.amountAvailableBalance = 0.0;
                    }
                    
                    // myAccount.lastUpdateAvailableBalance =  item.mainBalance != null ? item.mainBalance.lastUpdate : null;  
                    if(item.mainBalance != null){
                        String lastDateAcc = '';
                        if(item.mainBalance.lastUpdate != '' && item.mainBalance.lastUpdate != null){
                            myAccount.lastUpdateAvailableBalanceMain = item.mainBalance.lastUpdate;
                            myAccount.lastUpdateAvailableBalance = String.valueOfGMT(DateTime_Utilities.stringToDateTimeStep(item.mainBalance.lastUpdate, 2));
                            //Get max value of bookDate in the account array
                            lastDateAcc = item.mainBalance.lastUpdate.replaceAll('T', ' ');
                            lastDateAcc = lastDateAcc.replace('+0000', 'Z');
                            
                            if(lastDateAcc != '')
                            {
                                if(lastDate == null )
                                {
                                    lastDate = Datetime.valueOf(lastDateAcc);
                                }
                                
                                if(DateTime.valueOf(lastDateAcc) > lastDate)
                                {
                                    lastDate = Datetime.valueOf(lastDateAcc);
                                }
                            }                       
                            
                        }else{
                            myAccount.lastUpdateAvailableBalanceMain = null;
                            myAccount.lastUpdateAvailableBalance = null;
                        }
                    }
                }
                
                myAccount.bankName =  item.bankDescription;
                myAccount.country =  item.country;
                 
                if(String.isNotBlank(item.country)){
                    myAccount.mandatoryPurpose = Global_Utilities.getCountryMandatoryPurpose(item.country);
                }
                
                myAccount.subsidiaryName =  (iWhen == 'oneTrade' && item.parentCustomerName != null) ? item.parentCustomerName : item.customerName;
                myAccount.internationalPaymentsAllowed = item.internationalPaymentsAllowed;//HHH
                myAccount.idType = item.accountIdList.get(0).idType;
                myAccount.aliasEntidad = item.aliasEntidad;
                myAccount.status = item.status != null ? item.status : '';
                myAccount.transactionsAllowed = item.transactionsAllowed != null ? item.transactionsAllowed : false;
                myAccount.balanceAllowed = item.balanceAllowed != null ? item.balanceAllowed : false;
                
                if(item.accountHolderAddress != null){
                    myAccount.address = new WRAPPER_AccountList.Address();
                    if(item.accountHolderAddress.streetName != null){
                        myAccount.address.streetName = item.accountHolderAddress.streetName;
                    }
                    if(item.accountHolderAddress.townName != null){
                        myAccount.address.townName = item.accountHolderAddress.townName;
                    }
                    if(item.accountHolderAddress.country != null){
                        myAccount.address.country = item.accountHolderAddress.country;
                    }
                }
                
                if(item.mainBalance != null){
                    if(item.mainBalance.currencyCode != '' && item.mainBalance.currencyCode != null){
                        myAccount.currencyCodeAvailableBalance = item.mainBalance.currencyCode;
                    }else{
                        if(item.availableBalance != null){
                            if(item.availableBalance.currencyCode != null && item.availableBalance.currencyCode != ''){
                                myAccount.currencyCodeAvailableBalance = item.availableBalance.currencyCode;
                            }
                        }
                    }                            
                }else if( item.mainBalance == null){
                    if(item.availableBalance != null){
                        if(item.availableBalance.currencyCode != null && item.availableBalance.currencyCode != ''){
                            myAccount.currencyCodeAvailableBalance = item.availableBalance.currencyCode;
                        }
                        
                    }                               
                }
                //AM - 28-09-2020 - Ebury Accounts
                if(myAccount.country == Label.EburyCaps || myAccount.country == Label.Ebury){
                    myAccount.countryName = Label.Ebury;
                }else{
                    myAccount.countryName = getCountryName(item.country);
                }
                
                //SNJ - 08/05/2020 - availableBalance date 
                if(iWhen != 'oneTrade' || (iWhen == 'oneTrade' && myAccount.balanceAllowed)){
                    if(item.mainBalance != null){
                        if(item.mainBalance.lastUpdate != null && item.mainBalance.lastUpdate != ''){
                            myAccount.valueDate = item.mainBalance.lastUpdate;
                        }
                    }
                    
                    // myAccount.amountMainBalance = item.mainBalance != null ? Decimal.valueOf(item.mainBalance.amount) : 0.0;
                    
                    if(item.mainBalance != null){
                        if(item.mainBalance.amount != null){
                            myAccount.amountMainBalance =  Decimal.valueOf(item.mainBalance.amount);
                        }else{
                            //myAccount.amountMainBalance = item.mainBalance.amount;
                            myAccount.amountMainBalance = 0.0;
                        }
                        
                    }else{
                        //myAccount.amountMainBalance = item.mainBalance.amount;
                        myAccount.amountMainBalance = 0.0;
                    }				   
                }
                
                myAccount.hasSwiftPayment =item.hasSwiftPayment;
                myAccount.hasSwiftPayments = item.hasSwiftPayments;
                //SNJ - 27/04/2020 - control error and adding codigoBic attribute
                if(item.bankId != null){
                    if(String.isNotEmpty(item.bankId)){
                        String bic_aux = item.bankId;
                        if(bic_aux.length() >= 11){
                            myAccount.bic =  item.bankId.substring(0,4);
                            myAccount.branch =  item.bankId.substring(8,11);
                            myAccount.locatorbic =  item.bankId.substring(6,8);
                            myAccount.paisbic =  item.bankId.substring(4,6); 
                        } else {
                            myAccount.bic =  item.bankId.substring(0,4);
                            myAccount.branch =  'XXX';
                            //myAccount.locatorbic = item.bankId.substring(7,8) == 'P' ? item.bankId.substring(6,7) + '0' : item.bankId.substring(6,8);
                            myAccount.locatorbic = item.bankId.substring(6,8);
                            myAccount.paisbic =  item.bankId.substring(4,6); 
                        }
                        myAccount.codigoBic = item.bankId; 
                    }
                }
                myAccount.codigoCorporate =  item.customerId;
                myAccount.customerId =  item.customerId;
                myAccount.codigoCuenta = item.accountNexusId;                            
                //SNJ - 15/04/2020
                myAccount.codigoEmisora = item.codEmisora;
                
                
                if(countryList != null){
                    if(String.isNotEmpty(myAccount.country)){
                        if(!countryList.contains(myAccount.country)){
                            countryList.add(myAccount.country);
                        } 
                    }                                 
                }                    
                if(currencyList != null){
                    if(String.isNotEmpty(myAccount.currencyCodeAvailableBalance) && myAccount.currencyCodeAvailableBalance != '' && myAccount.currencyCodeAvailableBalance != null){
                        if(!currencyList.contains(myAccount.currencyCodeAvailableBalance)){
                            currencyList.add(myAccount.currencyCodeAvailableBalance);
                        }
                    }                                
                }                    
                if(subsidiaryList != null){
                    if(String.isNotEmpty(myAccount.subsidiaryName)){
                        if(!subsidiaryList.contains(myAccount.subsidiaryName)){
                            subsidiaryList.add(myAccount.subsidiaryName);
                        } 
                    }                               
                } 
                if(bankList != null){
                    if(String.isNotEmpty(myAccount.bankName)){
                        if(!bankList.contains(myAccount.bankName)){
                            bankList.add(myAccount.bankName);
                        }  
                    }                               
                }        
                
                accountList.add(myAccount);   
            }
            
            //SNJ - 29/04/2020
            if(balancesObj.listaTipCambio != null){
                if(balancesObj.listaTipCambio.size() > 0){
                    //  divisaPrincipal = UserInfo.getDefaultCurrency();
                    if(divisaPrincipal == null || divisaPrincipal == ''){
                        divisaPrincipal = balancesObj.listaTipCambio.get(0).tipoDeCambio.divisa;
                    }
                    
                    
                    for(WRAPPER_Balance_LU.listaTipCambio item : balancesObj.listaTipCambio){
                        if(item.tipoDeCambio != null){
                            WRAPPER_AccountList.TipoDeCambio iTipoDeCambio = new WRAPPER_AccountList.TipoDeCambio();
                            iTipoDeCambio.claError = item.tipoDeCambio.claError; 
                            iTipoDeCambio.divisa = item.tipoDeCambio.divisa;
                            iTipoDeCambio.fecha = item.tipoDeCambio.fecha;
                            iTipoDeCambio.importe = item.tipoDeCambio.importe;
                            iTipoDeCambio.importeDecimal = item.tipoDeCambio.importeDecimal != null ? item.tipoDeCambio.importeDecimal : item.tipoDeCambio.importe;
                            iTipoDeCambio.nombreDivisa = item.tipoDeCambio.nombreDivisa;
                            iTipoDeCambio.tipError = item.tipoDeCambio.tipError; 
                            
                            if(currencyList != null && String.isNotEmpty(iTipoDeCambio.divisa)){
                                if(currencyList.contains(iTipoDeCambio.divisa)){
                                    tipoDeCambioList.add(iTipoDeCambio); 
                                    
                                }
                                
                                if(iTipoDeCambio.divisa == divisaPrincipal && !currencyList.contains(iTipoDeCambio.divisa)  && iTipoDeCambio.divisa != '' && iTipoDeCambio.divisa != null){
                                    tipoDeCambioList.add(iTipoDeCambio);
                                    
                                }
                                if(iTipoDeCambio.divisa == 'EUR'){
                                    tipoDeCambioList.add(iTipoDeCambio);
                                    
                                }
                                else if(iTipoDeCambio.divisa == 'USD' ){
                                    tipoDeCambioList.add(iTipoDeCambio);
                                    
                                }else if(iTipoDeCambio.divisa == 'GBP'){
                                    tipoDeCambioList.add(iTipoDeCambio);
                                    
                                }
                            }  
                            
                        } 
                    }
                }
            }	
            
            // [GG - 05/08/2020 - Added logic for One Trade]
            // Get the exchange rates from SF instead of the web service
            if(iWhen == 'oneTrade'){
                if(divisaPrincipal == null || divisaPrincipal == ''){
                    divisaPrincipal = divisaPrincipalUsuario;
                }
                //Default currencies
                if(!currencyList.contains('EUR')){
                    currencyList.add('EUR');
                }
                if(!currencyList.contains('GBP')){
                    currencyList.add('GBP');
                }
                if(!currencyList.contains('USD')){
                    currencyList.add('USD');            
                }
                // Get the exchange rates from the main currency to the rest
                System.debug('Divisa principal usuario: ' + divisaPrincipalUsuario);
                System.debug('Lista monedas usuario: ' + currencyList);
                Map<String, Map<Decimal,CurrencyType>> mainCurrencyExchangeRates = Global_Utilities.getExchangeRatesWithExtraInfo(divisaPrincipalUsuario, currencyList, 1);
                // Loop through all the currencies and set the TipoDeCambio object and list
                for(String c : currencyList){						
                    //if(item.tipoDeCambio != null){
                    WRAPPER_AccountList.TipoDeCambio iTipoDeCambio = new WRAPPER_AccountList.TipoDeCambio(); 
                    Decimal exchangeRate = new List<Decimal>(mainCurrencyExchangeRates.get(c).keySet())[0];
                    iTipoDeCambio.divisa = c;
                    iTipoDeCambio.fecha = String.valueOf(mainCurrencyExchangeRates.get(c).get(exchangeRate).LastModifiedDate);
                    iTipoDeCambio.importe = exchangeRate.setScale(2);
                    iTipoDeCambio.importeDecimal = exchangeRate.setScale(8);
                    iTipoDeCambio.nombreDivisa = c;
                    
                    if(currencyList != null && String.isNotEmpty(iTipoDeCambio.divisa)){
                        if(currencyList.contains(iTipoDeCambio.divisa)){
                            tipoDeCambioList.add(iTipoDeCambio); 							
                        }
                        
                        if(iTipoDeCambio.divisa == divisaPrincipal && !currencyList.contains(iTipoDeCambio.divisa)  && iTipoDeCambio.divisa != '' && iTipoDeCambio.divisa != null){
                            tipoDeCambioList.add(iTipoDeCambio);								
                        }
                        
                        // Add the default currencies, if not already present
                        if(iTipoDeCambio.divisa == 'EUR'){
                            tipoDeCambioList.add(iTipoDeCambio);								
                        } else if(iTipoDeCambio.divisa == 'USD' ){
                            tipoDeCambioList.add(iTipoDeCambio);								
                        } else if(iTipoDeCambio.divisa == 'GBP'){
                            tipoDeCambioList.add(iTipoDeCambio);
                        }
                    }  
                }
            }
            System.debug('Accounts: ' + accountList);
            System.debug('Currency list: ' + currencyList);
            System.debug('Subsidiary list: ' + subsidiaryList);
            System.debug('Banks list: ' + bankList);
            //SNJ - 29/04/2020
            System.debug('Exchange currency list: ' + tipoDeCambioList);
            if(lastDate != null){                      
                headerLastModifiedDate = String.valueOf(lastDate);
            }	
        }
    }
    
    /*------------------------------------------------------------
Author:         Guillermo Giral
Company:        Deloitte
Description:    Retrieves the data from the Mulesoft balances service
History 
<Date>          <Author>            <Change Description>
23/03/2020      Guillermo Giral  	Intial Version
------------------------------------------------------------*/    
    @AuraEnabled
    public static WRAPPER_Balance retrieveData(String iWhen){ 
        CNT_ApiConfiguration__c configWs = new CNT_ApiConfiguration__c();     
        if(iWhen.endsWithIgnoreCase('endOfDay')){
            configWs = CNT_ApiConfiguration__c.getValues('CNT_BalanceEOD');
        }
        String response = Global_IntegrationWrapper.launchHTTP('', configWs.CNT_Endpoint__c, configWs.CNT_HTTPMethod__c);
        
        if(Test.isRunningTest()){
            response = '{'+
                '  \"balancesArbol\": ['+
                '    {'+
                '      \"paisArbol\": {'+
                '        \"codPais\": \"AR\",'+
                '        \"divisaUsuario\": \"EUR\",'+
                '        \"listaMonedasArbol\": ['+
                '          {'+
                '            \"monedaArbol\": {'+
                '              \"divisaCuenta\": \"ARS\",'+
                '              \"cuentaArbol\": ['+
                '                {'+
                '                  \"aliasCuentaPerfilado\": null,'+
                '                  \"aliasEntidad\": null,'+
                '                  \"bookBalance\": 4000,'+
                '                  \"bookDate\": \"2015-11-04T23:00:00.000Z\",'+
                '                  \"codigoBic\": {'+
                '                    \"branch\": null,'+
                '                    \"entidadbic\": null,'+
                '                    \"locatorbic\": null,'+
                '                    \"paisbic\": null'+
                '                  },'+
                '                  \"codigoCorporate\": 4,'+
                '                  \"codigoCuenta\": 1260,'+
                '                  \"cuentaExtracto\": \"0000000000288914                                  \",'+
                '                  \"divisa\": \"ARS\",'+
                '                  \"nombreCorporate\": \"TESTPORTCHI\",'+
                '                  \"nombreEmisora\": \"BANCO SANTANDER RIO\",'+
                '                  \"valueBalance\": 4000,'+
                '                  \"valueDate\": \"0001-12-31T23:00:00.000Z\"'+
                '                }'+
                '              ],'+
                '              \"sumBookBalance\": 4000,'+
                '              \"sumValueBalance\": 4000'+
                '            }'+
                '          },'+
                '          {'+
                '            \"monedaArbol\": {'+
                '              \"divisaCuenta\": \"EUR\",'+
                '              \"cuentaArbol\": ['+
                '                {'+
                '                  \"aliasCuentaPerfilado\": null,'+
                '                  \"aliasEntidad\": null,'+
                '                  \"bookBalance\": 680420,'+
                '                  \"bookDate\": \"2019-08-07T22:00:00.000Z\",'+
                '                  \"codigoBic\": {'+
                '                    \"branch\": null,'+
                '                    \"entidadbic\": null,'+
                '                    \"locatorbic\": null,'+
                '                    \"paisbic\": null'+
                '                  },'+
                '                  \"codigoCorporate\": 2777,'+
                '                  \"codigoCuenta\": 1264,'+
                '                  \"cuentaExtracto\": \"EX00720194005000096557                            \",'+
                '                  \"divisa\": \"EUR\",'+
                '                  \"nombreCorporate\": \"TESTPORTALR1801\",'+
                '                  \"nombreEmisora\": \"BANCO SANTANDER RIO\",'+
                '                  \"valueBalance\": 680420,'+
                '                  \"valueDate\": \"2019-08-07T22:00:00.000Z\"'+
                '                }'+
                '              ],'+
                '              \"sumBookBalance\": 680420,'+
                '              \"sumValueBalance\": 680420'+
                '            }'+
                '          },'+
                '          {'+
                '            \"monedaArbol\": {'+
                '              \"divisaCuenta\": \"USD\",'+
                '              \"cuentaArbol\": ['+
                '                {'+
                '                  \"aliasCuentaPerfilado\": null,'+
                '                  \"aliasEntidad\": null,'+
                '					\"bankName\" : \"bankTest\", ' + 
                '                  \"bookBalance\": 72967833,'+
                '                  \"bookDate\": \"2019-08-07T22:00:00.000Z\",'+
                '                  \"codigoBic\": {'+
                '                    \"branch\": null,'+
                '                    \"entidadbic\": null,'+
                '                    \"locatorbic\": null,'+
                '                    \"paisbic\": null'+
                '                  },'+
                '                  \"codigoCorporate\": 3,'+
                '                  \"codigoCuenta\": 1365,'+
                '                  \"cuentaExtracto\": \"0000000000288006                                  \",'+
                '                  \"divisa\": \"USD\",'+
                '                  \"nombreCorporate\": \"TESTPORTMEX\",'+
                '                  \"nombreEmisora\": \"BANCO SANTANDER RIO\",'+
                '                  \"valueBalance\": 0,'+
                '                  \"valueDate\": \"0001-12-31T23:00:00.000Z\"'+
                '                }'+
                '              ],'+
                '              \"sumBookBalance\": 72967833,'+
                '              \"sumValueBalance\": 0'+
                '            }'+
                '          }'+
                '        ],'+
                '        \"sumBookBalanceDivUsu\": 68457326.40518,'+
                '        \"sumValueBalanceDivUsu\": 680810.54774'+
                '      }'+
                '    },'+
                '    {'+
                '      \"paisArbol\": {'+
                '        \"codPais\": \"MX\",'+
                '        \"divisaUsuario\": \"EUR\",'+
                '        \"listaMonedasArbol\": ['+
                '          {'+
                '            \"monedaArbol\": {'+
                '              \"divisaCuenta\": \"MXN\",'+
                '              \"cuentaArbol\": ['+
                '                {'+
                '                  \"aliasCuentaPerfilado\": null,'+
                '                  \"aliasEntidad\": null,'+
                '					\"bankName\" : \"bankTest\", ' + 
                '                  \"bookBalance\": 8000,'+
                '                  \"bookDate\": \"2015-11-04T23:00:00.000Z\",'+
                '                  \"codigoBic\": {'+
                '                    \"branch\": null,'+
                '                    \"entidadbic\": null,'+
                '                    \"locatorbic\": null,'+
                '                    \"paisbic\": null'+
                '                  },'+
                '                  \"codigoCorporate\": 8,'+
                '                  \"codigoCuenta\": 1263,'+
                '                  \"cuentaExtracto\": \"00140009092000298531                              \",'+
                '                  \"divisa\": \"MXN\",'+
                '                  \"nombreCorporate\": \"ISBAN-SPAIN\",'+
                '                  \"nombreEmisora\": \"BANCO SANTANDER SERFIN\",'+
                '                  \"valueBalance\": 4000,'+
                '                  \"valueDate\": \"0001-12-31T23:00:00.000Z\"'+
                '                },'+
                '                {'+
                '                  \"aliasCuentaPerfilado\": null,'+
                '                  \"aliasEntidad\": null,'+
                '					\"bankName\" : \"bankTest\", ' + 
                '                  \"bookBalance\": 638349,'+
                '                  \"bookDate\": \"2016-08-15T22:00:00.000Z\",'+
                '                  \"codigoBic\": {'+
                '                    \"branch\": null,'+
                '                    \"entidadbic\": null,'+
                '                    \"locatorbic\": null,'+
                '                    \"paisbic\": null'+
                '                  },'+
                '                  \"codigoCorporate\": 3,'+
                '                  \"codigoCuenta\": 1949,'+
                '                  \"cuentaExtracto\": \"5884027703420                                     \",'+
                '                  \"divisa\": \"MXN\",'+
                '                  \"nombreCorporate\": \"TESTPORTMEX\",'+
                '                  \"nombreEmisora\": \"HSBC MEXICO S.A. INSTITUCION DE BA\",'+
                '                  \"valueBalance\": 638349,'+
                '                  \"valueDate\": \"2016-08-15T22:00:00.000Z\"'+
                '                }'+
                '              ],'+
                '              \"sumBookBalance\": 646349,'+
                '              \"sumValueBalance\": 642349'+
                '            }'+
                '          },'+
                '          {'+
                '            \"monedaArbol\": {'+
                '              \"divisaCuenta\": \"EUR\",'+
                '              \"cuentaArbol\": ['+
                '                {'+
                '                  \"aliasCuentaPerfilado\": null,'+
                '                  \"aliasEntidad\": null,'+
                '					\"bankName\" : \"bankTest\", ' + 
                '                  \"bookBalance\": 2000,'+
                '                  \"bookDate\": \"2017-10-27T22:00:00.000Z\",'+
                '                  \"codigoBic\": {'+
                '                    \"branch\": null,'+
                '                    \"entidadbic\": null,'+
                '                    \"locatorbic\": null,'+
                '                    \"paisbic\": null'+
                '                  },'+
                '                  \"codigoCorporate\": 2,'+
                '                  \"codigoCuenta\": 2087,'+
                '                  \"cuentaExtracto\": \"51500583988                                       \",'+
                '                  \"divisa\": \"EUR\",'+
                '                  \"nombreCorporate\": \"TESTPORTBR\",'+
                '                  \"nombreEmisora\": \"BANCO SANTANDER SERFIN\",'+
                '                  \"valueBalance\": 4000,'+
                '                  \"valueDate\": \"2017-10-27T22:00:00.000Z\"'+
                '                }'+
                '              ],'+
                '              \"sumBookBalance\": 2000,'+
                '              \"sumValueBalance\": 4000'+
                '            }'+
                '          }'+
                '        ],'+
                '        \"sumBookBalanceDivUsu\": 38195.86884,'+
                '        \"sumValueBalanceDivUsu\": 39971.86705'+
                '      }'+
                '    },'+
                '    {'+
                '      \"paisArbol\": {'+
                '        \"codPais\": \"CL\",'+
                '        \"divisaUsuario\": \"EUR\",'+
                '        \"listaMonedasArbol\": ['+
                '          {'+
                '            \"monedaArbol\": {'+
                '              \"divisaCuenta\": \"EUR\",'+
                '              \"cuentaArbol\": ['+
                '                {'+
                '                  \"aliasCuentaPerfilado\": null,'+
                '                  \"aliasEntidad\": null,'+
                '					\"bankName\" : \"bankTest\", ' + 
                '                  \"bookBalance\": 297378822,'+
                '                  \"bookDate\": \"2019-08-07T22:00:00.000Z\",'+
                '                  \"codigoBic\": {'+
                '                    \"branch\": null,'+
                '                    \"entidadbic\": null,'+
                '                    \"locatorbic\": null,'+
                '                    \"paisbic\": null'+
                '                  },'+
                '                  \"codigoCorporate\": 8,'+
                '                  \"codigoCuenta\": 1265,'+
                '                  \"cuentaExtracto\": \"00350401000001712683                              \",'+
                '                  \"divisa\": \"EUR\",'+
                '                  \"nombreCorporate\": \"ISBAN-SPAIN\",'+
                '                  \"nombreEmisora\": \"BANCO DE CHILE SAN\",'+
                '                  \"valueBalance\": 297378822,'+
                '                  \"valueDate\": \"2019-08-07T22:00:00.000Z\"'+
                '                }'+
                '              ],'+
                '              \"sumBookBalance\": 297378822,'+
                '              \"sumValueBalance\": 297378822'+
                '            }'+
                '          },'+
                '          {'+
                '            \"monedaArbol\": {'+
                '              \"divisaCuenta\": \"CLP\",'+
                '              \"cuentaArbol\": ['+
                '                {'+
                '                  \"aliasCuentaPerfilado\": null,'+
                '                  \"aliasEntidad\": null,'+
                '					\"bankName\" : \"bankTest\", ' + 
                '                  \"bookBalance\": 206599,'+
                '                  \"bookDate\": \"2019-08-07T22:00:00.000Z\",'+
                '                  \"codigoBic\": {'+
                '                    \"branch\": null,'+
                '                    \"entidadbic\": null,'+
                '                    \"locatorbic\": null,'+
                '                    \"paisbic\": null'+
                '                  },'+
                '                  \"codigoCorporate\": 8,'+
                '                  \"codigoCuenta\": 1266,'+
                '                  \"cuentaExtracto\": \"00350401005100018138                              \",'+
                '                  \"divisa\": \"CLP\",'+
                '                  \"nombreCorporate\": \"ISBAN-SPAIN\",'+
                '                  \"nombreEmisora\": \"BANCO DE CHILE SAN\",'+
                '                  \"valueBalance\": 206599,'+
                '                  \"valueDate\": \"2019-08-07T22:00:00.000Z\"'+
                '                }'+
                '              ],'+
                '              \"sumBookBalance\": 206599,'+
                '              \"sumValueBalance\": 206599'+
                '            }'+
                '          }'+
                '        ],'+
                '        \"sumBookBalanceDivUsu\": 297379102.02057,'+
                '        \"sumValueBalanceDivUsu\": 297379102.02057'+
                '      }'+
                '    },'+
                '    {'+
                '      \"paisArbol\": {'+
                '        \"codPais\": \"BR\",'+
                '        \"divisaUsuario\": \"EUR\",'+
                '        \"listaMonedasArbol\": ['+
                '          {'+
                '            \"monedaArbol\": {'+
                '              \"divisaCuenta\": \"PYG\",'+
                '              \"cuentaArbol\": ['+
                '                {'+
                '                  \"aliasCuentaPerfilado\": null,'+
                '                  \"aliasEntidad\": null,'+
                '					\"bankName\" : \"bankTest\", ' + 
                '                  \"bookBalance\": 8000,'+
                '                  \"bookDate\": \"2015-11-04T23:00:00.000Z\",'+
                '                  \"codigoBic\": {'+
                '                    \"branch\": null,'+
                '                    \"entidadbic\": null,'+
                '                    \"locatorbic\": null,'+
                '                    \"paisbic\": null'+
                '                  },'+
                '                  \"codigoCorporate\": 8,'+
                '                  \"codigoCuenta\": 1267,'+
                '                  \"cuentaExtracto\": \"0643130010497                                     \",'+
                '                  \"divisa\": \"PYG\",'+
                '                  \"nombreCorporate\": \"ISBAN-SPAIN\",'+
                '                  \"nombreEmisora\": \"BRASILITO\",'+
                '                  \"valueBalance\": 4000,'+
                '                  \"valueDate\": \"0001-12-31T23:00:00.000Z\"'+
                '                }'+
                '              ],'+
                '              \"sumBookBalance\": 8000,'+
                '              \"sumValueBalance\": 4000'+
                '            }'+
                '          },'+
                '          {'+
                '            \"monedaArbol\": {'+
                '              \"divisaCuenta\": \"BRL\",'+
                '              \"cuentaArbol\": ['+
                '                {'+
                '                  \"aliasCuentaPerfilado\": null,'+
                '                  \"aliasEntidad\": null,'+
                '					\"bankName\" : \"bankTest\", ' + 
                '                  \"bookBalance\": 0,'+
                '                  \"bookDate\": \"2014-05-12T22:00:00.000Z\",'+
                '                  \"codigoBic\": {'+
                '                    \"branch\": null,'+
                '                    \"entidadbic\": null,'+
                '                    \"locatorbic\": null,'+
                '                    \"paisbic\": null'+
                '                  },'+
                '                  \"codigoCorporate\": 8,'+
                '                  \"codigoCuenta\": 1268,'+
                '                  \"cuentaExtracto\": \"0643130011340                                     \",'+
                '                  \"divisa\": \"BRL\",'+
                '                  \"nombreCorporate\": \"ISBAN-SPAIN\",'+
                '                  \"nombreEmisora\": \"BANCO SANTANDER BRASIL\",'+
                '                  \"valueBalance\": 0,'+
                '                  \"valueDate\": \"2014-05-12T22:00:00.000Z\"'+
                '                }'+
                '              ],'+
                '              \"sumBookBalance\": 0,'+
                '              \"sumValueBalance\": 0'+
                '            }'+
                '          }'+
                '        ],'+
                '        \"sumBookBalanceDivUsu\": 47398980.92191,'+
                '        \"sumValueBalanceDivUsu\": 23699490.46096'+
                '      }'+
                '    },'+
                '    {'+
                '      \"paisArbol\": {'+
                '        \"codPais\": \"ES\",'+
                '        \"divisaUsuario\": \"EUR\",'+
                '        \"listaMonedasArbol\": ['+
                '          {'+
                '            \"monedaArbol\": {'+
                '              \"divisaCuenta\": \"EUR\",'+
                '              \"cuentaArbol\": ['+
                '                {'+
                '                  \"aliasCuentaPerfilado\": null,'+
                '                  \"aliasEntidad\": null,'+
                '					\"bankName\" : \"bankTest\", ' + 
                '                  \"bookBalance\": 9,'+
                '                  \"bookDate\": \"2017-04-02T22:00:00.000Z\",'+
                '                  \"codigoBic\": {'+
                '                    \"branch\": null,'+
                '                    \"entidadbic\": null,'+
                '                    \"locatorbic\": null,'+
                '                    \"paisbic\": null'+
                '                  },'+
                '                  \"codigoCorporate\": 8,'+
                '                  \"codigoCuenta\": 2662,'+
                '                  \"cuentaExtracto\": \"ES4090000001200018004907                          \",'+
                '                  \"divisa\": \"EUR\",'+
                '                  \"nombreCorporate\": \"ISBAN-SPAIN\",'+
                '                  \"nombreEmisora\": \"SOCIETE GENERALE, SUCURSAL EN ESPANA\",'+
                '                  \"valueBalance\": 9,'+
                '                  \"valueDate\": \"2000-12-31T23:00:00.000Z\"'+
                '                }'+
                '              ],'+
                '              \"sumBookBalance\": 9,'+
                '              \"sumValueBalance\": 9'+
                '            }'+
                '          },'+
                '          {'+
                '            \"monedaArbol\": {'+
                '              \"divisaCuenta\": \"BRL\",'+
                '              \"cuentaArbol\": ['+
                '                {'+
                '                  \"aliasCuentaPerfilado\": null,'+
                '                  \"aliasEntidad\": \"SAN ESP 4      \",'+
                '					\"bankName\" : \"bankTest\", ' + 
                '                  \"bookBalance\": 10080,'+
                '                  \"bookDate\": \"2019-12-12T23:00:00.000Z\",'+
                '                  \"codigoBic\": {'+
                '                    \"branch\": null,'+
                '                    \"entidadbic\": null,'+
                '                    \"locatorbic\": null,'+
                '                    \"paisbic\": null'+
                '                  },'+
                '                  \"codigoCorporate\": 8,'+
                '                  \"codigoCuenta\": 2666,'+
                '                  \"cuentaExtracto\": \"2167130010391                                     \",'+
                '                  \"divisa\": \"BRL\",'+
                '                  \"nombreCorporate\": \"ISBAN-SPAIN\",'+
                '                  \"nombreEmisora\": \"BANCO SANTANDER ESPANA\",'+
                '                  \"valueBalance\": 1002993,'+
                '                  \"valueDate\": \"2019-12-12T23:00:00.000Z\"'+
                '                }'+
                '              ],'+
                '              \"sumBookBalance\": 10080,'+
                '              \"sumValueBalance\": 1002993'+
                '            }'+
                '          }'+
                '        ],'+
                '        \"sumBookBalanceDivUsu\": 3103.90958,'+
                '        \"sumValueBalanceDivUsu\": 307949.68343'+
                '      }'+
                '    }'+
                '  ],'+
                '  \"listaDivisa\": [],'+
                '  \"descripcionConversion\": \"USD=1,07659 31-12-2017; GBP=1,07659 31-12-2017; ARS=10,267 05-01-2015; MXN=17,857 05-01-2015; CLP=737,8 05-01-2015; PYG=0,00017 ; BRL=3,2571 05-01-2015\",'+
                '  \"listaTipCambio\": ['+
                '    {'+
                '      \"tipoDeCambio\": {'+
                '        \"claError\": null,'+
                '        \"divisa\": \"EUR\",'+
                '        \"fecha\": null,'+
                '        \"importe\": 1,'+
                '        \"importeDecimal\": 1.00000000,'+
                '        \"nombreDivisa\": null,'+
                '        \"tipError\": null'+
                '      }'+
                '    },'+
                '    {'+
                '      \"tipoDeCambio\": {'+
                '        \"claError\": null,'+
                '        \"divisa\": \"USD\",'+
                '        \"fecha\": \"2017-12-30T23:00:00.000Z\",'+
                '        \"importe\": 1,'+
                '        \"importeDecimal\": 1.07659464,'+
                '        \"nombreDivisa\": null,'+
                '        \"tipError\": \"2\"'+
                '      }'+
                '    },'+
                '    {'+
                '      \"tipoDeCambio\": {'+
                '        \"claError\": null,'+
                '        \"divisa\": \"GBP\",'+
                '        \"fecha\": \"2017-12-30T23:00:00.000Z\",'+
                '        \"importe\": 1,'+
                '        \"importeDecimal\": 1.07659464,'+
                '        \"nombreDivisa\": null,'+
                '        \"tipError\": \"2\"'+
                '      }'+
                '    },'+
                '    {'+
                '      \"tipoDeCambio\": {'+
                '        \"claError\": null,'+
                '        \"divisa\": \"ARS\",'+
                '        \"fecha\": \"2015-01-04T23:00:00.000Z\",'+
                '        \"importe\": 10,'+
                '        \"importeDecimal\": 10.26700000,'+
                '        \"nombreDivisa\": null,'+
                '        \"tipError\": \"2\"'+
                '      }'+
                '    },'+
                '    {'+
                '      \"tipoDeCambio\": {'+
                '        \"claError\": null,'+
                '        \"divisa\": \"MXN\",'+
                '        \"fecha\": \"2015-01-04T23:00:00.000Z\",'+
                '        \"importe\": 17,'+
                '        \"importeDecimal\": 17.85700000,'+
                '        \"nombreDivisa\": null,'+
                '        \"tipError\": \"2\"'+
                '      }'+
                '    },'+
                '    {'+
                '      \"tipoDeCambio\": {'+
                '        \"claError\": null,'+
                '        \"divisa\": \"CLP\",'+
                '        \"fecha\": \"2015-01-04T23:00:00.000Z\",'+
                '        \"importe\": 737,'+
                '        \"importeDecimal\": 737.80000000,'+
                '        \"nombreDivisa\": null,'+
                '        \"tipError\": \"2\"'+
                '      }'+
                '    },'+
                '    {'+
                '      \"tipoDeCambio\": {'+
                '        \"claError\": null,'+
                '        \"divisa\": \"PYG\",'+
                '        \"fecha\": null,'+
                '        \"importe\": 5924,'+
                '        \"importeDecimal\": 0.00016878,'+
                '        \"nombreDivisa\": null,'+
                '        \"tipError\": \"0\"'+
                '      }'+
                '    },'+
                '    {'+
                '      \"tipoDeCambio\": {'+
                '        \"claError\": \"AUD\",'+
                '        \"divisa\": \"BRL\",'+
                '        \"fecha\": \"2015-01-04T23:00:00.000Z\",'+
                '        \"importe\": 3,'+
                '        \"importeDecimal\": 3.25710000,'+
                '        \"nombreDivisa\": null,'+
                '        \"tipError\": \"2\"'+
                '      }'+
                '    },'+
                '    {'+
                '      \"tipoDeCambio\": {'+
                '        \"claError\": \"test\",'+
                '        \"divisa\": \"AUD\",'+
                '        \"fecha\": \"2018-09-12T22:00:00.000Z\",'+
                '        \"importe\": 0,'+
                '        \"importeDecimal\": 0.77820000,'+
                '        \"nombreDivisa\": null,'+
                '        \"tipError\": \"2\"'+
                '      }'+
                '    }'+
                '  ]'+
                '}';
        }
        if (String.isNotBlank(response)) 
        {
            WRAPPER_Balance balanceList = WRAPPER_Balance.parse(response);
            System.debug(JSON.serialize(balanceList));
            return balanceList;
        }
        return null;
    }
    
    /*------------------------------------------------------------
Author:         Guillermo Giral
Company:        Deloitte
Description:    Retrieves the data from the Mulesoft balances service
History 
<Date>          <Author>            <Change Description>
23/03/2020      Guillermo Giral  	Intial Version
------------------------------------------------------------*/    
    @AuraEnabled
    public static WRAPPER_Balance_LU retrieveDataLU (String iWhen) {
        CNT_ApiConfiguration__c configWs = new CNT_ApiConfiguration__c();     
        configWs = CNT_ApiConfiguration__c.getValues('CNT_BalanceLastUpdate');
        String response = Global_IntegrationWrapper.launchHTTP('', configWs.CNT_Endpoint__c, configWs.CNT_HTTPMethod__c);
        System.debug('LURESPONSE >>> '+response);        
        if (Test.isRunningTest()) {
            response = '{'+
                '  \"accountsList\": {'+
                '    \"_links\": null,'+
                '    \"accountsDataList\": ['+
                '      {'+
                '        \"_links\": null,'+
                '        \"account\": null,'+
                '        \"accountIdList\": ['+
                '          {'+
                '            \"accountId\": \"ES4800490000000000000000\",'+
                '            \"idType\": \"IBA\"'+
                '          }'+
                '        ],'+
                '        \"alias\": null,'+
                '        \"availableBalance\": {'+
                '          \"amount\": 1000003.0,'+
                '          \"currencyCode\": \"EUR\",'+
                '          \"lastUpdate\": \"2020-04-02T10:01:56.392Z\"'+
                '        },'+
                '        \"balanceAllowed\": true,'+
                '        \"bankDescription\": \"0001\",'+
                '        \"bankId\": \"BSCHESM0XXX\",'+
                '        \"country\": \"ES\",'+
                '        \"customerId\": null,'+
                '        \"customerName\": null,'+
                '        \"description\": null,'+
                '        \"displayNumber\": \"ES******00\",'+
                '        \"flags\": {'+
                '          \"pain002Active\": true,'+
                '          \"hasSwiftPayments\": true'+
                '        },'+
                '        \"hasSwiftPayment\": \"YES\",'+
                '        \"hasSwiftPayments\": null,'+
                '        \"internationalPaymentsAllowed\": true,'+
                '        \"lastTransactionDate\": \"2020-03-03T00:00:00Z\",'+
                '        \"lastUpdateSwiftPayment\": \"2020-03-03T00:00:00Z\",'+
                '        \"mainBalance\": {'+
                '          \"amount\": 1000000.0,'+
                '          \"currencyCode\": \"EUR\",'+
                '          \"lastUpdate\": \"2020-04-02T10:01:56.392Z\"'+
                '        },'+
                '        \"overdraftLimit\": null,'+
                '        \"overdraftUsed\": null,'+
                '        \"pain002Active\": true,'+
                '        \"parentCustomerName\": \"Santander\",'+
                '        \"pendingBalance\": null,'+
                '        \"status\": null,'+
                '        \"transactionsAllowed\": true,'+
                '        \"type\": \"IBA\",'+
                '        \"withholdingBalance\": null'+
                '      },'+
                '      {'+
                '        \"_links\": null,'+
                '        \"account\": null,'+
                '        \"accountIdList\": ['+
                '          {'+
                '            \"accountId\": \"ES9000490000000000000011\",'+
                '            \"idType\": \"IBA\"'+
                '          }'+
                '        ],'+
                '        \"alias\": null,'+
                '        \"availableBalance\": {'+
                '          \"amount\": 1000003.0,'+
                '          \"currencyCode\": \"EUR\",'+
                '          \"lastUpdate\": \"2020-04-02T10:01:56.392Z\"'+
                '        },'+
                '        \"balanceAllowed\": true,'+
                '        \"bankDescription\": \"0001\",'+
                '        \"bankId\": \"BSCHESM0XXX\",'+
                '        \"country\": \"ES\",'+
                '        \"customerId\": null,'+
                '        \"customerName\": null,'+
                '        \"description\": null,'+
                '        \"displayNumber\": \"ES******11\",'+
                '        \"flags\": {'+
                '          \"pain002Active\": true,'+
                '          \"hasSwiftPayments\": true'+
                '        },'+
                '        \"hasSwiftPayment\": \"YES\",'+
                '        \"hasSwiftPayments\": null,'+
                '        \"internationalPaymentsAllowed\": true,'+
                '        \"lastTransactionDate\": \"2020-03-03T00:00:00Z\",'+
                '        \"lastUpdateSwiftPayment\": \"2020-03-03T00:00:00Z\",'+
                '        \"mainBalance\": {'+
                '          \"amount\": 1000000.0,'+
                '          \"currencyCode\": \"EUR\",'+
                '          \"lastUpdate\": \"2020-04-02T10:01:56.392Z\"'+
                '        },'+
                '        \"overdraftLimit\": null,'+
                '        \"overdraftUsed\": null,'+
                '        \"pain002Active\": true,'+
                '        \"parentCustomerName\": \"Santander\",'+
                '        \"pendingBalance\": null,'+
                '        \"status\": null,'+
                '        \"transactionsAllowed\": true,'+
                '        \"type\": \"IBA\",'+
                '        \"withholdingBalance\": null'+
                '      },'+
                '      {'+
                '        \"_links\": null,'+
                '        \"account\": null,'+
                '        \"accountIdList\": ['+
                '          {'+
                '            \"accountId\": \"ES8100490075473000562155\",'+
                '            \"idType\": \"IBA\"'+
                '          }'+
                '        ],'+
                '        \"alias\": null,'+
                '        \"availableBalance\": {'+
                '          \"amount\": 1000003.0,'+
                '          \"currencyCode\": \"EUR\",'+
                '          \"lastUpdate\": \"2020-04-02T10:01:56.392Z\"'+
                '        },'+
                '        \"balanceAllowed\": true,'+
                '					\"bankName\" : \"bankTest\", ' + 
                '        \"bankDescription\": \"0001\",'+
                '        \"bankId\": \"BSCHESM0XXX\",'+
                '        \"country\": \"ES\",'+
                '        \"customerId\": null,'+
                '        \"customerName\": null,'+
                '        \"description\": null,'+
                '        \"displayNumber\": \"ES******55\",'+
                '        \"flags\": {'+
                '          \"pain002Active\": true,'+
                '          \"hasSwiftPayments\": true'+
                '        },'+
                '        \"hasSwiftPayment\": \"YES\",'+
                '        \"hasSwiftPayments\": null,'+
                '        \"internationalPaymentsAllowed\": true,'+
                '        \"lastTransactionDate\": \"2020-03-03T00:00:00Z\",'+
                '        \"lastUpdateSwiftPayment\": \"2019-10-04T11:38:00Z\",'+
                '        \"mainBalance\": {'+
                '          \"amount\": 1000000.0,'+
                '          \"currencyCode\": \"EUR\",'+
                '          \"lastUpdate\": \"2020-04-02T10:01:56.392Z\"'+
                '        },'+
                '        \"overdraftLimit\": null,'+
                '        \"overdraftUsed\": null,'+
                '        \"pain002Active\": true,'+
                '        \"parentCustomerName\": \"Santander\",'+
                '        \"pendingBalance\": null,'+
                '        \"status\": null,'+
                '        \"transactionsAllowed\": true,'+
                '        \"type\": \"IBA\",'+
                '        \"withholdingBalance\": null'+
                '      },'+
                '      {'+
                '        \"_links\": null,'+
                '        \"account\": null,'+
                '        \"accountIdList\": ['+
                '          {'+
                '            \"accountId\": \"ES1000490072012110458432\",'+
                '            \"idType\": \"IBA\"'+
                '          }'+
                '        ],'+
                '        \"alias\": null,'+
                '        \"availableBalance\": {'+
                '          \"amount\": 1000003.0,'+
                '          \"currencyCode\": \"EUR\",'+
                '          \"lastUpdate\": \"2020-04-02T10:01:56.392Z\"'+
                '        },'+
                '        \"balanceAllowed\": true,'+
                '        \"bankDescription\": \"0001\",'+
                '        \"bankId\": \"BSCHESM0XXX\",'+
                '        \"country\": \"ES\",'+
                '        \"customerId\": null,'+
                '        \"customerName\": null,'+
                '        \"description\": null,'+
                '        \"displayNumber\": \"ES******32\",'+
                '        \"flags\": {'+
                '          \"pain002Active\": true,'+
                '          \"hasSwiftPayments\": true'+
                '        },'+
                '        \"hasSwiftPayment\": \"YES\",'+
                '        \"hasSwiftPayments\": null,'+
                '        \"internationalPaymentsAllowed\": true,'+
                '        \"lastTransactionDate\": \"2020-03-03T00:00:00Z\",'+
                '        \"lastUpdateSwiftPayment\": \"2020-04-01T10:57:00Z\",'+
                '        \"mainBalance\": {'+
                '          \"amount\": 1000000.0,'+
                '          \"currencyCode\": \"EUR\",'+
                '          \"lastUpdate\": \"2020-04-02T10:01:56.392Z\"'+
                '        },'+
                '        \"overdraftLimit\": null,'+
                '        \"overdraftUsed\": null,'+
                '        \"pain002Active\": true,'+
                '        \"parentCustomerName\": \"Santander\",'+
                '        \"pendingBalance\": null,'+
                '        \"status\": null,'+
                '        \"transactionsAllowed\": true,'+
                '        \"type\": \"IBA\",'+
                '        \"withholdingBalance\": null'+
                '      }'+
                '    ]'+
                '  },'+
                +
                '  \"listaDivisa\": [],'+
                '  \"descripcionConversion\": \"USD=1,07659 31-12-2017; GBP=1,07659 31-12-2017; ARS=10,267 05-01-2015; MXN=17,857 05-01-2015; CLP=737,8 05-01-2015; PYG=0,00017 ; BRL=3,2571 05-01-2015\",'+
                '  \"listaTipCambio\": ['+
                '    {'+
                '      \"tipoDeCambio\": {'+
                '        \"claError\": null,'+
                '        \"divisa\": \"EUR\",'+
                '        \"fecha\": null,'+
                '        \"importe\": 1,'+
                '        \"importeDecimal\": 1.00000000,'+
                '        \"nombreDivisa\": null,'+
                '        \"tipError\": null'+
                '      }'+
                '    },'+
                '    {'+
                '      \"tipoDeCambio\": {'+
                '        \"claError\": null,'+
                '        \"divisa\": \"USD\",'+
                '        \"fecha\": \"2017-12-30T23:00:00.000Z\",'+
                '        \"importe\": 1,'+
                '        \"importeDecimal\": 1.07659464,'+
                '        \"nombreDivisa\": null,'+
                '        \"tipError\": \"2\"'+
                '      }'+
                '    },'+
                '    {'+
                '      \"tipoDeCambio\": {'+
                '        \"claError\": null,'+
                '        \"divisa\": \"GBP\",'+
                '        \"fecha\": \"2017-12-30T23:00:00.000Z\",'+
                '        \"importe\": 1,'+
                '        \"importeDecimal\": 1.07659464,'+
                '        \"nombreDivisa\": null,'+
                '        \"tipError\": \"2\"'+
                '      }'+
                '    },'+
                '    {'+
                '      \"tipoDeCambio\": {'+
                '        \"claError\": null,'+
                '        \"divisa\": \"ARS\",'+
                '        \"fecha\": \"2015-01-04T23:00:00.000Z\",'+
                '        \"importe\": 10,'+
                '        \"importeDecimal\": 10.26700000,'+
                '        \"nombreDivisa\": null,'+
                '        \"tipError\": \"2\"'+
                '      }'+
                '    },'+
                '    {'+
                '      \"tipoDeCambio\": {'+
                '        \"claError\": null,'+
                '        \"divisa\": \"MXN\",'+
                '        \"fecha\": \"2015-01-04T23:00:00.000Z\",'+
                '        \"importe\": 17,'+
                '        \"importeDecimal\": 17.85700000,'+
                '        \"nombreDivisa\": null,'+
                '        \"tipError\": \"2\"'+
                '      }'+
                '    },'+
                '    {'+
                '      \"tipoDeCambio\": {'+
                '        \"claError\": null,'+
                '        \"divisa\": \"CLP\",'+
                '        \"fecha\": \"2015-01-04T23:00:00.000Z\",'+
                '        \"importe\": 737,'+
                '        \"importeDecimal\": 737.80000000,'+
                '        \"nombreDivisa\": null,'+
                '        \"tipError\": \"2\"'+
                '      }'+
                '    },'+
                '    {'+
                '      \"tipoDeCambio\": {'+
                '        \"claError\": null,'+
                '        \"divisa\": \"PYG\",'+
                '        \"fecha\": null,'+
                '        \"importe\": 5924,'+
                '        \"importeDecimal\": 0.00016878,'+
                '        \"nombreDivisa\": null,'+
                '        \"tipError\": \"0\"'+
                '      }'+
                '    },'+
                '    {'+
                '      \"tipoDeCambio\": {'+
                '        \"claError\": \"AUD\",'+
                '        \"divisa\": \"BRL\",'+
                '        \"fecha\": \"2015-01-04T23:00:00.000Z\",'+
                '        \"importe\": 3,'+
                '        \"importeDecimal\": 3.25710000,'+
                '        \"nombreDivisa\": null,'+
                '        \"tipError\": \"2\"'+
                '      }'+
                '    },'+
                '    {'+
                '      \"tipoDeCambio\": {'+
                '        \"claError\": \"test\",'+
                '        \"divisa\": \"AUD\",'+
                '        \"fecha\": \"2018-09-12T22:00:00.000Z\",'+
                '        \"importe\": 0,'+
                '        \"importeDecimal\": 0.77820000,'+
                '        \"nombreDivisa\": null,'+
                '        \"tipError\": \"2\"'+
                '      }'+
                '    }'+
                '  ]'+
                '}';
        }
        if (String.isNotBlank(response)) {
            WRAPPER_Balance_LU balanceList = WRAPPER_Balance_LU.parse(response);
            System.debug(JSON.serialize(balanceList));
            return balanceList;
        }
        return null;
    }
    
    /*----------------------------------------------------------------------------------
Author:         Guillermo Giral
Company:        Deloitte
Description:    Retrieves the data from the Mulesoft accounts service (OneTrade)
History 
<Date>          <Author>            <Change Description>
05/08/2020      Guillermo Giral  	Intial Version
-----------------------------------------------------------------------------------*/    
    @AuraEnabled
    public static WRAPPER_Balance_LU retrieveDataIAM(){ 
        
        CNT_ApiConfiguration__c configWs = new CNT_ApiConfiguration__c();     
        
        configWs = CNT_ApiConfiguration__c.getValues('CNT_OneT_Accounts');
        Map<String, String> extraHeaders = new Map<String, String>{'onetrade' => 'true'};
            
            String response = Global_IntegrationWrapper.launchHTTP('', configWs.CNT_Endpoint__c, configWs.CNT_HTTPMethod__c, extraHeaders);
        //String response = makeCallout('', configWs.CNT_Endpoint__c, configWs.CNT_HTTPMethod__c);																						
        
        if(Test.isRunningTest()){
            
            response = '{'+
                '  \"accountsList\": {'+
                '    \"_links\": null,'+
                '    \"accountsDataList\": ['+
                '      {'+
                '        \"_links\": null,'+
                '        \"account\": null,'+
                '        \"accountIdList\": ['+
                '          {'+
                '            \"accountId\": \"ES4800490000000000000000\",'+
                '            \"idType\": \"IBA\"'+
                '          }'+
                '        ],'+
                '        \"alias\": \"Alias Cuenta EBURY\",'+
                '        \"availableBalance\": {'+
                '          \"amount\": 1000003.0,'+
                '          \"currencyCode\": \"EUR\",'+
                '          \"lastUpdate\": \"2020-04-02T10:01:56.392Z\"'+
                '        },'+
                '        \"balanceAllowed\": true,'+
                '        \"bankDescription\": \"0001\",'+
                '        \"bankId\": \"BSCHESM0XXX\",'+
                '        \"country\": \"ES\",'+
                '        \"customerId\": null,'+
                '        \"customerName\": null,'+
                '        \"description\": null,'+
                '        \"displayNumber\": \"ES******00\",'+
                '        \"flags\": {'+
                '          \"pain002Active\": true,'+
                '          \"hasSwiftPayments\": true'+
                '        },'+
                '        \"hasSwiftPayment\": \"YES\",'+
                '        \"hasSwiftPayments\": null,'+
                '        \"internationalPaymentsAllowed\": true,'+
                '        \"lastTransactionDate\": \"2020-03-03T00:00:00Z\",'+
                '        \"lastUpdateSwiftPayment\": \"2020-03-03T00:00:00Z\",'+
                '        \"mainBalance\": {'+
                '          \"amount\": 1000000.0,'+
                '          \"currencyCode\": \"EUR\",'+
                '          \"lastUpdate\": \"2020-04-02T10:01:56.392Z\"'+
                '        },'+
                '        \"overdraftLimit\": null,'+
                '        \"overdraftUsed\": null,'+
                '        \"pain002Active\": true,'+
                '        \"parentCustomerName\": \"Santander\",'+
                '        \"pendingBalance\": null,'+
                '        \"status\": null,'+
                '        \"transactionsAllowed\": true,'+
                '        \"type\": \"IBA\",'+
                '		 \"dataProvider\": \"EBURY\",'+
                '		 \"associatedAccountList\": ['+
                '           {'+
                '               \"associatedAccountDetails\": {'+
                '                   \"accountAddress\": \"Calle ebury 1 bla bla bla\",'+
                '                   \"accountName\": \"Associated Account Name Ebury 1\",'+
                '                   \"bankIdType\": \"Bank Id Type IBAN\",'+
                '                   \"bankId\": \"Bank Id 3030030303\",'+
                '                   \"account\": {'+
                '                       \"accountIdType\": \"Account Id Type IBAN\",'+
                '                       \"accountId\": \"Account Id EB02020202\"'+
                '                   }'+
                '               },'+
                '               \"associatedAccountDetails\": {'+
                '                   \"accountAddress\": \"Calle ebury 2 bla bla bla\",'+
                '                   \"accountName\": \"Associated Account Name Ebury 2\",'+
                '                   \"bankIdType\": \"Bank Id Type BBA\",'+
                '                   \"bankId\": \"Bank Id 8989898998\",'+
                '                   \"account\": {'+
                '                       \"accountIdType\": \"Account Id Type BBA\",'+
                '                       \"accountId\": \"Account Id EB989898989\"'+
                '                   }'+
                '               }'+
                '           }'+
                '        ],'+
                '        \"withholdingBalance\": null'+
                '      },'+
                '      {'+
                '        \"_links\": null,'+
                '        \"account\": null,'+
                '        \"accountIdList\": ['+
                '          {'+
                '            \"accountId\": \"ES9000490000000000000011\",'+
                '            \"idType\": \"IBA\"'+
                '          }'+
                '        ],'+
                '        \"alias\": \"Alias Cuenta EBURY\",'+
                '        \"availableBalance\": {'+
                '          \"amount\": 1000003.0,'+
                '          \"currencyCode\": \"EUR\",'+
                '          \"lastUpdate\": \"2020-04-02T10:01:56.392Z\"'+
                '        },'+
                '        \"balanceAllowed\": true,'+
                '        \"bankDescription\": \"0001\",'+
                '        \"bankId\": \"BSCHESM0XXX\",'+
                '        \"country\": \"ES\",'+
                '        \"customerId\": null,'+
                '        \"customerName\": null,'+
                '        \"description\": null,'+
                '        \"displayNumber\": \"ES******11\",'+
                '        \"flags\": {'+
                '          \"pain002Active\": true,'+
                '          \"hasSwiftPayments\": true'+
                '        },'+
                '        \"hasSwiftPayment\": \"YES\",'+
                '        \"hasSwiftPayments\": null,'+
                '        \"internationalPaymentsAllowed\": true,'+
                '        \"lastTransactionDate\": \"2020-03-03T00:00:00Z\",'+
                '        \"lastUpdateSwiftPayment\": \"2020-03-03T00:00:00Z\",'+
                '        \"mainBalance\": {'+
                '          \"amount\": 1000000.0,'+
                '          \"currencyCode\": \"EUR\",'+
                '          \"lastUpdate\": \"2020-04-02T10:01:56.392Z\"'+
                '        },'+
                '        \"overdraftLimit\": null,'+
                '        \"overdraftUsed\": null,'+
                '        \"pain002Active\": true,'+
                '        \"parentCustomerName\": \"Santander\",'+
                '        \"pendingBalance\": null,'+
                '        \"status\": null,'+
                '        \"transactionsAllowed\": true,'+
                '        \"type\": \"IBA\",'+
                '		 \"dataProvider\": \"EBURY\",'+
                '        \"withholdingBalance\": null'+
                '      },'+
                '      {'+
                '        \"_links\": null,'+
                '        \"account\": null,'+
                '        \"accountIdList\": ['+
                '          {'+
                '            \"accountId\": \"ES8100490075473000562155\",'+
                '            \"idType\": \"IBA\"'+
                '          }'+
                '        ],'+
                '        \"alias\": \"Alias Cuenta EBURY\",'+
                '        \"availableBalance\": {'+
                '          \"amount\": 1000003.0,'+
                '          \"currencyCode\": \"EUR\",'+
                '          \"lastUpdate\": \"2020-04-02T10:01:56.392Z\"'+
                '        },'+
                '        \"balanceAllowed\": true,'+
                '        \"bankDescription\": \"0001\",'+
                '        \"bankId\": \"BSCHESM0XXX\",'+
                '        \"country\": \"ES\",'+
                '        \"customerId\": null,'+
                '        \"customerName\": null,'+
                '        \"description\": null,'+
                '        \"displayNumber\": \"ES******55\",'+
                '        \"flags\": {'+
                '          \"pain002Active\": true,'+
                '          \"hasSwiftPayments\": true'+
                '        },'+
                '        \"hasSwiftPayment\": \"YES\",'+
                '        \"hasSwiftPayments\": null,'+
                '        \"internationalPaymentsAllowed\": true,'+
                '        \"lastTransactionDate\": \"2020-03-03T00:00:00Z\",'+
                '        \"lastUpdateSwiftPayment\": \"2019-10-04T11:38:00Z\",'+
                '        \"mainBalance\": {'+
                '          \"amount\": 1000000.0,'+
                '          \"currencyCode\": \"EUR\",'+
                '          \"lastUpdate\": \"2020-04-02T10:01:56.392Z\"'+
                '        },'+
                '        \"overdraftLimit\": null,'+
                '        \"overdraftUsed\": null,'+
                '        \"pain002Active\": true,'+
                '        \"parentCustomerName\": \"Santander\",'+
                '        \"pendingBalance\": null,'+
                '        \"status\": null,'+
                '        \"transactionsAllowed\": true,'+
                '        \"type\": \"IBA\",'+
                '		 \"dataProvider\": \"EBURY\",'+
                '        \"withholdingBalance\": null'+
                '      },'+
                '      {'+
                '        \"_links\": null,'+
                '        \"account\": null,'+
                '        \"accountIdList\": ['+
                '          {'+
                '            \"accountId\": \"ES1000490072012110458432\",'+
                '            \"idType\": \"IBA\"'+
                '          }'+
                '        ],'+
                '        \"alias\": \"Alias Cuenta STRATIO\",'+
                '        \"availableBalance\": {'+
                '          \"amount\": 1000003.0,'+
                '          \"currencyCode\": \"EUR\",'+
                '          \"lastUpdate\": \"2020-04-02T10:01:56.392Z\"'+
                '        },'+
                '        \"balanceAllowed\": true,'+
                '        \"bankDescription\": \"0001\",'+
                '        \"bankId\": \"BSCHESM0XXX\",'+
                '        \"country\": \"ES\",'+
                '        \"customerId\": null,'+
                '        \"customerName\": null,'+
                '        \"description\": null,'+
                '        \"displayNumber\": \"ES******32\",'+
                '        \"flags\": {'+
                '          \"pain002Active\": true,'+
                '          \"hasSwiftPayments\": true'+
                '        },'+
                '        \"hasSwiftPayment\": \"YES\",'+
                '        \"hasSwiftPayments\": null,'+
                '        \"internationalPaymentsAllowed\": true,'+
                '        \"lastTransactionDate\": \"2020-03-03T00:00:00Z\",'+
                '        \"lastUpdateSwiftPayment\": \"2020-04-01T10:57:00Z\",'+
                '        \"mainBalance\": {'+
                '          \"amount\": 1000000.0,'+
                '          \"currencyCode\": \"EUR\",'+
                '          \"lastUpdate\": \"2020-04-02T10:01:56.392Z\"'+
                '        },'+
                '        \"overdraftLimit\": null,'+
                '        \"overdraftUsed\": null,'+
                '        \"pain002Active\": true,'+
                '        \"parentCustomerName\": \"Santander\",'+
                '        \"pendingBalance\": null,'+
                '        \"status\": null,'+
                '        \"transactionsAllowed\": true,'+
                '        \"type\": \"IBA\",'+
                '		 \"dataProvider\": \"Stratio\",'+
                '        \"withholdingBalance\": null'+
                '      }'+
                '    ]'+
                '  }'+
                '}';
        }
        if (String.isNotBlank(response)) 
        {
            if(response.contains('Error controlled 403')){
                is403Error = true;
                WRAPPER_Balance_LU balanceList = new WRAPPER_Balance_LU();
                balanceList.accountsList = new WRAPPER_Balance_LU.AccountsList();
                balanceList.accountsList.accountsDataList = new List<WRAPPER_Balance_LU.AccountsDataList>();
                return balanceList;
            }else{
                WRAPPER_Balance_LU balanceList = WRAPPER_Balance_LU.parse(response);
            	return balanceList;
            }
            
        }
        return null;
    }
    
    /*------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:   	Receives a country ISO Code and returns its country name.
History 
<Date>          <Author>            <Change Description>
17/02/2019		Shahad Naji  		Intial Version
------------------------------------------------------------*/
    @AuraEnabled(cacheable=true)
    public static String getCountryName(String isoCode){
        String str = '';
        try{
            str = Global_Utilities.getCountryName(isoCode); 
        }catch(Exception e){
            throw new AuraHandledException('The following exception has occurred: ' + e.getMessage());
        }
        return str;
    }
    
    /*------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Retrieves the information of the accounts grouped by country
History 
<Date>          <Author>            <Change Description>
17/12/2019     Shahad Naji  		Intial Version
------------------------------------------------------------*/    
    @AuraEnabled 
    public static Map<String, List<WRAPPER_AccountList.AccountDetails>> orderByCountry(List<String> iCountries, List<WRAPPER_AccountList.AccountDetails> iAccountList){
        Map<String, List<WRAPPER_AccountList.AccountDetails>> countryAccountMap = new Map<String, List<WRAPPER_AccountList.AccountDetails>>();
        try{
            System.debug(iCountries);
            System.debug(iAccountList);
            for(String countryItem : iCountries){
                List<WRAPPER_AccountList.AccountDetails> accountListAux = new  List<WRAPPER_AccountList.AccountDetails>();
                for(WRAPPER_AccountList.AccountDetails accountItem : iAccountList){
                    if(countryItem.equalsIgnoreCase(accountItem.country)){      
                        accountListAux.add(accountItem);
                    }  
                }
                System.debug('accountsListAux: ');
                System.debug(accountListAux);
                System.debug(countryItem);
                countryAccountMap.put(countryItem, accountListAux);
            }
        }catch(Exception e ){
            throw new AuraHandledException('The following exception has occurred: ' + e.getMessage());
        }
        
        return countryAccountMap;
    }  
    
    /*------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Retrieves the information of the accounts grouped by currecy
History 
<Date>          <Author>            <Change Description>
17/12/2019     Shahad Naji  		Intial Version
------------------------------------------------------------*/
    @AuraEnabled 
    public static Map<String, List<WRAPPER_AccountList.AccountDetails>> orderByCurrency(List<String> iCurrencies, List<WRAPPER_AccountList.AccountDetails> iAccountList){
        
        Map<String, List<WRAPPER_AccountList.AccountDetails>> currencyAccountMap = new Map<String, List<WRAPPER_AccountList.AccountDetails>>();
        try{
            System.debug(iCurrencies);
            System.debug(iAccountList);
            for(String currencyItem : iCurrencies){
                List<WRAPPER_AccountList.AccountDetails> accountListAux = new  List<WRAPPER_AccountList.AccountDetails>();
                for(WRAPPER_AccountList.AccountDetails accountItem : iAccountList){
                    if(currencyItem.equalsIgnoreCase(accountItem.currencyCodeAvailableBalance)){      
                        accountListAux.add(accountItem);
                    }
                }
                if(accountListAux.size() > 0){
                    System.debug('accountsListAux: ');
                    System.debug(accountListAux);
                    System.debug(currencyItem);
                    currencyAccountMap.put(currencyItem, accountListAux); 
                }
                
            }
        }catch(Exception e ){
            throw new AuraHandledException('The following exception has occurred: ' + e.getMessage());
        }
        return currencyAccountMap;
    }
    
    /*------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Retrieves the information of the accounts grouped by subsidiary
History 
<Date>          <Author>            <Change Description>
17/12/2019     Shahad Naji  		Intial Version
------------------------------------------------------------*/
    @AuraEnabled 
    public static Map<String, List<WRAPPER_AccountList.AccountDetails>> orderBySubsidiary(List<String> iSubsidiaries, List<WRAPPER_AccountList.AccountDetails> iAccountList){
        Map<String, List<WRAPPER_AccountList.AccountDetails>> subsidiaryAccountMap = new Map<String, List<WRAPPER_AccountList.AccountDetails>>();
        try{
            
            System.debug(iSubsidiaries);
            System.debug(iAccountList);
            for(String subsidiaryItem : iSubsidiaries){
                List<WRAPPER_AccountList.AccountDetails> accountListAux = new  List<WRAPPER_AccountList.AccountDetails>();
                for(WRAPPER_AccountList.AccountDetails accountItem : iAccountList){
                    if(subsidiaryItem.equalsIgnoreCase(accountItem.subsidiaryName)){      
                        accountListAux.add(accountItem);
                    }
                }
                System.debug('accountsListAux: ');
                System.debug(accountListAux);
                System.debug(subsidiaryItem);
                subsidiaryAccountMap.put(subsidiaryItem, accountListAux);  
            }
        }catch(Exception e ){
            throw new AuraHandledException('The following exception has occurred: ' + e.getMessage());
        }
        return subsidiaryAccountMap;
    } 
    /*------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Sum of the currencies
History 
<Date>          <Author>            <Change Description>
27/04/2020     Shahad Naji  		Intial Version
29/04/2020      Shahad Naji         Change currency according to service values
------------------------------------------------------------*/    
    @AuraEnabled
    public static Map<String, Decimal> getTotalSum (String currentCurrency, List<String> curLst, List<WRAPPER_AccountList.AccountDetails> accountList, List<WRAPPER_AccountList.TipoDeCambio> tipoDeCambioList){
        Map<String, Decimal> balanceValues =  new Map<String, Decimal>();
        //Map<String,Decimal> exchangeRates = Global_Utilities.getExchangeRates(currentCurrency, curLst, 1);
        Map<String,Decimal> exchangeRates = getExchangeRates(currentCurrency,  1, tipoDeCambioList);
        System.debug('Exchange Rates: ' + exchangeRates);
        Decimal globalBookBalance = 0.0;
        Decimal globalAvailableBalance = 0.0;
        for(WRAPPER_AccountList.AccountDetails item : accountList){
            if(item.currencyCodeAvailableBalance != currentCurrency  && item.currencyCodeAvailableBalance != null ){
                if(exchangeRates.get(item.currencyCodeAvailableBalance) != 0 && exchangeRates.get(item.currencyCodeAvailableBalance) != null){
                    System.debug('Arguments: ' + item.amountMainBalance + ' - ' + exchangeRates.get(item.currencyCodeAvailableBalance));
                    if(item.amountMainBalance != 0 && item.amountMainBalance != null){
                        globalBookBalance += (item.amountMainBalance/ exchangeRates.get(item.currencyCodeAvailableBalance));
                    }
                    
                    if(item.amountAvailableBalance != 0 && item.amountAvailableBalance != null){
                        globalAvailableBalance += (item.amountAvailableBalance / exchangeRates.get(item.currencyCodeAvailableBalance));  
                    }
                    
                }
                
            }else{
                if( item.amountMainBalance != 0 &&  item.amountMainBalance != null){
                    globalBookBalance += item.amountMainBalance; 
                }else{
                    globalBookBalance += 0;
                }
                
                if(item.amountAvailableBalance != null && item.amountAvailableBalance != 0){
                    globalAvailableBalance += item.amountAvailableBalance;  
                }else{
                    globalAvailableBalance += 0; 
                }
                
            }
        }
        if(!balanceValues.containsKey('globalBookBalance')){            
            balanceValues.put('globalBookBalance',globalBookBalance.setScale(2));
        }
        if(!balanceValues.containsKey('globalAvailableBalance')){             
            balanceValues.put('globalAvailableBalance', globalAvailableBalance.setScale(2));
        }
        
        
        return balanceValues;
    }
    
    /*----------------------------------------------------------------------------------
Author:         Shahad Naji 
Company:        Deloitte
Description:    Gets the exchanges rates from a each of the currencies to the rest 
of them
History
<Date>			<Author>		     <Description>
28/04/2020		Shahad Naji        Initial version
----------------------------------------------------------------------------------*/
    @AuraEnabled (cacheable=true)
    public static Map<String,Decimal> getExchangeRates(String actualIsoCode,  Decimal value, List<WRAPPER_AccountList.TipoDeCambio> tiposDeCambio)
    {
        Map<String,Decimal> mapReturn = new Map<String,Decimal>();
        List<WRAPPER_AccountList.TipoDeCambio> cambioDivisas = tiposDeCambio;
        WRAPPER_AccountList.TipoDeCambio fromCode;
        Integer i = 0;
        Boolean found = false;
        while(i < cambioDivisas.size()  && !found){
            if(cambioDivisas.get(i).divisa ==  actualIsoCode){
                found = true;
                fromCode = cambioDivisas.get(i);
            }
            i++;
        }
        
        Decimal valueTemp;
        for(WRAPPER_AccountList.TipoDeCambio actualCurrency : cambioDivisas){
            valueTemp = 0.0;
            if(actualCurrency != null &&  fromCode != null)
            {
                if(actualCurrency.divisa != fromCode.divisa){
                    if(value != 0 && value != null){
                        valueTemp = value / fromCode.importeDecimal;
                        valueTemp = valueTemp * actualCurrency.importeDecimal; 
                    }
                    
                }
                else{
                    valueTemp = value;
                }
            }
            
            mapReturn.put(actualCurrency.divisa, valueTemp);
        }
        
        return mapReturn;
    }
    
    /*----------------------------------------------------------------------------------
Author:         Shahad Naji 
Company:        Deloitte
Description:    Sets user currency 
of them
History
<Date>			<Author>		     <Description>
04/05/2020		Shahad Naji        Initial version
----------------------------------------------------------------------------------*/
    @AuraEnabled 
    public static Boolean setUserCurrency(String currencyStr){
        Boolean isTrue = true;
        try{
            Id iUserId = UserInfo.getUserId();
            User iUser = [SELECT Id, DefaultCurrencyIsoCode, CurrencyIsoCode FROM User WHERE Id =: iUserId LIMIT 1];  
            iUser.CurrencyIsoCode = currencyStr;
            // iUser.DefaultCurrencyIsoCode = currencyStr;
            update iUser;
            
        }catch(Exception e ){ 
            isTrue = false;
            throw new AuraHandledException('The following exception has occurred: ' + e.getMessage());
        }
        return isTrue;
    }
    
    
    
    /*----------------------------------------------------------------------------------------------------------------------------------------
Author:         Guillermo Giral
Company:        Deloitte
Description:    Check whether any of the accounts can be displayed in the window
History
<Date>			<Author>		        <Description>
14/09/2020      Guillermo Giral             Initial Version 
-----------------------------------------------------------------------------------------------------------------------------------------*/
    private static Boolean canUserSeeGlobalPosition (WRAPPER_Balance_LU response){
        Boolean canSeeGlobalPosition = false;
        // Loop through every of the accounts to check if the user has permission to see any of the balances
        for(WRAPPER_Balance_LU.AccountsDataList cuenta : response.accountsList.accountsDataList)
        {
            System.debug('CUENTA: ' + cuenta);
            if(cuenta.balanceAllowed != null && cuenta.balanceAllowed == true){
                canSeeGlobalPosition = true;
                break;
            }
        }
        
        return canSeeGlobalPosition;
    }
    
    /*----------------------------------------------------------------------------------------------------------------------------------------
Author:         Guillermo Giral
Company:        Deloitte
Description:    Check whether any of the accounts can be displayed payments tracker
History
<Date>			<Author>		        <Description>
14/09/2020      Guillermo Giral             Initial Version
-----------------------------------------------------------------------------------------------------------------------------------------*/
    private static Boolean canUserSeePaymentsTracker (WRAPPER_Balance_LU response){
        Boolean canSeePaymentsTracker = false;
        // Loop through every of the accounts to check if the user has permission to see any of the balances
        for(WRAPPER_Balance_LU.AccountsDataList cuenta : response.accountsList.accountsDataList)
        {
            if(cuenta.internationalPaymentsAllowed != null && cuenta.internationalPaymentsAllowed == true){
                canSeePaymentsTracker = true;
                break;
            }
        }
        
        return canSeePaymentsTracker;
    }
    
    public static String returnRandomSpan () {
        String hashString = '1000' + String.valueOf(Datetime.now().formatGMT('yyyy-MM-dd HH:mm:ss.SSS'));
        Blob hash = Crypto.generateDigest('MD5', Blob.valueOf(hashString));
        String hexDigest = EncodingUtil.convertToHex(hash);
        return hexDigest.right(16);
    }
    
    public static String returnRandomSample (Integer probability) {
        Double d = math.random();
        String randomValue = String.valueOf(d);
        randomValue = randomValue.right(2);
        if (Integer.valueOf(randomValue) < probability) {
            return '0';
        } else {
            return '1';            
        }
    }
    
}