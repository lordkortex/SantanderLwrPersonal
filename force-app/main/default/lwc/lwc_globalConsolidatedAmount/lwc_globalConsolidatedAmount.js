import TotalConsolidatedBy from '@salesforce/label/c.TotalConsolidatedBy'
import Country from '@salesforce/label/c.Country'
import Corporate from '@salesforce/label/c.Corporate'
import TotalBookBalance from '@salesforce/label/c.TotalBookBalance'
import TotalAvailableBalance from '@salesforce/label/c.TotalAvailableBalance'
import ViewAllAccounts from '@salesforce/label/c.ViewAllAccounts'
import santanderStyle from '@salesforce/resourceUrl/Santander_Icons';
import { LightningElement,api,track} from 'lwc';
import { loadStyle, loadScript} from 'lightning/platformResourceLoader';


export default class Lwc_globalConsolidatedAmount extends LightningElement {

    @track dropdownValues =  [Country, Corporate];
    @api dropdownselectedvalue;
    @api lastupdateselected;
    @api userpreferrednumberformat= "userPreferredNumberFormat";
    @api selectedcurrency = "EUR";
    @api totalbookbalance;
    @api avaiblebookbalance;
    @api isdataloaded;
    disableDropdown = false; 

    label = {
        TotalConsolidatedBy,
        Country,
        Corporate,
        TotalBookBalance,
        TotalAvailableBalance,
        ViewAllAccounts
    };

    get totalBookBalanceNotNull(){
        return this.totalbookbalance != ' '
    }

    get avaibleBookBalanceNotNull(){
        return this.avaiblebookbalance != ' '
    }


    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
        console.log("entra en el connectedCallback");
        
    }

    goToAccounts(event){
        console.log("entra");
        event.preventDefault();
        var url = "&c__tabs="+ this.lastupdateselected + "&c__dropdownSelectedValue=" + this.dropdownselectedvalue;
        url+="&c__consolidationCurrency=" + this.selectedcurrency +"&c__accountGrouping=" + this.dropdownselectedvalue;
        this.template.querySelector("c-lwc_service-component").redirect({
            page: "accounts",
            urlParams: url
          });
    } 
    @api
    updateData(){
        if(this.isdataloaded){            
            this.template.querySelectorAll("c-lwc_display-amount")[0].formatNumber(this.userpreferrednumberformat);
            this.template.querySelectorAll("c-lwc_display-amount")[1].formatNumber(this.userpreferrednumberformat);
        }
    }

    handledropdownvalueselected(evt){
        console.log("Entra a handledropdownvalueselected");
        this.dropdownselectedvalue = evt.detail[0];
        const selectedEvent = new CustomEvent('dropdownvalueselected', {detail: this.dropdownselectedvalue});
        this.dispatchEvent(selectedEvent);
    }
}