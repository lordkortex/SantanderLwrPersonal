@isTest
public class STR_ControllerStructurals_Test {

    @TestSetup
    static void setup(){
        DataFactory.createWsConfigurationSetting(true);
        DataFactory.createAccount();
    }
}