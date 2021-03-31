@isTest
public class CSVFileUtil_Test {
    
    @isTest
    public static void parseCSVTest(){
        
        String myString = 'StringToBlob,"test", "test , test"';
    	Blob myBlob = Blob.valueof(myString);
        
        List<List<String>> data = CSVFileUtil.parseCSV(myBlob, true);
    }
}