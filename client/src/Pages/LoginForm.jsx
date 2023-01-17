import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
        const response = await axios.post('http://localhost:8080/login', { email, password });
        console.log(response);
        if (response.status === 200) {
          localStorage.setItem("token", response.data.token);
          // decode the JWT token and retrieve the user's information
          const decoded = jwt_decode(localStorage.getItem("token"));
          console.log(decoded);
          // you can access the user's information like this:
          localStorage.setItem("userInfo", JSON.stringify(decoded))
  
          navigate("/");
      }
    } catch (error) {
        setError(error);
    }
    setIsLoading(false);
  }
  console.log(isLoading);
  console.log(error);

  return (
    <div className="d-flex justify-content-center align-items-center h-100">
    <Form onSubmit={handleSubmit} className="border p-3">
    <h1 className="text-center mb-3">Login</h1>
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
 
     <Button variant="primary" type="submit" className="my-3">
         Login
     </Button>
     <div className="text-center mt-3">
         Don't have an account? 
         <a href='/register'>Register</a>
     </div>
     </Form>
 </div>
  );
}

export default LoginForm;


// ('test1@example.com', 'password1'),
