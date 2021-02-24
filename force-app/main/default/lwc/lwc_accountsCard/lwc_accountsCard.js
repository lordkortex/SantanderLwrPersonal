import { LightningElement, api, track } from 'lwc';
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';
import { loadStyle } from'lightning/platformResourceLoader';
import imageFlag from '@salesforce/resourceUrl/Flags';
import Images from '@salesforce/resourceUrl/Images';

//label
import Country from '@salesforce/label/c.Country';
import currency from '@salesforce/label/c.currency';
import Corporate from '@salesforce/label/c.Corporate';
import Expand from '@salesforce/label/c.Expand';
import Collapse from '@salesforce/label/c.Collapse';

//apex
import getCountryName from '@salesforce/apex/CNT_CountryBalance.getCountryName';
import getSumBalanceExperto from '@salesforce/apex/CNT_CountryBalance.getSumBalanceExperto';
import getSumBalance from '@salesforce/apex/CNT_CountryBalance.getSumBalance';

export default class Lwc_accountsCard extends LightningElement {

    label = {
        Country,
        currency,
        Corporate,
        Expand,
        Collapse
    };

    @track cmpId;                          //" type="String" description="Component Id"/>
    @api ikey;                           //" type="String" description="Id Component"/>
    @api iregister;                      //" type="Object" description="Register to display"/>
    @api icurrency;                      //" type="String" description="The selected currency to make the required changes to calculate the amounts"/>
    @api isortselected;// = this.label.Country;  //" type="String" default="{!$Label.c.Country}" description="Accounts display order"/>
    @api itabselected = 'LastUpdateTab'; // type="String" default="LastUpdateTab" description="Current selected tab"/>
    
    //¿DONDE SE USA?
    isCashNexus = false;            //" type="Boolean" default="False" description="True if current user is a Cash Nexus user, else, false"/>
    
    @api index = -1;                     //" type="Integer" default="-1" description="The position of the current register to paint"/>
    @track countryName;                    //" type="String" description="Country Name"/> 
    @track bookBalance = '0.00';           //" type="String" default="0.00" description="The sum of book balance value of all accounts"/>
    @track availableBalance = '0.00';      //" type="String" default="0.00" description="The sum of available balance value of all accounts"/>
    @track accounts;                       //" type="List" description="Each register of this List contains two attributes: Key: Currency and Value: List of Accounts"/>
    @track isCardExpanded = true;                 //" type="Boolean" default="true" description="Flag to indicate whether the accounts in the card must be expanded or collapsed"/>
    @api tabschange;                     //" type="Boolean"/>
    @api firstaccountcountrylist;        //" type="List"  access="global" description="Each register of this first list contains two attributes --> Key: Country and Value: List of Accounts" />
    @api firsttaccountcountrylist;       //" type="List"  access="global" description="Each register of this first list contains two attributes --> Key: Country and Value: List of Accounts" />
    @api islastupdate;                   //" type="Boolean" default="true" description="Flag to indicate whether to show Last Update / End of day"/>
    @api filters;                        //"    type="List"     description="List passed to the CMP_CN_Filters components to populate the filters"/>
    @api source;                         //" type="String" description="Source page to know where to navigate to and from"/>
    @api userpreferreddateformat;        //" type="String" description="User preferred time format"/>
    @api userpreferrednumberformat;      //" type="String" description="User preferred number format"/>
    @api isonetrade = false;             //" type="Boolean" default="false" description="Flag to indicate whether the current screen is OneTrade"/>
    @api icurrencylist;                  //" type="List" description="Currency list"/>
    @track imgCardInfoCountryCode;
    @track imgEbury;
    @track defaultImage;
    @api isloading;                    //" type="Boolean"   default="true" description="Used to show the spinner if the data is loading"/>
    @track showCard = false;
    _iregister;
    @track  _bookBalance;
    @track  _availableBalance;
    @track  mAvailableBalance;
    _accounts;
    _tabschange;
    _icurrency;
    // _cmpId;

    _countryName;
    
    get countryName(){
        return this._countryName;
    }

    set countryName(countryName){
        this._countryName = countryName;
        this.getCountryName();
    }

