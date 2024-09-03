import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type ActionResult = { 'ok' : null } |
  { 'err' : string };
export interface Task {
  'id' : bigint,
  'completed' : boolean,
  'description' : string,
  'category' : string,
}
export type TaskResult = { 'ok' : bigint } |
  { 'err' : string };
export interface _SERVICE {
  'addTask' : ActorMethod<[string, string], TaskResult>,
  'completeTask' : ActorMethod<[bigint], ActionResult>,
  'deleteTask' : ActorMethod<[bigint], ActionResult>,
  'getCategories' : ActorMethod<[], Array<string>>,
  'getTasks' : ActorMethod<[], Array<Task>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
