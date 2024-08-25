import Time "mo:base/Time";
import Result "mo:base/Result";
import Principal "mo:base/Principal";

/// internal models
import ErrorTypes "../models/ErrorTypes.module";

module {

    /// Represents a Project within the system.
    ///
    /// A `Project` is a higher-level organizational unit that contains databases and data groups.
    /// Each `Project` is uniquely identified by its `projectId` and is associated with a creator.
    ///
    /// Fields:
    /// - `projectId`: The unique identifier for the project.
    /// - `name`: The name of the project.
    /// - `description`: A brief description of the project.
    /// - `createdBy`: The `Principal` of the user who created the project.
    /// - `createdAt`: The timestamp indicating when the project was created.
    public type Project = {
        projectId: Nat;
        name: Text;
        description: Text;
        createdBy: Principal;
        createdAt: Time.Time;
    };

    /// Creates a new `Project`.
    ///
    /// This function attempts to create a new project in the system. It validates the provided inputs, ensuring that
    /// the project name and description are not empty and that the `Principal` identifier is valid. If the inputs are valid,
    /// a new `Project` is created and returned; otherwise, an error is returned.
    ///
    /// # Arguments
    ///
    /// - `projectId`: The unique identifier for the project to be created.
    /// - `name`: The name of the project. This field must not be empty.
    /// - `description`: A brief description of the project. This field must not be empty.
    /// - `createdBy`: The `Principal` of the user creating the project. This field must not be an anonymous principal.
    ///
    /// # Returns
    ///
    /// A `Result.Result<Project, ErrorTypes.QuikDBError>` indicating the outcome of the operation:
    /// - `#ok(project)`: The project was successfully created.
    /// - `#err(error)`: An error occurred during the creation process, such as a validation error.
    public func createProject(projectId: Nat, name: Text, description: Text, createdBy: Principal): Result.Result<Project, ErrorTypes.QuikDBError> {
        if (name.size() == 0) {
            return #err(#ValidationError("Project name cannot be empty"));
        } else if (description.size() == 0) {
            return #err(#ValidationError("Project description cannot be empty"));
        } else if (Principal.isAnonymous(createdBy)) {
            return #err(#ValidationError("Invalid principal identifier"));
        } else {
            return #ok {
                projectId = projectId;
                name = name;
                description = description;
                createdBy = createdBy;
                createdAt = Time.now();
                updatedAt = Time.now();
            };
        }
    }
}
