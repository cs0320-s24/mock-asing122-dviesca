import { Dispatch, SetStateAction } from "react";
import { REPLFunction } from "../REPLFunction";

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
 * viewCSV Function
 *
 * Function to view CSV data.
 *
 * @param props - The props object containing file, setFile, modeBrief, and setModeBrief.
 * @param args - The arguments passed to the function.
 * @returns A string representing the CSV data or an error message.
 */
export const viewCSV: REPLFunction = (
  props: REPLFunctionProps,
  args: string[]
): string => {
  var returnVal = "";
  if (args[0] == "view") {
    if (props.file.length > 1) {
      props.file.map((row) => {
        row.map((val) => (returnVal += "##" + val));
        returnVal += "###";
      });
      return returnVal;
    } else {
      return "Error: unable to view; no file found.";
    }
  }
  return "Error: unable to view; incorrect number of arguments.";
};
