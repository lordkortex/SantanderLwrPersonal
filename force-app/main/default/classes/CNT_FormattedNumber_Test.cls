@isTest
public class CNT_FormattedNumber_Test {
    
    @isTest
    static void CNT_FormattedNumber_Test(){
        CNT_FormattedNumber obj = new CNT_FormattedNumber('123131125.11424141414', '###.###.###,##');
        Integer intg = 25;
        Decimal dcm = 25.12;
        Double dbl = 25.12;
        CNT_FormattedNumber obj2 = new CNT_FormattedNumber(intg, '###,###,###.##');
        CNT_FormattedNumber obj3 = new CNT_FormattedNumber(dcm, '###,###,###.##');
        CNT_FormattedNumber obj4 = new CNT_FormattedNumber(dbl, '###,###,###.##');
        
    }

}