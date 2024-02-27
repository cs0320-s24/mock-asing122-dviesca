import { Dispatch, SetStateAction } from "react";
import { REPLFunction } from "../REPLFunction";
import { CSVmap } from "../REPLInput";

interface REPLFunctionProps {
  file: string[][];
  setFile: Dispatch<SetStateAction<string[][]>>;
}

export const loadCSV: REPLFunction = (
  props: REPLFunctionProps,
  args: string[]
): string => {
  var file = CSVmap.get(args[0]) || [[]];
  props.setFile(file);
  if (file.length > 1) {
    return "File successfully loaded.";
  } else {
    return "Error: unable to load file; invalid file path.";
  }
};
