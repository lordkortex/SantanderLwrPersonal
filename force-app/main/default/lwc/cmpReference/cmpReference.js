import { LightningElement, track } from 'lwc';

export default class CmpReference extends LightningElement {

   @track isModified;                      
   @track resetData                   
   @track showMiniLabel = false
   @track value                                     
   @track errorMSG = "";
   @track steps;                                    
   @track isEditing = false;


function1(){
    if(this.showMiniLabel == true || this.value == ""){
        return true;
        }
    }

function2(){
    if(this.value ==""){
        return true;
    }
}

function3(){
    if(this.errorMSG == ""){
        return true;
    }
}

	handleclear(event) {
        var steps = this.steps;
		var focusStep = steps.focusStep;
        var lastModifiedStep = steps.lastModifiedStep;
        if (focusStep == 3 && lastModifiedStep == 3) {
            this.value = "";
            this.isModified = true;
        } else {
			let textinput = document.getElementById("reference-input");	
			if (textinput != null) {
				textinput.value = "";
			}
			if(this.value != null){
				this.value = "";
			}	
		}
    }
    
    handleFocus(event){
            
            this.showMiniLabel = true;
    }

    handeBlur(event){
        this.showMiniLabel = false;

    }

    handleInput(event){

        var steps = component.get('v.steps');
		var focusStep = steps.focusStep;
        var lastModifiedStep = steps.lastModifiedStep;
        if (focusStep == 3 && lastModifiedStep == 3) {
            this.value= "";
            this.isModified = true;
           
          
        } else {
			let textinput = document.getElementById("reference-input");	
			if (textinput != null) {
				textinput.value = "";
			}
			if(component.get('v.value') != null){
				component.set('v.value','');
			}	
		}



    }



}