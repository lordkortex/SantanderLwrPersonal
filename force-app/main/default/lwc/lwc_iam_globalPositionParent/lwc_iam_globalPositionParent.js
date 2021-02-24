import {loadStyle, loadScript } from 'lightning/platformResourceLoader';
import ERROR from '@salesforce/label/c.ERROR';
import ERROR_NO_ACCESS_GP from '@salesforce/label/c.ERROR_NO_ACCESS_GP';
import Loading from '@salesforce/label/c.Loading';
import Country from '@salesforce/label/c.Country';
import Corporate from '@salesforce/label/c.Corporate';
import GlobalPositionTItle from '@salesforce/label/c.GlobalPositionTItle';
import ERROR_NOT_RETRIEVED from '@salesforce/label/c.ERROR_NOT_RETRIEVED';
import refreshBalanceCollout from '@salesforce/label/c.refreshBalanceCollout';
import uId from '@salesforce/user/Id';
import currencyCode from '@salesforce/i18n/currency'
import isOneTrade from '@salesforce/apex/CNT_GlobalPositionController.isOneTrade';
import retrieveIAMData from '@salesforce/apex/CNT_GlobalPositionController.retrieveIAMData';
import getIsCashNexus from '@salesforce/apex/CNT_GlobalPositionController.getIsCashNexus';
import encryptData from '@salesforce/apex/CNT_GlobalPositionController.encryptData';
import decryptData from '@salesforce/apex/CNT_GlobalPositionController.decryptData';

import santanderStyle from '@salesforce/resourceUrl/Santander_Icons';
import {LightningElement, track, api } from 'lwc';
export default class Lwc_iam_globalPositionParent extends LightningElement {

    label = {
        ERROR,
        ERROR_NO_ACCESS_GP,
        Country,
        Loading,
        Corporate,
        GlobalPositionTItle,
        ERROR_NOT_RETRIEVED,
        refreshBalanceCollout
    };

    @track UserInfo;
    @track title;
    @track selectedgrouping = this.label.Country;
    @track loadingData = false;
    @track loadingUserInfo = false;
    @track firstTimeLoading = false;
    @track currencylist;
    @track currenciesexchange;
    @track selectedcurrency;
    @track mainCurrency;
    @track mainCurrencyUser;
    @track lastinfodate;
    @track lastinfohour;
    @track totalbookbalance;
    @track totalBookBalanceMapped;
    @track avaiblebookbalance;
    @track availableBookBalanceMapped;
    @track countrygroupresponse;
    @track corporateGroupResponse;
    @track exchangeratestoshow;
    @track exchangerates;
    @track erateslastmodifieddate;
    @track erateslastmodifieddatemain;
    @track headerlastmodifieddate;
    @track userpreferreddateformat;
    @track userpreferrednumberformat;
    @track dataisloaded = false;
    @track country;
    @track isCashNexus = false;
    @track agreedTerms = false;
    @track isBIC = false;
    @track isPL = false;
    @track isOther = false;
    @track showterms =false;
    @track isIE = false;
    @track showtoast = false;
    @track msgtoast;
    @track typetoast;
    @track tobehiddentoast;
    @track showNoAccessError = false;
    @track userId;
    @track firstTime = false;

    

    get showTermsisFalse(){
        return this.showterms == false;
    }

    get loadDataUserInfo(){
        return (this.loadingData || this.loadingUserInfo);
    }

    get groupResponseIsEmpty(){
        return (this.countrygroupresponse == "" && this.corporateGroupResponse == "" );
    }

    get countryIsSelectedGrouping(){
        return (this.label.Country == this.selectedgrouping && this.dataisloaded)
    }

    get selectedGroupingIsCorporate(){
        return (this.selectedgrouping == this.label.Corporate && this.dataisloaded)
    }

    get countryNotNull(){
        return (this.country != undefined && this.country != null && this.country == 'PL');
    }

    get spinnerText(){
        return (this.label.Loading + '...');
    }

