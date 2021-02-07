import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import constants from './common/Constants';
import Navigation from './common/Navigation';
import EnrolmentManager from './enrolment';
import ModuleManager from './module';
import StudentManager from './student';

function getServices(onSuccess = undefined, onFailure = undefined) {
  fetch(`${constants.host}/services`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(response => response.json()).then(onSuccess).catch(onFailure);
}

function App() {
  const [modules, setModules] = useState([]);

  useEffect(() => getServices(setModules, alert), []);

  return (<>
    <Router>
      <Navigation appName="CourseManApp"
        modules={modules} />
      <Container>
        <Switch>
          <Route path="/students">
            <StudentManager title="Manage students" />
          </Route>
          <Router path="/modules">
            <ModuleManager title="Manage course modules" />
          </Router>
          <Router path="/enrolments">
            <EnrolmentManager title="Manage enrolments" />
          </Router>
        </Switch>
      </Container>
      
    </Router>
  </>
  );
}

export default App;
