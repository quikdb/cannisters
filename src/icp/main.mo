import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Nat "mo:base/Nat";
import Time "mo:base/Time";

/// models
import Project "models/Project.module";
import Database "models/Database.module";
import DataGroup "models/DataGroup.module";
import GroupItemStore "models/Item.module";
import idGen "models/IdGen.module";
import ErrorTypes "models/ErrorTypes.module";

// classes
import Prjt "classes/Project.class";
import Db "classes/Database.class";
import Dg "classes/DataGroup.class";
import Store "classes/Item.class";

actor QuikDB {
    /// Reusable function to handle Result.Result types.
    ///
    /// # Arguments
    ///
    /// * `result` - The result to be processed.
    ///
    /// # Returns
    ///
    /// The processed result as either `#ok` or `#err` wrapped in the appropriate type.
    private func handleResult<T>(result: Result.Result<T, ErrorTypes.QuikDBError>): Result.Result<T, ErrorTypes.QuikDBError> {
        switch (result) {
            case (#ok(value)) {
                return #ok(value);
            };
            case (#err(error)) {
                return #err(error);
            };
        }
    };

    ////////////////////////////////////////////////////////////////
    /////////////// Variables for Projects /////////////////////////
    stable var projectCounter: Nat = 0; // using as the unique id.
    stable var projects: [var Project.Project] = [
        var {
            projectId = 0;
            name = "Default Project";
            description = "Default project description due to error";
            createdBy = Principal.fromText("2vxsx-fae");
            createdAt = Time.now();
            updatedAt = Time.now();
        }
    ];
    let prjt =  Prjt.Prjt(projects, projectCounter);

    ////////////////////////////////////////////////////////////////
    /////////////// Variables for Database /////////////////////////
    stable var databaseCounter: Nat = 0; // using as the unique id.
    stable var databases: [var Database.Database] = [
        var {
            createdAt = Time.now();
            createdBy = Principal.fromText("2vxsx-fae");
            databaseId = 0;
            name = "Default DataGroup";
            projectId = 0;
        }
    ];
    let db =  Db.Db(databases, databaseCounter);

    ////////////////////////////////////////////////////////////////
    /////////////// Variables for Datagroups /////////////////////////
    stable var dataGroupCounter: Nat = 0; // using as the unique id.
    stable var dataGroups: [var DataGroup.DataGroup] = [ 
        var {
            createdAt = Time.now();
            createdBy = Principal.fromText("2vxsx-fae");
            groupId = 0;
            databaseId = 0;
            name = "Default DataGroup";
            projectId = 0;
        },
    ];
    let dg =  Dg.Dg(dataGroups, dataGroupCounter);

    ////////////////////////////////////////////////////////////////
    /////////////// Variables for GroupItems //////////////////////
    stable var store: [(Text, GroupItemStore.Item)] = [];
    let item =  Store.Item(store);

    ////////////////////////////////////////////////////////////////
    ////////////////// Project Functions /////////////////////////

    /// Creates a new project, ensuring the total number of projects does not exceed the limit.
    ///
    /// This function attempts to create a new project with the specified name, description,
    /// and creator's principal. If the number of projects has already reached the maximum limit,
    /// the function returns `null`.
    ///
    /// # Arguments
    ///
    /// * `name` - The name of the project to be created.
    /// * `description` - A brief description of the project.
    /// * `createdBy` - The `Principal` of the user creating the project.
    ///
    /// # Returns
    ///
    /// An optional `Project.Project` object representing the newly created project.
    /// Returns `ErrorTypes.QuikDBError` if the project creation limit has been reached or an error occurs.
    public shared func createProject(name: Text, description: Text, createdBy: Text): async Result.Result<?Project.Project, ErrorTypes.QuikDBError>  {
        projectCounter := projectCounter + 1;
        let result = await prjt.createProject(name, description, createdBy);

        return handleResult(result);
    };

     /// Updates the details of an existing project.
    ///
    /// This function allows modifying the `name` and `description` of an existing project.
    /// It performs necessary validations to ensure that the project exists and that the new
    /// data provided is valid.
    ///
    /// # Arguments
    ///
    /// * `projectId` - The unique identifier of the project to be updated.
    /// * `newName` - The new name for the project.
    /// * `newDescription` - The new description for the project.
    /// * `updatedBy` - The `Principal` of the user updating the project.
    ///
    /// # Returns
    ///
    /// A `Result.Result` containing the updated `Project.Project` object if successful,
    /// or an `ErrorTypes.QuikDBError` if the project is not found or validations fail.
    public shared func updateProject(
        projectId: Nat,
        newName: Text,
        newDescription: Text,
        updatedBy: Text
    ): async Result.Result<Project.Project, ErrorTypes.QuikDBError> {
        let result = await prjt.updateProject(projectId, newName, newDescription, updatedBy);

        return handleResult(result);
    };

    /// Retrieves all projects currently stored in the system.
    ///
    /// This function returns an array of all `Project.Project` objects stored in the `projects` array.
    ///
    /// # Returns
    ///
    /// An array of `Project.Project` objects.
    public shared query func getProjects(): async [Project.Project] {
        return prjt.getProjects();
    };

    ////////////////////////////////////////////////////////////////
    ////////////////// Database Functions /////////////////////////

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
    public shared query func generateId(_entity: Text, tracker: Nat): async Text {
        let prefix: Nat = 0; // Example prefix, you may modify it based on entity
        
        return idGen.generateUniqueId(tracker, prefix);
    };

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
    public shared func createDatabase(projectId: Nat, count: Nat, dbName: Text, createdBy: Text): async Result.Result<?Database.Database, ErrorTypes.QuikDBError> {
        databaseCounter := databaseCounter + 1;

        let result = await db.createDatabase(projectId, count, dbName, createdBy);

        return handleResult(result);
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
    public shared func updateDatabase(
        databaseId: Nat,
        newName: Text,
        updatedBy: Text
    ): async Result.Result<Database.Database, ErrorTypes.QuikDBError> {
        let result = await db.updateDatabase(databaseId, newName, updatedBy);

        return handleResult(result);
    };

    /// Retrieves all databases currently stored in the system.
    ///
    /// This function returns an array of all `Database.Database` objects stored in the `databases` array.
    ///
    /// # Returns
    ///
    /// An array of `Database.Database` objects.
    public shared query func getDatabases(): async [Database.Database] {
        return db.getDatabases();
    };


    ////////////////////////////////////////////////////////////////
    ////////////////// DataGroup Functions /////////////////////////

    /// Creates a new database, ensuring the total number of dataGroups does not exceed the limit.
    ///
    /// This function attempts to create a new database with the specified name, description,
    /// and creator's principal. If the number of dataGroups has already reached the maximum limit,
    /// the function returns `null`.
    ///
    /// # Arguments
    ///
    /// * `databaseId` - The unique identifier of the database.
    /// * `projectId` - The unique identifier of the project within the dataGroup.
    /// * `groupCount` - The number of data groups to be created within the database.
    /// * `groupName` - The name of the dataGroup to be created.
    /// * `createdBy` - The `Principal` of the user creating the dataGroup.
    ///
    /// # Returns
    ///
    /// An optional `DataGroup.DataGroup` object representing the newly created dataGroup.
    /// Returns `ErrorTypes.QuikDBError` if the dataGroup creation limit has been reached or an error occurs.
    public shared func createDataGroup(databaseId: Nat, projectId: Nat, groupCount: Nat, groupName: Text, createdBy: Text): async Result.Result<?DataGroup.DataGroup, ErrorTypes.QuikDBError> {
        dataGroupCounter := dataGroupCounter + 1;

        let result = await dg.createDataGroup(databaseId, projectId, groupCount, groupName,  createdBy);

        return handleResult(result);
    };

    /// Updates the details of an existing data group.
    ///
    /// This function allows modifying the `name` of an existing data group.
    /// It performs necessary validations to ensure that the data group exists
    /// and that the new data provided is valid.
    ///
    /// # Arguments
    ///
    /// * `dataGroupId` - The unique identifier of the data group to be updated.
    /// * `newName` - The new name for the data group.
    /// * `updatedBy` - The `Principal` of the user updating the data group.
    ///
    /// # Returns
    ///
    /// A `Result.Result` containing the updated `DataGroup.DataGroup` object if successful,
    /// or an `ErrorTypes.QuikDBError` if the data group is not found or validations fail.
    public shared func updateDataGroup(
        dataGroupId: Nat,
        newName: Text,
        updatedBy: Text
    ): async Result.Result<DataGroup.DataGroup, ErrorTypes.QuikDBError> {
        let result = await dg.updateDataGroup(dataGroupId, newName, updatedBy);

        return handleResult(result);
    };

    /// Retrieves all dataGroups currently stored in the system.
    ///
    /// This function returns an array of all `DataGroup.DataGroup` objects stored in the `dataGroups` array.
    ///
    /// # Returns
    ///
    /// An array of `DataGroup.DataGroup` objects.
    public shared query func getDataGroups(): async [DataGroup.DataGroup] {
        return dg.getDataGroups();
    };

    ////////////////////////////////////////////////////////////////
    //////////////////// Item Functions ///////////////////////////

    /// Inserts or updates an item in the store.
    ///
    /// This function attempts to insert a new item into the store with the given `key` and `value`.
    /// If an item with the specified `key` already exists, it updates the item's value.
    ///
    /// # Arguments
    ///
    /// * `key` - The unique identifier for the item to be stored or updated.
    /// * `value` - The data to be stored, represented as a `Blob`.
    ///
    /// # Returns
    ///
    /// A `Result.Result` indicating success with a message ("Created" or "Updated") or failure with an `ErrorTypes.QuikDBError`.
    ///
    /// - Returns `#ok("Created")` if the item was successfully created.
    /// - Returns `#ok("Updated")` if the item was successfully updated.
    /// - Returns `#err(#ValidationError(...))` if validation checks fail (e.g., empty value or value exceeds size limit).
    public shared func putItem(key: Text, value: Blob): async Result.Result<Text, ErrorTypes.QuikDBError> {
        let result = await item.putItem(key, value);

        return handleResult(result);
    };

    /// Retrieves an item from the store by its key.
    ///
    /// This function searches the store for an item with the specified `key`.
    ///
    /// # Arguments
    ///
    /// * `key` - The unique identifier of the item to retrieve.
    ///
    /// # Returns
    ///
    /// A `Result.Result` containing the `GroupItemStore.Item` if found, or an `ErrorTypes.QuikDBError` if not found.
    ///
    /// - Returns `#ok(item)` if the item was found.
    /// - Returns `#err(#ValidationError("Key not found"))` if no item with the specified key exists.
    public shared query func getItem(key: Text): async Result.Result<GroupItemStore.Item, ErrorTypes.QuikDBError> {
        let result = item.getItem(key);

        return handleResult(result);
    };

    /// Deletes an item from the store by its key.
    ///
    /// This function removes the item with the specified `key` from the store.
    ///
    /// # Arguments
    ///
    /// * `key` - The unique identifier of the item to delete.
    ///
    /// # Returns
    ///
    /// A `Result.Result` indicating success with a message "Deleted" or failure with an `ErrorTypes.QuikDBError`.
    ///
    /// - Returns `#ok("Deleted")` if the item was successfully deleted.
    /// - Returns `#err(#ValidationError("Key not found"))` if no item with the specified key exists.
    public shared func deleteItem(key: Text): async Result.Result<Text, ErrorTypes.QuikDBError> {
        let result = await item.deleteItem(key);

        return handleResult(result);
    };

    /// Lists all keys currently stored in the store.
    ///
    /// This function returns an array of all keys present in the store.
    ///
    /// # Returns
    ///
    /// An array of `Text` values representing all keys stored.
    public shared query func listAllKeys(): async [Text] {
        return item.listAllKeys();
    };

    ////////////////////////////////////////////////////////////////
    //////////////////// Batch Functions ///////////////////////////

    /// Adds or updates multiple items in the store.
    ///
    /// # Arguments
    ///
    /// * `items` - A list of tuples containing keys and their corresponding values to be stored.
    ///
    /// # Returns
    ///
    /// A list of `Result.Result` indicating the success or failure of each operation.
    public func createBatchItems(items: [(Text, Blob)]): async Result.Result<Text, ErrorTypes.QuikDBError> {
        let result = await item.createBatchItems(items);

        return handleResult(result);
    };

    /// Retrieves multiple items from the store.
    ///
    /// # Arguments
    ///
    /// * `keys` - A list of keys to retrieve items for.
    ///
    /// # Returns
    ///
    /// A list of `Result.Result` containing the item if found, or an error if not.
    public shared query func getBatchItems(keys: [Text]): async [Result.Result<GroupItemStore.Item, ErrorTypes.QuikDBError>] {
        return item.getBatchItems(keys);
    };
}
