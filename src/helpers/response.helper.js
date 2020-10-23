exports.response = (req, res, status, data, errors) => {
  res.status(status).json({
    status: status,
    errors: errors,
    data: data,
  });
};
