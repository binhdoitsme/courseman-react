import React, { useEffect, useState } from "react";
import { Button, Form, FormControl, FormGroup, Modal } from "react-bootstrap";
import enrolmentAPI from "./EnrolmentAPI";

export default function EnrolmentCreate(props) {
  const [show, setShow] = useState(false);
  const [hasModal, setHasModal] = useState(false);
  const [moduleId, setModuleId] = useState(undefined);
  const [studentId, setStudentId] = useState(undefined);
  const [module, setModule] = useState(undefined);
  const [student, setStudent] = useState(undefined);
  const [internal, setInternal] = useState(undefined);
  const [exam, setExam] = useState(undefined)
  const [changed, setChanged] = useState(false);

  const resetState = () => {
    setModuleId(undefined);
    setStudentId(undefined);
    setModule(undefined);
    setStudent(undefined);
    setInternal(undefined);
    setExam(undefined);
    setChanged(false);
  };

  const handleClose = () => {
    setShow(false);
    resetState();
  };

  const handleShow = () => {
    setShow(true);
    setHasModal(true);
  };

  const handleChange = (student, module) => {
    if (!module || !student) {
      setChanged(false);
      return;
    }
    setChanged(studentId || moduleId || internal || exam);
  }
  
  const getSubmitBody = () => {
    const core = {
      "id": props.id,
      "student": student,
      "module": module
    };
    if (internal >= 0 && exam >= 0) {
      return {
        ...core,
        "internalMark": internal,
        "examMark": exam
      };
    } else if (internal < 0) {
      return {
        ...core,
        "examMark": exam
      };
    } else if (exam < 0) {
      return {
        ...core,
        "internalMark": internal
      }
    }
  };

  const handleUpdate = () => {
    props.updateAction(getSubmitBody());
    handleClose();
  };

  const updateStudent = (event) => {
    props.updateField(
      "student", studentId,
      setStudent,
      err => window.alert(err)
    );
  };

  const updateModule = (event) => {
    props.updateField(
      "module", moduleId,
      setModule,
      err => window.alert(err)
    );
  };

  useEffect(() => {
    handleChange(student, module);
  }, [studentId, moduleId, student, module, internal, exam]);

  return (
    <>
      <Button onClick={handleShow} {...props}>+ New enrolment</Button>
      {hasModal === true ? 
      <Modal show={show} onHide={handleClose} size="lg"
        onExited={() => setHasModal(false)}>
        <Modal.Header>
          <Modal.Title>Enrolment details</Modal.Title>
          <button type="button" className="btn-close btn-sm" onClick={handleClose}></button>
        </Modal.Header>
        
        <Modal.Body>
          <Form>
            <FormGroup>
              <Form.Label>Student ID: </Form.Label>
              <FormControl type="number" value={studentId}
                onChange={e => {
                  setStudentId(Number(e.target.value));
                  handleChange(student, module);
                }} onBlur={updateStudent} />
              <br />
              <Form.Label>Student info: </Form.Label>
              {student && student.id ? 
                <FormControl type="text" disabled value={`${student.name} - DOB: ${student.dob}`} />
                : <FormControl type="text" disabled value="" />}
              
            </FormGroup>
            <br />
            <FormGroup>
              <Form.Label>Module ID: </Form.Label>
              <FormControl type="number" value={moduleId} 
                onChange={e => {
                  setModuleId(Number(e.target.value));
                  handleChange(student, module);
                }} onBlur={updateModule} />
              <br />
              <Form.Label>Module info: </Form.Label>
              {module && module.id ? 
                <FormControl as="textarea" disabled style={{ resize: "none" }}
                  value={`${module.name} - Semester ${module.semester} - Credits: ${module.credits}`} />
                : <FormControl as="textarea" disabled style={{ resize: "none" }}
                    value="" />
              }
            </FormGroup>
            <br />
            <FormGroup>
              <Form.Label>Internal mark: </Form.Label>
              <FormControl type="number" step={0.01} min={-0.01} max={10} value={internal} 
                onChange={e => setInternal(Number(e.target.value))} />
              <br />
              <Form.Label>Exam mark: </Form.Label>
              <FormControl type="number" step={0.01} min={-0.01} max={10} value={exam} 
                onChange={e => setExam(Number(e.target.value))} />
            </FormGroup>
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
  )
}