import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { deleteApi } from '../libs/api'
import { FormattedMessage } from 'react-intl';

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
                    <Modal.Title> <FormattedMessage id='employee.deleteEmployee' /> </Modal.Title>
                </Modal.Header>
                <Modal.Body> <FormattedMessage id='employee.confirmDelete' />  {deleteEmployee.name} <FormattedMessage id='employee.andId' /> {deleteEmployee.id}

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>
                        <FormattedMessage id='common.close' />
                    </Button>
                    <Button variant="primary" onClick={handleSubmitHandle}>
                        <FormattedMessage id='employee.deleteEmployee' />
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default DeleteEmployee