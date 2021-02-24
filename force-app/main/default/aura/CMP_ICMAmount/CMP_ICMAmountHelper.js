({
    init : function(component, event, helper) {

    },
   
     myFunction : function(component, event, helper) {
        var checkBox = event.currentTarget.id;
        console.log('checkid '+ checkBox );
        var text = document.getElementById("times");
        if (checkBox.checked == true){
          text.style.display = "block";
        } else {
           text.style.display = "none";
        }
      }

      
})