({
	doInit : function(component, event, helper) {
      //  helper.getURLParams(component,event);
      helper.getBicListFull(component, event,helper);
      helper.getDataObject(component, event,helper);
      },
    
      /*Author:         R. Alexander Cervino
      Company:        Deloitte
      Description:    Method to download the MT103
      History
      <Date>			<Author>		<Description>
      12/12/2019		R. Alexander Cervino     Initial version*/
  
      getDataEvent : function(component, event, helper){
          //component.set("v.totalElapsedTime",event.getParam('elapsed'));
      }
})