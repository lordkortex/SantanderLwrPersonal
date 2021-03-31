({
    /*
	Author:         Guillermo Giral
    Company:        Deloitte
	Description:   	Function to change the values shown in the dropdown
					based on the value provided in the dates filter
    History
    <Date>			<Author>			<Description>
	30/03/2020		Guillermo Giral   	Initial version
	*/
    toggleTimeframeValue: function (component, insertValue){
        if(insertValue){
            var values = component.get("v.dropdownValues");
            if(!values.includes($A.get("$Label.c.selectOne"))){
                values.unshift($A.get("$Label.c.selectOne"));
                component.set("v.dropdownValues", values);
                component.set("v.dropdownSelectedValue", $A.get("$Label.c.selectOne"));
            }
        } else {
            var dropdownValues = component.get("v.dropdownValues");
            dropdownValues.filter(row => row != $A.get("$Label.c.selectOne"));
            component.set("v.dropdownValues", dropdownValues);
        }
    },
    
    /*
	Author:         Guillermo Giral
    Company:        Deloitte
	Description:    Function to calculate the date filter
					if some of the values is not provided
    History
    <Date>			<Author>			<Description>
	24/03/2020		Guillermo Giral   	Initial version
	
	checkDates: function (component, helper){
		var dates = component.get("v.dates");
		// Only To date is filled, then fill From with -25 months
		if(dates[0] == undefined && dates[1] != undefined){
			var toDate = new Date(Date.parse(dates[1]));
			var now = new Date(Date.now());
			if(toDate > now){
				toDate = now;
				var auxNow = now.getMonth()+1;
				dates[1] = now.getFullYear() + "-" + auxNow + "-" + now.getDate();
			}

			var fromDate = new Date(toDate.setMonth(toDate.getMonth() - 25));
			var finalDate = "";
			var aux = toDate.getMonth() + 1;
			finalDate = fromDate.getFullYear() + "-" + aux + "-" + fromDate.getDate();

			dates[0] = finalDate;
			component.set("v.dates", dates);
			helper.toggleTimeframeValue(component, true);
		// Only From date is filled, then fill until today
		} else if(dates[1] == undefined && dates[0] != undefined || dates[0] > dates[1]){
			var toDate = new Date(Date.now());
			var fromDate = new Date(Date.parse(dates[0]));
			var finalDate = "";

			var now = new Date(Date.now());
			var auxNow = now.getMonth()+1;

			if(fromDate > now ){
				dates[0] = now.getFullYear() + "-" + auxNow + "-" + now.getDate();
			}

			if(fromDate >= toDate){
				toDate.setMonth(fromDate.getMonth() + 25);
			}
			if(toDate > now  ){
				toDate = now;
				dates[1] = now.getFullYear() + "-" + auxNow + "-" + now.getDate();

			}else{
				var aux = toDate.getMonth()+1;
				finalDate = toDate.getFullYear() + "-" + aux + "-" + toDate.getDate();
				dates[1] = finalDate;
			}
			component.set("v.dates", dates);
			helper.toggleTimeframeValue(component, true);

		}/*else if(dates[1] != undefined && dates[0] != undefined){
			console.log("BOTH");
						console.log(dates);
			var now = new Date(Date.now());
			var auxNow = now.getMonth()+1;

			if(new Date(Date.parse(dates[0]))> now){
				console.log("AQUI1");
				dates[0] = now.getFullYear() + "-" + auxNow + "-" + now.getDate();
			}
			if(new Date(Date.parse(dates[1])) > now  ){
				console.log("AQUI2");

				dates[1] = now.getFullYear() + "-" + auxNow + "-" + now.getDate();
			}
			
			if(new Date(Date.parse(dates[0]))>new Date(Date.parse(dates[1]))){
				var fromDate = new Date(toDate.setMonth(toDate.getMonth() - 25));
				var finalDate = "";

				var aux = toDate.getMonth() + 1;

				finalDate = fromDate.getFullYear() + "-" + aux + "-" + fromDate.getDate();

				dates[0] = finalDate;

			}
			component.set("v.dates", dates);
		}
	}*/
    
    /*Author:         Guillermo Giral
    Company:        Deloitte
	Description:    Function to calculate the date filter
					if some of the values is not provided
    History
    <Date>			<Author>			<Description>
	24/03/2020		Guillermo Giral   	Initial version*/
    
    checkDates: function (component, helper,selectedFilters){
        console.log("ENTRO CDATES");
        var dates = component.get("v.datesBis");
        console.log(dates);
        // Only To date is filled, then fill From with -25 months
        if(dates[0] == undefined  && dates[1] != undefined && dates[1]!=$A.get("$Label.c.to") ){
            
            var toDate = new Date(Date.parse(dates[1]));
            var fromDate = new Date(toDate.setMonth(toDate.getMonth() - 25));
            var finalDate = "";
            var aux = toDate.getMonth() + 1;
            finalDate = fromDate.getFullYear() + "-" + aux + "-" + fromDate.getDate();
            dates[0] = finalDate;
            component.set("v.datesBis", dates);
            //helper.toggleTimeframeValue(component, true);
            // Only From date is filled, then fill until today
        } else if(dates[1] == undefined && dates[0] != undefined && dates[0]!=$A.get("$Label.c.from")  || new Date(Date.parse(dates[0])) > new Date(Date.parse(dates[1]))){
            
            var toDate = new Date(Date.now());
            var fromDate = new Date(Date.parse(dates[0]));
            var finalDate = "";
            if(fromDate >= toDate){
            //     toDate.setMonth(fromDate.getMonth() + 25);
                toDate = JSON.parse(JSON.stringify(fromDate));
            }
            var aux = toDate.getMonth() + 1;
            finalDate = toDate.getFullYear() + "-" + aux + "-" + toDate.getDate();
            dates[1] = finalDate;
            component.set("v.datesBis", dates);
           
            //helper.toggleTimeframeValue(component, true);
        }
        component.set("v.dates", dates);

        if(dates[0]!= null && dates[0]!=undefined){
            
            if(dates[0].dates>10){
                dates[0]=dates[0].split("T")[0];
            } 
        }else{
            component.set("v.fromDate",undefined);
        }
        if(dates[1]!= null && dates[1]!=undefined){
            if(dates[1].dates>10){
                dates[1]=dates[1].split("T")[0];
            } 
        }else{
            component.set("v.toDate",undefined);
        }
        
        // Only convert the dates to the user timezone if it's needed
        if(component.get("v.convertDatesToUserTimezone")){
            helper.getISOStringFromDateString(component,dates,selectedFilters,helper);
        } else {
            helper.fireSelectedDates(component, dates, selectedFilters, helper);
        }
        
    },
    
    validateDates : function (component, event, helper){
        var dates = component.get("v.dates");
        
        
        
        if(dates[1] < dates[0]){
            if(event.currentTarget.id == "dateFromInput"){
                // dates[0] = undefined;
                //Show error
                component.find('dateFromInput').setCustomValidity($A.get("$Label.c.validationDate"));
                component.find('dateFromInput').reportValidity();
            } else if(event.currentTarget.id == "dateToInput"){
                // dates[1] = undefined;
                //Show error
                component.find('dateToInput').setCustomValidity($A.get("$Label.c.validationDate"));
                component.find('dateToInput').reportValidity();
            }	 else{
                // component.find('dateToInput').setCustomValidity($A.get("$Label.c.validationDate"));
                // component.find('dateToInput').reportValidity();
            }	
            return false;
        }	
        
        
        
        
        
        return true;
    },
    
    /*
	Author:         Guillermo Giral
    Company:        Deloitte
	Description:    Function to collapse the pill
    History
    <Date>			<Author>			<Description>
	21/04/2020		Guillermo Giral   	Initial version
	*/
    closeFilter : function(component, event){
        // Get all the filters sections and check whether
        // any of them has been clicked
        var clickedElement = event.target;
        var elements = document.querySelectorAll("div.content_modal");
        var filterClicked = false;
        elements.forEach(function(e) {
            if(!filterClicked){
                filterClicked = e.contains(clickedElement);
            }
        });
        // If no filter has been clicked and
        // neither a filter button, then close all filters
        if(!filterClicked){
            var filters = component.get("v.filters");
            for(var key in filters){
                if(filters[key].type == "checkbox" && filters[key].name != clickedElement.id){
                    filters[key].displayOptions = false;
                }
            }
            component.set("v.filters", filters);
        }
    },
    
    /*
	Author:         Guillermo Giral
    Company:        Deloitte
	Description:    Processes the selected filters and
					dispatch them via component event
    History
    <Date>			<Author>			<Description>
	14/03/2020		Guillermo Giral   	Initial version
	*/
    applyFilters : function(component, event, helper) {
        var cmpEvent = component.getEvent("fireFilter");
        if(event != null && event.currentTarget != null && event.currentTarget.name == "clearBtn"){
            cmpEvent.setParam("button", "clear");
        }else{
           	cmpEvent.setParam("button", "filter"); 
        }
        // Validate the date
        var isValidDate = true;
        var isValidAmount = true;
        if(component.find('dateFromInput') != undefined && component.find('dateToInput') != undefined)
        {
            isValidDate =  helper.validateDates(component, event, helper);
            if(component.find('dateFromInput').get("v.validity").valid==false || component.find('dateToInput').get("v.validity").valid==false){
                isValidDate=false;
            }       
     }
        var amountError = component.get("v.showAmountError");
        var formatError = component.get("v.showFormatError");
        var componente = cmpEvent;
        
        if(cmpEvent && isValidDate && !component.get("v.showAmountError") && !component.get("v.showFormatError")){
            var selectedFilters = [];
            var filters = component.get("v.filters");
            var flagEvent = false;
            
            // Get the selected values from the filters
            for(var key in filters){
                if(filters[key].type == "checkbox"){
                    var selectedOptions = filters[key].data.filter(option => option.checked);
                    if(selectedOptions.length > 0){
                        var selection = {};
                        selection.value = selectedOptions;
                        selection.name = filters[key].name;
                        selection.type = "checkbox";
                        selectedFilters.push(selection);
                    }
                } else if(filters[key].type == "dates"){
                    //component.set("v.dates", component.get("v.datesBis"));
                    cmpEvent.setParam("buttonClicked", "apply");
                    var selection = {};
                    selection.value = {};
                    selection.value.from = component.get("v.fromDate");
                    selection.value.to = component.get("v.toDate");
                    selection.name = filters[key].name;
                    selection.type = "dates";
                    if(selection.value != undefined && (selection.value.from != undefined || selection.value.to != undefined)){	
                        selectedFilters.push(selection);	
                    }
                    
                    if(selection.value.from != undefined || selection.value.from != null || selection.value.to != undefined || selection.value.to != null){
                        flagEvent=true;
                    }
                    if(component.get("v.datesBis")[0] != undefined && component.get("v.datesBis")[1] != undefined){
                        flagEvent=true;
                    }

                
                    // Create the selected dates string
                    //component.set("v.displayedDates", "(" + selection.value.from + " - " + selection.value.to + ")");
                } else if(filters[key].type == "text"){
                    if(filters[key].selectedFilters != undefined){
                        var selection = {};
                        selection.value = {};
                        selection.value.from = filters[key].selectedFilters.from;
                        selection.value.to = filters[key].selectedFilters.to;
                        selection.name = filters[key].name;
                        selection.type = "text";
                        if(selection.value != undefined && (selection.value.from != "" || selection.value.to != "")){	
                            selectedFilters.push(selection);	
                        }
                        
                        var displayedAmount = "";
                        isValidAmount = helper.validateAmount(component, event, selection.value.from, selection.value.to);
                        if(selection.value.from != undefined && selection.value.to == undefined){
                            var maxLabel = $A.get("$Label.c.Max");
                            displayedAmount = "(" + selection.value.from + " - " + maxLabel + ")";
                        } else if(selection.value.to != undefined && selection.value.from == undefined){
                            var minLabel = $A.get("$Label.c.Min");
                            displayedAmount = "(" + minLabel + " - " + selection.value.to + ")";
                        } else if(selection.value.to != undefined && selection.value.from != undefined){
                            displayedAmount = "(" + selection.value.from + " - " + selection.value.to + ")";
                        }
                        //component.set("v.displayedAmount", displayedAmount);
                    }
                }
                // Set the display options flag to false, so the options section collapses
                if(filters[key].type != "text" || (filters[key].type == "text" && isValidAmount)){
                    filters[key].displayOptions = false;
                }
            }
            
            // Clear the "Select one" value if there is a selected value in the drodpdown
            if(component.get("v.dropdownSelectedValue") == $A.get("$Label.c.selectOne")){
                helper.toggleTimeframeValue(component, false);
            }
            
            component.set("v.filters", filters);
            
            // Fire the event, if no filter is selected then all the data must be retrieved
            // if(selectedFilters.length > 0){
            if(isValidAmount){
                //cmpEvent.fire();
                console.log(flagEvent);
                if(flagEvent==false){
                    cmpEvent.setParam("selectedFilters", selectedFilters);
                    if(event.currentTarget!=undefined){	
                        cmpEvent.setParam("filterName", event.currentTarget.id);	
                    }
                    cmpEvent.fire();
                }else{
                    helper.checkDates(component, helper,selectedFilters);
                }
            }
            
        }
    },
    
    /*
	Author:         Shahad Naji
    Company:        Deloitte
	Description:    Function to validate Amounts
    History
    <Date>			<Author>			<Description>
	17/04/2020		Shahad Naji   	Initial version
	*/
    validateAmount: function(component, event, from, to){
        var validate = component.get("v.iamC");
        if(from != "" || to != ""){
            let x = parseInt(from);
            let y = parseInt(to);
            if(x > y) {
                component.set("v.showAmountError", true);
                return false;
            } else if((isNaN(from) && from != undefined) || (isNaN(to) && to != undefined)){
                //component.set("v.showFormatError", true);
                return false;
            }else if ((x < 0) || (y < 0)){
                if (!validate){
                    //component.set("v.showFormatError", true);
                    return false;
                }
            }
        }
        return true;   
    },
    
    /*
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Function to convert an string date (2019-04-15 or 2019-4-15)
                    to ISO date (2019-04-15T00:00:00.000Z) from the user's timezone
                    to GMT 0
    History
    <Date>          <Author>           	   <Description>
    18/04/2020      Guillermo Giral        Initial version
    22/04/2020      R. Cervino             Fix
    27/04/2020      Guillermo Giral        Rework of funnctionality so the user's
                                           timezone is taken into account
    */
    getISOStringFromDateString : function (component, dateString, selectedFilters, helper){
        var action = component.get("c.getCurrentUserTimezoneOffSetInMiliseconds");
        action.setParams({ dateInput : [dateString[0],dateString[1]] }); 
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var res =response.getReturnValue();
                
                if(res!=null && res!=undefined && res!=""){
                    // Fire the event with the selected to and from filters
                    helper.fireSelectedDates(component, dateString, selectedFilters, helper, res);
                }else{
                    return null;
                }
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    component.set("v.errorAccount",true);
                    
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                    errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        
        $A.enqueueAction(action);
    },

    /*
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Function to set the selected filters with the appropriate dates
    History
    <Date>          <Author>           	   <Description>
    08/08/2020      Guillermo Giral        Initial version
    */
    fireSelectedDates : function (component, dateString, selectedFilters, helper, res){
        var from = "";
        var to = "";
        if(component.get("v.convertDatesToUserTimezone")){
            from = helper.formatDateGMT(component, dateString[0],res[dateString[0]], true);
            to = helper.formatDateGMT(component, dateString[1],res[dateString[1]], false);
        } else {
            // Get the date and format it in a proper way
            for(let i in dateString){
                var dateChunks = dateString[i].split('-');
                var monthChunk = dateChunks[1];
                var dayChunk = dateChunks[2];
                if(dateChunks[1].length < 2){
                    monthChunk = "0" + dateChunks[1];
                }
                if(dateChunks[2].length < 2){
                    dayChunk = "0" + dateChunks[2]; 
                }
                dateString[i] = dateChunks[0] + '-' + monthChunk + '-' + dayChunk;
            }
            
            var now = new Date();
			now.setSeconds(0,0);
			var newTime = now.toISOString();

            if(dateString[1] == newTime.slice(0,10)) {
            	from = dateString[0] + "T00:00:00.000Z";
                to = dateString[1] + newTime.slice(10,24);
            } else {
                from = dateString[0] + "T00:00:00.000Z";
                to = dateString[1] + "T23:59:59.999Z";
            }
        }
        if(selectedFilters!=undefined && dateString != undefined){
            if(selectedFilters.length>0){
                var dateFilterCreated;

                for(var f in selectedFilters){
                    var currentFilter = selectedFilters[f];
                    if(currentFilter.name == $A.get("$Label.c.bookDate")){
                        currentFilter.value.from=from;
                        currentFilter.value.to=to;
                        dateFilterCreated = true;
                    }
                    
                }
                if(!dateFilterCreated && from != '' && to != ''){
                    var selection = {};
					selection.value = {};
					selection.value.from = from;
					selection.value.to = to;
					selection.name = $A.get("$Label.c.bookDate");
					selection.type = "dates";
					selectedFilters.push(selection);    
                }
            }else{
                var selection = {};
                selection.value = {};
                selection.value.from = from;
                selection.value.to = to;
                selection.name = $A.get("$Label.c.bookDate");
                selection.type = "dates";
                selectedFilters.push(selection);
            }           
            var cmpEvent = component.getEvent("fireFilter");
            cmpEvent.setParam("selectedFilters", selectedFilters);
            cmpEvent.fire();           
        }  
    },
    
    
    /*
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Function to convert an string date (2019-04-15 or 2019-4-15)
                    to ISO date (2019-04-15T00:00:00.000Z) from the user's timezone
                    to GMT 0
    History
    <Date>          <Author>           	   <Description>
    18/04/2020      Guillermo Giral        Initial version
    22/04/2020      R. Cervino             Fix
    27/04/2020      Guillermo Giral        Rework of funnctionality so the user's
                                           timezone is taken into account
    */
    formatDateGMT : function (component, dateString, res, beginningOfDay){
        
        
        var timeZoneOffsetInMs = res;
        var MS_PER_HOUR = 3600000;
        var MS_PER_MIN = 60000;
        // Get the date and format it in a proper way
        var dateChunks = dateString.split('-');
        var monthChunk = dateChunks[1];
        var dayChunk = dateChunks[2];
        if(dateChunks[1].length < 2){
            monthChunk = "0" + dateChunks[1];
        }
        if(dateChunks[2].length < 2){
            dayChunk = "0" + dateChunks[2];
        }
        dateString = dateChunks[0] + '-' + monthChunk + '-' + dayChunk;
        // We have the user's locale timezone from Salesforce and a date created with the browser's timezone
        // So first we need to adapt both values
        var timezoneOffsetDate = new Date();
        
        var localTimezoneOffSet = timezoneOffsetDate.getTimezoneOffset()*MS_PER_MIN;
        //GET DATESTRING NO GMT
        
        var x = new Date(Date.parse(dateString));
        
        const getUTC = x.getTime();
        const offset = x.getTimezoneOffset() * 60000;
        var xx = new Date(getUTC+offset).toString();
        var newDate; 
        newDate = new Date(Date.parse(xx) - timeZoneOffsetInMs );
        
        
        if(!beginningOfDay){
            newDate.setTime(newDate.getTime() +  (MS_PER_HOUR*24));
            newDate.setTime(newDate.getTime() - 1);
        }
        var month = parseInt(newDate.getMonth())+1;
        if(month < 10){
            month = '0' + month;
        }
        var day = newDate.getDate();
        var hour=newDate.getHours();
        
        var mins = newDate.getMinutes();
        var secs = newDate.getSeconds();
        var msecs = newDate.getMilliseconds();
        if(hour < 10){
            hour = '0' + hour;
        }
        if(day < 10){
            day = '0' + day;
        }
        if(mins < 10){
            mins = '0' + mins;
        }
        if(secs < 10){
            secs = '0' + secs;
        }
        if(msecs > 9 && msecs < 100){
            msecs = '0' + msecs;
        } else if(msecs < 10){
            msecs = '00' + msecs;
        }
        var finalDate = newDate.getFullYear() + '-' + month + '-' + day +'T' + hour + ':' + mins + ':' + secs + '.' + msecs + 'Z';
        if(beginningOfDay){
            component.set("v.fromDate",finalDate);
        }else{
            component.set("v.toDate",finalDate);
        }
        
        return finalDate;
        
    }
})