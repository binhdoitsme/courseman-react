import React, { useState } from "react";
import { Button, Form, FormCheck, FormControl, FormGroup, Modal } from "react-bootstrap";
import DeleteConfirmation from "../common/DeleteConfirmation";

function ModuleDetailLine(props) {
  const verticalAlignCell = { verticalAlign: "middle" };
  return (
    <tr style={{ cursor: "pointer" }}>
      <td style={verticalAlignCell} onClick={props.onClick}>{props.index + 1}</td>
      <td style={verticalAlignCell} onClick={props.onClick}>{props.id}</td>
      <td style={verticalAlignCell} onClick={props.onClick}>{props.code}</td>
      <td style={verticalAlignCell} onClick={props.onClick}>{props.name}</td>
      <td style={verticalAlignCell} onClick={props.onClick}>{props.semester}</td>
      <td style={verticalAlignCell} onClick={props.onClick}>{props.credits}</td>
      { props.filtering ? null
      : <td style={verticalAlignCell} onClick={props.onClick}>
        <FormCheck disabled checked={props.compulsory} />
      </td>}
      <td style={verticalAlignCell}>
        <DeleteConfirmation action={() => props.deleteAction(props.id)} />
      </td>
    </tr>
  )
}

export default function ModuleDetails(props) {
  const compulsory = props.compulsory;
  
  const [show, setShow] = useState(false);
  const [hasModal, setHasModal] = useState(false);
  const [code, setCode] = useState(props.code);
  const [name, setName] = useState(props.name);
  const [semester, setSemester] = useState(props.semester);
  const [credits, setCredits] = useState(props.credits);
  const [departmentName, setDepartmentName] = useState(props.departmentName );
  const [changed, setChanged] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setHasModal(true);
  };
  const handleChange = (code, name, semester, credits, compulsory, departmentName) => 
    setChanged(
      code !== props.code
      || name !== props.name
      || semester !== props.semester
      || credits !== props.credits
      || (compulsory === false && departmentName !== props.departmentName)
    );

  const getSubmitBody = () => {
    const core = {
      "id": Number(props.id),
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
  
  const handleUpdate = () => {
    props.updateAction(getSubmitBody());
    handleClose();
  };

  return (
    <>
      <ModuleDetailLine {...props} onClick={handleShow} />
      {hasModal === true ? 
      <Modal show={show} onHide={handleClose} size="lg"
        onExited={() => setHasModal(false)}>
        <Modal.Header>
          <Modal.Title>Module details</Modal.Title>
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
              <Form.Label>Code: </Form.Label>
              <FormControl type="text" value={code} required
                onChange={e => {
                  const newCode = e.target.value;
                  setCode(newCode); 
                  handleChange(newCode, name, semester, credits, compulsory, departmentName);
                }} />
            </FormGroup>
            <br />
            <FormGroup>
              <Form.Label>Name: </Form.Label>
              <FormControl type="text" value={name} required
                onChange={e => {
                  const newName = e.target.value;
                  setName(newName); 
                  handleChange(code, newName, semester, credits, compulsory, departmentName);
                }} />
            </FormGroup>
            <br />
            <FormGroup>
              <Form.Label>Semester: </Form.Label>
              <FormControl type="number" min={0} value={semester} required
                onChange={e => {
                  const newSemester = Number(e.target.value);
                  setSemester(newSemester); 
                  handleChange(code, name, newSemester, credits, compulsory, departmentName);
                }} />
            </FormGroup>
            <br />
            <FormGroup>
              <Form.Label>Credits: </Form.Label>
              <FormControl type="number" min={0} max={10} value={credits} required
                onChange={e => {
                  const newCredits = Number(e.target.value);
                  setCredits(newCredits); 
                  handleChange(code, name, semester, newCredits, compulsory, departmentName);
                }} />
            </FormGroup>
            <br />
            <FormGroup className="d-flex">
              <Form.Label className="me-4">Required? </Form.Label>
              <FormCheck checked={compulsory} disabled />
            </FormGroup>
            { compulsory === true ? null 
            : <>
              <br />
              <FormGroup>
                <Form.Label>Department</Form.Label>
                <FormControl type="text" value={departmentName} required
                onChange={e => {
                  const newDepartment = e.target.value;
                  setDepartmentName(newDepartment); 
                  handleChange(code, name, semester, credits, compulsory, newDepartment);
                }} />
              </FormGroup></>}
          </Form>
        </Modal.Body>
        
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" 
            onClick={handleUpdate} disabled={!changed}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      : null}
    </>
  );
}