import { LightningElement, track, api } from 'lwc';

import { loadStyle, loadScript } from 'lightning/platformResourceLoader';

// Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

import T_Return from '@salesforce/label/c.Users_WarningDuplicate';

export default class Lwc_titleBreadcrumb extends LightningElement {


    Label = {
        T_Return,
    }


    @api title
    @api breadcrumb
    
    @track navigation
    @track back
    @track source
    @track sourceAux

    @track listNavigation

    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');

        this.doInit();

    }



    doInit() {
        var x = this.breadcrumb;
        var y = [];
        if(x.length > 0){         
            for(var i = 0; i < x.length; i++){
                y.push(x[i]);
            }

            this.navigation = y;            
        }
    }

    get forEachCondition(){
        return this.navigation.index+1 != this.navigation.length;
    }

    goBack() {
        //The first part is for redirect when the user is navegating at the extracts movements flow.

        if(this.breadcrumb.toString() == 'International_Treasury_Management,MovementHistory_Extract,Detail'){
          // console.log('volvemos de transacciones');
            this.source = 'globalBalance';
            this.sourceAux = 'globalBalanceTransactionDetail';
        }else if(this.breadcrumb.toString() == 'MovementHistory_History,MovementHistory_Extract,Detail'){
         //   console.log('volvemos de transacciones');
            this.source = 'dropdownMenu';
            this.sourceAux = 'dropdownMenuTransactionDetail';
 
        }else if(this.breadcrumb.toString() == 'International_Treasury_Management,MovementHistory_History,MovementHistory_Extract,Detail'){
             //console.log('volvemos de transacciones');
            this.source = 'historyofextracts';
            this.sourceAux = 'historyofextractsTransactionDetail';
        }else if(this.breadcrumb.toString() == 'International_Treasury_Management,MovementHistory_History'){
            //console.log('volvemos de extractos vamos a global balance');
            this.source = 'historyofextracts';
            this.sourceAux = 'historyofextractsGlobal'; 
        }else if(this.breadcrumb.toString() == 'International_Treasury_Management,MovementHistory_History,MovementHistory_Extract'){
             //console.log('volvemos de extractos vamos a historico');
            this.source = 'historyofextracts';
            this.sourceAux = 'historyofextractsExtracts';  
        }else if(this.breadcrumb.toString() == 'International_Treasury_Management,MovementHistory_Extract'){
             //console.log('volvemos de historico vamos a global balance');
            this.source = 'globalBalance';
            this.sourceAux = 'globalBalanceExtracts';  
        }else if(this.breadcrumb.toString() == 'MovementHistory_History,MovementHistory_Extract'){
            //console.log('volvemos de extractos vamos a historico iniciamos en dropdown');
            this.source = 'dropdownMenu';
            this.sourceAux = 'dropdownMenuHistoric';  
        }

        //to go back from transactions detail view page to extract page
        if((this.source == 'globalBalance' && this.sourceAux == 'globalBalanceTransactionDetail' ) 
        || (this.source == 'dropdownMenu' && this.sourceAux == 'dropdownMenuTransactionDetail' )
        || (this.source == 'historyofextracts' && this.sourceAux == 'historyofextractsTransactionDetail' )){
             //console.log('entra para volver a extractos de transacciones');

            const eventGetDataBack = new CustomEvent("getdataback",{
                detail : {
                    sourceBreadCrumb : this.source,
                    isbackGlobalbalance : false,
                    isbackHistoric: false,
                    isbackTransaction : true
                }
            });

            this.dispatchEvent(eventGetDataBack);
               
        }//to go back from extracts  page global balance page 
        else if((this.source == 'historyofextracts' && this.sourceAux == 'historyofextractsGlobal' )
        || (this.source == 'globalBalance' && this.sourceAux == 'globalBalanceExtracts' )) {
             //console.log('lanzamos evento para ir a globalbalance');

             const eventGetDataBack = new CustomEvent("getdataback",{
                detail : {
                    sourceBreadCrumb : this.source,
                    isbackHistoric: false,
                    isbackTransaction : false,
                    isbackGlobalbalance : true
                }
            });
         
            this.dispatchEvent(eventGetDataBack);
 
        } //to go back from extracts  page global balance page   
        else if((this.source == 'historyofextracts' && this.sourceAux == 'historyofextractsExtracts' )
        || (this.source == 'dropdownMenu' && this.sourceAux == 'dropdownMenuHistoric' )){
             //console.log('lanzamos evento para ir a historico');
             
            const eventGetDataBack = new CustomEvent("getdataback",{
                detail : {
                    sourceBreadCrumb : this.source,
                    isbackTransaction: false,
                    isbackGlobalbalance : false,
                    isbackHistoric : true
                }
            });
         
            this.dispatchEvent(eventGetDataBack);

        }//go back to users
        else if(this.breadcrumb.toString() =='Users,Users_AddUsers'){
            this.template.querySelector('c-lwc_service-component').redirect("users", "");
        }
        //go back for other cases
        else{
            window.history.back();
        }
       
    }
}