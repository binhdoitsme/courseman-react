import React, { useEffect, useState } from "react";
import { Button, Col, Form, FormControl, Row, Table } from "react-bootstrap";
import AutoDismissAlert from "../common/AutoDismissAlert";
import enrolmentAPI from "./EnrolmentAPI";
import EnrolmentCreate from "./EnrolmentCreate";
import EnrolmentDetails from "./EnrolmentDetails";

export default function EnrolmentList(props) {
  const [enrolmentList, setEnrolmentList] = useState([]);
  const [currentPage, setCurrentPage] = useState(undefined);
  const [pageCount, setPageCount] = useState(undefined);
  const [alert, setAlert] = useState(undefined);

  const addToEnrolmentList = enrolment => setEnrolmentList(enrolmentList.concat(enrolment));
  
  const onCreateSuccess = (enrolment) => {
    addToEnrolmentList(enrolment);
    setAlert(<AutoDismissAlert variant="success" heading="Create successfully" 
              text={`Successfully created resource with id ${enrolment.id}!`}
              onDisposed={() => setAlert(undefined)} />);
  };
  const onCreateFailure = (err) => {
    setAlert(<AutoDismissAlert variant="success" heading="Failed to create" 
              text={`Cannot create resource! Reason: ${err}!`}
              onDisposed={() => setAlert(undefined)} />)
  };

  const deleteAction = (id) => {
    const onDeleteSuccess = () => {
      setEnrolmentList(enrolmentList.filter(s => s.id !== id));
      setAlert(<AutoDismissAlert variant="success" heading="Delete successfully" 
                text={`Successfully deleted resource with id ${id}!`}
                onDisposed={() => setAlert(undefined)} />);
    };
    const onDeleteFailure = (err) => {
      setAlert(<AutoDismissAlert variant="success" heading="Failed to delete" 
                text={`Cannot deleted resource with id ${id}! Reason: ${err}!`}
                onDisposed={() => setAlert(undefined)} />)
    };
    enrolmentAPI.deleteById(id, onDeleteSuccess, onDeleteFailure);
  }

  const updateAction = (enrolment) => {
    const onUpdateSuccess = (updatedEnrolment) => {
      const index = enrolmentList.findIndex(s => s.id === enrolment.id);
      const before = enrolmentList.slice(0, index);
      const after = enrolmentList.slice(index + 1);
      const newEnrolmentList = before.concat(updatedEnrolment).concat(after);
      setEnrolmentList(newEnrolmentList);
      setAlert(<AutoDismissAlert variant="success" heading="Update successfully" 
                text={`Successfully updated resource with id ${enrolment.id}!`}
                onDisposed={() => setAlert(undefined)} />)
    };
    const onUpdateFailure = (err) => {
      setAlert(<AutoDismissAlert variant="success" heading="Failed to delete" 
                text={`Cannot deleted resource with id ${enrolment.id}! Reason: ${err}!`}
                onDisposed={() => setAlert(undefined)} />);
    };
    enrolmentAPI.updateById(enrolment.id, enrolment, onUpdateSuccess, onUpdateFailure);
  }

  useEffect(() => enrolmentAPI.getFirstPage(
    response => {
      setEnrolmentList(response.content);
      setPageCount(response.pageCount);
      setCurrentPage(response.currentPage);
    }, 
    err => window.alert(err)
  ), [enrolmentList.length]);

  return (
    <>
      {alert ? alert : ""}
      <h2 className="my-4 text-center">{props.title}</h2>
      <Row className="my-3">
        <Col>
          <EnrolmentCreate updateField={props.updateField}
            onSuccess={onCreateSuccess} onFailure={onCreateFailure} />
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
            <th className="col-md-4">Student name</th>
            <th className="col-md-4">Course name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {enrolmentList.map((enrolment, index) =>
            <EnrolmentDetails key={enrolment.id} {...enrolment} index={index + 1}
                updateAction={updateAction}
                updateField={props.updateField}
                deleteAction={deleteAction} />)}
        </tbody>
      </Table>
    </>
  )
}