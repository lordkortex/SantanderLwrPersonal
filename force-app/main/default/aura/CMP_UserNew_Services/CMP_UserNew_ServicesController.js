({

   /*
    Author:         Teresa Santos
    Company:        Deloitte
    Description:    Method to handle the title buttons
    History
    <Date>          <Author>            <Description>
    10/01/2019      Teresa Santos        Initial version
    */
   doInit : function(component, event, helper) {

        if(component.get("v.hasProfile")) {
            
            var list = component.get("v.servicesList");
            component.set("v.selectedValue", "Reports");
            if(component.get("v.servicesList").length == 0 ) {
                list.push(component.get("v.selectedValue"));
            }
            
            component.set("v.servicesList", list);

        }
        console.log(component.get("v.servicesList"));
    },

    /*
    Author:         Teresa Santos
    Company:        Deloitte
    Description:    Function to select a value
    History
    <Date>          <Author>            <Description>
    10/01/2019      Teresa Santos        Initial version
    */
    selectValue : function(component, event, helper) {
        var id = event.currentTarget.id;
        component.set("v.selectedValue", id);
    },

        /*
    Author:         Teresa Santos
    Company:        Deloitte
    Description:    Function to add a value
    History
    <Date>          <Author>            <Description>
    10/01/2019      Teresa Santos        Initial version
    */
    addButtonClick : function(component, event, helper) {
      var listServices = component.get("v.servicesList");
      if(component.get("v.selectedValue") != null && component.get("v.selectedValue") != undefined && component.get("v.selectedValue") != ""){
        if(component.get("v.servicesList").filter(r=> r==component.get("v.selectedValue")).length == 0){
          listServices.push(component.get("v.selectedValue"));
          component.set("v.servicesList", listServices);
          
        }
        
  
      }
      if(component.get("v.servicesList").length > 0) {
          component.set("v.hasProfile", true);
      }

    },

    /*
    Author:         Teresa Santos
    Company:        Deloitte
    Description:    Function to delete a value
    History
    <Date>          <Author>            <Description>
    10/01/2019      Teresa Santos        Initial version
    */
   showModalDelete : function(component, event, helper) {
    var title = $A.get("$Label.c.GroupNew_DeleteTitle");
    var secondDescription = $A.get("$Label.c.GroupNew_ServicesDescription");
    var eventDelete = component.getEvent("ServicesDelete");

    eventDelete.setParams({
            titleDelete : title,
            secondDescriptionDelete : secondDescription.replace('{NOMBRE DEL SERVICIO}',component.get("v.selectedValue")),
            firstDescriptionDelete : component.get("v.groupName"),
            showDeletePopup : true
    })
    
    eventDelete.fire();
},

/*
    Author:         Teresa Santos
    Company:        Deloitte
    Description:    Method to handle the title buttons
    History
    <Date>          <Author>            <Description>
    10/01/2019      Teresa Santos        Initial version
    */
      handleComponentEventProfile : function(component, event, helper) 
      {
          console.log("Comes From: " + component.get("v.comesFrom"));
        var url= "&c__userName="+component.get("v.userName")
        +"&c__userGroup="+component.get("v.userGroup")
        +"&c__comesFrom="  + component.get("v.comesFrom")
        +"&c__serviceName=" + event.currentTarget.id;

        component.find("Service").redirect("service-profiling", url);
   
   },

   /*
    Author:         Teresa Santos
    Company:        Deloitte
    Description:    Method to handle the title buttons
    History
    <Date>          <Author>            <Description>
    10/01/2019      Teresa Santos        Initial version
    */
   handleComponentEventView : function(component, event, helper) 
   {
    var url= "c__userId="+component.get("v.userId")
    +"&c__userName="+component.get("v.userName")
    +"&c__userRol="+component.get("v.userRol")
    +"&c__userGroup="+component.get("v.userGroup")
    +"&c__comesFrom="  + component.get("v.comesFrom");
    
        component.find("Service").redirect("user-group-profile-summary", url);
}

})