    renderedCallback(){
        if(!this.firstTime){
            loadStyle(this, santanderStyle + '/style.css');
            this.loading = true;
            this.userId = uId;
            this.template.querySelector("c-lwc_service-component").onCallApex({callercomponent:'isOneTrade', controllermethod:'isOneTrade', actionparameters:{userId:this.userId}});
            this.firstTime = true;
        }
    }

    updateCurrencies(event){
        var newValue = event.getParam('value');
        var oldValue = event.getParam('oldValue');
        if((newValue != oldValue && oldValue != undefined && oldValue != "") || oldValue == undefined){
            this.updateCurrenciesHelper(this.selectedcurrency);
        }
    }

    updateCurrenciesHelper(){
        if(this.mainCurrency != undefined){
            var selectedCurrency = this.selectedcurrency;
            this.avaiblebookbalance = this.availableBookBalanceMapped[this.selectedcurrency];
            this.totalbookbalance = this.totalBookBalanceMapped[this.selectedcurrency];
            
            var elementList = [];
            this.countrygroupresponse.forEach((element) => {
                element.availableBalance = element.avaibleBalanceMapped[this.selectedcurrency];
                element.totalBalance = element.bookBalanceMapped[this.selectedcurrency];
                elementList.push(element);
            });

            this.countrygroupresponse = elementList;
            elementList = [];
            this.corporateGroupResponse.forEach((element) => {
                element.availableBalance = element.avaibleBalanceMapped[this.selectedcurrency];
                element.totalBalance = element.bookBalanceMapped[this.selectedcurrency];
                elementList.push(element);
            });
            this.corporateGroupResponse = elementList;
            this.exchangeratestoshow = this.exchangerates[this.selectedcurrency];
        }
    }

    successcallback(event){						 
        if(event.detail.callercomponent === 'lwc_iam_globalPositionParent'){
            console.log('Event details: ' + event.detail);
            this.handleInitialData(event.detail, false);
        }

        if(event.detail.callercomponent === 'isOneTrade'){
            console.log('Event details: ' + event.detail);
            console.log('Success Callback');
            this.isOneTrade();
        }
    }

    updateUserCurrency(){
        try{
            if(this.selectedcurrency != undefined){
                setUserCurrency().then(res => {
                    var res = response.getReturnValue(); 
                    this.updateCurrencies();    
                }).catch(error => {
                    if (error) {
                        console.log("Error message: " + error);
                    } else {
                        console.log("Unknown error");
                    }
                });
            }
        } catch(e){
            console.log("CMP_GlobalPosition / updateCurrencies : " + e);
        }
    }

    notifyLoadingError(){
        var msg = this.label.ERROR_NOT_RETRIEVED
        this.showtoast = true;
        this.msgtoast = msg;
        this.typetoast = error;
        this.tobehiddentoast = false;
    }

    getIsCashNexus(){
        try{
            getIsCashNexus().then(response => {
                var iReturn = response;
                    for (var key in iReturn ) {
                        if(key == "agreedTerms"){
                            this.agreedTerms = iReturn[key];
                        }
                        if(key == "isCashNexusUser"){
                            this.isCashNexus = iReturn[key];
                        }
                        if(key == "BIC"){
                            this.isBIC = iReturn[key];
                        }
                        if(key == "ES"){
                            this.isES = iReturn[key];
                        }
                        if(key == "PL"){
                            this.isPL= iReturn[key];
                        }
                        if(key == "GB"){
                            this.isGB= iReturn[key];
                        }
                        if(key == "Other"){
                            this.isOther= iReturn[key];
                        }
                    }
                    var gb = this.isGB;
                    var es = this.isES;
                    var pl = this.isPL;
                    var other = this.isOther;
                    
                    if(gb == true) {
                        this.country= "GB";
                    } else if(es == true) {
                        this.country= "ES";
                    } else if(other == true) {
                        this.country= "Other";
                    }else if(pl == true) {
                        this.country= "PL";
                    }
                    
                    var nexus = this.isCashNexus;
                    var terms = this.agreedTerms;
                    var bic = this.isBIC;
                    
                    if(nexus == true && terms == false){
                        this.showterms= true;
                    } 
                    if(nexus == false && bic == true && terms == false && pl == true) {
                        this.showterms= true;
                    }
            }).catch(error => {
                if (error) {
                    console.log("Error message: " + error);
                } else {
                    console.log("Unknown error");
                }
            });
        }catch(e){
            console.log("CMP_GlobalPosition / updateCurrencies : " + e);
        }
    }

