import { LightningElement, api, track } from 'lwc';
//Labels
import Loading from '@salesforce/label/c.Loading';
import DownloadBalance_DocumentDownload from '@salesforce/label/c.DownloadBalance_DocumentDownload';
import DownloadBalance_DocumentDownloadSubtitle from '@salesforce/label/c.DownloadBalance_DocumentDownloadSubtitle';
import DownloadBalance_FileDate from '@salesforce/label/c.DownloadBalance_FileDate';
import DownloadBalance_Online from '@salesforce/label/c.DownloadBalance_Online';
import Country from '@salesforce/label/c.Country';
import AllCountries from '@salesforce/label/c.AllCountries';
import Account from '@salesforce/label/c.Account';
import AllAccounts from '@salesforce/label/c.AllAccounts';
import DownloadBalance_FileFormat from '@salesforce/label/c.DownloadBalance_FileFormat';
import DownloadBalance_LastStatement from '@salesforce/label/c.DownloadBalance_LastStatement';
import Day from '@salesforce/label/c.Day';
import DownloadBalance_UniqueDate from '@salesforce/label/c.DownloadBalance_UniqueDate';
import DownloadBalance_BetweenDates from '@salesforce/label/c.DownloadBalance_BetweenDates';
import fromlabel from '@salesforce/label/c.from';
import to from '@salesforce/label/c.to';
import pdfStatement from '@salesforce/label/c.pdfStatement';
import DownloadBalance_TypeOfReport from '@salesforce/label/c.DownloadBalance_TypeOfReport';
import Downloads_fileForDay from '@salesforce/label/c.Downloads_fileForDay';
import clearAll from '@salesforce/label/c.clearAll';
import DownloadBalance_Download from '@salesforce/label/c.DownloadBalance_Download';
import DownloadBalance_EverydayGroupedFile from '@salesforce/label/c.DownloadBalance_EverydayGroupedFile';
import Downloads_NoAccountSelected from '@salesforce/label/c.Downloads_NoAccountSelected';
import pdfBalances from '@salesforce/label/c.pdfBalances';
import excelBalances from '@salesforce/label/c.excelBalances';
import excelTransaction from '@salesforce/label/c.excelTransaction';
import NoFileError from '@salesforce/label/c.NoFileError';
import SuccessfullyDownloadedFile from '@salesforce/label/c.SuccessfullyDownloadedFile';
import domain from '@salesforce/label/c.domain';
import domainCashNexus from '@salesforce/label/c.domainCashNexus';
import domainBackfront from '@salesforce/label/c.domainBackfront';
import FailedDownloadFile from '@salesforce/label/c.FailedDownloadFile';

//Import styles
//import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';
import santanderStyle from '@salesforce/resourceUrl/Santander_Icons';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
//Controlador
import removeFile from '@salesforce/apex/CNT_DownloadBalanceMovementsController.removeFile';
import getTransactions from '@salesforce/apex/CNT_DownloadBalanceMovementsController.getTransactions';
import getExtracts from '@salesforce/apex/CNT_DownloadBalanceMovementsController.getExtracts';
import getBalances from '@salesforce/apex/CNT_DownloadBalanceMovementsController.getBalances';
import downloadFich from '@salesforce/apex/CNT_DownloadBalanceMovementsController.downloadFich';

//Navegación
import { NavigationMixin } from 'lightning/navigation';
//user
import uId from '@salesforce/user/Id';
import consolidationExchangeRates from '@salesforce/label/c.consolidationExchangeRates';


export default class Lwc_downloadsNexus extends LightningElement {

    label = {
        Loading,
        DownloadBalance_DocumentDownload,
        DownloadBalance_DocumentDownloadSubtitle,
        DownloadBalance_FileDate,
        DownloadBalance_Online,
        Country,
        AllCountries,
        Account,
        AllAccounts,
        DownloadBalance_FileFormat,
        DownloadBalance_LastStatement,
        Day,
        DownloadBalance_UniqueDate,
        DownloadBalance_BetweenDates,
        fromlabel,
        to,
        pdfStatement,
        DownloadBalance_TypeOfReport,
        Downloads_fileForDay,
        DownloadBalance_EverydayGroupedFile,
        clearAll,
        DownloadBalance_Download,
        Downloads_NoAccountSelected,
        pdfBalances,
        excelBalances,
        excelTransaction,
        NoFileError,
        SuccessfullyDownloadedFile,
        domain,
        domainCashNexus,
        domainBackfront,
        FailedDownloadFile
    }

