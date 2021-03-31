import { LightningElement, track } from "lwc";
import { loadStyle } from "lightning/platformResourceLoader";
import santanderStyle from "@salesforce/resourceUrl/Lwc_Santander_Icons";
import decryptData from "@salesforce/apex/CNT_termsFooter.decryptData";

import privacy from "@salesforce/label/c.privacy";
import privacyNexus1 from "@salesforce/label/c.privacyNexus1";
import privacyNexus2 from "@salesforce/label/c.privacyNexus2";
import privacyNexus3_1 from "@salesforce/label/c.privacyNexus3_1";
import privacyNexus3_2 from "@salesforce/label/c.privacyNexus3_2";
import privacyNexus4 from "@salesforce/label/c.privacyNexus4";
import privacyNexus5 from "@salesforce/label/c.privacyNexus5";
import privacyNexus6 from "@salesforce/label/c.privacyNexus6";
import privacyNexus7 from "@salesforce/label/c.privacyNexus7";
import privacyNexusTitle from "@salesforce/label/c.privacyNexusTitle";
import privacyNexus8 from "@salesforce/label/c.privacyNexus8";
import privacyNexus9 from "@salesforce/label/c.privacyNexus9";

import privacy_es from "@salesforce/label/c.privacy_es";
import privacyNexus1_es from "@salesforce/label/c.privacyNexus1_es";
import privacyNexus2_es from "@salesforce/label/c.privacyNexus2_es";
import privacyNexus3_1_es from "@salesforce/label/c.privacyNexus3_1_es";
import privacyNexus3_2_es from "@salesforce/label/c.privacyNexus3_2_es";
import privacyNexus4_es from "@salesforce/label/c.privacyNexus4_es";
import privacyNexus5_es from "@salesforce/label/c.privacyNexus5_es";
import privacyNexus6_es from "@salesforce/label/c.privacyNexus6_es";
import privacyNexus7_es from "@salesforce/label/c.privacyNexus7_es";
import privacyNexusTitle_es from "@salesforce/label/c.privacyNexusTitle_es";
import privacyNexus8_es from "@salesforce/label/c.privacyNexus8_es";
import privacyNexus9_es from "@salesforce/label/c.privacyNexus9_es";

export default class Lwc_privacy extends LightningElement {
  label = {
    privacy,
    privacy_es,
    privacyNexus1,
    privacyNexus1_es,
    privacyNexus2,
    privacyNexus2_es,
    privacyNexus3_1,
    privacyNexus3_1_es,
    privacyNexus3_2,
    privacyNexus3_2_es,
    privacyNexus4,
    privacyNexus4_es,
    privacyNexus5,
    privacyNexus5_es,
    privacyNexus6,
    privacyNexus6_es,
    privacyNexus7,
    privacyNexus7_es,
    privacyNexusTitle,
    privacyNexusTitle_es,
    privacyNexus8,
    privacyNexus8_es,
    privacyNexus9,
    privacyNexus9_es
  };
  /* Params from Url */
  @track country = "Other";

  get isBrazil() {
    return this.country == "Other" ? true : false;
  }

  get isCashNexus() {
    return this.country == "CN" ? true : false;
  }

  get isSpain() {
    return this.country == "ES" ? true : false;
  }

  get isGreatBritain() {
    return this.country == "GB" ? true : false;
  }

  get isChile() {
    return this.country == "CL" ? true : false;
  }

  get isPoland() {
    return this.country == "PL" ? true : false;
  }

  connectedCallback() {
    loadStyle(this, santanderStyle + "/style.css");

    // capturamos la url y desencriptamos para obtener el pais y el idioma
    var miUrl = window.location.href;
    let newURL = new URL(miUrl).searchParams;
    this.paramsUrl = newURL.get("params");
    this.decrypt(this.paramsUrl);
  }

  // metodo para desencriptar
  decrypt(data) {
    var result = "";
    decryptData({ str: data })
      .then((value) => {
        result = value;
        this.desencriptadoUrl = result;
        var sURLVariables = this.desencriptadoUrl.split("&");
        var sParameterName;

        console.log("sURLVariables: " + sURLVariables);

        for (var i = 0; i < sURLVariables.length; i++) {
          sParameterName = sURLVariables[i].split("=");
          if (sParameterName[0] === "c__country") {
            sParameterName[1] === undefined
              ? "Not found"
              : (this.country = sParameterName[1]);
            console.log("c__country: " + this.country);
          }
        }
      })
      .catch((error) => {
        console.log(error); // TestError
      });
    return result;
  }
}
