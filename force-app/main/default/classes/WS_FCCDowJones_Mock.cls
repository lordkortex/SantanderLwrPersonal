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
        '    \"search-results\": {' +
        '      \"head\": {' +
        '        \"api-version\": \"1.7.0\",' +
        '        \"backend-version\": \"djrc-1.9.0\",' +
        '        \"total-hits\": \"162\",' +
        '        \"hits-from\": \"0\",' +
        '        \"hits-to\": \"1\",' +
        '        \"truncated\": \"false\",' +
        '        \"cached-results-id\": \"e9b866a8-41ed-4d53-b26e-4c6c635ecc4a\"' +
        '      },' +
        '      \"body\": {' +
        '        \"match\": {' +
        '          \"score\": \"1.0\",' +
        '          \"match-type\": \"PRECISE\",' +
        '          \"payload\": {' +
        '            \"risk-icons\": {' +
        '              \"risk-icon\": \"SI\"' +
        '            },' +
        '            \"primary-name\": \"Medvedev, A.\",' +
        '            \"country-code\": \"NOTK\",' +
        '            \"title\": null,' +
        '            \"subsidiary\": \"false\",' +
        '            \"matched-name\": \"A. Medvedev\",' +
        '            \"dates-of-birth\": null,' +
        '            \"countries\": {' +
        '              \"country\": {' +
        '                \"country-type\": \"Country of Reported Allegation\",' +
        '                \"country-code\": \"KAZK\"' +
        '              },' +
        '              \"country\": {' +
        '                \"country-type\": \"Citizenship\",' +
        '                \"country-code\": \"NOTK\"' +
        '              },' +
        '              \"country\": {' +
        '                \"country-type\": \"Resident of\",' +
        '                \"country-code\": \"NOTK\"' +
        '              }' +
        '            },' +
        '            \"gender\": \"MALE\"' +
        '          }' +
        '        }' +
        '      }' +
        '    }' +
        '}';
    }

    public void setSearchWithOutHits () {
        this.response = '{' +
        '    \"search-results\": {' +
        '      \"head\": {' +
        '        \"api-version\": \"1.7.0\",' +
        '        \"backend-version\": \"djrc-1.9.0\",' +
        '        \"total-hits\": \"0\",' +
        '        \"hits-from\": \"0\",' +
        '        \"hits-to\": \"1\",' +
        '        \"truncated\": \"false\",' +
        '        \"cached-results-id\": \"e9b866a8-41ed-4d53-b26e-4c6c635ecc4a\"' +
        '      }' +
        '    }' +
        '}';
    }
}