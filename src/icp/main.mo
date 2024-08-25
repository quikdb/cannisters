import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Nat "mo:base/Nat";
import Array "mo:base/Array";
import Debug "mo:base/Debug";
import Time "mo:base/Time";

/// internal modules
import Project "models/Project.module";
import Database "models/Database.module";
import DataGroup "models/DataGroup.module";
import GroupItemStore "models/Item.module";
import idGen "models/IdGen.module";
import ErrorTypes "models/ErrorTypes.module";

actor QuikDB {
    ////////////////////////////////////////////////////////////////
    /////////////// Variables for Projects /////////////////////////
    let projectMaxNumber: Nat = 2;
    stable var projectCounter: Nat = 0; // using as the unique id.
    let defaultProjectResult = Project.createProject(
        projectCounter, 
        "quik", 
        "Default Project", 
        Principal.fromText("2vxsx-fae")
    );
    let defaultProject = switch (defaultProjectResult) {
        case (#ok project) project;
    case (#err error) {
        Debug.print(ErrorTypes.errorMessage(error)); // Log the error
        {
    projectId = 0;
    name = "Fallback Project";
    description = "Fallback project description due to error";
    createdBy = Principal.fromText("2vxsx-fae"); // Use a known valid Principal
    createdAt = Time.now();
    updatedAt = Time.now();
}; // Use the fallback project in case of an error
    }
    };
    stable var projects: [var Project.Project] = [var defaultProject, defaultProject];

    ////////////////////////////////////////////////////////////////
    /////////////// Variables for Datagroups /////////////////////////
    let databaseGroupMaxNumber: Nat = 5;
    stable var dataGroupCounter: Nat = 0; // unique id for data groups
    let defaultGroupResult = DataGroup.createDataGroup(
        0,
        dataGroupCounter,
        0,
        "Default DataGroup", 
        Principal.fromText("2vxsx-fae")
    );
    let defaultDataGroup = switch (defaultGroupResult) {
        case (#ok dataGroup) dataGroup;
    case (#err(error)) {
        Debug.print(ErrorTypes.errorMessage(error));
        {
            createdAt = Time.now();
            createdBy = Principal.fromText("2vxsx-fae");
            databaseId = 0;
            groupId = 0;
            name = "Default DataGroup";
            projectId = 0;
        }
    };
    };
    stable var dataGroups: [var DataGroup.DataGroup] = [var defaultDataGroup, defaultDataGroup, defaultDataGroup, defaultDataGroup, defaultDataGroup];

    ////////////////////////////////////////////////////////////////
    /////////////// Variables for Database /////////////////////////
    let databaseMaxNumber: Nat = 5;
    stable var databaseCounter: Nat = 0; // unique id for database
    let defaultDatabaseResult = Database.createDatabase(
        0,
        databaseCounter,
        "Default Database", 
        Principal.fromText("2vxsx-fae")
    );
    let defaultDatabase = switch (defaultDatabaseResult) {
        case (#ok database) database;
    case (#err(error)) {
        Debug.print(ErrorTypes.errorMessage(error));
        {
            createdAt = Time.now();
            createdBy = Principal.fromText("2vxsx-fae");
            databaseId = 0;
            name = "Default DataGroup";
            projectId = 0;
        }
    };
    };
    stable var databases: [var Database.Database] = [var defaultDatabase, defaultDatabase, defaultDatabase, defaultDatabase, defaultDatabase];

    ////////////////////////////////////////////////////////////////
    /////////////// Variables for GroupItems //////////////////////
    stable var store: [(Text, GroupItemStore.Item)] = [];
    let maxItemSize: Nat = 300 * 1024; // 300KB in bytes

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
    public shared func createDataGroup(databaseId: Nat, projectId: Nat, groupCount: Nat, groupName: Text, createdBy: Principal): async Result.Result<?DataGroup.DataGroup, ErrorTypes.QuikDBError> {
        if (dataGroups.size() >= databaseGroupMaxNumber) {
            return #err(#ValidationError("number of dataGroups has reached the databaseGroupMaxNumber limit"));
        };

        if (groupCount > 10) return #err(#ValidationError("Invalid group identifier. groupCount must be be <=10"));

        if (groupCount < 1) return #err(#ValidationError("Invalid group identifier. groupCount must be be >=1"));

        dataGroupCounter := dataGroupCounter + 1;

        // let dataGroupId = generateId(Principal.toText(createdBy), dataGroupCounter);

        let newDataGroupResult = DataGroup.createDataGroup(groupCount, databaseId, projectId, groupName, createdBy);

        let newDataGroup = switch (newDataGroupResult) {
            case (#ok project) project;
            case (#err error) return #err(error);
        };

        dataGroups[dataGroupCounter - 1] := newDataGroup;

        return #ok(?newDataGroup);
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
        updatedBy: Principal
    ): async Result.Result<DataGroup.DataGroup, ErrorTypes.QuikDBError> {
        if (newName.size() == 0) {
            return #err(#ValidationError("Data group name cannot be empty"));
        };

        if (Principal.isAnonymous(updatedBy)) {
            return #err(#ValidationError("Invalid principal identifier"));
        };

        let g = Array.freeze<DataGroup.DataGroup>(dataGroups);

        let existingDataGroupOpt = Array.find<DataGroup.DataGroup>(g, func(dg) : Bool { dg.groupId == dataGroupId });

        switch (existingDataGroupOpt) {
            case (null) {
                return #err(#DataGroupNotFound("No data group found with the specified ID"));
            };
            case (?existingDataGroup) {
                let indexOpt = Array.indexOf<DataGroup.DataGroup>(existingDataGroup, g, func(x, y) { x.groupId == y.groupId });

                switch (indexOpt) {
                    case (null) {
                        return #err(#GeneralError("Unexpected error occurred while finding data group index"));
                    };
                    case (?index) {
                        let updatedDataGroup = {
                            groupId = existingDataGroup.groupId;
                            databaseId = existingDataGroup.databaseId;
                            projectId = existingDataGroup.projectId;
                            name = newName;
                            createdBy = updatedBy;
                            createdAt = existingDataGroup.createdAt;
                            updatedAt = Time.now();
                        };

                        dataGroups[index] := updatedDataGroup;

                        return #ok(updatedDataGroup);
                    };
                }
            };
        }
    };

    /// Retrieves all dataGroups currently stored in the system.
    ///
    /// This function returns an array of all `DataGroup.DataGroup` objects stored in the `dataGroups` array.
    ///
    /// # Returns
    ///
    /// An array of `DataGroup.DataGroup` objects.
    public shared query func getDataGroups(): async [DataGroup.DataGroup] {
        return Array.freeze<DataGroup.DataGroup>(dataGroups);
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
    public shared func createDatabase(projectId: Nat, count: Nat, dbName: Text, createdBy: Principal): async Result.Result<?Database.Database, ErrorTypes.QuikDBError> {
        if (databases.size() >= databaseMaxNumber) {
            return #err(#ValidationError("number of databases has reached the databaseMaxNumber limit"));
        };

        if (count > 5) return #err(#ValidationError("Invalid database identifier. count must be be <=5"));

        if (count < 1) return #err(#ValidationError("Invalid database identifier. count must be be >=1"));

        databaseCounter := databaseCounter + 1;

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
    public shared func updateDatabase(
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
    public shared query func getDatabases(): async [Database.Database] {
        return Array.freeze<Database.Database>(databases);
    };

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
    public shared func createProject(name: Text, description: Text, createdBy: Principal): async Result.Result<?Project.Project, ErrorTypes.QuikDBError>  {
        if (projects.size() >= projectMaxNumber) {
            return #err(#ValidationError("number of dataGroups has reached the projectMaxNumber limit"));
        };

        projectCounter := projectCounter + 1;

        // let projectId = generateId(Principal.toText(createdBy), projectCounter);

        let newProjectResult = Project.createProject(projectCounter, name, description, createdBy);

        // Handle the result of the project creation.
        let newProject = switch (newProjectResult) {
            case (#ok project) project;
            case (#err error) return #err(error);
        };

        projects[1] := newProject;

        return #ok(?newProject);
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
        updatedBy: Principal
    ): async Result.Result<Project.Project, ErrorTypes.QuikDBError> {
        if (newName.size() == 0) {
            return #err(#ValidationError("Project name cannot be empty"));
        };

        if (newDescription.size() == 0) {
            return #err(#ValidationError("Project description cannot be empty"));
        };

        if (Principal.isAnonymous(updatedBy)) {
            return #err(#ValidationError("Invalid principal identifier"));
        };

        let p = Array.freeze<Project.Project>(projects);
        let existingProjectOpt = Array.find<Project.Project>(p, func(proj) : Bool { proj.projectId == projectId });

        switch (existingProjectOpt) {
            case (null) {
                return #err(#ProjectNotFound("No project found with the specified ID"));
            };
            case (?existingProject) {
                let indexOpt = Array.indexOf<Project.Project>(existingProject, p, func(x, y) { x.projectId == y.projectId });

                switch (indexOpt) {
                    case (null) {
                        return #err(#GeneralError("Unexpected error occurred while finding project index"));
                    };
                    case (?index) {
                        let updatedProject = {
                            projectId = existingProject.projectId;
                            name = newName;
                            description = newDescription;
                            createdBy = updatedBy;
                            createdAt = existingProject.createdAt;
                            updatedAt = Time.now();
                        };

                        projects[index] := updatedProject;

                        return #ok(updatedProject);
                    };
        };
    };
        };
    };

    /// Retrieves all projects currently stored in the system.
    ///
    /// This function returns an array of all `Project.Project` objects stored in the `projects` array.
    ///
    /// # Returns
    ///
    /// An array of `Project.Project` objects.
    public shared query func getProjects(): async [Project.Project] {
        return Array.freeze<Project.Project>(projects);
    };

    ////////////////////////////////////////////////////////////////
    //////////////////// Item Functions ///////////////////////////

    public func putItem(key: Text, value: Blob): async Result.Result<Text, ErrorTypes.QuikDBError> {
        if (value.size() == 0) {
            return #err(#ValidationError("Value cannot be empty"));
        };

        if (value.size() > maxItemSize) {
            return #err(#ValidationError("Value exceeds the maximum size of 300KB"));
        };

        let existingItemOpt = Array.find<(Text, GroupItemStore.Item)>(store, func(kv) : Bool { kv.0 == key });

        switch (existingItemOpt) {
            case (null) {
                let newItem = GroupItemStore.createItem(key, value);
                store := Array.append(store, [(key, newItem)]);
                return #ok("Created");
            };
            case (?existingItem) {
                let updatedItem = GroupItemStore.updateItem(existingItem.1, value);

                store := Array.map<(Text, GroupItemStore.Item), (Text, GroupItemStore.Item)>(store, func(kv) : (Text, GroupItemStore.Item) {
                    if (kv.0 == key) {
                        (key, updatedItem)
                    } else {
                        kv
                    }
                });

                return #ok("Updated");
            };
        }
    };

    public query func getItem(key: Text): async Result.Result<GroupItemStore.Item, ErrorTypes.QuikDBError> {
        let existingItemOpt = Array.find<(Text, GroupItemStore.Item)>(store, func(kv) : Bool { kv.0 == key });
        switch (existingItemOpt) {
            case (null) return #err(#ValidationError("Key not found"));
            case (?existingItem) return #ok(existingItem.1);
        }
    };

    public func deleteItem(key: Text): async Result.Result<Text, ErrorTypes.QuikDBError> {
        let existingItemOpt = Array.find<(Text, GroupItemStore.Item)>(store, func(kv) : Bool { kv.0 == key });
        switch (existingItemOpt) {
            case (null) return #err(#ValidationError("Key not found"));
            case (?_existingItem) {
                store := Array.filter<(Text, GroupItemStore.Item)>(store, func(kv) : Bool { kv.0 != key });
                return #ok("Deleted");
            };
        }
    };

    public query func listAllKeys(): async [Text] {
        return Array.map<(Text, GroupItemStore.Item), Text>(store, func(kv) : Text { kv.0 });
    };
}
