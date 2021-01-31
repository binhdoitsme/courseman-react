import React, { useEffect, useState } from "react";
import { Button, Form, FormControl, FormGroup, FormText, Modal } from "react-bootstrap";
import DeleteConfirmation from "../common/DeleteConfirmation";

function EnrolmentDetailsLine(props) {
  const verticalAlignCell = { verticalAlign: "middle" };

  return (
    <>
      <tr style={{ cursor: "pointer" }}>
        <td style={verticalAlignCell} onClick={props.onClick}>{props.index}</td>
        <td style={verticalAlignCell} onClick={props.onClick}>{props.id}</td>
        <td style={verticalAlignCell} onClick={props.onClick}>{props.student.name}</td>
        <td style={verticalAlignCell} onClick={props.onClick}>{props.module.name}</td>
        <td style={verticalAlignCell}>
          <DeleteConfirmation action={() => props.deleteAction(props.id)} />
        </td>
      </tr>
    </>
  )
}

export default function EnrolmentDetails(props) {
  const [show, setShow] = useState(false);
  const [hasModal, setHasModal] = useState(false);
  const [moduleId, setModuleId] = useState(props.module.id);
  const [studentId, setStudentId] = useState(props.student.id);
  const [module, setModule] = useState(props.module);
  const [student, setStudent] = useState(props.student);
  const [internal, setInternal] = useState(props.internalMark);
  const [exam, setExam] = useState(props.examMark)
  const [changed, setChanged] = useState(false);

  const resetState = () => {
    setModuleId(props.module.id);
    setStudentId(props.student.id);
    setModule(props.module);
    setStudent(props.student);
    setInternal(props.internalMark);
    setExam(props.examMark);
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
    if (!module.id || !student.id) {
      setChanged(false);
      return;
    }
    setChanged(studentId !== props.student.id
      || moduleId !== props.module.id
      || internal !== props.internalMark
      || exam !== props.examMark);
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
      <EnrolmentDetailsLine onClick={handleShow} {...props} />
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
              <Form.Label>ID: </Form.Label>
              <FormControl type="text" value={props.id} disabled />
            </FormGroup>
            <br />
            <FormGroup>
              <Form.Label>Student ID: </Form.Label>
              <FormControl type="number" value={studentId}
                onChange={e => {
                  setStudentId(Number(e.target.value));
                  handleChange(student, module);
                }} onBlur={updateStudent} />
              <br />
              <Form.Label>Student info: </Form.Label>
              <FormControl type="text" disabled value={`${student.name} - DOB: ${student.dob}`} />
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
              <FormControl as="textarea" disabled style={{ resize: "none" }}
                value={`${module.name} - Semester ${module.semester} - Credits: ${module.credits}`} />
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
              <br />
              <Form.Label>Final grade: </Form.Label>
              <FormControl type="text" disabled value={props.finalGrade} />
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
};