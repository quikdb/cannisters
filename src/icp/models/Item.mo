import ErrorTypes "../models/ErrorTypes";
import Time "mo:base/Time";
import Result "mo:base/Result";

module {
    type Value = {
        TextValue: Text;
        IntValue: Int;
    };

    type Schema = {
        textField: ?Text;
        intField: ?Int;
        arrayField: ?[Value];
    };
    public type Item = {
        itemId: Text;
        groupId: Text;
        data: Text;
        createdAt: Time.Time;
    };

    public func createItem(itemId: Text, data: Text, groupId: Text): Result.Result<Item, ErrorTypes.QuikDBError> {
        if (groupId.size() == 0) {
            return #err(#ValidationError("Group ID cannot be empty"));
        } else if (itemId.size() == 0) {
            return #err(#ValidationError("Item ID cannot be empty"));
        } else if (data.size() == 0) {
            return #err(#ValidationError("Item data cannot be empty"));
        } else {
            let item: Item = {
            itemId = itemId;
            data = data;
            groupId = groupId;
            createdAt = Time.now();
            };
            return #ok(item);
        }
    }
}
