({
    /*
    Author:         Joaquín Vera
    Company:        Deloitte
    Description:    Method to handle component init
    History
    <Date>          <Author>            <Description>
    24/01/2019      Joaquín Vera        Initial version
    */
    handleDoInit : function (component,event,helper) {
        var users = [
            "Miguel Álvarez Aguilera",
            "Maria Yolanda del Valle Redondo",
            "Trinidad Hernandez Arias",
            "Jan Hernandez Pena",
            "Lorena Ballesteros de Miguel",
            "Eloisa Gallardo Melero",
            "Javier Marcos Hurtado",
            "Luis David Latorre Castaño"
        ];
        var groups = [
            "Apoderados",
            "Directiva",
            "Contabilidad",
            "Impuestos",
            "Apoderados Externo",
            "Auditoría",
            "Supervisores",
            "Auditoría Segundo Nivel",
            "Impuestos 2",
            "Aprobadoras",
            "Administradores",
            "Usuarios",
            "Riesgos",
            "Contabilidad Segundo Nivel",
            "Supervisoras"
        ];
        
        var selectGroup = $A.get("$Label.c.GroupNew_SelectGroup");
        
        component.set("v.valuesGroup", groups);
        component.set("v.valuesUser", users);
        component.set("v.slectGroupOrUser", selectGroup);
    },
    
    /*
    Author:         Joaquín Vera
    Company:        Deloitte
    Description:    Change the group option as selected
    History
    <Date>          <Author>            <Description>
    24/01/2019      Joaquín Vera        Initial version
    */
    changeValuesGroup: function(component, helper, response){
        component.set("v.optionGroup", true);
        component.set("v.optionUser", false);		
        component.set("v.selectedValueUser", null);
        
        var selectGroup = $A.get("$Label.c.GroupNew_SelectGroup");
        component.set("v.slectGroupOrUser", selectGroup);
    },
    /*
    Author:         Joaquín Vera
    Company:        Deloitte
    Description:    Change the user option as selected
    History
    <Date>          <Author>            <Description>
    24/01/2019      Joaquín Vera        Initial version
    */
    changeValuesUser: function(component, helper, response){
        component.set("v.optionGroup", false);
        component.set("v.optionUser", true);
        component.set("v.selectedValueGroup", null);
        
        var selectUser = $A.get("$Label.c.GroupNew_SelectUser");
        component.set("v.slectGroupOrUser", selectUser);
    }
    
})