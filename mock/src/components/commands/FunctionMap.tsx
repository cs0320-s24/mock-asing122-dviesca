import { REPLFunction } from "./REPLFunction";
import { loadCSV } from "./default/LoadCSV";
import { modeSwitch } from "./default/Mode";
import { searchCSV } from "./default/SearchCSV";
import { viewCSV } from "./default/ViewCSV";

/**
 * defaultFunctionMap Function
 *
 * Function to create a map of default REPL functions.
 *
 * @returns A Map object containing default REPL functions mapped to their respective commands.
 */
export function defaultFunctionMap() {
  var functionMap = new Map<string, REPLFunction>();
  addToFunctionMap(functionMap, "load_file", loadCSV);
  addToFunctionMap(functionMap, "view", viewCSV);
  addToFunctionMap(functionMap, "search", searchCSV);
  addToFunctionMap(functionMap, "mode", modeSwitch);
  return functionMap;
}

/**
 * addToFunctionMap Function
 *
 * Function to add a REPL function to the function map.
 *
 * @param map - The Map object to which the function should be added.
 * @param command - The command associated with the function.
 * @param func - The REPL function to be added.
 * @returns The updated Map object.
 */
export function addToFunctionMap(
  map: Map<string, REPLFunction>,
  command: string,
  func: REPLFunction
) {
  map.set(command, func);
  return map;
}