    //COMPONENT ATTRIBUTES
    @track dates = [];                                                     //description="List containing the selected dates"/>
    @track singleDate = [];                                                     //description="List containing the selected date"/>
    @track simple = true;                                                  //description="Flag to indicate whether the calendar is simple or compounded (From-To)"/>
    @track helpText = "dd/mm/yyyy";                                        //description="Calendar help text"/>
    @track placeholderSingle = "Select a date";                            //description="Date placeholder for single calendar"/>
    @track placeholderFrom = "From";                                       //description="Calendar 'From' placeholder"/>
    @track placeholderTo = "To";                                           //description="Calendar 'To' placeholder"/>
    @track extractType = "";                                               //description="Extract type"/>

    @track showClearAll =false;                                            //description="Indicates whether the clear all icon must be displayed"/>
    @track fileFormatList;                                                 //description = "Selected file format"/> <!-- SIC Contingencia / PDF - Extractos / MT940-->
    @track accounts;                                                       //description = "Selected file format"/>
    @track accountsListString;                                             //description="List of accounts as strings" />
    @track keepAccList;                                                    //description="List of accounts as strings" />
    @track accountCode;                                                    //description="List of account codes as strings" />
    @track selectedAccounts = [];                                          //description = "Selected file format"/>
    @track codeList;                                                       //description = "Account codes"/>
    @track accountCountryList;                                             //description = "Account countries"/>
    @track fileDate = 'lastStatement';                                     //description = "Selected file date"  
    @track isFileForDay = 'N';                                             //description = "Select report type"  
    @track corporateCodeList;                                              //description = "Corp codes"/>
    @track corporateNameList;                                              //description = "Corp names"/>
    @track fromCashNexus =true;

    @track show;
    @track message;
    @track type;

    //Spinner attributes
    @track loadingUserInfo = false;                                        //description="Flag to indicate whether the user info has completely loaded"/>

    //DROPDOWN ATTRIBUTES
    @track countries;                                                      //description="List of values to populate the dropdown"/>
    @api selectedcountries;                                               //description="Selected option from the dropdown"/>
    _selectedcountries;
    @track fileFormat = '';                                                //description="Selected option from the dropdown"/>
    @track helpTextDropdown = "Show More";                                 //description="Dropdown help text"/>
    doInitDone = false;
    @track issimpledropdownAux = true;
    @track issimpledropdownAuxFalse = false;
    
    get isSimpleFalse(){
        return false;
    }

    // get issimpledropdown(){
    //     return false;
    // }

    get radioOptions() {
        return [
            { label: 'Last available statement', value: 'lastStatement' },
            { label: 'Statement for', value: 'statementFor' },
            { label: 'All available statements between', value: 'betweenDates' },
        ];
    }
    get selectedcountries(){
        return this._selectedcountries;
    }

    set selectedcountries(selectedcountries){
        if(selectedcountries){
            this._selectedcountries = selectedcountries;
            this.selectedCountry();
        }
    }

    get getLoadingTitle(){
        return (this.label.Loading+ '...');
    }

    get isFileFormatnotSIC(){
        return (this.fileFormat != 'SIC Contingency');
    }

    get isfileDatestatementFor(){
        return (this.fileDate != 'statementFor');
    }

    get isfileDatelastStatement(){
        return (this.fileDate == 'lastStatement');
    }

    get isFileDataPdf(){
        return (this.fileFormat == this.label.pdfStatement);
    }

    get isfileDatestatementBetween(){
        return (this.fileDate == 'statementBetween');
    }

    get datesto(){
        return this.dates[1];
    }
    get datesfrom(){
        return this.dates[0];
    }

    connectedCallback() {
        //this.loadingUserInfo = true;
    }

