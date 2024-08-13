import ErrorTypes "../models/ErrorTypes";
import Time "mo:base/Time";
import Result "mo:base/Result";

module {
    public type Project = {
        projectId: Text;
        name: Text;
        description: Text;
        createdBy: Principal;
        createdAt: Time.Time;
    };

    public func createProject(projectId: Text, name: Text, description: Text, createdBy: Principal): Result.Result<Project, ErrorTypes.QuikDBError> {
        if (name.size() == 0 or description.size() == 0) {
            return #err(#ValidationError("Project name and description cannot be empty"));
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
