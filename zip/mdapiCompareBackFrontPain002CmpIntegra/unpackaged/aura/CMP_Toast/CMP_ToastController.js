({
  hide: function (component) {
    component.set("v.show", false);
  },

  closeAfter: function (component) {
    console.log("entro");
    var show = component.get("v.show");
    var closeToast = component.get("v.toBeHidden");
    console.log(show);
    if (show) {
      setTimeout(
        $A.getCallback(function () {
          component.set("v.openClass", "is-open");
        }),
        10
      );
    } else {
      setTimeout(
        $A.getCallback(function () {
          component.set("v.openClass", "");
        }),
        10
      );
    }
    if (closeToast) {
      if (show == true) {
        setTimeout(function () {
          component.set("v.show", false);
        }, 5000);
      }
    }
  }
});
