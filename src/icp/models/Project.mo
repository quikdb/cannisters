import ErrorTypes "../models/ErrorTypes";
import Time "mo:base/Time";
import Result "mo:base/Result";
import Principal "mo:base/Principal";

module {
    public type Project = {
        projectId: Nat;
        name: Text;
        description: Text;
        createdBy: Principal;
        createdAt: Time.Time;
    };

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
        }
    }
    }
}
