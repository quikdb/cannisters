import Nat "mo:base/Nat";
import Array "mo:base/Array";
import Principal "mo:base/Principal";

/// internal modules
import Project "../models/Project";
import idGen "../models/IdGen";

actor ProjectController {
    let projectMaxNumber: Nat = 2;

    /// A counter used for generating unique project IDs.
    stable var projectCounter: Nat = 0;

    /// Initialize the default project to fill the projects array.
    let defaultProjectResult = Project.createProject(
        projectCounter, 
        "quik", 
        "Default Project", 
        Principal.fromText("default")
    );

    /// Handle the result of the default project creation.
    let defaultProject = switch (defaultProjectResult) {
        case (#ok project) project;
        // In a real-world scenario, you may handle the error case here.
    };

    /// A stable array storing all projects, initialized with the default project.
    stable var projects: [var Project.Project] = [var defaultProject, defaultProject];

    /// Generates a unique ID for a specified entity.
    ///
    /// This function generates a unique identifier by incrementing the project counter
    /// and combining it with a prefix specific to the entity type.
    ///
    /// # Arguments
    ///
    /// * `entity` - The name of the entity for which the ID is being generated.
    ///
    /// # Returns
    ///
    /// A `Text` value representing the generated unique ID.
    public shared query func generateId(entity: Text): async Text {
        let prefix: Nat = 0; // Example prefix, you may modify it based on entity

        // Increment the project counter to ensure uniqueness.
        projectCounter := projectCounter + 1;

        // Generate the unique ID using the `idGen` module.
        return idGen.generateUniqueId(projectCounter, prefix);
    };

    /// Creates a new project, ensuring the total number of projects does not exceed the limit.
    ///
    /// This function attempts to create a new project with the specified name, description,
    /// and creator's principal. If the number of projects has already reached the maximum limit,
    /// the function returns `null`.
    ///
    /// # Arguments
    ///
    /// * `name` - The name of the project to be created.
    /// * `description` - A brief description of the project.
    /// * `createdBy` - The `Principal` of the user creating the project.
    ///
    /// # Returns
    ///
    /// An optional `Project.Project` object representing the newly created project.
    /// Returns `null` if the project creation limit has been reached or an error occurs.
    public shared func createProject(name: Text, description: Text, createdBy: Principal): async ?Project.Project {
        // Check if the number of projects has reached the projectMaxNumber limit.
        if (projects.size() >= projectMaxNumber) {
            return null;  // Return null if the maximum number of projects has been reached.
        };

        let projectId = generateId(Principal.toText(createdBy));

        let newProjectResult = Project.createProject(projectCounter, name, description, createdBy);

        // Handle the result of the project creation.
        let newProject = switch (newProjectResult) {
            case (#ok project) project;
            case (#err _) return null;  // Return null if an error occurs during project creation.
        };

        projects[1] := newProject;

        return ?newProject;
    };

    /// Retrieves all projects currently stored in the system.
    ///
    /// This function returns an array of all `Project.Project` objects stored in the `projects` array.
    ///
    /// # Returns
    ///
    /// An array of `Project.Project` objects.
    public shared query func getProjects(): async [Project.Project] {
        return Array.freeze<Project.Project>(projects);
    }
}
