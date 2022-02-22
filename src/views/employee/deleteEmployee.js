import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { deleteApi } from '../libs/api'


const DeleteEmployee = (props) => {
    const { handleSubmitDelete, deleteEmployee, modalDeleteShow } = props

    const handleSubmitHandle = async () => {
        // let data = { id: deleteEmployee.id }
        let res = await deleteApi({ url: `http://localhost:3000/employee/${deleteEmployee.id}` })
        if (res.status === 200) {
            handleSubmitDelete()
        } else {
            alert('Something wrong, please contact admin ')
            console.log(res.status);
        }
    }

    return (
        <>
            <Modal show={modalDeleteShow} >
                <Modal.Header closeButton>
                    <Modal.Title>Delete Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body> Do you want to delete employee with name: {deleteEmployee.name} and id: {deleteEmployee.id}

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmitHandle}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default DeleteEmployee