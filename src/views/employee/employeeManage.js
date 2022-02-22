import React, { useEffect, useState } from 'react';
import { getApi } from '../libs/api'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import AddOrEditEmployee from './addOrEditEmployee'
import DeleteEmployee from './deleteEmployee';
import { useSelector } from "react-redux";
import { EMPLOYEE_API_PATH } from '../../constants/api.constant';

const EmployeeManage = () => {

    const [tableData, setTableData] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [editEmployee, setEditEmployee] = useState({});
    const [modalDeleteShow, setModalDeleteShow] = useState(false);
    const [deleteEmployee, setDeleteEmployee] = useState({});

    const userName = useSelector(state => state)

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
                <h5 className='me-auto bd-highlight'>Employee Table</h5>
                <h5 className='bd-highlight' > Hello {userName || "Mr.NoBody"}</h5>
            </div>
            <Button variant="primary" onClick={handleAddNew}>
                Add new Employee
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
                        <th>ID</th>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Division</th>
                        <th>Education Degree</th>
                        <th>Edit</th>
                        <th>Delete</th>
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
                                    Edit
                                </Button></td>
                                <td> <Button variant="primary" onClick={() => handleDelete(item)}>
                                    Delete
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