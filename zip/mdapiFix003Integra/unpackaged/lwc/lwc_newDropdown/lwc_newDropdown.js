import { LightningElement, api, track } from "lwc";
import { loadStyle, loadScript } from "lightning/platformResourceLoader";
import singleChoice from "@salesforce/label/c.singleChoice";
import multipleChoice from "@salesforce/label/c.multipleChoice";
import option from "@salesforce/label/c.option";
import options from "@salesforce/label/c.options";

// Import styles
import santanderStyle from "@salesforce/resourceUrl/Lwc_Santander_Icons";

export default class Lwc_newDropdown extends LightningElement {
  label = {
    singleChoice,
    option,
    options,
    multipleChoice
  };

  @api values;
  _values;
  @api issimpledropdown = false;
  @api valueplaceholder;
  @api isdisabled;
  @api selectedvalue;
  @api selectedvalues;

  valueSingle;
  valueMulti = this.label.options;
  allValuesSelected;
  helpText = "Show More";
  checked;
  @track item;
  valueIndex;
  @track _selectedvalues = [];

  connectedCallback() {
    if (this.selectedvalues) {
      this._selectedvalues = this.selectedvalues;
    }
  }

  get dropDownClass() {
    return this.isdisabled
      ? "slds-combobox slds-dropdown-trigger disabled"
      : "slds-combobox slds-dropdown-trigger";
  }

  get isSingleChoice() {
    if (this.selectedvalue) {
      return this.selectedvalue == this.label.singleChoice;
    }
  }

  get isNotSingleChoice() {
    if (this.selectedvalue) {
      return (
        this.selectedvalue != null &&
        this.selectedvalue != this.label.singleChoice
      );
    }
  }

  get selectedValueIsNull() {
    return this.selectedvalue == null;
  }

  get disabled() {
    return this.isdisabled ? true : false;
  }

  get disabledClass() {
    return this.isdisabled
      ? "slds-dropdown slds-dropdown_left slds-dropdown_small dropdownOrder__none disabled"
      : "slds-dropdown slds-dropdown_left slds-dropdown_small dropdownOrder";
  }
  get valueLength() {
    if (this._selectedvalues) {
      return this._selectedvalues.length == 0;
    }
  }
  get valueLengthEquals() {
    if (this._selectedvalues) {
      return this._selectedvalues.length == 1;
    }
  }
  get valueLengthGreater() {
    if (this._selectedvalues) {
      return this._selectedvalues.length > 1 && this.allValuesSelected;
    }
  }
  get valueLengthGreaterNotSelected() {
    if (this._selectedvalues) {
      return this._selectedvalues.length > 1 && !this.allValuesSelected;
    }
  }

  get itemClass() {
    /*console.log('Entra itemClass')
        if(this.item){
            return this.item == this.selectedvalue ? 'slds-dropdown__item slds-is-selected selectedOption' : 'slds-dropdown__item';
        }*/
    return "slds-dropdown__item";
  }

  get getSingleselectedvalues() {
    if (this._selectedvalues.length > 0) {
      return this._selectedvalues[0];
    } else {
      return [];
    }
  }

  get getSelectedValuesLengthSub() {
    console.log("Entra getSelectedValuesLengthSub");

    if (this._selectedvalues) {
      return this._selectedvalues.length - 1;
    }
  }
  get getSelectedValuesLength() {
    console.log("Entra getSelectedValuesLength");

    if (this._selectedvalues) {
      return this._selectedvalues.length;
    }
  }

  get getvalueMulti() {
    console.log("Entra getvalueMulti");

    return " " + this.valueMulti;
  }
  set values(values) {
    if (values) {
      var res = [];
      if (!this.issimpledropdown) {
        for (var i in values) {
          res.push(values[i]);
          //this.valueIndex.push({'value':this._values[i],'index':i});
        }
        this._values = res;
      } else {
        this._values = values;
      }
    }
  }
  get values() {
    return this._values;
  }
  get valuesObject() {
    var d = new Date();
    console.log("Entra valuesObject: " + d.getTime());
    var res = [];
    if (!this.issimpledropdown && this._values) {
      for (var i in this._values) {
        res.push({ label: this._values[i], value: this._values[i] });
        //this.valueIndex.push({'value':this._values[i],'index':i});
      }
    }
    console.log("sale valuesObject: " + d.getTime());

    return res;
  }

  handleSelection(items) {
    try {
      if (items[0] == this.label.multipleChoice) {
        items[0] = [];
      }

      console.log("entra handleSelection");
      this.selectedvalue = items[0];
      let selectedvaluesA = [];

      if (this.issimpledropdown) {
        selectedvaluesA.push(items[0]);
        this.dispatchEventsDropdown(selectedvaluesA);
      } else {
        let selectedValuesList = items[0];
        this._selectedvalues = selectedValuesList;
        this.dispatchEventsDropdown(selectedValuesList);
      }
    } catch (e) {
      console.error(e);
    }

    // Fire event with the selected values info
  }
  dispatchEventsDropdown(selectedValues) {
    const dropdownvalueselectedevent = new CustomEvent(
      "dropdownvalueselected",
      {
        detail: { selectedvalues: selectedValues }
      }
    );
    this.dispatchEvent(dropdownvalueselectedevent);
    const dropdownexchangecurrencyevent = new CustomEvent(
      "dropdownexchangecurrency",
      {
        detail: { selectedvalues: selectedValues }
      }
    );
    this.dispatchEvent(dropdownexchangecurrencyevent);
  }

  @api
  onSelectionUpdate(changedValues) {
    if (changedValues) {
      //let items = args.changedValues;
      let items = changedValues;
      this.handleSelection(items);
    }
  }

  selectOption(event) {
    let item;
    if (this.issimpledropdown) {
      item = event.currentTarget.getAttribute("data-value");
      let items = [];
      items.push(item);
      this.handleSelection(items);
    } else {
      item = event.currentTarget.value;
      console.log(item);
      if (item) {
        let items = [];
        items.push(item);
        this.handleSelection(items);
      }
    }
  }
  get optionsO() {
    return this.values;
  }

  get valueV() {
    return this._selectedvalues;
    //return [];
  }
}
