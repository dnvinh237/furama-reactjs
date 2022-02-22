import { useState } from "react"
import { Button, InputGroup } from "react-bootstrap"
import { FormControl } from "react-bootstrap"
import { Row, Container, Col } from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux'
import { updateUserName } from "../../store/actions/updateUserName"

const WhoAreYou = () => {
    const [userName, SetUserName] = useState("");
    const dispatch = useDispatch()
    const oldUserName = useSelector(state => state)

    const handleSubmitUserName = () => {
        dispatch(updateUserName(userName))
    }
    return (
        <Container>
            <Row >
                <Col md={{ span: 6, offset: 3 }}>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">User Name</InputGroup.Text>
                        <FormControl value={userName} onChange={(event) => { SetUserName(event.target.value) }}
                            placeholder={oldUserName || "UserName"}
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                        />
                        <Button onClick={handleSubmitUserName}> Submit</Button>
                    </InputGroup>
                    <p>{userName ? `Welcome ${userName}` : " "}</p>
                </Col>
            </Row>
        </Container>
    )
}

export default WhoAreYou