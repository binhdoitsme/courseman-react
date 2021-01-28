import React, { useEffect, useState } from 'react';
import { Button, Col, Form, FormControl, Row, Table } from 'react-bootstrap';
import AutoDismissAlert from '../common/AutoDismissAlert';
import DeleteConfirmation from "../common/DeleteConfirmation";
import studentAPI from "./StudentAPI";
import StudentCreate from './StudentCreate';

const verticalAlignCell = { verticalAlign: "middle" };

export default function (props) {
  const [studentList, setStudentList] = useState([]);
  const [alert, setAlert] = useState(undefined);

  useEffect(() => studentAPI.getAll(setStudentList, err => window.alert(err)), 
      [studentList.join(",")]);

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
                onDisposed={() => setAlert(undefined)} />)
    };
    const onDeleteFailure = (err) => {
      setAlert(<AutoDismissAlert variant="success" heading="Failed to delete" 
                text={`Cannot deleted resource with id ${id}! Reason: ${err}!`}
                onDisposed={() => setAlert(undefined)} />)
    };
    studentAPI.deleteById(id, onDeleteSuccess, onDeleteFailure);
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
            <tr style={{ cursor: "pointer" }} key={index}>
              <td style={verticalAlignCell}>{index + 1}</td>
              <td style={verticalAlignCell}>{student.id}</td>
              <td style={verticalAlignCell}>{student.name}</td>
              <td style={verticalAlignCell}>{student.dob}</td>
              <td className="col-md-1" style={verticalAlignCell}>
                <DeleteConfirmation action={() => deleteAction(student.id)} />
              </td>
            </tr>)}
        </tbody>
      </Table>
    </>
  )

}