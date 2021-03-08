import { LightningElement,api,track } from 'lwc';

import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';
import {loadStyle} from 'lightning/platformResourceLoader';

import Training_Title from '@salesforce/label/c.Training_Title';
import Payments1 from '@salesforce/label/c.Payments1';
import Payments2 from '@salesforce/label/c.Payments2';
import Beneficiary1 from '@salesforce/label/c.Beneficiary1';
import Beneficiary2 from '@salesforce/label/c.Beneficiary2';
import Users1 from '@salesforce/label/c.Users1';
import Users2 from '@salesforce/label/c.Users2';
import Roles1 from '@salesforce/label/c.Roles1';
import Roles2 from '@salesforce/label/c.Roles2';
import Roles3 from '@salesforce/label/c.Roles3';
import Groups1 from '@salesforce/label/c.Groups1';
import Groups2 from '@salesforce/label/c.Groups2';
import AuthorisationPolicies2 from '@salesforce/label/c.AuthorisationPolicies2';
import AuthorisationPolicies1 from '@salesforce/label/c.AuthorisationPolicies1';
import Payments from '@salesforce/label/c.Payments';
import Beneficiary from '@salesforce/label/c.Beneficiary';
import Users from '@salesforce/label/c.Users';
import Roles from '@salesforce/label/c.Roles';
import Groups from '@salesforce/label/c.Groups';
import AuthorisationPolicies from '@salesforce/label/c.AuthorisationPolicies';


export default class Lwc_training extends LightningElement {
    
    label = {
        Training_Title,
        Payments1,
        Payments2,
        Beneficiary1,
        Beneficiary2,
        Users1,
        Users2,
        Roles1,
        Roles2,
        Roles3,
        Groups1,
        Groups2,
        AuthorisationPolicies1,
        AuthorisationPolicies2,
        Payments,
        Beneficiary,
        Users,
        Roles,
        Groups,
        AuthorisationPolicies
    }

    @api paymentslist;
    @api beneficiarylist;
    @api userslist;
    @api roleslist;
    @api groupslist;
    @api authorisationslist;

    get paymentsListNE(){
        //not(empty(v.paymentsList))
        return (this.paymentslist != undefined && this.paymentslist != null && this.paymentslist != []);
    }
    get beneficiaryListNE(){
        //not(empty(v.beneficiaryList))
        return (this.beneficiarylist != undefined && this.beneficiarylist != null && this.beneficiarylist != []);
    }
    get usersListNE(){
        //not(empty(v.usersList))
        return (this.userslist != undefined && this.userslist != null && this.userslist != []);
    }
    get rolesListNE(){
        //not(empty(v.rolesList))
        return (this.roleslist != undefined && this.roleslist != null && this.roleslist != []);
    }
    get groupsListNE(){
        //not(empty(v.groupsList))
        return (this.groupslist != undefined && this.groupslist != null && this.groupslist != []);
    }
    get authorisationsListNE(){
        //not(empty(v.authorisationsList))
        return (this.authorisationslist != undefined && this.authorisationslist != null && this.authorisationslist != []);
    }

    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');

        //Payments
        var paymentsList = [this.label.Payments1, this.label.Payments2];
        this.paymentslist = paymentsList;
        
        //Beneficiary
        var beneficiaryList = [this.label.Beneficiary1, this.label.Beneficiary2];
        this.beneficiarylist = beneficiaryList;
        
        //Users
        var usersList = [this.label.Users1, this.label.Users2];
        this.userslist = usersList;
        
        //Roles
        var rolesList = [this.label.Roles1, this.label.Roles2, this.label.Roles3];
        this.roleslist = rolesList;
        
        //Groups
        var groupsList = [this.label.Groups1, this.label.Groups2];
        this.groupslist = groupsList;
        
        //Authorisaton policies
        var authorisationsList = [this.label.AuthorisationPolicies1, this.label.AuthorisationPolicies2];
        this.authorisationslist = authorisationsList;
    }

}