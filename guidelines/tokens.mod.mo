// Application Tokens Module

module ApplicationTokens {

    // Generates a new API token for the user.
    public func createApiToken(_permissions: Blob): async () {
        // Implementation steps:
        // 1. Authenticate the caller.
        // 2. Validate permissions for the token.
        // 3. Generate a secure, unique token.
        // 4. Store a hashed version with permissions.
        // 5. Return the plaintext token (displayed only once).
    };

    // Allows the user to manage their API tokens.
    public func manageApiTokens(): async () {
        // Implementation steps:
        // 1. Authenticate the caller.
        // 2. Retrieve the user's tokens with metadata.
        // 3. Do not expose plaintext tokens.
        // 4. Provide options to revoke or update tokens.
    };

         // Revokes an API token.
     public func revokeApiToken(_tokenId: Nat): async () {
         // Implementation steps:
         // 1. Authenticate the caller.
         // 2. Verify ownership of the token.
         // 3. Mark the token as revoked in storage.
     };

     // Updates the permissions of an existing API token.
     public func updateApiToken(_tokenId: Nat, _permissions: Blob): async () {
         // Implementation steps:
         // 1. Authenticate the caller.
         // 2. Verify ownership of the token.
         // 3. Validate new permissions.
         // 4. Update the token's permissions in storage.
     };

     // Lists external database connections.
     public func listDatabaseConnections(): async () {
         // Implementation steps:
         // 1. Authenticate the caller.
         // 2. Retrieve connections associated with the user.
         // 3. Return connection details (excluding sensitive info).
     };

     // Deletes an external database connection.
     public func deleteDatabaseConnection(_connectionId: Nat): async () {
         // Implementation steps:
         // 1. Authenticate the caller.
         // 2. Verify ownership of the connection.
         // 3. Remove the connection from storage.
     };

     // update

     // updateDatabaseConnection(connectionId: ConnectionId, updatedDetails: EncryptedConnectionDetails): async ()

     // scheduleImport(connectionId: ConnectionId, schedule: ImportSchedule): async ()

}
