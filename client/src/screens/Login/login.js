import React, { useState } from 'react';
import { Button, Form, Col, Card, InputGroup } from 'react-bootstrap';
import './login.css';
import loginService from '../../services/userservice';
import { useHistory } from 'react-router-dom';
export default function Login() {
  const initialSignUpState = {
    email: '',
    password: '',
  };
  const history = useHistory();
  const [user, setUser] = useState(initialSignUpState);
  const [submitted, setSubmitted] = useState(false);
  const [validated, setValidated] = useState(false);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const navToRegister = () => {
    let path = `register`;
    history.push(path);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    var data = {
      email: user.email,
      password: user.password,
    };
    loginService
      .login(data)
      .then((response) => {
        if (response && response.status === 200) {
          setSubmitted(true);
          let path = `home`;
          history.push(path);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <Card>
      <Card.Header as='h4'>Sign in</Card.Header>
      <Card.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} md='6' controlId='validationFormikEmail'>
              <Form.Label>Email Id</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id='inputGroupPrepend'>@</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type='email'
                  placeholder='Email Id'
                  aria-describedby='inputGroupPrepend'
                  name='email'
                  value={user.email}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type='invalid'>
                  Please provide a email id.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md='6' controlId='validationFormikPass'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                name='password'
                value={user.password}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type='invalid'>
                Please provide a password.
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Button variant='primary' type='submit' className='btnLogin'>
              Login
            </Button>
          </Form.Row>
          <Form.Row> New to this dashboard please register below</Form.Row>
          <Form.Row>
            <Button variant='primary' onClick={navToRegister}>
              Register
            </Button>
          </Form.Row>
        </Form>
      </Card.Body>
    </Card>
  );
}
