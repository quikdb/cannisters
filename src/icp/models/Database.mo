import ErrorTypes "../models/ErrorTypes";
import Result "mo:base/Result";

module {
    public type Database = {
        databaseId: Text;
        name: Text;
        datagroupId: Text;
    };

    public func createDatabase(databaseId: Text, name: Text, datagroupId: Text): Result.Result<Database, ErrorTypes.QuikDBError> {
        if (name.size() == 0) {
            return #err(#ValidationError("Database name cannot be empty"));
        } else if (databaseId.size() == 0) {
            return #err(#ValidationError("Database ID cannot be empty"));
        } else if (datagroupId.size() == 0) {
            return #err(#ValidationError("Data group ID cannot be empty"));
        } else {
            let database: Database = {
                databaseId = databaseId;
                name = name;
                datagroupId = datagroupId;
            };
            return #ok(database);
        }
    }
}
