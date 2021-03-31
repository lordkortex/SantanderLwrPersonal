({
    convertListToCSV : function(component, sObjectList){
        if (sObjectList == null || sObjectList.length == 0) {
            sObjectList=[];
            //return null; // 
            for(var i=0; i < 16523; i++){                
                var objeto= {'id':i, 'name':'nombre'+i, 'col3':'col'+i, 'col4':'col'+i, 'col5':'col'+i, 'col5':'col'+i, 'col6':'col'+i, 'col7':'col'+i, 'col8':'col'+i, 'col9':'col'+i, 'col10':'col'+i, 'col11':'col'+i, 'col12':'col'+i, 'col13':'col'+i, 'col14':'col'+i, 'col15':'col'+i};
                sObjectList[i]= objeto;
            }
            //sObjectList = [{'id':'1', 'name':'nombre1'},{'id':'2', 'name':'nombre2'} ];
        }

        // CSV file parameters.
        var columnEnd = ',';
        var lineEnd =  '\n';

        // Get the CSV header from the list.
        var keys = new Set();
        sObjectList.forEach(function (record) {
            Object.keys(record).forEach(function (key) {
                keys.add(key);
            });
        });

        // 
        keys = Array.from(keys);

        var csvString = '';
        csvString += keys.join(columnEnd);
        csvString += lineEnd;

        for(var i=0; i < sObjectList.length; i++){
            var counter = 0;

            for(var sTempkey in keys) {
                var skey = keys[sTempkey] ;

                // add , after every value except the first.
                if(counter > 0){
                    csvString += columnEnd;
                }

                // If the column is undefined, leave it as blank in the CSV file.
                var value = sObjectList[i][skey] === undefined ? '' : sObjectList[i][skey];
                csvString += ''+ value +'';
                counter++;
            }

            csvString += lineEnd;
        }

        return csvString;
    },
})