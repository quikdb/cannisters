import ErrorTypes "../models/ErrorTypes";
import Result "mo:base/Result";
import Time "mo:base/Time";
import Principal "mo:base/Principal";

module {

    /// Represents a Database within a project.
    ///
    /// A `Database` is a logical container within a project, used to organize and store data groups. Each `Database` is uniquely
    /// identified by its `databaseId` and is associated with a specific project through its `projectId`.
    ///
    /// Fields:
    /// - `projectId`: The identifier for the project to which this database belongs.
    /// - `databaseId`: The unique identifier for the database.
    /// - `name`: The name of the database.
    /// - `createdBy`: The `Principal` of the user who created the database.
    /// - `createdAt`: The timestamp indicating when the database was created.
    public type Database = {
        projectId: Nat;
        databaseId: Nat;
        name: Text;
        createdBy: Principal;
        createdAt: Time.Time;
    };

    /// Creates a new `Database`.
    ///
    /// This function attempts to create a new database within a specific project. It validates the provided inputs, ensuring that
    /// the database name is not empty and that the `Principal` identifier is valid. If the inputs are valid, a new `Database` is created
    /// and returned; otherwise, an error is returned.
    ///
    /// # Arguments
    ///
    /// - `projectId`: The identifier for the project to which this database will belong.
    /// - `databaseId`: The unique identifier for the database to be created.
    /// - `name`: The name of the database. This field must not be empty.
    /// - `createdBy`: The `Principal` of the user creating the database. This field must not be an anonymous principal.
    ///
    /// # Returns
    ///
    /// A `Result.Result<Database, ErrorTypes.QuikDBError>` indicating the outcome of the operation:
    /// - `#ok(database)`: The database was successfully created.
    /// - `#err(error)`: An error occurred during the creation process, such as a validation error.
    public func createDatabase(projectId: Nat, databaseId: Nat , name: Text, createdBy: Principal): Result.Result<Database, ErrorTypes.QuikDBError> {
        if (name.size() == 0) {
            return #err(#ValidationError("Database name cannot be empty"));
        } else if (Principal.isAnonymous(createdBy)) {
            return #err(#ValidationError("Invalid principal identifier"));
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
