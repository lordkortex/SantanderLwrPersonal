({  
    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Init method
    History
    <Date>			<Author>		<Description>
    17/03/2020		R. Alexander Cervino     Initial version*/
    doInit : function(component, event, helper){
        if(!component.get("v.isSimpleDropdown")){
            var values=component.get("v.values");
            var res=[];
            for(var i in values){
                res.push({"label":values[i],'value':values[i]});
            }
            component.set("v.valuesObject",res);
        }
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to  handle selection
    History
    <Date>			<Author>		<Description>
    17/03/2020		R. Alexander Cervino     Initial version*/
    selectOption : function(component, event, helper){
        var item;
        if(component.get("v.isSimpleDropdown")) {
            item = event.currentTarget.id;
            if(item){
                var items = [];
                items.push(item); 
                helper.handleSelection(component, event, items);
            }
        } else {
            item = event.getSource();
            if(item){
                var items = [];
                items.push(item); 
                helper.handleSelection(component, event, items);
            }
        }        
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to update filters
    History
    <Date>			<Author>		<Description>
    17/03/2020		R. Alexander Cervino     Initial version*/
    onSelectionUpdate: function(component, event, helper){
        var args = event.getParam("arguments");
        console.log(args);
        if(args){
            var items = args.changedValues;
            helper.handleSelection(component, event, items);
        }
    }
})