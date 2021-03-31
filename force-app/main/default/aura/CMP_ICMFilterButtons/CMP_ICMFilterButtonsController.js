({
    defaultImage : function(component, event, helper){
        var profUrl = $A.get('$Resource.Flags') + '/Default.svg';
        event.target.src = profUrl;
        console.log('no se si ira ' + profUrl);
    }
    
})