    renderedCallback() {
        if (!this.doInitDone){
            loadStyle(this, santanderStyle + '/style.css');
            console.log('Inicio downloads Nexus');
            this.doInit();
            // this.template.querySelectorAll('c-lwc_cn_dropdown').forEach(element => {
            //     element.doInit();
            // });
        }
        this.template.querySelectorAll('c-lwc_cn_dropdown').forEach(element => {
            element.doInit();
        });
        
    }

    doInit() {
        var userId = uId;
        console.log('doInit');
        console.log(userId);

        
        if(window.localStorage.getItem(userId + '_balanceEODGP') != undefined) {
            //component.find("service").retrieveFromCache(component, helper,"balanceEODGP", helper.populateComponentData);
            console.log('windows');
            this.template.querySelector("c-lwc_service-component").retrieveFromCache(
                     {key: 'balanceEODGP', callercomponent:"retrieveFromCache"});
        } else {
            this.getComponentData();
        }
        
        this.fileFormat = this.label.pdfBalances;
        this.fileFormatList = ['MT940', 'XML', 'N43', 'BAI2', this.label.pdfBalances, this.label.pdfStatement, this.label.excelBalances, this.label.excelTransaction/*, 'SIC Contingency'*/];
        console.log('fileFormat '+this.fileFormat);
        console.log('fileFormatList '+this.fileFormatList);
        this.doInitDone = true;
        
    }

    handlerSuccessCallback(event){
        console.log('******handlerSuccessCallback');
        console.log(event.detail.callercomponent);
        console.log(event.detail.value);
        if (event.detail.callercomponent == 'retrieveFromCache'){
            this.populateComponentData (event.detail.value);
        } else if (event.detail.callercomponent == 'retrieveInitialDataDow') {
            this.populateComponentData (event.detail.value);
        } 
      
        //else if (event.detail.callercomponent == 'saveToCache'){
        //     if(typeof event.detail.value == 'string')
        //     {
        //         //setData = JSON.parse(response).responseAcc;
        //         //setData = JSON.parse(event.detail.value).responseAcc;
        //     }
        //     else if(typeof event.detail.value == 'object')
        //     {
        //         //setData = response.responseAcc;
        //         //setData = event.detail.value.responseAcc;
        //     }
        // } else if (event.detail.callercomponent == 'saveToCache2'){
        //     //setData = response.responseAcc;
        //     //setData = event.detail.value;
        // }
    }

    getComponentData () {
        var userId = uId;
		this.loadingUserInfo = true;
		//component.find("service").callApex2(component, helper, "c.retrieveInitialData", {userId: $A.get( "$SObjectType.CurrentUser.Id" )}, helper.populateComponentData);
        console.log('******Component Data');
        this.template.querySelector("c-lwc_service-component").onCallApex(
            {controllermethod: "retrieveInitialDataDow",
            actionparameters: {userId: userId},
            callercomponent: "retrieveInitialDataDow"}
        );
	}

