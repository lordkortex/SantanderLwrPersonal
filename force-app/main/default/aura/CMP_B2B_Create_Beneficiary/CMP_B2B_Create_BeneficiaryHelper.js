({
    clearInput : function (component, event, helper) {
        component.set('v.accHolder', '');
        let accountData = component.get('v.account');
        accountData.subsidiaryName = '';
        
    },

    setCountry: function(component, event, helper) {
        let countryList = component.get('v.countryList');
        let accountNumber = component.get('v.searchString');
        let countryItem = {};
        let countryCode = '';
        let country = '';
        if (!$A.util.isEmpty(accountNumber)) {
            countryCode = accountNumber.substring(0, 2);
            countryCode = countryCode.toUpperCase();
        }
        if (countryList.some(countryItem => countryItem.value == countryCode)) {
            component.set('v.selectedCountry', countryCode);        
            component.set('v.disableCountryDropdown', true);
            countryItem = countryList.find(countryItem => countryItem.value == countryCode)
            country = countryItem.label;
            let values = [];
            values.push(countryCode);
            component.find('countryDropdown').setSelectedValues(values);
        };
        let accountData = component.get('v.account');
        accountData.country = countryCode;
        accountData.countryName = country;
        accountData.displayNumber = accountNumber;
        component.set('v.account', accountData);
    }

})