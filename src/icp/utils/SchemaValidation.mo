import ErrorTypes "../models/ErrorTypes";
import Result "mo:base/Result";

module {
    public func validateString(data: Text): Result.Result<Bool, ErrorTypes.QuikDBError> {
        if (data.size() == 0) {
            return #err(#ValidationError("String cannot be empty"));
        } else return #ok true;
    };

    public func validateInteger(data: Text): Result.Result<Bool, ErrorTypes.QuikDBError> {
        if (data.chars().all(Text.isDigit)) {
            return #ok true;
        } else return return #err(#ValidationError("Invalid integer format"));
    }
}
