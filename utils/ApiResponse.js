class ApiResponse {
    constructor(
        statusCode = 200, message = "Success", data, success = true
    ) {
        this.statusCode = statusCode
        this.message = message
        this.success = statusCode < 400
        this.data = data
    }
}


export { ApiResponse };                  