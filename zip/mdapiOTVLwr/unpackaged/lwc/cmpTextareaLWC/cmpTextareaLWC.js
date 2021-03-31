import { LightningElement } from "lwc";

import { loadStyle } from "lightning/platformResourceLoader";
import Santander_Icons from "@salesforce/resourceUrl/Santander_Icons";

// importing Custom Label
import cmpTextareaLWC_1 from "@salesforce/label/c.cmpTextareaLWC_1";
import cmpTextareaLWC_2 from "@salesforce/label/c.cmpTextareaLWC_2";
import cmpTextareaLWC_3 from "@salesforce/label/c.cmpTextareaLWC_3";
import cmpTextareaLWC_4 from "@salesforce/label/c.cmpTextareaLWC_4";

export default class CmpTextareaLWC extends LightningElement {
  label = {
    cmpTextareaLWC_1,
    cmpTextareaLWC_2,
    cmpTextareaLWC_3,
    cmpTextareaLWC_4
  };

  renderedCallback() {
    Promise.all([loadStyle(this, Santander_Icons + "/style.css")]);
  }

  onchangetext(event) {
    console.log(event.target.value);
    this.dispatchEvent(
      new CustomEvent("changetext", { detail: { text: event.target.value } })
    );
  }

  clearText() {
    console.log(this.template.querySelectorAll("textarea-id-01"));
    this.template
      .querySelectorAll("[data-id =textarea-id-01]")
      .forEach((element) => {
        element.value = null;
      });
    this.dispatchEvent(new CustomEvent("changetext", { detail: { text: "" } }));
  }
}
