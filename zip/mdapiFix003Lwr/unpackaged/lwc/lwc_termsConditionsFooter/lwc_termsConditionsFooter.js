import { LightningElement } from "lwc";
import { loadStyle } from "lightning/platformResourceLoader";

// Import styles
import santanderStyle from "@salesforce/resourceUrl/Lwc_Santander_Icons";

// Import labels
import termsConditionsUse from "@salesforce/label/c.termsConditionsUse";
import termsConditions from "@salesforce/label/c.termsConditions";
import terms1a from "@salesforce/label/c.terms1a";
import terms1b from "@salesforce/label/c.terms1b";
import terms2 from "@salesforce/label/c.terms2";
import terms3 from "@salesforce/label/c.terms3";
import terms4 from "@salesforce/label/c.terms4";
import terms5a from "@salesforce/label/c.terms5a";
import terms5b from "@salesforce/label/c.terms5b";
import terms6a from "@salesforce/label/c.terms6a";
import terms6b from "@salesforce/label/c.terms6b";
import terms7 from "@salesforce/label/c.terms7";
import terms8 from "@salesforce/label/c.terms8";
import terms9 from "@salesforce/label/c.terms9";
import terms10 from "@salesforce/label/c.terms10";
import terms11 from "@salesforce/label/c.terms11";
import terms12 from "@salesforce/label/c.terms12";
import terms13 from "@salesforce/label/c.terms13";
import terms14 from "@salesforce/label/c.terms14";
import modifications from "@salesforce/label/c.modifications";
import lawJurisdiction from "@salesforce/label/c.lawJurisdiction";
import acceptTerms from "@salesforce/label/c.acceptTerms";
import continueLabel from "@salesforce/label/c.continue";
import intelectualProperty from "@salesforce/label/c.intelectualProperty";
import responsibility from "@salesforce/label/c.responsibility";
import webNexus from "@salesforce/label/c.webNexus";
import termsNexus1 from "@salesforce/label/c.termsNexus1";
import termsNexus2 from "@salesforce/label/c.termsNexus2";
import termsNexus3 from "@salesforce/label/c.termsNexus3";
import termsNexus4 from "@salesforce/label/c.termsNexus1";
import termsNexus5 from "@salesforce/label/c.termsNexus4";
import termsNexus6 from "@salesforce/label/c.termsNexus6";
import termsNexus7 from "@salesforce/label/c.termsNexus7";
import termsNexus8 from "@salesforce/label/c.termsNexus8";
import termsNexus9 from "@salesforce/label/c.termsNexus9";
import termsNexus10 from "@salesforce/label/c.termsNexus10";
import termsNexus11 from "@salesforce/label/c.termsNexus11";
import termsNexus12 from "@salesforce/label/c.termsNexus12";
import termsNexus13 from "@salesforce/label/c.termsNexus13";
import termsNexus14_1 from "@salesforce/label/c.termsNexus14_1";
import termsNexus14_2 from "@salesforce/label/c.termsNexus14_2";
import termsNexus15 from "@salesforce/label/c.termsNexus15";
import termsNexus16 from "@salesforce/label/c.termsNexus16";
import termsNexus17 from "@salesforce/label/c.termsNexus17";
import termsNexus18 from "@salesforce/label/c.termsNexus18";
import termsNexus19 from "@salesforce/label/c.termsNexus19";
import termsNexus20_1 from "@salesforce/label/c.termsNexus20_1";
import termsNexus20_2 from "@salesforce/label/c.termsNexus20_2";
import termsNexus21 from "@salesforce/label/c.termsNexus21";
import termsNexusTitle1 from "@salesforce/label/c.termsNexusTitle1";
import termsNexusTitle2 from "@salesforce/label/c.termsNexusTitle2";
import termsNexusTitle3 from "@salesforce/label/c.termsNexusTitle3";
import termsNexusTitle4 from "@salesforce/label/c.termsNexusTitle4";

// Import apex methods
import getBodyContent from "@salesforce/apex/CNT_TermsConditions_Controller.getBodyContent";
import decryptData from "@salesforce/apex/CNT_termsFooter.decryptData";

export default class Lwc_termsConditionsFooter extends LightningElement {
  /*GB: {termsConditionsUse, termsConditions, terms3, terms4, webNexus, terms1a, terms1b, terms2, terms5a, terms6a, terms7, 
        terms8, terms9, terms10, terms11, terms12, terms13, terms14, modifications, lawJurisdiction, terms5b,
        terms6b, intelectualProperty, responsibility, acceptTerms, continueLabel},*/

