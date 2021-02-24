({
    updateCarousel : function(component, event, helper) 
    {
        var listExchange = component.get("v.currenciesExchange");
        if(listExchange != null)
        {
            var rowsPerPage = component.get("v.rowsPerPage");
            var data = component.get("v.currenciesExchange");
            if(data.length < rowsPerPage)
            {
                component.set("v.pages", [1]);
                component.set("v.start", 0);
                component.set("v.end", data.length);
            }
            else
            {
                var totalPages = data.length / rowsPerPage;
                var pages = [];
                for (i = 1; i <= totalPages; i++) {
                    pages.push(i);
                }
                component.set("v.pages", pages);
                component.set("v.start", 0);
                component.set("v.end", rowsPerPage - 1);
            }
        }
    },

    changePage : function (component, event, helper)
    {
        var element = event.currentTarget.id;

        if(element.contains('carousel'))
        {
            var element = event.currentTarget.id.replace('carousel', '');
            var start = (parseInt(element) -1 ) * component.get("v.rowsPerPage");
            var end = (start + component.get("v.rowsPerPage")) - 1; 
            component.set("v.start", start);
            component.set("v.end", end);
        }
        else if(element.contains('previous'))
        {
            var start = component.get("v.start");

            if(start != 0)
            {
                component.set("v.start", start - component.get("v.rowsPerPage"));
                component.set("v.end", component.get("v.end") - component.get("v.rowsPerPage"));
            }
        }
        else
        {
            var start = component.get("v.start");

            if(start != (component.get("v.pages")-1) * component.get("v.rowsPerPage"))
            {
                component.set("v.start", start + component.get("v.rowsPerPage"));
                component.set("v.end", component.get("v.end") + component.get("v.rowsPerPage"));
            }
        }
    }
})