    /* get cmpId(){
        return this._cmpId;
     }

     set cmpId(cmpId){
         this._cmpId = cmpId;
     }*/

    get icurrency(){
        return this._icurrency;
    }

    set icurrency(icurrency){
        this._icurrency = icurrency;
        //this.updateCurrency();
    }

    get tabschange(){
        return this._tabschange;
    }

    set tabschange(tabschange){
        this._tabschange = tabschange;
        if(tabschange){
            this.tabsChange();
        }
        
    }

    get accounts(){
        return this._accounts;
    }

    set accounts(accounts){
        this._accounts = accounts;
    }

    get availableBalance(){
        return this._availableBalance;
    }

    set availableBalance(availableBalance){
        this._availableBalance = availableBalance;
        if(this._availableBalance){
            this.displayAmountTwo();
        }
    }

    get isAvailableBalance(){
        return this._availableBalance != undefined;
    }

    get isBookBalance(){
        return this._bookBalance != undefined;
    }

    get bookBalance(){
        return this._bookBalance;
    }

    set bookBalance(bookBalance){
        this._bookBalance = bookBalance;
        if(this._bookBalance){
            this.displayAmountOne();
        }
       
    }

    get idClass(){
        return this.ikey + '_cardParent';
    }

    get isSorted(){
        return this.isortselected == this.label.Country;
    }

    get isSortedCurrency(){
        return this.isortselected == this.label.currency
    }

    get isSortedYName(){
        return this.isortselected == this.label.Country && this._countryName != '';
    }

    set iregister(iregister) {
        if (iregister) {
            this._iregister = iregister;
            
            this.setSvgCountry(iregister);
            //this.doInit();
        }
    }
    
    get iregister() {
        return this._iregister;
    }
    

    get expandirClass(){
        return this.islastupdate == true ? 'iElement accountsCardLU icon expand slds-show' : 'iElement accountsCardEOD icon expand slds-show';
    }

    get colapseClass(){
        return this.islastupdate == true ? 'iElement accountsCardLU icon collapse slds-hide' : 'iElement accountsCardEOD icon collapse slds-hide';
    }

    @api
    setDropDown(sel){
        this.isortselected = sel;
    }

    /*
    recoverselected(){
        const evt = new CustomEvent('recoverselected');
        this.dispatchEvent(evt);
    }
    */

    @api
    setShowCards(show){
        this.showCard = show;
        //this.doInit();
    }

    setSvgCountry(iregister) {
        if (this._iregister.key) {
            this.imgCardInfoCountryCode = imageFlag + '/' + this._iregister.key + '.svg';
            this.imgEbury = Images + '/ebury.svg';
        }
        else{
            defaultImage = imageFlag + '/Default.svg';
        }
        
    }

    
    connectedCallback() {
        loadStyle(this, santanderStyle + '/style.css');
        this._iregister = this.iregister;
        this.setSvgCountry(this._iregister);
        this.doInit();
        /*if(this._iregister){
            this.doInit();
        }*/
    }

    /*
    renderedCallback(){
        console.log('renderedCallback');
        if(this._iregister){
            this.doInit();
        }
    }
    */

    doInit(){
        this.getCmpId();
        this.getCountryName();
        this.getInformation();

        var countryCard = this._iregister.value;
        if(this.isonetrade == true) {
            var canSeeBalance = 0;
            for(var i = 0; i < countryCard.length; i++){
                if(countryCard[i].balanceAllowed == true) {
                    canSeeBalance++;
                }
            }

            canSeeBalance == 0 ? this.showCard = false : this.showCard = true;
        } else {
            this.showCard = true;
        }
    }

    getCmpId(){
        var iKey = this._iregister.key;
        iKey = iKey.replace(/\s/g,'');
        var iTabSelected = this.itabselected;
        this.cmpId = iTabSelected + '_firstLayer_' + iKey;
    }

    getCountryName(){
        var sortSelected = this.isortselected;
        if(sortSelected == this.label.Country){            
            getCountryName({
                ISOCode : this._iregister.key
            }).then(response => {

                this._countryName = response;
                                                
            }).catch(error => {
                if (error) {
                    console.log("AccountsCard getCountryName Error message: " + error);
                } else {
                    console.log("AccountsCard getCountryName Unknown error");
                }
            });            
               
        }     
    }