    decryptInitialData(data){
        console.log('Entra decrypt');
        try {
            var result = '';
            return new Promise(function (resolve, reject) {
            decryptData({str : data })
            .then(res => {
                if(res!='null' && res!=undefined && res!=null){
                    result = res;
                    result = JSON.parse(result); 
                   // console.log('result de decrypt: ' + result.responseGP);
                    if(result.responseGP != undefined && result.responseGP != null){
                        result = result.responseGP;
                    }  
                    console.log('result de decrypt: ' + JSON.stringify(result));
                    this.handleInitialData(result, true)
                    resolve(result);
                }else { 
                    this.userId = uId;
                    this.template.querySelector("c-lwc_service-component").onCallApex({callercomponent:'lwc_iam_globalPositionParent',controllermethod:'retrieveIAMData',actionparameters:{isEndOfDay: false, globalId: this.userId}});
                }
            })
            .catch(error => {
                console.log('### lwc_iam_globalPositionParent ### decrypt() ::: Try Error: ' + error);
                this.template.querySelector("c-lwc_service-component").onCallApex({callercomponent:'lwc_iam_globalPositionParent',controllermethod:'retrieveIAMData',actionparameters:{isEndOfDay: false, globalId: this.userId}});
                reject(result);
            });
        }.bind(this));
        }catch(e) {
            console.error('### lwc_iam_globalPositionParent ### decrypt() ::: Catch Error: ' + e);
        }
    }

    isOneTrade(){
        try{
            // If the user is NOT One Trade, then it IS tracker
            this.userId = uId;
            var hasGlobalPositionAccess = window.localStorage.getItem(this.userId + "_hasGlobalPositionAccess") != false && window.localStorage.getItem(this.userId + "_hasGlobalPositionAccess") != false ? true: false;
            console.log('hasGlobalPositionAccess ' + hasGlobalPositionAccess);
           if(hasGlobalPositionAccess){
                this.getIsCashNexus();
                console.log('Sale de getIsCashNexus');
                this.handleDoInit();
        	} else {
                this.showNoAccessError = true;
        	}
        }catch(e){
            console.log(e);
        }   
    }

    handleDoInit() {
        this.loadingUserInfo = true;
        this.loadingData = true;
        this.userId = uId;
        var storageBalance = window.localStorage.getItem(this.userId + '_' + 'balanceGP');
        var balanceTimestampGP = window.localStorage.getItem(this.userId + '_' + 'balanceTimestampGP');
        var sessionCheck = window.sessionStorage.getItem(this.userId + '_' + 'loadingScreenCheck');
        console.log('sessionCheck: ' + sessionCheck);
        console.log('balanceTimestampGP: ' + balanceTimestampGP);
        //console.log('storageBalance ' + storageBalance);
        //Check if we have the variable on the session cache, to show or not the first time welcome loading.
        //if(storageBalance != undefined || storageBalanceEOD != undefined){
        if(sessionCheck != undefined && sessionCheck != null){
            this.firstTimeLoading = false;
        }else{
            this.firstTimeLoading = true;
            window.sessionStorage.setItem(this.userId + '_' + 'loadingScreenCheck', true);
        }
        //Check if its LU or EOD, if we have cache of them we decrypt it and if not we call the service.
        if(storageBalance != 'null' && storageBalance != undefined && balanceTimestampGP != 'null' && balanceTimestampGP != undefined && (new Date() - new Date(Date.parse(balanceTimestampGP))) < parseInt(this.label.refreshBalanceCollout)*60000 ){
            this.decryptInitialData(storageBalance);
        }else{
            this.template.querySelector("c-lwc_service-component").onCallApex({callercomponent:'lwc_iam_globalPositionParent',controllermethod:'retrieveIAMData',actionparameters:{globalId: this.userId}});
        }
    }

