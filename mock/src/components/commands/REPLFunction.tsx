import { Dispatch, SetStateAction } from "react";

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
 * REPLFunction: defines the structre of any function used in a repl
 * Strucuture utilized similar to an interface
 */
export interface REPLFunction {
  (props: REPLFunctionProps, args: Array<string>): String | String[][];
}
