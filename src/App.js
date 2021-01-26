import logo from './logo.svg';
import './App.css';
import Navigation from './common/Navigation';
import { Container } from 'react-bootstrap';
import StudentList from './student/StudentList';

function App() {
  return (<>
    <Navigation appName="CourseManApp"
                modules={[
                  {"name": "Manage students", "link": "#"},
                  {"name": "Manage modules", "link": "#"},
                  {"name": "Manage enrolments", "link": "#"}
                ]} />
    <Container>
      <StudentList title="Manage students" />
    </Container>
  </>
  );
}

export default App;
