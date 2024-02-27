import { Dispatch, SetStateAction } from "react";
import { REPLFunction } from "../REPLFunction";

interface REPLFunctionProps {
  file: string[][];
  setFile: Dispatch<SetStateAction<string[][]>>;
}

export const viewCSV: REPLFunction = (
  props: REPLFunctionProps,
  args: string[]
): string => {
  var returnVal = "";
  if (props.file.length > 1) {
    props.file.map((row) => {
      row.map((val) => (returnVal += "##" + val));
      returnVal += "###";
    });
    return returnVal;
  } else {
    return "Error: unable to view; no file found.";
  }
};
