import React from 'react';
import { Button, Col, Form, FormControl, Row, Table } from 'react-bootstrap';
import studentAPI from "./StudentAPI";

const verticalAlignCell = { verticalAlign: "middle" };

export default class StudentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentList: []
    };
  }

  componentDidMount() {
    studentAPI.getAll(studentList => {
      console.log(studentList);
      this.setState({ studentList: studentList });
    }, err => alert(err))
  }

  render() {
    return (
      <>
        <h2 className="my-4 text-center">{this.props.title}</h2>
        <Row className="my-3">
          <Col>
            <Button>+ New student</Button>
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
              <th className="col-md-9" colSpan="3">Name</th>
            </tr>
          </thead>
          <tbody>
            {this.state.studentList.map((student, index) => 
              <tr style={{ cursor: "pointer" }}>
                <td style={verticalAlignCell}>{index + 1}</td>
                <td style={verticalAlignCell}>{student.id}</td>
                <td style={verticalAlignCell}>{student.name}</td>
                <td className="col-md-1" style={verticalAlignCell}>
                  <Button variant="danger">Delete</Button>
                </td>
              </tr>)}
          </tbody>
        </Table>
      </>
    )
  }
}