import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import CodeEditor from "./components/CodeEditor";
import ChatBox from "./components/ChatBox";
import OutputDisplay from "./components/OutputDisplay";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const socket = io("http://localhost:5001");

function App() {
  const [inRoom, setInRoom] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const [code, setCode] = useState("// Start coding here");
  const [messages, setMessages] = useState([]);
  const [output, setOutput] = useState(null);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on("code-update", ({ newCode }) => {
      setCode(newCode);
    });

    socket.on("execution-result", (result) => {
      console.log("Received execution result:", result);
      setOutput(result);
    });

    socket.on("room-data", ({ code: roomCode, messages: roomMessages, output: roomOutput }) => {
      console.log("Received room data:", { roomCode, roomMessages, roomOutput });
      setCode(roomCode);
      setMessages(roomMessages);
      setOutput(roomOutput);
    });

    return () => {
      socket.off("message");
      socket.off("code-update");
      socket.off("execution-result");
      socket.off("room-data");
    };
  }, []);

  const joinRoom = (e) => {
    e.preventDefault();
    if (roomId && username) {
      socket.emit("join-room", { roomId, username });
      setInRoom(true);
    }
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    socket.emit("code-change", { roomId, newCode, username });
  };

  const executeCode = () => {
    console.log("Executing code:", code);
    socket.emit("execute-code", { roomId, code, username });
  };

  const sendMessage = (message) => {
    socket.emit("sendMessage", { roomId, message, username });
  };

  return (
    <Container fluid className="d-flex flex-column vh-100">
      <Row className="flex-grow-1 align-items-center">
        <Col>
          <h1 className="text-center mb-5 platform-header">Collaborative Coding Platform</h1>
          {!inRoom ? (
            <Row className="justify-content-center">
              <Col xs={12} sm={8} md={6} lg={4}>
                <Card className="shadow-lg">
                  <Card.Body>
                    <h2 className="text-center mb-4">Join a Room</h2>
                    <Form onSubmit={joinRoom}>
                      <Form.Group className="mb-3">
                        <Form.Label>Room ID</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter room ID"
                          value={roomId}
                          onChange={(e) => setRoomId(e.target.value)}
                          required
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                        />
                      </Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" type="submit" size="lg">
                          Join Room
                        </Button>
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          ) : (
            <>
              <Row>
                <Col md={8}>
                  <CodeEditor
                    code={code}
                    onChange={handleCodeChange}
                    onExecute={executeCode}
                    roomId={roomId}
                    username={username}
                  />
                  <OutputDisplay output={output} />
                </Col>
                <Col md={4}>
                  <ChatBox 
                    messages={messages} 
                    sendMessage={sendMessage}
                    username={username}
                  />
                </Col>
              </Row>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default App;