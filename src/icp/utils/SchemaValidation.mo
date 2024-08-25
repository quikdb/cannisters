import ErrorTypes "../models/ErrorTypes.module";
import Result "mo:base/Result";

module {
    public func validateString(data: Text): Result.Result<Bool, ErrorTypes.QuikDBError> {
        if (data.size() == 0) {
            return #err(#ValidationError("String cannot be empty"));
        } else return #ok true;
    };
}
