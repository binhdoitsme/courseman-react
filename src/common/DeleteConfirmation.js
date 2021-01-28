import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

export default function DeleteConfirmation(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onSuccess = result => {
    handleClose();
  };
  const onFailure = err => {
    handleClose();
  };
  const onAction = () => {
    try {
      onSuccess(props.action());
    } catch (err) {
      onFailure(err);
    }
  };

  return (
    <>
      <Button variant="danger" onClick={handleShow}>Delete</Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Confirm delete</Modal.Title>
          <button type="button" className="btn-close btn-sm" onClick={handleClose}></button>
        </Modal.Header>
        
        <Modal.Body>Delete this resource?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" size="sm" onClick={onAction}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};