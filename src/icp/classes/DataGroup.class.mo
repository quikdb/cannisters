import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Nat "mo:base/Nat";
import Array "mo:base/Array";
import Time "mo:base/Time";

/// internal models
import DataGroup "../models/DataGroup.module";
import ErrorTypes "../models/ErrorTypes.module";

module {
    public class Dg(dataGroups: [var DataGroup.DataGroup], dataGroupCounter: Nat) {
    ////////////////////////////////////////////////////////////////
    /////////////// Variables for Datagroups /////////////////////////
    let databaseGroupMaxNumber: Nat = 5;

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
    public func createDataGroup(databaseId: Nat, projectId: Nat, groupCount: Nat, groupName: Text, createdBy: Principal): async Result.Result<?DataGroup.DataGroup, ErrorTypes.QuikDBError> {
        if (dataGroups.size() >= databaseGroupMaxNumber) {
            return #err(#ValidationError("number of dataGroups has reached the databaseGroupMaxNumber limit"));
        };

        if (groupCount > 10) return #err(#ValidationError("Invalid group identifier. groupCount must be be <=10"));

        if (groupCount < 1) return #err(#ValidationError("Invalid group identifier. groupCount must be be >=1"));

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
    public func updateDataGroup(
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
    public func getDataGroups(): [DataGroup.DataGroup] {
        return Array.freeze<DataGroup.DataGroup>(dataGroups);
    };
}}
