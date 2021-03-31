({
	generateXlsFile : function(component, event, helper) {
		let wb = XLSX.utils.book_new();
        wb.Props = {
            Title:"Test sheet",
            Subject: "Test file",
            Author: "Guillermo Giral",
            CreatedDate: new Date()
        };
        wb.SheetNames.push("Test Sheet");
                
        let ws = XLSX.utils.json_to_sheet([
            { A:"S", B:"h", C:"e", D:"e", E:"t", F:"J", G:"S" },
            { A: 1,  B: 2,  C: 3,  D: 4,  E: 5,  F: 6,  G: 7  },
            { A: 2,  B: 3,  C: 4,  D: 5,  E: 6,  F: 7,  G: 8  }
        ], {header:["A","B","C","D","E","F","G"], skipHeader:true});
        
        wb.Sheets["Test Sheet"] = ws;
        
        //var wbout = XLSX.write(wb, {bookType: 'xls', type : 'binary'});
		let filename = "testFile.xls";
		//XLSX.write(wb, filename, {bookType: 'xls', type : 'binary'});
        XLSX.writeFile(wb, filename);
        
    }
})