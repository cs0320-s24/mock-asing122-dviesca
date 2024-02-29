import { useState } from "react";
import "../styles/main.css";
import { REPLHistory } from "./REPLHistory";
import { REPLInput } from "./REPLInput";
import { REPLFunction } from "./commands/REPLFunction";
import { addToFunctionMap, defaultFunctionMap } from "./commands/FunctionMap";



/**
 * This is code for the read eval print loop that includes within itself
 * the structure for page elements such as the history. 
 * The page work in two modes: brief or verbose, starting in brief
 * @returns a JSX/react component that represents the UI of the page
 */

// Initialize function map with default REPL functions
export default function REPL() {
  const [history, setHistory] = useState<string[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [modeBrief, setModeBrief] = useState<boolean>(true);
  const [file, setFile] = useState<string[][]>([[]]);
  var functionMap: Map<string, REPLFunction> = new Map();
  // Initialize function map with default REPL functions
  functionMap = defaultFunctionMap();

  // Returns a component representing the REPL
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
