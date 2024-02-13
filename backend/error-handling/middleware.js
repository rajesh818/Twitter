const ErrorHandling = (err, req, res, next) => {
  console.log(err);
  if (!err) {
    return next();
  }
  if (res.headersSent) {
    return next(err);
  }
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  const message = {
    message : err.message
  }
  res.status(err.serviceErrorCode).send(message);
};

module.exports = ErrorHandling;