    encryptInitialData(data){
        try{
            var result="null";
            return new Promise(function (resolve, reject) {
                encryptData({str : JSON.stringify(data.value)})
                .then((value) => {
                    result = value;
                    if(result!='null' && result!=undefined && result!=null){
                        window.localStorage.setItem( this.userId + '_' + 'balanceGP', result);
                        window.localStorage.setItem( this.userId + '_' + 'balanceTimestampGP', new Date());
                    }
                    resolve(result);
                 })
                 .catch((error) => {
                    console.log(error); // TestError
                    reject(error);
                 })
            }.bind(this));
        } catch (e) { 
            console.log(e);
        }   
    }

    setData(response) {   
        console.log('Entra setData: ' + response);
        var UserInfo = {};
        UserInfo.firstName = response;
        var label = this.label.GlobalPositionTItle.replace('{}', response);
        this.UserInfo = UserInfo;
        this.title = label;
        this.loadingUserInfo = false;
    }    

    handleInitialData(response, decrypt) {
        console.log('Entra handleIntialData: ' + response.value.userFirstName);
        this.loadingData = true;
        var emptyList = [];
        var emptyMap = {};
        var emptyString = "";
        this.userId = uId;
        this.avaiblebookbalance = emptyString;
        this.totalbookbalance = emptyString;
        this.currencylist = emptyList;
        this.mainCurrency = emptyString;
        this.currenciesexchange = [];
        this.totalBookBalanceMapped = emptyMap;
        this.availableBookBalanceMapped = emptyMap;
        this.exchangerates = emptyMap;
        this.erateslastmodifieddate = emptyString;
        this.exchangeratestoshow = emptyList;
        this.countrygroupresponse = [];
        this.corporateGroupResponse = [];
        this.lastinfodate = "";
        this.lastinfohour = "";
        this.setData(response.value.userFirstName);

        if(response != null){
            if(decrypt!=true){
                this.encryptInitialData(response);
            }

            //AM - 28/10/2020 - FIX INC726
            var userCurrency = window.localStorage.getItem( this.userId + "_actualCurrencyChange");
            if(userCurrency == undefined || userCurrency == null){
                //userCurrency =  $A.get("$Locale.currencyCode");
                userCurrency =  currencyCode;
            }
            
            if(response.value.currenciesList.length > 0){
                if(!response.value.currenciesList.includes(userCurrency)){                   
                    var userCurrency = 'EUR';
                }
            }

            // Set Payments Tracker visibility in the cache
            window.localStorage.setItem(this.userId + "_hasPaymentsTrackerAccess",  response.value.canUserSeePaymentsTracker);
            window.localStorage.setItem(this.userId + "_hasGlobalPositionAccess",  response.value.canUserSeeGP);

            // Set the this.tes if the user has access to Global Position
            if(response.value.canUserSeeGP){
                this.avaiblebookbalance = response.value.avaibleBookBalance;
                this.totalbookbalance = response.value.totalBookBalance;
                // this.countryGroupResponse", response.accountsByCountry);
                // this.corporateGroupResponse", response.accountsByCorporate);
                this.currencylist = response.value.currenciesList;
                // this.selectedCurrency", response.divisaPrincipalUsuario);
                this.selectedcurrency = userCurrency;
                this.maincurrency = response.value.divisaPrincipal;
                //this.mainCurrencyUser", response.divisaPrincipalUsuario);
                this.mainCurrencyUser = userCurrency;
                this.currenciesexchange = response.value.cambioDivisas;
                this.totalBookBalanceMapped = response.value.bookBalanceMapped;
                this.availableBookBalanceMapped = response.value.avaibleBookBalanceMapped;
                this.exchangerates = response.value.tiposDeCambio;
                this.erateslastmodifieddate = response.value.eRatesLastModifiedDate;
                this.erateslastmodifieddatemain = response.value.eRatesLastModifiedDateMain;
                this.exchangeratestoshow = response.value.tiposDeCambio[response.value.divisaPrincipal];
                // Set the preferred user date and number
                this.userpreferreddateformat = response.value.mapUserFormats.dateFormat != '' ? response.value.mapUserFormats.dateFormat : "dd/MM/yyyy";
                this.userpreferrednumberformat = response.value.mapUserFormats.numberFormat != '' ? response.value.mapUserFormats.numberFormat : "###.###.###,##";
                
                if(response.value.headerLastModifiedDate != null){
                    this.headerlastmodifieddate = response.value.headerLastModifiedDate;
                    var aux = response.value.headerLastModifiedDate.split(" ");
                // this.lastInfoDate", aux[0]+'T'+aux[1]+'.000Z');
                    this.lastinfodate = response.value.headerLastModifiedDateMain;
                   // this.lastInfoHour = $A.localizationService.formatTime(response.headerLastModifiedDate, 'HH:mm'); 
                }

                //Check to update the currencies if its not the first time we open the Global Position Tab.
                var storageBalance = window.localStorage.getItem(this.userId + '_' + 'balanceGP');
                if(storageBalance != undefined){
                    this.updateCurrenciesHelper();                
                }
                
                this.dataisloaded = true;

                // Order country by country code
                response.value.accountsByCountry.sort(function(a,b){
                    const countryA = a.countryCode;
                    const countryB = b.countryCode;
                    if(countryA < countryB){
                        return -1;
                    } else if(countryA > countryB){
                        return 1;
                    } else {
                        return 0;
                    }
                });
                
                // Order corporate by name
                response.value.accountsByCorporate.sort(function(a,b){
                    const corporateA = a.corporateName;
                    const corporateB = b.corporateName;
                    if(corporateA < corporateB){
                        return -1;
                    } else if(corporateA > corporateB){
                        return 1;
                    } else {
                        return 0;
                    }
                });
                this.countrygroupresponse = response.value.accountsByCountry;
                this.corporateGroupResponse = response.value.accountsByCorporate;
            } else {
                this.countrygroupresponse = {};
                this.corporateGroupResponse = {};
                this.avaiblebookbalance = 0.0;
                this.totalbookbalance = 0.0;
                this.totalBookBalanceMapped = {};
                this.availableBookBalanceMapped = {};
                this.showNoAccessError = true;
            }
            this.loadingData = false;  
        }else{
            this.loadingData = false;
            var msg = this.label.ERROR_NOT_RETRIEVED;
            this.showtoast = true;
            this.msgtoast = msg;
            this.typetoast = error;
            this.tobehiddentoast = false;
            this.dataisloaded = true;
        }
    }

