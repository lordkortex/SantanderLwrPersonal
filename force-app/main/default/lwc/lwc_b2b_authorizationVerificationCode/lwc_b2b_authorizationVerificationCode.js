import { LightningElement, api, track} from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';

//Import style
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

//Import labels
import OTPExpiredRequestNew from '@salesforce/label/c.OTPExpiredRequestNew';
import OTPWrongCheckSMS from '@salesforce/label/c.OTPWrongCheckSMS';
import B2B_Button_Back from '@salesforce/label/c.B2B_Button_Back';
import newCode from '@salesforce/label/c.newCode';
import enterOTP from '@salesforce/label/c.enterOTP';
import SMSNotReceived from '@salesforce/label/c.SMSNotReceived';
import HelpAuthorizationCard from '@salesforce/label/c.HelpAuthorizationCard';
import exchangeRate from '@salesforce/label/c.exchangeRate';
import help from '@salesforce/label/c.help';
import Authorize from '@salesforce/label/c.Authorize';
import EnterVerificationCode from '@salesforce/label/c.EnterVerificationCode';
import VerificationCode from '@salesforce/label/c.VerificationCode';
import NumberOfPayments from '@salesforce/label/c.NumberOfPayments';
import ReferenceNumberTotalSum from '@salesforce/label/c.ReferenceNumberTotalSum';


export default class Lwc_b2b_account_suggestion extends LightningElement {

    label = {
        OTPExpiredRequestNew,
        OTPWrongCheckSMS,
        B2B_Button_Back,
        newCode,
        enterOTP,
        SMSNotReceived,
        HelpAuthorizationCard,
        exchangeRate,
        help,
        Authorize,
        EnterVerificationCode,
        VerificationCode,
        NumberOfPayments,
        ReferenceNumberTotalSum
    }

    @api userdata = {};
    @api accountdata = {};
    @api spinner = false;
    @api resendaction 
    @api disabledconfirm; //Default true. 
    @api errormessage = ''; //Can be {label.OTPWrongCheckSMS} or {label.OTPExpiredRequestNew}
    @api tokenok = false; 
    @api backaction
    @api authorizeaction
    @api totalamount = 0;
    @api authorize = this.label.Authorize;
    @api back = this.label.B2B_Button_Back; 
    @api otp; 

    @track cardTitle = this.label.VerificationCode;
    @track cardSubtitle1 = this.label.NumberOfPayments;
    @track cardSubtitle2 = this.label.ReferenceNumberTotalSum
    @track cardText = this.label.EnterVerificationCode;
    @track numberOfPayments = 1;
    @track phone = '69*****25'; 

    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
        this.disabledconfirm = true;
    }

    isErrorEqOPTExpired(){
       return this.errormessage == this.label.OTPExpiredRequestNew; 
    }
    checkNumber() {
        var value = document.getElementById(event.target.id).value;
        var input = event.target;
        if(value != null && value != '' && value!=undefined){
            let validRegExp = new RegExp('[0-9]');
            let isInputValid = validRegExp.test(value);
            if (isInputValid != true ){
                document.getElementById(event.target.id).value = '';
            }else{
                var currentInt = parseInt(event.target.id);
                if(event.target.id!=6){
                    document.getElementById((currentInt+1).toString()).focus();
                }
            }
        }
        this.checkOTP();
    }

    checkOTP() {
        //Get all numbers
        var input1 = document.getElementById("1").value;
        var input2 = document.getElementById("2").value;
        var input3 = document.getElementById("3").value;
        var input4 = document.getElementById("4").value;;
        var input5 = document.getElementById("5").value;
        var input6 = document.getElementById("6").value;

        var inputOTP = input1+input2+input3+input4+input5+input6;

        this.otp = inputOTP;
    }
}