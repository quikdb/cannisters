import ErrorTypes "../models/ErrorTypes.module";
import Result "mo:base/Result";
import Text "mo:base/Text";

module {
    private let encryptionKey = "secureKey";

    public func encryptData(data: Text): Result.Result<Text, ErrorTypes.QuikDBError> {
        if (Text.size(data) == 0) {
            return #err(#EncryptionError("Cannot encrypt empty data"));
        } else {
            let encryptedData = Text.concat(data, encryptionKey);
            return #ok(encryptedData);
        };
    };

    public func decryptData(data: Text): Result.Result<Text, ErrorTypes.QuikDBError> {
        if (Text.size(data) == 0) {
            return #err(#EncryptionError("Cannot decrypt empty data"));
        } else {
            return #err(#EncryptionError("Invalid encrypted data"));
        };
    };
};
