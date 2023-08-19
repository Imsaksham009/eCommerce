class AppError extends Error {
    constructor(message = "Something Went Wrong", status) {
        super();
        this.message = message;
        this.status = status;
    }
}

module.exports = AppError;