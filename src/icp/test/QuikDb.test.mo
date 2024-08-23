import Principal "mo:base/Principal";
import Array "mo:base/Array";
import Debug "mo:base/Debug";
import quikDB "../main";

actor {
    let testPrincipal = Principal.fromText("2vxsx-fae");

    let quikDB = QuikDB.QuikDB();

    func assertEqual(expected: Bool, actual: Bool, message: Text) {
        if (expected != actual) {
            Debug.print(message # " - Test Failed");
        } else {
            Debug.print(message # " - Test Passed");
        }
    };

    public func runTests() : async () {
        await testCreateProject();
        await testFetchProjects();
    };

    func testCreateProject() : async () {
        let result = await quikDB.createProject("Test Project", "A project for testing", testPrincipal);
        Debug.print("result", result);
        let passed = switch result {
            case (#ok projectOpt) projectOpt != null;
            case (#err _) false;
        };
        assertEqual(true, passed, "Create Project Test");
    };

    func testFetchProjects() : async () {
        let projects = await quikDB.getProjects();
        assertEqual(true, projects.size() > 0, "Fetch Projects Test");
    };
}
