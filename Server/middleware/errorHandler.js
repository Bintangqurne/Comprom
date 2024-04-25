function errorHandler(err, req, res, next) {
    console.log(err, 'ini error');
    let status = 500
    let message = "Internal Server Error"

    if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
        status = 400
        message = err.errors[0].message
    } else if (err.name === "Unauthorized" || err.name === "JsonWebTokenError") {
        status = 401
        message = "Invalid Token"
    } else if (err.name === "InvalidCredential") {
        status = 401
        message = "Invalid Email or Password"
    } else if (err.name === "NotFound") {
        status = 404
        message = "Data Not Found"
    } else if (err.name === "Forbidden") {
        status = 403
        message = "You do not access"
    }
    res.status(status).send({message})
}

module.exports = errorHandler