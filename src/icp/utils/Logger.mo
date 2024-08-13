import Debug "mo:base/Debug";
module {
    public func logInfo(message: Text) {
        Debug.print("[INFO] " # message);
    };

    public func logError(message: Text) {
        Debug.print("[ERROR] " # message);
    };

    public func logDebug(message: Text) {
        Debug.print("[DEBUG] " # message);
    };

    public func logWarning(message: Text) {
        Debug.print("[WARNING] " # message);
    };
}
