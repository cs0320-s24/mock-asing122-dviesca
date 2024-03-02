import { Dispatch, SetStateAction } from "react";
import { REPLFunction } from "../REPLFunction";
import { searchQueries } from "../../mocked/searchQueries";

interface REPLFunctionProps {
  file: string[][];
  setFile: Dispatch<SetStateAction<string[][]>>;
  modeBrief: boolean;
  setModeBrief: Dispatch<SetStateAction<boolean>>;
}

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
      return returnVal;
    } else {
      return "Error: unable to search; index out of bounds";
    }
  } else {
    return "Error: unable to search; no file found.";
  }
};
