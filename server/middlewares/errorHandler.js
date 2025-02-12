async function errorHandler(err, req, res, next) {
  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    const errors = err.errors.map((el) => {
      return el.message;
    });
    res.status(400).json({ message: errors });
  } else if (err.name === "MISSING_INPUT_REGISTER") {
    res.status(400).json({
      message:
        "Username, Email, Password, Full Name, and Phone Number is required",
    });
  } else if (err.name === "MISSING_EMAIL_USERNAME") {
    res.status(400).json({ message: "Email or Username is required" });
  } else if (err.name === "MISSING_PASSWORD") {
    res.status(400).json({ message: "Password is required" });
  } else if (err.name === "DATA_NOT_FOUND") {
    res.status(404).json({ message: "Data Not Found" });
  } else if (err.name === "UNAUTHORIZED") {
    res.status(401).json({ message: "You must login first" });
  } else if (err.name === "TICKET_SOLD_OUT") {
    res.status(400).json({ message: "Ticket has been sold out" });
  } else if (err.name === "MISSING_INPUT_REGISTER") {
    res.status(400).json({
      message: "Name, City, Stadium, Founded Year, and Logo is required",
    });
  } else if (err.name === "FORBIDDEN") {
    res.status(403).json({ message: "You have no access" });
  } else if (err.name === "MISSING_INPUT_CREATE_MATCH") {
    res.status(400).json({
      message: "Home Team, Away Team, Date, Venue, and Season is required",
    });
  } else if (err.name === "MISSING_INPUT_CREATE_TICKET") {
    res
      .status(400)
      .json({ message: "Match Id, Category, Price, and Quantity is required" });
  } else if (err.name === "STANDING_ALREADY_CREATED") {
    res.status(400).json({ message: "Standing already created" });
  } else if (err.name === "MISSING_INPUT_CREATE_STANDING") {
    res.status(400).json({ message: "Season is required" });
  } else if (err.name === "MISSING_INPUT_UPDATE_SCORE") {
    res.status(400).json({ message: "Home Score and Away Score is required" });
  }
}

module.exports = {
  errorHandler,
};
