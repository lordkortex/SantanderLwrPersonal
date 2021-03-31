({
    openModel: function(component, event, helper) {
        // for Display Model,set the "isOpen" attribute to "true"
        component.set("v.isDelete", true);
     },
   
     closeModel: function(component, event, helper) {
        // for Hide/Close Model,set the "isOpen" attribute to "Fasle" 
        component.set("v.isDelete", false);
     },

     delete: function(component, event, helper) {
        helper.delete(component, event, helper);
   } 

})