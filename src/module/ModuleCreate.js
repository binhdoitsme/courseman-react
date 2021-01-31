import React, { useState } from "react";
import { Button, Form, FormCheck, FormControl, FormGroup, Modal } from "react-bootstrap";
import moduleAPI from "./ModuleAPI";

export default function ModuleCreate(props) {
  const [show, setShow] = useState(false);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [semester, setSemester] = useState(0);
  const [credits, setCredits] = useState(0);
  const [compulsory, setCompulsory] = useState(false);
  const [departmentName, setDepartmentName] = useState("");

  const handleClose = () => {
    setShow(false);
    setCode("");
    setName("");
    setSemester(0);
    setCredits(0);
    setCompulsory(false);
    setDepartmentName("");
  }
  const handleShow = () => setShow(true);

  const getSubmitBody = () => {
    const core = {
      "code": code,
      "name": name,
      "semester": semester,
      "credits": credits,
      "compulsory": compulsory
    };
    if (compulsory === false) {
      return { 
        ...core,
        "departmentName": departmentName
      };
    } else {
      return core;
    }
  };

  const onSuccess = created => {
    props.onSuccess(created);
    handleClose();
  };
  
  return (
    <>
      <Button variant="primary" onClick={handleShow}>+ New module</Button>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header>
          <Modal.Title>Create new module</Modal.Title>
          <button type="button" className="btn-close btn-sm" onClick={handleClose}></button>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <FormGroup>
              <Form.Label>Code: </Form.Label>
              <FormControl type="text" value={code} required
                onChange={e => setCode(e.target.value)} />
            </FormGroup>
            <br />
            <FormGroup>
              <Form.Label>Name: </Form.Label>
              <FormControl type="text" value={name} required
                onChange={e => setName(e.target.value)} />
            </FormGroup>
            <br />
            <FormGroup>
              <Form.Label>Semester: </Form.Label>
              <FormControl type="number" min={0} value={semester} required
                onChange={e => setSemester(Number(e.target.value))} />
            </FormGroup>
            <br />
            <FormGroup>
              <Form.Label>Credits: </Form.Label>
              <FormControl type="number" min={0} max={10} value={credits} required
                onChange={e => setCredits(Number(e.target.value))} />
            </FormGroup>
            <br />
            <FormGroup className="d-flex">
              <Form.Label className="me-4">Required? </Form.Label>
              <FormCheck checked={compulsory}
                onChange={e =>{ setCompulsory(Boolean(e.target.checked))}} />
            </FormGroup>
            { compulsory === true ? null 
            : <>
              <br />
              <FormGroup>
                <Form.Label>Department</Form.Label>
                <FormControl type="text" value={departmentName} required
                onChange={e => setDepartmentName(e.target.value)} />
              </FormGroup></>}
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" type="submit" onClick={() => 
            moduleAPI.create(getSubmitBody(), onSuccess, props.onFailure)
          }>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}