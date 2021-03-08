import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';
import {LightningElement,api,track} from 'lwc';
import {loadStyle, loadScript} from 'lightning/platformResourceLoader';
import { NavigationMixin } from 'lightning/navigation';

//labels
import Displaying from '@salesforce/label/c.Displaying';
import item from '@salesforce/label/c.item';
import searchedBy from '@salesforce/label/c.searchedBy';
import hi from '@salesforce/label/c.hi';
import theseAreYourInternationalPayments from '@salesforce/label/c.theseAreYourInternationalPayments';

export default class Lwc_fx_dashboardParent extends NavigationMixin(LightningElement) {

    comesfromtracker = true;
    @track issearched = false;
    searchValue;
    @track noresults = false;
    @track isingested;
    _result;
    comesFromSSO;
    showBackButton;
    
    label = {
        Displaying,
        item,
        searchedBy,hi,theseAreYourInternationalPayments
    };

    connectedCallback() {
        loadStyle(this, santanderStyle + '/style.css');

        this.columns = [
                        {order: "1",
                        styleColumn: "button-orderRight icon-arrowDown color:white",
                        value: "TRANSACTION #",
                        sortable: false,
                        sortOrder: "desc"},
                        {order: "2",
                        styleColumn: "button-orderRight icon-arrowDown color:white",
                        value: "STATUS",
                        sortable: true,
                        sortOrder: "desc"},
                        {order: "3",
                        styleColumn: "button-orderRight icon-arrowDown color:white",
                        value: "PRODUCT",
                        sortable: true,
                        sortOrder: "desc"},
                        {order: "4",
                        styleColumn: "button-orderRight icon-arrowDown color:white",
                        value: "TRADE DATE",
                        sortable: true,
                        sortOrder: "desc"},
                        {order: "5",
                        styleColumn: "button-orderRight icon-arrowDown color:white",
                        value: "SETT DATE",
                        sortable: true,
                        sortOrder: "desc"},
                        {order: "6",
                        styleColumn: "button-orderRight icon-arrowDown color:white",
                        value: "AMOUNT",
                        sortable: true,
                        sortOrder: "desc"},
                        {order: "7",
                        styleColumn: "button-orderRight icon-arrowDown color:white",
                        value: "COUNTER AMT",
                        sortable: true,
                        sortOrder: "desc"}
                       
            ];
            this.rows = [
            {orderScore: "1",
            columnas : [
                        {order: "1",
                        type: "standard",
                        value: "row1"},
                        {order: "2",
                        type: "status",
                        value: "Draft",
                        status: "001"},
                        {order: "3",
                        type: "standard",
                        value: "row3"},
                        {order: "4",
                        type: "date",
                        value: "2021-02-01T16:23:23.123+0000"},
                        {order: "5",
                        type: "date",
                        value: "2021-02-01T16:23:23.123+0000"},
                        {order: "6",
                        type: "amount",
                        value: "50355",
                        currency1: "EUR"},
                        {order: "7",
                        type: "counter",
                        value: "13035",
                        currency1: "USD"}
                    ]
            },
            {orderScore: "2",
            columnas : [
                        {order: "1",
                        type: "standard",
                        value: "row1"},
                        {order: "2",
                        type: "status",
                        value: "Pending",
                        status: "002"},
                        {order: "3",
                        type: "standard",
                        value: "row3"},
                        {order: "4",
                        type: "date",
                        value: "2021-02-01T16:23:23.123+0000"},
                        {order: "5",
                        type: "date",
                        value: "2021-02-01T16:23:23.123+0000"},
                        {order: "6",
                        type: "amount",
                        value: "50355",
                        currency1: "EUR"},
                        {order: "7",
                        type: "counter",
                        value: "13035",
                        currency1: "USD"}
                    ]
            },
        ];
    }

    navigateToTrades(){
        console.log("entra redirect");
        //window.location.href = 'trades';
        
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'Trades__c',
            },
        });
        console.log("funciona redirect");
    }
}