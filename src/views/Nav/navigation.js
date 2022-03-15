import Nav from 'react-bootstrap/Nav'
import { NavLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
const Navs = () => {
    return (
        <Nav fill variant="tabs" defaultActiveKey="/home">
            <Nav.Item>
                <NavLink activeClassName='active' exact to="/"><FormattedMessage id='employee.employee' /></NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink activeClassName='active' exact to="/covidTracking">
                    <FormattedMessage id='covidTracking.covidTracking' /></NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink activeClassName='active' exact to="/youtubeSearch">
                    <FormattedMessage id='youtube.youtubeSearch' /> </NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink activeClassName='active' exact to="/whoAreYou"><FormattedMessage id='whoAreYou.whoAreYou' /> </NavLink>
            </Nav.Item>
        </Nav>
    );
}

export default Navs;