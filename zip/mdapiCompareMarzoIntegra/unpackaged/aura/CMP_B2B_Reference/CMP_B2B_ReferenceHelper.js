({
  handleClear: function (component, event, helper) {
    var steps = component.get("v.steps");
    var focusStep = steps.focusStep;
    var lastModifiedStep = steps.lastModifiedStep;
    if (focusStep == 3 && lastModifiedStep == 3) {
      component.set("v.value", "");
      component.set("v.isModified", true);
    } else {
      let textinput = document.getElementById("reference-input");
      if (textinput != null) {
        textinput.value = "";
      }
      if (component.get("v.value") != null) {
        component.set("v.value", "");
      }
    }
  }
});
