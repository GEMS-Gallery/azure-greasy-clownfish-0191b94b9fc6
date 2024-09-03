import Bool "mo:base/Bool";
import Hash "mo:base/Hash";

import Array "mo:base/Array";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";

actor {
  // Types
  type Task = {
    id: Nat;
    category: Text;
    description: Text;
    completed: Bool;
  };

  type TaskResult = Result.Result<Nat, Text>;
  type ActionResult = Result.Result<(), Text>;

  // Stable variables
  stable var nextTaskId: Nat = 0;
  stable var taskEntries: [(Nat, Task)] = [];

  // In-memory state
  var tasks = HashMap.HashMap<Nat, Task>(10, Nat.equal, Hash.hash);
  let categories: [Text] = ["Work", "Personal", "Shopping", "Health"];

  // Initialize tasks from stable storage
  system func preupgrade() {
    taskEntries := Iter.toArray(tasks.entries());
  };

  system func postupgrade() {
    tasks := HashMap.fromIter<Nat, Task>(taskEntries.vals(), 10, Nat.equal, Hash.hash);
  };

  // API methods
  public func addTask(category: Text, description: Text) : async TaskResult {
    let id = nextTaskId;
    nextTaskId += 1;

    let newTask: Task = {
      id = id;
      category = category;
      description = description;
      completed = false;
    };

    tasks.put(id, newTask);
    #ok(id)
  };

  public func completeTask(taskId: Nat) : async ActionResult {
    switch (tasks.get(taskId)) {
      case (null) {
        #err("Task not found")
      };
      case (?task) {
        let updatedTask: Task = {
          id = task.id;
          category = task.category;
          description = task.description;
          completed = true;
        };
        tasks.put(taskId, updatedTask);
        #ok()
      };
    }
  };

  public func deleteTask(taskId: Nat) : async ActionResult {
    switch (tasks.remove(taskId)) {
      case (null) {
        #err("Task not found")
      };
      case (?_) {
        #ok()
      };
    }
  };

  public query func getTasks() : async [Task] {
    Iter.toArray(tasks.vals())
  };

  public query func getCategories() : async [Text] {
    categories
  };
}
