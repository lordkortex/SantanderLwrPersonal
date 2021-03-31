({
  handleSelection: function (component, event, items) {
    component.set("v.selectedValue", items[0]);
    var selectedValues = [];

    if (component.get("v.isSimpleDropdown")) {
      selectedValues.push(items[0]);
    } else {
      var selectedValuesList = component.get("v.selectedValues");
      console.log(
        "[CMP_DropdownHelper.handleUpdateSelection] Selected Values: " +
          selectedValuesList
      );

      var item_aux = [];

      for (var item in items) {
        item_aux.push(items[item]);
      }

      // If the element selected is All, then select / deselect all options
      for (var item in item_aux) {
        if (item_aux.includes(component.get("v.selectAllValues"))) {
          var allOptions = component.get("v.values");
          if (
            document
              .getElementById(item_aux[item])
              .classList.contains("slds-is-selected")
          ) {
            for (var key in allOptions) {
              document
                .getElementById(allOptions[key])
                .classList.remove("slds-is-selected");
              selectedValuesList.splice(
                selectedValuesList.indexOf(allOptions[key]),
                1
              );
            }
            component.set("v.allValuesSelected", false);
          } else {
            for (var key in allOptions) {
              document
                .getElementById(allOptions[key])
                .classList.add("slds-is-selected");
              if (selectedValuesList.indexOf(allOptions[key]) == -1) {
                selectedValuesList.push(allOptions[key]);
              }
            }
            component.set("v.allValuesSelected", true);
          }
        } else {
          // If the element is selected, then unselect the option. Otherwise select the option.
          if (
            document
              .getElementById(item_aux[item])
              .classList.contains("slds-is-selected")
          ) {
            document
              .getElementById(item_aux[item])
              .classList.remove("slds-is-selected");
            // Remove the value from the list if it's still there
            if (selectedValuesList.indexOf(item_aux[item]) != -1) {
              selectedValuesList.splice(
                selectedValuesList.indexOf(item_aux[item]),
                1
              );
            }
            // Remove 'All' if it's selected
            if (
              selectedValuesList.indexOf(component.get("v.selectAllValues")) !=
              -1
            ) {
              document
                .getElementById(component.get("v.selectAllValues"))
                .classList.remove("slds-is-selected");
              selectedValuesList.splice(
                selectedValuesList.indexOf(component.get("v.selectAllValues")),
                1
              );
            }
          } else {
            document
              .getElementById(item_aux[item])
              .classList.add("slds-is-selected");
            selectedValuesList.push(item_aux[item]);
          }
          component.set("v.allValuesSelected", false);
        }
      }

      component.set("v.selectedValues", selectedValuesList);
      selectedValues = selectedValuesList;
    }

    // Fire event with the selected values info
    var dEvent = component.getEvent("dropdownValueSelected");
    dEvent.setParams({
      selectedValues: selectedValues
    });
    dEvent.fire();
    var cEvent = component.getEvent("dropdownExchangeCurrency");
    cEvent.setParams({
      selectedValues: selectedValues
    });
    cEvent.fire();
  }
});
