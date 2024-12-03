module.exports = (requiredPermissions) => {
    return (req, res, next) => {
      const { permissions } = req.user; // Assuming `req.user.permissions` is populated from authMiddleware
  
      const hasPermission = requiredPermissions.every((perm) => permissions.includes(perm));
  
      if (!hasPermission) {
        return res.status(403).json({ error: 'Access denied. Insufficient permissions.' });
      }
  
      next();
    };
  };
  