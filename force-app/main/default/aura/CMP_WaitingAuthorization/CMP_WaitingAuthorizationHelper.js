({
	 /*
    Author:        	Cerviño
    Company:        Deloitte
    Description:    Go to page with lightning navigation
    History:
    <Date>          <Author>            <Description>
    30/10/2020      Cerviño            Adapted from CMP_AccountsCardRow
    */
    goTo: function (component, event, page, url) {
        let navService = component.find('navService');
        if (url != '') {
            this.encrypt(component, url)
            .then($A.getCallback(function (results) {
                let pageReference = {
                    'type': 'comm__namedPage',
                    'attributes': {
                        'pageName': page
                    },
                    'state': {
                        'params': results
                    }
                }
                navService.navigate(pageReference);
            }));
        } else {
            let pageReference = {
                'type': 'comm__namedPage',
                'attributes': {
                    'pageName': page
                },
                'state': {
                    'params': ''
                }
            }
            navService.navigate(pageReference);
        }
    }
})