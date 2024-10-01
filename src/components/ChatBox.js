import React, { useState, useRef, useEffect } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

function ChatBox({ messages, sendMessage, username }) {
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Chat</Card.Title>
        <div 
          style={{ 
            height: '300px', 
            overflowY: 'auto', 
            marginBottom: '10px',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`mb-2 ${msg.user === username ? 'text-end' : ''}`}
            >
              <div>
                <strong style={{ color: msg.user === username ? '#0d6efd' : '#333' }}>
                  {msg.user === username ? 'You' : msg.user}:
                </strong>
                {msg.type === 'join' || msg.type === 'leave' ? (
                  <em style={{ color: '#6c757d' }}> {msg.text}</em>
                ) : (
                  <span> {msg.text}</span>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
            />
          </Form.Group>
          <Button type="submit" className="mt-2">Send</Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default ChatBox;