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
//Apex
import getUserData from '@salesforce/apex/CNT_PaymentsLandingParent.getUserData';

export default class Lwc_fx_tradesLandingTable extends LightningElement {

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
    @api columns;
    @api rows;
   
    currentUser = {};
    tradeId;
    showModalDetails = false;


    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
        var newDate = new Date(); 
        this.dateValue = newDate.toISOString().substring(10,0);
        this.getCurrentUserData();
        //this.columns=this.apicolumns;
        //this.rows=this.apirows;

        /*this.apicolumns.forEach (function (column) {
            this.columns.push(column);
        })

        Object.keys(this.apicolumns).forEach(key => {
            this.columns[key] = this.apicolumns[key];
        });*/
    }

    handleOrderValueChange(event) {
        var columnId = event.target.id.charAt(0);
        const selectedEvent = new CustomEvent("handleordervaluechange", {
            detail: {columnId: columnId }
        });
        this.dispatchEvent(selectedEvent)


        //atencion fallo a partir de 11 columnas
        /*var columnId = event.target.id.charAt(0);
        console.log('//////' + columnId);
        console.log('//////' + JSON.stringify(this.columns));
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
                }*/
                /*var columnNameInput = column.value;
                var columnOrderInput = column.sortOrder;
                
                const selectedEvent = new CustomEvent("progressvaluechange", {
                    detail: {
                      columnName: columnNameInput , columnOrder: columnOrderInput
                    }
                });

                this.dispatchEvent(selectedEvent);*/
            //} else {
                // column.styleColumn="button-orderRight icon-arrowDown color:white";
            //}
        //})
    }

    showDetails(event){
        this.tradeId=event.currentTarget.dataset.id;
        this.showModalDetails = true;
    }

    getCurrentUserData() {
        var errorLoading = this.label.B2B_Error_Problem_Loading;
        var errorCheckConnection = this.label.B2B_Error_Check_Connection;
        return new Promise( function(resolve, reject) {
            getUserData()
            .then((result) => {
                var currentUser = {};
                console.log('GAA getCurrentUserData result: ' + JSON.stringify(result.value.userData));
                if (result.success) {
                    if(result.value){
                        if(result.value.userData){
                            currentUser = JSON.parse((JSON.stringify(result.value.userData)));//result.value.userData;
                            this.currentUser = currentUser;
                            resolve(result.value.userData);
                            //resolve(result.value.userData);
                        }else{
                            reject({
                                'title': errorLoading,
                                'body': errorCheckConnection,
                                'noReload': false
                            });
                        }
                    }else{
                        reject({
                            'title': errorLoading,
                            'body': errorCheckConnection,
                            'noReload': false
                        });
                    }                       
                    
                } else {
                    reject({
                        'title': errorLoading,
                        'body': errorCheckConnection,
                        'noReload': false
                    });
                }
            })
            .catch((errors) => {
                console.log('### lwc_paymentsLandingParent ### getCurrentUserData() ::: Catch Error: ' + errors);
                reject({
                    'title': errorLoading,
                    'body': errorCheckConnection,
                    'noReload': false
                });
            })
        }.bind(this)); 
    }
}