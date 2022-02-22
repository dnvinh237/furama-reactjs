import '../styles/App.scss';
import Navs from './Nav/navigation'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import EmployeeManage from './employee/employeeManage.js';
import CovidTracking from './covidTracking/covidTracking';
import YoutubeSearch from './youtubeSearch/YoutubeSearch';
import WhoAreYou from './whoAreYou/whoAreYou';
import { Row, Container, Col } from "react-bootstrap"

function App() {
  return (
    <Router>
      <div className="App">
        <Navs></Navs>
        <Container className='mt-3'>
          <Row >
            <Col md={{ span: 12, offset: 0 }}>
              <Switch>
                <Route path="/" exact>
                  <EmployeeManage></EmployeeManage>
                </Route>
                <Route path="/covidTracking" exact>
                  <CovidTracking></CovidTracking>
                </Route>
                <Route path="/youtubeSearch" exact>
                  <YoutubeSearch></YoutubeSearch>
                </Route>
                <Route path="/whoAreYou" exact>
                  <WhoAreYou></WhoAreYou>
                </Route>
              </Switch>
            </Col>
          </Row>
        </Container>
      </div>

    </Router>
  );
}

export default App;
