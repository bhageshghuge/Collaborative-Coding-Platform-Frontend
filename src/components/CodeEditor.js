import React from "react";
import { Card, Button } from "react-bootstrap";
import AceEditor from "react-ace";

// Import Ace Editor modes, themes, and extensions
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

// Import Ace Editor worker
import "ace-builds/webpack-resolver";

function CodeEditor({ code, onChange, onExecute, roomId, username }) {
  return (
    <Card>
      <Card.Body>
        <AceEditor
          mode="javascript"
          theme="monokai"
          onChange={onChange}
          value={code}
          name="code-editor"
          editorProps={{ $blockScrolling: true }}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,
          }}
          style={{ width: "100%", height: "400px" }}
        />
        <Button onClick={onExecute} className="mt-3">
          Execute Code
        </Button>
      </Card.Body>
    </Card>
  );
}

export default CodeEditor;