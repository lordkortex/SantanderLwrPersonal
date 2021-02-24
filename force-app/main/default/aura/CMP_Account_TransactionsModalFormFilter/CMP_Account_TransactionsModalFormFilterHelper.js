({
	/*
	Author:         Guillermo Giral
    Company:        Deloitte
	Description:    Calculates the number of active filters
    History
    <Date>			<Author>			<Description>
	15/03/2020		Guillermo Giral   	Initial version
	*/
	calculateNumberActiveFilters : function(component) {
		var filters = component.get("v.filters");
		var formFilters = component.get("v.formFilters");
		var filterCount = 0;
		
		// Loop through all the form filters and start counting
		for(var key in Object.keys(formFilters)){
			var filterName = Object.keys(formFilters)[key];
			if(((filterName == "debit" || filterName == "credit") && formFilters[filterName]) || ((filterName == "clientRef" || filterName == "description") && formFilters[filterName])){
				filterCount++;
			}
		}

		// Loop through all the filters and keep counting
		for(var key in filters){
			if(filters[key].type == "checkbox"){
				filterCount = filters[key].data.filter(option => option.checked).length > 0 ? filterCount+1 : filterCount;
			} else if(filters[key].type == "text"){
				filterCount = filters[key].selectedFilters != undefined && 
							((filters[key].selectedFilters.from != undefined && filters[key].selectedFilters.from != "") || (filters[key].selectedFilters.to != undefined && filters[key].selectedFilters.to != "")) ? filterCount+1 : filterCount; 
			} else if(filters[key].type == "dates"){
				if(filters[key].data.length > 0 && 
					((filters[key].data[0] != null && filters[key].data[0] != undefined) || (filters[key].data[1] != null && filters[key].data[1] != undefined))){
						filterCount++;
				} else {
					var datesBis = component.get("v.datesBis");
					filterCount = datesBis.length > 0 && 
								((datesBis[0] != null && datesBis[0] != undefined) || (datesBis[1] != null && datesBis[1] != undefined)) ? filterCount+1 : filterCount;
				}
			}
		}

		return filterCount;
	},


	/*Author:         Guillermo Giral
    Company:        Deloitte
	Description:    Function to calculate the date filter
					if some of the values is not provided
    History
    <Date>			<Author>			<Description>
	24/03/2020		Guillermo Giral   	Initial version*/
	
	checkDates: function (component, helper, selectedFilters){

		var dates = component.get("v.datesBis");
		// Only To date is filled, then fill From with -25 months
		if(dates[0] == undefined && dates[1] != undefined){

			var toDate = new Date(Date.parse(dates[1]));
			var fromDate = new Date(toDate.setMonth(toDate.getMonth() - 25));
			var finalDate = "";
			var aux = toDate.getMonth() + 1;
			finalDate = fromDate.getFullYear() + "-" + aux + "-" + fromDate.getDate();
			dates[0] = finalDate;
			component.set("v.datesBis", dates);
			//helper.toggleTimeframeValue(component, true);
		// Only From date is filled, then fill until today
		} else if(dates[1] == undefined && dates[0] != undefined || new Date(Date.parse(dates[0])) > new Date(Date.parse(dates[1]))){
			var toDate = new Date(Date.now());
			var fromDate = new Date(Date.parse(dates[0]));
			var finalDate = "";
			if(fromDate >= toDate){
				toDate.setMonth(fromDate.getMonth() + 25);
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
    
    validateDates : function (component, event){
        var dates = component.get("v.dates");

		//Remove error
		component.find('dateFromInput').setCustomValidity('');

		component.find('dateToInput').setCustomValidity('');

		if(dates[1] < dates[0]){
            //Show error
            component.find('dateToInput').setCustomValidity($A.get("$Label.c.validationDate"));
            component.find('dateToInput').reportValidity();
            return false;
        }	
        
        return true;
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
        if(from != "" || to != ""){
            let x = parseInt(from);
            let y = parseInt(to);
            if(x > y) {
                component.set("v.showAmountError", true);
                return false;
            } else if((isNaN(from) && from != undefined) || (isNaN(to) && to != undefined) /*|| x < 0 || y < 0*/){
				component.set("v.showFormatError", true);
                return false;
			}
        }
        return true;
        
	},
	 applySearch : function(component, event, helper){ 

        var cmpEvent = component.getEvent("fireAdvancedFilter");
         if(event.currentTarget.id == "clearBtn"){
             cmpEvent.setParam("button", "clear");    
         } else {
             cmpEvent.setParam("button", "filter");
         }
        // Validate the date
        var isValidDate = helper.validateDates(component, event);
       if(component.find('dateFromInput') != undefined && component.find('dateToInput') != undefined)
       {
           if(component.find('dateFromInput').get("v.validity").valid==false || component.find('dateToInput').get("v.validity").valid==false){
               isValidDate=false;
            }
     	}
        //SNJ - 17/04/2020 - Validate the amount
        var isValidAmount = true;
        if(cmpEvent && isValidDate && !component.get("v.showAmountError") && !component.get("v.showFormatError")){
			var flagEvent = false;
            var selectedFilters = [];
            var filters = component.get("v.filters");
            
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
					//flagEvent=true;
                    var selection = {};
					//component.set("v.dates", component.get("v.datesBis"));
                    selection.value = {};
                    selection.value.from = component.get("v.fromDate");
					selection.value.to = component.get("v.toDate");
                    selection.name = filters[key].name;
					selection.type = "dates";
					if(selection.value != undefined && (selection.value.from  != undefined || selection.value.to != undefined)){
						selectedFilters.push(selection);
					}

                    // Fire the dates change event, so that the Time period dropdown can be updated
                    var dates = component.get("v.dates");
                    if(dates[0] != undefined || dates[0] != null || dates[1] != undefined || dates[1] != null){
						flagEvent=true;
                        var datesChangeEvt = $A.get("e.c:EVT_FilterSearchDates");
                        if(datesChangeEvt){
                            datesChangeEvt.fire();
                        }
                    }
                    if(component.get("v.datesBis")[0] != undefined && component.get("v.datesBis")[1] != undefined){
                        flagEvent=true;
                        
                    }
                    

                    

                } else if(filters[key].type == "text" && filters[key].selectedFilters != undefined){
                    if(filters[key].name == $A.get("$Label.c.amount")){
                        var from = filters[key].selectedFilters.from;
                        var to = filters[key].selectedFilters.to;
                        isValidAmount = helper.validateAmount(component, event, from, to);
                        if(isValidAmount){
                            var selection = {};
                            selection.value = {};
                            selection.value.from = filters[key].selectedFilters.from;
                            selection.value.to = filters[key].selectedFilters.to;
                            selection.name = filters[key].name;
							selection.type = "text";
							if(selection.value != undefined && (selection.value.from != "" || selection.value.to != "")){
								selectedFilters.push(selection);
							}
                        }
                    }else{
                        var selection = {};
                        selection.value = {};
                        selection.value.from = filters[key].selectedFilters.from;
                        selection.value.to = filters[key].selectedFilters.to;
                        selection.name = filters[key].name;
						selection.type = "text";
						if(selection.value != undefined && (selection.value.from != "" || selection.value.to != "")){
							selectedFilters.push(selection);
						}
                    }
                    
                }
            }
            if(isValidAmount){
                // Get the advanced filters data as well
				var formFilters = component.get("v.formFilters");

                var options = Object.keys(formFilters);
                for(var key in options){
                    var selection = {};
                    selection.name = options[key];
                    selection.value = formFilters[options[key]];
                    selectedFilters.push(selection);
                }
                
                // Fire the event only if at least one option has been selected

				cmpEvent.setParam("selectedFilters", selectedFilters);
				if(flagEvent==false){
					cmpEvent.fire();
					var numberActiveFilters = helper.calculateNumberActiveFilters(component);
					component.set("v.numberActiveFilters", numberActiveFilters);
					component.set("v.showModal", false);   
				}else{
					helper.checkDates(component, helper,selectedFilters);
				}

				
            }
            
            
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
    getISOStringFromDateString : function (component, dateString, selectedFilters,helper){
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
        var today = new Date();
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
            var today = new Date().toISOString();

            if(dateString[1] == today.slice(0,10)) {
            	from = dateString[0] + "T00:00:00.000Z";
                to = dateString[1] + today.slice(10,24);
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
            var cmpEvent = component.getEvent("fireAdvancedFilter");
            cmpEvent.setParam("selectedFilters", selectedFilters);
			cmpEvent.fire();

			var numberActiveFilters = helper.calculateNumberActiveFilters(component);
			component.set("v.numberActiveFilters", numberActiveFilters);
			component.set("v.showModal", false);           
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