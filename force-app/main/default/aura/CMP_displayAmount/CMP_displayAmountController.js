({   
    formatAmount : function(component, event, helper) {
        if(component.get("v.fromGPI")==false){
            helper.formatAmount(component);
        }
    },
    
    formatAmountNumeral :function(component, event, helper) {
      
      
        var params = event.getParam('arguments');
        if(params != undefined){
            
             component.set('v.numberFormat', params.numberFormat);
        }
        if(component.get("v.fromGPI")==false){
            if(component.get('v.numberFormat') != undefined && component.get('v.numberFormat') != 'undefined' ){
                helper.setData(component, helper, component.get("v.numberFormat"));
            }else{
                helper.formatNumber(component,event,helper);
            }
            
        }else{
            helper.setData(component, helper, component.get("v.numberFormat"));
        }
        
        //console.log(numeral(2834723894.23489234723).format('0.00,00'));
    }
})