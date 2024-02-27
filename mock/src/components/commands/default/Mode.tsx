import { Dispatch, SetStateAction } from "react";
import { REPLFunction } from "../REPLFunction";

interface REPLFunctionProps {
  file: string[][];
  setFile: Dispatch<SetStateAction<string[][]>>;
  modeBrief: boolean;
  setModeBrief: Dispatch<SetStateAction<boolean>>;
}

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
