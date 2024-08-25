import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Nat "mo:base/Nat";
import Array "mo:base/Array";
import Time "mo:base/Time";

/// internal modules
import Project "../models/Project.module";
import ErrorTypes "../models/ErrorTypes.module";

module {
    public class Prjt(projects: [var Project.Project], projectCounter: Nat) {
    ////////////////////////////////////////////////////////////////
    /////////////// Variables for Projects /////////////////////////
    let projectMaxNumber: Nat = 2;

    ////////////////////////////////////////////////////////////////
    ////////////////// Project Functions /////////////////////////

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
    /// Returns `ErrorTypes.QuikDBError` if the project creation limit has been reached or an error occurs.
    public func createProject(name: Text, description: Text, createdBy: Principal): async Result.Result<?Project.Project, ErrorTypes.QuikDBError>  {
        if (projects.size() >= projectMaxNumber) {
            return #err(#ValidationError("number of dataGroups has reached the projectMaxNumber limit"));
        };

        // let projectId = generateId(Principal.toText(createdBy), projectCounter);

        let newProjectResult = Project.createProject(projectCounter, name, description, createdBy);

        let newProject = switch (newProjectResult) {
            case (#ok project) project;
            case (#err error) return #err(error);
        };

        projects[projectCounter] := newProject;

        return #ok(?newProject);
    };

     /// Updates the details of an existing project.
    ///
    /// This function allows modifying the `name` and `description` of an existing project.
    /// It performs necessary validations to ensure that the project exists and that the new
    /// data provided is valid.
    ///
    /// # Arguments
    ///
    /// * `projectId` - The unique identifier of the project to be updated.
    /// * `newName` - The new name for the project.
    /// * `newDescription` - The new description for the project.
    /// * `updatedBy` - The `Principal` of the user updating the project.
    ///
    /// # Returns
    ///
    /// A `Result.Result` containing the updated `Project.Project` object if successful,
    /// or an `ErrorTypes.QuikDBError` if the project is not found or validations fail.
    public func updateProject(
        projectId: Nat,
        newName: Text,
        newDescription: Text,
        updatedBy: Principal
    ): async Result.Result<Project.Project, ErrorTypes.QuikDBError> {
        if (newName.size() == 0) {
            return #err(#ValidationError("Project name cannot be empty"));
        };

        if (newDescription.size() == 0) {
            return #err(#ValidationError("Project description cannot be empty"));
        };

        if (Principal.isAnonymous(updatedBy)) {
            return #err(#ValidationError("Invalid principal identifier"));
        };

        let p = Array.freeze<Project.Project>(projects);
        let existingProjectOpt = Array.find<Project.Project>(p, func(proj) : Bool { proj.projectId == projectId });

        switch (existingProjectOpt) {
            case (null) {
                return #err(#ProjectNotFound("No project found with the specified ID"));
            };
            case (?existingProject) {
                let indexOpt = Array.indexOf<Project.Project>(existingProject, p, func(x, y) { x.projectId == y.projectId });

                switch (indexOpt) {
                    case (null) {
                        return #err(#GeneralError("Unexpected error occurred while finding project index"));
                    };
                    case (?index) {
                        let updatedProject = {
                            projectId = existingProject.projectId;
                            name = newName;
                            description = newDescription;
                            createdBy = updatedBy;
                            createdAt = existingProject.createdAt;
                            updatedAt = Time.now();
                        };

                        projects[index] := updatedProject;

                        return #ok(updatedProject);
                    };
        };
    };
        };
    };

    /// Retrieves all projects currently stored in the system.
    ///
    /// This function returns an array of all `Project.Project` objects stored in the `projects` array.
    ///
    /// # Returns
    ///
    /// An array of `Project.Project` objects.
    public func getProjects(): [Project.Project] {
        return Array.freeze<Project.Project>(projects);
    };
}}
