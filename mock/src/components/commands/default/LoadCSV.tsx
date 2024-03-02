import { Dispatch, SetStateAction } from "react";
import { REPLFunction } from "../REPLFunction";
import { CSVmap } from "../../mocked/CSVMap";

/**
 * REPLFunctionProps: generalized props for a function used in repl
  * file: the CSV file being operated on
  * modeBrief: a boolean indicating whether in brief or vermbose mode
  * setModeBrief: function to update modeBrief
 */
interface REPLFunctionProps {
  file: string[][];
  setFile: Dispatch<SetStateAction<string[][]>>;
  modeBrief: boolean;
  setModeBrief: Dispatch<SetStateAction<boolean>>;
}

/**
 * Definition of the specific replfunction LoadCSV that loads/stages a csv
 * from a string filepath to be used in other functions
 * @param props REPLFunctionProps defined above
 * @param args 
 * @returns a react component for the input block and submit button after a 
 *          load command is executed
 */
export const loadCSV: REPLFunction = (
  props: REPLFunctionProps,
  args: string[]
): string => {
  var loadFields = args[0]
    .split(/<|>/)
    .filter((val) => val != "" && val != " ")
    .map((v) => v.trim());
  if (loadFields.length == 2) {
    if (loadFields[1].startsWith("../")) {
      return "Error: invalid load; unable to go outside protected directory";
    } else {
      var file = CSVmap.get(loadFields[1]) || [[]];
      props.setFile(file);
      if (file.length > 1) {
        return "File successfully loaded.";
      } else {
        return "Error: unable to load file; invalid file path.";
      }
    }
  }
  return "Error: invalid load; incorrect number of arguments.";
};


