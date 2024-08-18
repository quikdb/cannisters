import Nat "mo:base/Nat";
import Array "mo:base/Array";
import Principal "mo:base/Principal";
import Result "mo:base/Result";

/// internal modules
import DataGroup "../models/DataGroup";
import idGen "../models/IdGen";
import ErrorTypes "../models/ErrorTypes";

actor DatabaseController {
    let databaseMaxNumber: Nat = 5;

    /// A counter used for generating unique project IDs.
    stable var dataGroupCounter: Nat = 0;

    /// Initialize the default project to fill the dataGroups array.
    let defaultGroupResult = DataGroup.createDataGroup(
        0,
        dataGroupCounter,
        0,
        "Default DataGroup", 
        Principal.fromText("default")
    );

    /// Handle the result of the default datagroup creation.
    let defaultDataGroup = switch (defaultGroupResult) {
        case (#ok dataGroup) dataGroup;
    };

    /// A stable array storing all dataGroups, initialized with the default database.
    stable var dataGroups: [var DataGroup.DataGroup] = [var defaultDataGroup, defaultDataGroup, defaultDataGroup, defaultDataGroup, defaultDataGroup];

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

        dataGroupCounter := dataGroupCounter + 1;

        return idGen.generateUniqueId(dataGroupCounter, prefix);
    };

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
        if (dataGroups.size() >= databaseMaxNumber) {
            return #err(#ValidationError("number of dataGroups has reached the databaseMaxNumber limit"));
        };

        if (groupCount > 10) return #err(#ValidationError("Invalid group identifier. groupCount must be be <=10"));

        if (groupCount < 1) return #err(#ValidationError("Invalid group identifier. groupCount must be be >=1"));

        let dataGroupId = generateId(Principal.toText(createdBy));

        let newDataGroupResult = DataGroup.createDataGroup(groupCount, databaseId, projectId, groupName, createdBy);

        let newDataGroup = switch (newDataGroupResult) {
            case (#ok project) project;
            case (#err error) return #err(error);
        };

        dataGroups[groupCount - 1] := newDataGroup;

        return #ok(?newDataGroup);
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
    }
}
