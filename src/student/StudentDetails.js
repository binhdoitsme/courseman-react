import React, { useState } from 'react';
import { Button, Form, FormControl, FormGroup, Modal } from 'react-bootstrap';
import DeleteConfirmation from "../common/DeleteConfirmation";

function StudentDetailsLine(props) {
  const verticalAlignCell = { verticalAlign: "middle" };

  return (
    <>
      <tr style={{ cursor: "pointer" }}>
        <td style={verticalAlignCell} onClick={props.onClick}>{props.index}</td>
        <td style={verticalAlignCell} onClick={props.onClick}>{props.id}</td>
        <td style={verticalAlignCell} onClick={props.onClick}>{props.name}</td>
        <td style={verticalAlignCell} onClick={props.onClick}>{props.dob}</td>
        <td style={verticalAlignCell}>
          <DeleteConfirmation action={() => props.deleteAction(props.id)} />
        </td>
      </tr>
    </>
  )
}

export default function StudentDetails(props) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState(props.name);
  const [dob, setDob] = useState(props.dob);
  const [changed, setChanged] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = (name, dob) => setChanged(name !== props.name || dob !== props.dob);

  return (
    <>
      <StudentDetailsLine onClick={handleShow} {...props} />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Student details</Modal.Title>
          <button type="button" className="btn-close btn-sm" onClick={handleClose}></button>
        </Modal.Header>
        
        <Modal.Body>
          <Form>
            <FormGroup>
              <Form.Label>ID: </Form.Label>
              <FormControl type="text" value={props.id} disabled />
            </FormGroup>
            <br />
            <FormGroup>
              <Form.Label>Name: </Form.Label>
              <FormControl type="text" value={name} onChange={e => {
                setName(e.target.value); handleChange(e.target.value, dob);}} />
            </FormGroup>
            <br />
            <FormGroup>
              <Form.Label>Date of birth: </Form.Label>
              <FormControl type="date" value={dob} onChange={e => {
                setDob(e.target.value); handleChange(name, e.target.value);}} />
            </FormGroup>
          </Form>
        </Modal.Body>
        
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" onClick={props.onAction} disabled={!changed}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
};