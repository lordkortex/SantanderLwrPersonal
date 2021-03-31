import { LightningElement, api, track } from "lwc";

import { loadStyle, loadScript } from "lightning/platformResourceLoader";

// Import styles
import santanderStyle from "@salesforce/resourceUrl/Lwc_Santander_Icons";

import fetchRecords from "@salesforce/apex/CNT_customLookupController.fetchRecords";

export default class Lwc_loginAsLookup extends LightningElement {
  @api objectname;
  @api fieldnames;
  @api value;
  @api iconname = "standard:drafts";
  @api label;

  @track recordCount = 5;
  @track placeholder = "Search...";
  @track searchString = "";
  @track selectedRecord = "";
  @track recordsList;
  @track message;

  @track dataFilled = false;
  @track hasRendered = false;

  updateWidth() {
    //this.template.querySelectorAll('.slds-pill').forEach(element => {
    //this.template.querySelectorAll('span').forEach(element => {
    //this.template.querySelectorAll('lightning-pill').forEach(element => {
  }

  renderedCallback() {
    /*this.template.querySelectorAll('.slds-pill').forEach(element => {
                element.style.width = "100%"; 
        });*/
    console.log("element modified");
  }

  connectedCallback() {
    loadStyle(this, santanderStyle + "/style.css");

    this.doInit();
  }

  // To prepopulate the seleted value pill if value attribute is filled
  doInit() {
    if (this.template.querySelector('[data-id="resultsDiv"]')) {
      this.template
        .querySelector('[data-id="resultsDiv"]')
        .classList.toggle("slds-is-open");
    }
    if (this.value) {
      this.searchRecordsHelper(this.value);
    }
    if (this.template.querySelector('[data-id="listbox-id-1"]')) {
      this.template.querySelector('[data-id="listbox-id-1"]').style =
        "max-height:" + (8 + this.recordCount * 40) + "px";
    }
  }

  get lookupPillClass() {
    if (this.selectedRecord == "") {
      return "slds-pill-container slds-hide";
    } else {
      return "";
    }
  }

  get lookupFieldClass() {
    if (this.selectedRecord == "") {
      return "inputLoginAs slds-show";
    } else {
      return "inputLoginAs slds-hide";
    }
  }

  get selectedRecordLabel() {
    if (this.selectedRecord) {
      return this.selectedRecord.label;
    }
  }

  get selectedRecordValue() {
    if (this.selectedRecord) {
      return this.selectedRecord.value;
    }
  }

  // When a keyword is entered in search box
  searchRecords() {
    this.searchString = this.template.querySelector(
      '[data-id="inputLookup"'
    ).value;

    if (this.searchString) {
      this.searchRecordsHelper("");
    } else {
      this.template
        .querySelector('[data-id="resultsDiv"]')
        .classList.remove("slds-is-open");
    }
  }

  // When an item is selected
  selectItem(event) {
    if (event.currentTarget.dataset.id) {
      var recordsList = this.recordsList;
      var index = recordsList.findIndex(
        (x) => x.value === event.currentTarget.dataset.id
      );
      if (index != -1) {
        var selectedRecord = recordsList[index];
      }
      this.selectedRecord = selectedRecord;
      this.value = selectedRecord.value;

      const selectedValue = new CustomEvent("selectedvalue", {
        detail: {
          value: this.value
        }
      });
      this.dispatchEvent(selectedValue);

      this.template
        .querySelector('[data-id="resultsDiv"]')
        .classList.remove("slds-is-open");
    }
  }

  showRecords() {
    if (this.recordsList && this.searchString) {
      this.template
        .querySelector('[data-id="resultsDiv"]')
        .classList.add("slds-is-open");
    }
  }

  // To remove the selected item.
  removeItem() {
    this.selectedRecord = "";
    this.value = "";
    this.searchString = "";
    setTimeout(function () {
      component.find("inputLookup").focus();
    }, 250);
  }

  // To close the dropdown if clicked outside the dropdown.
  blurEvent() {
    this.template
      .querySelector('[data-id="resultsDiv"]')
      .classList.remove("slds-is-open");
  }

  searchRecordsHelper(value) {
    this.template
      .querySelector('[data-id="Spinner"]')
      .classList.remove("slds-hide");
    var searchString = this.searchString;
    this.message = "";
    this.recordsList = [];
    // Calling Apex Method
    fetchRecords({
      objectName: this.objectname,
      filterFields: this.fieldnames,
      searchString: searchString,
      value: value,
      functionality: "LOGIN_AS"
    })
      .then((response) => {
        var result = response;
        if (result.length > 0) {
          // To check if value attribute is prepopulated or not
          if (!value) {
            this.recordsList = result;
            this.dataFilled = true;
          } else {
            this.selectedRecord = result[0];
          }
        } else {
          this.message = "No Records Found for '" + searchString + "'";
        }
      })
      .catch((error) => {
        var errors = error;
        if (errors && errors[0] && errors[0].message) {
          this.message = errors[0].message;
        }
      })
      .finally(() => {
        if (!value) {
          this.template
            .querySelector('[data-id="resultsDiv"]')
            .classList.add("slds-is-open");
        }
        this.template
          .querySelector('[data-id="Spinner"]')
          .classList.add("slds-hide");
      });
  }
}
