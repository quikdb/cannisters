import ErrorTypes "../models/ErrorTypes";
import Result "mo:base/Result";
import Time "mo:base/Time";

module {
    public type Database = {
        projectId: Nat;
        databaseId: Nat;
        name: Text;
        createdBy: Principal;
        createdAt: Time.Time;
    };

    public func createDatabase(projectId: Nat, databaseId: Nat , name: Text, createdBy: Principal): Result.Result<Database, ErrorTypes.QuikDBError> {
        if (name.size() == 0) {
            return #err(#ValidationError("Database name cannot be empty"));
        } else {
            let database: Database = {
                projectId = projectId;
                databaseId = databaseId;
                name = name;
                createdBy = createdBy;
                createdAt = Time.now();
            };
            return #ok(database);
        }
    }
}