    getInformation(){  
        //this.recoverselected();
        var sortSelected = this.isortselected;
                
        /*if(sortSelected == undefined) {
            sortSelected = this.label.Country;
            this.sumBalanceExperto();
        }*/
        if(sortSelected == this.label.Country){
            this.getAccountsPerCountry();
            this.sumBalanceExperto();
        }
        if(sortSelected == this.label.currency){
            this.getAccountsPerCurrency();            
            this.sumBalanceCurrency();
        }
        if(sortSelected == this.label.Corporate){
            this.getAccountsPerSubsidiary();
            this.sumBalanceExperto();
        } 
    }

    sumBalanceExperto(){
        if(this.icurrencylist != undefined && this._icurrency != undefined && this._accounts != undefined){
            var iCurrencyList = this.icurrencylist;
            var iCurrentCurrency = this._icurrency;
            var iAccountMap = this._accounts;
            var lst = [];        
            
            if(iAccountMap){
                iAccountMap.forEach(function(e1) {
                    var aux_i = e1.value;
                    aux_i.forEach(function(e2){
                        lst.push(e2);                
                    });            
                });
            }

            getSumBalanceExperto({
                currentCurrency : iCurrentCurrency,
                accountList : lst,
                currencies : iCurrencyList 
            }).then(response => {
                console.log('getSumBalanceExperto response '+ response);
                var conts = response; 
                    for ( var key in conts ) {
                        if(key == "countryBookBalance"){
                            let num = conts[key];   
                            if(num == 0) {
                                this._bookBalance = '0.00';
                            }else{
                                this._bookBalance = num; 
                            }    
                        }
                        if(key == "countryAvailableBalance"){
                            let num = conts[key];                        
                            if(num == 0){
                                this._availableBalance = '0.00';
                            }else{
                                this._availableBalance = num;
                            }                        
                        }
                    }
            }).catch(error => {
                if (error) {
                    console.log("AccountsCard getSumBalanceExperto Error message: " + error);
                } else {
                    console.log("AccountsCard getSumBalanceExperto Unknown error");
                }
            }); 
        }

    }

    getAccountsPerCountry(){
        var iReceivedAccounts = this._iregister.value;
        var iAccounts = [];
        var iCountries = [];
        for(var i = 0; i < iReceivedAccounts.length; i++){
            if(!iCountries.includes(iReceivedAccounts[i].country)){                
                iCountries.push(iReceivedAccounts[i].country);   
            } 
        }
        for(var j in iCountries){
            var lst = [];
            for(var z = 0; z < iReceivedAccounts.length; z++){
                if(iCountries[j] == iReceivedAccounts[z].country){
                    lst.push(iReceivedAccounts[z]);
                }
            }
            iAccounts.push({value: lst, key: iCountries[j]});
        }
        iAccounts.forEach(function(e1) {
            var aux_i = e1.value});        
        this._accounts = iAccounts;
    }

    getAccountsPerCurrency(){
        var iReceivedAccounts = this._iregister.value;
        var iAccounts = [];
        var iCurrencies = [];
        for(var i = 0; i < iReceivedAccounts.length; i++){
            if(!iCurrencies.includes(iReceivedAccounts[i].currencyCodeAvailableBalance)){                
                iCurrencies.push(iReceivedAccounts[i].currencyCodeAvailableBalance);   
            }           
        }
        for(var j in iCurrencies){
            var lst = [];
            for(var z = 0; z < iReceivedAccounts.length; z++){                
                if(iCurrencies[j] == iReceivedAccounts[z].currencyCodeAvailableBalance){
                    lst.push(iReceivedAccounts[z]);
                }
            }
            iAccounts.push({value: lst, key: iCurrencies[j]});
        }
        this._accounts = iAccounts;
    }

