({
    checkDates: function (component, helper){
		var dates = component.get("v.dates");
		var datesOK = true;
		component.set("v.errorMessageFrom", '');
		component.set("v.errorMessageTo", '');

		if(dates[0] != undefined && dates[1] != undefined)
		{
			var dateFromCheck = new Date(dates[0] + 'T00:00:00.000Z');
			var dateToCheck = new Date(dates[1] + 'T00:00:00.000Z');

			var toDate = new Date(Date.now());
			toDate.setDate(toDate.getDate() -2 );

			var fromDate = new Date(toDate.setMonth(toDate.getMonth() - 25));

			var toDate2 = new Date(Date.now());
			toDate2.setDate(toDate2.getDate() -1);
			
			



			if(dateFromCheck.getTime() > dateToCheck.getTime())
			{
				console.log("comprobacion2");
				component.set("v.errorMessageTo", 'From date cannot be higher than to date');
				datesOK = false;
			} 
		}
		// If two dates are empty, TO date becomes yesterday and from date is 2 years ago
		else if(dates[0] == undefined && dates[1] == undefined)
		{
			var toDate = new Date(Date.now());
			toDate.setDate(toDate.getDate() -1);

			var fromDate = new Date(toDate.setMonth(toDate.getMonth() - 25));

			var toDate2 = new Date(Date.now());
			toDate2.setDate(toDate2.getDate() -1);

			var toDateFinal = toDate2.getFullYear() + "-" + (toDate2.getMonth() +1) + "-" + toDate2.getDate();
			var fromDateFinal = fromDate.getFullYear() + "-" + (fromDate.getMonth() + 1) + "-" + fromDate.getDate();

			dates[0] = fromDateFinal;
			dates[1] = toDateFinal;
			component.set("v.dates", dates);

		}
		else if(dates[0] == undefined && dates[1] != undefined){
			var toDate = new Date(Date.parse(dates[1]));
			var fromDate = new Date(toDate.setMonth(toDate.getMonth() - 25));
			var finalDate = "";
			var aux = toDate.getMonth() + 1;
			finalDate = fromDate.getFullYear() + "-" + aux + "-" + fromDate.getDate();
			dates[0] = finalDate;
			component.set("v.dates", dates);

		// Only From date is filled, then fill until today
		} else if(dates[1] == undefined && dates[0] != undefined){
			var toDate = new Date(Date.now());
			//toDate.setDate(toDate.getDate() -2);

			var fromDate = new Date(Date.parse(dates[0]));
			var finalDate = "";
			/*if(fromDate >= toDate){
				toDate.setMonth(fromDate.getMonth() + 25);
			}*/
			var aux = toDate.getMonth() + 1;
			finalDate = toDate.getFullYear() + "-" + aux + "-" + toDate.getDate();
			dates[1] = finalDate;
			component.set("v.dates", dates);
		}
		return datesOK;

	}
})