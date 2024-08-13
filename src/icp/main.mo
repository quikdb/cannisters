import Project "src/models/Project";
import DataGroup "src/models/DataGroup";
import Item "src/models/Item";
import Utils "src/utils/Encryption";
import SchemaValidation "src/utils/SchemaValidation";
import ErrorTypes "src/models/ErrorTypes";
import Logger "src/utils/Logger";

actor QuikDB {
    stable var projects: [Project.Project] = [];
    stable var dataGroups: [DataGroup.DataGroup] = [];
    stable var items: [Item.Item] = [];

    public func createProject(name: Text, description: Text): async Result<Project.Project, ErrorTypes.QuikDBError> {
        Logger.logInfo("Creating a new project: " # name);
        let projectId = Text.concat(name, "_", Nat.toText(Time.now()));
        let newProject = Project.createProject(projectId, name, description, Principal.fromActor(this));
        switch newProject {
            case (#ok(project)): 
                projects := Array.append(projects, [project]);
                Logger.logInfo("Project created successfully: " # project.projectId);
                return #ok(project);
            case (#err(error)): 
                Logger.logError(ErrorTypes.errorMessage(error));
                return #err(error);
        }
    }

    public func createDataGroup(projectId: Text, name: Text, schema: ?Text): async Result<DataGroup.DataGroup, ErrorTypes.QuikDBError> {
        Logger.logInfo("Creating a new data group: " # name);
        let groupId = Text.concat(projectId, "_", name);
        let newDataGroup = DataGroup.createDataGroup(groupId, name, schema);
        switch newDataGroup {
            case (#ok(group)):
                dataGroups := Array.append(dataGroups, [group]);
                Logger.logInfo("Data group created successfully: " # group.groupId);
                return #ok(group);
            case (#err(error)):
                Logger.logError(ErrorTypes.errorMessage(error));
                return #err(error);
        }
    }

    public func storeItem(groupId: Text, data: Text): async Result<Item.Item, ErrorTypes.QuikDBError> {
        Logger.logInfo("Storing item in group: " # groupId);
        let encryptedData = Utils.encryptData(data);
        switch encryptedData {
            case (#ok(data)):
                let itemId = Text.concat(groupId, "_", Nat.toText(Time.now()));
                let newItem = Item.createItem(itemId, data);
                switch newItem {
                    case (#ok(item)):
                        items := Array.append(items, [item]);
                        Logger.logInfo("Item stored successfully: " # item.itemId);
                        return #ok(item);
                    case (#err(error)):
                        Logger.logError(ErrorTypes.errorMessage(error));
                        return #err(error);
                }
            case (#err(error)):
                Logger.logError(ErrorTypes.errorMessage(error));
                return #err(error);
        }
    }

    public func validateAndStoreItem(groupId: Text, data: Text, schema: Text): async Result<Item.Item, ErrorTypes.QuikDBError> {
        Logger.logInfo("Validating item against schema: " # schema);
        let validationResult = match schema {
            "String" => SchemaValidation.validateString(data),
            "Integer" => SchemaValidation.validateInteger(data),
            _ => #err(#ValidationError("Unsupported schema type"))
        };

        switch validationResult {
            case (#ok(true)):
                return await storeItem(groupId, data);
            case (#err(error)):
                Logger.logError(ErrorTypes.errorMessage(error));
                return #err(error);
            case _:
                Logger.logError("Unknown validation error");
                return #err(#ValidationError("Unknown validation error"));
        }
    }

    public query func getProjects(): async [Project.Project] {
        Logger.logInfo("Fetching all projects");
        return projects;
    }

    public query func getDataGroups(projectId: Text): async [DataGroup.DataGroup] {
        Logger.logInfo("Fetching data groups for project: " # projectId);
        return Array.filter<DataGroup.DataGroup>(dataGroups, func(group) {
            group.groupId.startsWith(projectId)
        });
    }

    public query func getItems(groupId: Text): async [Item.Item] {
        Logger.logInfo("Fetching items for data group: " # groupId);
        return Array.filter<Item.Item>(items, func(item) {
            item.itemId.startsWith(groupId)
        });
    }
}
