import ErrorTypes "../models/ErrorTypes";
import Result "mo:base/Result";

module {
    public type DataGroup = {
        groupId: Text;
        name: Text;
    };

    public func createDataGroup(groupId: Text, name: Text, schema: ?Text): Result.Result<DataGroup, ErrorTypes.QuikDBError> {
        if (name.size() == 0) {
            return #err(#ValidationError("DataGroup name cannot be empty"));
        } else {
            let dataGroup: DataGroup = {
                groupId = groupId;
                name = name;
                schema = schema;
            };
            return #ok(dataGroup);
        }
    }
}
