import { LightningElement, api } from "lwc";

const columns = [
  { label: "Label", fieldName: "name" },
  { label: "Website", fieldName: "website", type: "url" },
  { label: "Phone", fieldName: "phone", type: "phone" },
  { label: "Balance", fieldName: "amount", type: "currency" },
  { label: "CloseAt", fieldName: "closeAt", type: "date" }
];

export default class CmpOTVBackfrontAccountsParent extends LightningElement {
  @api filters = "";
  @api companyid;
  data = [];
  columns = columns;

  async connectedCallback() {
    /*const data = await getLstUsers().then((results)=>{
            this.data = results;
            console.log('results');
            console.log(results);
        })*/
  }
}
