import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { REPLFunction } from "./commands/REPLFunction";
import { CSVmap } from "./mocked/CSVMap";
import { searchQueries } from "./mocked/searchQueries";

interface REPLInputProps extends REPLFunctionProps {
  history: string[];
  setHistory: Dispatch<SetStateAction<string[]>>;
  commandHistory: string[];
  setCommandHistory: Dispatch<SetStateAction<string[]>>;
  functionMap: Map<string, REPLFunction>;
  file: string[][];
  setFile: Dispatch<SetStateAction<string[][]>>;
  modeBrief: boolean;
  setModeBrief: Dispatch<SetStateAction<boolean>>;
}

interface REPLFunctionProps {
  file: string[][];
  setFile: Dispatch<SetStateAction<string[][]>>;
  modeBrief: boolean;
  setModeBrief: Dispatch<SetStateAction<boolean>>;
}

export function REPLInput(props: REPLInputProps) {
  const [commandString, setCommandString] = useState<string>("");

  function handleSubmit() {
    var splitCommand: string[] = commandString.split(" ");
    if (splitCommand.length != 0) {
      var output = props.functionMap.get(splitCommand[0]) || noCommandFound;
      props.setHistory([
        ...props.history,
        String(output(props, [commandString])),
      ]);
    }
    props.setCommandHistory([...props.commandHistory, commandString]);
    setCommandString("");
  }

  const noCommandFound: REPLFunction = (
    props: REPLFunctionProps,
    args: string[]
  ): string => {
    return "Error: invalid command.";
  };

  return (
    <div className="repl-input">
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

function loadCSV(props: REPLInputProps, fileName: string) {
  var file = CSVmap.get(fileName) || [[]];
  props.setFile(file);
  if (file.length > 1) {
    return "File successfully loaded.";
  } else {
    return "Error: unable to load file; invalid file path.";
  }
}

function viewCSV(props: REPLInputProps) {
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
}

function searchCSVByColName(
  props: REPLInputProps,
  column: string,
  val: string
) {
  if (props.file.length > 1) {
    var returnVal = "";
    var results = searchQueries.get(column + "," + val) || [[]];
    results.map((row) => {
      row.map((val) => (returnVal += "##" + val));
      returnVal += "###";
    });
    return returnVal;
  } else {
    return "Error: unable to search; no file found.";
  }
}

function searchCSVByIndex(props: REPLInputProps, index: string, val: string) {
  if (props.file.length > 1) {
    var returnVal = "";
    var results = searchQueries.get(Number(index) + "," + val) || [[]];
    results.map((row) => {
      row.map((val) => (returnVal += "##" + val));
      returnVal += "###";
    });
    return returnVal;
  } else {
    return "Error: unable to search; no file found.";
  }
}
export { CSVmap, searchQueries };
