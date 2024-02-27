import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { REPLFunction } from "./REPLFunction";
import { CSVmap } from "./mocked/CSVMap";
import { searchQueries } from "./mocked/searchQueries";

interface REPLInputProps {
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

export function REPLInput(props: REPLInputProps) {
  const [commandString, setCommandString] = useState<string>("");

  function handleSubmit() {
    var splitCommand: string[] = commandString.split(" ");
    if (splitCommand.length != 0) {
      if (splitCommand[0] == "load_file") {
        var searchFields = commandString
          .split(/<|>/)
          .filter((val) => val != "" && val != " ")
          .map((v) => v.trim());
        if (searchFields.length == 2) {
          props.setHistory([...props.history, loadCSV(props, searchFields[1])]);
        } else {
          props.setHistory([
            ...props.history,
            "Error: invalid load; incorrect number of arguments.",
          ]);
        }
      } else if (commandString == "view") {
        props.setHistory([...props.history, viewCSV(props)]);
      } else if (splitCommand[0] == "search") {
        var searchFields = commandString
          .split(/<|>/)
          .filter((val) => val != "" && val != " ")
          .map((v) => v.trim());
        if (searchFields.length == 3) {
          if (!isNaN(Number(splitCommand[1]))) {
            props.setHistory([
              ...props.history,
              searchCSVByIndex(props, splitCommand[1], searchFields[2]),
            ]);
          } else {
            props.setHistory([
              ...props.history,
              searchCSVByColName(props, searchFields[1], searchFields[2]),
            ]);
          }
        } else {
          props.setHistory([
            ...props.history,
            "Error: invalid search; incorrect number of arguments.",
          ]);
        }
      } else if (splitCommand[0] == "mode") {
        if (splitCommand[1] == "brief") {
          props.setModeBrief(true);
          props.setHistory([...props.history, "Mode switched to brief."]);
        } else if (splitCommand[1] == "verbose") {
          props.setModeBrief(false);
          props.setHistory([...props.history, "Mode switched to verbose."]);
        } else {
          props.setHistory([...props.history, "Error: invalid mode switch."]);
        }
      } else {
        props.setHistory([...props.history, "Error: invalid command."]);
      }
    }
    props.setCommandHistory([...props.commandHistory, commandString]);
    setCommandString("");
  }

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
export { CSVmap };
