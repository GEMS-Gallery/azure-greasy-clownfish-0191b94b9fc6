export const idlFactory = ({ IDL }) => {
  const TaskResult = IDL.Variant({ 'ok' : IDL.Nat, 'err' : IDL.Text });
  const ActionResult = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  const Task = IDL.Record({
    'id' : IDL.Nat,
    'completed' : IDL.Bool,
    'description' : IDL.Text,
    'category' : IDL.Text,
  });
  return IDL.Service({
    'addTask' : IDL.Func([IDL.Text, IDL.Text], [TaskResult], []),
    'completeTask' : IDL.Func([IDL.Nat], [ActionResult], []),
    'deleteTask' : IDL.Func([IDL.Nat], [ActionResult], []),
    'getCategories' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
    'getTasks' : IDL.Func([], [IDL.Vec(Task)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
