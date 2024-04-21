const CheckUser = (req, res, next) => {
  if (!req.user) {
    return res
      .json({
        error: "You haven't access",
      })
      .status(400);
  }

  next();
};

export default CheckUser;