    populateComponentData (res){
        var response = res;
        var response_Aux;
        var userId = uId;
        console.log('populateComponentData');
        console.log('2');
		this.loadingUserInfo = true;
        console.log('3');
		var setData = [];
        console.log('4');
        // console.log(window.localStorage.getItem(userId + '_balanceEODGP'));
        // console.log(response);
		if(window.localStorage.getItem(userId + '_balanceEODGP') != undefined && response != undefined)
        {
            console.log('dentro window1');
            console.log('response=>'+response);
            console.log('===>'+JSON.stringify(response));
            if (typeof response == 'string') {
                response_Aux = response;
                setData = JSON.parse(response).responseAcc;
            }
            else if(typeof response == 'object'){
                response_Aux = JSON.stringify(response);
                setData = response.responseAcc;
            } 

            console.log('tipo: '+typeof response);
            console.log(setData);
            //component.find("service").saveToCache('balanceEODGP', response);
            this.template.querySelector("c-lwc_service-component").saveToCache(
                {key: 'balanceEODGP', data: response_Aux});
                //{key: 'balanceEODGP', data: response});

            // if(typeof response == 'string')
            // {
            //     setData = JSON.parse(response).responseAcc;
                
            // }
            // else if(typeof response == 'object')
            // {
            //     setData = response.responseAcc;
            // }
        } 
        else if (window.localStorage.getItem(userId + '_balanceEODGP') != undefined && response == undefined )
        {
            console.log('dentro window2');
            //component.find("service").callApex2(component, helper, "c.retrieveInitialData", {userId: $A.get( "$SObjectType.CurrentUser.Id" )}, helper.populateComponentData);
            this.template.querySelector("c-lwc_service-component").onCallApex(
                {controllermethod: "retrieveInitialDataDow",
                actionparameters: {userId: userId},
                callercomponent: "retrieveInitialDataDow"}
                );
        } 
        else
        {
            console.log('dentro window3');
            console.log('response =>'+response);    
            console.log('strinfyrespoonse===>'+JSON.stringify(response));
            // component.find("service").saveToCache('balanceEODGP', response);
            //setData = response.responseAcc;
            if (typeof response == 'string') {
                response_Aux = response;
                setData = JSON.parse(response).responseAcc;
            }
            else if(typeof response == 'object'){
                response_Aux = JSON.stringify(response);
                setData = response.responseAcc;
            } 

            this.template.querySelector("c-lwc_service-component").saveToCache(
                {key: 'balanceEODGP', 
                //data: JSON.stringify(response)});
                data: response_Aux});
        }
        console.log('5');

        if (setData) {
		var myMap = [];
		var countryMap = [];
		var corporateCode = [];
		var corporateName = [];

		for(var i = 0; i < setData.accountList.length; i++) {
			var acc = setData.accountList[i].displayNumber.trim();
			myMap.push([acc, setData.accountList[i].codigoCuenta]);
		}
		this.codeList = myMap;

		for(var i = 0; i < setData.accountList.length; i++) {
            var acc = setData.accountList[i].displayNumber.trim();
			countryMap.push([acc, setData.accountList[i].country]);
		}
		this.accountCountryList = countryMap;
		
		for(var i = 0; i < setData.accountList.length; i++) {
			var acc = setData.accountList[i].displayNumber.trim();
			corporateCode.push([acc, setData.accountList[i].codigoCorporate]);
		}
		this.corporateCodeList = corporateCode;

		for(var i = 0; i < setData.accountList.length; i++) {
			var acc = setData.accountList[i].displayNumber.trim();
			corporateName.push([acc, setData.accountList[i].subsidiaryName]);
		}
		this.corporateNameList = corporateName;

		var accounts = setData.accountList.map((item) => {
            item['displayNumber'] = item['displayNumber'].trim();
            return item['displayNumber'];
		});

		this.accountsListString = accounts;
		this.accounts = setData.accountList;
		this.countries = setData.countryList;
		//this.loadingUserInfo = false;
		this.keepAccList = accounts;
        console.log('this.accountCountryList=  '+this.accountCountryList);
        console.log('this.accounts=  '+this.accounts);
        console.log('this.countries=  '+this.countries);
        console.log('this.ListString=  '+this.accountsListString);
        }
        this.loadingUserInfo = false;
	}

    selectedCountry (){

        var selectedCountry = this._selectedcountries;
        console.log(selectedCountry);
        var accountCountryList = this.accountCountryList;
        console.log(accountCountryList);
        var selectedAccounts = this.selectedAccounts;
        console.log(selectedAccounts);
        var newSelected = [];
        var auxList = [];
        
        for(var i = 0; i < selectedCountry.length; i++) {
            for(var j = 0; j < accountCountryList.length; j++){
                if (selectedCountry[i] == accountCountryList[j][1]){
                    auxList.push(accountCountryList[j][0]);				
                }
            }
        }
        
        for(var i = 0; i < selectedAccounts.length; i++) {
            for (var j = 0; j < auxList.length; j++) {
                if(selectedAccounts[i] == auxList[j]) {
                    newSelected.push(selectedAccounts[i]);
                }
            }
        }
        
        this.accountsListString = auxList;
        this.selectedAccounts = newSelected;

        console.log('****this.accountsListString===>'+this.accountsListString);
        console.log('****this.selectedAccounts===>'+this.selectedAccounts);
        
        setTimeout(()=>{
            //component.getEvent("accountChange").fire();
            // const accountchange = new CustomEvent('handlerAccountSelection');
            // this.dispatchEvent(accountchange);
            this.updateAccountSelection();
        }, 3000);
    }

