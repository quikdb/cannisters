import Time "mo:base/Time";
import Blob "mo:base/Blob";
module {
    public type Item = {
        key: Text;
        value: Blob;
        createdAt: Time.Time;
        updatedAt: Time.Time;
    };

    public func createItem(key: Text, value: Blob): Item {
        {
            key = key;
            value = value;
            createdAt = Time.now();
            updatedAt = Time.now();
        }
    };

    public func updateItem(item: Item, newValue: Blob): Item {
        {
            key = item.key;
            value = newValue;
            createdAt = item.createdAt;
            updatedAt = Time.now();
        }
    };
}
