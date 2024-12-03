module.exports = (...allowedRoles) => {
    return async (req, res, next) => {
        try {
            const userRole = req.user.role; // Assume user role is attached to req.user
            if (!allowedRoles.includes(userRole)) {
                return res.status(403).json({ message: "Access Denied" });
            }
            next();
        } catch (error) {
            res.status(500).json({ message: "Authorization Error", error });
        }
    };
};
