import ErrorTypes "../models/ErrorTypes";
import Result "mo:base/Result";
import Time "mo:base/Time";
import Principal "mo:base/Principal";

module {

    /// Represents a Data Group within a database in a project.
    ///
    /// A `DataGroup` is a logical grouping of data within a specific database, associated with a particular project.
    /// Each `DataGroup` is uniquely identified by its `groupId`, `databaseId`, and `projectId`.
    ///
    /// Fields:
    /// - `groupId`: The unique identifier for the data group.
    /// - `databaseId`: The identifier for the database to which this data group belongs.
    /// - `projectId`: The identifier for the project to which this data group belongs.
    /// - `name`: The name of the data group.
    /// - `createdBy`: The `Principal` of the user who created the data group.
    /// - `createdAt`: The timestamp indicating when the data group was created.
    public type DataGroup = {
        groupId: Nat;
        databaseId: Nat;
        projectId: Nat;
        name: Text;
        createdBy: Principal;
        createdAt: Time.Time;
    };

    /// Creates a new `DataGroup`.
    ///
    /// This function attempts to create a new data group within a specific database and project. It validates the provided
    /// inputs, ensuring that the data group name is not empty and that the `Principal` identifier is valid. If the inputs are
    /// valid, a new `DataGroup` is created and returned; otherwise, an error is returned.
    ///
    /// # Arguments
    ///
    /// - `groupId`: The unique identifier for the data group to be created.
    /// - `databaseId`: The identifier for the database to which this data group will belong.
    /// - `projectId`: The identifier for the project to which this data group will belong.
    /// - `name`: The name of the data group. This field must not be empty.
    /// - `createdBy`: The `Principal` of the user creating the data group. This field must not be an anonymous principal.
    ///
    /// # Returns
    ///
    /// A `Result.Result<DataGroup, ErrorTypes.QuikDBError>` indicating the outcome of the operation:
    /// - `#ok(dataGroup)`: The data group was successfully created.
    /// - `#err(error)`: An error occurred during the creation process, such as a validation error.
    public func createDataGroup(groupId: Nat, databaseId: Nat, projectId: Nat, name: Text, createdBy: Principal): Result.Result<DataGroup, ErrorTypes.QuikDBError> {
        if (name.size() == 0) {
            return #err(#ValidationError("DataGroup name cannot be empty"));
        } else if (Principal.isAnonymous(createdBy)) {
            return #err(#ValidationError("Invalid principal identifier"));
        } else {
            let dataGroup: DataGroup = {
                groupId = groupId;
                databaseId = databaseId;
                projectId = projectId;
                name = name;
                createdBy = createdBy;
                createdAt = Time.now();
            };
            return #ok(dataGroup);
        }
    }
}