    getFileDate (event){
        
        var fileDate = event.target.value;

        console.log('fileDate: '+fileDate);
        
        if(fileDate == "lastStatement"){
            this.fileDate = "lastStatement";
            this.dates = [];
            this.singleDate = [];
        }

        if(fileDate == "statementFor"){
            this.fileDate = "statementFor";
            this.dates = [];
        } 

        if(fileDate == "betweenDates"){
            this.fileDate = 'statementBetween';
            this.singleDate = [];
        } 

        console.log('this '+this.fileDate);

    }

    getReportType (event){
        
        
        var reportType = event.target.value;
        console.log('****getReportType');
        console.log(this.isFileForDay);
        console.log('reportType '+reportType);
        if(reportType == "fileForDay"){
            this.isFileForDay = "N";
        } else {
            this.isFileForDay = "S";
        }
        console.log('this.isFileForDay '+this.isFileForDay);
    }

    cleanData (){
       
        var countries = this._selectedcountries;
        
        // Set empty values for all the attributes
        this.dates = [];
        this.singleDate = [];
        this.fileFormat= this.label.pdfBalances;
        
        if(this.template.querySelector('c-lwc_cn_calendar')){
            this.template.querySelector('c-lwc_cn_calendar').clearData();
        }

        // var dropdownAccnts = this.template.querySelector('[data-id="dropdownAccounts"]');
        // dropdownAccnts = Array.isArray(dropdownAccnts) ? dropdownAccnts[0].updateSelection(this.selectedAccounts) : dropdownAccnts.updateSelection(this.selectedAccounts);
        this.template.querySelector('[data-id="dropdownAccounts"]').clearData();
        //var dropdownCountry = component.find("dropdownCountries");
        // var dropdownCountry = this.template.querySelector('[data-id="dropdownCountries"]');
        // dropdownCountry = Array.isArray(dropdownCountry) ? dropdownCountry[0].updateSelection(this._selectedcountries) : dropdownCountry.updateSelection(this._selectedcountries);
        this.template.querySelector('[data-id="dropdownCountries"]').clearData();
        //component.set("v.accountsListString", component.get("v.keepAccList"));
        this.accountsListString = this.keepAccList;
        
    }

    download (){
        
        if(this.selectedAccounts == undefined || this.selectedAccounts.length == 0) {
            // component.set("v.show", true);
            // component.set("v.message", $A.get("$Label.c.Downloads_NoAccountSelected"));
            // component.set("v.type", "error");
            this.show = true;
            this.message = this.label.Downloads_NoAccountSelected;
            this.type = 'error';
        }
        else
        {
            // helper.setExtractType(component, event, helper);
            // helper.downloadFiles(component, event, helper);
            this.setExtractType();
            this.downloadFiles();
        }
    }

    updateAccountSelection (){
        var selectedList = this.selectedAccounts;
        var accList = this.accountsListString;
        
        if (selectedList != 0) {
            for(var i = 0; i < accList.length; i++) {
                for (var j = 0; j < selectedList.length; j++) {
                    if(accList[i] == selectedList[j]) {
                        //component.find("dropdownAccounts").keepSelection(accList[i]);
                        this.template.querySelector('[data-id="dropdownAccounts"]').keepSelection(accList[i]);
                    }
                }
            }
        }
        
        var selectedCountry = this._selectedcountries;
        if(selectedCountry.length == 0) {
            //component.set("v.accountsListString", component.get("v.keepAccList"));
            this.accountsListString = this.keepAccList;
        }
    }

