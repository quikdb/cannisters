import ErrorTypes "../models/ErrorTypes";
import Result "mo:base/Result";

module {
    public type Database = {
        databaseId: Text;
        name: Text;
        projectId: Text;
    };

    public func createDatabase(databaseId: Text, name: Text, projectId: Text): Result.Result<Database, ErrorTypes.QuikDBError> {
        if (name.size() == 0) {
            return #err(#ValidationError("Database name cannot be empty"));
        } else if (databaseId.size() == 0) {
            return #err(#ValidationError("Database ID cannot be empty"));
        } else if (projectId.size() == 0) {
            return #err(#ValidationError("Projecct ID cannot be empty"));
        } else {
            let database: Database = {
                databaseId = databaseId;
                name = name;
                projectId = projectId;
            };
            return #ok(database);
        }
    }
}
