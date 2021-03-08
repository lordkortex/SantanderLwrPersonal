import { LightningElement,track } from 'lwc';

//Import Labels
import LogAdmin_Title from '@salesforce/label/c.LogAdmin_Title';
import LogAdmin_Subtitle from '@salesforce/label/c.LogAdmin_Subtitle';

export default class lwc_logAdminParent extends LightningElement {  

    label = {
        LogAdmin_Title,
        LogAdmin_Subtitle
    }

    @track displayData = false; //Flag to indicate to the c:lwc_logAdminSearch component whether to display the data or search form
    @track displaysearchicon = true;

    goBackToSearch(event){
		var searchClicked = event.getParam("searchClicked");
		if(searchClicked){
			this.displayData = false;
		}
    }
    
	updateSearchStyle(event){
		if(event.getParam("value")){
			// Si se cambia a la pantalla de mostrar datos
			this.template.querySelector("searchIcon").classList.remove("button-search__open");
			this.template.querySelector("searchIcon").classList.add("button-search");
		} else {
			// Si se cambia a la pantalla de mostrar datos a no mostrar
			this.template.querySelector("searchIcon").classList.remove("button-search");
			this.template.querySelector("searchIcon").classList.add("button-search__open");
		}
    }
}