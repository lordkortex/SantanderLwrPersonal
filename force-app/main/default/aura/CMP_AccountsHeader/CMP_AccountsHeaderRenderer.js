({
/*
	Author:         Shahad
    Company:        Deloitte
    Description:    Rerender elements on CMP_AccountsHeader
    History
    <Date>			<Author>			<Description>
	05/05/2020		Shahad Naji     	Initial version
	*/
afterRender: function (component,helper) {
    this.superAfterRender();
    helper.windowClick = $A.getCallback(function(event){ 
        var isLastUpdate = component.get("v.isLastUpdate");
        if(isLastUpdate == true){
            var iElements =  document.querySelectorAll(".accountsCardLU");
            helper.showHideIcons(component, event, iElements);
        }else{
            var iElements =  document.querySelectorAll(".accountsCardEOD");
            helper.showHideIcons(component, event, iElements);
        }
    });
    document.addEventListener('click',helper.windowClick);      

},
unrender: function (component,helper) {
    this.superUnrender();
    document.removeEventListener('click',helper.windowClick);        
}
})