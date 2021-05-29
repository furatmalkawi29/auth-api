module.exports = (capability) => {
  return (req, res, next) => {
    try {
      console.log(req.user.capabilities);
      if (req.user.capabilities.includes(capability)) {
        next();
      } else {
        next('Access denied');
      }
    } catch (error) {
      next('Invalid Login');
    }
  };
};