/*
    Author:         Andrea Martin
    Company:        Deloitte
    Description:    Makes a call to get the dominant currency 

    History:
    <Date>          <Author>            <Description>
    08/02/2021      Andrea Martin         Initial version
    */
global class ServiceDominantCurrency {
  global static String executeGetDominantCurrency(
    WrapperUserData userData,
    String currencyOrigin,
    String currencyDestination
  ) {
    WS_DominantCurrency.OUTPUT output = new WS_DominantCurrency.OUTPUT();
    String dominantCurrency = null;
    try {
      WRAPPER_AccountList.AccountDetails sourceAccount;
      String userId;
      if (userData != null && userData.userId != null) {
        userId = userData.userId;
      } else {
        throw new CustomException('Empty user data');
      }

      WS_DominantCurrency ws_DominantCurrency = new WS_DominantCurrency(
        userId,
        currencyOrigin,
        currencyDestination
      );
      output = ws_DominantCurrency.execute();
      dominantCurrency = getDominantCurrency(output);
    } catch (Exception e) {
      System.debug(
        'ServiceDominantCurrency.executeGetDominantCurrency: ' +
        e.getMessage() +
        ', in line: ' +
        e.getLineNumber()
      );
      throw new CustomException(e.getMessage());
    }
    return dominantCurrency;
  }

  global static String getDominantCurrency(
    WS_DominantCurrency.OUTPUT wsDominantCurrency
  ) {
    String dominantCurrency = null;
    try {
      if (
        wsDominantCurrency != null &&
        wsDominantCurrency.currencyPairListResponse != null
      ) {
        dominantCurrency = wsDominantCurrency.currencyPairListResponse[0]
          .dominantCurrency;
      } else {
        throw new CustomException('Empty response WS_DominantCurrency.');
      }
    } catch (Exception e) {
      System.debug(
        'ServiceDominantCurrency.executeGetDominantCurrency: ' +
        e.getMessage() +
        ', in line: ' +
        e.getLineNumber()
      );
      throw new CustomException(e.getMessage());
    }
    return dominantCurrency;
  }
}
