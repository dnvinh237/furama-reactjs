import React, { useEffect, useState } from 'react';
import { getApi } from '../libs/api'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import AddOrEditEmployee from './addOrEditEmployee'
import DeleteEmployee from './deleteEmployee';
import { useSelector } from "react-redux";
import { EMPLOYEE_API_PATH } from '../../constants/api.constant';
import { FormattedMessage } from 'react-intl';

const EmployeeManage = () => {

    const [tableData, setTableData] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [editEmployee, setEditEmployee] = useState({});
    const [modalDeleteShow, setModalDeleteShow] = useState(false);
    const [deleteEmployee, setDeleteEmployee] = useState({});

    const user = useSelector(state => state)
    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const response = await getApi(
                { url: EMPLOYEE_API_PATH.EMPLOYEE })
            setTableData(response.response.data.data)
        } catch (e) {
            console.log(e)
        }
    }

    const handleSubmitAddEmployee = (employee) => {
        tableData.unshift(employee)
        tableData.pop()
        setTableData(tableData)
        setModalShow(false)
    }

    const handleSubmitEditEmployee = (employee) => {
        let employeeIndex = tableData.findIndex(elem => elem.id === employee.id);
        tableData[employeeIndex] = employee;
        setTableData(tableData)
        setModalShow(false)
        setEditEmployee({})
    }

    const handleEdit = (item) => {
        setEditEmployee(item);
        setModalShow(true)
    }

    const handleDelete = (item) => {
        setModalDeleteShow(true)
        setDeleteEmployee(item)
    }

    const handleSubmitDelete = () => {
        setDeleteEmployee({})
        fetchData()
        setModalDeleteShow(false)
    }

    const handleAddNew = () => {
        setEditEmployee({})
        setModalShow(true)
    }

    return (
        <>
            <div className='d-flex bd-highlight'>
                <h5 className='me-auto bd-highlight'><FormattedMessage id='employee.employeeTable'></FormattedMessage></h5>
                <h5 className='bd-highlight' > <FormattedMessage id='common.hello'></FormattedMessage> {user.username || "Mr.NoBody"}</h5>
            </div>
            <Button variant="primary" onClick={handleAddNew}>
                <FormattedMessage id='employee.addNewEmployee'></FormattedMessage>
            </Button>

            <AddOrEditEmployee show={modalShow} onHide={() => setModalShow(false)}
                handleSubmitAddEmployee={handleSubmitAddEmployee}
                handleSubmitEditEmployee={handleSubmitEditEmployee}
                editEmployee={editEmployee}
            />
            <DeleteEmployee modalDeleteShow={modalDeleteShow} onHide={() => setModalDeleteShow(false)}
                handleDelete={handleDelete}
                deleteEmployee={deleteEmployee}
                handleSubmitDelete={handleSubmitDelete}
            ></DeleteEmployee>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th> <FormattedMessage id='employee.id' /></th>
                        <th><FormattedMessage id='employee.name' /></th>
                        <th><FormattedMessage id='employee.position'></FormattedMessage></th>
                        <th><FormattedMessage id='employee.division'></FormattedMessage></th>
                        <th><FormattedMessage id='employee.educationDegree'></FormattedMessage></th>
                        <th><FormattedMessage id='common.edit'></FormattedMessage></th>
                        <th><FormattedMessage id='common.delete'></FormattedMessage></th>
                    </tr>
                </thead>
                {tableData && tableData.length > 0 && tableData.map((item, index) => {
                    return (
                        <tbody key={item.id}>
                            <tr>
                                <td>{index + 1}</td>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.position.name}</td>
                                <td>{item.division.name}</td>
                                <td>{item.educationDegree.name}</td>
                                <td> <Button variant="primary" onClick={() => handleEdit(item)}>
                                    <FormattedMessage id='common.edit'></FormattedMessage>
                                </Button></td>
                                <td> <Button variant="primary" onClick={() => handleDelete(item)}>
                                    <FormattedMessage id='common.delete'></FormattedMessage>
                                </Button></td>
                            </tr>
                        </tbody>
                    )
                })
                }
            </Table>
        </>
    )
}

export default EmployeeManage