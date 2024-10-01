import React from 'react';
import { Card } from 'react-bootstrap';

function OutputDisplay({ output }) {
  console.log("OutputDisplay rendering with output:", output);

  let displayOutput = "No output yet";

  if (output) {
    if (output.success) {
      const { consoleOutput, returnValue } = output.result;
      displayOutput = "";
      if (consoleOutput) {
        displayOutput += `Console output:\n${consoleOutput}\n`;
      }
      if (returnValue !== undefined) {
        displayOutput += `\nReturn value:\n${returnValue}`;
      }
      displayOutput = displayOutput.trim() || "Code executed successfully with no output";
    } else {
      displayOutput = `Error: ${output.error}`;
    }
  }

  return (
    <Card className="mt-3">
      <Card.Header>Output</Card.Header>
      <Card.Body>
        <pre className="mb-0">{displayOutput}</pre>
      </Card.Body>
    </Card>
  );
}

export default OutputDisplay;