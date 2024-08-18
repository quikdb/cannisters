import Project "models/Project";
import DataGroup "models/DataGroup";
import Item "models/Item";
import Nat "mo:base/Nat";
import Array "mo:base/Array";
import Principal "mo:base/Principal";
import idGen "./models/IdGen";

actor QuikDB {

    /// A stable array storing all `DataGroup` objects.
    stable var dataGroups: [DataGroup.DataGroup] = [];

    /// A stable array storing all `Item` objects.
    stable var items: [Item.Item] = [];
}
