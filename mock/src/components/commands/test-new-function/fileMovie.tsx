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
 * viewCSV Function
 *
 * Shorthand for LoadCSV that loads movie.csv
 *
 * @param props REPLFunctionProps defined above
 * @param args
 * @returns a react component for the input block and submit button after a
 *          load command is executed
 */
export const fileMovie: REPLFunction = (
  props: REPLFunctionProps,
  args: string[]
): string => {
  var file = CSVmap.get("movies.csv") || [[]];
  props.setFile(file);
  if (props.file.length > 1) {
    return "File successfully loaded.";
  } else {
    return "Error: unable to load file.";
  }
};
