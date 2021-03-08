import { LightningElement, track, api } from 'lwc';

import { loadStyle, loadScript } from 'lightning/platformResourceLoader';

// Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

import payment_statusOne from '@salesforce/label/c.payment_statusOne';
import payment_statusTwo from '@salesforce/label/c.payment_statusTwo';
import payment_statusThree from '@salesforce/label/c.payment_statusThree';
import payment_statusFour from '@salesforce/label/c.payment_statusFour';
import statusUpdate from '@salesforce/label/c.statusUpdate';
import creditedAmount from '@salesforce/label/c.creditedAmount';
import orderAmount from '@salesforce/label/c.orderAmount';
import Fees from '@salesforce/label/c.Fees';
import valueDate from '@salesforce/label/c.valueDate';
import totalElapsedTime from '@salesforce/label/c.totalElapsedTime';
import uert from '@salesforce/label/c.uert';
import orderingAccount from '@salesforce/label/c.orderingAccount';
import orderingBIC from '@salesforce/label/c.orderingBIC';
import beneficiaryAccount from '@salesforce/label/c.beneficiaryAccount';
import beneficiaryBank from '@salesforce/label/c.beneficiaryBank';
import beneficiaryBIC from '@salesforce/label/c.beneficiaryBIC';
import charges from '@salesforce/label/c.charges';


export default class Lwc_paymentsDetailsHeader extends LightningElement {


    Label = {
        payment_statusOne,
        payment_statusTwo,
        payment_statusThree,
        payment_statusFour,
        statusUpdate,        
        creditedAmount,
        orderAmount,
        Fees,
        valueDate,
        totalElapsedTime,
        uert,
        orderingAccount,
        orderingBIC,
        beneficiaryAccount,
        beneficiaryBank,
        beneficiaryBIC,
        charges
    }


    @api iobject = {};
    @api showfee = "1";
    @api totalelapsedtime;
    @api comesfromuetrsearch;

    @track charges;
    @track statusClass = "icon-circle__red";
    @track statusLabel = this.Label.payment_statusOne;



    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
    }

    get statusclass(){
        return 'circle' + this.statusClass;
    }
    get condition1(){
        return this.iobject.valueDate!=undefined && this.iobject.valueDate!=null
    }
    get condition2(){
        return this.totalelapsedtime!=undefined && this.totalelapsedtime!=null
    }
    get condition3(){
        return this.iobject.originAccountNumber!=undefined && this.iobject.originAccountNumber!=null
    }
    get condition4(){
        return this.iobject.originAccountBic!=undefined && this.iobject.originAccountBic!=null
    }
    get condition5(){
        return this.iobject.beneficiaryAccountNumber!=undefined && this.iobject.beneficiaryAccountNumber!=null
    }
    get condition6(){
        return this.iobject.beneficiaryAccountBank!=undefined && this.iobject.beneficiaryAccountBank!=null
    }
    get condition7(){
        return this.iobject.beneficiaryAccountBic!=undefined && this.iobject.beneficiaryAccountBic!=null
    }
    get condition8(){
        return this.iobject.charges!=undefined && this.iobject.charges!=null
    }

    get forEachCondition(){
        return this.showfee !='0' && this.iobject.fees!=0 && this.iobject.fees!=undefined && this.iobject.fees.length!=0
    }

    get feesList(){
        var listaAux = this.iobject.fees;
        Object.keys(listaAux).forEach(key => {
            listaAux[key].index = key;
            listaAux[key].checked = listaAux[key].index > 0
            listaAux[key].firstItem = listaAux[0]
            listaAux[key].secondItem = listaAux[1] 
        })
        return listaAux;
    }

    // getStatuses(){

    //     console.log(this.iobject);

    //     var status =this.iobject.status;
    //     var reason=this.iobject.reason;;
    //     if(status=='RJCT'){
    //         this.statusLabel = this.Label.payment_statusOne;
    //         this.statusClass = "icon-circle__red";
    //     }
    //     if(status=='ACSC' || status=='ACCC'){
    //         this.statusLabel = this.Label.payment_statusTwo;
    //         this.statusClass = "icon-circle__green";
    //     }
    //     if(status=='ACSP'){
    //         if(reason=='G000' || reason =='G001'){
    //             this.statusLabel = this.Label.payment_statusThre;
    //             this.statusClass = "icon-circle__blue";
    //         }
    //         if(reason=='G002' || reason =='G003' || reason =='G004'){
    //             this.statusLabel = this.Label.payment_statusFour;
    //             this.statusClass = "icon-circle__orange";
    //         }
    //     }
    // }
}