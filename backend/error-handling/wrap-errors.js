const {ServiceError} = require('./service-error');
const { PrismaClientKnownRequestError, PrismaClientUnknownRequestError } = require('@prisma/client');
const WrapErrors = async (f, ...args) => {
    try {
        return await f(...args);
    } catch (err) {
        if(err instanceof ServiceError) {
            throw err;
        }
        else if (err instanceof PrismaClientKnownRequestError || err instanceof PrismaClientUnknownRequestError) {
            throw new ServiceError(err.message, 500, err)
        } else {
            throw new ServiceError("Uncaught error: " + err.message , 500, err)
        }
    }
}

module.exports = WrapErrors;