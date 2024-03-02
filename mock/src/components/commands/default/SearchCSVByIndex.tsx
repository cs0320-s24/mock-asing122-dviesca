import { Dispatch, SetStateAction } from "react";
import { REPLFunction } from "../REPLFunction";
import { searchQueries } from "../../mocked/searchQueries";

/**
 * REPLFunctionProps: generalized props for a function used in repl
 * file: the CSV file being operated on
 * setFile: function to update file
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
 * searchCSVByIndex Function
 *
 * Function to search CSV data by index.
 *
 * @param props - The props object containing file, setFile, modeBrief, and setModeBrief.
 * @param args - The arguments passed to the function.
 * @returns A string representing the searched data or an error message.
 */
export const searchCSVByIndex: REPLFunction = (
  props: REPLFunctionProps,
  args: string[]
): string => {
  if (props.file.length > 1) {
    if (Number(args[0]) > 0 && Number(args[0]) < props.file[0].length) {
      var returnVal = "";
      var results = searchQueries.get(args[0] + "," + args[1]) || [[]];
      results.map((row) => {
        row.map((val) => (returnVal += "##" + val));
        returnVal += "###";
      });
      if (returnVal == "###") {
        return "No search found.";
      }
      return returnVal;
    } else {
      return "Error: unable to search; index out of bounds";
    }
  } else {
    return "Error: unable to search; no file found.";
  }
};
