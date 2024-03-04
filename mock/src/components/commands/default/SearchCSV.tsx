import { Dispatch, SetStateAction } from "react";
import { REPLFunction } from "../REPLFunction";
import { searchCSVByColName } from "./SearchCSVByColName";
import { searchCSVByIndex } from "./SearchCSVByIndex";

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
 * searchCSV Function
 *
 * Function to perform a search operation on CSV data based on provided arguments.
 *
 * @param props - The props object containing file, setFile, modeBrief, and setModeBrief.
 * @param args - The arguments passed to the function.
 * @returns A string representing the searched data or an error message.
 */
export const searchCSV: REPLFunction = (
  props: REPLFunctionProps,
  args: string[]
): string => {
  var searchFields = args[0]
    .split(/<|>/)
    .filter((val) => val != "" && val != " ")
    .map((v) => v.trim());
  if (searchFields.length == 3) {
    if (!isNaN(Number(searchFields[1]))) {
      return String(
        searchCSVByIndex(props, [searchFields[1], searchFields[2]])
      );
    } else {
      return String(
        searchCSVByColName(props, [searchFields[1], searchFields[2]])
      );
    }
  }
  return "Error: invalid search; incorrect number of arguments.";
};
