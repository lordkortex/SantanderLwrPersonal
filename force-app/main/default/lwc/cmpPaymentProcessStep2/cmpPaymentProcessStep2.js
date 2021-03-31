import { LightningElement, api } from 'lwc';

//Style
import { loadStyle } from 'lightning/platformResourceLoader';
import style from '@salesforce/resourceUrl/Santander_Icons';
import Images from '@salesforce/resourceUrl/Images';

//Labels
import PAY_whichAccountReceivePayment from '@salesforce/label/c.PAY_whichAccountReceivePayment';
import beneficiaryAccount from '@salesforce/label/c.beneficiaryAccount';
import B2B_Clear_text_input from '@salesforce/label/c.B2B_Clear_text_input';
import PAY_AliasOrAccountNumber from '@salesforce/label/c.PAY_AliasOrAccountNumber';
import PAY_ErrorIncorrectInput from '@salesforce/label/c.Error_Incorrect_user_input_format';
import B2B_Suggestions_for from '@salesforce/label/c.B2B_Suggestions_for';
import PAY_5Results from '@salesforce/label/c.PAY_5Results';
import PAY_ES210049 from '@salesforce/label/c.PAY_ES210049';
import PAY_NoAccountsRegistered from '@salesforce/label/c.WaitingAuthorizationResendHelp2';
import PAY_ES53422352082414205416 from '@salesforce/label/c.PAY_NoAccountsRegistered';
import newBeneficiary from '@salesforce/label/c.newBeneficiary';
import PT50000201231234567890154 from '@salesforce/label/c.PT50000201231234567890154';
import LisbonSupplies from '@salesforce/label/c.LisbonSupplies';
import Registered from '@salesforce/label/c.Registered';
import Inktec from '@salesforce/label/c.Inktec';
import BancoSantanderPortugal from '@salesforce/label/c.BancoSantanderPortugal';
import Portugal from '@salesforce/label/c.Portugal';
import EUR from '@salesforce/label/c.EUR';
import BrowseAccounts from '@salesforce/label/c.BrowseAccounts';
import RecipientInformation from '@salesforce/label/c.RecipientInformation';
import Balance42362762736251452631 from '@salesforce/label/c.Balance42362762736251452631';
import GreenMex from '@salesforce/label/c.GreenMex';
import GreenMexSA from '@salesforce/label/c.GreenMexS_A';
import Mexico from '@salesforce/label/c.Mexico';
import MXN from '@salesforce/label/c.MXN';
import B2B_Beneficiary_details from '@salesforce/label/c.B2B_Beneficiary_details';
import PAY_AccountHolder from '@salesforce/label/c.PAY_AccountHolder';
import RobertoFernandezGreenMex from '@salesforce/label/c.RobertoFernandezGreenMex';
import RecipientBank from '@salesforce/label/c.RecipientBank';
import SantanderMexico from '@salesforce/label/c.SantanderMexico';
import B2B_Swift_code from '@salesforce/label/c.B2B_Swift_code';
import BMSXMXMMXXX from '@salesforce/label/c.BMSXMXMMXXX';
import B2B_Button_Continue from '@salesforce/label/c.B2B_Button_Continue';


export default class CmpPaymentProcessStep2 extends LightningElement {

    logo_symbol_red = Images + '/logo_symbol_red.svg';

    // Expose the labels to use in the template.
    label = {
        PAY_whichAccountReceivePayment,
        beneficiaryAccount,
        B2B_Clear_text_input,
        PAY_AliasOrAccountNumber,
        PAY_ErrorIncorrectInput,
        B2B_Suggestions_for,
        PAY_5Results,
        PAY_ES210049,
        PAY_ES53422352082414205416,
        PAY_NoAccountsRegistered,
        newBeneficiary,
        PT50000201231234567890154,
        LisbonSupplies,
        Registered,
        Inktec,
        BancoSantanderPortugal,
        Portugal,
        EUR,
        BrowseAccounts,
        RecipientInformation,
        Balance42362762736251452631,
        GreenMex,
        GreenMexSA,
        Mexico,
        MXN,
        B2B_Beneficiary_details,
        PAY_AccountHolder,
        RobertoFernandezGreenMex,
        RecipientBank,
        SantanderMexico,
        B2B_Swift_code,
        BMSXMXMMXXX,
        B2B_Button_Continue
    };

    //Load Icons and Style
    PT = Images + '/PT.svg';
    MX = Images + '/MX.svg';
    
    @api accountList = [];


    renderedCallback() {
        Promise.all([
            loadStyle(this, style + '/style.css') //specified filename
        ]).then(() => {
            //console.log('Files loaded.');
        }).catch(error => {
            console.log("Error " + error.body.message);
        });
    }

    goToLanding(event){
        event.preventDefault();
        const selectEvent = new CustomEvent('goToLanding');
        this.dispatchEvent(selectEvent);
    }


}