    sumBalanceCurrency(){
        var iCurrentCurrency = this.icurrency;
        var iAccountMap = this._accounts;
        var lst = []; 
       
        iAccountMap.forEach(function(e1) {
            var aux_i = e1.value;
            aux_i.forEach(function(e2){
                lst.push(e2);                
            });            
        });


        getSumBalance({
            accountList : lst
        }).then(response =>{
            var conts = response;
            for ( var key in conts ) {
                if(key == "countryBookBalance"){
                    let num = conts[key];                       
                    if(num == 0) {
                        this._bookBalance = '0.00';
                    }else{
                       this._bookBalance = num; 
                    }
                }
                if(key == "countryAvailableBalance"){
                    let num = conts[key];                     
                    if(num == 0){
                        this._availableBalance = '0.00';
                    }else{
                        this._availableBalance = num;
                    }
                }
            }   
        }).catch(error => {
            if (error) {
                console.log("AccountsCard getSumBalance Error message: " + error);
            } else {
                console.log("AccountsCard getSumBalance Unknown error");
            }
        });             
    }

    getAccountsPerSubsidiary(){
        var iReceivedAccounts = this._iregister.value;
        var iAccounts = [];
        var iSubsidiaries = [];
        for(var i = 0; i < iReceivedAccounts.length; i++){
            if(!iSubsidiaries.includes(iReceivedAccounts[i].subsidiaryName)){                
                iSubsidiaries.push(iReceivedAccounts[i].subsidiaryName);   
            } 
        }
        for(var j in iSubsidiaries){
            var lst = [];
            for(var z = 0; z < iReceivedAccounts.length; z++){
                if(iSubsidiaries[j] == iReceivedAccounts[z].subsidiaryName){
                    lst.push(iReceivedAccounts[z]);
                }
            }
            iAccounts.push({value: lst, key: iSubsidiaries[j]});
        }     
        this._accounts = iAccounts;
    }

    // PASARLO A LWC ¿¿¿???
    showAction(){
        var whichOne = this.cmpId;
        var whichKey = this.ikey; 
        
        if(whichKey!=undefined){
            var iOptionsId = whichKey + '_cardParent'; 
            //var elementSelect = document.getElementById(iOptionsId);//this.template.querySelector('#'+iOptionsId);
            var rowsSe= this.template.querySelector('#'+iOptionsId).querySelectorAll('.contentAccount');
            //this.template.querySelector('[id=iOptionsId]').elementSelect.querySelectorAll('contentAccount')
            //elementSelect.getElementsByClassName('contentAccount');//this.template.querySelectorAll('contentAccount'); 
            rowsSe.forEach(function(element) {             
                element.classList.toggle("slds-show");
                element.classList.toggle("slds-hide"); 
            });     
        }
        var iComponent = this.template.querySelectorAll('#'+whichOne); //document.querySelectorAll("#"+whichOne);
        iComponent.forEach(function(element) {             
            element.classList.toggle("slds-show");
            element.classList.toggle("slds-hide");
        });
    }


    updateCurrency(){        
        this.sumBalanceExperto();     
    }
    
    // No veo donde se llama
    updateSort(){
         this.getCmpId();
    }

    tabsChange(){
        this.getInformation();
    }

    displayAmountOne(){
        var bookbalancepagina = this.template.querySelectorAll('[data-id="bookBalance"]');
        if(bookbalancepagina != undefined){
            bookbalancepagina.formatNumber(this.userpreferrednumberformat);
        }
    }

    displayAmountTwo(){
        var availableBalancepagina = this.template.querySelectorAll('[data-id="availableBalance"]');
        if(availableBalancepagina != undefined){
            availableBalancepagina.formatNumber(this.userpreferrednumberformat);
        }  
    }

    @api
    handleExpand(){
        this.showHideAll();
        this.template.querySelectorAll("c-lwc_accounts-card-row-child").forEach(child =>{
            child.handleExpand();
        });
    }

    @api
    handleCollapse(){
        this.showHideAll();
        this.template.querySelectorAll("c-lwc_accounts-card-row-child").forEach(child =>{
            child.handleCollapse();
        });
    }

    showHideAll(){
        var icmp = this.template.querySelectorAll(".iElement");        
        icmp.forEach(function(el){
            el.classList.toggle("slds-show");
            el.classList.toggle("slds-hide"); 
            
        });
    }
}