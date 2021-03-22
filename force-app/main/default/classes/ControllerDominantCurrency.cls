/*
    Author:         Andrea Martin
    Company:        Deloitte
    Description:    Makes a call to get the dominant currency 

    History:
    <Date>          <Author>            <Description>
    08/02/2021      Andrea Martin         Initial version
*/
public class ControllerDominantCurrency {
    public static ReturnValue getDominantCurrency (WrapperUserData userData, String currencyOrigin, String currencyDestination) {
        ReturnValue response = null;
        try {
            String res = ServiceDominantCurrency.executeGetDominantCurrency(userData, currencyOrigin, currencyDestination);
            if(res != null){
                Map<String, Object> value = new Map<String, Object>();
                value.put('result', res);
                response = new ReturnValue(true, value);
            }else{
                throw new CustomException('Error obtaining the server response.');
            }

        } catch (Exception e) {
            System.debug('ControllerDominantCurrency.getDominantCurrency: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }
}