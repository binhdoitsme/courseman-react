import React, { useState } from "react";
import { Button, Form, FormControl, FormGroup, Modal } from "react-bootstrap";
import studentAPI from "./StudentAPI";

export default function (props) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");

  const handleClose = () => {
    setShow(false);
    setName("");
    setDob("");
  }
  const handleShow = () => setShow(true);

  const getSubmitBody = () => ({
    "name": name,
    "dob": dob
  });

  const onSuccess = created => {
    console.log(created);
    props.onSuccess(created);
    handleClose();
  };
  const onFailure = error => {};
  
  return (
    <>
      <Button variant="primary" onClick={handleShow}>+ New student</Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Create new student</Modal.Title>
          <button type="button" className="btn-close btn-sm" onClick={handleClose}></button>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FormGroup>
              <Form.Label>Name: </Form.Label>
              <FormControl type="text" value={name} onChange={e => setName(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <Form.Label>Date of birth: </Form.Label>
              <FormControl type="date" value={dob} onChange={e => setDob(e.target.value)} />
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" onClick={() => 
            studentAPI.create(getSubmitBody(), onSuccess, onFailure)
          }>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
