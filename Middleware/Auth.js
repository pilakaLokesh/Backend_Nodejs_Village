const jwt = require("jsonwebtoken")



const auth = (req, res, next) => {
    const token = req.header("Authorization")

    if (!token) {
        return res.status(401).json({ message: "No token, Access denied" })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded   // store userId, username
        next()
    } catch (err) {
        return res.status(400).json({ message: "Invalid Token" })
    }
}

module.exports = auth
