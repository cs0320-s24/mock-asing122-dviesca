import { useState } from "react";
import "../styles/main.css";
import { REPLHistory } from "./REPLHistory";
import { REPLInput } from "./REPLInput";
import { REPLFunction } from "./REPLFunction";

export default function REPL() {
  const [history, setHistory] = useState<string[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [modeBrief, setModeBrief] = useState<boolean>(true);
  const [file, setFile] = useState<string[][]>([[]]);
  var functionMap: Map<string, REPLFunction> = new Map();

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
