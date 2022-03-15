import React, { useEffect, useState } from 'react';
import axios from "axios"
import moment from 'moment';
import { Table } from 'react-bootstrap';
import { useSelector } from "react-redux";
import { FormattedMessage } from 'react-intl';

const CovidTracking = () => {
    const toDate = moment('2022-01-01').format('YYYY-MM-DD');
    const fromDate = moment(new Date()).format('YYYY-MM-DD');
    const [dataCovid, setDataCovid] = useState([])
    const [searchFromDate, SetSearchFromDate] = useState(toDate)
    const [searchToDate, SetSearchToDate] = useState(fromDate)
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    const user = useSelector(state => state)

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
                    <label><FormattedMessage id='covidTracking.fromDate' /></label>
                    <input type="date" value={searchFromDate} onChange={(event) => handleSearchFromDate(event)} />
                    <label><FormattedMessage id='covidTracking.toDate' /></label>
                    <input type="date" value={searchToDate} onChange={(event) => handleSearchToDate(event)} />
                    <button type='button' onClick={fetchData}> <FormattedMessage id='common.search' /> </button>
                </div>

            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th><FormattedMessage id='covidTracking.index' /></th>
                        <th><FormattedMessage id='covidTracking.date' /></th>
                        <th><FormattedMessage id='covidTracking.confirmed' /></th>
                        <th><FormattedMessage id='covidTracking.active' /></th>
                        <th><FormattedMessage id='covidTracking.deaths' /></th>
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
                            <td colSpan={5}>Loading .....    {(user.username) ? `Please wait  Mr/Ms ${user.username}` : " "}</td>
                        </tr>}
                    {isError &&
                        <tr>
                            <td colSpan={5}>Something wrong .....    {(user.username) ? `Please go back later Mr/Ms ${user.username}` : " "}</td>
                        </tr>}
                </tbody>
            </Table>
        </>
    )
}

export default CovidTracking;