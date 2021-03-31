({
    /*
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Sets country list
    History:
    <Date>          <Author>            <Description>
    02/06/2020      Shahad Naji         Initial version
    16/06/2020      Bea Hill            Adapted from CMP_PaymentsLandingFilters
    */
    setDropdownList: function (component, helper) {
        let rCountryList = component.get('v.countryDropdownList');
        let countryList = [];
        let countryListAux = [];
        for (let i = 0; i < rCountryList.length; i++) {
            let country = rCountryList[i].countryName;
            if (!$A.util.isEmpty(country)) {
                if (!countryListAux.includes(country)) {
                    countryListAux.push(country);
                    countryList.push({
                        'label' : rCountryList[i].parsedCountryName,
                        'value' : 'chk_' + country
                    });
                }
            }
        }
        var sortCountryList = helper.sortList(component, helper, countryList);
        component.set('v.countryDropdownListSorted', sortCountryList);
    },
    
    /*
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Sorts filters label
    History:
    <Date>          <Author>            <Description>
    02/06/2020      Shahad Naji         Initial version
    16/06/2020      Beatrice Hill       Adapted from CMP_PaymentsLandingFilters
    */
    sortList: function (component, helper, list) {
        var sort;
        var data = list;
        sort = data.sort((a,b) => (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0));
        return sort;
    },

    /*
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Close modal and show body scroll
    History:
    <Date>          <Author>            <Description>
    26/06/2020      Shahad Naji         Initial version
    */
    closeModal: function (component, helper) {
        document.querySelector('.comm-page-custom-landing-payments').style.overflow = 'auto';
        component.set('v.showMethodModal', false);
    }
})