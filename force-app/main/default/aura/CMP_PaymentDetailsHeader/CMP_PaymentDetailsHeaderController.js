({
   
    
    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to download the MT103
    History
    <Date>			<Author>		<Description>
    12/12/2019		R. Alexander Cervino     Initial version*/

    getStatuses : function(component, event, helper){

        console.log(component.get("v.iObject"));

        var status =component.get("v.iObject.status");
        var reason=component.get("v.iObject.reason");;
        if(status=='RJCT'){
            component.set("v.statusLabel",$A.get("$Label.c.payment_statusOne"));
            component.set("v.statusClass","icon-circle__red");
        }
        if(status=='ACSC' || status=='ACCC'){
            component.set("v.statusLabel",$A.get("$Label.c.payment_statusTwo"));
            component.set("v.statusClass","icon-circle__green");
        }
        if(status=='ACSP'){
            if(reason=='G000' || reason =='G001'){
                component.set("v.statusLabel",$A.get("$Label.c.payment_statusThree"));
                component.set("v.statusClass","icon-circle__blue");
            }
            if(reason=='G002' || reason =='G003' || reason =='G004'){
                component.set("v.statusLabel",$A.get("$Label.c.payment_statusFour"));
                component.set("v.statusClass","icon-circle__orange");
            }
        }
    },
})