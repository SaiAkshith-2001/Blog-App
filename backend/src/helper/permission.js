export const permissions = (permission) => {
  return (req, res, next) => {
    try {
      if (!req?.apiKey?.permissions) {
        return res.status(403).json({
          message: "Permission denied",
        });
      }
      const exists = req.apiKey.permissions?.includes(permission);
      if (!exists) {
        return res.status(403).json({
          message: "Permission denied",
        });
      }
      next();
    } catch (error) {
      return next(error);
    }
  };
};
