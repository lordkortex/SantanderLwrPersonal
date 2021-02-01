/*
Author:         Candido
Company:        Deloitte
Description:    Mock class to cover WS_FCCDowJones
History:
<Date>          <Author>                <Description>
18/11/2020      Candido                 Initial version
*/
@isTest
global class WS_FCCDowJones_Mock implements HttpCalloutMock {

    public String response = '';

    global HTTPResponse respond (HTTPRequest req) {
        HttpResponse res = new HttpResponse();
        res.setHeader('Content-Type', 'application/json');
        res.setBody(this.response);
        res.setStatusCode(200);
        return res;
    }

    public void setSearchWithHits () {
        this.response = '{' +
        '    "headerSummary": {                                                              ' +
        '        "totalHits": 1,                                                             ' +
        '        "searchNameResultsList": [                                                  ' +
        '            {                                                                       ' +
        '                "searchName": "Test Name",                                          ' +
        '                "searchResults": {                                                  ' +
        '                    "head": {                                                       ' +
        '                        "apiVersion": "1.7.1",                                      ' +
        '                        "backendVersion": "djrc-1.9.1",                             ' +
        '                        "totalHits": 2,                                             ' +
        '                        "hitsFrom": 0,                                              ' +
        '                        "hitsTo": 2,                                                ' +
        '                        "truncated": false,                                         ' +
        '                        "cachedResultsId": "c21ffe1d-7859-40aa-9049-8f085d3e4e0a"   ' +
        '                    },                                                              ' +
        '                    "body": {                                                       ' +
        '                        "match": [                                                  ' +
        '                            {                                                       ' +
        '                                "score": 1.0,                                       ' +
        '                                "matchType": {                                      ' +
        '                                    "value": "PRECISE",                             ' +
        '                                    "linguisticVariation": false,                   ' +
        '                                    "nonLinguisticVariation": false,                ' +
        '                                    "structuralVariation": false                    ' +
        '                                },                                                  ' +
        '                                "payload": {                                        ' +
        '                                    "riskIcons": {                                  ' +
        '                                        "riskIcon": [                               ' +
        '                                            "PEP"                                   ' +
        '                                        ]                                           ' +
        '                                    },                                              ' +
        '                                    "primaryName": "Pinilla García, Sergio",        ' +
        '                                    "countryCode": "SPAIN",                         ' +
        '                                    "title": "See Previous Roles",                  ' +
        '                                    "subsidiary": false,                            ' +
        '                                    "matchedName": {                                ' +
        '                                        "value": "Sergio Pinilla",                  ' +
        '                                        "nameType": "Also Known As"                 ' +
        '                                    },                                              ' +
        '                                    "matchedDateOfBirth": null,                     ' +
        '                                    "datesOfBirth": {                               ' +
        '                                        "dateOfBirth": [{                           ' +
        '   									 	"year":1991,                             ' +
        '                                           "month":9,                               ' +
        '                                           "day":29                                 ' +
        '                                       }]                                           ' +
        '                                    },                                              ' +
        '                                    "countries": {                                  ' +
        '                                        "country": [                                ' +
        '                                            {                                       ' +
        '                                                "countryType": "Resident of",       ' +
        '                                                "countryCode": "SPAIN"              ' +
        '                                            },                                      ' +
        '                                            {                                       ' +
        '                                                "countryType": "Jurisdiction",      ' +
        '                                                "countryCode": "SPAIN"              ' +
        '                                            },                                      ' +
        '                                            {                                       ' +
        '                                                "countryType": "Citizenship",       ' +
        '                                                "countryCode": "SPAIN"              ' +
        '                                            }                                       ' +
        '                                        ]                                           ' +
        '                                    },                                              ' +
        '                                    "gender": "MALE"                                ' +
        '                                },                                                  ' +
        '                                "peid": "1584910",                                  ' +
        '                                "revision": "2018-04-30 11:55:36.810",              ' +
        '                                "recordType": "PERSON"                              ' +
        '                            }                                                       ' +
        '                        ]                                                           ' +
        '                    }                                                               ' +
        '                }                                                                   ' +
        '            }                                                                       ' +
        '        ]                                                                           ' +
        '    }                                                                               ' +
        '}';
    }

    public void setSearchWithOutHits () {
        this.response = '{' +
        '    "headerSummary": {                                                             ' + 
        '        "totalHits": 0,                                                            ' + 
        '        "searchNameResultsList": [                                                 ' + 
        '            {                                                                      ' + 
        '                "searchName": "Test Name",                                         ' + 
        '                "searchResults": {                                                 ' + 
        '                    "head": {                                                      ' + 
        '                        "apiVersion": "1.7.1",                                     ' + 
        '                        "backendVersion": "djrc-1.9.1",                            ' + 
        '                        "totalHits": 0,                                            ' + 
        '                        "hitsFrom": 0,                                             ' + 
        '                        "hitsTo": 0,                                               ' + 
        '                        "truncated": false,                                        ' + 
        '                        "cachedResultsId": "35e3ab70-59b4-4ee2-b38e-f8bf49a067b3"  ' + 
        '                        },                                                         ' +
        '                        "body": {                                                  ' +
        '                            "match": []                                            ' +
        '                        }                                                          ' +
		'				}                                                                   ' +
		'			}                                                                       ' +
		'		]                                                                           ' +
		'	}                                                                               ' +
		'}';
    }
}