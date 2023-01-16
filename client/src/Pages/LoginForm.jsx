import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
        const response = await axios.post('http://localhost:8080/login', { email, password });
        console.log(response);
        if (response.status === 200) {
          localStorage.setItem("token", response.data.token);
          axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`;
          // decode the JWT token and retrieve the user's information
          const decoded = jwt_decode(localStorage.getItem("token"));
          console.log(decoded);
          // you can access the user's information like this:
          localStorage.setItem("userInfo", {'userEmail':decoded.email, 'userName': decoded.username})
      }
    } catch (error) {
        setError(error);
    }
    setIsLoading(false);
  }
  console.log(isLoading);
  console.log(error);

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </Form.Group>

      <Form.Group>
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
        Login
      </Button>
    </Form>
  );
}

export default LoginForm;


// ('test1@example.com', 'password1'),
// ('test2@example.com', 'password2'),
// ('test3@example.com', 'password3');
