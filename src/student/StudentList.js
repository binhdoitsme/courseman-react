import React, { useEffect, useState } from 'react';
import { Button, Col, Form, FormControl, Row, Table } from 'react-bootstrap';
import AutoDismissAlert from '../common/AutoDismissAlert';
import studentAPI from "./StudentAPI";
import StudentCreate from './StudentCreate';
import StudentDetails from './StudentDetails';

export default function StudentList(props) {
  const [studentList, setStudentList] = useState([]);
  const [alert, setAlert] = useState(undefined);

  useEffect(() => studentAPI.getAll(setStudentList, err => window.alert(err)), 
      [studentList.length]);

  const addToStudentList = student => setStudentList(studentList.concat(student));
  
  const onCreateSuccess = (student) => {
    addToStudentList(student);
    setAlert(<AutoDismissAlert variant="success" heading="Create successfully" 
              text={`Successfully created resource with id ${student.id}!`}
              onDisposed={() => setAlert(undefined)} />);
  };
  const onCreateFailure = (err) => {
    setAlert(<AutoDismissAlert variant="success" heading="Failed to create" 
              text={`Cannot create resource! Reason: ${err}!`}
              onDisposed={() => setAlert(undefined)} />)
  };


  const deleteAction = (id) => {
    const onDeleteSuccess = () => {
      setStudentList(studentList.filter(s => s.id !== id));
      setAlert(<AutoDismissAlert variant="success" heading="Delete successfully" 
                text={`Successfully deleted resource with id ${id}!`}
                onDisposed={() => setAlert(undefined)} />);
    };
    const onDeleteFailure = (err) => {
      setAlert(<AutoDismissAlert variant="success" heading="Failed to delete" 
                text={`Cannot deleted resource with id ${id}! Reason: ${err}!`}
                onDisposed={() => setAlert(undefined)} />)
    };
    studentAPI.deleteById(id, onDeleteSuccess, onDeleteFailure);
  }

  const updateAction = (student) => {
    const onUpdateSuccess = (updatedStudent) => {
      const index = studentList.findIndex(s => s.id === student.id);
      const before = studentList.slice(0, index);
      const after = studentList.slice(index + 1);
      const newStudentList = before.concat(updatedStudent).concat(after);
      setStudentList(newStudentList);
      setAlert(<AutoDismissAlert variant="success" heading="Update successfully" 
                text={`Successfully updated resource with id ${student.id}!`}
                onDisposed={() => setAlert(undefined)} />)
    };
    const onUpdateFailure = (err) => {
      setAlert(<AutoDismissAlert variant="success" heading="Failed to delete" 
                text={`Cannot deleted resource with id ${student.id}! Reason: ${err}!`}
                onDisposed={() => setAlert(undefined)} />);
    };
    studentAPI.updateById(student.id, student, onUpdateSuccess, onUpdateFailure);
  }

  // todo: set the alert
  return (
    <>
      {alert ? alert : ""}
      <h2 className="my-4 text-center">{props.title}</h2>
      <Row className="my-3">
        <Col>
          <StudentCreate onSuccess={onCreateSuccess} onFailure={onCreateFailure} />
        </Col>
        <Col></Col>
        <Col md={5}>
          <Form className="d-flex" inline>
            <FormControl type="text" placeholder="Search" className="mx-1" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Col>
      </Row>
      <Table bordered hover>
        <thead>
          <tr>
            <th className="col-md-1">#</th>
            <th className="col-md-2">ID</th>
            <th className="col-md-7">Name</th>
            <th className="col-md-2">Date of birth</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {studentList.map((student, index) =>
            <StudentDetails key={index} {...student} index={index + 1}
                updateAction={updateAction}
                deleteAction={deleteAction} />)}
        </tbody>
      </Table>
    </>
  )

}