import React, { useState } from 'react';
import { Button, Form, Col, Card, InputGroup } from 'react-bootstrap';
import registerService from '../../services/userservice';
import { useHistory, Redirect } from 'react-router-dom';

export default function Signup() {
  const initialSignUpState = {
    first_name: '',
    last_name: '',
    email: '',
    mobile: '',
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);

    var data = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      mobile: user.mobile,
      password: user.password,
    };

    registerService
      .register(data)
      .then((respons) => {
        if (respons.status && respons.status === 200) {
          setUser({
            first_name: respons.data.first_name,
            last_name: respons.data.last_name,
            email: respons.data.email,
            mobile: respons.data.mobile,
            password: respons.data.password,
          });
          setSubmitted(true);
          let path = `login`;
          history.push(path);
        } else if (respons.status && respons.status === 202) {
          alert('record already exist');
        } else {
          console.log(respons.data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  if (submitted === true) {
    return <Redirect to='/login' />;
  } else {
    return (
      <Card>
        <Card.Header as='h4'>Register</Card.Header>
        <Card.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} md='4' controlId='validationFormik01'>
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type='text'
                  name='first_name'
                  placeholder='First Name'
                  value={user.first_name}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type='invalid'>
                  Please provide a first name.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md='4' controlId='validationFormik02'>
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Last Name'
                  name='last_name'
                  value={user.last_name}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type='invalid'>
                  Please provide a last name.
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} md='4' controlId='validationFormikEmail'>
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
              <Form.Group as={Col} md='4' controlId='validationFormikMobile'>
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Mobile Number'
                  name='mobile'
                  value={user.mobile}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type='invalid'>
                  Please provide a mobile number.
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} md='8' controlId='validationFormikPass'>
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
            <Button type='submit'>Register</Button>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}
