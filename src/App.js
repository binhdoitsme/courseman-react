import Navigation from './common/Navigation';
import { Container } from 'react-bootstrap';
import StudentModule from './student';

function App() {
  return (<>
    <Navigation appName="CourseManApp"
                modules={[
                  { "name": "Manage students", "link": "#" },
                  { "name": "Manage modules", "link": "#" },
                  { "name": "Manage enrolments", "link": "#" }
                ]} />
    <Container>
      <StudentModule title="Manage students" />
    </Container>
  </>
  );
}

export default App;
