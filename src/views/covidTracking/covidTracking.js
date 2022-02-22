import React, { useEffect, useState } from 'react';
import axios from "axios"
import moment from 'moment';
import { Table } from 'react-bootstrap';
import { useSelector } from "react-redux";

const CovidTracking = () => {
    const toDate = moment('2022-01-01').format('YYYY-MM-DD');
    const fromDate = moment(new Date()).format('YYYY-MM-DD');
    const [dataCovid, setDataCovid] = useState([])
    const [searchFromDate, SetSearchFromDate] = useState(toDate)
    const [searchToDate, SetSearchToDate] = useState(fromDate)
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    const userName = useSelector(state => state)

    const fetchData = async () => {
        const ourRequest = axios.CancelToken.source()
        try {
            setIsLoading(true)
            let res = await axios.get(`https://api.covid19api.com/country/vietnam?from=${searchFromDate}&to=${searchToDate}`,
                { cancelToken: ourRequest.token });
            let data = res && res.data ? res.data : [];

            data.map(elem => {
                elem.Date = moment(elem.Date).format('DD/MM/YYYY');
                return elem;
            })
            data.reverse()
            data.length = 20;
            setTimeout(() => {
                setIsLoading(false)
            }, 2000);
            setIsError(false)
            setDataCovid(data)
        } catch (err) {
            console.log('-----> check err', err)
            if (axios.isCancel(err))
                console.log('Request canceled', err.message);
            setIsLoading(false)
            setIsError(true)
            console.log('-----> check err', err)
        }
    }

    useEffect(() => {
        const ourRequest = axios.CancelToken.source()
        fetchData()
        return () => {
            ourRequest.cancel('Operation canceled by the user.')
        }
    }, [])

    const handleSearchFromDate = (event) => {
        SetSearchFromDate(event.target.value)
    }
    const handleSearchToDate = (event) => {
        SetSearchToDate(event.target.value)
    }

    return (
        <>
            <div className='covid-container'>
                <div>
                    <label>From date</label>
                    <input type="date" value={searchFromDate} onChange={(event) => handleSearchFromDate(event)} />
                    <label>To date</label>
                    <input type="date" value={searchToDate} onChange={(event) => handleSearchToDate(event)} />
                    <button type='button' onClick={fetchData}> Search </button>
                </div>

            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Index</th>
                        <th>Date</th>
                        <th>Confirmed</th>
                        <th>Active</th>
                        <th>Deaths</th>
                    </tr>
                </thead>
                <tbody>
                    {!isError && !isLoading && dataCovid && dataCovid.length > 0 && dataCovid.map((item, index) => {
                        return (
                            <tr key={item.ID}>
                                <td>{index + 1}</td>
                                <td>{item.Date}</td>
                                <td>{item.Confirmed}</td>
                                <td>{item.Active}</td>
                                <td>{item.Deaths}</td>
                            </tr>
                        )
                    })}
                    {isLoading &&
                        <tr>
                            <td colSpan={5}>Loading .....    {(userName) ? `Please wait  Mr/Ms ${userName}` : " "}</td>
                        </tr>}
                    {isError &&
                        <tr>
                            <td colSpan={5}>Something wrong .....    {(userName) ? `Please go back later Mr/Ms ${userName}` : " "}</td>
                        </tr>}
                </tbody>
            </Table>
        </>
    )
}

export default CovidTracking;