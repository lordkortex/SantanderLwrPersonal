import { LightningElement,api,track } from 'lwc';

import { loadStyle }            from 'lightning/platformResourceLoader';
import Santander_Icons          from '@salesforce/resourceUrl/Santander_Icons';
import images                   from '@salesforce/resourceUrl/Images';
//import getCountriesNames        from '@salesforce/apex/CNT_OTVAccountsConfiguration.getCountriesNames';
//import getSubsidiariesByUser    from '@salesforce/apex/CNT_OTVAccountsConfiguration.getSubsidiariesByUser';
import getSubsidiariesServices  from '@salesforce/apex/CNT_OTVAccountsConfiguration.getSubsidiariesByAccountService';
import getCountriesNamesService  from '@salesforce/apex/CNT_OTVAccountsConfiguration.getCountriesNamesService';
// importing Custom Label
import cmpOTVAccountsConfiguration_1 from '@salesforce/label/c.cmpOTVAccountsConfiguration_1';
import cmpOTVAccountsConfiguration_2 from '@salesforce/label/c.cmpOTVAccountsConfiguration_2';
import cmpOTVAccountsConfiguration_3 from '@salesforce/label/c.cmpOTVAccountsConfiguration_3';
import cmpOTVAccountsConfiguration_4 from '@salesforce/label/c.cmpOTVAccountsConfiguration_4';
import cmpOTVAccountsConfiguration_5 from '@salesforce/label/c.cmpOTVAccountsConfiguration_5';
import cmpOTVAccountsConfiguration_6 from '@salesforce/label/c.cmpOTVAccountsConfiguration_6';
import cmpOTVAccountsConfiguration_7 from '@salesforce/label/c.cmpOTVAccountsConfiguration_7';
import cmpOTVAccountsConfiguration_8 from '@salesforce/label/c.cmpOTVAccountsConfiguration_8';
import cmpOTVAccountsConfiguration_9 from '@salesforce/label/c.cmpOTVAccountsConfiguration_9';
import cmpOTVAccountsConfiguration_10 from '@salesforce/label/c.cmpOTVAccountsConfiguration_10';
import cmpOTVAccountsConfiguration_11 from '@salesforce/label/c.cmpOTVAccountsConfiguration_11';
import cmpOTVAccountsConfiguration_12 from '@salesforce/label/c.cmpOTVAccountsConfiguration_12';
import cmpOTVAccountsConfiguration_13 from '@salesforce/label/c.cmpOTVAccountsConfiguration_13';


export default class CmpOTVAccountsConfiguration extends LightningElement {

    label = {
        cmpOTVAccountsConfiguration_1,
        cmpOTVAccountsConfiguration_2,
        cmpOTVAccountsConfiguration_3,
        cmpOTVAccountsConfiguration_4,
        cmpOTVAccountsConfiguration_5,
        cmpOTVAccountsConfiguration_6,
        cmpOTVAccountsConfiguration_7,
        cmpOTVAccountsConfiguration_8,
        cmpOTVAccountsConfiguration_9,
        cmpOTVAccountsConfiguration_10,
        cmpOTVAccountsConfiguration_11,
        cmpOTVAccountsConfiguration_12,
        cmpOTVAccountsConfiguration_13
    };
    // Expose URL of assets included inside an archive file
    logo = images + '/logo-santander-one-trade.png';
    heroReference = images + '/hero_reference_02.svg';

    @api subsidiaries;
    @api countries;
    lstCountriesAux =[];
    lstCountries ={};
    areDetailsVisible = false;
    loading = true;
    connectedCallback() {
        Promise.all([
            loadStyle(this, Santander_Icons + '/style.css'),
        ])

        /*getCountriesNames().then((results)=>{
            this.countries=results;
            console.log(this.countries)
        })
        getSubsidiariesByUser().then((results)=>{
            this.subsidiaries=results;
            console.log(this.subsidiaries);
        })*/
        getSubsidiariesServices({mainCompanyId: '1588401980'}).then((results)=>{
            console.log(results);
            this.subsidiaries=results;
            for(var i=0; i<this.subsidiaries.length; i++){
                //this.lstCountries[i] =this.subsidiaries[i].companyCountry;
                this.lstCountriesAux[i] = this.subsidiaries[i].companyCountry;
            }
        }).finally(() =>{
        getCountriesNamesService({json: JSON.stringify(this.lstCountriesAux)}).then((results)=>{
            this.countries=results;
            console.log(this.countries);
        }).finally(() => {
            this.loading = false;
        }).finally(() => {
            this.loading = false;
        })
    })
    }
    

    handleChange(event) {
        this.areDetailsVisible = true;
    }
    get condition(){
        if(this.areDetailsVisible && !this.loading){
            console.log('Devuelve true');
            return true;
        }else if(!this.areDetailsVisible && !this.loading){
            console.log('Devuelve false');
            return false;
        }
    }
}