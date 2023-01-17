import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
        const response = await axios.post('http://localhost:8080/register', { email, password,username });
        console.log(response);
    } catch (error) {
        setError(error);
    }
    setIsLoading(false);
  }

  return (
    <div className="d-flex justify-content-center align-items-centerh-100">
    <Form onSubmit={handleSubmit} className="border p-3">
    <h1 className="text-center mb-3">Register</h1>
        <Form.Group className="my-3">
    <Form.Label>Username</Form.Label>
    <Form.Control
      type="text"
      placeholder="Enter username"
      value={username}
      onChange={(event) => setUsername(event.target.value)}
      required
    />
  </Form.Group>
      <Form.Group className="my-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="my-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </Form.Group>

      {isLoading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}

      <Button variant="primary" type="submit">
        Register
      </Button>
    </Form>
    </div>
  );
}

export default RegisterForm;
