import Navigation from './common/Navigation';
import { Container } from 'react-bootstrap';
import StudentManager from './student';
import ModuleManager from './module';

function App() {
  return (<>
    <Navigation appName="CourseManApp"
                modules={[
                  { "name": "Manage students", "link": "#" },
                  { "name": "Manage modules", "link": "#" },
                  { "name": "Manage enrolments", "link": "#" }
                ]} />
    <Container>
      <ModuleManager title="Manage course modules" />
    </Container>
  </>
  );
}

export default App;
