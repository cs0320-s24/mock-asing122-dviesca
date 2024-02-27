import { useState } from "react";
import "../styles/main.css";
import { REPLHistory } from "./REPLHistory";
import { REPLInput } from "./REPLInput";
import { REPLFunction } from "./commands/REPLFunction";
import { addToFunctionMap } from "./commands/FunctionMap";
import { loadCSV } from "./commands/default/LoadCSV";
import { viewCSV } from "./commands/default/ViewCSV";
import { searchCSV } from "./commands/default/SearchCSV";

export default function REPL() {
  const [history, setHistory] = useState<string[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [modeBrief, setModeBrief] = useState<boolean>(true);
  const [file, setFile] = useState<string[][]>([[]]);
  var functionMap: Map<string, REPLFunction> = new Map();
  addToFunctionMap(functionMap, "load_file", loadCSV);
  addToFunctionMap(functionMap, "view", viewCSV);
  addToFunctionMap(functionMap, "search", searchCSV);

  return (
    <div className="repl">
      <REPLHistory
        history={history}
        commandHistory={commandHistory}
        modeBrief={modeBrief}
      />
      <hr></hr>
      <REPLInput
        history={history}
        setHistory={setHistory}
        commandHistory={commandHistory}
        setCommandHistory={setCommandHistory}
        functionMap={functionMap}
        file={file}
        setFile={setFile}
        modeBrief={modeBrief}
        setModeBrief={setModeBrief}
      />
    </div>
  );
}
