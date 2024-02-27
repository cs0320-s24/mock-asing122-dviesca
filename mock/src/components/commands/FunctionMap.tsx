import { REPLFunction } from "./REPLFunction";
import { loadCSV } from "./default/LoadCSV";
import { searchCSV } from "./default/SearchCSV";
import { viewCSV } from "./default/ViewCSV";

export function constructFunctionMapDefault() {
  var functionMap = new Map([
    ["load_file", loadCSV],
    ["view", viewCSV],
    ["search", searchCSV],
  ]);
  return functionMap;
}

export function addToFunctionMap(
  map: Map<string, REPLFunction>,
  command: string,
  func: REPLFunction
) {
  map.set(command, func);
  return map;
}
