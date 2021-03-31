import { LightningElement, api} from 'lwc';
import getExternalURL from '@salesforce/apex/CNT_ExternalURL.getExternalURLs';

export default class CmpExternalURL extends LightningElement {
lstExternalURL = [];
@api filas = [];
arrayFilas = [];
loading = true;
numeroFilas;
auxiliar1=0;
auxiliar2=2;
cont=0;
connectedCallback(){
    getExternalURL().then((result)=>{
        console.log(result);
        this.lstExternalURL = result;
        if(result.length%2 != 0 ){
            this.numeroFilas = result.length/2 + 1;
        }else{
            this.numeroFilas = result.length/2;
        }
        console.log(this.numeroFilas);

        for(let i= 0;i<this.numeroFilas;i++){ 
            this.arrayFilas.push(i);
        }
        this.filas = this.arrayFilas;
    }).finally(() => {
        console.log('termina');
        this.loading = false;
     })
}

goExternalSite(event){
    var url = event.target.dataset.item;
    window.open(url);
}

get condition(){
    console.log('this.lstExternalURL.length');
    console.log(this.lstExternalURL.length);
    console.log('auxiliar1');
    console.log(this.auxiliar1);
    console.log('auxiliar2');
    console.log(this.auxiliar2);
    console.log('cont');
    console.log(this.cont);
    if(this.cont==this.lstExternalURL.length){
        this.auxiliar1 = 0;
        this.auxiliar2 = this.auxiliar2 + 2;
        this.cont = 1;
    }else{
        this.cont=this.cont+1;
    }
    if(this.auxiliar1 == this.auxiliar2){
        return false;
        
        
    }else if( this.auxiliar2 - this.auxiliar1 > 2){
        this.auxiliar1 = this.auxiliar1 + 1;
        return false;
    }else{
        this.auxiliar1 = this.auxiliar1 + 1;
        return true;
    }
}
}