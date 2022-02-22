// import '../../styles/Nav.scss'
// import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav'
import { NavLink } from 'react-router-dom';
const Navs = () => {
    return (
        <Nav fill variant="tabs" defaultActiveKey="/home">
            <Nav.Item>
                <NavLink activeClassName='active' exact to="/">Employee</NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink activeClassName='active' exact to="/covidTracking">Covid Tracking</NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink activeClassName='active' exact to="/youtubeSearch">Youtube Search </NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink activeClassName='active' exact to="/whoAreYou"> Who Are You</NavLink>
            </Nav.Item>
            {/* <Nav.Item>
                <Nav.Link eventKey="link-2">Link</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="disabled" disabled>
                    Disabled
                </Nav.Link>
            </Nav.Item> */}
        </Nav>
    );
}

export default Navs;