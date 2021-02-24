({
	/*
	Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Function to go back to search when the lens icon is clicked
    History
    <Date>			<Author>			<Description>
	09/01/2019		Guillermo Giral   	Initial version
	*/
	goBackToSearch : function(component, event, helper){
		var searchClicked = event.getParam("searchClicked");
		if(searchClicked === true){
			component.set("v.displayData", false);
		}
	},

	/*
	Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Function to update the style of the icon when the search is performed
    History
    <Date>			<Author>			<Description>
	09/01/2019		Guillermo Giral   	Initial version
	*/
	updateSearchStyle : function(component, event, helper){
		if(event.getParam("value") == true){
			// Si se cambia a la pantalla de mostrar datos
			document.getElementById("searchIcon").classList.remove("button-search__open");
			document.getElementById("searchIcon").classList.add("button-search");
		} else {
			// Si se cambia a la pantalla de mostrar datos a no mostrar
			document.getElementById("searchIcon").classList.remove("button-search");
			document.getElementById("searchIcon").classList.add("button-search__open");
		}
	}
})