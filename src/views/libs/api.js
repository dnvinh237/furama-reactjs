import axios from "axios"

export const globalErrorHandlers = (error) => {
    if (error && error.data) {
        // message.error(error.data.message)
        console.log(error)
    }
}

export const getApi = ({ url, params }, handleError = true) => {
    return axios
        .get(url, { params })
        .then(
            response => ({
                response: response.data,
                status: response.status,
            }),
        )
        .catch(error => {
            if (handleError) {
                globalErrorHandlers(error.response)
            }
            throw error.response
        })
}

export const postApi = ({ url, data }, handleError = true) => {
    return axios
        .post(url, data)
        .then(
            response => ({
                response: response.data,
                status: response.status,
            }),
        )
        .catch(error => {
            if (handleError) {
                globalErrorHandlers(error.response)
            }
            throw error.response
        })
}


export const putApi = ({ url, data }, handleError = true) => {
    return axios
        .put(url, data)
        .then(
            response => ({
                response: response.data,
                status: response.status,
            }),
        )
        .catch(error => {
            if (handleError) {
                globalErrorHandlers(error.response)
            }
            throw error.response
        })
}

export const deleteApi = ({ url }, handleError = true) => {
    return axios
        .delete(url)
        .then(
            response => ({
                response: response.data,
                status: response.status,
            }),
        )
        .catch(error => {
            if (handleError) {
                globalErrorHandlers(error.response)
            }
            throw error.response
        })
}