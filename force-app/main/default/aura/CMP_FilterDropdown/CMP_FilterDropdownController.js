({
        /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Init method
    History
    <Date>			<Author>		<Description>
    17/03/2020		R. Alexander Cervino     Initial version*/
    doInit : function(component, event, helper) {
        if(!component.get("v.isSimpleDropdown")){
            var values=component.get("v.values");
            var res=[];
            for(var i in values){
                res.push({"label":values[i],'value':values[i]});
            }
            component.set("v.values",res);
        }
    
    },
    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    clear method
    History
    <Date>			<Author>		<Description>
    17/03/2020		R. Alexander Cervino     Initial version*/
    clear : function(component, event, helper) {

        component.set("v.selectedValues",[]);
        component.set("v.selectedValue","");
        helper.selectOption(component, event, helper,true);
    },
    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to handle selection
    History
    <Date>			<Author>		<Description>
    17/03/2020		R. Alexander Cervino     Initial version*/
    selectOption : function(component, event, helper) {
        helper.selectOption(component, event, helper,false);
    },
    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to apply filters
    History
    <Date>			<Author>		<Description>
    17/03/2020		R. Alexander Cervino     Initial version*/
    apply : function(component, event, helper) {
        helper.apply(component, event, helper,false);
    }
})