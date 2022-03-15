import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import { FormControl } from 'react-bootstrap'
import React, { useEffect, useState } from 'react';
import { getApi, postApi, putApi } from '../libs/api'
import { Container, Row, Col } from 'react-bootstrap'
import * as _ from 'lodash'
import DropDownButtonComponent from '../../components/dropdownButtonComponent'
import { EMPLOYEE_API_PATH } from '../../constants/api.constant';
import { FormattedMessage } from 'react-intl';

const AddOrEditEmployee = (props) => {
    const { handleSubmitAddEmployee, editEmployee, handleSubmitEditEmployee, show } = props
    const [positions, setPositions] = useState({})
    const [divisions, setDivisions] = useState({})
    const [educationDegrees, setEducationDegrees] = useState({})

    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [position, setPosition] = useState({})
    const [division, setDivision] = useState({})
    const [educationDegree, setEducationDegree] = useState({})

    useEffect(() => {
        (async () => {
            try {
                const positionsAPI = await getApi(
                    { url: EMPLOYEE_API_PATH.POSITION })
                setPositions(positionsAPI.response.data)

                const divisionsAPI = await getApi(
                    { url: EMPLOYEE_API_PATH.DIVISION })
                setDivisions(divisionsAPI.response.data)

                const educationDegreesAPI = await getApi(
                    { url: EMPLOYEE_API_PATH.EDUCATIONDEGREE })
                setEducationDegrees(educationDegreesAPI.response.data)
            } catch (e) {
                console.log(e)
            }
        })()
    }, [])

    useEffect(() => {
        if (!editEmployee || !_.isEmpty(editEmployee)) {
            setId(editEmployee.id);
            setName(editEmployee.name);
            setPosition(editEmployee.position)
            setDivision(editEmployee.division)
            setEducationDegree(editEmployee.educationDegree)
        } else {
            setId('');
            setName('');
            setPosition({});
            setDivision({});
            setEducationDegree({});
        }
    }, [editEmployee])

    const handleChangePosition = (position) => {
        setPosition(position);
    }

    const handleChangeDivision = (division) => {
        setDivision(division);
    }

    const handleChangeEducationDegree = (educationDegree) => {
        setEducationDegree(educationDegree);
    }

    const handleChangeName = (event) => {
        setName(event.target.value)
    }
    const handleSubmit = async () => {
        if (!position || _.isEmpty(position)) { alert('Please choose position'); return; }
        if (!division || _.isEmpty(division)) { alert('Please choose division'); return; }
        if (!educationDegree || _.isEmpty(educationDegree)) { alert('Please choose education degree'); return; }
        if (!name) { alert('Please input Name'); return; }

        let data = {
            id: id,
            name: name,
            positionId: position.id,
            divisionId: division.id,
            educationDegreeId: educationDegree.id
        }
        let res;
        if (Boolean(data.id)) {
            res = await putApi({ url: EMPLOYEE_API_PATH.EMPLOYEE, data })
        } else {
            res = await postApi({ url: EMPLOYEE_API_PATH.EMPLOYEE, data })
        }
        if (res.status = 200) {
            if (Boolean(data.id)) {
                handleSubmitEditEmployee(res.response.data)
            }
            else {
                handleSubmitAddEmployee(res.response.data)
            }
        } else {
            alert('Something wrong, please contact admin ')
            console.log(res.status);
        }
    }
    return (
        <>
            <Modal show={show} aria-labelledby="contained-modal-title-vcenter" size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {_.isEmpty(editEmployee) ? <FormattedMessage id='employee.addNewEmployee' /> :
                            <FormattedMessage id='employee.editEmployee' />}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Container>
                        <Row>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="inputGroup-sizing-default"  ><FormattedMessage id='employee.id' />
                                </InputGroup.Text>
                                <FormControl value={id} readOnly
                                    aria-label="Default"
                                    aria-describedby="inputGroup-sizing-default"
                                />
                            </InputGroup>
                        </Row>
                        <Row>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="inputGroup-sizing-default"><FormattedMessage id='employee.name' /></InputGroup.Text>
                                <FormControl value={name} onChange={handleChangeName}
                                    aria-label="Default"
                                    aria-describedby="inputGroup-sizing-default"
                                />
                            </InputGroup>
                        </Row>
                        <Row>
                            <Col xs={4} className="px-2">
                                <DropDownButtonComponent
                                    handleChange={handleChangePosition}
                                    name="Position"
                                    listItem={positions}></DropDownButtonComponent>
                            </Col>
                            <Col xs={4} className="px-2">
                                <DropDownButtonComponent
                                    handleChange={handleChangeDivision}
                                    name="Division"
                                    listItem={divisions}></DropDownButtonComponent>
                            </Col>
                            <Col xs={4} className="px-2">
                                <DropDownButtonComponent
                                    handleChange={handleChangeEducationDegree}
                                    name="Education Degree"
                                    listItem={educationDegrees}></DropDownButtonComponent>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Row>
                        <Col xs={7}   >
                            <Button variant="primary" onClick={handleSubmit}>
                                {_.isEmpty(editEmployee) ? <FormattedMessage id='employee.addNewEmployee' /> :
                                    <FormattedMessage id='employee.editEmployee' />}
                            </Button>
                        </Col>
                        <Col xs={4}>
                            <Button variant="secondary" onClick={props.onHide}><FormattedMessage id='common.close' /></Button>
                        </Col>
                    </Row>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default AddOrEditEmployee;