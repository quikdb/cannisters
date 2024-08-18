import Nat "mo:base/Nat";
import Array "mo:base/Array";
import Principal "mo:base/Principal";
import Result "mo:base/Result";

/// internal modules
import Database "../models/Database";
import idGen "../models/IdGen";
import ErrorTypes "../models/ErrorTypes";

actor DatabaseController {
    /// The maximum number of databases that can be created.
    let databaseMaxNumber: Nat = 5;

    /// A counter used for generating unique project IDs.
    stable var databaseCounter: Nat = 0;

    /// Initialize the default project to fill the databases array.
    let defaultDatabaseResult = Database.createDatabase(
        0,
        databaseCounter,
        "Default Database", 
        Principal.fromText("default")
    );

    /// Handle the result of the default project creation.
    let defaultDatabase = switch (defaultDatabaseResult) {
        case (#ok database) database;
        // In a real-world scenario, you may handle the error case here.
    };

    /// A stable array storing all databases, initialized with the default database.
    stable var databases: [var Database.Database] = [var defaultDatabase, defaultDatabase, defaultDatabase, defaultDatabase, defaultDatabase];

    /// Generates a unique ID for a specified entity.
    ///
    /// This function generates a unique identifier by incrementing the project counter
    /// and combining it with a prefix specific to the entity type.
    ///
    /// # Arguments
    ///
    /// * `entity` - The name of the entity for which the ID is being generated.
    ///
    /// # Returns
    ///
    /// A `Text` value representing the generated unique ID.
    public shared query func generateId(entity: Text): async Text {
        let prefix: Nat = 0; // Example prefix, you may modify it based on entity

        // Increment the project counter to ensure uniqueness.
        databaseCounter := databaseCounter + 1;

        // Generate the unique ID using the `idGen` module.
        return idGen.generateUniqueId(databaseCounter, prefix);
    };

    /// Creates a new database, ensuring the total number of databases does not exceed the limit.
    ///
    /// This function attempts to create a new database with the specified name, description,
    /// and creator's principal. If the number of databases has already reached the maximum limit,
    /// the function returns `null`.
    ///
    /// # Arguments
    ///
    /// * `name` - The name of the database to be created.
    /// * `description` - A brief description of the database.
    /// * `createdBy` - The `Principal` of the user creating the database.
    ///
    /// # Returns
    ///
    /// An optional `Database.Database` object representing the newly created project.
    /// Returns `null` if the project creation limit has been reached or an error occurs.
    public shared func createDatabase(projectId: Nat, count: Nat, dbName: Text, createdBy: Principal): async Result.Result<?Database.Database, ErrorTypes.QuikDBError> {
        // Check if the number of databases has reached the databaseMaxNumber limit.
        if (databases.size() >= databaseMaxNumber) {
            return #err(#ValidationError("number of databases has reached the databaseMaxNumber limit"));
        };

        if (count > 5) return #err(#ValidationError("Invalid database identifier. count must be be <=5 and >=1"));

        let databaseId = generateId(Principal.toText(createdBy));

        let newDatabaseResult = Database.createDatabase(projectId, count, dbName, createdBy);

        // Handle the result of the project creation.
        let newDatabase = switch (newDatabaseResult) {
            case (#ok project) project;
            case (#err error) return #err(error);
        };

        databases[count - 1] := newDatabase;

        return #ok(?newDatabase);
    };

    /// Retrieves all databases currently stored in the system.
    ///
    /// This function returns an array of all `Database.Database` objects stored in the `databases` array.
    ///
    /// # Returns
    ///
    /// An array of `Database.Database` objects.
    public shared query func getDatabases(): async [Database.Database] {
        return Array.freeze<Database.Database>(databases);
    }
}
