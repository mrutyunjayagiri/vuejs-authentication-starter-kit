const errorHandler = (error) => {
    let errorMessage = ''
    let status = ''
    if (!error.response) {
        status = 'error'
        errorMessage = 'Unable to connect. Check your internet connectivity.'
    }
    else if (error.response) {
        if (error.response.status == 500) {
            status = 'InternalError'
            errorMessage = 'Something went wrong.'
        } else {
            status = error.response.data.status??error.response.statusText
            errorMessage = error.response.data.message??error.response.data
        }

    }
    return { status, errorMessage }
}

export {
    errorHandler
}