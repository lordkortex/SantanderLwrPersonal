/*
    Author:        	Bea Hill
    Company:        Deloitte
    Description:    Get user info, set mock data for demo, and get params from URL
    History:
    <Date>          <Author>            <Description>
    19/06/2020      Bea Hill            Initial version
*/

import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import { LightningElement, track, api, wire } from "lwc";
import { NavigationMixin } from 'lightning/navigation';
import { helper  } from './lwc_groupNewParentHelper.js';


//CNT_GroupController

export default class Lwc_groupNewParent extends NavigationMixin(LightningElement) {

  @api maxWidth = 1184; //Default width for the page container
  @api stage1Finished = false; //
  @api currentStageNumber = 1; //Current stage of the group creation
  @api groupName; //Name of the group that is getting created
  @api groupToCopy; //Where is the group beeing copied from
  @api tabSelected; //Tab selected at step 2 of the group creation
  @api comesFromGroups = false; //Checks if the component comes from groups
  @api showModal = false; //Flag to show/hide the confirmation modal

  @api Step2dataExpanded = false; //Checks if the values are expanded
  @api entitlementName = "Downloads entitlement"; //Name of the entitlement
  @api hasProfile = false; //checks if has profiling the page where this comes from
  @api servicesList = []; //Services from the step 2

  @api profilingTableExpanded = false; //Expands the profiling table details
  @api profilingTableInnerData = []; //Data to be grouped in the table

  /*
	Author:        	Bea Hill
  Company:        Deloitte
	Description:    Get user info, set mock data for demo, and get params from URL
  History:
  <Date>          <Author>            <Description>
	19/06/2020      Bea Hill            Initial version
  */
  connectedCallback() {
    this.Step2dataExpanded = true;
    this.profilingTableExpanded = true;
    
    loadStyle(this, santanderStyle + "/style.css");
    this.doInit();
  }

  get styleMaxWith() {
      return 'width:' + this.maxWidth + 'px;';
  }

  get isCurrentStageNumber1() {
    return this.currentStageNumber === 1;
  }

  get isCurrentStageNumber2() {
      return this.currentStageNumber === 2;
  }

  get isShowModal(){
      return this.showModal;
  }

}