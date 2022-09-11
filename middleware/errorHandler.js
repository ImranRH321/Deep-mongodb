const errorHandler = (err, req, res, next) => {
    res.status(400).send({
        message: false,
        err: err.message
    })
}

module.exports = errorHandler;

