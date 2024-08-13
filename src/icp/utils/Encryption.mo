import ErrorTypes "../models/ErrorTypes";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Array "mo:base/Array";

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
        };
        if (endsWith(data, encryptionKey)) {
            let originalText = removeSuffix(data, encryptionKey);
            return #ok(originalText);
        } else {
            return #err(#EncryptionError("Invalid encrypted data"));
        };
    };

    private func endsWith(text: Text, suffix: Text): Bool {
        let textSize = Text.size(text);
        let suffixSize = Text.size(suffix);
        if (suffixSize > textSize) {
            return false;
        };
        let textEnd = removePrefix(Text.drop(text, textSize - suffixSize), 0);
        return textEnd == suffix;
    };

    private func removeSuffix(text: Text, suffix: Text): Text {
        let textSize = Text.size(text);
        let suffixSize = Text.size(suffix);
        if (suffixSize > textSize) {
            return text;  // No suffix to remove
        };
        return Text.take(text, textSize - suffixSize);
    };

    private func removePrefix(text: Text, prefixSize: Nat): Text {
        if (prefixSize >= Text.size(text)) {
            return "";
        };
        return Text.drop(text, prefixSize);
    };
};
