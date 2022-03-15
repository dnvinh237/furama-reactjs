import { useState } from "react"
import { Button, InputGroup } from "react-bootstrap"
import { FormControl } from "react-bootstrap"
import { Row, Container, Col } from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux'
import { API_LOGIN } from "../../constants/api.constant"
import { postApi } from "../libs/api"
import { updateUserName } from "../../store/actions/appAction"
import { FormattedMessage } from 'react-intl';

const WhoAreYou = () => {
    const [userName, SetUserName] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");


    const dispatch = useDispatch()

    const handleSubmitUserName = async () => {
        setMessage("")
        let data = { userName, password }
        let res = await (await postApi({ url: API_LOGIN.API_LOGIN_PATH, data })).response
        if (res.statusCode === 0) {
            let user = res.user;
            dispatch(updateUserName(user))
        } else {
            setMessage(res.message)
        }
    }

    return (
        <Container>
            <Row >
                <Col md={{ span: 6, offset: 3 }}>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1"><FormattedMessage id="whoAreYou.userName"></FormattedMessage></InputGroup.Text>
                        <FormControl value={userName} onChange={(event) => { SetUserName(event.target.value) }}
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                        />
                        <InputGroup.Text id="basic-addon1"><FormattedMessage id="whoAreYou.password"></FormattedMessage></InputGroup.Text>
                        <FormControl value={password} onChange={(event) => { setPassword(event.target.value) }}
                            aria-label="Password"
                            aria-describedby="basic-addon1"
                        />
                        <Button onClick={handleSubmitUserName}> <FormattedMessage id="whoAreYou.submit"></FormattedMessage></Button>
                    </InputGroup>
                    <p>{message}</p>

                </Col>
            </Row>
        </Container>
    )
}

export default WhoAreYou