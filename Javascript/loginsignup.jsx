import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';

function LoginSignup() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    password: '',
  });
  const navigate = useNavigate();
  const handleAuthentication = async (formData) => {
    const simulatedResponse = {
      success: true, 
    };

    if (!simulatedResponse.success) {
      throw new Error('Login/Signup failed!'); 
    }

    return simulatedResponse;
  };

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault(); 

    try {
      const response = await handleAuthentication(formData);

      if (response.success) {
        
        navigate('/App'); 
      } else {
        console.error('Login/Signup failed!'); 
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode); 
  };

  return (
    <Container fluid className="login-signup-container">
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <Card>
            <Card.Header as="h5">{isLoginMode ? 'Login' : 'Sign Up'}</Card.Header>
            <Card.Body>
              <Form onSubmit={handleFormSubmit}>
                <Form.Group controlId="formBasicName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  {isLoginMode ? 'Login' : 'Sign Up'}
                </Button>
                <Form.Text className="text-muted mt-3">
                  {isLoginMode ? (
                    'Don\'t have an account? '
                  ) : (
                    'Already have an account? '
                  )}
                  <span onClick={toggleMode} style={{ cursor: 'pointer' }}>
                    {isLoginMode ? 'Sign Up' : 'Login'}
                  </span>
                </Form.Text>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginSignup;
