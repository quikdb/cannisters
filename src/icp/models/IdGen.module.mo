import Nat "mo:base/Nat";
import Time "mo:base/Time";
import Int "mo:base/Int";
import Buffer "mo:base/Buffer";

module {
    // prefix is a nat which corresponds to the numerical value of the first letter or first two letters of an entity
    public func generateUniqueId(count: Nat, prefix: Nat): Text {
        let timestamp: Time.Time = Time.now();

        let uniqueValue: Int = timestamp * 1000000000 + count;

        let uniqueValueBlob = [uniqueValue, prefix];

        let uniqueValueBlobBuffer: Buffer.Buffer<Int> = Buffer.fromArray<Int>(uniqueValueBlob);

        return Buffer.toText(uniqueValueBlobBuffer, Int.toText);
    };
}
