import React, { useState } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';

function AuthComponent({ onAuth }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAuth({ username, password, isLogin });
  };

  return (
    <Row className="justify-content-center">
      <Col md={6}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">{isLogin ? 'Login' : 'Register'}</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100 mb-3">
                {isLogin ? 'Login' : 'Register'}
              </Button>
            </Form>
            <div className="text-center">
              <Button variant="link" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default AuthComponent;