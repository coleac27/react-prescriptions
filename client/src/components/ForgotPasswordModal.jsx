import React, { useState } from 'react'
import {Modal, Form, Button} from 'react-bootstrap';
import { doPasswordReset } from '../firebase/auth';

export default function ForgotPasswordModal({isModalOpen, onClose}) {
  
  const [form, setForm] = useState({
    email: "",
  });

  const setFormValue = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleReset = async (e) => {
    e.preventDefault();
    console.log("Submitting email:", form.email)
    if (!form.email || !form.email.trim()) {
      alert("Please enter a valid email address");
      return;
    }
    try{
      await doPasswordReset(form.email.trim());
      alert("Password reset email sent! Please check your email.");
      setForm({ email: "" });
      onClose();
    } catch(error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(error.message);
      console.error("Error sending password reset email:", errorCode, errorMessage);
    }
  }

  if(!isModalOpen) return null;
  return (
    <div>
      <Modal show={isModalOpen} onHide={onClose} centered size="lg">
        <Modal.Header closeButton/>
        <Modal.Body>
          <Form onSubmit={handleReset}>
            <Form.Group className="my-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control 
                type="email"
                value={form.email}
                onChange={(e) => setFormValue("email", e.target.value)} />
            </Form.Group>
            <Button variant="primary rounded-pill" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}
