import { LightningElement, api, track } from 'lwc';

import { loadStyle, loadScript } from 'lightning/platformResourceLoader';

// Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';


export default class Lwc_icmAmount extends LightningElement {

    
    @api amount;
    @api concept = "";
    @api destinationvalue;
    
    @track options =[{'label': 'One time', 'value': 'option1'},
                     {'label': 'Periodic', 'value': 'option2'}];    
    @track value; //default="option1"
    @track title = "Complete Details Below"
    @track Time = ["Monthly, Quarterly, Annual"]
    @track selectedObject
    @track destinationCurrency
    @track testDisable = true;


    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
    }

    get selectedObjectEqOption2(){
        if(this.selectedObject){
            return this.selectedObject.value == 'option2';
        }
    }

    get optionsList(){
        var listaAux = this.options;
        Object.keys(listaAux).forEach(key => {
            listaAux[key].index = key;            
            listaAux[key].checked = this.selectedObject ? listaAux[key].value == this.selectedObject.value : listaAux[key].value == 'option1';
        });
        return listaAux;
    }

    get buttonDisabled(){
        return !(this.amount != '' && this.concept != '' && this.amount != null && this.concept != null);
    }

    handleChange(event) {
        const actualCheckboxValue = event.currentTarget.value;
        const actualCheckboxData = this.options.filter(dataValue => dataValue.value == actualCheckboxValue)[0];
        
        this.selectedObject = actualCheckboxData; 
        console.log(this.selectedObject);
        
    }


    previousStep() {
        //this.previousSteptepHelper();

        const prevStep = new CustomEvent('backstep');
        this.dispatchEvent(prevStep);

    }

    nextStep() {
        //this.nextStepHelper();

        const prevStep = new CustomEvent('nextstep', {
            detail : {
                amount: this.amount,
                concept: this.concept,
                step: 3
            }
        });
        this.dispatchEvent(prevStep);
    }
    
    /*changeToCurrency2: function() { 
        var amount =  document.getElementById("getAmount").value; 
        console.log('patata');
        console.log(document.getElementById("getAmount").value);
    
        //var amount = 123456;
        var formatterOption =  
        {
            style: 'currency',
            currency: this.destinationValue.value.currency"),
            currencyDisplay: 'code',
            minimumFractionDigits: 2
            }
        
            var numberformat2 = new Intl.NumberFormat('de-DE', formatterOption);
    
        this.Amount = numberformat2.format(amount));
    
        },*/
    
    changeToCurrency() { 
    // Get the reference to lighting:input component and its value
    var inputCmp = this.template.querySelector('[data-id="transferAmount"]');
    var amountInput = inputCmp.value;

    // Check if the input is correct, i.e. if there are no characters other than numbers in the string
    if(amountInput.replace(/\D/g, "") != "" || amountInput == ""){
        if(amountInput != ""){      
        // Specify the format which is going to be applied to the amount string
        var formatterOption =  
        {
            style: 'currency',
            currency: this.destinationvalue.value.ObjectCurrency,
            currencyDisplay: 'code',
            minimumFractionDigits: 2
        };
        
        // Set the format previously defined
        var numberFormat = new Intl.NumberFormat('de-DE', formatterOption);
        
        // If the amount is already formatted
        if(amountInput.split(',').length > 1){
            var amountArray = amountInput.split(',');
            this.amount = numberFormat.format(amountArray[0]);
        } else {
            this.amount = numberFormat.format(amountInput);
        }
        } else {
        this.amount = "";
        }
        // Clear the error message
        inputCmp.setCustomValidity("");
    } else {
        this.amount = "";
        // Show custom error message if the input is not an amount
        inputCmp.setCustomValidity("Please enter a valid amount");
    }
    // Show error message, if any
    inputCmp.reportValidity();
    }

    changeConcept(){
        this.concept = this.template.querySelector('[data-id="conceptInput"]').value;
    }

    myFunction(event) {
        var checkBox = event.currentTarget.id;
        console.log('checkid '+ checkBox );
        var text = this.template.querySelector('[data-id="times"]');
        if (checkBox.checked == true){
            text.style = "display = block";
        } else {
            text.style = "display = none";
        }
    }
    
}