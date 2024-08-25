import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Nat "mo:base/Nat";
import Array "mo:base/Array";
import Time "mo:base/Time";

/// internal modules
import Database "../models/Database.module";
import ErrorTypes "../models/ErrorTypes.module";

module {
    public class Db(databases: [var Database.Database], databaseCounter: Nat) {
    ////////////////////////////////////////////////////////////////
    /////////////// Variables for Database /////////////////////////
    let databaseMaxNumber: Nat = 5;

    ////////////////////////////////////////////////////////////////
    ////////////////// Database Functions /////////////////////////

    /// Creates a new database, ensuring the total number of databases does not exceed the limit.
    ///
    /// This function attempts to create a new database with the specified name, description,
    /// and creator's principal. If the number of databases has already reached the maximum limit,
    /// the function returns `null`.
    ///
    /// # Arguments
    ///
    /// * `projectId` - The unique identifier for the new database.
    /// * `count` - The database identifier, must be be between 1 and 5.
    /// * `dbName` - The name of the database to be created.
    /// * `createdBy` - The `Principal` of the user creating the database.
    ///
    /// # Returns
    ///
    /// An optional `Database.Database` object representing the newly created project.
    /// Returns `null` if the project creation limit has been reached or an error occurs.
    public func createDatabase(projectId: Nat, count: Nat, dbName: Text, createdBy: Principal): async Result.Result<?Database.Database, ErrorTypes.QuikDBError> {
        if (databases.size() >= databaseMaxNumber) {
            return #err(#ValidationError("number of databases has reached the databaseMaxNumber limit"));
        };

        if (count > 5) return #err(#ValidationError("Invalid database identifier. count must be be <=5"));

        if (count < 1) return #err(#ValidationError("Invalid database identifier. count must be be >=1"));

        // let databaseId = generateId(Principal.toText(createdBy), databaseCounter);

        let newDatabaseResult = Database.createDatabase(projectId, count, dbName, createdBy);

        // Handle the result of the project creation.
        let newDatabase = switch (newDatabaseResult) {
            case (#ok project) project;
            case (#err error) return #err(error);
        };

        databases[databaseCounter - 1] := newDatabase;

        return #ok(?newDatabase);
    };

    /// Updates the details of an existing database.
    ///
    /// This function allows modifying the `name` of an existing database.
    /// It performs necessary validations to ensure that the database exists
    /// and that the new data provided is valid.
    ///
    /// # Arguments
    ///
    /// * `databaseId` - The unique identifier of the database to be updated.
    /// * `newName` - The new name for the database.
    /// * `updatedBy` - The `Principal` of the user updating the database.
    ///
    /// # Returns
    ///
    /// A `Result.Result` containing the updated `Database.Database` object if successful,
    /// or an `ErrorTypes.QuikDBError` if the database is not found or validations fail.
    public func updateDatabase(
        databaseId: Nat,
        newName: Text,
        updatedBy: Principal
    ): async Result.Result<Database.Database, ErrorTypes.QuikDBError> {
        if (newName.size() == 0) {
            return #err(#ValidationError("Database name cannot be empty"));
        };

        if (Principal.isAnonymous(updatedBy)) {
            return #err(#ValidationError("Invalid principal identifier"));
        };

        let d = Array.freeze<Database.Database>(databases);

        let existingDatabaseOpt = Array.find<Database.Database>(d, func(db) : Bool { db.databaseId == databaseId });

        switch (existingDatabaseOpt) {
            case (null) {
                return #err(#ValidationError("No database found with the specified ID"));
            };
            case (?existingDatabase) {
                let indexOpt = Array.indexOf<Database.Database>(existingDatabase, d, func(x, y) { x.databaseId == y.databaseId });

                switch (indexOpt) {
                    case (null) {
                        return #err(#GeneralError("Unexpected error occurred while finding database index"));
                    };
                    case (?index) {
                        let updatedDatabase = {
                            databaseId = existingDatabase.databaseId;
                            projectId = existingDatabase.projectId;
                            name = newName;
                            createdBy = updatedBy;
                            createdAt = existingDatabase.createdAt;
                            updatedAt = Time.now();
                        };

                        databases[index] := updatedDatabase;

                        return #ok(updatedDatabase);
                    };
                }
            };
        }
    };

    /// Retrieves all databases currently stored in the system.
    ///
    /// This function returns an array of all `Database.Database` objects stored in the `databases` array.
    ///
    /// # Returns
    ///
    /// An array of `Database.Database` objects.
    public func getDatabases(): [Database.Database] {
        return Array.freeze<Database.Database>(databases);
    };
}}
