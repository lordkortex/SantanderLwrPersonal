public class WRAPPER_PersistCompany {

	public String companyGlobalId;
	public String segmentTypeGlobal;

	
	public static WRAPPER_PersistCompany parse(String json) {
		return (WRAPPER_PersistCompany) System.JSON.deserialize(json, WRAPPER_PersistCompany.class);
	}
}