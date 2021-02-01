({
    /*
	Author:         Guillermo Giral
    Company:        Deloitte
	Description:    Function to collapse the pill when
    				an option the user clicks outside the
                    options section
    History
    <Date>			<Author>			<Description>
	21/04/2020		Guillermo Giral   	Initial version
	*/
   	afterRender: function (component, helper) {
        this.superAfterRender();
        helper.windowClick = $A.getCallback(function(event){
            if(component.isValid()){  
                //helper.closeFilter(component,event);
            }
        });
       document.addEventListener('click',helper.windowClick);   
    },
    unrender: function (component, helper) {
        this.superUnrender();
        document.removeEventListener('click',helper.windowClick);
    }
    
})