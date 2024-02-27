import { REPLFunction } from "./REPLFunction";
import { loadCSV } from "./default/LoadCSV";
import { modeSwitch } from "./default/Mode";
import { searchCSV } from "./default/SearchCSV";
import { viewCSV } from "./default/ViewCSV";

export function defaultFunctionMap() {
  var functionMap = new Map<string, REPLFunction>();
  addToFunctionMap(functionMap, "load_file", loadCSV);
  addToFunctionMap(functionMap, "view", viewCSV);
  addToFunctionMap(functionMap, "search", searchCSV);
  addToFunctionMap(functionMap, "mode", modeSwitch);
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
