import React from 'react';
import { Table } from 'react-bootstrap';
import studentAPI from "./StudentAPI";

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
        <h3>{this.props.title}</h3>
        <Table bordered hover>
          <thead>
            <tr>
            <th>#</th>
            <th>ID</th>
            <th>Name</th>
            </tr>
          </thead>
          <tbody>
            
          </tbody>
        </Table>
      </>
    )
  }
}