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
 * modeSwitch Function
 *
 * Function to switch between brief and verbose mode in the REPL.
 *
 * @param props - The props object containing file, setFile, modeBrief, and setModeBrief.
 * @param args - The arguments passed to the function.
 * @returns A string indicating the success or failure of the mode switch operation.
 */
export const modeSwitch: REPLFunction = (
  props: REPLFunctionProps,
  args: string[]
): string => {
  var splitCommand: string[] = args[0].split(" ");
  if (splitCommand[0] == "mode") {
    if (splitCommand[1] == "brief") {
      props.setModeBrief(true);
      return "Mode switched to brief.";
    } else if (splitCommand[1] == "verbose") {
      props.setModeBrief(false);
      return "Mode switched to verbose.";
    } else {
      return "Error: invalid mode switch.";
    }
  } else {
    return "Error: invalid command.";
  }
};
