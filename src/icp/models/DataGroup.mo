import ErrorTypes "../models/ErrorTypes";
import Result "mo:base/Result";

module {
    public type DataGroup = {
        groupId: Text;
        name: Text;
        databaseId: Text;
    };

    public func createDataGroup(groupId: Text, name: Text, databaseId: Text): Result.Result<DataGroup, ErrorTypes.QuikDBError> {
        if (name.size() == 0) {
            return #err(#ValidationError("DataGroup name cannot be empty"));
        } else if (databaseId.size() == 0) {
            return #err(#ValidationError("Database ID cannot be empty"));
        } else if (groupId.size() == 0) {
            return #err(#ValidationError("DataGroup ID cannot be empty"));
        } else {
            let dataGroup: DataGroup = {
                groupId = groupId;
                name = name;
                databaseId = databaseId;
            };
            return #ok(dataGroup);
        }
    }
}
