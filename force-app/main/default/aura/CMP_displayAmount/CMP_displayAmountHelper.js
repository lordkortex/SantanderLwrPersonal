({
    /*
    Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Function to format the amount input
    History
    <Date>			<Author>		<Description>
    27/11/2019		R. Alexander Cervino     Initial version*/

    formatAmount: function (component) {

        // try{
        //     var amount=component.get("v.amount");

        //     if(amount!=undefined && amount!=null){
        //         var a=new Array();
        //         a=amount.toString().split('.');;

        //         if(a[1]==undefined || a[1]==null){
        //             component.set("v.decimal","00");
        //         }else{
        //             component.set("v.decimal",a[1]);
        //         }
        //         component.set("v.whole",a[0]);
        //     }    
        // } catch (e) {
        //     // Handle error
        //     console.error(e);
        // }   
    },


    formatNumber: function (component, event, helper) {

        //REGISTER FIRST LOCALE
        if (Object.keys(numeral.locales).length == 1) {
            numeral.register('locale', 'type1',
                {
                    delimiters: {
                        thousands: '.',
                        decimal: ','
                    },
                    abbreviations:
                    {
                        thousand: 'K',
                        million: 'M',
                        billion: 'B',
                        trillion: 'T'
                    },
                    ordinal: function (number) {
                        return '';
                    },
                    currency:
                    {
                        symbol: '€'
                    }
                });

            //REGISTER SECOND LOCALE
            numeral.register('locale', 'type2',
                {
                    delimiters: {
                        thousands: ',',
                        decimal: '.'
                    },
                    abbreviations:
                    {
                        thousand: 'K',
                        million: 'M',
                        billion: 'B',
                        trillion: 'T'
                    },
                    ordinal: function (number) {
                        return '';
                    },
                    currency:
                    {
                        symbol: '€'
                    }
                });

        }
        component.find("Service").callApex2(component, helper, "c.getUserNumberFormat", { userId: $A.get("$SObjectType.CurrentUser.Id") }, helper.setData);

    },

    setData: function (component, helper, response) {
        var amount;
        if (component.get("v.amount") != undefined) {
            amount = component.get("v.amount").toString().replace(',', '.');
        }
        component.set("v.userFormat", response);

        // if(component.get("v.fromGPI")){
        //REGISTER FIRST LOCALE
        if (Object.keys(numeral.locales).length == 1) {
            numeral.register('locale', 'type1',
                {
                    delimiters: {
                        thousands: '.',
                        decimal: ','
                    },
                    abbreviations:
                    {
                        thousand: 'K',
                        million: 'M',
                        billion: 'B',
                        trillion: 'T'
                    },
                    ordinal: function (number) {
                        return '';
                    },
                    currency:
                    {
                        symbol: '€'
                    }
                });

            //REGISTER SECOND LOCALE
            numeral.register('locale', 'type2',
                {
                    delimiters: {
                        thousands: ',',
                        decimal: '.'
                    },
                    abbreviations:
                    {
                        thousand: 'K',
                        million: 'M',
                        billion: 'B',
                        trillion: 'T'
                    },
                    ordinal: function (number) {
                        return '';
                    },
                    currency:
                    {
                        symbol: '€'
                    }
                });

        }
        //  }

        if (response == '###.###.###,##') {
            numeral.locale('type1');
        } else {
            numeral.locale('type2');
        }

        if (amount != undefined) {
            var splitted = amount.split(".");

            if (splitted[0] != undefined) {
                component.set("v.whole", numeral(splitted[0]).format('0,0'));

            }
            var wholeDecimal = component.get("v.wholeDecimal");
            if (!wholeDecimal) {
                if (splitted[1] != undefined) {
                    var a = parseFloat('1.' + splitted[1]);
                    component.set("v.decimal", numeral(a).format('.00'));
                }
                else {
                    component.set("v.decimal", numeral(0.00).format('.00'));

                }
            } else {
                if (splitted[1] != undefined) {
                    var a = parseFloat('1.' + splitted[1]);
                    console.log("INT");
                    var numberDecimal = parseInt(component.get("v.numberOfDec"));
                    if(splitted[1].length < component.get("v.numberOfDec")){
						numberDecimal = splitted[1].length;
                    }
                    console.log(parseInt(component.get("v.numberOfDec")));
                        var dec = '.';
                        for (var i = 0; i < numberDecimal; i++) {
                            dec += '0';
                        }
                    console.log(splitted[1].length);
                    console.log(component.get("v.numberOfDec"));
                    component.set("v.decimal", numeral(a).format(dec));
                
                }
                else {
                    //component.set("v.decimal", "." + numeral(0.00).format(dec));
                    component.set("v.decimal", "");
                }
            }
            
            
            component.set("v.outputString", component.get("v.whole")+component.get("v.decimal")+' '+component.get("v.currency"));
            console.log("out");
            console.log(component.get("v.outputString"));

        }

    }
})