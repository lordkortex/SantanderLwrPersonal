global class WRAPPER_B2B_SignatureStructure {

	global StructureListResponse structureListResponse;
	global String paymentID;

	global class StructureListResponse {
		global List<GroupDataDetails> groupDataDetails;
        global StructureListResponse(){
            System.debug('WRAPPER_B2B_SignatureStructure.StructureListResponse');
        }
	}

	global class UserList {
		global String userId;
        
        global UserList(){
            System.debug('WRAPPER_B2B_SignatureStructure.UserList');
        }
	}

	global class GroupDataDetails {
		global String groupDescription;
		global String groupId;
		global String groupLevel;
		global String signsRequired;
		global List<UserList> userList;
        
        global GroupDataDetails(){
            System.debug('WRAPPER_B2B_SignatureStructure.GroupDataDetails');
        }
	}

	
	global static WRAPPER_B2B_SignatureStructure parse(String json) {
		return (WRAPPER_B2B_SignatureStructure) System.JSON.deserialize(json, WRAPPER_B2B_SignatureStructure.class);
	}
}