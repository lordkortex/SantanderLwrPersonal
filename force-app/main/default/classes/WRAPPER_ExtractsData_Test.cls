/*----------------------------------------------------------------------------------
Author:         Pablo Tejedor 
Company:        Deloitte
Description:    Test class for WRAPPER_ExtractsData
History
<Date>			<Author>		    <Description>
29/01/2020		Pablo Tejedor     Initial version
----------------------------------------------------------------------------------*/

@IsTest
public class WRAPPER_ExtractsData_Test {
    
    static testMethod void testParse() {
        String json = 
            '{'+
            '  \"accountNumber\": \"0720590942290418123456 \",'+
            '  \"refCliente\": \"234987947239ssf9837249827sdf284793\",'+
            '  \"initialBalance\": \"18935258.51\",'+
            '  \"finalBookBalance\": \"-5342000.39\",'+
            '  \"currencyAux\": \"ARS\",'+
            '  \"debtAmount\": \"-1829,82\",'+
            '  \"creditAmount\": \"78,21\",'+
            '  \"debtNumber\": \"7\",'+
            '  \"creditNumber\": \"2\",'+
            '  \"movements\": ['+
            '                    {'+
            '                      \"accountNumber\": \"0720590942290418123456\",'+
            '                      \"amount\": \"-44.44\",'+
            '                      \"bookBalance\": \"-6125.96\",'+
            '                      \"bookDate\": \"20/11/2019\",'+
            '                      \"category\": \"MSC\",'+
            '                      \"currencyExtract\": \"ARS\",'+
            '                      \"refCliente\": \"234987947239ssf9837249827sdf284793\",'+
            '                      \"refBank\": \"234987947239ssf9837249827sdf284793\",'+
            '                      \"valueDate\": \"20/12/2019\",'+
            '                      \"description\": \"/LTC/0891-Cash deposit /HTC/CHK/AIN/00000002355\"'+
            '                    },'+
            '                    {'+
            '                      \"accountNumber\": \"0720590942290418123456\",'+
            '                      \"amount\": \"-22.34\",'+
            '                      \"bookBalance\": \"-1230.94\",'+
            '                      \"bookDate\": \"20/11/2019\",'+
            '                      \"category\": \"RFG\",'+
            '                      \"currencyExtract\": \"ARS\",'+
            '                      \"refCliente\": \"234987947239ssf9837249827sdf284793\",'+
            '                      \"refBank\": \"234987947239ssf9837249827sdf284793\",'+
            '                      \"valueDate\": \"20/12/2019\",'+
            '                      \"description\": \"/LTC/0891-Cash deposit /HTC/CHK/AIN/00000002355\"'+
            '                    },'+
            '                    {'+
            '                      \"accountNumber\": \"0720590942290418123456\",'+
            '                      \"amount\": \"22.99\",'+
            '                      \"bookBalance\": \"-125.00\",'+
            '                      \"bookDate\": \"20/11/2019\",'+
            '                      \"category\": \"SMS\",'+
            '                      \"currencyExtract\": \"ARS\",'+
            '                      \"refCliente\": \"234987947239ssf9837249827sdf284793\",'+
            '                      \"refBank\": \"234987947239ssf9837249827sdf284793\",'+
            '                      \"valueDate\": \"20/12/2019\",'+
            '                      \"description\": \"/LTC/0891-Cash deposit /HTC/CHK/AIN/00000002355\"'+
            '                    },'+
            '                    {'+
            '                      \"accountNumber\": \"0720590942290418123456\",'+
            '                      \"amount\": \"-631.51\",'+
            '                      \"bookBalance\": \"-50\",'+
            '                      \"bookDate\": \"20/11/2019\",'+
            '                      \"category\": \"OPC\",'+
            '                      \"currencyExtract\": \"ARS\",'+
            '                      \"refCliente\": \"234987947239ssf9837249827sdf284793\",'+
            '                      \"refBank\": \"234987947239ssf9837249827sdf284793\",'+
            '                      \"valueDate\": \"20/12/2019\",'+
            '                      \"description\": \"/LTC/0891-Cash deposit /HTC/CHK/AIN/00000002355\"'+
            '                    },'+
            '                    {'+
            '                      \"accountNumber\": \"0720590942290418123456\",'+
            '                      \"amount\": \"-521.50\",'+
            '                      \"bookBalance\": \"-1000.64\",'+
            '                      \"bookDate\": \"20/11/2019\",'+
            '                      \"category\": \"MSM\",'+
            '                      \"currencyExtract\": \"ARS\",'+
            '                      \"refCliente\": \"234987947239ssf9837249827sdf284793\",'+
            '                      \"refBank\": \"234987947239ssf9837249827sdf284793\",'+
            '                      \"valueDate\": \"20/12/2019\",'+
            '                      \"description\": \"/LTC/0891-Cash deposit /HTC/CHK/AIN/00000002355\"'+
            '                    },'+
            '                    {'+
            '                      \"accountNumber\": \"0720590942290418123456\",'+
            '                      \"amount\": \"-321.66\",'+
            '                      \"bookBalance\": \"-5124.12 \",'+
            '                      \"bookDate\": \"20/11/2019\",'+
            '                      \"category\": \"BBC\",'+
            '                      \"currencyExtract\": \"ARS\",'+
            '                      \"refCliente\": \"234987947239ssf9837249827sdf284793\",'+
            '                      \"refBank\": \"234987947239ssf9837249827sdf284793\",'+
            '                      \"valueDate\": \"20/12/2019\",'+
            '                      \"description\": \"/LTC/0891-Cash deposit /HTC/CHK/AIN/00000002355\"'+
            '                    },'+
            '                    {'+
            '                      \"accountNumber\": \"0720590942290418123456\",'+
            '                      \"amount\": \"-125.31\",'+
            '                      \"bookBalance\": \"-3902.11 \",'+
            '                      \"bookDate\": \"20/11/2019\",'+
            '                      \"category\": \"SGT\",'+
            '                      \"currencyExtract\": \"ARS\",'+
            '                      \"refCliente\": \"234987947239ssf9837249827sdf284793\",'+
            '                      \"refBank\": \"234987947239ssf9837249827sdf284793\",'+
            '                      \"valueDate\": \"20/12/2019\",'+
            '                      \"description\": \"/LTC/0891-Cash deposit /HTC/CHK/AIN/00000002355\"'+
            '                    },'+
            '                    {'+
            '                      \"accountNumber\": \"0720590942290418123456\",'+
            '                      \"amount\": \"-163.06 \",'+
            '                      \"bookBalance\": \"-2042.74 \",'+
            '                      \"bookDate\": \"20/11/2019\",'+
            '                      \"category\": \"ATT\",'+
            '                      \"currencyExtract\": \"ARS\",'+
            '                      \"refCliente\": \"234987947239ssf9837249827sdf284793\",'+
            '                      \"refBank\": \"234987947239ssf9837249827sdf284793\",'+
            '                      \"valueDate\": \"20/12/2019\",'+
            '                      \"description\": \"/LTC/0891-Cash deposit /HTC/CHK/AIN/00000002355\"'+
            '                    },'+
            '                    {'+
            '                      \"accountNumber\": \"0720590942290418123456\",'+
            '                      \"amount\": \"-163.06 \",'+
            '                      \"bookBalance\": \"-2042.74 \",'+
            '                      \"bookDate\": \"20/11/2019\",'+
            '                      \"category\": \"ATT\",'+
            '                      \"currencyExtract\": \"ARS\",'+
            '                      \"refCliente\": \"234987947239ssf9837249827sdf284793\",'+
            '                      \"refBank\": \"234987947239ssf9837249827sdf284793\",'+
            '                      \"valueDate\": \"20/12/2019\",'+
            '                      \"description\": \"/LTC/0891-Cash deposit /HTC/CHK/AIN/00000002355\"'+
            '                    }'+
            '                    '+
            '                ]'+
            '}';
        WRAPPER_ExtractsData obj = WRAPPER_ExtractsData.parse(json);
        System.assert(obj != null, 'The expected wrapper is wrong');
    }
}