    setExtractType () {
		
		var fileFormat = this.fileFormat;
		
		if(fileFormat == 'MT940') {
			this.extractType = '01';
		}
		if(fileFormat == 'FINSTA') {
			this.extractType = '02';
		}
		if(fileFormat == 'BAI2') {
			this.extractType = '03';
		}
		if(fileFormat == 'N43') {
			this.extractType = '04';
		}
		if(fileFormat == 'XML') {
			this.extractType = '05';
		}
		if(fileFormat == 'MT942') {
			this.extractType = '06';
		}
		if(fileFormat == 'CAMT0052') {
			this.extractType = '07';
		}
		if(fileFormat == 'MT941') {
			this.extractType = '08';
		}
		if(fileFormat == 'MT950') {
			this.extractType = '15';
		}
		if(fileFormat == 'SIC Contingency') {
			this.extractType = '99';
		}
	}

    downloadFiles (){
		
		var fileFormat = this.fileFormat;
		var codeList = this.codeList;
		var filePerDay = this.isFileForDay;
		var auxList = [];
		var selectedAccounts = this.selectedAccounts;
        var dates = [];
        if(this.template.querySelector('c-lwc_cn_calendar')){
            dates = this.template.querySelector('c-lwc_cn_calendar').dates;
        }
		// var dates = this.dates;
		var singleDate = this.singleDate;
		var extractType = this.extractType;
		var balanceFileFormat = '';
		var corpCodeList = this.corporateCodeList;
		var corpCode = [];
		var corpNameList = this.corporateNameList;
		var corpName = [];
		var accList = [];

		//Recoger el file type en caso de balances
		if (fileFormat == this.label.pdfBalances) {
			balanceFileFormat = 'pdf';
		}
		if (fileFormat == this.label.excelBalances) {
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
		
		// if(dates.length != 0) {	
        if(dates.length > 1) {	
			paramsPost = {
				"accounts" : accList,
				"fileDate" : this.fileDate,
				"dateFrom" : (dates[0] == "") ? undefined : dates[0],
				"dateTo" : (dates[1] == "") ? undefined : dates[1],
				"extractType" : extractType,
			};
		} else {
			paramsPost = {
				"accounts" : accList,
				"fileDate" : this.fileDate,
				"dateFrom" : (dates[0] == "") ? undefined : dates[0],
				"dateTo" : (dates[0] == "") ? undefined : dates[0],
				"extractType" : extractType,
			};
		}        

		var params = {};

		//(if(dates.length != 0) {
        if(dates.length > 1) {	
			params = {
				"fileDate" : this.fileDate,
				"accountCodeList" : auxList,
				"dateFrom" : (dates[0] == "") ? undefined : dates[0],
				"dateTo" : (dates[1] == "") ? undefined : dates[1],
				"fileType" : balanceFileFormat,
				"indGroup" : filePerDay
			};
		} else {
			params = {
				"fileDate" : this.fileDate,
				"accountCodeList" : auxList,
				"dateFrom" : (dates[0] == "") ? undefined : dates[0],
				"dateTo" : (dates[0] == "") ? undefined : dates[0],
				"fileType" : balanceFileFormat,
			};
		}

		if(fileFormat != this.label.excelTransaction && fileFormat != this.label.pdfStatement  && fileFormat != this.label.pdfBalances && fileFormat != this.label.excelBalances) {
			params = paramsPost;
		}

		this.downloadFileformat(params, fileFormat);
	}

    downloadFileformat (params, fileFormat){
        //First retrieve the doc and the remove it
        try{            
            // this.retrieveFiles(component, helper, params, fileFormat).then(function(results){
            this.retrieveFiles(params, fileFormat).then((results)=>{
                if(results!=null && results!='' && results!=undefined){
					if(results == '204') {
						this.show = true;
						this.message = this.label.NoFileError;
						this.type = "error";
					} else {
						this.show  = true;
						this.message = this.label.SuccessfullyDownloadedFile;
						this.type = "success";

						var domain=this.label.domain;
						
						if(this.fromCashNexus== true){
							domain=this.label.domainCashNexus;
						}
						
						if(this.backfront == true){
							domain=this.label.domainBackfront;
						}

						window.location.href = domain+'/sfc/servlet.shepherd/document/download/'+results+'?operationContext=S1';
						
						this.removeFile(results);
					}
					
                } else {
					this.show = true;
					this.message = this.label.FailedDownloadFile;
					this.type = "error";
				}
            });

        } catch (e) {
            console.log(e);
        }
    }

    removeFile(ID){

        try{
            var action = component.get("c.removeFile");
            //Send the payment ID
            removeFile({
                id:ID
            })
            .them(result => {
                console.log('OK');
            })
            .catch(error => {
                var errors = error;
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                    } else {
                        console.log("Unknown error");
                    }
                }
            });
        } catch (e) {
            console.log(e);
        }
    }

	retrieveFiles (params, fileFormat){
		
		try{
			var action = '';

		 	if (fileFormat == this.label.excelTransaction){
		 	    //action = component.get("c.getTransactions");
		 	    action = 'getTransactions';
		 	} else if (fileFormat == this.label.pdfStatement) {
		 		// action = component.get("c.getExtracts");
		 		action = 'getExtracts';
		 	} else if (fileFormat == this.label.pdfBalances || fileFormat == this.label.excelBalances){
		 		// action = component.get("c.getBalances");
		 		action = 'getBalances';
		 	} else {
		 		// action = component.get("c.downloadFich");
		 		action = 'downloadFich';
		 	}

            if (action === 'getTransactions') {
                return new Promise((resolve, reject) => {
                    getTransactions(params)
                    .then(result => {
                        console.log('OK');
                        resolve(result);
                    })
                    .catch(error => {
                        console.log('KO '+error);
                        var errors = error;
                        if (errors) {
                            if (errors[0] && errors[0].message) {
                                console.log("Error message: " + 
                                            errors[0].message);
                                reject(errors);
                            }
                        } else {
                            console.log("Unknown error");
                        }
                    });
                });
            }
            else if (action === 'getExtracts') {
                return new Promise((resolve, reject) => {
                    getExtracts(params)
                    .then(result => {
                        console.log('OK');
                        resolve(result);
                    })
                    .catch(error => {
                        console.log('KO '+error);
                        var errors = error;
                        if (errors) {
                            if (errors[0] && errors[0].message) {
                                console.log("Error message: " + 
                                        errors[0].message);
                                reject(errors);
                            }
                        } else {
                            console.log("Unknown error");
                        }
                    });
                });
            }
            else if (action === 'getBalances') {
                return new Promise((resolve, reject) => {
                    getBalances(params)
                    .then(result => {
                       console.log('OK');
                        resolve(result);
                    })
                    .catch(error => {
                        console.log('KO '+error);
                        var errors = error;
                        if (errors) {
                            if (errors[0] && errors[0].message) {
                                console.log("Error message: " + 
                                            errors[0].message);
                                reject(errors);
                            }
                        } else {
                            console.log("Unknown error");
                        }
                    });
                });
            }
            else if (action === 'downloadFich') {
                return new Promise((resolve, reject) => {
                    downloadFich(params)
                    .then(result => {
                        console.log('OK');
                        resolve(result);
                    })
                    .catch(error => {
                        console.log('KO '+error);
                        var errors = error;
                        if (errors) {
                            if (errors[0] && errors[0].message) {
                                console.log("Error message: " + 
                                            errors[0].message);
                                reject(errors);
                            }
                        } else {
                            console.log("Unknown error");
                        }
                    });
                });
            }
        } catch (e) {
            console.log(e);
        }
    }
    
    setFileFormat (evt){
        this.fileFormat = evt.detail[0];
    }

    handlerAccountSelection (evt){
        this.selectedAccounts = evt.detail;
        this.updateAccountSelection();
    }

    handlerSelectedCountry (evt){
        this._selectedcountries = evt.detail;
        this.selectedCountry();
    };

    changedatefromhandler(event) {
        try {
            //this.dateFrom = new Date(event.detail).toISOString().split('T')[0];
            //console.log('changedatefromhandler executed: '+event.detail);
            dates[0] = new Date(event.detail).toISOString().split('T')[0];
        } catch(e) {
            this.dates[0] = '';
        }
    }

    changedatetohandler(event) {
        try {
            //this._dateTo = new Date(event.detail).toISOString().split('T')[0];
            //console.log('changedatefromhandler executed: '+event.detail);
            this.dates[1] = new Date(event.detail).toISOString().split('T')[0];;
        } catch(e) {
            //this._dateTo = '';
            this.dates[1] = '';
        }
    }
}