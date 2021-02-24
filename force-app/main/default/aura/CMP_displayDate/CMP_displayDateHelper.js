({
	/*
	Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Function to format the date based on the User's date format settings
    History
    <Date>			<Author>			<Description>
	16/03/2019		Guillermo Giral   	Initial version
	*/
	formatUserDate : function(component, response) {
		// If a date format exists for the User, make use of the given format
		// If not, the Locale's short date format is used
		var dateString = component.get("v.date");
		var format = (response != '' && response != null) ? response : $A.get("$Locale.shortDateFormat");
		
		if(dateString != "N/A" && dateString != undefined){
			if(component.get("v.convertToUserTimezone")){
				var dateToFormat = new Date(dateString.substring(0,4), parseInt(dateString.substring(5,7)) - 1, dateString.substring(8,10), dateString.substring(11,13), dateString.substring(14,16), 0, 0 );
				dateToFormat.setMinutes(dateToFormat.getMinutes() - dateToFormat.getTimezoneOffset());
				$A.localizationService.getDateStringBasedOnTimezone($A.get("$Locale.timezone"), dateToFormat, function(formattedDate){
					if(formattedDate != "Invalid Date"){
						switch(format){
							case "dd/MM/yyyy" :
								formattedDate = formattedDate.substring(8,10) + "/" + formattedDate.substring(5,7) + "/" + formattedDate.substring(0,4);
								break;
							case "MM/dd/yyyy" :
								formattedDate = formattedDate.substring(5,7) + "/" + formattedDate.substring(8,10) + "/" + formattedDate.substring(0,4);
								break;
						}
						component.set("v.displayedDate", formattedDate);
					} else {
						component.set("v.displayedDate", dateString);
					}
				});
			} else {
				var formattedDate = "";
				switch(format){
					case "dd/MM/yyyy" :
						formattedDate = dateString.substring(8,10) + "/" + dateString.substring(5,7) + "/" + dateString.substring(0,4);
						break;
					case "MM/dd/yyyy" :
						formattedDate = dateString.substring(5,7) + "/" + dateString.substring(8,10) + "/" + dateString.substring(0,4);
						break;
				}
				component.set("v.displayedDate", formattedDate);
			} 
		} else {
			component.set("v.displayedDate", "N/A");
		}
	}
})