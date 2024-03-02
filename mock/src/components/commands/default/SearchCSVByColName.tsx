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
 * searchCSVByColName Function
 *
 * Function to search CSV data by column name.
 *
 * @param props - The props object containing file, setFile, modeBrief, and setModeBrief.
 * @param args - The arguments passed to the function.
 * @returns A string representing the searched data or an error message.
 */
export const searchCSVByColName: REPLFunction = (
  props: REPLFunctionProps,
  args: string[]
): string => {
  if (props.file.length > 1) {
    var returnVal = "";
    var results = searchQueries.get(args[0] + "," + args[1]) || [[]];
    results.map((row) => {
      row.map((val) => (returnVal += "##" + val));
      returnVal += "###";
    });
    return returnVal;
  } else {
    return "Error: unable to search; no file found.";
  }
};
