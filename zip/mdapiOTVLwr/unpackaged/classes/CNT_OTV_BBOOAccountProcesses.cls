public class CNT_OTV_BBOOAccountProcesses {
  public class PBVariables {
    @InvocableVariable
    public Account account;

    @InvocableVariable
    public String oldParent;

    @InvocableVariable
    public String newParent;
  }

  @InvocableMethod
  public static void handleHierarchyChange(List<PBVariables> pbVariables) {
  }
}
