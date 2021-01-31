import Navigation from './common/Navigation';
import { Container } from 'react-bootstrap';
import StudentManager from './student';
import ModuleManager from './module';
import EnrolmentManager from './enrolment';
import { Link, Route, BrowserRouter as Router, Switch } from 'react-router-dom';

function App() {
  return (<>
    <Router>
      <Navigation appName="CourseManApp"
        modules={[
          { "name": "Manage students", "link": "/students" },
          { "name": "Manage course modules", "link": "/modules" },
          { "name": "Manage enrolments", "link": "/enrolments" }
        ]} />
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
