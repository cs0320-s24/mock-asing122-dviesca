import { REPLFunction } from "./REPLFunction";

export function addToFunctionMap(
  map: Map<string, REPLFunction>,
  command: string,
  func: REPLFunction
) {
  map.set(command, func);
  return map;
}
