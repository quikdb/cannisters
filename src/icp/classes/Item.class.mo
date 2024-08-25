import Result "mo:base/Result";
import Nat "mo:base/Nat";
import Array "mo:base/Array";

/// internal models
import GroupItemStore "../models/Item.module";
import ErrorTypes "../models/ErrorTypes.module";

module {
    public class Item(itemList: [(Text, GroupItemStore.Item)]) {
    ////////////////////////////////////////////////////////////////
    /////////////// Variables for GroupItems //////////////////////
    private var store: [(Text, GroupItemStore.Item)] = itemList;
    public var storeTree = store; // TODO: convert store array to treee
    private let maxItemSize: Nat = 300 * 1024; // 300KB in bytes

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
    public func getItem(key: Text): Result.Result<GroupItemStore.Item, ErrorTypes.QuikDBError> {
        let existingItemOpt = Array.find<(Text, GroupItemStore.Item)>(store, func(kv) : Bool { kv.0 == key });
        switch (existingItemOpt) {
            case (null) return #err(#ValidationError("Key not found"));
            case (?existingItem) return #ok(existingItem.1);
        }
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

    /// Lists all keys currently stored in the store.
    ///
    /// This function returns an array of all keys present in the store.
    ///
    /// # Returns
    ///
    /// An array of `Text` values representing all keys stored.
    public func listAllKeys(): [Text] {
        return Array.map<(Text, GroupItemStore.Item), Text>(store, func(kv) : Text { kv.0 });
    };
}}
