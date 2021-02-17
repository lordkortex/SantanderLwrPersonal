import { LightningElement , api, track } from 'lwc';

//Import styles
import {loadStyle} from 'lightning/platformResourceLoader';
//import santanderSheetJS from '@salesforce/resourceUrl/SheetJS';
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

//Import labels
import charactersRemaining from '@salesforce/label/c.charactersRemaining';
import clearTheTextArea from '@salesforce/label/c.clearTheTextArea';
import reference from '@salesforce/label/c.reference';
import optional from '@salesforce/label/c.optional';
import PAY_ErrorCharacters from '@salesforce/label/c.PAY_ErrorCharacters';

export default class Lwc_b2b_description extends LightningElement {
	//Labels
	label ={
		charactersRemaining,
		clearTheTextArea,
		reference,
		optional,
		PAY_ErrorCharacters
	}

	connectedCallback(){
		loadStyle(this, santanderStyle + '/style.css');
		//this.grow=true;	//default = true
        this.init();
    }
    
    @api ismodified;                                						//description="Indicates if the input data has been modified." />
    @api resetdata=false;                        							//description="Indicates if the input data has been changed." />
	@api value="";              											//description="Text entered by user" />
	@api charactersmax = 140;           										//description="Character limit" />
    @api charactersremaining = 140;           								//description="Characters remaining until reaching the limit" />
    @api placeholder=this.label.reference+this.label.optional;		        //description="Text for minilabel and placeholder of input field."/>
    @track showMiniLabel=false;        										//description="Control to show mini label on focus or when there is input." />
    @api grow;									          					//description="Sey if the input has to grow when typing" />
    @api errormsg;						                                    //description="Error message." />
    @api steps; 			                                       			//description="Data of the steps." />
    @api isediting=false;											        //description="Indicates if the user is editing an existing payment so field should not be reset on initialisation." />

    //ctrl    
    init() {	
		// var steps = component.get('v.steps');
		// if(!$A.util.isEmpty(steps)){
		// 	var focusStep = steps.focusStep;
		// 	var lastModifiedStep = steps.lastModifiedStep;
		// 	if (focusStep == 3 || lastModifiedStep == 3) {
				var isEditing = this.isediting;
				if (isEditing == false) {
					this.clearInput();
				// }				
			} else {
				let chars = this.charactersmax;
				let input = this.value;
				let regexp = new RegExp('\n');
				let value = "";
				if(input != undefined) {
					input = input.replace(regexp, '');
					let length = input.length;
					chars = chars - length;
					value = input;			
				}
				this.value=value;
				this.charactersremaining=chars;
			}		
		// } else {
		// 	let chars = component.get('v.charactersMax');
		// 		let input = component.get('v.value');
		// 		let regexp = new RegExp('\n');
		// 		let value = "";
		// 		if(input != undefined) {
		// 			input = input.replace(regexp, '');
		// 			let length = input.length;
		// 			chars = chars - length;
		// 			value = input;			
		// 		}
		// 		component.set('v.value', value);
		// 		component.set('v.charactersRemaining', chars);
		// }
	}

	handleInput(event) {	
		let chars = this.charactersmax;
		let input = this.value;
		if (event.target.value != undefined) {
			input = event.target.value;
			let regexp = new RegExp('\n');
			input = input.replace(regexp, '');
			event.target.value = input;
			let length = input.length;
			chars = chars - length;
            //SNJ - 29/06/2020 - contar caracteres e mas
            if(chars > -1){
                this.errormsg='';
            }else{
                var substraction = chars * -1;
                var msg = this.label.PAY_ErrorCharacters;
                if(msg != undefined && msg != null){
                    msg  = msg.replace("{0}", substraction);
                }
                this.errormsg=msg;
            }
		}
		this.charactersremaining=chars;
		this.value=input;

		if(this.grow==true){
			if (event.target.value.length != 0) {
				event.target.style.height="auto";
				event.target.style.height= event.target.scrollHeight+"px";
				console.log('event.target.style.height', event.target.style.height);
			} else {
				event.target.style.height="auto";
			}
			
		}
	}

	handleFocus() {
		this.showminilabel=true;
    }

	handleBlur() { 
		this.showminilabel=false;
    }
    
	handleClear() {
		var resetData = this.resetdata;
		let chars = this.charactersmax;

		this.charactersremaining = chars;
		this.value = '';	
		this.errormsg = '';
        if (resetData==true) {
			this.isModified = true;
			
        } else {
			let textinput = this.template.querySelector('[data-id="textareaDescription"]');	
			textinput.value = "";
			textinput.style.height="88px"; //Bea Hill 09/07/2020
		}
	}
    //helper
    clearInput() {
		let maxChars = this.charactersmax;
		var steps = this.steps;
		// if (this.steps.isEmpty()) { //for redomodal
		if (this.steps == undefined || this.steps.length == 0) { //for redomodal
			this.value='';
			this.ismodified=true;
			this.charactersremaining=maxChars;
			let textarea = this.template.querySelector('[data-id="textareaDescription"]');	
			if (textarea != null) {
				textarea.value = "";
				
				console.log('textarea.style.height', textarea.style.height);	
				textarea.style.height="88px";
				console.log('textarea.style.height', textarea.style.height);
				this.charactersremaining=maxChars;
			}
		} else {
			var focusStep = steps.focusStep;
			var lastModifiedStep = steps.lastModifiedStep;
			if (focusStep == 3 && lastModifiedStep == 3) {
	
				this.value='';
				this.ismodified=true;
				this.charactersremaining=maxChars;
			} else {
				let textarea = this.template.querySelector('[data-id="textareaDescription"]');		
				if (textarea != null) {
					textarea.value = "";
					
					console.log('textarea.style.height', textarea.style.height);	
					textarea.style.height="88px";
					console.log('textarea.style.height', textarea.style.height);
					this.charactersremaining=maxChars;
	
				}
			}
		}	
	}
	get ifValueEmpty(){
        //return !this.value.isEmpty();
        return (this.value != undefined && this.value.length != 0);
    }
	get ifErrorMSG(){
        //return !this.errorMSG.isEmpty();
        return this.errormsg != undefined && this.errormsg != '';
	}
	get ifValueEmptyOrShowLabel(){
		//return or(!this.value.isEmpty(), this.showMiniLabel == true);
		return ((this.value != undefined && this.value.length != 0) || this.showMiniLabel == true);
	}
	get classError(){
        // return (!this.value.isEmpty() ? 'error' : '') + ' slds-form-element textarea';
        return ((this.value != undefined && this.value.length != 0) ? 'error' : '') + ' slds-form-element textarea';
	}
	
}