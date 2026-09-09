/**
 * Middleware to restrict access to specific roles.
 * Usage: roleMiddleware("admin") or roleMiddleware("admin", "tutor")
 */
const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied: insufficient permissions",
      });
    }
    next();
  };
};

module.exports = roleMiddleware;
