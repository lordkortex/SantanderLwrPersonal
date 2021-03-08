import { LightningElement, api, track } from 'lwc';
//Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
//Labels
import payments from '@salesforce/label/c.Payments';
import newpayment from '@salesforce/label/c.NewPayment';
import paymentslandingsubtitle from '@salesforce/label/c.PaymentsLandingSubtitle';
import single from '@salesforce/label/c.Single';
import multiple from '@salesforce/label/c.Multiple';

export default class Lwc_fx_styledDummyTable extends LightningElement {

    label = {
        payments,
        newpayment,
        paymentslandingsubtitle,
        single,
        multiple 
    }

    @api userfirstname; //"Current user first name" 
    @api singlenumrecords; //"Number of records in Single tab" 
    @api multiplenumrecords; //"Number of records in Multiple tab" 
    @api issingletabselected;//false //"Attribute which detemines which tab is selected" 
    @api showmethodmodal;//true //"Controls whether the Payment Methods modal is open or not" 
    @api dateValue;
    @track columns;
    rows;
    tradeId;
    showModalDetails = false;


    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
        var newDate = new Date(); 
        this.dateValue = newDate.toISOString().substring(10,0);

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
            sortOrder: "desc"},
            {order: "8",
            styleColumn: "button-orderRight icon-arrowDown color:white",
            value: "RATE",
            sortable: true,
            sortOrder: "desc"},
            {order: "9",
            styleColumn: "button-orderRight icon-arrowDown color:white",
            value: "TARGET ACCOUNT",
            sortable: true,
            sortOrder: "desc"},
        ];
        this.rows = [
            {orderScore: "1",
            columnas : [
                        {order: "1",
                        value: "row1"},
                        {order: "2",
                        value: "row2"},
                        {order: "3",
                        value: "row3"},
                        {order: "4",
                        value: "row4"},
                        {order: "5",
                        value: "row5"},
                        {order: "6",
                        value: "row6"},
                        {order: "7",
                        value: "row7"},
                        {order: "8",
                        value: "row8"},
                        {order: "29",
                        value: "row9"}
                    ]
            }
        ];
    
    }

    handleOrderValueChange(event) {
        //atencion fallo a partir de 11 columnas
        var columnId = event.target.id.charAt(0);
        console.log('//////' + columnId); 
        this.columns.forEach (function (column) {
            console.log('\\\\\\' + column.order); 
            if(column.order==columnId){               
                if(column.styleColumn == "button-orderRight icon-arrowDown color:white" || 
                   column.styleColumn == "button-orderRight icon-arrowUp color:white button-orderOpacity"){
                    column.styleColumn="button-orderRight icon-arrowDown color:white button-orderOpacity";
                    column.sortOrder = 'desc';
                }else {
                    column.styleColumn="button-orderRight icon-arrowUp color:white button-orderOpacity";
                    column.sortOrder = 'asc';
                }
                /*var columnNameInput = column.value;
                var columnOrderInput = column.sortOrder;
                
                const selectedEvent = new CustomEvent("progressvaluechange", {
                    detail: {
                      columnName: columnNameInput , columnOrder: columnOrderInput
                    }
                });

                this.dispatchEvent(selectedEvent);*/
            } else {
                column.styleColumn="button-orderRight icon-arrowDown color:white";
            }
        })
    }
    showDetails(event){
        this.tradeId=event.currentTarget.dataset.id;
        this.showModalDetails = true;
    }
}