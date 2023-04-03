// Login.js
import React, { useState } from 'react';
import { Container, Row, Col, Image, Form, Button } from 'react-bootstrap';
import { gql, useMutation } from '@apollo/client';
import login from '../login.png';

// mutation for user login
const LOGIN_USER = gql`
mutation Login( $email: String!, $password: String! ) {
	login( email: $email, password: $password)
  {
      username
      email
      userType
  }
}
`;

// Login function component
function Login() {
  const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER);
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const { data } = await loginUser({
        variables: { email, password },
      });
      console.log('Logged in as:', data.login);
      sessionStorage.setItem("username", data.login.username);
      window.location.href = '/home';
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="App">
      <Container fluid>
        <Row>
          <Col>
            <Image
              src={login}
              width="100%"
              alt="Nurse Icon"
              fluid
              rounded="true" />
          </Col>
          <Col xs={8}>
            <h2>Login</h2>
            <p>Login to access and record daily medical information!</p>
            <Form onSubmit={handleLogin}>
              <Form.Group>
                <Form.Control
                  className="mb-3"
                  id="email"
                  type="email"
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="&#xF0E0; email" />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  className="mb-3"
                  id="password"
                  type="password"
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="&#xF023; password" />
              </Form.Group>
              {loading ? <p style={{ color: 'blue' }}>Submitting</p> : <div></div>}
              {error ? <p style={{ color: 'red' }}>{error.message}</p> : <div></div>}
              <Button size="sm" variant="success" type="submit" >&#xF090; Login</Button>
            </Form>
          </Col>
        </Row>
      </Container>

    </div>
  );
}
//
export default Login;