  label = {
    GB: {},

    ES: {
      termsConditionsUse,
      termsConditions,
      terms3,
      terms4,
      webNexus,
      terms1a,
      terms1b,
      terms2,
      terms5a,
      terms6a,
      terms7,
      terms8,
      terms9,
      terms10,
      terms11,
      terms12,
      terms13,
      terms14,
      modifications,
      lawJurisdiction,
      terms5b,
      terms6b,
      intelectualProperty,
      responsibility,
      acceptTerms,
      continueLabel
    },

    CN: {
      termsConditions,
      termsNexus1,
      termsNexus2,
      termsNexus3,
      termsNexus4,
      termsNexus5,
      termsNexus6,
      termsNexus7,
      termsNexus8,
      termsNexus9,
      termsNexus10,
      termsNexus11,
      termsNexus12,
      termsNexus13,
      termsNexus14_1,
      termsNexus14_2,
      termsNexus15,
      termsNexus16,
      termsNexus17,
      termsNexus18,
      termsNexus19,
      termsNexus20_1,
      termsNexus20_2,
      termsNexus21,
      termsNexusTitle1,
      termsNexusTitle2,
      termsNexusTitle3,
      termsNexusTitle4,
      acceptTerms,
      continueLabel
    },

    MX: {
      termsConditions,
      termsNexus1,
      termsNexus2,
      termsNexus3,
      termsNexus4,
      termsNexus5,
      termsNexus6,
      termsNexus7,
      termsNexus8,
      termsNexus9,
      termsNexus10,
      termsNexus11,
      termsNexus12,
      termsNexus13,
      termsNexus14_1,
      termsNexus14_2,
      termsNexus15,
      termsNexus16,
      termsNexus17,
      termsNexus18,
      termsNexus19,
      termsNexus20_1,
      termsNexus20_2,
      termsNexus21,
      termsNexusTitle1,
      termsNexusTitle2,
      termsNexusTitle3,
      termsNexusTitle4,
      acceptTerms,
      continueLabel
    },

    PL: { acceptTerms, continueLabel },

    CL: { acceptTerms, continueLabel },

    Other: { acceptTerms, continueLabel }
  };

  lang;
  country;
  filename;
  paramsUrl;

  connectedCallback() {
    loadStyle(this, santanderStyle + "/style.css");

    var miUrl = window.location.href;
    let newURL = new URL(miUrl).searchParams;
    this.paramsUrl = newURL.get("params");

    console.log("parametros url: " + this.paramsUrl);

    decryptData({ str: this.paramsUrl })
      .then((value) => {
        var result = value;
        this.desencriptadoUrl = result;
        var sURLVariables = this.desencriptadoUrl.split("&");
        var sParameterName;

        console.log("en decrypt");

        for (var i = 0; i < sURLVariables.length; i++) {
          sParameterName = sURLVariables[i].split("=");
          if (sParameterName[0] === "c__country") {
            console.log(
              "sParameterName[0][1]: " +
                sParameterName[0] +
                "/" +
                sParameterName[1]
            );
            sParameterName[1] === undefined
              ? "Not found"
              : (this.country = sParameterName[1]);
            console.log("EN DECR GET c__country: " + this.country);
          }
          if (sParameterName[0] === "c__language") {
            sParameterName[1] === undefined
              ? "Not found"
              : (this.lang = sParameterName[1]);
            console.log("EN DECR GET c__language: " + this.lang);
          }
        }
        if (this.lang == "polish")
          this.filename = "TermsConditionsFooter" + this.country + this.lang;
        else this.filename = "TermsConditionsFooter" + this.country;

        console.log("filename: " + this.filename);

        getBodyContent({ fileName: this.filename })
          .then((value) => {
            // setTimeout(() => {
            var resultado = value;
            Object.keys(this.label[this.country]).forEach((labeKey) => {
              try {
                resultado = resultado.replaceAll(
                  "label." + labeKey,
                  this.label[this.country][labeKey]
                );
                resultado = resultado.replaceAll("{", "");
                resultado = resultado.replaceAll("}", "");
              } catch (e) {}
            });
            // Se hace esto debido a que continue es una palabra reservada
            try {
              resultado = resultado.replaceAll(
                "label.continue",
                this.label[this.country].continueLabel
              );
            } catch (e) {}

            var element = this.template.querySelector(
              '[data-id="add-to-html"]'
            );
            var child = document.createElement("div");
            child.innerHTML = resultado;
            element.appendChild(child);
          })
          .catch((error) => {
            console.log(error); // TestError
          });
      })
      .catch((error) => {
        console.log(error); // TestError
      });
  }
}
