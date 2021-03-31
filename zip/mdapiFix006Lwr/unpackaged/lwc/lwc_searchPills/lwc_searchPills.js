import { LightningElement, api } from 'lwc';
//Labels
import remove from '@salesforce/label/c.remove';
//Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';

export default class Lwc_searchPills extends LightningElement {
    
    label = {
        remove
    }
    
    @api pillsContainer;

    get getItem1True(){
        return (item[1]!=null);
    }

    get getItem1(){
        return item[1];
    }

    get getItem0(){
        return item[0];
    }
    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
    }

    removePill (event) {
        try{
            // var cmpEvent = component.getEvent("clearConcretePill"); 
            // cmpEvent.setParams({
            //     currentPill: event.currentTarget.id
            // });
            // cmpEvent.fire();
            const clearconcretepill = new CustomEvent('clearConcretePill', {
                detail: {
                    'currentPill': event.currentTarget.id
                }
            });
            this.dispatchEvent(clearconcretepill);
        } catch (e) {
            console.log(e);
        } 
    }
    
    clearSearch (){
        try{
            // var cmpEvent = component.getEvent("clearSearch"); 
            // cmpEvent.fire(); 
            const clearsearch = new CustomEvent('clearSearch', {                
            });
            this.dispatchEvent(clearsearch);
        } catch (e) {
            console.log(e);
        }
    }
}