module {
    public type QuikDBError = {
    #ProjectNotFound: Text;
    #DataGroupNotFound: Text;
    #ItemNotFound: Text;
    #ValidationError: Text;
    #EncryptionError: Text;
    #GeneralError: Text;
};

    public func errorMessage(error: QuikDBError): Text {
    switch (error) {
        case (#ProjectNotFound(msg)) { 
            "Project not found: " # msg 
        };
        case (#DataGroupNotFound(msg)) { 
            "DataGroup not found: " # msg 
        };
        case (#ItemNotFound(msg)) { 
            "Item not found: " # msg 
        };
        case (#ValidationError(msg)) { 
            "Validation error: " # msg 
        };
        case (#EncryptionError(msg)) { 
            "Encryption error: " # msg 
        };
        case (#GeneralError(msg)) { 
            "Error: " # msg 
        };
    }
}

}