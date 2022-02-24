import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import { FormControl } from 'react-bootstrap'
import { useState } from 'react'
import Ratio from 'react-bootstrap/Ratio'
import { getApi } from '../libs/api'
import { Row } from 'react-bootstrap'
import moment from 'moment'
import { useSelector } from "react-redux";
import { YOUTUBE_SEARCH_PATH } from '../../constants/api.constant'
import { YOUTUBE_SEARCH_API_KEY } from '../../configAPIKey'

const YoutubeSearch = () => {
    const [search, setSearch] = useState('')
    const [videos, setVideos] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const userName = useSelector(state => state)

    const handleSearchYoutube = async () => {
        try {
            setIsLoading(true)
            let res = await getApi({
                url: YOUTUBE_SEARCH_PATH.YOUTUBE_SEARCH,
                params: {
                    part: 'snippet',
                    maxResults: "6",
                    key: YOUTUBE_SEARCH_API_KEY.KEY,
                    type: "video",
                    q: search
                }
            })
            setTimeout(() => {
                setIsLoading(false)
                setVideos(res.response.items)
            }, 2000);

        } catch (e) {
            console.log(e)
        }
    }

    const handleOnChangeSearch = (event) => {
        setSearch(event.target.value)
    }

    return (
        <div className='youtubeSearch-container'>
            <div className='d-flex bd-highlight'>
                <h5 className='me-auto bd-highlight'>Youtube Search</h5>
                <h5 className='bd-highlight' > Hello {userName || "Mr.NoBody"}</h5>
            </div>

            <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">Search</InputGroup.Text>
                <FormControl value={search} onChange={(handleOnChangeSearch)}
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                />
                <Button variant="primary" onClick={handleSearchYoutube}>Search</Button>
            </InputGroup>
            {isLoading &&
                <h5 colSpan={5}>Loading .....    {(userName) ? `Please wait  Mr/Ms ${userName}` : " "}</h5>
            }
            <Row xs={2} md={2} className="g-4 mx-auto ">
                {videos && videos.length > 0 && videos.map((item, index) => {
                    return (
                        <div key={item.id.videoId} className="d-flex justify-content-center">
                            <Card style={{ width: '30rem', height: '30rem' }}>
                                <Card.Body>
                                    <Card.Title>{item.snippet.title}</Card.Title>
                                    <div style={{ width: 450, height: 'auto' }}>
                                        <Ratio aspectRatio="16x9">
                                            <iframe src={`https://www.youtube.com/embed/${item.id.videoId}`}
                                                title="YouTube video player"
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen>
                                            </iframe>
                                        </Ratio>
                                    </div>
                                    <Card.Text>
                                        Channel: {item.snippet.channelTitle}
                                    </Card.Text>
                                    <Card.Text>
                                        Publish Time: {moment(item.snippet.publishTime).format("DD/MM/YYYY HH:mm:ss")}
                                    </Card.Text>
                                    <Card.Text>
                                        Description : {item.snippet.description}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    )
                })}
            </Row>
        </div >
    )
}

export default YoutubeSearch