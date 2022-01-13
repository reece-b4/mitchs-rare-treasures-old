//DEFINE PSQL ERRORS HERE (AS WE FIND THEM IN TESTING)
exports.handlePsqlErrors = (err, req, res, next) => {
  if (err.code === "23502") {
    res.status(400).send({ msg: "Incomplete information" });
  } else if (err.code === "22P02") {
    res.status(400).send({ msg: "Invalid input." });
  } else {
    next(err);
  }
};

// EXPRESS ERRORS HANDLED HERE - how you want error reported to user/client
exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

exports.catchInvalidURL = (req, res) => {
  res.status(404).send({ msg: "Page does not exist." });
};

exports.handleError500s = (err, req, res, next) => {
  console.log(err, "<< error 500 console log");
  res.status(500).send({ msg: "internal server error" });
};
