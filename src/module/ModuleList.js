import React, { useEffect, useState } from "react";
import { Button, Col, Form, FormControl, Row, Table } from "react-bootstrap";
import AutoDismissAlert from "../common/AutoDismissAlert";
import moduleAPI from "./ModuleAPI";
import ModuleCreate from "./ModuleCreate";
import ModuleDetails from "./ModuleDetails";

export default function ModuleList(props) {
  const [moduleList, setModuleList] = useState([]);
  const [pageCount, setPageCount] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(undefined);
  const [filteredType, setFilteredType] = useState("0");
  const [alert, setAlert] = useState(undefined);

  const onGetSuccess = response => {
    setModuleList(response.content);
    setPageCount(response.pageCount);
    setCurrentPage(response.currentPage);
  };

  const onGetFailure = err => window.alert(err);

  const addToModuleList = module => setModuleList(moduleList.concat(module).sort((x, y) => y.compulsory - x.compulsory));
  
  const onCreateSuccess = (module) => {
    addToModuleList(module);
    setAlert(<AutoDismissAlert variant="success" heading="Create successfully" 
              text={`Successfully created resource with id ${module.id}!`}
              onDisposed={() => setAlert(undefined)} />);
  };
  const onCreateFailure = (err) => {
    setAlert(<AutoDismissAlert variant="success" heading="Failed to create" 
              text={`Cannot create resource! Reason: ${err}!`}
              onDisposed={() => setAlert(undefined)} />)
  };

  const deleteAction = (id) => {
    const onDeleteSuccess = () => {
      setModuleList(moduleList.filter(s => s.id !== id));
      setAlert(<AutoDismissAlert variant="success" heading="Delete successfully" 
                text={`Successfully deleted resource with id ${id}!`}
                onDisposed={() => setAlert(undefined)} />);
    };
    const onDeleteFailure = (err) => {
      setAlert(<AutoDismissAlert variant="success" heading="Failed to delete" 
                text={`Cannot deleted resource with id ${id}! Reason: ${err}!`}
                onDisposed={() => setAlert(undefined)} />)
    };
    moduleAPI.deleteById(id, onDeleteSuccess, onDeleteFailure);
  };

  const updateAction = (module) => {
    const onUpdateSuccess = (updatedModule) => {
      const index = moduleList.findIndex(s => s.id === module.id);
      const before = moduleList.slice(0, index);
      const after = moduleList.slice(index + 1);
      const newModuleList = before.concat(updatedModule).concat(after);
      setModuleList(newModuleList);
      setAlert(<AutoDismissAlert variant="success" heading="Update successfully" 
                text={`Successfully updated resource with id ${module.id}!`}
                onDisposed={() => setAlert(undefined)} />)
    };
    const onUpdateFailure = (err) => {
      setAlert(<AutoDismissAlert variant="success" heading="Failed to delete" 
                text={`Cannot deleted resource with id ${module.id}! Reason: ${err}!`}
                onDisposed={() => setAlert(undefined)} />);
    };
    moduleAPI.updateById(module.id, module, onUpdateSuccess, onUpdateFailure);
  };

  const filterByType = () => {
    if (filteredType !== "0") {
      moduleAPI.getFirstPageByType(filteredType, onGetSuccess, onGetFailure);
    } else {
      moduleAPI.getFirstPage(onGetSuccess, onGetFailure);
    }
  };

  useEffect(() => moduleAPI.getFirstPage(
    onGetSuccess, 
    onGetFailure
  ), []);

  useEffect(filterByType, [filteredType])

  return (
    <>
      {alert ? alert : ""}
      <h2 className="my-4 text-center">{props.title}</h2>
      <Row className="my-3">
        <Col>
          <ModuleCreate onSuccess={onCreateSuccess} onFailure={onCreateFailure} />
        </Col>
        <Col></Col>
        <Col md={7}>
          <Form className="d-flex" inline>
            <select className="form-select" aria-label="Module type" defaultValue="0"
              onChange={e => {
                setFilteredType(e.target.value);
              }}>
              <option value="0">&lt;Module type&gt;</option>
              <option value="compulsory">Compulsory</option>
              <option value="elective">Elective</option>
            </select>
            <FormControl type="text" placeholder="Search" className="mx-1" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Col>
      </Row>

      <Table bordered hover>
        <thead>
          <tr>
            <th className="col-md-1">#</th>
            <th className="col-md-1">ID</th>
            <th className="col-md-2">Code</th>
            <th className="col-md-5">Name</th>
            <th className="col-md-1">Semester</th>
            <th className="col-md-1">Credits</th>
            { filteredType !== "0" ? null
            : <th className="col-md-1">Compulsory?</th>}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {moduleList.map((module, index) =>
            module.hidden === true ? null : 
            <ModuleDetails {...module} index={index} filtering={filteredType !== "0"}
              key={module.id} updateAction={updateAction}
              deleteAction={deleteAction} />)}
        </tbody>
      </Table>
    </>
  );
}