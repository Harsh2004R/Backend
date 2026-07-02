class ApiError extends Error {
    constructor(
        statusCode = 500, message = "error in server", errors = [],

    ) {
        super(message)
        this.statusCode = statusCode
        this.message = message
        this.errors = errors
        this.data = null
        this.success = false

        if (stack) {
            this.stack;
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export { ApiError };