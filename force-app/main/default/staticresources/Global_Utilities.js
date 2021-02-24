/*
Author:         R. Alexander Cervino
Company:        Deloitte
Description:    Global reference to common JS functions
History
<Date>			<Author>		<Description>
15/11/2019		R. Alexander Cervino     Initial version*/


/*
Author:         R. Alexander Cervino
Company:        Deloitte
Description:    Function to return to the previous page
History
<Date>			<Author>		<Description>
15/11/2019		R. Alexander Cervino     Initial version*/

function goBack() {
    window.history.back();
},

/*
Author:         R. Alexander Cervino
Company:        Deloitte
Description:    Function to return the URL Params
History
<Date>			<Author>		<Description>
15/11/2019		R. Alexander Cervino     Initial version*/

function getURLParams() {
    alert("HOLA");

    /*var sPageURL = decodeURIComponent(window.location.search.substring(1)); //You get the whole decoded URL of the page.
    var sURLVariables = sPageURL.split('&'); //Split by & so that you get the key value pairs separately in a list
    var sParameterName;
    var i;
    
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('='); //to split the key from the value.
        
        if (sParameterName[0] === 'c__accountNumber') { //lets say you are looking for param name - firstName
            sParameterName[1] === undefined ? 'Not found' : sParameterName[1];
        }
    }
    console.log('Param name'+sParameterName[0]);
    console.log('Param value'+sParameterName[1]);*/
}