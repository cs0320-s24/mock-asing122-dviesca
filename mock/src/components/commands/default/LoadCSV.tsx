import { Dispatch, SetStateAction } from "react";
import { REPLFunction } from "../REPLFunction";
import { CSVmap } from "../../mocked/CSVMap";

interface REPLFunctionProps {
  file: string[][];
  setFile: Dispatch<SetStateAction<string[][]>>;
  modeBrief: boolean;
  setModeBrief: Dispatch<SetStateAction<boolean>>;
}

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
