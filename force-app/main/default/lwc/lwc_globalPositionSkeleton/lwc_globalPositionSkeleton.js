import { LightningElement } from 'lwc';
import GPSkeleton_didYouKnow from '@salesforce/label/c.GPSkeleton_didYouKnow';
import GPSkeleton_internationalPayments from '@salesforce/label/c.GPSkeleton_internationalPayments';
import GPSkeleton_internationalPayments2 from '@salesforce/label/c.GPSkeleton_internationalPayments2';
import GPSkeleton_balancesAccounts from '@salesforce/label/c.GPSkeleton_balancesAccounts';
import GPSkeleton_trackPayments from '@salesforce/label/c.GPSkeleton_trackPayments';
import GPSkeleton_trackPayments2 from '@salesforce/label/c.GPSkeleton_trackPayments2';
import GPSkeleton_balancesAccounts2 from '@salesforce/label/c.GPSkeleton_balancesAccounts2';
import santanderStyle from '@salesforce/resourceUrl/Santander_Icons';
import Images from '@salesforce/resourceUrl/Images';


export default class Lwc_globalPositionSkeleton extends LightningElement {

    Label = {
		GPSkeleton_didYouKnow,
        GPSkeleton_internationalPayments,
        GPSkeleton_internationalPayments2,
        GPSkeleton_balancesAccounts,
        GPSkeleton_trackPayments,
        GPSkeleton_trackPayments2,
        GPSkeleton_balancesAccounts2
    }

    logoSource = Images + '/logo_symbol_red.svg';
}