    checkBrowser(){
        try{
            var browserType = navigator.sayswho= (function(){
                var ua= navigator.userAgent, tem,
                    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
                if(/trident/i.test(M[1])){
                    tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
                    return 'IE '+(tem[1] || '');
                }
                if(M[1]=== 'Chrome'){
                    tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
                    if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
                }
                M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
                if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
                return M.join(' ');
            })();
            if (browserType.startsWith("IE")) {
                this.isIE = true;
            }else{
                this.isIE = false;
            } 
        } catch (e) {
            console.log(e);
        }
    }

    handledropdownvalueselected(evt){
        console.log("Entra a handledropdownvalueselected en globalPositionParent");
        this.dropdownselectedvalue = evt.detail;
        this.selectedgrouping =  evt.detail;

    }
    handledropdownvalueselectedcurrency(evt){
        this.selectedcurrency = evt.detail;
        this.updateCurrenciesHelper();
        
        if(this.template.querySelector("c-lwc_global-exchange-rates-table") != null) {
            this.template.querySelector("c-lwc_global-exchange-rates-table").updateExchageRates({
                _exchangerates: this.exchangeratestoshow
            });
        }
        if(this.template.querySelector("c-lwc_global-consolidated-amount") != null) {
            this.template.querySelector("c-lwc_global-consolidated-amount").updateData();
        }
        if(this.template.querySelector("c-lwc_global-account-card-table") != null) {
            this.template.querySelector("c-lwc_global-account-card-table").updateCurrencies();
        }
        
        
    }
}