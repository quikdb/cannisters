import ErrorTypes "../models/ErrorTypes";
import Time "mo:base/Time";
import Result "mo:base/Result";

module {
    public type Item = {
        itemId: Text;
        data: Text;
        createdAt: Time.Time;
    };

    public func createItem(itemId: Text, data: Text): Result.Result<Item, ErrorTypes.QuikDBError> {
        if (data.size() == 0) {
            return #err(#ValidationError("Item data cannot be empty"));
        }else {
            let item: Item = {
            itemId = itemId;
            data = data;
            createdAt = Time.now();
            };
            return #ok(item);
        }
    }
}
