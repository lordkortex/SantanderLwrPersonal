global with sharing class WRAPPER_FX_Download {

	@AuraEnabled global String searchFileContent {get; set;}

	
	public static WRAPPER_FX_Download parse(String json) {
		return (WRAPPER_FX_Download) System.JSON.deserialize(json, WRAPPER_FX_Download.class);
	}
}