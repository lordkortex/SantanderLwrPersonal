@isTest
public class testGit_Test {
    
   @IsTest
    public static void testTest(){
		Test.setMock(HttpCalloutMock.class, new TestClass_MockHttp());
        Test.startTest();
    	testGit tgTest = new testGit();
        tgTest.test();
        Test.stopTest();
    }
    
    @IsTest
    public static void listaCuentasTest(){
		Test.setMock(HttpCalloutMock.class, new TestClass_MockHttp());
        Test.startTest();
    	testGit tgTest = new testGit();
        tgTest.listaCuentas('');
        Test.stopTest();
    }
    
    @IsTest
    public static void listaCuentasAyerTest(){
		Test.setMock(HttpCalloutMock.class, new TestClass_MockHttp());
        Test.startTest();
    	testGit tgTest = new testGit();
        tgTest.listaCuentasAyer('');
        Test.stopTest();
    }
    
    @IsTest
    public static void listaDePagosSwiftTest(){
		Test.setMock(HttpCalloutMock.class, new TestClass_MockHttp());
        Test.startTest();
    	testGit tgTest = new testGit();
        tgTest.listaDePagosSwift();
        Test.stopTest();
    }
    
    @IsTest
    public static void detallePagoSwiftTest(){
		Test.setMock(HttpCalloutMock.class, new TestClass_MockHttp());	
        Test.startTest();
        testGit tgTest = new testGit();
    	String data = tgTest.detallePagoSwift('', '');
        Test.stopTest();
    }
    
    @IsTest
    public static void testJWTTest(){
		Test.setMock(HttpCalloutMock.class, new TestClass_MockHttp());
        Test.startTest();
    	testGit tgTest = new testGit();
        tgTest.testJWT();
        Test.stopTest();
    }
    
    /*@IsTest
    public static void testJWT2Test(){

    	testGit tgTest = new testGit();
        tgTest.testJWT2();
    }
    */
    @IsTest
    public static void testFicheroTest(){
		Test.setMock(HttpCalloutMock.class, new TestClass_MockHttp());
        Test.startTest();
    	testGit tgTest = new testGit();
        tgTest.testFichero();
        Test.stopTest();
    }
    
    @IsTest
    public static void inicioNexusTest(){
		Test.setMock(HttpCalloutMock.class, new TestClass_MockHttp());
        Test.startTest();
    	testGit tgTest = new testGit();
        tgTest.inicioNexus();
        Test.stopTest();
    }
    
    @IsTest
    public static void pruebaDetalleDePagoTest(){
		Test.setMock(HttpCalloutMock.class, new TestClass_MockHttp());
        Test.startTest();
    	testGit tgTest = new testGit();
        tgTest.pruebaDetalleDePago('');
        Test.stopTest();
    }
}