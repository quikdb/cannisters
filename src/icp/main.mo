import Project "models/Project";
import DataGroup "models/DataGroup";
import Item "models/Item";

actor QuikDB {
    stable var projects: [Project.Project] = [];
    stable var dataGroups: [DataGroup.DataGroup] = [];
    stable var items: [Item.Item] = [];
    
}
