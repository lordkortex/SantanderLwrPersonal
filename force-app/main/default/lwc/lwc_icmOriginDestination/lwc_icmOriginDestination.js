import { LightningElement, api, track } from 'lwc';

import { loadStyle, loadScript } from 'lightning/platformResourceLoader';

// Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

import getOriginData from '@salesforce/apex/CNT_ICMOriginDestinationTable.getOriginData';
import imageFlag from '@salesforce/resourceUrl/Flags';


export default class Lwc_icmOriginDestination extends LightningElement {


    @api currentstagenumber;
    //@api nextstep; Aura action
    //@api backstep; Aura action
    @api originvalue;
    @api destinationvalue = [];
    
    @track originData;
    @track destinationData;
    @track countryList;
    @track countryName;
    @track countryListAux;
    @track selectedValue;
    @track countryFlagMap;
    @track countryFilter;

    @track dataFilled = false;
    @track destinationFilled = false;

    imgSource;
    
    @track _currentstagenumber;



    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
        this.getDummyData()

        
    }

    get stageNumberEq1(){
        return this._currentstagenumber == 1;
    }

    get currentstagenumber(){
        return this._currentstagenumber;
    }

    set currentstagenumber(currentstagenumber){
        this._currentstagenumber = currentstagenumber;

        if(this.dataFilled){
            if(this._currentstagenumber == 1){
                if(this.countryList != null){
                    console.log('set the first filter flag');
                    console.log('End createCountryMap method');
                    
                        this.countryFilter = this.countryList[0].key;    
                    
                }
            }else{
                this.countryFilter = this.countryList[1].key;
            }
        }
        

    }

    get currentStageNumberEq1(){
        return this._currentstagenumber == 1;
    }

    get currentStageNumberEq2(){        
        return this._currentstagenumber == 2;
    }

    // get iterationCheck(){
    //     return (this.countryFilter != null && item.value.countryCode == this.countryFilter) || this.countryFilter == null;
    // }

    get buttonDisabled(){
        return !((this._currentstagenumber == 1 && this.originvalue != null) || (this._currentstagenumber == 2 && this.destinationvalue != null));
    }


    get originDataList(){
        var listaAux = this.originData;
        Object.keys(listaAux).forEach(key => {
            listaAux[key].index = key;
            listaAux[key].checked = this.originvalue ? this.originvalue.key == listaAux[key].key : false;
            listaAux[key].iterationCheck = (this.countryFilter != null && listaAux[key].value.countryCode == this.countryFilter) || this.countryFilter == null;
            listaAux[key].imgSource = imageFlag + '/' + listaAux[key].value.countryCode + '.svg';
 
        })
        return listaAux;
    }

    get destinationDataList(){
        var listaAux = this.destinationData;
        Object.keys(listaAux).forEach(key => {
            listaAux[key].index = key;
            if(this.destinationvalue){
                listaAux[key].checked = this.destinationvalue ? this.destinationvalue.key == listaAux[key].key : false;
            }else{
                listaAux[key].checked = false;
            }
            listaAux[key].iterationCheck = (this.countryFilter != null && listaAux[key].value.countryCode == this.countryFilter) || this.countryFilter == null;
 
        })
        return listaAux;
    }

    get countryListFormatted(){
        if(this.countryList){
            var listaAux = this.countryList;
            Object.keys(listaAux).forEach(key => {
                listaAux[key].index = key;
                listaAux[key].country = listaAux[key].key;
                listaAux[key].class = (this.countryFilter == key && this.countryFilter != null) ? 'button' : 'button button_disabled';
                listaAux[key].img = imageFlag + '/' + listaAux[key].key + '.svg';                
            })
            return listaAux;
        }
    }


    previousStep() {
        //this.previousSteptepHelper();
        
        const prevStep = new CustomEvent('backstep');
        this.dispatchEvent(prevStep);

    }

    nextStep() {
        //this.nextStepHelper();

        const prevStep = new CustomEvent('nextstep',{
            detail: {
                destinationvalue : this.destinationvalue,
                originvalue : this.originvalue,
                step: 2}
        });
        this.dispatchEvent(prevStep);
    }

    // onstepChange(){
    //     this.changeStepByBar();
    // }

    getDummyData() {

        getOriginData().then(response => {
            var res = response;
            if(res != null && res != undefined)
            {             
                //Unparse the return
                var returnList = JSON.parse(res);
                //Map of data
                var dataComp = [];
                //Countries variables
                var listAllCountries = [];
                
                var temp;
                for(var i = 0; i < returnList.length ; i++)
                {
                    temp = returnList[i];
                    //Add the checked column
                    temp.checked = false;
                    temp.countryCode = temp.accountNumber.substring(0,2);
                    
                    dataComp.push({
                        key : temp.id,
                        value : temp
                    });
                    listAllCountries.push(temp.accountNumber.substring(0,2));
                }

                var countryList = new Set(listAllCountries);
                var countryListName = Array.from(countryList);
                this.countryListAux =  countryListName;

                let data = {
                    callercomponent : "c-lwc_icm-origin-destination",
                    controllermethod : "getCountryValuesMap",
                    actionparameters : {},
                   
                }
    
                this.template.querySelector('c-lwc_service-component').onCallApex(data); 

                this.originData =  dataComp;
                
                this.destinationData =  dataComp;

                var originValue = this.originvalue;
                
                if(this._currentstagenumber == 2){
                    this.destinationData =  dataComp.filter(dato => dato.key != originValue.key);
                    
             
                }

                console.log(this.originValue);

                
                
            }    
        }).catch(error => {
            var errors = error;
            if (errors) {
                if (errors[0] && errors[0].message) {
                    console.log("Error message: " + 
                                errors[0].message);
                    reject(response.getError()[0]);
                }
            } else {
                console.log("Unknown error");
            }
        });


        
       
    }

    filterByCountry(event) {
        var currentIdFlag = event.currentTarget.title;

        if(this.countryFilter != null && this.countryFilter != undefined && this.countryFilter == currentIdFlag){
            this.countryFilter =  null;

        }else{

            var setVar =  this.countryFilter =  this.countryList.filter(dato => dato.key == currentIdFlag)[0].key;

        }

    }  
    
    checkChanged(event) {

        const eventData = event.detail.data;


        if(this._currentstagenumber == 1){
            var originData = this.originData;
            
            this.originvalue =  eventData;
            this.destinationData =  originData.filter(dato => dato.key != eventData.key);
            if(this.destinationvalue !=  null){
                if(this.originvalue.key == this.destinationvalue.key){
                    this.destinationvalue = null;
                }
            }
            
        }else{
            var originData = this.originData;
            this.destinationvalue =  eventData;
        }
    }

    createCountryMap(response){
        var newListcountry = [];
        var auxlistfor = this.countryListAux;
        this.countryFlagMap =  response;
        var dataMap = this.countryFlagMap;
        for(var i = 0; i < auxlistfor.length ; i++){
            newListcountry.push({
                key   :  auxlistfor[i],
                label :  this.countryFlagMap[auxlistfor[i]]
            });
          
        }

        this.countryList = newListcountry;
   
        if(this._currentstagenumber == 1){
            if(this.countryList != null){
                console.log('set the first filter flag');
                console.log('End createCountryMap method');
                
                    this.countryFilter = newListcountry[0].key;    
                
            }
        }else{
            this.countryFilter = newListcountry[1].key;
        }

        this.dataFilled = true;

       
    }

    handleService(event){
        this.createCountryMap(event.detail.value);
    }

    buttonSelected(event){
        
        let value_aux;

        if(this.currentstagenumber == 1){
            var listaAux = this.originData;
            Object.keys(listaAux).forEach(key => {
                if(event.currentTarget.dataset.id == listaAux[key].key){
                    value_aux = listaAux[key];
                }            
            })
        }else if (this.currentstagenumber == 2){
            var listaAux = this.destinationData;
            Object.keys(listaAux).forEach(key => {
                if(event.currentTarget.dataset.id == listaAux[key].key){
                    value_aux = listaAux[key];
                }            
            })
        }        

        let event_aux = {
            detail : {
                data : value_aux,
                checked : event.currentTarget.checked
            }};

        this.checkChanged(event_aux);

        // const compEvent = new CustomEvent("checkchanged", {
        //     detail : {
        //         data : this.cmpdata,
        //         checked : event.currentTarget.checked
        //     }
        // });

        // this.dispatchEvent(compEvent)

    }

}